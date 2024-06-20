import axios from 'axios';

const getChuckNorrisFact = async () => {
  try {
    const response = await axios.get('https://api.chucknorris.io/jokes/random');
    return response.data.value;
  } catch (error) {
    console.error('Error fetching Chuck Norris fact:', error);
    return null;
  }
};

export const root = {
  getChuckNorrisFact,
};
