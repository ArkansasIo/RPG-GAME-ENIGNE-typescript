import { describe, expect, it } from 'vitest';
import { authenticateUser, registerUser } from './auth.js';

describe('auth helpers', () => {
    it('authenticates known users', () => {
        const user = authenticateUser('demo', 'password123');
        expect(user).toMatchObject({ username: 'demo', role: 'viewer' });
    });

    it('registers a new user and lets it authenticate', () => {
        const created = registerUser('tester', 'secret123', 'player');
        expect(created).toMatchObject({ username: 'tester', role: 'player' });

        const authenticated = authenticateUser('tester', 'secret123');
        expect(authenticated).toMatchObject({ username: 'tester', role: 'player' });
    });
});
