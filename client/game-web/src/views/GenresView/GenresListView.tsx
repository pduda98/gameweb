import { GenresList } from 'api/responses';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {api} from 'api/index';
import DevelopersListView from 'views/DevelopersView/DevelopersList';

const GenresListView: React.FC = () => {
    const [result, setResult] = useState<GenresList | null>(null);

    useEffect(() => {
        api.get<GenresList>('https://localhost:7205/api/v1/genres').then(res => setResult(res.data))
    }, [])


    if (result === null){
        return <div/>;
    }
    console.log(result);
    result.genres.forEach((genre) =>
        console.log(genre)
    );
    return (
        <div>
            <>
            { result.genres.map((genre) =>
                <div className='asd'><Link to={`/games/`}><h1>{genre}</h1></Link></div>
                )}
            </>
            
        </div>
    )
}

export default GenresListView;