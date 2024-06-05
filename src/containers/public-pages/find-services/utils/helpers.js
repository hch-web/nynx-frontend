export const getSortedCategories = (data = []) => [...data]?.sort((a, b) => a?.name?.localeCompare(b?.name));

export const test = '';
