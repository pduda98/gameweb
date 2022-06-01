import "./Navbar.css"
import { NavLink } from "react-router-dom";

const Navbar=() =>{
    return (
            <nav className='navbar'>
                <div className='navbar_inner'>
                    <ul>
                        <li>GRY</li>
                        <li>DEWELOPERZY</li>
                        <li>GATUNKI</li>
                    </ul>
                </div>
            </nav>
    )
};
export default Navbar;