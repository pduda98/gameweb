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
      console.log(token);

      if (!token) {
          getToken();
      }
    },[token,location]);

    const getToken = async () => {
      setToken(await getJwtToken());
    }

    return (
        (token) ? <NavLink to='/' className={"login"} style={{ textDecoration: 'none' }} onClick={LogoutProcedure}>Logout</NavLink>
          : <NavLink to="/login" className={"login"} style={{ textDecoration: 'none' }} onClick={() => useEffect}>Login</NavLink>
  )
};
export default LoginButton;