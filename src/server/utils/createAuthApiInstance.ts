import axios, { AxiosRequestConfig } from 'axios'
import {
    AUTH_API_URL,
    AUTH_API_USER,
    AUTH_API_PASSWORD,
} from '../config'

const authorizationKey = Buffer.from(
    `${AUTH_API_USER}:${AUTH_API_PASSWORD}`
).toString('base64');

const createGenApiInstance = (options?: AxiosRequestConfig) => {
    const baseURL = AUTH_API_URL
    const optionHeaders = options?.headers ?? {};
    const headers = {
        ...optionHeaders,
        Authorization: `Basic ${authorizationKey}`,
    };

    return axios.create({
        baseURL,
        ...options,
        headers,
    });
}

export default createGenApiInstance