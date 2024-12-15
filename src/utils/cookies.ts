export const setCookie = (cName: string, cValue: string | number, exDays = 0) => {
    if (!exDays) document.cookie = cName + '=' + cValue + ';path=/';
    else {
        const d = new Date();
        d.setTime(d.getTime() + exDays * 24 * 60 * 60 * 1000);
        const expires = 'expires=' + d.toUTCString();
        document.cookie = cName + '=' + cValue + ';' + expires + ';path=/';
    }
};

export const getCookie = (cName: string): string | number => {
    const name = cName + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
};

export const checkCookie = (cName: string): boolean => {
    const value = getCookie(cName);
    if (value != '') return true;
    else return false;
};
