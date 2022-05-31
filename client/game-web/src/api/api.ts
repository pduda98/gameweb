import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
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

export const getJwtToken = async(): Promise<string | null> => {
    const accesTokenString  = storage.getItem("jwt");
    const refreshToken = storage.getItem("refreshToken");

    if (accesTokenString) {
        const token: AccessTokenInStorage = JSON.parse(accesTokenString);

        if (token.exp > Date.now())
            return token.val;
    }

    if (!refreshToken)
        storage.removeItem("jwt");
        storage.removeItem("refreshToken");
        return null;

    let res: AxiosResponse<SignInResponse>;
    try {
        res = await api.post<SignInResponse>(`users/refresh-token`,null,{headers: { Authorization: `Bearer ${refreshToken}` }});
    } catch (e: any) {
        console.error('Token refresh request failed', e);
        storage.removeItem("jwt");
        storage.removeItem("refreshToken");
        return null;
    }

    const newToken: AccessTokenInStorage = {
        val: res.data.token,
        exp: +(new Date(res.data.expirationTime)),
    };

    storage.setItem("jwt", JSON.stringify(newToken));

    return newToken.val;
}

export function setTokens({ token, refreshToken, expirationTime }: SignInResponse) {

    const tokenObj: AccessTokenInStorage = {
        val: token,
        exp: +(new Date(expirationTime)),
    };

    storage.setItem("jwt", JSON.stringify(tokenObj));
    storage.setItem("refreshToken", refreshToken);
};

api.interceptors.request.use(async function (config: AxiosRequestConfig)
    {
        if (config.url?.match("users/authenticate") || config.url?.match("users/refresh-token"))
            return config;

        const token = await getJwtToken();
        if (token)
            config.headers!.Authorization = `Bearer ${token}`;

        return config;
    }
);