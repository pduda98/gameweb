import "./Navbar.css"
import { NavLink, useLocation } from "react-router-dom";
import {getJwtToken} from 'api/index';
const LoginButton=() =>{
    function LogoutProcedure ()
    {
      localStorage.removeItem("jwt");
      localStorage.removeItem("refreshToken");
    }
    const location = useLocation();
    return (
        (getJwtToken() != null) ? <NavLink to={location.pathname} className={"login"} style={{ textDecoration: 'none' }} onClick={LogoutProcedure}>Logout</NavLink>
          : <NavLink to="/login" className={"login"} style={{ textDecoration: 'none' }}>Login</NavLink>
  )
};
export default LoginButton;