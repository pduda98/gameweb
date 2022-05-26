import { LastReviewsList } from '../../api/responses';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// const GamesList = (): JSX.Element => {
//     try {
//         const api = axios.create({
//             baseURL: 'http://localhost:5000/api/v1',
//             responseType: 'json',
//         });
//         api.get<LastReviewsList>('/reviews').then(result => {
//             let reviews = result.data.reviews;
//             let lastReview = reviews[0];
//             return (
//                 <div>
//                     {lastReview.title}
//                 </div>
//             );
//         });
//     } catch (err) {
//         console.log('Get current user failed with error', err);
//         return <div/>;
//     }
// }
//
// export default GamesList;