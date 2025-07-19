import { Pool } from '../interfaces/pool';
import { User } from '../interfaces/users';

const safeFetch = async (url: string): Promise<Response> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }
    return response;
};

export const fetchPool = async (): Promise<Pool | undefined> => {
    try {
        const response = await safeFetch(`/pool/pool.status?${Date.now()}`);
        const content = await response.text();

        const lines = content.trim().split('\n').filter(Boolean);
        const [pool, hashrate, shares] = lines.map(line => JSON.parse(line));

        return { ...pool, ...hashrate, ...shares };
    } catch (error) {
        if (error instanceof Error) throw error;
        throw new Error('Unknown error in fetchPool');
    }
};

export const fetchUsers = async (): Promise<User[] | undefined> => {
    try {
        const endpoint = import.meta.env.DEV ? '/users/users.status' : '/users';
        const response = await safeFetch(endpoint);
        const content = await response.text();

        const users = [...content.matchAll(/href="([^"]+)"/g)].map(m => m[1]);

        const results = await Promise.all(
            users.map(async (user) => {
                const userResponse = await safeFetch(`/users/${user}?${Date.now()}`);
                const data = await userResponse.json();
                return { ...data, username: user } as User;
            })
        );

        return results;
    } catch (error) {
        if (error instanceof Error) throw error;
        throw new Error('Unknown error in fetchUsers');
    }
};
