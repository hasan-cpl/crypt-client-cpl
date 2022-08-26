import axios from 'axios';

//export const BASE_URL = "http://localhost:4000";
export const BASE_URL = "https://api-cpl-crypt.herokuapp.com";

export const myAxios = axios.create({
    baseURL: BASE_URL,
});