import { LastReviewsList, SearchResponse } from 'api/responses';
import { useEffect, useState } from 'react';
import {api} from 'api/index';
import { Link, useParams } from 'react-router-dom';

const SearchView: React.FC = () => {
    const [result, setResult] = useState<SearchResponse | null>(null);
    const { searchString } = useParams();
    useEffect(() => {
        api.get<SearchResponse>(`search?searchString=${searchString}`).then(res => setResult(res.data))
    }, [])


    if (result === null){
        return <div/>;
    }

    let games = result.games;
    let developers = result.developers;
    return (
        <div className="parent-list">
            <h1>Games</h1>
            {games.flatMap(({ id, name, releaseYear }) => (
                [
                    <div>
                        <p><Link to={`/games/${id}`}>{name} ({releaseYear})</Link></p>
                    </div>
                ]
                ))}
            <h1>Developers</h1>
            {developers.flatMap(({ id, name }) => (
                [
                    <div>
                        <p><Link to={`/developers/${id}`}>{name}</Link></p>
                    </div>
                ]
                ))}
        </div>
    )
}


export default SearchView;