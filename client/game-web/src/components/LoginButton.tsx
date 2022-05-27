import "./Navbar.css"
import { NavLink } from "react-router-dom";

const LoginButton=() =>{
    return (
        <NavLink to="/login" className={"login"} style={{ textDecoration: 'none' }}>Login</NavLink>
  )
};
export default LoginButton;