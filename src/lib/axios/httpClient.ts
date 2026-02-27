import axios from 'axios';

const api_base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!api_base_url) {
    throw new Error('api base url is not defined in environment variables');
}

const axiosInstance = () => {
    const instance = axios.create({
        baseURL: api_base_url,
        timeout: 30000,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return instance;
}

export interface ApiRequestOptions {
    params?: Record<string, unknown>;
    headers?: Record<string, string>
}

const httpGet = async (endpoint: string, options?: ApiRequestOptions) => {
    try {
        const response = await axiosInstance().get(endpoint, {
            params: options?.params,
            headers: options?.headers,
        });
        return response.data;
    } catch (error) {
        console.error(`GET request to ${endpoint} failed:`, error)
    }
}

const httpPost = async (endpoint: string, data: unknown, options?: ApiRequestOptions) => {
    try {
        const response = await axiosInstance().post(endpoint, data, {
            params: options?.params,
            headers: options?.headers,
        });
        return response.data;
    } catch (error) {
        console.error(`POST request to ${endpoint} failed:`, error)
    }
}

const httpPut = async (endpoint: string, data: unknown, options?: ApiRequestOptions) => {
    try {
        const response = await axiosInstance().put(endpoint, data, {
            params: options?.params,
            headers: options?.headers,
        });
        return response.data;
    } catch (error) {
        console.error(`PUT request to ${endpoint} failed:`, error)
    }
}

const httpDelet = async (endpoint: string, options?: ApiRequestOptions) => {
    try {
        const response = await axiosInstance().delete(endpoint, {
            params: options?.params,
            headers: options?.headers,
        });
        return response.data;
    } catch (error) {
        console.error(`DETE request to ${endpoint} failed:`, error)
    }
}

const httpPatch = async (endpoint: string, data: unknown, options?: ApiRequestOptions) => {
    try {
        const response = await axiosInstance().patch(endpoint, data, {
            params: options?.params,
            headers: options?.headers,
        });
        return response.data;
    } catch (error) {
        console.error(`PATCH request to ${endpoint} failed:`, error)
    }
}

export const httpClient = {
    get: httpGet,
    post: httpPost,
    put: httpPut,
    patch: httpDelet
}