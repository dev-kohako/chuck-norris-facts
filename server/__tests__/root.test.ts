import { root } from '../src/graphql/resolvers';
import MockAdapter from 'axios-mock-adapter';
import { apiClient } from '../src/utils/apiClient';


const mock = new MockAdapter(apiClient);
const BASE_URL = process.env.BASE_URL || 'https://api.chucknorris.io/';

describe('Chuck Norris GraphQL Resolvers', () => {
  afterEach(() => {
    mock.reset();
  });

  it('should fetch a random Chuck Norris fact', async () => {
    const factValue = 'Chuck Norris counted to infinity. Twice.';
    mock.onGet(`${BASE_URL}/random`).reply(200, { value: factValue });

    const fact = await root.getChuckNorrisFact();
    expect(fact).toBe(factValue);
  });

  it('should fetch categories', async () => {
    const categoriesMock = ['dev', 'movie'];
    mock.onGet(`${BASE_URL}/categories`).reply(200, categoriesMock);

    const categories = await root.getChuckNorrisCategories();
    expect(categories).toEqual(categoriesMock);
  });

  it('should fetch a fact by category', async () => {
    const category = 'dev';
    const factValue = 'Chuck Norris writes code that optimizes itself.';
    mock
      .onGet(`${BASE_URL}/random?category=${encodeURIComponent(category)}`)
      .reply(200, { value: factValue });

    const fact = await root.getChuckNorrisFactByCategory({ category });
    expect(fact).toBe(factValue);
  });

  it('should search facts', async () => {
    const query = 'code';
    const factValue = 'Chuck Norris coded the entire internet.';
    mock
      .onGet(`${BASE_URL}/search?query=${encodeURIComponent(query)}`)
      .reply(200, { result: [{ value: factValue }] });

    const fact = await root.searchFacts({ query });
    expect(fact).toBe(factValue);
  });
});
