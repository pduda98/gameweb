import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import './responses';

const accessTokenKey = 'at';
const refreshTokenKey = 'rt';

interface AccessTokenInStorage {
    val: string;
    exp: number;
}

export const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    responseType: 'json',
});