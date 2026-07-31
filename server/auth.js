import { randomUUID } from 'node:crypto';

const users = new Map([
    ['demo', { username: 'demo', password: 'password123', role: 'viewer' }],
    ['admin', { username: 'admin', password: 'admin123', role: 'admin' }],
]);

const sessions = new Map();

export function registerUser(username, password, role = 'player') {
    if (!username || !password) {
        return null;
    }

    if (users.has(username)) {
        return null;
    }

    const user = { username, password, role };
    users.set(username, user);
    return { username: user.username, role: user.role };
}

export function authenticateUser(username, password) {
    if (!username || !password) {
        return null;
    }

    const user = users.get(username);
    if (!user || user.password !== password) {
        return null;
    }

    return { username: user.username, role: user.role };
}

export function createUserSession(user) {
    const sessionId = randomUUID();
    sessions.set(sessionId, user.username);
    return sessionId;
}

export function getSessionUser(sessionId) {
    const username = sessions.get(sessionId);
    if (!username) {
        return null;
    }

    const user = users.get(username);
    if (!user) {
        return null;
    }

    return { username: user.username, role: user.role };
}

export function destroySession(sessionId) {
    sessions.delete(sessionId);
}

export function parseCookies(cookieHeader = '') {
    return cookieHeader
        .split(';')
        .map((part) => part.trim())
        .filter(Boolean)
        .reduce((acc, part) => {
            const separatorIndex = part.indexOf('=');
            if (separatorIndex === -1) {
                return acc;
            }
            const key = part.slice(0, separatorIndex);
            const value = part.slice(separatorIndex + 1);
            acc[key] = value;
            return acc;
        }, {});
}

export function makeSessionCookie(sessionId) {
    return `sessionId=${sessionId}; HttpOnly; Path=/; SameSite=Lax`;
}

export function clearSessionCookie() {
    return 'sessionId=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0';
}
