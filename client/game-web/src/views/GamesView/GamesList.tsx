import { TopGamesList } from 'api/responses';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import './GamesList.css'

const GamesList: React.FC = () => {
    const [result, setResult] = useState<TopGamesList | null>(null);

    const api = axios.create({
        //baseURL: 'https://localhost:7205/api/v1',
        responseType: 'json',
    });

    useEffect(() => {
        api.get<TopGamesList>('https://localhost:7205/api/v1/games').then(res => setResult(res.data))
    }, [])
    

    if (result === null){
        return <div/>;
    }
    console.log(result);
    let games = result.games;
    return (
        <div>

        { games.flatMap(({ name, averageRating, usersRating, genres}) => (
            [
                <div className="game">
                    <div className="image"><img src="gamecover.jpg" alt="Girl in a jacket" width="250" height="300"/></div>
                    <div className="title"><h1>{name}</h1></div>
                    <div className="averageRating"><b>Average rating: {averageRating}</b></div>
                    <div className="userRating"><b>Your rating: {usersRating}</b></div>
                    <div className="genres">
                        <p><b>Genres:</b></p>
                        {genres.map((genre) =>
                            <h3>{genre}</h3>
                        )}
                    </div>
                </div>
            ]
            ))}
        </div>
    )
}

export default GamesList;