const express = require('express');
const { getFeeds, createFeed } = require('../controllers/feedController');
const { validateFeed } = require('../middleware/validate');

const router = express.Router();

router.route('/')
  .get(getFeeds)
  .post(validateFeed, createFeed);

module.exports = router;
