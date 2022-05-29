import { DevelopersList } from 'api/responses';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {api} from 'api/index';

const DevelopersListView: React.FC = () => {
    const [result, setResult] = useState<DevelopersList | null>(null);

    useEffect(() => {
        api.get<DevelopersList>('https://localhost:7205/api/v1/developers').then(res => setResult(res.data))
    }, [])


    if (result === null){
        return <div/>;
    }

    let developers = result.developers;
    return (
        <div>

        { developers.flatMap(({ id, name, establishmentYear, location}) => (
            [
                <div className="element-list" key={id}>
                    <div className="div9"><img src="gamecover.jpg" alt="Girl in a jacket" width="250" height="250"/></div>
                    <div className="div10"><h1><Link to={`/developers/${id}`}>{name}</Link></h1></div>
                    <div className="div11"><b>Developer established in {establishmentYear}</b></div>
                    <div className="div12"><b>Locaed in {location}</b></div>
                </div>
            ]
            ))}
        </div>
    )
}

export default DevelopersListView;