const { createClient } = require('redis');

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis Client Connected'));

const connectRedis = async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.error(`Error connecting to Redis: ${error.message}`);
  }
};

module.exports = {
  redisClient,
  connectRedis,
};
