import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

const useDidUpdateEffect = (effect: EffectCallback, deps?: DependencyList): void => {
    const didMountRef = useRef(false);

    useEffect(() => {
        if (didMountRef.current) return effect();
        else didMountRef.current = true;
    }, deps);
};

export default useDidUpdateEffect;
