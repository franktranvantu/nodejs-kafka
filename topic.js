const { Kafka } = require('kafkajs');

run();

async function run() {
  try {
    const kafka = new Kafka({
      clientId: 'myapp',
      brokers: ['localhost:9092']
    });

    const admin = kafka.admin();
    console.log('Admin is connecting...');
    await admin.connect();
    console.log('Admin connected!');
    // A - M, N - Z
    await admin.createTopics({
      topics: [{
        topic: 'Users',
        numPartitions: 2
      }]
    });
    console.log('Created topics success!');
    await admin.disconnect();
  } catch (e) {
    console.error(`Something went wrong: ${e}`);
  } finally {
    process.exit(0);
  }
}