import { GameResponse, GameReviewsList } from 'api/responses';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Game.css'
import {api} from 'api/index';

const Game: React.FC = () => {
    const [resultGame, setResultGame] = useState<GameResponse | null>(null);
    const [resultReviews, setResultReviews] = useState<GameReviewsList | null>(null);
    const { id } = useParams();

    useEffect(() => {
        api.get<GameResponse>(`games/${id}`).then(res => setResultGame(res.data))
        api.get<GameReviewsList>(`games/${id}/reviews`).then(res => setResultReviews(res.data))
    }, [])

    if (resultGame === null){
        return <div/>;
    }

    let game = resultGame;
    let reviews = resultReviews?.reviews;
    return (
        <div>
            <div className="singleGame">
                <div className="image"><img src="gamecover.jpg" alt="Girl in a jacket" width="250" height="300"/></div>
                <div className="title">
                    <h2>{game.name}</h2><br></br>
                    {game.releaseDate.toString()}
                </div>
                <div className="ratings">
                    Your rating: {game.usersRating}
                    <b>{game.averageRating}</b> from {game.ratingsCount} ratings
                </div>
                <div className="genres">
                    <p><b>Genres:</b></p><br></br>
                    <>
                        {game.genres.forEach((genre) =>
                            <p>{genre}</p>
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