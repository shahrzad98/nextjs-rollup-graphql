const isSearchEngine = (ctx): boolean => {
    const searchEngineUserAgent: string[] = [
        'googlebot',
        'bingbot',
        'slurp',
        'duckduckbot',
        'baiduspider',
        'yandexbot',
        'sogou',
        'exabot',
        'facebot',
        'ia_archiver',
    ];

    const userAgent: string = ctx.req?.headers['user-agent'] ?? '';

    for (const i of searchEngineUserAgent) {
        if (userAgent.toLowerCase().includes(i)) return true;
    }

    return false;
};

export default isSearchEngine;
