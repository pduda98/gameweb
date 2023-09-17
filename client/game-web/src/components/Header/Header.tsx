import "./Header.css"
import "./Navbar.tsx"
import Navbar from "./Navbar";
import Searchbar from "./Searchbar";

const Header=() =>{
    return (
        <header className='header'>
            <Searchbar />
            <Navbar />
        </header>
  )
};
export default Header;