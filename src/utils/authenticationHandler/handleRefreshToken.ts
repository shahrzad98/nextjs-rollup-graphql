import { clearNextCookie } from './nextCookie';

export const handleRefreshToken = async (refresh = ''): Promise<string> => {
    const _refreshToken = typeof window !== 'undefined' && !refresh ? localStorage.getItem('refresh_token') : refresh;

    if (!_refreshToken || typeof window === 'undefined') {
        if (typeof window !== 'undefined') localStorage.removeItem('token');
        return '';
    } else {
        try {
            const res = await fetch(
                `${
                    process.env.NEXT_PUBLIC_REST_URL ? process.env.NEXT_PUBLIC_REST_URL : 'https://backend.digify.shop'
                }/user/token/refresh/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ refresh: _refreshToken }),
                },
            );

            if (res.ok) {
                const data = await res.json();
                localStorage.setItem('token', data?.access);
                return data.access;
            } else {
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('token');
                    localStorage.removeItem('refresh_token');
                }
                await clearNextCookie();
                return '';
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('refresh_api_error: ', error);
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
                localStorage.removeItem('refresh_token');
            }
            await clearNextCookie();
            return '';
        }
    }
};
