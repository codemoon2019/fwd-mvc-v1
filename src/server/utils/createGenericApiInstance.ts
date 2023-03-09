import axios, { AxiosRequestConfig } from 'axios'
import {
    GEN_API_URL,
    GEN_API_USER,
    GEN_API_PASSWORD,
} from '../config'

const authorizationKey = Buffer.from(
    `${GEN_API_USER}:${GEN_API_PASSWORD}`
).toString('base64');

const createGenApiInstance = (options?: AxiosRequestConfig) => {
    const baseURL = GEN_API_URL
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