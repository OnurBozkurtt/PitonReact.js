import Axios from "./Axios";
import useAuth from "./UseAuth";
const useLogout = () => {

    const { setAuth } = useAuth();

    const Logout = async () => {
        setAuth({});

        try {
            const response = await Axios('/Logout', {
                withCredentials: true
            });

        } catch (error) {
            console.log(error);
        }
    }
    return Logout;
}
export default useLogout;