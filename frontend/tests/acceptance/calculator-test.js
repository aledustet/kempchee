import { module, test, skip } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import $ from 'jquery';

module('Acceptance | calculator', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async (assert) => {
    await visit('/');

    assert.equal(currentURL(), '/');
  });

  test('should show the calculator numbers', async (assert) => {
    await visit('/');

    await $('#1').click()
    assert.equal($('h3.display').text(), '1');

    await $('#2').click()
    assert.equal($('h3.display').text(), '12');
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
