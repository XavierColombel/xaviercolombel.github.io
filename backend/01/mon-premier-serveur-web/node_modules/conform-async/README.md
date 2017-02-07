conform-async
=============

A handy wrapper for `process.nextTick` that you can use to call a callback on the next tick instead of immediate, even though you have the results for callback. [Here's why you'd want to do this](http://nodejs.org/api/process.html#process_process_nexttick_callback) (scroll to "It is very important...").

Installation
------------

    npm install conform-async

Usage
-----
    var conformAsync = require('conform-async');

    // callback expects to be called async.
    function getResultForSpecialSituation(id, callback) {
    	var error = null;
    	var constantResult = 'This is always the result';
			conformAsync.callBackOnNextTick(callback, error, constantResult);
		}

So, here's the implementation:

		function makeCallbackCaller(cb, error, result) {
			return function callbackCall() {
				cb(error, result);
			};
		}

		function callBackOnNextTick(cb, error, result) {
			process.nextTick(makeCallbackCaller(cb, error, result));
		}

It's not much. It's just something I don't want to copy from project to project. :) (`makeCallbackCaller` is exposed in case you want to use make a callback wrapper and pass it to `setTimeout` or something instead of `process.nextTick`.)

Tests
-----

Run tests with `make test`.

License
-------

MIT.
