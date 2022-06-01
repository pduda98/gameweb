import { TopGamesList } from 'api/responses';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {api} from 'api/index';
import './GamesList.css'

const GamesList: React.FC = () => {
    const [result, setResult] = useState<TopGamesList | null>(null);

    useEffect(() => {
        api.get<TopGamesList>('games').then(res => setResult(res.data))
    }, [])


    if (result === null){
        return <div/>;
    }

    let games = result.games;
    return (
        <div>

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