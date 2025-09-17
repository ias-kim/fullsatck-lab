import dotenv from 'dotenv';
import { createClient } from 'redis';

dotenv.config();

const redisClient = createClient({
  socket: {
    tls: true, // rediss:// 프로토콜 대신 tls 옵션을 사용
  },
  url: process.env.REDIS_URL,
});

redisClient.on('connect', () => {
  console.log('Redis Connected');
});
redisClient.on('error', (err) => {
  console.log(
    'Redis Error',
    err,
    process.env.REDIS_HOST,
    process.env.REDIS_PASSWORD,
  );
});

await redisClient.connect();

export default redisClient;
