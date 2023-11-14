type Series = {
    id: string,
    title: string,
    description: string,
    trailerUrl: string,
    thumbnailUrl: string,
    warnings: string[],
    actors: string[],
    creators: string[],
    episodes: Episode[]
    categories: string[],
    seasons: number,
    year: number
}