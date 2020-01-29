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
