const { calc, isValidExpression, isValidDisplay } = require('../src/index');

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
    const result1 = calc('ac');
    expect(result1.display).toBe('0');
    expect(result1.expression).toBe('');

    const result2 = calc('ac', '=', '10', '1+2+3+4=');
    expect(result2.display).toBe('0');
    expect(result2.expression).toBe('');
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
    describe('given new action is "-"', () => {
      test('display should be unchanged, and the expression should be appended with "-" if it does not already end with "-"', () => {
        const result1 = calc('-', '+', '6', '1+2+3+');
        expect(result1.display).toBe('6');
        expect(result1.expression).toBe('1+2+3+-');

        const result2 = calc('-', '*', '6', '1+2+3*');
        expect(result2.display).toBe('6');
        expect(result2.expression).toBe('1+2+3*-');

        const result3 = calc('-', '-', '6', '1+2+3-');
        expect(result3.display).toBe('6');
        expect(result3.expression).toBe('1+2+3-');
      });
    });
    describe('given new action is "+", "*", or "/"', () => {
      test('display should be unchanged, and the ending operators in the expression should be replaced with the new operator', () => {
        const result1 = calc('/', '-', '6', '1+2+3-');
        expect(result1.display).toBe('6');
        expect(result1.expression).toBe('1+2+3/');

        const result2 = calc('/', '-', '6', '1+2+3*-');
        expect(result2.display).toBe('6');
        expect(result2.expression).toBe('1+2+3/');
      });
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

describe('isValidExpression', () => {
  it('should be a function', () => {
    expect(typeof isValidExpression).toBe('function');
  });

  it('should return a boolean', () => {
    const result = isValidExpression('1+2+');
    expect(typeof result).toBe('boolean');
  });

  it('should return true if expression is blank', () => {
    const result = isValidExpression('');
    expect(result).toBeTruthy();
  });

  it('should return false if expression ends with a number', () => {
    const result = isValidExpression('2');
    expect(result).toBeFalsy();
  });

  it('should return true if expression ends with a number and equal sign', () => {
    const result = isValidExpression('9=');
    expect(result).toBeTruthy();
  });

  it('should return false if numbers have leading zeroes, unless the number is "0"', () => {
    const result1 = isValidExpression('01=');
    expect(result1).toBeFalsy();

    const result2 = isValidExpression('001=');
    expect(result2).toBeFalsy();

    const result3 = isValidExpression('00=');
    expect(result3).toBeFalsy();

    const result4 = isValidExpression('0=');
    expect(result4).toBeTruthy();

    const result5 = isValidExpression('100=');
    expect(result5).toBeTruthy();

    const result6 = isValidExpression('1020=');
    expect(result6).toBeTruthy();
  });

  it('should return true for numbers with decimal points', () => {
    const result1 = isValidExpression('0.1=');
    expect(result1).toBeTruthy();

    const result2 = isValidExpression('32.9=');
    expect(result2).toBeTruthy();

    const result3 = isValidExpression('32.00=');
    expect(result3).toBeTruthy();
  });

  it('should return false for numbers with more than one decimal points', () => {
    const result1 = isValidExpression('2.1.3+');
    expect(result1).toBeFalsy();

    const result2 = isValidExpression('0.1.3=');
    expect(result2).toBeFalsy();

    const result3 = isValidExpression('3..42=');
    expect(result3).toBeFalsy();

    const result4 = isValidExpression('3*1.2.3=');
    expect(result4).toBeFalsy();
  });

  it('should return true if expression has operators in between numbers', () => {
    const result = isValidExpression('32.01+0.001-78*2.1=');
    expect(result).toBeTruthy();
  });

  it('should return true if expression ends with an operator', () => {
    const result = isValidExpression('32.01+0.001-78*2.1*');
    expect(result).toBeTruthy();
  });

  it('should return false if expression starts with an operator', () => {
    const result1 = isValidExpression('-3=');
    expect(result1).toBeFalsy();

    const result2 = isValidExpression('*3+2-');
    expect(result2).toBeFalsy();

    const result3 = isValidExpression('+5-1=');
    expect(result3).toBeFalsy();
  });

  it('should return false if expression has consecutive operators, unless there are only two consecutive operators with the first being [+/*] and the second being "-"', () => {
    const result1 = isValidExpression('32++3=');
    expect(result1).toBeFalsy();

    const result2 = isValidExpression('32+--5=');
    expect(result2).toBeFalsy();

    const result3 = isValidExpression('32+-5=');
    expect(result3).toBeTruthy();

    const result4 = isValidExpression('32/-5=');
    expect(result4).toBeTruthy();
  });

  it('should return true for numbers in scientific (exponential) notation', () => {
    const result1 = isValidExpression('3.45572558e-16=');
    expect(result1).toBeTruthy();

    const result2 = isValidExpression('423.78255E+29=');
    expect(result2).toBeTruthy();

    const result3 = isValidExpression('0.343e+0=');
    expect(result3).toBeTruthy();

    const result4 = isValidExpression('0.343e2=');
    expect(result4).toBeTruthy();

    const result5 = isValidExpression('0.343e=');
    expect(result5).toBeFalsy();

    const result6 = isValidExpression('0.343e+=');
    expect(result6).toBeFalsy();
  });
});

describe('isValidDisplay', () => {
  it('should be a function', () => {
    expect(typeof isValidDisplay).toBe('function');
  });

  it('should return a boolean', () => {
    const result = isValidDisplay('');
    expect(typeof result).toBe('boolean');
  });

  it('should return false if display is blank', () => {
    const result = isValidDisplay('');
    expect(result).toBeFalsy();
  });

  it('should return true if display is a positive number', () => {
    const result1 = isValidDisplay('0');
    expect(result1).toBeTruthy();

    const result2 = isValidDisplay('925');
    expect(result2).toBeTruthy();

    const result3 = isValidDisplay('-1');
    expect(result3).toBeFalsy();
  });

  it('should return true if display has a decimal point', () => {
    const result1 = isValidDisplay('0.1');
    expect(result1).toBeTruthy();

    const result2 = isValidDisplay('15.23');
    expect(result2).toBeTruthy();
  });

  it('should return false if display has more than one decimal point', () => {
    const result1 = isValidDisplay('0.1.2');
    expect(result1).toBeFalsy();

    const result2 = isValidDisplay('23..2');
    expect(result2).toBeFalsy();
  });

  it('should return false if display has leading zeroes', () => {
    const result = isValidDisplay('0032');
    expect(result).toBeFalsy();
  });

  it('should return true if display ends with a decimal point', () => {
    const result = isValidDisplay('12.');
    expect(result).toBeTruthy();
  });

  it('should return true if display has scientific (exponential) notation', () => {
    const result1 = isValidDisplay('3.45572558e-16');
    expect(result1).toBeTruthy();

    const result2 = isValidDisplay('423.78255E+29');
    expect(result2).toBeTruthy();

    const result3 = isValidDisplay('0.343e+0');
    expect(result3).toBeTruthy();

    const result4 = isValidDisplay('0.343e2');
    expect(result4).toBeTruthy();

    const result5 = isValidDisplay('0.343e');
    expect(result5).toBeFalsy();

    const result6 = isValidDisplay('0.343e+');
    expect(result6).toBeFalsy();
  });

  // TODO: Infinity, Not a Number, Divide by zero.
});
