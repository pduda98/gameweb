import './LogIn.css'
import {api, setJwtToken} from 'api/index';
import { SignInResponse } from 'api/responses';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
const LogIn: React.FC = () => {
    const [result, setResultData] = useState<SignInResponse | null>(null);
    const [status, setStatus] = useState(200);
    const navigate = useNavigate();
    const handleSubmit = (event: { preventDefault: () => void; }) => {
        //Prevent page reload
        event.preventDefault();

        let username = document.getElementById('username') as HTMLInputElement;
        let password = document.getElementById('password') as HTMLInputElement;

        api.post<SignInResponse>(`users/authenticate`,{username: username.value, password: password.value})
            .then(res => {console.log(res); setResultData(res.data); setStatus(res.status); });

            console.log(result);            console.log(status);
        if (result != null && status === 200)
        {
            setJwtToken(result.token);
            navigate("/", { replace: true });
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
            {(status!==200) ? <div className={'alert alert-danger'}>Wrong credentials!</div> : ""}
            <div className="button-container">
                <input type="submit" />
            </div>
        </form>
    </div>
    )
}

export default LogIn;