import './LogIn.css'
import {api, setTokens} from 'api/index';
import { SignInResponse } from 'api/responses';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
const LogIn: React.FC = () => {
    const navigate = useNavigate();
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        //Prevent page reload
        event.preventDefault();

        let username = document.getElementById('username') as HTMLInputElement;
        let password = document.getElementById('password') as HTMLInputElement;

        try {
            const res = await api.post<SignInResponse>(`users/authenticate`,{username: username.value, password: password.value});
            if (res.data != null && res.status === 200)
            {
                setTokens(res.data);
                toast.success('Logged in successfully!', {
                    position: "bottom-left",
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });
                navigate("/", { replace: true });
            }
        }
        catch{
            toast.error('Invalid credentials!', {
                position: "bottom-left",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
        }
    };

    return (
    <div className="form" onSubmit={handleSubmit} >
        <form autoComplete="off">
            <div className="input-container">
                <label>Username </label>
                <input type="text" id="username" required/>
            </div>
            <div className="input-container">
                <label>Password </label>
                <input type="password" id="password" required />
            </div>
            <div className="button-container">
                <input type="submit" value="Submit"/>
            </div>
        </form>
    </div>
    )
}

export default LogIn;