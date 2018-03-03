import EmberObject, { computed } from '@ember/object';

export default EmberObject.extend({
  firstOperand: null,
  operation: null,
  currentNumber: null,
  numbers: null,
  result: null,
  operands: null,
  history: null,
  unaryOperations: null,

  init() {
    this.set('currentNumber', '0');
    this.set('numbers', ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
    this.set('operands', ['+', '-', '*', '/', '**', 'sqrt']);
    this.set('unaryOperations', ['sqrt']);
    const history = JSON.parse(localStorage.getItem('calculatorHistory'));
    this.set('history', history == null ? [] : history);
  },

  shouldReplaceCurrentNumber() {
    let currentNumber = this.get('currentNumber');

    return currentNumber == '0';
  },

  numberToSet(number) {
    let currentNumber = this.get('currentNumber');
    return this.shouldReplaceCurrentNumber() ? number : (currentNumber + number);
  },

  addNumber(number) {
    let result        = this.get('result');
    let currentNumber = this.get('currentNumber');
    if(currentNumber != '0' || number != '0') {
      this.set('currentNumber', this.numberToSet(number));
      if (result != null) {
        this.set('result', null);
      }
    }
  },

  operate(operand) {
    let firstOperand = this.get('firstOperand');
    let result       = this.get('result');
    if(firstOperand == null || result == null) {
      let currentNumber = this.get('currentNumber');
      this.set('firstOperand', currentNumber);
      this.set('currentNumber', '0');
      this.set('operation', operand);
    }
  },

  previousOperation: computed('firstOperand', 'operation', 'currentNumber', 'result', function() {
    const firstOperand = this.get('firstOperand');
    const operation    = this.get('operation');
    if(firstOperand != null) {
      return [firstOperand, ' ', operation].join('');
    } else {
      return '';
    }
  }),

  receivedResult(result) {
    const firstOperand    = this.get('firstOperand');
    const operation       = this.get('operation');
    const currentNumber   = this.get('currentNumber');
    let newEntryToHistory = `${firstOperand} ${operation} ${currentNumber} = ${result}`
    let history = this.get('history');
    if (history.length == 10) {
      this.get('history').removeAt(9);
    }
    this.get('history').insertAt(0, newEntryToHistory);
    localStorage.setItem('calculatorHistory', JSON.stringify(history));
    this.reset();
  },

  toParams() {
    let unaryOperations = this.get('unaryOperations');
    let operation       = this.get('operation');
    let secondOperand   = unaryOperations.indexOf(operation) >= 0 ? '' : this.get('currentNumber');
    this.set('currentNumber', secondOperand);
    return JSON.stringify({
      firstOperand:  this.get('firstOperand'),
      secondOperand: secondOperand,
      operation:     operation
    });
  },

  reset() {
    this.set('currentNumber', '0');
    this.set('firstOperand', null);
    this.set('operation', null);
    this.set('result', null);
  }
});
