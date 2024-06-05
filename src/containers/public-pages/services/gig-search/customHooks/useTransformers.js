import { useEffect, useState } from 'react';

export const useGetTransformedCategoriesList = (categories = []) => {
  const [transformed, setTransformed] = useState([]);

  useEffect(() => {
    if (categories?.length > 0) {
      const modifiedCategories = categories.map(category => ({
        label: category.name,
        value: category.id,
      }));

      setTransformed(modifiedCategories);
    }
  }, [categories]);

  return transformed;
};

export const test = '';
