import { Worker } from 'bullmq';

function runWorkers() {
  new Worker(
    'my-queue',
    async (job) => {
      console.log('worker', job.id);
    },
    {
      connection: redisConnection,
    },
  );
}
