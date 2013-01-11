#simple-errors
Factory methods for easy error handling.

##Installation

```sh
npm install simple-errors
```

##Usage
Just make sure to require the module somewhere in your code (only once)

```js
require('simple-errors');
```

Then use the factory methods for creating errors:

```js
//simplest of errors
var err = Error.create();

//with message
var err = Error.create('foo');

//with data
var err = Error.create('foo', { foo: 'bar' });
console.log(err.foo === 'bar'); //prints true

//with data and inner error
var err = Error.create('foo', { foo: 'bar' }, err);
console.log(err.inner === err); //prints true

//helper for status codes (for use with connect & express)
var err = Error.http('foo', 500);
console.log(err.status === 500); //prints true

//helper method for turning the Error instance into a json object
var err = Error.create();
var obj = Error.toJson(err); //use this to print the entire error with stack.

```
