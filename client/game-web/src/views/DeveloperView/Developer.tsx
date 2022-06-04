import { DeveloperResponse } from 'api/responses';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import 'views/GamesView/GamesList.css'
import {api} from 'api/index';
import imagePath from "..\\public\\gamecover.jpg"

const Developer: React.FC = () => {
    const [result, setResult] = useState<DeveloperResponse | null>(null);
    const { id } = useParams();

    useEffect(() => {
        api.get<DeveloperResponse>(`https://localhost:7205/api/v1/developers/${id}`).then(res => setResult(res.data))
    }, [])

    if (result === null){
        return <div/>;
    }

    let developer = result;
    return (
        <div>
            <div className="parent">
                <div className="div1"><img src={imagePath} alt="asd" width="250" height="300"/></div>
                <div className="div2"> <b>
                    <a target="_blank" href={developer.webAddress}>{developer.webAddress}</a></b></div>
                <div className="div3">
                </div>
                <div className="div4"><h2>{developer.name}</h2></div>
                <div className="div5">
                </div>
                <div className="div6">{developer.location}</div>
                <div className="div7">{developer.establishmentYear}</div>
                <div className="div8">{developer.description}</div>
            </div>
            <div>
                <h1>Games</h1>
                {developer.games.flatMap(({ id , name , averageRating ,usersRating ,genres }) => (
                    [
                        <div className="element-list">
                        <div className="div9"><img src={imagePath} alt="asd" width="200" height="200"/></div>
                        <div className="div10"><Link to={`/games/${id}`} style={{ textDecoration: 'none' }}>{name}</Link></div>
                        <div className="div11"><b>{averageRating}</b></div>
                        <div className="div12">
                            <p><b>Genres:</b></p><br></br>
                                {genres.map((genre) =>
                                    <p>{genre}</p>
                                )}
                            </div>
                    </div>
                ]
                ))}
            </div>
        </div>
    )
}

export default Developer;