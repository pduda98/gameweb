import { GameResponse } from 'api/responses';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'views/GamesView/GamesList.css'
import {api} from 'api/index';
import imagePath from "..\\public\\gamecover.jpg"

const Game: React.FC = () => {
    const [result, setResult] = useState<GameResponse | null>(null);
    const { id } = useParams();

    useEffect(() => {
        api.get<GameResponse>(`https://localhost:7205/api/v1/games/${id}`).then(res => setResult(res.data))
    }, [])

    if (result === null){
        return <div/>;
    }

    let game = result;
    return (
        <div>
            <div className="game" key={game.id}>
                <div className="image"><img src={imagePath} alt="nfs" width="250" height="300"/></div>
                <div className="title"><h2>{game.name}</h2></div>
                <div className="averageRating"> <b>{game.averageRating}</b> from {game.ratingsCount} ratings</div>
                <div className="userRating">{game.usersRating}</div>
                <div className="genres">
                    <p><b>Genres:</b></p><br></br>
                    <>
                        {game.genres.forEach((genre) =>
                            <p>{genre}</p>
                        )}
                    </>
                </div>
                <div className="div4">{game.description}</div>
                <div className="div6">{game.releaseDate.toString()}</div>
                <div className="div5">
                    <p><b>{game.developer.name}</b></p>
                </div>
            </div>
        </div>
    )
}

export default Game;