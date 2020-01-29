'use strict';

function calculate(
  newAction = 'ac',
  prevAction = 'ac',
  currDisplay = '0',
  currExpression = ''
) {
  let display = currDisplay;
  let expression = currExpression;
  return {
    display: display,
    expression: expression,
  };
}

module.exports = calculate;
