'use strict';

function calculate(
  newAction = 'ac',
  prevAction = 'ac',
  currDisplay = '0',
  currExpression = ''
) {
  let display = currDisplay;
  let expression = currExpression;

  if (isNumber(newAction)) {
    const number = newAction;
    switch (true) {
      case prevAction === 'ac':
      case prevAction === '=':
        display = number;
        expression = '';
        break;
      case prevAction === '0' && display === '0':
      case isOperator(prevAction):
        display = number;
        break;
      case isNumber(prevAction):
      case prevAction === '.':
        display = currDisplay.concat(number);
        break;
    }
  }

  return {
    display: display,
    expression: expression,
  };
}

function isNumber(c) {
  return '0123456789'.includes(c);
}

function isOperator(c) {
  return '+-/*'.includes(c);
}

module.exports = calculate;
