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
    switch (true) {
      case prevAction === 'ac':
      case prevAction === '=':
        display = newAction;
        expression = '';
        break;
      case prevAction === '0' && display === '0':
      case isOperator(prevAction):
        display = newAction;
        break;
      case isNumber(prevAction):
      case prevAction === '.':
        display = display.concat(newAction);
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
