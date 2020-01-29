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

describe('given new action is a number', () => {
  describe('given previous action is "ac"', () => {
    test('display should be the number, and expression should be blank', () => {
      const result1 = calc('0', 'ac', '0', '');
      expect(result1.display).toBe('0');
      expect(result1.expression).toBe('');

      const result2 = calc('9', 'ac', '0', '');
      expect(result2.display).toBe('9');
      expect(result2.expression).toBe('');
    });
  });

  describe('given previous action is "="', () => {
    test('display should be the number, and expression should be blank', () => {
      const result1 = calc('0', '=', '10', '1+2+3+4=');
      expect(result1.display).toBe('0');
      expect(result1.expression).toBe('');

      const result2 = calc('7', '=', '6', '2*3=');
      expect(result2.display).toBe('7');
      expect(result2.expression).toBe('');
    });
  });

  describe('given previous action is number 0', () => {
    describe('given current display is "0"', () => {
      test('display should be the number, and expression should be unchanged', () => {
        const result1 = calc('0', '0', '0', '1+2+');
        expect(result1.display).toBe('0');
        expect(result1.expression).toBe('1+2+');

        const result2 = calc('3', '0', '0', '1+2+');
        expect(result2.display).toBe('3');
        expect(result2.expression).toBe('1+2+');
      });
    });
    describe('given current display is a number that is not "0"', () => {
      test('display should be appended with the number, and expression should be unchanged', () => {
        const result = calc('0', '0', '120', '3*6-');
        expect(result.display).toBe('1200');
        expect(result.expression).toBe('3*6-');
      });
    });
  });

  describe('given previous action is a number in range 1 to 9', () => {
    test('display should be appended with the number, and expression should be unchanged', () => {
      const result1 = calc('0', '9', '129', '3*6-');
      expect(result1.display).toBe('1290');
      expect(result1.expression).toBe('3*6-');

      const result2 = calc('7', '1', '311', '3*6-');
      expect(result2.display).toBe('3117');
      expect(result2.expression).toBe('3*6-');
    });
  });

  describe('given previous action is a decimal point', () => {
    test('display should be appended with the number, and expression should be unchanged', () => {
      const result = calc('0', '.', '74.', '1+3-');
      expect(result.display).toBe('74.0');
      expect(result.expression).toBe('1+3-');
    });
  });

  describe('given previous action is an operator', () => {
    test('display should be the number, and expression should be unchanged', () => {
      const result1 = calc('1', '+', '10', '1+2+3+4+');
      expect(result1.display).toBe('1');
      expect(result1.expression).toBe('1+2+3+4+');

      const result2 = calc('0', '/', '7', '1+2*3/');
      expect(result2.display).toBe('0');
      expect(result2.expression).toBe('1+2*3/');
    });
  });
});
