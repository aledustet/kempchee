import Route from '@ember/routing/route';
import $ from 'jquery';
import Calculator from '../models/calculator';

export default Route.extend({
  model() {
    return Calculator.create()
  },
  actions: {
    perform() {
      $.getJSON("/api/calculator").then(function(json) {
        return json;
      });
    }
  }
});
