import React from "react";
import axios from "axios";
import useMountedState from './useMountedState';

// axios hook that automatically cancels request
// if the component is unmounted

const useAxios = (url) => {

    const [loading, setLoading] = useMountedState(false);
    const [result, setResult] = useMountedState(null);
    const [error, setError] = useMountedState(null);
    const [reloading, setReloading] = React.useState(false);

    React.useEffect(() => {
        if (url === null || loading) {
            return;
        }

        setLoading(true);

        let source = axios.CancelToken.source();

        axios.get(url, {
            cancelToken: source.token,
        }).then(response => {
            setResult(response.data);
            setLoading(false);
            setReloading(false);
        }).catch(error => {
            setError(error.message);
            setLoading(false);
            setReloading(false);

            if (axios.isCancel(error)) {
                return console.log('request cancelled', error.message);
            }

            console.log(error.message);
        });

        return () => {
            source.cancel('Cancelling in cleanup');
        };
    }, [url, reloading]);

    const triggerReload = () => {
        if (!reloading) {
            setReloading(true);
        }
    };

    return [result, loading, error, reloading, triggerReload];
};

export default useAxios;
