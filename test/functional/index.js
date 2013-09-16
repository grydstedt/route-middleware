var test        = require('tap').test,
    route-middleware    = require(__dirname + '/../lib/index.js');

route-middleware(function (err, obj) {
    test('functional', function (t) {
        t.equal(err, null, 'error object is null');
        t.end();
    });
});