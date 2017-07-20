'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

 */
module.exports = {
  login: login
};

/**
 *
 * @param req
 * - username @type String
 * @param res
 */

function login(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  console.log(req.swagger.params);
  let name = req.swagger.params.username.value;
  if (typeof name === 'string' && name.length > 0) {
    res.status(200).send({message: `User ${req.swagger.params.username.value}: was logged in.`});
  } else {
    res.status(500).end();
  }
}
