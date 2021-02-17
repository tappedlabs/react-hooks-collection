import React from "react";

// Same as react use state, but the state will only update
// when the component is currently mounted.
// for example, when the user navigates away,
// running tasks will not update state (preventing memory leak)

function useMountedState(defaultValue) {
    const [mounted, setMounted] = React.useState(true);
    const [state, setState] = React.useState(defaultValue);

    const setValue = React.useCallback((value) => {
        if (mounted) {
            setState(value);
        }
    }, [mounted]);

    React.useEffect(() => {
        return () => {
            setMounted(false);
        }
    }, [defaultValue]);

    return [state, setValue];
}

export default useMountedState;
