import "./Navbar.css"
import { NavLink } from "react-router-dom";

const Navbar=() =>{
    return (
            <nav className='navbar'>
                <div className='navbar_inner'>
                    <ul>
                        <li><NavLink to="/games" style={{ textDecoration: 'none' }}>GRY</NavLink></li>
                        <li><NavLink to="/developers" style={{ textDecoration: 'none' }}>DEWELOPERZY</NavLink></li>
                        <li><NavLink to="/genres" style={{ textDecoration: 'none' }}>GATUNKI</NavLink></li>
                    </ul>
                </div>
            </nav>
    )
};
export default Navbar;