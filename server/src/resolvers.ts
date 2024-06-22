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
  getChuckNorrisFactByCategory: async ({ category }: { category: string }) => {
    try {
      const response = await axios.get(`https://api.chucknorris.io/jokes/random?category=${category}`);
      return response.data.value;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to fetch Chuck Norris fact for category ${category}`);
    }
  },
  searchFacts: async ({ query }: { query: string }) => {
    try {
      const response = await axios.get(`https://api.chucknorris.io/jokes/search?query=${query}`);
      return response.data.result.length > 0 ? response.data.result[0].value : 'No facts found';
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to search facts for query ${query}`);
    }
  },
};