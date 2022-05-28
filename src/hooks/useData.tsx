import {api} from '../utils/api';
import {AxiosError} from 'axios';
import {useCallback, useEffect, useState} from 'react';

// custom hook for fetching data from the api

function useData<T>(url: string) {
    const [data, setData] = useState<T>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<AxiosError | null>(null);

    const getData = useCallback(async (url: string) => {
        setLoading(true);
        try {
            const response = await api.get<T>(url);
            setData(response.data);
        } catch (error: any) {
            setError(error);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        getData(url)
    }, [url, getData]);


    return {data, loading, error, getData};
}

// set useData as the default export
export default useData;

// useData that takes a generic and returns data of that generic type
