import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from './logo.svg';
import SearchIcon from './search.png';
import "./Searchbar.css"

const Searchbar=() =>{
    const [searchTerm,setSearchTerm] = useState('');
    return (
        <>
            <div className="logo">
                <NavLink to="/" style={{ textDecoration: 'none' }}><img src={Logo} alt="Logo" title="Logo" /></NavLink>
            </div>
            <div className="search">
                <input
                    placeholder="Szukaj gier lub deweloperów"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Link to={`/search/${searchTerm}`}>
                    <img src={SearchIcon} id="search" alt="Search" width="25" height="25" />
                </Link>
            </div>
        </>
    )
};
export default Searchbar;