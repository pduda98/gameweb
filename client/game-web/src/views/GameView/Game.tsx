import { GameResponse, GameReviewsList } from 'api/responses';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Game.css'
import {api, getJwtToken, getUserId} from 'api/index';
import plusImage from "..\\public\\plus.png"
import { Rating } from 'react-simple-star-rating'
import { toast } from 'react-toastify';
import { getImagePath } from 'components/ImageView';


const Game: React.FC = () => {
    const navigate = useNavigate();
    const [resultGame, setResultGame] = useState<GameResponse | null>(null);
    const [resultReviews, setResultReviews] = useState<GameReviewsList | null>(null);
    const [rating, setRating] = useState(0);
    const { id } = useParams();
    let gameId = id;
    const config = {
        headers: { Authorization: `Bearer ${getJwtToken()}` }
    };
    useEffect(() => {
        api.get<GameResponse>(`games/${id}`,config).then(res => setResultGame(res.data))
        api.get<GameReviewsList>(`games/${id}/reviews`).then(res => setResultReviews(res.data))
    }, [rating])


    const handleRating = async (rate: number) => {
        if (getUserId()!=="")
        {
            const res = await api.post(`games/${gameId}/ratings`,{value: rate/10}, config);
            if (res.data != null && res.status === 200) {
                toast.success('Updated rating!', {
                    position: "bottom-left",
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });
            }
            setRating(rate)
        }else{
            navigate(`/login`, { replace: true });
        }
    }

    async function removeReview(reviewId: string) {
        const res = await api.delete(`games/${gameId}/reviews/${reviewId}`, config);
        if (res.data != null && res.status === 204) {
            toast.success('Review deleted!', {
                position: "bottom-left",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
            window.location.reload();
        }
    }

    if (resultGame === null){
        return <div/>;
    }

    let game = resultGame;
    let reviews = resultReviews?.reviews;
    return (
        <div>
            <div className="singleGame" key={game.id}>
                <div className="image"><img src={getImagePath(game.id)} alt="game cover" width="250"/></div>
                <div className="title">
                    <h2>{game.name}</h2><br></br>
                    {game.releaseDate.toString().split("T")[0]}
                </div>
                <div className="ratings">
                    {(game.usersRating != null) ? `Your rating: ${game.usersRating}` : "No rating"}
                    <br></br>
                    <b>Average rating: {game.averageRating}</b> from {game.ratingsCount} ratings
                    <br></br>
                    <Rating
                        onClick={handleRating}
                        ratingValue={rating}
                        iconsCount={10}
                        initialValue={game.usersRating}
                        size = {20}
                        fillColor={"#8f8cae"}
                    />
                </div>
                <div className="genres">
                    <b>Genres:</b><br></br>
                        {game.genres.map((genre) =>
                        <>
                            <i>{genre}</i><br></br>
                        </>
                        )}
                </div>
                <div className="description"><b>Description:</b><br></br> {game.description}</div>
                <div className="developer">
                    <b>Developer: <Link to={`/developers/${game.developer.id}`}>
                            {game.developer.name}
                        </Link>
                    </b>
                </div>
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
                            <Link to={`/games/${gameId}/editReview/${id}`} style={{ textDecoration: 'none' }}>Edit</Link>
                            <p onClick={() => removeReview(id)}>Delete</p>
                        </div>
                    }
                    </div>
                    <div>at {creationTime.toString().split("T")[0]}</div>
                    <div>
                        <Rating
                        ratingValue={rating*10}
                        iconsCount={10}
                        initialValue={rating*10}
                        readonly={true}
                        size = {20}
                        fillColor={"#8f8cae"}
                    />
                    </div>
                    <div>{content}</div>
                </div>
                ]
            ))}
            </div>
        </div>
    )
}

export default Game;