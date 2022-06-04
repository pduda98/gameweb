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
        {(token) ? <NavLink to='/' className="login" style={{ textDecoration: 'none' }} onClick={LogoutProcedure}>LOGOUT</NavLink>
          : <NavLink to="/login" className="login" style={{ textDecoration: 'none' }} onClick={() => useEffect}>LOGIN</NavLink>}
      </div>
  )
};
export default LoginButton;