import Route from '@ember/routing/route';
import $ from 'jquery';
import Calculator from '../models/calculator';

export default Route.extend({
  model() {
    return Calculator.create()
  },
  actions: {
    addNumber(number) {
      let model = this.get('controller.model');
      let currentNumber = model.get('currentNumber');
      currentNumber += number;
      model.set('currentNumber', currentNumber);
    },
    perform() {
      $.getJSON("/api/calculator").then(function(json) {
        return json;
      });
    }
  }
});
