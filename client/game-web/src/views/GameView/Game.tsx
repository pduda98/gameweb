import { GameResponse, GameReviewsList } from 'api/responses';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Game.css'
import {api, getJwtToken} from 'api/index';
import imagePath from "..\\public\\gamecover.jpg"
import starImage from "..\\public\\star.png"

function rateGame(rating: number, gameId: string, alreadyRated: boolean) {
    const config = {
        headers: { Authorization: `Bearer ${getJwtToken()}` }
    };
    api.post(`games/${gameId}/ratings`,{value: rating}, config);
}

const Game: React.FC = () => {
    const [resultGame, setResultGame] = useState<GameResponse | null>(null);
    const [resultReviews, setResultReviews] = useState<GameReviewsList | null>(null);
    const { id } = useParams();

    const config = {
        headers: { Authorization: `Bearer ${getJwtToken()}` }
    };
    useEffect(() => {
        api.get<GameResponse>(`games/${id}`,config).then(res => setResultGame(res.data))
        api.get<GameReviewsList>(`games/${id}/reviews`).then(res => setResultReviews(res.data))
    }, [])

    if (resultGame === null){
        return <div/>;
    }

    let game = resultGame;
    let reviews = resultReviews?.reviews;
    return (
        <div>
            <div className="singleGame" key={game.id}>
                <div className="image"><img src={imagePath} alt="nfs" width="250" height="300"/></div>
                <div className="title">
                    <h2>{game.name}</h2><br></br>
                    {game.releaseDate.toString()}
                </div>
                <div className="ratings">
                    {(game.usersRating != null) ? `Your rating: ${game.usersRating}` : "No rating"}
                    <br></br>
                    <b>Average rating: {game.averageRating}</b> from {game.ratingsCount} ratings
                    <br></br>
                    <Link to={`/games/${id}`}><img src={starImage} alt="s" width="25" height="25" onClick={() => rateGame(1,game.id, (game.usersRating != null))}/></Link>
                    <Link to={`/games/${id}`}><img src={starImage} alt="s" width="25" height="25" onClick={() => rateGame(2,game.id, (game.usersRating != null))}/></Link>
                    <Link to={`/games/${id}`}><img src={starImage} alt="s" width="25" height="25" onClick={() => rateGame(3,game.id, (game.usersRating != null))}/></Link>
                    <Link to={`/games/${id}`}><img src={starImage} alt="s" width="25" height="25" onClick={() => rateGame(4,game.id, (game.usersRating != null))}/></Link>
                    <Link to={`/games/${id}`}><img src={starImage} alt="s" width="25" height="25" onClick={() => rateGame(5,game.id, (game.usersRating != null))}/></Link>
                    <Link to={`/games/${id}`}><img src={starImage} alt="s" width="25" height="25" onClick={() => rateGame(6,game.id, (game.usersRating != null))}/></Link>
                    <Link to={`/games/${id}`}><img src={starImage} alt="s" width="25" height="25" onClick={() => rateGame(7,game.id, (game.usersRating != null))}/></Link>
                    <Link to={`/games/${id}`}><img src={starImage} alt="s" width="25" height="25" onClick={() => rateGame(8,game.id, (game.usersRating != null))}/></Link>
                    <Link to={`/games/${id}`}><img src={starImage} alt="s" width="25" height="25" onClick={() => rateGame(9,game.id, (game.usersRating != null))}/></Link>
                    <Link to={`/games/${id}`}><img src={starImage} alt="s" width="25" height="25" onClick={() => rateGame(10,game.id, (game.usersRating != null))}/></Link>
                </div>
                <div className="genres">
                    <p><b>Genres:</b></p><br></br>
                    <>
                        {game.genres.map((genre) =>
                            <p key={genre}>{genre}</p>
                        )}
                    </>
                </div>
                <div className="description">Description: {game.description}</div>
                <div className="developer"><p><b>Developer: {game.developer.name}</b></p></div>
            </div>
            <h1 className="reviewHeader">REVIEWS</h1>
            <div>
                {reviews===undefined ? <div></div> :
                reviews.flatMap(({id, title, content, userName , rating, creationTime }) => (
                [
                <div className="review" key={id}>
                    <div><h2>{title}</h2></div>
                    <div>Review by <b>{userName}</b></div>
                    <div>at {creationTime.toString()}</div>
                    <div>{rating}/10</div>
                    <div>{content}</div>
                </div>
                ]
            ))}
            </div>
        </div>
    )
}

export default Game;