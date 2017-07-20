'use strict';
const Feed = require('../../models/feed.model');
const Article = require('../../models/article.model');

module.exports = {
  registerFeed: registerFeed,
  fetchFeeds: fetchFeeds,
  deleteFeed: deleteFeed,
  updateFeedContents: updateFeedContents
};

/**
 * Create new feed
 * @param req
 * - feed @type Object
 * @param res
 */

function registerFeed(req, res) {
  
  let newFeed = new Feed({
    title: '',
    articles: [],
    userName: req.swagger.params.feed.value.userName,
    URL: req.swagger.params.feed.value.URL
  });
  
  getFeedTitle(newFeed.URL)
  .then((feedTitle) => {
    newFeed.title = feedTitle;
    newFeed.save((err, result) => {
      if (err) {
        res.status(500).send({message: err.message});
      }
      res.status(200).json(result);
    });
  })
  .catch((err) => {
    res.status(500).send({message: err.message});
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

/**
 * Get feed content
 * @param req
 * @param res
 */
function updateFeedContents(req, res) {
  console.log(`---updateFeedContents---`);
  console.log(req.swagger.params.feedId.value);
  let newArticle = new Article({});
  Feed.findOne({_id: req.swagger.params.feedId.value}, (err, feed) => {
    if (err) {
      res.status(500).send({message: err.message});
    }
    console.log(`--feed was found---`);
    console.log(feed);
    getFeedContent(feed.URL)
    .then((feedContent) => {
      console.log(`===feedContent===`);
      console.log(feedContent);
    })
    .catch((err) => {
      res.status(500).send({message: err.message});
    });
    // res.status(200).json(result.result);
  });
}

/**
 * PRIVATE methods
 */

const getFeedTitle = function(url) {
  const FeedMe = require('feedme');
  let parser = new FeedMe();
  
  // return new pending promise
  return new Promise((resolve, reject) => {
    // select http or https module, depending on reqested url
    const lib = url.startsWith('https') ? require('https') : require('http');
    const request = lib.get(url, (response) => {
      // handle http errors
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error('Failed to load page, status code: ' + response.statusCode));
      }
      parser.on('title', function(title) {
        resolve(title);
      });
      response.pipe(parser);
    });
    // handle connection errors of the request
    request.on('error', (err) => reject(err))
  })
};
const getFeedContent = function(url) {
  const FeedMe = require('feedme');
  let parser = new FeedMe();
  
  // return new pending promise
  return new Promise((resolve, reject) => {
    // select http or https module, depending on reqested url
    const lib = url.startsWith('https') ? require('https') : require('http');
    const request = lib.get(url, (response) => {
      // handle http errors
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error('Failed to load page, status code: ' + response.statusCode));
      }
      parser.on('item', function(item) {
        resolve(item);
      });
      response.pipe(parser);
    });
    // handle connection errors of the request
    request.on('error', (err) => reject(err))
  })
};