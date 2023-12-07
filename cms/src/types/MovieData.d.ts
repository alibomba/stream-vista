type MovieData = {
    title: string,
    description: string,
    trailer: File | null,
    thumbnail: File | null,
    source: File | null,
    warnings: string[],
    actors: string[],
    creators: string[],
    categories: string[],
    year: number | string
}