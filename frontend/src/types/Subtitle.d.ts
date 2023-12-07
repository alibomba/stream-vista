type Subtitle = {
    id: string;
    startSecond: number;
    endSecond: number;
    text: string;
    language: string;
    episodeId: string | null;
    movieId: string | null;
}