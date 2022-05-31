export interface LastReviewProjection {
    id : string,
    title : string,
    creationTime: string;
    userName : string,
    rating : number,
    content: string,
    game :LastReviewGameProjection
}

export interface LastReviewGameProjection {
    id : string,
    name : string,
    releaseYear : number,
    averageRating : number,
    ratingsCount: number,
    genres : string[],
    developer : GameDeveloperProjection
}

export interface GameDeveloperProjection {
    id : string,
    name : string,
}

export interface GamesListProjection {
    id : string,
    name : string,
    averageRating: number,
    usersRating: number,
    genres: string[]
}

export interface DevelopersListProjection {
    id: string,
    name: string,
    location: string
    establishmentYear: number
}
export interface GameReviewsListProjection {
    id : string,
    title : string,
    content : string,
    creationTime: Date,
    userName: string,
    rating: number
}

export interface SearchGameProjection {
    id : string,
    name : string,
    releaseYear : number,
}

export interface SearchDeveloperProjection {
    id : string,
    name : string,
}