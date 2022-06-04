import {api, getJwtToken, setTokens} from 'api/index';
import starImage from "..\\public\\star.png"
import { useNavigate, useParams } from "react-router-dom";
import { GameReviewsListProjection } from 'api/projections';
import { useState } from 'react';
import { Rating } from 'react-simple-star-rating';

const AddReviewView: React.FC = () => {
    const navigate = useNavigate();
    const { id: gameId } = useParams();

    const [rating, setRating] = useState(0);
    const handleRating = async (rate: number) => {
        setRating(rate);
    }
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        //Prevent page reload
        event.preventDefault();

        let title = document.getElementById('title') as HTMLInputElement;
        let reviewContent = document.getElementById('review-content') as HTMLInputElement;
        const config = {
            headers: { Authorization: `Bearer ${getJwtToken()}` }
        };
        let res = await api.post(`games/${gameId}/reviews`,
            {
                title: title.value,
                content: reviewContent.value,
                rating: rating===0 ? null: rating/10
            },
            config);
        if (res.data != null && res.status === 200)
        {
            navigate(`/games/${gameId}/`, { replace: true });
        }
    };


    return (
    <div className="form" onSubmit={handleSubmit} >
        <form autoComplete="off">
            <Rating 
                onClick={handleRating}
                ratingValue={rating}
                iconsCount={10}
                initialValue={0}
                size = {20}
                fillColor={"#8f8cae"}
            />
                
            <div className="input-container">
                <label>Title </label>
                <input type="text" id="title" required />
            </div>
            <div className="input-container">
                <label>Content </label>
                <textarea id="review-content" required />
            </div>
            <div className="button-container">
                <input type="submit" />
            </div>
        </form>
    </div>
    )
}

export default AddReviewView;

