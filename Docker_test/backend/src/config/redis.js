import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();
const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on('connect', () => {
  console.log('Redis Connected');
});
redisClient.on('error', (err) => {
  console.log('Redis Error', err);
});

redisClient.connect();

export default redisClient;
