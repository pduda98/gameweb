import { LastReviewsList } from 'api/responses';
import { useEffect, useState } from 'react';
import {api} from 'api/index';
import { Link } from 'react-router-dom';
import { getImagePath } from 'components/ImageView';
import { Rating } from 'react-simple-star-rating';

const LastReviewsListComponent: React.FC = () => {
    const [result, setResult] = useState<LastReviewsList | null>(null);

    useEffect(() => {
        api.get<LastReviewsList>('reviews').then(res => setResult(res.data))
    }, [])


    if (result === null){
        return <div/>;
    }

    let reviews = result.reviews;
    return (
        <div className='content'>

        {reviews.flatMap(({ title, content, userName , rating, game, }) => (
            [
                <div className="parent">
                    <div className="div1"><img src={getImagePath(game.id)} alt="Girl in a jacket" width="250"/></div>
                    <div className="div2">

                    <b>Average: {game.averageRating}</b> from {game.ratingsCount} ratings
                    <Rating
                            ratingValue={game.averageRating*10}
                            iconsCount={10}
                            initialValue={game.averageRating*10}
                            readonly={true}
                            size = {20}
                            fillColor={"#8f8cae"} /><br></br><br></br>
                        <b>Genres:</b><br></br>
                        {game.genres.map((genre) =>
                        <>
                            <i>{genre}</i><br></br>
                        </>
                        )}
                    </div>
                    <div className="div3"><h2>{title}</h2></div>
                    <div className="div4">
                        <h3>
                            <Link to={`/games/${game.id}`}>
                                <b>{game.name}</b> ({game.releaseYear})
                            </Link>
                        </h3>
                        <b>
                            <Link to={`/developers/${game.developer.id}`}>{game.developer.name}</Link>
                        </b>
                    </div>
                    <div className="div5">Review by <b>{userName}</b><br></br>{rating}/10<br></br>
                    <Rating
                            ratingValue={rating*10}
                            iconsCount={10}
                            initialValue={rating*10}
                            readonly={true}
                            size = {20}
                            fillColor={"#8f8cae"} />
                    </div>
                    <div className="div6">{content}</div>
                </div>
            ]
            ))}
        </div>
    )
}


export default LastReviewsListComponent;