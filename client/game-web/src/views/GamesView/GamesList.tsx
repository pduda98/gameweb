import { TopGamesList } from '../../api/responses';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

const GamesList: React.FC = () => {
    const [result, setResult] = useState<TopGamesList | null>(null);

    const api = axios.create({
        //baseURL: 'https://localhost:7205/api/v1',
        responseType: 'json',
    });

    useEffect(() => {
        api.get<TopGamesList>('https://localhost:7205/api/v1/games').then(res => setResult(res.data))
    }, [])
    

    if (result === null){
        return <div/>;
    }
    console.log(result);
    let games = result.games;
    return (
        <div>

        {/* {reviews.flatMap(({ title, creationTime, userName , rating }) => (
            [
                <div>{title}</div>,
                <div>{creationTime}, {userName}</div>,
                <div>{rating}</div>
            ]
            ))} */}
        </div>
    )
}

export default GamesList;