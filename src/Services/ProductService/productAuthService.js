import productFunc from "../ProductService/productFunc";
export default function productAuthService() {

    const productsAll = (successCallback, errorCallback,) => {
        if (localStorage.getItem("access-token")) {
            const opt = {
                callbackSuccess: successCallback,
                callbackError: errorCallback,
                method: "GET",
                url: "/api/v1/product/all",
                params: {},
                data: {},
                headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("access-token")).accessToken}` }
            };

            productFunc(opt);
        } else {
            console.warn("accesstoken not exist")
        }
    };



    const productsDetail = (successCallback, errorCallback, id) => {
        if (localStorage.getItem("access-token")) {

            const opt = {
                callbackSuccess: successCallback,
                callbackError: errorCallback,
                method: "GET",
                url: "/api/v1/product/get/" + id,
                params: {},
                data: {},
                headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("access-token")).accessToken}`, 'Access-Control-Allow-Origin': '*' }
            };

            productFunc(opt);

        } else {
            console.warn("accesstoken not exist")
        }
    };
    return {
        productsAll: productsAll,
        productsDetail: productsDetail,

    }

} 