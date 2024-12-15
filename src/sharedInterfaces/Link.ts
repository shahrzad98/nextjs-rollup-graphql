export interface Link {
    href: {
        pathname: string;
        query?: {
            [key: string]: string | number | (string | number)[];
        };
    };
}
