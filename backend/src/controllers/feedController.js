const Feed = require('../models/Feed');
const { redisClient } = require('../config/redis');
const { getIo } = require('../socket');

const REDIS_FEED_KEY = 'feeds:all';

// @desc    Get all feeds
// @route   GET /api/feed
// @access  Public
const getFeeds = async (req, res, next) => {
  try {
    // Check Redis cache first
    const cachedFeeds = await redisClient.get(REDIS_FEED_KEY);

    if (cachedFeeds) {
      console.log('Cache Hit: Feeds retrieved from Redis');
      return res.status(200).json({
        success: true,
        count: JSON.parse(cachedFeeds).length,
        data: JSON.parse(cachedFeeds),
      });
    }

    console.log('Cache Miss: Fetching feeds from MongoDB');
    // Fetch from MongoDB, sort by newest first
    const feeds = await Feed.find().sort({ createdAt: -1 });

    // Store in Redis (cache for 1 hour)
    await redisClient.setEx(REDIS_FEED_KEY, 3600, JSON.stringify(feeds));

    res.status(200).json({
      success: true,
      count: feeds.length,
      data: feeds,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new feed
// @route   POST /api/feed
// @access  Public
const createFeed = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const feed = await Feed.create({
      title,
      description,
    });

    // Invalidate Redis cache
    await redisClient.del(REDIS_FEED_KEY);
    console.log('Cache Invalidated: New feed created');

    // Emit socket event for real-time update
    const io = getIo();
    io.emit('new-feed', feed);
    console.log('Socket Event Emitted: new-feed');

    res.status(201).json({
      success: true,
      data: feed,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFeeds,
  createFeed,
};
