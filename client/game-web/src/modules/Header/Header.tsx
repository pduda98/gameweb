import "./Header.css"
import Navbar from "components/Navbar";
import Searchbar from "components/Searchbar";
import LoginButton from "components/LoginButton";

const Header=() =>{
    return (
        <header className='header'>
            <Searchbar />
            <Navbar />
            <LoginButton />
        </header>
  )
};
export default Header;