import './LogIn.css'
import {api, setTokens} from 'api/index';
import { SignInResponse } from 'api/responses';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
const LogIn: React.FC = () => {
    const navigate = useNavigate();
    let failure = false;
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        //Prevent page reload
        event.preventDefault();

        let username = document.getElementById('username') as HTMLInputElement;
        let password = document.getElementById('password') as HTMLInputElement;

        const res = await api.post<SignInResponse>(`users/authenticate`,{username: username.value, password: password.value});

        if (res.data != null && res.status === 200)
        {
            setTokens(res.data);
            navigate("/", { replace: true });
            failure = true;
        }
    };

    return (
    <div className="form" onSubmit={handleSubmit} >
        <form autoComplete="off">
            <div className="input-container">
                <label>Username </label>
                <input type="text" id="username" required />
            </div>
            <div className="input-container">
                <label>Password </label>
                <input type="password" id="password" required />
            </div>
            {(failure) ? <div className={'alert alert-danger'}>Wrong credentials!</div> : ""}
            <div className="button-container">
                <input type="submit" />
            </div>
        </form>
    </div>
    )
}

export default LogIn;