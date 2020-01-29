const calc = require('../src/index');

it('should export a calculate function', () => {
  expect(typeof calc).toBe('function');
});

it('should return an object with properties "expression" and "display"', () => {
  const result = calc();
  expect(typeof result).toBe('object');
  expect(result).toHaveProperty('expression');
  expect(result).toHaveProperty('display');
});

describe('given new action is "ac"', () => {
  it('should return display of "0" and blank expression', () => {
    const result = calc('ac');
    expect(result.display).toBe('0');
    expect(result.expression).toBe('');
  });
});
