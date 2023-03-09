import axios, { AxiosRequestConfig } from 'axios'
import {
    SI_URL,
    SI_USER,
    SI_PASSWORD,
} from '../config'

const authorizationKey = Buffer.from(
    `${SI_USER}:${SI_PASSWORD}`
).toString('base64');

const createStrikeIronInstance = (options?: AxiosRequestConfig) => {
    const baseURL = SI_URL
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

export default createStrikeIronInstance