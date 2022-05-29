import { LastReviewsList } from 'api/responses';
import { useEffect, useState } from 'react';
import {api} from 'api/index';

const LastReviewsListComponent: React.FC = () => {
    const [result, setResult] = useState<LastReviewsList | null>(null);

    useEffect(() => {
        api.get<LastReviewsList>('https://localhost:7205/api/v1/reviews').then(res => setResult(res.data))
    }, [])


    if (result === null){
        return <div/>;
    }

    let reviews = result.reviews;
    return (
        <div>

        {reviews.flatMap(({ title, content, userName , rating, game, }) => (
            [
                <div className="parent">
                <div className="div1"><img src="gamecover.jpg" alt="Girl in a jacket" width="250" height="300"/></div>
                <div className="div2"> <b>{game.averageRating}</b> from {game.ratingsCount} ratings</div>
                <div className="div3">
                    <p><b>Genres:</b></p><br></br>
                    {game.genres.map((genre) =>
                        <p>{genre}</p>
                    )}
                </div>
                <div className="div4"><h2>{title}</h2></div>
                <div className="div5">
                    <h3><b>{game.name}</b> ({game.releaseYear})</h3>
                    <p><b>{game.developer.name}</b></p>
                </div>
                <div className="div6">Review by <b>{userName}</b></div>
                <div className="div7">{rating}/10</div>
                <div className="div8">{content}</div>
                </div>
            ]
            ))}
        </div>
    )
}


export default LastReviewsListComponent;