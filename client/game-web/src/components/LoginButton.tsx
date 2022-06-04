import "./Navbar.css"
import { NavLink, useLocation } from "react-router-dom";
import {getJwtToken} from 'api/index';
import { useEffect, useState } from "react";
const LoginButton: React.FC = () =>{
    function LogoutProcedure ()
    {
      setToken(null);
      localStorage.removeItem("jwt");
    }

    const [token, setToken] = useState<string | null>(null);;
    const location = useLocation();

    useEffect(() => {
      if (!token) {
          getToken();
      }
    },[token,location]);

    const getToken = async () => {
      setToken(await getJwtToken());
    }

    return (
      <div className="loginButton">
        {(token) ?
          <li><NavLink to='/' className="login" style={{ textDecoration: 'none' }} onClick={LogoutProcedure}>LOGOUT</NavLink></li>
          
          :
          <><li><NavLink to="/signup" className="login" style={{ textDecoration: 'none' }}>SIGNUP</NavLink></li><li><NavLink to="/login" className="login" style={{ textDecoration: 'none' }} onClick={() => useEffect}>LOGIN</NavLink></li></>
        }
      </div>
  )
};
export default LoginButton;