import React from "react";
import {debounce} from 'lodash';
import useMountedState from "./useMountedState";

// Debounced state is set after a delay after the last call
// used for delayed search
function useDebouncedState(defaultValue, paramName, delay = 1000) {

    const [state, setState] = useMountedState(defaultValue, paramName);
    const [immediateState, setImmediateState] = React.useState(defaultValue);

    const debouncedSetState = React.useCallback(
        debounce(setState, delay),
        [delay]);

    const setValue = React.useCallback((value) => {
        setImmediateState(value);
        debouncedSetState(value);
    }, [debouncedSetState]);

    React.useEffect(() => {
        setImmediateState(state);
    }, [state]);

    return [state, setValue, immediateState];
}

export default useDebouncedState;
