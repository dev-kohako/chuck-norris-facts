import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHUCK_NORRIS_CATEGORIES } from '../queries';

const Categories: React.FC = () => {
  const { loading, error, data } = useQuery(GET_CHUCK_NORRIS_CATEGORIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {data.getChuckNorrisCategories.map((category: string) => (
          <li key={category}>{category}</li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
