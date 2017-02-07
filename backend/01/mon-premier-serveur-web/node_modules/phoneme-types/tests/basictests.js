var test = require('tape');
var phonemeTypes = require('../phoneme-types');

test('Basic tests', function basics(t) {
  t.plan(4);

  t.equal(phonemeTypes.isConsonantish('AA'), false);
  t.equal(phonemeTypes.isConsonantish('K'), true);

  t.equal(phonemeTypes.isVowelish('UH'), true);
  t.equal(phonemeTypes.isVowelish('Y'), false);
});
