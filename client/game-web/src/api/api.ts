import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import './responses';
import { SignInResponse } from './responses';

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
    const accesTokenString  = storage.getItem("jwt");
    const refreshToken = storage.getItem("refreshToken");

    if (accesTokenString ) {
        const token: AccessTokenInStorage = JSON.parse(accesTokenString);

        if (token.exp > Date.now())
            return token.val;
    }

    if (!refreshToken)
        return null;

    // try {
    //     const res = api.post<SignInResponse>(`users/refresh-token`,'',{headers: { Authorization: `Bearer ${refreshToken}` }});
    //     console.log(res);
    // } catch (e: any) {
    //     console.error('Token refresh request failed', e);
    //     // toast.error(`Błąd tokenów: ${e.message}`);
    //     return null;
    // }

    // const newToken: AccessTokenInStorage = {
    //     val: resp.data.token,
    //     exp: +(new Date(resp.data.expiresOn)),
    // };

    // storage.setItem(accessTokenKey, JSON.stringify(newToken));

    // return newToken.val;
    // return storage.getItem("jwt");
}

export function setTokens({ token, refreshToken, expirationTime }: SignInResponse) {

    const tokenObj: AccessTokenInStorage = {
        val: token,
        exp: +(new Date(expirationTime)),
    };

    storage.setItem("jwt", JSON.stringify(tokenObj));
    storage.setItem("refreshToken", refreshToken);
};