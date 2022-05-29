import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import './responses';

const accessTokenKey = 'at';
const refreshTokenKey = 'rt';

interface AccessTokenInStorage {
    val: string;
    exp: number;
}

export const api = axios.create({
    baseURL: 'https://localhost:7205/api/v1/',
    responseType: 'json',
});