import React from 'react';

const DynamicComponentsContainer = (props: { schema: any }) => {
    if (props.schema.type !== 'component[]') throw new Error('The schema type must be component[]');
    if (!props.schema) throw new Error('Schema prop is required!');
    return props.schema.value.map(({ key }, i) => {
        const C = props.schema.options.find((i) => i.key === key)?.value;
        if (!C) throw new Error(`Component with "${key}" key is not define.`);
        const Component = React.memo(C);
        return <Component key={i} />;
    });
};

export default DynamicComponentsContainer;
