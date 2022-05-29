import { LastReviewProjection, GamesListProjection, GameDeveloperProjection, DevelopersListProjection } from './projections';

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


export interface DeveloperResponse {
	id: string,
	name: string,
	description: string,
	location: string
	establishmentYear: number,
	webAddress: string,
	games: GamesListProjection[]
}