import EmberObject, { computed } from '@ember/object';

const Calculator = EmberObject.extend({
  firstOperand: null,
  secondOperand: null,
  operation: null,
  currentNumber: null,

  init() {
    this.set('currentNumber', '');
  },

  addNumber: computed('currentNumber', function(number) {
    this.get('currentNumber').pushObject(number);
  }),

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
