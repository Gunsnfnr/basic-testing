// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const data = { data: 'someData' };
const relativePath = '.somePath';

jest.mock('lodash', () => {
  return {
    throttle: (func: (relativePath: string) => Promise<unknown>) => func,
  };
});
jest.mock('axios', () => {
  return {
    create: () => {
      return {
        get: jest.fn().mockResolvedValue({ data }),
      };
    },
  };
});

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const createSpy = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi(relativePath);

    expect(createSpy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    //
  });

  test('should return response data', async () => {
    const response = await throttledGetDataFromApi('mockUrl');
    expect(response).toBe(data);
  });
});
