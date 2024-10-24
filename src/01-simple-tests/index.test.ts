import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 4, action: Action.Add })).toBe(6);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 12, b: 4, action: Action.Subtract })).toBe(8);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 12, b: 4, action: Action.Multiply })).toBe(48);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 12, b: 4, action: Action.Divide })).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 4, b: 3, action: Action.Exponentiate })).toBe(
      64,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 12, b: '0', action: Action.Divide })).toBe(
      null,
    );
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: 100, b: '1', action: Action.Subtract })).toBe(
      null,
    );
  });
});
