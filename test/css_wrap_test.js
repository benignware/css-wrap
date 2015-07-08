var
  fs = require('fs'),
  path = require('path'),
  mkdirp = require('mkdirp'),
  css_wrap = require('../css_wrap.js');
/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.css_wrap = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  test: function(test) {
    test.expect(1);
    
    var
      options = {
        selector: '.my-app'
      },
      result = css_wrap(path.join(__dirname, '/fixtures/styles.css'), options),
      actual,
      expected;
    
    mkdirp('tmp');
    fs.writeFileSync('tmp/styles.css', result);
    
    actual = fs.readFileSync('tmp/styles.css').toString();
    expected = fs.readFileSync(path.join(__dirname, '/expected/styles.css')).toString();
    
    test.equal(actual, expected, 'CSS Files should match');

    test.done();
  }
};
