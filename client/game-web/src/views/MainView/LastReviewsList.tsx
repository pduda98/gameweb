import { LastReviewsList } from '../../api/responses';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

const LastReviewsListComponent: React.FC = () => {
    const [result, setResult] = useState<LastReviewsList | null>(null);

    const api = axios.create({
        //baseURL: 'https://localhost:7205/api/v1',
        responseType: 'json',
    });

    useEffect(() => {
        api.get<LastReviewsList>('https://localhost:7205/api/v1/reviews').then(res => setResult(res.data))
    }, [])
    

    if (result === null){
        return <div/>;
    }
    console.log(result);
    let reviews = result.reviews;
    return (
        <div>

        {reviews.flatMap(({ title, creationTime, userName , rating }) => (
            [
                <div>{title}</div>,
                <div>{creationTime}, {userName}</div>,
                <div>{rating}</div>
            ]
            ))}
        </div>
    )
}


export default LastReviewsListComponent;