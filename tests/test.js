const calc = require('../src/index');

it('should export a calculate function', () => {
  expect(typeof calc).toBe('function');
});
