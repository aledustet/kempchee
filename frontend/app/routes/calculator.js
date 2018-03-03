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
      model.addNumber(number);
    },

    operate(operand) {
      let model = this.get('controller.model');
      model.operate(operand);
    },

    perform() {
      $.getJSON("/api/calculator").then(function(json) {
        return json;
      });
    }
  }
});
