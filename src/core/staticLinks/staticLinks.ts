const aboutUs = {
    name: 'درباره ما',
    href: {
        pathname: '/information/about-us',
    },
};
const contactUs = {
    name: 'ارتباط با ما',
    href: {
        pathname: '/information/contact-us',
    },
};
const digify = {
    name: 'دیجی‌فای',
    href: {
        pathname: 'https://digify.shop/',
    },
};
const joinDigify = {
    name: 'یپوستن به دیجی‌غای',
    href: {
        pathname: 'https://register.digify.shop/',
    },
};
const buyHelp = {
    name: 'راهنمای خرید',
    href: {
        pathname: '/information/buy-help',
    },
};
const returnConditions = {
    name: 'شرایط مرجوعی',
    href: {
        pathname: '/information/return-conditions',
    },
};
const support = {
    name: 'پشتیبانی',
    href: {
        pathname: '/information/support',
    },
};
const home = {
    name: 'خانه',
    href: {
        pathname: '/',
    },
};
const cart = {
    name: 'سبد خرید',
    href: {
        pathname: '/profile/cart/[[...step]]',
        query: {
            step: 'items',
        },
    },
};
const favorites = {
    name: 'علاقه مندی ها',
    href: {
        pathname: '/profile/favorites',
    },
};
const login = {
    name: 'ورود به حساب کاربری',
    href: {
        pathname: '/auth/login',
    },
};
const register = {
    name: 'ثبت نام',
    href: {
        pathname: '/auth/register',
    },
};
const profile = {
    name: 'حساب کاربری',
    href: {
        pathname: '/profile',
    },
};
const orders = {
    name: 'سفارشات',
    href: {
        pathname: '/profile/orders',
    },
};
const notifications = {
    name: 'اطلاع رسانی ها',
    href: {
        pathname: '/profile/notifications',
    },
};

const staticLinks = {
    aboutUs,
    contactUs,
    digify,
    joinDigify,
    buyHelp,
    returnConditions,
    support,
    home,
    cart,
    favorites,
    login,
    register,
    profile,
    orders,
    notifications,
};

export default staticLinks;
