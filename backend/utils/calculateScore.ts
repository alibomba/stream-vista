function calculateScore(item: { categories: string[] }, userCategories: string[]): number {
    const matchingCategories = item.categories.filter(category => userCategories.includes(category));
    return matchingCategories.length;
}

export default calculateScore;