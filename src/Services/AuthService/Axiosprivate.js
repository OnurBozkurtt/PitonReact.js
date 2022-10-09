import Axios from "./Axios";
import { useEffect } from "react";
import useAuth from "./UseAuth";
import useRefreshToken from "./RefreshToken";
import kullaniciServis from "./kullaniciAuthServis";


const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const requestIntercept = kullaniciServis.interceptors.request.use(
            config => {
                if (!config.headers['access-token']) {
                    config.headers['access-token'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = kullaniciServis.interceptors.response.use(
            response => response,
            async (error) => {
                const prevReq = error?.config;
                if (error?.response?.status === 403 && !prevReq?.sent) {
                    prevReq.sent = true;
                    const newAccessToken = await refresh();
                    prevReq.headers['access-token'] = `Bearer ${newAccessToken}`;
                    return kullaniciServis(prevReq);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            kullaniciServis.interceptors.request.eject(requestIntercept);
            kullaniciServis.interceptors.response.eject(responseIntercept);
        }

    }, [auth, refresh])
    return Axios;
}
export default useAxiosPrivate;