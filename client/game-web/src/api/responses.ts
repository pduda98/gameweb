import { LastReviewProjection, GamesListProjection, GameDeveloperProjection, GameReviewsListProjection, DevelopersListProjection, SearchGameProjection, SearchDeveloperProjection } from './projections';

export interface LastReviewsList {
    reviews: LastReviewProjection[]
}

export interface TopGamesList {
    games: GamesListProjection[]
}

export interface DevelopersList {
    developers: DevelopersListProjection[]
}

export interface GenresList {
    genres: string[]
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
export interface DeveloperResponse {
	id: string,
	name: string,
	description: string,
	location: string
	establishmentYear: number,
	webAddress: string,
	games: GamesListProjection[]
}

export interface SignInResponse {
    token: string,
    refreshToken: string,
    expirationTime: string
    userId: string
}

export interface SearchResponse {
    games: SearchGameProjection[];
    developers: SearchDeveloperProjection[];
}