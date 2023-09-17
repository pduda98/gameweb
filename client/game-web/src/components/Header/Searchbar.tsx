import { useState } from 'react';
import Logo from './logo.svg';
import "./Searchbar.css"

const Searchbar=() =>{
    const [searchTerm,setSearchTerm] = useState('');
    return (
        <>
            <div className="logo">
                <img src={Logo} alt="Logo" title="Logo" />
            </div>
            <div className="search">
                <input
                    placeholder="Szukaj gier lub deweloperów"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </>
    )
};
export default Searchbar;