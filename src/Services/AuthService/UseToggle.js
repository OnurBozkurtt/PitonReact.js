import StoreToken from "./StoreToken";
const useToggle = (key, initValue) => {
    const [value, setValue] = StoreToken(key, initValue);

    const toggle = (value) => {
        setValue(prev => {
            return typeof value === 'boolean' ? value : !prev;
        })
    }

    return [value, toggle];
}

export default useToggle