import axios from 'axios';
import StoreToken from '../../Servisler/AuthServisleri/StoreToken';

/**
 * @description istek atma fonksiyounu
 * @param opts Object
 * @param opts.callbackSuccess
 * @param opts.callbackError
 * @param opts.method
 * @param opts.url
 * @param opts.params
 * @param opts.headers
 * @param opts.data
 *
 * */
function userFunc(opts) {
    const options = {
        timeout: 100000,
        responseType: 'json',
        ...opts,
    };
    axios(options).then((resp) => {
        const user = StoreToken;
        if (resp.status === 200) {
            localStorage.getItem(user);
            console.log('AXIOS RESPONSE Success! ->', resp.data.user);
            if (opts.callbackSuccess) { opts.callbackSuccess(resp.data); }
        }
    }).catch((error) => {
        console.log('Response error!', error);
        if (opts.callbackError) { opts.callbackError(error); }
    });




}

export default userFunc;