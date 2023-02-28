import { useEffect, useRef } from "react";

export function useDebounceCallback<T extends (...args: any[]) => any>(
    callback: T,
    delay: number
): T {
    const timeoutRef = useRef<NodeJS.Timeout>();
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    function debouncedCallback(...args: any[]) {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            callbackRef.current(...args);
        }, delay);
    }

    return debouncedCallback as T;
}