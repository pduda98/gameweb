import { LastReviewProjection, GamesListProjection } from './projections';

export interface LastReviewsList {
    reviews: LastReviewProjection[]
}

export interface GamesList {
    games: GamesListProjection[]
}