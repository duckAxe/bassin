import { Pool } from '../interfaces/pool';
import { User } from '../interfaces/users';

/**
 * Wrapped fetch with error handling
 */
const safeFetch = async (url: string): Promise<Response> => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Request failed: ${response.status} ${response.statusText}`);
        }

        return response;
    } catch (err) {
        throw err;
    }
};

/**
 * Fetch and merge pool status, hashrate & shares data
 */
export const fetchPool = async (): Promise<Pool> => {
    try {
        const response = await safeFetch(`/pool/pool.status?${Date.now()}`);
        const text = await response.text();

        const lines = text.trim().split('\n').filter(Boolean);
        if (lines.length < 3) {
            throw new Error('Malformed pool response');
        }

        const [pool, hashrate, shares] = lines.map((line) => JSON.parse(line));

        return { ...pool, ...hashrate, ...shares };
    } catch (error) {
        console.error('Error in fetchPool:', error);
        throw error instanceof Error ? error : new Error('Unknown error in fetchPool');
    }
};

/**
 * Fetch all users listed in /users/, then fetch their data
 */
export const fetchUsers = async (): Promise<User[]> => {
    try {
        const userListUrl = import.meta.env.DEV
            ? '/users/users.status'
            : `/users/?${Date.now()}`;

        const response = await safeFetch(userListUrl);
        const content = await response.text();

        const userMatches = [...content.matchAll(/href="([^"]+)"/g)];
        const usernames = userMatches.map(([, match]) => match).filter(Boolean);

        if (usernames.length === 0) {
            return [];
        }

        const users = await Promise.all(
            usernames.map(async (username) => {
                const res = await safeFetch(`/users/${username}?${Date.now()}`);
                const data = await res.json();
                return { ...data, username } as User;
            })
        );

        return users;
    } catch (error) {
        console.error('Error in fetchUsers:', error);
        throw error instanceof Error ? error : new Error('Unknown error in fetchUsers');
    }
};
