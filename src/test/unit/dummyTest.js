import * as assert from 'assert';

module.exports = {
  'Dummy unit test': function() {
    let expected = true;
    let actual = dummyFunctionToTest();
    assert.equal(actual, expected);
  }
};

function dummyFunctionToTest() {
  return true;
}