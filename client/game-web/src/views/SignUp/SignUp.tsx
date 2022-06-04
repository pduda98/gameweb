import '../LogInView/LogIn.css'
import {api, setTokens} from 'api/index';
import { SignInResponse } from 'api/responses';
import { useNavigate } from "react-router-dom";
import LoginButton from "components/LoginButton"
const SignUp: React.FC = () => {
    const navigate = useNavigate();
    let failure = false;

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        //Prevent page reload
        event.preventDefault();

        let username = document.getElementById('username') as HTMLInputElement;
        let email = document.getElementById('email') as HTMLInputElement;
        let password = document.getElementById('password') as HTMLInputElement;
        let repeatedPassword = document.getElementById('repeated-password') as HTMLInputElement;
        
        if (password.value !== repeatedPassword.value) {
            failure = true;
        }else{
            const res = await api.post<SignInResponse>(
                `users/sign-up`,
                {
                    username: username.value,
                    password: password.value,
                    email: email.value
                });
    
            if (res.data != null && res.status === 200)
            {
                navigate("/login", { replace: true });
            }
            else{
                failure = true;
            }
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
                <label>Email </label>
                <input type="text" id="email" required />
            </div>
            <div className="input-container">
                <label>Password </label>
                <input type="password" id="password" required />
            </div>
            <div className="input-container">
                <label>Repeat password </label>
                <input type="password" id="repeated-password" required />
            </div>
            {(failure) ? <div className={'alert alert-danger'}>Wrong credentials!</div> : ""}
            <div className="button-container">
                <input type="submit" />
            </div>
        </form>
    </div>
    )
}

export default SignUp;