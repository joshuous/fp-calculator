'use strict';

/**
 * @param {string} newAction - New action to take.
 * @param {string} prevAction - Previous action taken.
 * @param {string} currDisplay - Current display.
 * @param {string} currExpression - Current expression.
 * @returns {Object} Calculation results containing the new display and expression.
 */
exports.calc = (
  newAction = 'ac',
  prevAction = 'ac',
  currDisplay = '0',
  currExpression = ''
) => {
  let display = currDisplay;
  let expression = currExpression;

  if (newAction === 'ac') {
    display = '0';
    expression = '';
  } else if (isNumber(newAction)) {
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
  } else if (isOperator(newAction)) {
    const operator = newAction;
    switch (true) {
      case prevAction === 'ac':
      case prevAction === '=':
        expression = currDisplay.concat(operator);
        break;
      case isNumber(prevAction):
      case prevAction === '.':
        display = evaluate(currExpression.concat(currDisplay));
        expression = currExpression
          .concat(removeTrailingDecimals(currDisplay))
          .concat(operator);
        break;
      case isOperator(prevAction):
        expression = currExpression
          .slice(0, currExpression.length - 1)
          .concat(operator);
        break;
    }
  } else if (newAction === '.') {
    switch (true) {
      case prevAction === 'ac':
      case prevAction === '=':
        display = '0.';
        expression = '';
        break;
      case isNumber(prevAction) && !currDisplay.includes('.'):
        display = currDisplay.concat('.');
        break;
      case prevAction === '.':
        //pass
        break;
      case isOperator(prevAction):
        display = '0.';
        break;
    }
  } else if (newAction === '=') {
    switch (true) {
      case prevAction === 'ac':
        expression = currDisplay.concat('=');
        break;
      case prevAction === '=':
        //pass
        break;
      case isNumber(prevAction):
      case prevAction === '.':
      case isOperator(prevAction):
        display = evaluate(currExpression.concat(currDisplay));
        expression = currExpression
          .concat(removeTrailingDecimals(currDisplay))
          .concat('=');
        break;
    }
  }

  return {
    display: display,
    expression: expression,
  };
};

function evaluate(expression) {
  const answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
  return answer.toString();
}

function removeTrailingDecimals(display) {
  const trailingDecimalRegex = /\.+$/;
  return display.replace(trailingDecimalRegex, '');
}

function isNumber(c) {
  return '0123456789'.includes(c);
}

function isOperator(c) {
  return '+-/*'.includes(c);
}

// WARNING: [+-/*] <- this matches a '*' or a character in range '+' to '/'.
// SOLUTION: Changing to [-+/*] matches a '-', '+', '/' or '*'.
const numberRegex = '((0|[1-9][0-9]*)(\\.[0-9]+)?([eE][-+]?[0-9]+)?)';
const numberOperatorRegex = '(' + numberRegex + '[-+/*]' + ')';
const numberEqualRegex = '(' + numberRegex + '=' + ')';
const validExpressionRegex = new RegExp(
  '^' + numberOperatorRegex + '*' + numberEqualRegex + '?' + '$'
);

/**
 * @param {string} expression - Expression to validate.
 * @returns {boolean} - Validation result.
 */
exports.isValidExpression = expression => {
  if (validExpressionRegex.test(expression)) {
    return true;
  }

  return false;
};

const validDisplayRegex = /^(0|[1-9][0-9]*)(\.[0-9]*)?([eE][-+]?[0-9]+)?$/;

/**
 * @param {string} display - Display to validate.
 * @returns {boolean} - Validation result.
 */
exports.isValidDisplay = display => {
  if (validDisplayRegex.test(display)) {
    return true;
  }

  return false;
};
