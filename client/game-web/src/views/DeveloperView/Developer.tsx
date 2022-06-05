import { DeveloperResponse } from 'api/responses';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import 'views/GamesView/GamesList.css'
import {api} from 'api/index';
import { getImagePath } from 'components/ImageView';
import { Rating } from 'react-simple-star-rating';

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
    console.log(result.id);
    return (
        <div>
            <div className="main-developer">
                <div className="div1"><img src={getImagePath(developer.id)} alt="asd" width="250"/><br></br><b>
                    <a target="_blank" href={developer.webAddress}>{developer.webAddress}</a></b></div>
                <div className="div3"><h2>{developer.name}</h2></div>
                <div className="div4">
                    <>Located in {developer.location}<br></br>
                    <b>Developer established in {developer.establishmentYear}</b><br></br><br></br>
                    {developer.description}
                    </>
                </div>
                <div className="div6"></div>
            </div>
            <div>
                <h1>Games</h1>
                {developer.games.flatMap(({ id , name , averageRating ,usersRating ,genres }) => (
                    [
                        <div className="game" key={id}>
                    <div className="image"><img src={getImagePath(id)} alt="game cover" width="200"/></div>
                    <div className="title"><h1><Link to={`/games/${id}`} style={{ textDecoration: 'none' }}>{name}</Link></h1>
                        <b>Average rating:</b><br></br>
                        <Rating
                            ratingValue={averageRating*10}
                            iconsCount={10}
                            initialValue={averageRating*10}
                            readonly={true}
                            size = {20}
                            fillColor={"#8f8cae"} /><br></br>
                        <b>Your rating:</b><br></br>
                        <Rating
                            ratingValue={usersRating*10}
                            iconsCount={10}
                            initialValue={usersRating*10}
                            readonly={true}
                            size = {20}
                            fillColor={"#8f8cae"} /><br></br>
                    <b>Genres:</b><br></br>
                        {genres.map((genre) =>
                        <>
                            <i>{genre}</i><br></br>
                        </>
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