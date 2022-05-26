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