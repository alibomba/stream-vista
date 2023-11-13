import calculateScore from "./calculateScore";

function sortRecommendations(recommendations: { categories: string[] }[][], userCategories: string[]) {
    return recommendations
        .flat()
        .map(item => ({ item, score: calculateScore(item, userCategories) }))
        .sort((a, b) => b.score - a.score)
        .map(entry => entry.item);
}

export default sortRecommendations;