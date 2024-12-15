import useStore from '../useStore/useStore';
import { useEffect, useMemo, useRef, useState } from 'react';

const useCustomization = (modelName: string): { data: { [model: string]: any } } => {
    const didMountRef = useRef(false);

    const {
        customization: {
            data: customization,
            handlePublishCustomization,
            handleRemoveAllChanges,
            publishLoading,
            publishError,
        },
    } = useStore();

    const initialData = useMemo(() => customization[modelName], []);

    const [tempState, setTempState] = useState<any>(initialData);

    useEffect(() => {
        if (!didMountRef.current) {
            didMountRef.current = true;
        }
        return () => {
            didMountRef.current = false;
        };
    }, []);
    useEffect(() => {
        if (didMountRef.current) {
            setTempState(customization[modelName]);
        }
    }, [customization[modelName]]);

    return useMemo(() => {
        return {
            data: { [modelName]: tempState },
            handlePublishCustomization,
            handleRemoveAllChanges,
            publishLoading,
            publishError,
        };
    }, [tempState, publishLoading, publishError]);
};

export default useCustomization;
