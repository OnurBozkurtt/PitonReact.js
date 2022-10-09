import { useEffect } from "react";
import { useState } from "react";

const getLocalValue = (key, initialValue) => {

    if (typeof window === 'undefined') return initialValue;

    const localValue = JSON.stringify(localStorage.getItem(key));
    if (localValue && localValue != "\"undefined\"" && localValue != null && localValue != undefined) return localValue;

    if (initialValue instanceof Function) return initialValue();

    return initialValue;
}

const StoreToken = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        return getLocalValue(key, initialValue);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));

    }, [key, value])

    return [value, setValue];
}
export default StoreToken;
