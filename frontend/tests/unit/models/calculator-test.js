import { moduleFor, test } from 'ember-qunit';
import Calculator from 'frontend/models/calculator';

moduleFor('model:calculator', 'Unit | Calculator', {
  unit: true,
  beforeEach: () => initialize()
});

function initialize() {
  const history = ['1 + 1 = 2']
  localStorage.setItem('calculatorHistory', JSON.stringify(history));
}

test('intializes properties correctly', (assert) => {
  const subject  = Calculator.create();
  const numbers  = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const operands = ['+', '-', '*', '/', '**', 'sqrt'];
  assert.equal(subject.get('currentNumber'), '0');
  assert.equal(subject.get('numbers').length, numbers.length);
  assert.equal(subject.get('numbers')[numbers.length - 1], '0');
  assert.equal(subject.get('operands').length, operands.length);
  assert.equal(subject.get('operands')[0], '+');
  assert.equal(subject.get('history')[0], '1 + 1 = 2');
  assert.equal(subject.get('history').length, 1);
  assert.equal(subject.get('unaryOperations')[0], 'sqrt');
  assert.equal(subject.get('result'), null);
});

test('#shouldReplaceCurrentNumber with 0 on currentValue returns true', (assert) => {
  const subject  = Calculator.create();
  assert.equal(subject.shouldReplaceCurrentNumber(), true);
});

test('#shouldReplaceCurrentNumber with not 0 on currentValue and no result returns false', (assert) => {
  const subject = Calculator.create();
  subject.addNumber('1');
  assert.equal(subject.shouldReplaceCurrentNumber(), false);
});

test('#reset reset all values', (assert) => {
  const subject = Calculator.create();
  subject.addNumber('1');
  subject.reset();
  assert.equal(subject.get('currentNumber'), '0');
  assert.equal(subject.get('firstOperand'), null);
  assert.equal(subject.get('operation'), null);
  assert.equal(subject.get('result'), null);
});

test('#receivedResult updates the history and the state', (assert) => {
  const subject = Calculator.create();
  subject.set('firstOperand', '2');
  subject.set('operation', '+');
  subject.set('currentNumber', '2');
  subject.receivedResult('4');
  assert.equal(subject.get('history').length, 2);
  assert.equal(subject.get('history')[0], '2 + 2 = 4');
});

test('#toParams with an unary operation resets the currentValue', (assert) => {
  const subject = Calculator.create();
  subject.set('operation', 'sqrt');
  subject.set('firstOperand', '4');
  subject.set('currentNumber', '4');
  let params = JSON.stringify({
    firstOperand:  '4',
    secondOperand: '',
    operation:     'sqrt'
  });
  assert.equal(subject.toParams(), params);
});

test('#toParams with an binary operation generates the full params', (assert) => {
  const subject = Calculator.create();
  subject.set('operation', '+');
  subject.set('firstOperand', '4');
  subject.set('currentNumber', '4');
  let params = JSON.stringify({
    firstOperand:  '4',
    secondOperand: '4',
    operation:     '+'
  });
  assert.equal(subject.toParams(), params);
});
