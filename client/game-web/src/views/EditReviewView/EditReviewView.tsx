import {api, getJwtToken, setTokens} from 'api/index';
import starImage from "..\\public\\star.png"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { GameReviewsListProjection } from 'api/projections';
import React from 'react';

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
    let rating = resultReview?.rating;
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        let title = document.getElementById('title') as HTMLInputElement;
        let reviewContent = document.getElementById('review-content') as HTMLInputElement;

        const config = {
            headers: { Authorization: `Bearer ${getJwtToken()}` }
        };
        let res = await api.put(`games/${gameId}/reviews/${reviewId}`,{title: title.value, content: reviewContent.value, rating: rating===0 ? null: rating}, config);
        if (res.data != null && res.status === 200)
        {
            navigate(`/games/${gameId}/`, { replace: true });
        }
    };

    function setRating(number: number): void {
        rating = number;
    }

    return (
    <div className="form" onSubmit={handleSubmit} >
        <form autoComplete="off">
            <img src={starImage} alt="s" width="25" height="25" onClick={() => setRating(1)}/>
            <img src={starImage} alt="s" width="25" height="25" onClick={() => setRating(2)}/>
            <img src={starImage} alt="s" width="25" height="25" onClick={() => setRating(3)}/>
            <img src={starImage} alt="s" width="25" height="25" onClick={() => setRating(4)}/>
            <img src={starImage} alt="s" width="25" height="25" onClick={() => setRating(5)}/>
            <img src={starImage} alt="s" width="25" height="25" onClick={() => setRating(6)}/>
            <img src={starImage} alt="s" width="25" height="25" onClick={() => setRating(7)}/>
            <img src={starImage} alt="s" width="25" height="25" onClick={() => setRating(8)}/>
            <img src={starImage} alt="s" width="25" height="25" onClick={() => setRating(9)}/>
            <img src={starImage} alt="s" width="25" height="25" onClick={() => setRating(10)}/>
                
            <div className="input-container">
                <label>Title </label>
                <input type="text" id="title" defaultValue={resultReview?.title} required />
            </div>
            <div className="input-container">
                <label>Content </label>
                <textarea id="review-content" defaultValue={resultReview?.content} required />
            </div>
            <div className="button-container">
                <input type="submit" />
            </div>
        </form>
    </div>
    )
}

export default EditReviewView;

