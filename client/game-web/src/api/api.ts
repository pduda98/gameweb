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

const storage = localStorage;

export function getJwtToken() {
    return storage.getItem("jwt");
}

export function setJwtToken (token: string) {
    storage.setItem("jwt", token);

    // const tokenObj: AccessTokenInStorage = {
    //     val: token,
    //     exp: +(new Date(expiresOn)),
    // };

    // storage.setItem(accessTokenKey, JSON.stringify(tokenObj));
};