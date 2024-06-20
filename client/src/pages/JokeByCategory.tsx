import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_CHUCK_NORRIS_JOKE_BY_CATEGORY } from '../queries';

const JokeByCategory: React.FC = () => {
  const [category, setCategory] = useState('');
  const [getJoke, { loading, data, error }] = useLazyQuery(GET_CHUCK_NORRIS_JOKE_BY_CATEGORY);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    getJoke({ variables: { category } });
  };

  return (
    <div>
      <h2>Get Joke by Category</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter category"
        />
        <button type="submit">Get Joke</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>{data.getChuckNorrisJokeByCategory}</p>}
    </div>
  );
};

export default JokeByCategory;
