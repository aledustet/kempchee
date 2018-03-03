import EmberObject, { computed } from '@ember/object';

const Calculator = EmberObject.extend({
  firstOperand: null,
  operation: null,
  currentNumber: null,
  numbers: null,
  operands: null,

  init() {
    this.set('currentNumber', '0');
    this.set('numbers', ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
    this.set('operands', ['+','-','*','**','sqrt']);
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
    let currentNumber = this.get('currentNumber');
    if(currentNumber != '0' || number != '0') {
      this.set('currentNumber', this.numberToSet(number));
    }
  },

  operate(operand) {
    let firstOperand = this.get('firstOperand');
    if(firstOperand == null) {
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

});

export default Calculator;
