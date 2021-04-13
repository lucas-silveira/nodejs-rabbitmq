import amqplib from "amqplib";

const queue = 'my_first_queue';
const routingKey = 'queue1';

async function main() {
  try {
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();
    const queueItsOK = await channel.assertQueue(queue);

    if (queueItsOK) channel.sendToQueue(queue, Buffer.from('Hello from Nodejs!'))
  } catch (err) {
    console.warn(err);
  }

}

main();
