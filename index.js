/**
 * simple-errors module
 *
 * Create errors with simple factory methods for easy error handling.
 * License: BSD
 */

/**
 * Use Error.create(...) to create Error instances.
 * function create
 * @param msg (string)
 * @param data (string|obj) adds metadata to the Error instance
 * @param inner (Error|string) for chaining errors
 * @api public
 */
Error.create = function ( msg, data, inner ) {
	
	data = data || {};

	var err = new Error(msg || "Unknown error");

	if (typeof(data) === 'string') {

		err.data = data;

	} else if (data instanceof Error) {
		
		err.inner = data;
	
	} else {
	
		err.inner = inner;

		Object.keys(data).forEach(function (key) {
			err[key] = data[key];
		});
	}
	
	return err;	
}

/**
 * Use Error.http(...) to create Error instances with status codes.
 * @param msg (string)
 * @param code (numeric) adds status property to the error.
 * @param inner (Error|string) for chaining errors
 */
Error.http = function (msg, code, inner) {

	return Error.create(msg || 'Internal server error', {status: code || 500}, inner);
}

/**
 * Turn an Error instance into a json object recursively. Use this function
 * for printing the entire error (even the stacks).
 * @param err (Error)
 * @api public
 */
Error.toJson = function ( err ) {
	
	var info = { message: err.message };

    for (var prop in err) {
        var value = err[prop];
        info[prop] = (value instanceof Error) ? Error.toJson(value) : value;
    }
    
    info.stack = err.stack.split("\n");
    return info;
}