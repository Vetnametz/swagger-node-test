'use strict';
const Feed = require('../../models/feed.model');
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
  registerFeed: registerFeed
};

/**
 * Create new feed
 * @param req
 * - feed @type Object
 * @param res
 */

function registerFeed(req, res) {
  let newFeed = new Feed(req.swagger.params.feed.value);
  newFeed.save((err, result) => {
    if (err) {
      res.status(500).send({message: err.message});
    }
    res.status(200).json(result);
  });
}
