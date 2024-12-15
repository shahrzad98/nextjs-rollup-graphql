import React, { PropsWithChildren, ReactNode, useEffect, useState } from 'react';

const CsrOnly = (props: PropsWithChildren<ReactNode>) => {
    const [render, setRender] = useState(false);

    useEffect(() => {
        setRender(true);
    }, []);

    if (!render) return null;

    return <>{props.children}</>;
};

export default CsrOnly;
