import { GenresList, TopGamesList } from 'api/responses';
import { SetStateAction, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {api} from 'api/index';
import './GamesList.css'

const GamesList: React.FC = () => {
    const [gamesResult, setResultGames] = useState<TopGamesList | null>(null);
    const [genresResult, setResultGenres] = useState<GenresList | null>(null);
    const [value, setValue] = useState("");

    useEffect(() => {
        api.get<TopGamesList>('games').then(res => setResultGames(res.data))
        api.get<GenresList>('https://localhost:7205/api/v1/genres').then(res => setResultGenres(res.data))
    }, [])

    function displayFilters()
    {
        var filter = document.getElementById("filters");
        if(filter != null){
            if (filter.style.display === "block") {
                filter.style.display = "none";
            } else {
                filter.style.display = "block";
            }
        }
    }

    const handleChange = (event: { target: { value: any; }; }) => {
        console.log(event.target.value);
        setValue(event.target.value);
    }

    if (gamesResult === null){
        return <><p>No games</p><div /></>;
    }

    let games = gamesResult.games;
    return (
        <div>
            <button type="button" className="collapsible" onClick={displayFilters}>Filter</button>
            <fieldset>
                <div id="filters">
                    {(genresResult!==null) ? genresResult.genres.map((genre) =>
                        <><input type="radio" name='filter' className='filterCheck' checked={value === genre} onChange={handleChange}></input><label>{genre}</label></>
                        ) : ""
                    }
            </div>
            </fieldset>
        { games.flatMap(({ id, name, averageRating, usersRating, genres}) => (
            [
                <div className="game" key={id}>
                    <div className="image"><img src="gamecover.jpg" alt="Girl in a jacket" width="250" height="300"/></div>
                    <div className="title"><h1><Link to={`/games/${id}`} style={{ textDecoration: 'none' }}>{name}</Link></h1></div>
                    <div className="averageRating"><b>Average rating: {averageRating}</b></div>
                    <div className="userRating"><b>Your rating: {usersRating}</b></div>
                    <div className="genres">
                        <p><b>Genres:</b></p>
                        <>
                            {genres.forEach((genre) =>
                                <h3>{genre}</h3>
                            )}
                        </>
                    </div>
                </div>
            ]
            ))}
        </div>
    )
}

export default GamesList;