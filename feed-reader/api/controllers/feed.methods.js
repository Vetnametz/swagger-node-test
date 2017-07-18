'use strict';
const Feed = require('../../models/feed.model');

module.exports = {
  registerFeed: registerFeed,
  fetchFeeds: fetchFeeds,
  deleteFeed: deleteFeed
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

/**
 * Fetch feeds by userName
 * @param req
 * - userName @type String
 * @param res
 * - feeds @type Array of Objects
 */

function fetchFeeds(req, res) {
  Feed.find({userName: req.swagger.params.userName.value}, (err, feeds) => {
    if (err) {
      res.status(500).send({message: err.message});
    }
    res.status(200).json(feeds);
  });
}

/**
 * Delete feeds by userName
 * @param req
 * - feedId @type String
 * @param res
 */

function deleteFeed(req, res) {
  Feed.remove({_id: req.swagger.params.feedId.value}, (err, result) => {
    if (err) {
      res.status(500).send({message: err.message});
    } else if (result.result.n === 0) {
      res.status(404).send({message: `There is no such feed`});
    } else {
      res.status(200).json(result.result);
    }
  });
}
