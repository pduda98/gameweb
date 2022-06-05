import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from './logo.png';
import SearchIcon from './search.png';
import "./Searchbar.css"

const Searchbar=() =>{
    const [searchTerm,setSearchTerm] = useState('');
    return (
        <>
            <div className="logo">
                <NavLink to="/" style={{ textDecoration: 'none' }}><img src={Logo} alt="Logo" title="Logo" height={50}  /></NavLink>
            </div>
            <div className="search">
                <input
                    placeholder="Search for games or developers"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <NavLink to={`/search/${searchTerm}`}>
                    <img src={SearchIcon} id="searchIcon" alt="Search" width="25" height="25" />
                </NavLink>
            </div>
        </>
    )
};
export default Searchbar;