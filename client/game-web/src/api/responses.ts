import { LastReviewProjection, GamesListProjection, GameDeveloperProjection, GameReviewsListProjection } from './projections';

export interface LastReviewsList {
    reviews: LastReviewProjection[]
}

export interface TopGamesList {
    games: GamesListProjection[]
}

export interface GameResponse {
    id : string,
    name : string,
    description : string,
    releaseDate: Date,
    averageRating: number,
    ratingsCount: number,
    usersRating: number,
    genres: string[],
    developer: GameDeveloperProjection
}

export interface GameReviewsList {
    reviews: GameReviewsListProjection[]
}