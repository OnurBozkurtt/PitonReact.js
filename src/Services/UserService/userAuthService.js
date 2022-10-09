import userFunc from "./userService";
export default function kullaniciServis() {

    const registerServ = (successCallback, errorCallback,) => {
        if (localStorage.getItem("user")) {
            const opt = {
                callbackSuccess: successCallback,
                callbackError: errorCallback,
                method: "POST",
                url: "https://assignment-api.piton.com.tr/api/v1/user/register",
                params: {},
                data: {},
                headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}` }
            };

            userFunc(opt);
        } else {
            console.warn("accesstoken not exist")
        }
    };

    const loginServ = (successCallback, errorCallback, id) => {
        if (localStorage.getItem("user")) {


            const opt = {
                callbackSuccess: successCallback,
                callbackError: errorCallback,
                method: "POST",
                url: "https://assignment-api.piton.com.tr/api/v1/user/login",
                params: {},
                data: {},
                headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}` }
            };

            userFunc(opt);

        } else {
            console.warn("accesstoken not exist")
        }
    };
    return {
        registerServ: registerServ,
        loginServ: loginServ,

    }

} 