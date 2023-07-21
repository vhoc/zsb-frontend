import { useCallback, useContext } from 'react';
import Context from './Context';

export function useGlobalState() {
    const { controlAdmin, setControlAdmin } = useContext(Context)

    const controlData = useCallback((severity, text) => {
        setControlAdmin({ severity, text, control: !controlAdmin.control })
    }, [setControlAdmin, controlAdmin])

    return {
        controlData,
        control: controlAdmin
    }

}