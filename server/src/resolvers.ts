import axios from 'axios';

export const root = {
  getChuckNorrisFact: async () => {
    try {
      const response = await axios.get('https://api.chucknorris.io/jokes/random');
      return response.data.value;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch Chuck Norris fact');
    }
  },
  getChuckNorrisCategories: async () => {
    try {
      const response = await axios.get('https://api.chucknorris.io/jokes/categories');
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch Chuck Norris categories');
    }
  },
  getChuckNorrisJokeByCategory: async ({ category }: { category: string }) => {
    try {
      const response = await axios.get(`https://api.chucknorris.io/jokes/random?category=${category}`);
      return response.data.value;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to fetch Chuck Norris joke for category ${category}`);
    }
  }
};