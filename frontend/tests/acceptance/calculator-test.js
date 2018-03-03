import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import $ from 'jquery';

module('Acceptance | calculator', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async (assert) => {
    await visit('/');

    assert.equal(currentURL(), '/');
  });

  test('does not add numbers if the value is zero', async (assert) => {
    await visit('/');

    assert.equal($('h3.display').text(), '0');

    await $('#0').click()
    assert.equal($('h3.display').text(), '0');

    await $('#0').click()
    assert.equal($('h3.display').text(), '0');

    await $('#1').click()
    await $('#2').click()
    await $('#3').click()
    assert.equal($('h3.display').text(), '123');
  });

  test('should show the calculator numbers', async (assert) => {
    await visit('/');

    await $('#1').click()
    assert.equal($('h3.display').text(), '1');

    await $('#2').click()
    assert.equal($('h3.display').text(), '12');
  });

  test('resets the display after an operation', async (assert) => {
    await visit('/');

    await $('#1').click()
    await $('#2').click()
    assert.equal($('h3.display').text(), '12');

    await $('#sqrt').click()
    assert.equal($('h3.display').text(), '0');
  });

  test('keeps adding values normally after an operation', async (assert) => {
    await visit('/');

    await $('#1').click()
    await $('#2').click()
    assert.equal($('h3.display').text(), '12');

    await $('#sqrt').click()
    assert.equal($('h3.display').text(), '0');

    await $('#1').click()
    await $('#2').click()
    assert.equal($('h3.display').text(), '12');
  });

  test('shows the first operand and the operation after starting to add the second one', async (assert) => {
    await visit('/');

    await $('#1').click()
    await $('#2').click()
    await $('#sqrt').click()
    await $('#1').click()
    await $('#2').click()
    assert.equal($('small.previous-operation').text(), '12 sqrt');
  });
});
