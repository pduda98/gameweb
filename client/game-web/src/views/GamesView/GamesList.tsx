import { GenresList, TopGamesList } from 'api/responses';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {api} from 'api/index';
import './GamesList.css'
import { toast } from 'react-toastify';
import { getImagePath } from 'components/ImageView';
import { Rating } from 'react-simple-star-rating';

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
        if(filter === 'all'){
            (year !== '') ? await api.get<TopGamesList>(`games?year=${year}`).then(res => setResultGames(res.data))
            :await api.get<TopGamesList>('games').then(res => setResultGames(res.data))
        }
        else{
            (year !== '') ? await api.get<TopGamesList>(`games?genre=${filter}&year=${year}`).then(res => setResultGames(res.data))
            :await api.get<TopGamesList>(`games?genre=${filter}`).then(res => setResultGames(res.data))
        }
        toast.info('Filters applied', {
            position: "bottom-left",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
        });
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
                    <input type="text" placeholder="Year" value={year} onChange={handleChange}/><br></br>
                    <div className='filterGenresWrapper'>
                        <label htmlFor='all' className='filterLabel'>
                            <input id='all' type="radio" name='filter' className='filterRadio' value='all' checked={filter === 'all'}
                                onChange={onChange}>
                            </input>
                            <div className="filterDesign"></div>
                            All
                        </label>
                        {(genresResult!==null) ? genresResult.genres.map((genre) =>
                            <>
                                <label htmlFor={genre} className='filterLabel'>
                                    <input id={genre} type="radio" name='filter' className='filterRadio' value={genre} checked={filter === genre}
                                        onChange={onChange}>
                                    </input>
                                    <div className="filterDesign"></div>
                                    {genre}
                                </label></>
                            ) : ""
                        }
                    </div>
                    <input type='submit' className="submitFilter" onClick={handleFilter} value="Submit"/>
                </div>
            </fieldset>
        { games.flatMap(({ id, name, averageRating, usersRating, genres}) => (
            [
                <div className="game" key={id}>
                    <div className="image"><img src={getImagePath(id)} alt="game cover" width="250"/></div>
                    <div className="title"><h1><Link to={`/games/${id}`} style={{ textDecoration: 'none' }}>{name}</Link></h1>
                        <b>Average rating:</b><br></br>
                        <Rating
                            ratingValue={averageRating*10}
                            iconsCount={10}
                            initialValue={averageRating*10}
                            readonly={true}
                            size = {20}
                            fillColor={"#8f8cae"} /><br></br>
                        <b>Your rating:</b><br></br>
                        <Rating
                            ratingValue={usersRating*10}
                            iconsCount={10}
                            initialValue={usersRating*10}
                            readonly={true}
                            size = {20}
                            fillColor={"#8f8cae"} /><br></br>
                    <b>Genres:</b><br></br>
                        {genres.map((genre) =>
                        <>
                            <i>{genre}</i><br></br>
                        </>
                        )}
                    </div>
                </div>
            ]
            ))}
        </div>
    )
}

export default GamesList;