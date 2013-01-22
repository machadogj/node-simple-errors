require('../index.js');

var assert = require('assert');

describe("simple-errors", function() {

	it("should add create factory to Error class", function () {
		assert.ok(Error.create);
	});

	it("should add http factory to Error class", function () {
		assert.ok(Error.http);
	});

	it("should add toJson helper method", function () {
		assert.ok(Error.toJson);
	});

	describe("create", function () {

		it("should return an Error instance", function () {

			var err = Error.create('foo');

			assert.ok(err instanceof Error);
			assert.equal('foo', err.message);
		});

		it("should use 'Unknown error' by default", function () {

			var err = Error.create();

			assert.equal('Unknown error', err.message);
		});

		it("should accept a string as data", function () {

			var err = Error.create('foo', 'bar');

			assert.equal('bar', err.data);
		});

		it("should accept another Error as inner", function () {

			var err = Error.create('foo', new Error('bar'));

			assert.equal(undefined, err.data);
			assert.ok(err.inner instanceof Error);
		});

		it("should add properties defined in data", function () {

			var err = Error.create('foo', {status: 200});

			assert.equal(200, err.status);
		});

		it("should accept an inner error in string format", function () {

			var err = Error.create('foo', {}, 'boo');

			assert.equal('boo', err.inner);
		});
	});

	describe("http", function () {

		it("should use 500 as defualt", function () {

			var err = Error.http();

			assert.equal('Internal server error', err.message);
			assert.equal(500, err.status);
		});
	});

	describe("toJson", function () {

		it("should return an object with all the properties", function () {
			var err = Error.create('foo', { foo: 'bar' }, 'boo'),
			obj = Error.toJson(err);

			assert.ok(!(obj instanceof Error));
			assert.equal('foo', obj.message);
			assert.equal('bar', obj.foo);
			assert.equal('boo', obj.inner);
		});

		it("should have stack in the keys collection", function () {
			var err = Error.create('foo', { foo: 'bar' }, 'boo'),
			obj = Error.toJson(err);

			assert.ok(Object.keys(obj).indexOf('stack') >= 0);
		});

		it("should recursively turn errors into literals", function () {
			var err = Error.create('foo', {}, Error.create('bar'));
			var obj = Error.toJson(err);

			assert.equal('bar', obj.inner.message);
		});

		it("should support a 'string' in inner", function () {
			var err = Error.create('foo', {}, "something bad happened");

			assert.equal("something bad happened", Error.toJson(err.inner));
		});

	});
});