import { createServer } from 'node:http';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
    authenticateUser,
    clearSessionCookie,
    createUserSession,
    destroySession,
    getSessionUser,
    makeSessionCookie,
    parseCookies,
    registerUser,
} from './auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.join(__dirname, '..');
const clientDir = path.join(rootDir, 'client');
const dataPath = path.join(__dirname, 'data', 'content-db.json');

const contentDatabase = JSON.parse(readFileSync(dataPath, 'utf8'));

function sendJson(res, payload, statusCode = 200) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(payload, null, 2));
}

function getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    switch (ext) {
        case '.html': return 'text/html; charset=utf-8';
        case '.css': return 'text/css; charset=utf-8';
        case '.js': return 'application/javascript; charset=utf-8';
        case '.json': return 'application/json; charset=utf-8';
        case '.svg': return 'image/svg+xml';
        default: return 'application/octet-stream';
    }
}

async function serveFile(res, filePath) {
    try {
        const buffer = await readFile(filePath);
        res.writeHead(200, { 'Content-Type': getMimeType(filePath) });
        res.end(buffer);
    } catch {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Not found');
    }
}

function buildCsvExport(database) {
    const rows = [];
    rows.push(['key', 'kind', 'path', 'assetKey']);
    database.assets.forEach((asset) => rows.push([asset.key, asset.kind, asset.path, '']));
    database.maps.forEach((map) => rows.push(['', 'map', map.path, map.assetKey]));
    return rows.map((row) => row.join(',')).join('\n');
}

const server = createServer((req, res) => {
    const requestUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const { pathname, searchParams } = requestUrl;
    const cookies = parseCookies(req.headers.cookie || '');
    const sessionUser = getSessionUser(cookies.sessionId);

    if (pathname === '/api/health') {
        sendJson(res, { ok: true, service: 'dw-engine-api', timestamp: new Date().toISOString() });
        return;
    }

    if (pathname === '/api/auth/me') {
        if (!sessionUser) {
            sendJson(res, { authenticated: false }, 401);
            return;
        }
        sendJson(res, { authenticated: true, user: sessionUser });
        return;
    }

    if (pathname === '/api/auth/login' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => { body += chunk; });
        req.on('end', () => {
            try {
                const parsed = JSON.parse(body || '{}');
                const user = authenticateUser(parsed.username, parsed.password);
                if (!user) {
                    res.writeHead(401, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(JSON.stringify({ error: 'Invalid credentials' }));
                    return;
                }
                const sessionId = createUserSession(user);
                res.writeHead(200, {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Set-Cookie': makeSessionCookie(sessionId),
                });
                res.end(JSON.stringify({ authenticated: true, user }));
            } catch {
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: 'Invalid body' }));
            }
        });
        return;
    }

    if (pathname === '/api/auth/signup' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => { body += chunk; });
        req.on('end', () => {
            try {
                const parsed = JSON.parse(body || '{}');
                const user = registerUser(parsed.username, parsed.password, parsed.role || 'player');
                if (!user) {
                    res.writeHead(409, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(JSON.stringify({ error: 'Username already exists' }));
                    return;
                }
                const sessionId = createUserSession(user);
                res.writeHead(200, {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Set-Cookie': makeSessionCookie(sessionId),
                });
                res.end(JSON.stringify({ authenticated: true, user }));
            } catch {
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: 'Invalid body' }));
            }
        });
        return;
    }

    if (pathname === '/api/auth/logout') {
        if (cookies.sessionId) {
            destroySession(cookies.sessionId);
        }
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8',
            'Set-Cookie': clearSessionCookie(),
        });
        res.end(JSON.stringify({ authenticated: false }));
        return;
    }

    if (pathname === '/api/content') {
        sendJson(res, contentDatabase);
        return;
    }

    if (pathname === '/api/content/assets') {
        sendJson(res, contentDatabase.assets);
        return;
    }

    if (pathname === '/api/content/maps') {
        sendJson(res, contentDatabase.maps);
        return;
    }

    if (pathname === '/api/content/export') {
        const format = searchParams.get('format') || 'json';
        if (format === 'csv') {
            const csv = buildCsvExport(contentDatabase);
            res.writeHead(200, {
                'Content-Type': 'text/csv; charset=utf-8',
                'Content-Disposition': 'attachment; filename="content-export.csv"',
            });
            res.end(csv);
            return;
        }
        sendJson(res, contentDatabase);
        return;
    }

    const requestedPath = pathname === '/' ? path.join(clientDir, 'index.html') : path.join(clientDir, pathname.replace(/^\/+/, ''));
    if (existsSync(requestedPath) && statSync(requestedPath).isFile()) {
        void serveFile(res, requestedPath);
        return;
    }

    void serveFile(res, path.join(clientDir, 'index.html'));
});

server.listen(3000, () => {
    console.log('Backend listening on http://localhost:3000');
});
