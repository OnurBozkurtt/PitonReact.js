import axios from 'axios';
const SignIn_URL = 'https://assignment-api.piton.com.tr/api/v1/user/Register';
const SignUp_URL = 'https://assignment-api.piton.com.tr/api/v1/user/login';
export default axios.create({
    SignIn_URL: SignIn_URL,
    SignUp_URL: SignUp_URL,
});

export const axiosSigninPrivate = axios.create({
    method: "POST",
    baseURL: SignIn_URL,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    withCredentials: true
});
export const axiosSignupPrivate = axios.create({
    method: "POST",
    baseURL: SignUp_URL,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    data: [],
    withCredentials: true

});
