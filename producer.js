const { Kafka } = require('kafkajs');

const message = process.argv[2];

run();

async function run() {
  try {
    const kafka = new Kafka({
      clientId: 'myapp',
      brokers: ['localhost:9092']
    });

    const producer = kafka.producer();
    console.log('Producer is connecting...');
    await producer.connect();
    console.log('Producer connected!');
    const partition = message[0] < 'N' ? 0 : 1;
    const result = await producer.send({
      topic: 'Users',
      messages: [
        {
          value: message,
          partition: partition
        }
      ]
    })
    console.log(`Producer send ${JSON.stringify(result)} success!`);
    await producer.disconnect();
  } catch (e) {
    console.error(`Something went wrong: ${e}`);
  } finally {
    process.exit(0);
  }
}