// Uncomment the code below and write your tests
import path from 'path';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

jest.mock('fs');
jest.mock('fs/promises');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const spyTimeout = jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    doStuffByTimeout(callback, 10);
    expect(spyTimeout).toHaveBeenCalledWith(callback, 10);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 10);
    expect(callback).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(10);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const spyInterval = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    doStuffByInterval(callback, 10);
    expect(spyInterval).toHaveBeenCalledWith(callback, 10);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 10);
    expect(callback).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(30);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');

    await readFileAsynchronously('someFile');
    expect(joinSpy).toBeCalledWith(__dirname, 'someFile');
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);

    const fileContent = await readFileAsynchronously('someFile');
    expect(fileContent).toBeNull();
  });

  test('should return file content if file exists', async () => {
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue('someFileContent');

    const fileContent = await readFileAsynchronously('someFile');
    expect(fileContent).toBe('someFileContent');
  });
});
