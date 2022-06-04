import { GameResponse, GameReviewsList } from 'api/responses';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Game.css'
import {api, getJwtToken, getUserId} from 'api/index';
import imagePath from "..\\public\\gamecover.jpg"
import starImage from "..\\public\\star.png"
import plusImage from "..\\public\\plus.png"
import { GameReviewsListProjection } from 'api/projections';


const Game: React.FC = () => {
    const [resultGame, setResultGame] = useState<GameResponse | null>(null);
    const [resultReviews, setResultReviews] = useState<GameReviewsList | null>(null);
    const { id } = useParams();
    let gameId = id;
    const config = {
        headers: { Authorization: `Bearer ${getJwtToken()}` }
    };
    useEffect(() => {
        api.get<GameResponse>(`games/${id}`,config).then(res => setResultGame(res.data))
        api.get<GameReviewsList>(`games/${id}/reviews`).then(res => setResultReviews(res.data))
    }, [])
    
    function rateGame(rating: number) {
        api.post(`games/${gameId}/ratings`,{value: rating}, config);
        window.location.reload();
    }

    function removeReview(reviewId: string) {
        api.delete(`games/${gameId}/reviews/${reviewId}`, config);
        window.location.reload();
    }

    if (resultGame === null){
        return <div/>;
    }

    let game = resultGame;
    let reviews = resultReviews?.reviews;
    console.log(getUserId());
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
                    <Link to={`/games/${id}`}><img src={starImage} alt="s" width="25" height="25" onClick={() => rateGame(1)}/></Link>
                    <Link to={`/games/${id}`}><img src={starImage} alt="s" width="25" height="25" onClick={() => rateGame(2)}/></Link>
                    <Link to={`/games/${id}`}><img src={starImage} alt="s" width="25" height="25" onClick={() => rateGame(3)}/></Link>
                    <Link to={`/games/${id}`}><img src={starImage} alt="s" width="25" height="25" onClick={() => rateGame(4)}/></Link>
                    <Link to={`/games/${id}`}><img src={starImage} alt="s" width="25" height="25" onClick={() => rateGame(5)}/></Link>
                    <Link to={`/games/${id}`}><img src={starImage} alt="s" width="25" height="25" onClick={() => rateGame(6)}/></Link>
                    <Link to={`/games/${id}`}><img src={starImage} alt="s" width="25" height="25" onClick={() => rateGame(7)}/></Link>
                    <Link to={`/games/${id}`}><img src={starImage} alt="s" width="25" height="25" onClick={() => rateGame(8)}/></Link>
                    <Link to={`/games/${id}`}><img src={starImage} alt="s" width="25" height="25" onClick={() => rateGame(9)}/></Link>
                    <Link to={`/games/${id}`}><img src={starImage} alt="s" width="25" height="25" onClick={() => rateGame(10)}/></Link>
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
            {reviews!==undefined && !reviews.some(x => x.userId === getUserId()) && getUserId()!=="" &&
                <Link to={`/games/${id}/addReview`} ><img src={plusImage} alt="addReview" width="25" height="25"/></Link>
            }
            <div>
                {reviews===undefined ? <div></div> :
                reviews.flatMap(({id, title, content, userName , rating, creationTime, userId}) => (
                [
                <div className="review" key={id}>
                    <div><h2>{title}</h2></div>
                    <div>Review by <b>{userName}</b>
                    { userId === getUserId() && 
                        <div>
                            <Link to={`/games/${gameId}/editReview/${id}`} style={{ textDecoration: 'none' }}>Edytuj</Link>
                            <p onClick={() => removeReview(id)}>Usuń</p>
                        </div>
                    }
                    </div>
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