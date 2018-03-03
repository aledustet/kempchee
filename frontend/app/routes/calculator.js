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
      let model = this.get('controller.model');
      if (model.get('firstOperand') != null && model.get('operation') != null) {
        $.ajax({
          url: '/api/calculate',
          contentType: 'application/json; charset=utf-8',
          dataType: 'json',
          data: model.toParams(),
          type: 'POST',
          success: function(response) {
            model.receivedResult(response['result']);
          },
          error: function() {
            model.receivedResult('NaN');
          }
        });
      }
    }
  }
});
