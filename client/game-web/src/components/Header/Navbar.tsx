import "./Navbar.css"
import {
    BrowserRouter,
    Routes,
    Route,
    NavLink,
  } from "react-router-dom";
import GamesListComponent from "../../views/GamesView/GamesList";

const Navbar=() =>{
    return (
        <BrowserRouter>
            <nav className='navbar'>
                <div className='navbar_inner'>
                    <ul>
                        <li><NavLink to="/games">GRY</NavLink></li>
                        <li><NavLink to="/developers">DEWELOPERZY</NavLink></li>
                        <li><NavLink to="/genres">GATUNKI</NavLink></li>
                    </ul>
                    <Routes>
                        <Route path="/games" element={<GamesListComponent />}/>
                        <Route path="/developers" element={<GamesListComponent />}/>
                        <Route path="/genres" element={<GamesListComponent />}/>
                    </Routes>
                </div>
            </nav>
        </BrowserRouter>
    )
};
export default Navbar;