export const setNextCookie = async (access: string) => {
    await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
            access,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export const clearNextCookie = async () => {
    await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};
