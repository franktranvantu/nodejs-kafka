const { Kafka } = require('kafkajs');

run();

async function run() {
  try {
    const kafka = new Kafka({
      clientId: 'myapp',
      brokers: ['localhost:9092']
    });

    const consumer = kafka.consumer({
      groupId: 'test'
    });
    console.log('Consumer is connecting...');
    await consumer.connect();
    console.log('Consumer connected!');
    await consumer.subscribe({
      topic: 'Users',
      fromBeginning: true
    });
    await consumer.run({
      eachMessage: async result => {
        console.log(`Received message ${result.message.value} on partition ${result.partition}`);
      }
    })
  } catch (e) {
    console.error(`Something went wrong: ${e}`);
  }
}