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

describe('given new action is an operator', () => {
  describe('given previous action is "ac"', () => {
    test('display should be unchanged, and expression should be the display appended with the operator', () => {
      const result = calc('+', 'ac', '0', '');
      expect(result.display).toBe('0');
      expect(result.expression).toBe('0+');
    });
  });

  describe('given previous action is "="', () => {
    test('display should be unchanged, and expression should be the display appended with the operator', () => {
      const result = calc('*', '=', '7', '3+4=');
      expect(result.display).toBe('7');
      expect(result.expression).toBe('7*');
    });
  });

  describe('given previous action is a number', () => {
    test('display should be the evaluation of the current expression, and expression should be appended with the current display and the operator', () => {
      const result = calc('-', '3', '73', '22+2*');
      expect(result.display).toBe('168');
      expect(result.expression).toBe('22+2*73-');
    });
  });

  describe('given previous action is a decimal point', () => {
    test('display should be the evaluation of the current expression, and expression should be appended with the current display (with trailing decimal points removed) and the operator', () => {
      const result = calc('-', '.', '73.', '22+2*');
      expect(result.display).toBe('168');
      expect(result.expression).toBe('22+2*73-');
    });
  });

  describe('given previous action is an operator', () => {
    test('display should be unchanged, and the last operator in the expression should be replaced with the new operator', () => {
      const result = calc('/', '-', '123', '1+2+3-');
      expect(result.display).toBe('123');
      expect(result.expression).toBe('1+2+3/');
    });
  });
});

describe('given new action is a decimal point', () => {
  describe('given previous action is "ac"', () => {
    test('display should be "0.", and expression should be blank', () => {
      const result = calc('.', 'ac', '0', '');
      expect(result.display).toBe('0.');
      expect(result.expression).toBe('');
    });
  });

  describe('given previous action is "="', () => {
    test('display should be "0.", and expression should be blank', () => {
      const result = calc('.', '=', '10', '1+2+3+4=');
      expect(result.display).toBe('0.');
      expect(result.expression).toBe('');
    });
  });

  describe('given previous action is a number', () => {
    describe('given current display already has a decimal point', () => {
      test('display and expression should be unchanged', () => {
        const result = calc('.', '1', '67.31', '');
        expect(result.display).toBe('67.31');
        expect(result.expression).toBe('');
      });
    });

    describe('given current display does NOT have a decimal point', () => {
      test('display should be appended with a decimal point, and expression should be unchanged', () => {
        const result = calc('.', '8', '28', '5+');
        expect(result.display).toBe('28.');
        expect(result.expression).toBe('5+');
      });
    });
  });

  describe('given previous action is a decimal point', () => {
    test('display and expression should be unchanged', () => {
      const result = calc('.', '.', '10.', '1+2+3+');
      expect(result.display).toBe('10.');
      expect(result.expression).toBe('1+2+3+');
    });
  });

  describe('given previous action is an operator', () => {
    test('display should be "0.", and expression should be unchanged', () => {
      const result = calc('.', '*', '5', '3+2*');
      expect(result.display).toBe('0.');
      expect(result.expression).toBe('3+2*');
    });
  });
});

describe('given new action is "="', () => {
  describe('given previous action is "ac"', () => {
    test('display should be unchanged, and expression should be the current display appended with "="', () => {
      const result = calc('=', 'ac', '0', '');
      expect(result.display).toBe('0');
      expect(result.expression).toBe('0=');
    });
  });

  describe('given previous action is "="', () => {
    test('display and expression should be unchanged', () => {
      const result = calc('=', '=', '3', '1+2=');
      expect(result.display).toBe('3');
      expect(result.expression).toBe('1+2=');
    });
  });

  describe('given previous action is a number', () => {
    test('display should be the evaluation of the current expression, and expression be appended with the current display and "="', () => {});
    const result = calc('=', '3', '73', '22+2*');
    expect(result.display).toBe('168');
    expect(result.expression).toBe('22+2*73=');
  });

  describe('given previous action is a decimal point', () => {
    test('display should be the evaluation of the current expression, and expression be appended with the current display (with trailing decimal points removed) and "="', () => {
      const result = calc('=', '.', '73.', '22+2*');
      expect(result.display).toBe('168');
      expect(result.expression).toBe('22+2*73=');
    });
  });

  describe('given previous action is an operator', () => {
    test('display should be the evaluation of the current expression, and expression be appended with the current display (with trailing decimal points removed) and "="', () => {
      const result = calc('=', '+', '168', '22+2*73+');
      expect(result.display).toBe('336');
      expect(result.expression).toBe('22+2*73+168=');
    });
  });
});
