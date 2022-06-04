import { GenresList, TopGamesList } from 'api/responses';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {api} from 'api/index';
import './GamesList.css'

const GamesList: React.FC = () => {
    const [gamesResult, setResultGames] = useState<TopGamesList | null>(null);
    const [genresResult, setResultGenres] = useState<GenresList | null>(null);
    const [filter, setFilter] = useState('all');
    const [year, setYear] = useState('');

    useEffect(() => {
        api.get<TopGamesList>('games').then(res => setResultGames(res.data))
        api.get<GenresList>('genres').then(res => setResultGenres(res.data))
    }, [])

    const onChange = (event: { persist: () => void; target: { id: any; name: any; value: any; type: any; }; }) => {
        event.persist()
        const {value, type} = event.target;

        if (type === 'radio') {
          setFilter(value);
        }
    }

    const handleChange = (event: { target: { value: string; }; }) => {
        const result = event.target.value.replace(/\D/g, '');

        setYear(result);
    };
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

    const handleFilter = async () => {
        if(filter == 'all'){
            (year != '') ? await api.get<TopGamesList>(`games?year=${year}`).then(res => setResultGames(res.data))
            :await api.get<TopGamesList>('games').then(res => setResultGames(res.data))
        }
        else{
            (year != '') ? await api.get<TopGamesList>(`games?genre=${filter}&year=${year}`).then(res => setResultGames(res.data))
            :await api.get<TopGamesList>(`games?genre=${filter}`).then(res => setResultGames(res.data))
        }
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
                <input type="text" placeholder="Year" value={year} onChange={handleChange}/>
                    <input type="radio" name='filter' className='filterCheck' value='all' checked={filter === 'all'}
                        onChange={onChange}></input>
                        <label>All</label>
                    {(genresResult!==null) ? genresResult.genres.map((genre) =>
                        <><input type="radio" name='filter' className='filterCheck' value={genre} checked={filter === genre}
                                onChange={onChange}></input>
                            <label>{genre}</label></>
                        ) : ""
                    }
                    <input type='submit' className="submitFilter" onClick={handleFilter}/>
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
                            {genres.map((genre) =>
                                <b key={genre}>{genre}</b>
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