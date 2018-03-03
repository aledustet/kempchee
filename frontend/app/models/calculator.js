import EmberObject, { computed } from '@ember/object';

const Calculator = EmberObject.extend({
  firstOperand: null,
  secondOperand: null,
  operation: null,
  currentNumber: null,
  numbers: null,

  init() {
    this.set('currentNumber', '');
    this.set('numbers', ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])
  },

  operate: computed('operation', 'firstOperand', function(operation) {
    let operand = this.get('firstOperand');
    if (operand.length() > 0) {
      this.set('operation', operation);
      this.set('firstOperand', this.get('currentNumber'));
      this.set('currentNumber', []);
    }
  }),

  display: computed('currentNumber', function() {
    let currentNumber = this.get('currentNumber');
    return currentNumber.join('');
  })
});

export default Calculator;
