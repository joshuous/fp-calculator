# fp-calculator

A simple way to simulate a calculator with buttons and displays!

## Concept

A basic calculator can be modeled based on the following:

- **Current expression**: the expression that has been typed
- **Current display**: the result shown based on previous action taken
- **Previous action**: the last button that was pressed
- **New action**: the next button that will be pressed

![Calculator](https://raw.githubusercontent.com/joshuous/fp-calculator/master/calculator.png)

## Installation

<pre>
npm install fp-calculator
</pre>

## Usage

### Importing

```javascript
const calc = require('fp-calculator');
```

### Syntax

```javascript
/**
 * @param {string} newAction - New action to take.
 * @param {string} prevAction - Previous action taken.
 * @param {string} currDisplay - Current display.
 * @param {string} currExpression - Current expression.
 * @returns {Object} Calculation results containing the new display and expression.
 */
function calc(newAction, previousAction, currentDisplay, currentExpression) { ... }
```

### Examples

```javascript
// Initialize current display, expression, and previous action. Same as pressing the "ac" button.
let c = calc(); // { display: '0', expression: '', prevAction: 'ac' }

// Press button '1'
c = calc('1', c.prevAction, c.display, c.expression); // { display: '1', expression: '', prevAction: '1' }

// Press button '2'
c = calc('2', c.prevAction, c.display, c.expression); // { display: '12', expression: '', prevAction: '2' }

// Press button '+'
c = calc('+', c.prevAction, c.display, c.expression); // { display: '12', expression: '12+', prevAction: '+' }

// Press button '8'
c = calc('8', c.prevAction, c.display, c.expression); // { display: '12', expression: '12+', prevAction: '8' }

// Press button '='
c = calc('=', c.prevAction, c.display, c.expression); // { display: '20', expression: '12+8=', prevAction: '=' }

// Press button 'ac'
c = calc('ac', c.prevAction, c.display, c.expression); // { display: '0', expression: '', prevAction: 'ac' }
```

**Looping through actions**

```javascript
const actions = ['5', '.', '2', '*', '3', '3', '/', '8', '='];
const init = calc();

const c1 = actions.reduce((c, action) => {
  return calc(action, c.prevAction, c.display, c.expression);
}, init);
// c1 => { display: '21.45', expression: '5.2*33/8=', prevAction: '=' }

// Alternatively using for loops
let c2 = calc();
actions.forEach(action => {
  c2 = calc(action, c2.prevAction, c2.display, c2.expression);
});
// c2 => { display: '21.45', expression: '5.2*33/8=', prevAction: '=' }
```

## Valid actions

```
// Operators
'ac'  -  cancel all (reset)
'+'   -  add
'-'   -  subtract
'/'   -  divide
'*'   -  multiply
'='   -  equals (evaluate expression)

// Operands
'0'
'1'
'2'
'3'
'4'
'5'
'6'
'7'
'8'
'9'
'.'
```

## Demo calculator web app that uses fp-calculator

https://react-fp-calculator.netlify.com/

## Contributing

Send a [Pull Request](https://github.com/joshuous/fp-calculator/pulls) or [Issue](https://github.com/joshuous/fp-calculator/issues) to contribute or request a feature!
