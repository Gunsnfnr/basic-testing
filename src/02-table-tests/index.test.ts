// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 2, b: 4, action: Action.Add, expected: 6 },
  { a: 12, b: 4, action: Action.Subtract, expected: 8 },
  { a: 12, b: 4, action: Action.Multiply, expected: 48 },
  { a: 12, b: 4, action: Action.Divide, expected: 3 },
  { a: 4, b: 3, action: Action.Exponentiate, expected: 64 },
  { a: 12, b: '0', action: Action.Divide, expected: null },
  { a: 100, b: '1', action: Action.Subtract, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'An appropriate action of simpleCalculator with $a, $b should return $expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
