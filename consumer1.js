import amqplib from "amqplib";

const queue = 'my_first_queue';
const routingKey = 'queue1';

async function main() {
  try {
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();
    const queueItsOK = await channel.assertQueue(queue);

    if (queueItsOK) channel.consume(queue, msg => {
      if (msg) {
        console.log(msg.content.toString());
        channel.ack(msg);
      }
    })
  } catch (err) {
    console.warn(err);
  }

}

main();
