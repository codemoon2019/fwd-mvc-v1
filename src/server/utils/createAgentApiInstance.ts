import axios, { AxiosRequestConfig } from 'axios'
import {
    AGENT_API_URL,
    AGENT_API_USER,
    AGENT_API_PASSWORD,
} from '../config'

const authorizationKey = Buffer.from(
    `${AGENT_API_USER}:${AGENT_API_PASSWORD}`
).toString('base64');

const createAgentApiInstance = (options?: AxiosRequestConfig) => {
    const baseURL = AGENT_API_URL
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

export default createAgentApiInstance