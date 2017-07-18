'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

 */
module.exports = {
  login: login
};

/**
 * @param req
 * - username @type String
 * @param res
 */

function login(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
 
  let name = req.swagger.params.value;
  if (typeof name === 'string' && name.length > 0) {
    res.status(200).end();
  }
}
