import axios from "axios";
import { Alert } from "bootstrap";
import Cookies from "js-cookie";
import { BaseUrl, LoginUrl, SignUpUrl } from "../util/constants/Api";

export const SignUp = async (args) => {
    console.log(BaseUrl + SignUpUrl);
    try {
        const url = BaseUrl + SignUpUrl;
        const token = await axios.post(url, { username: args.userName, password1: args.password1, password2: args.password2 });
        setIdTokenToCookie(token);
        return true
    } catch (error) {
        console.log('Sign Up Error', error);
        Alert('Sign Up Error', error);
        return false
    }

}

export const LogIn = async (args) => {
    console.log(BaseUrl + LoginUrl);
    try {
        const url = BaseUrl + LoginUrl;
        const token = await axios.post(url, { username: args.userName, password: args.password });
        setIdTokenToCookie(token);
        return true
    } catch (error) {
        console.log('Login Error', error);
        Alert('Login Error', error);
        return false
    }
}

const removeIdTokenFromCookie = () => {
    Cookies.remove('idToken');
}

const setIdTokenToCookie = (token) => {
    Cookies.set('idToken', token);
}

export const getIdTokenFromCookie = () => {
    Cookies.get('idToken');
}

export const logOut = () => {
    removeIdTokenFromCookie()
}