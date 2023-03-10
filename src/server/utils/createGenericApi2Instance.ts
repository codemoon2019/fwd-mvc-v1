import axios, { AxiosRequestConfig } from 'axios'
import {
    GEN_API_2_URL,
    GEN_API_2_USER,
    GEN_API_2_PASSWORD,
} from '../config'

const authorizationKey = Buffer.from(
    `${GEN_API_2_USER}:${GEN_API_2_PASSWORD}`
).toString('base64');

const createGenApi2Instance = (options?: AxiosRequestConfig) => {
    const baseURL = GEN_API_2_URL
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

export default createGenApi2Instance