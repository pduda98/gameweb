import {api, getJwtToken, setTokens} from 'api/index';
import starImage from "..\\public\\star.png"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { GameReviewsListProjection } from 'api/projections';
import React from 'react';
import { Rating } from 'react-simple-star-rating';
import { toast } from 'react-toastify';

const EditReviewView: React.FC = () => {
    const navigate = useNavigate();
    const [resultReview, setResultReview] = useState<GameReviewsListProjection | null>(null);
    const { gameId, reviewId } = useParams();
    const config = {
        headers: { Authorization: `Bearer ${getJwtToken()}` }
    };
    useEffect(() => {
        api.get<GameReviewsListProjection>(`games/${gameId}/reviews/${reviewId}`,config).then(res => setResultReview(res.data))
    }, [])
    var rateValue = resultReview?.rating;
    const [rating, setRating] = useState(0);
    const handleRating = async (rate: number) => {
        setRating(rate);
    }
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        let title = document.getElementById('title') as HTMLInputElement;
        let reviewContent = document.getElementById('review-content') as HTMLInputElement;

        const config = {
            headers: { Authorization: `Bearer ${getJwtToken()}` }
        };
        try{
            let res = await api.put(`games/${gameId}/reviews/${reviewId}`,
                {
                    title: title.value,
                    content: reviewContent.value,
                    rating: rating===0 ? null: rating/10
                },
                config
            );
            if (res.data != null && res.status === 200)
            {
                toast.success('Review edited successfully!', {
                    position: "bottom-left",
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    });
                navigate(`/games/${gameId}/`, { replace: true });
            }
        }
        catch{
            toast.error('Edit unsuccessful!', {
                position: "bottom-left",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                });
        }
    };

    return (
    <div className="form" onSubmit={handleSubmit} >
        <form autoComplete="off">
            <Rating
                onClick={handleRating}
                ratingValue={rating}
                iconsCount={10}
                initialValue={rateValue}
                size = {20}
                fillColor={"#8f8cae"}
            />
            <div className="input-container">
                <label>Title </label>
                <input type="text" id="title" defaultValue={resultReview?.title} required />
            </div>
            <div className="input-container">
                <label>Content </label>
                <textarea id="review-content" defaultValue={resultReview?.content} required />
            </div>
            <div className="button-container">
                <input type="submit" value="Submit"/>
            </div>
        </form>
    </div>
    )
}

export default EditReviewView;

