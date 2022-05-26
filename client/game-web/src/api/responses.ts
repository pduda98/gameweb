import { LastReviewProjection, GamesListProjection } from './projections';

export interface LastReviewsList {
    reviews: LastReviewProjection[]
}

export interface TopGamesList {
    games: GamesListProjection[]
}