import { Queue } from 'bullmq';

const QUEUE_NAME = 'my-queue';
const redisConnection = {
  host: '127.0.0.1',
  port: 6379,
};

const queue = new Queue(QUEUE_NAME, { connection: redisConnection });

function buildServer() {
  const fastify = Fastify();

  fastify.get('/', async () => {
    console.log('request received');

    console.log('Enqueuing a job');
    queue.add('my-job', {});
    return { message: 'hello world' };
  });

  fastify.listen({ port: 3000 }, (_, address) => {
    console.log('listening on port:', address);
  });
}
