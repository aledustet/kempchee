import { module, test, skip } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | calculator', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');
  });

  skip('should show the calculator numbers', function () {
  });

  skip('should show the calculator operation buttons', function () {
  });

  skip('clicking a number button adds it to the display', function () {
  });

  skip('clicking an operation button performs saves the and clears the display', function () {
  });

  skip('clicking equal sign with two operands and an operation performs the operation', function () {
  });
});
