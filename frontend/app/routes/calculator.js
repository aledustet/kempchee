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
      $.ajax({
        url: '/api/calculate',
        data: model.toParams(),
        contentType: 'application/json',
        dataType: 'json',
        type: 'POST',
        success: function(data) {
          let response = JSON.parse(data);
          model.receivedResult(response['result']);
        },
        error: function() {
          model.receivedResult('NaN');
        }
      });
    }
  }
});
