import axios from "axios";
import { AddToCardUrl, BaseUrl, productUrl } from "../util/constants/Api";
import { getIdTokenFromCookie } from "./auth";

export const fetchAllProducts = async () => {
    try {
        const url = BaseUrl + productUrl;
        const token = getIdTokenFromCookie()
        // const headers = { Authorization: `Token ${token}` }
        console.log(token);
        const response = await axios.get(url)

        return response.data
    } catch (error) {
        console.log('error is in fetching products', error);
    }
}

export const addToCart = async (productId) => {
    try {
        const url = BaseUrl + AddToCardUrl;
        const token = getIdTokenFromCookie();
        const headers = { Authorization: `Token ${token}` }

        const response = await axios.post(url, { id: productId }, { headers });

        return response.data;
    }
    catch (error) {
        console.error('Add to product Cart Error', error.message);
    }
}