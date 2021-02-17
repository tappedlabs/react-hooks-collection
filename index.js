
import typeof useAxios from './hooks/useAxios';
import typeof useMountedState from './hooks/useMountedState';
import typeof useDebouncedState from './hooks/useDebouncedState';

module.exports = {
    get useAxios(): useAxios {
        return require('./hooks/useAxios');
    },
    get useMountedState(): useMountedState {
        return require('./hooks/useMountedState');
    },
    get useDebouncedState(): useDebouncedState {
        return require('./hooks/useDebouncedState');
    },
}
