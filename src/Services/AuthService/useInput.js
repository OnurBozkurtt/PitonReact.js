import StoreToken from "./StoreToken";

const useInput = (key, initialValue) => {
    const [value, setValue] = StoreToken(key, initialValue);

    const reset = () => setValue(initialValue);

    const Input = {
        value,
        onChange: (e) => setValue(e.target.value)

    }
    return [value, reset, Input];

}
export default useInput