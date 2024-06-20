import React from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_FACT = gql`
  query {
    getChuckNorrisFact
  }
`;

const App: React.FC = () => {
  const { loading, error, data } = useQuery(GET_FACT);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-xl font-bold">Chuck Norris Fact</h1>
        <p className="mt-4">{data.getChuckNorrisFact}</p>
      </div>
    </div>
  );
};

export default App;
