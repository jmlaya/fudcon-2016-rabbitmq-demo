require('colors');
var amqp = require("amqplib/callback_api");

const user = "guest",
      pass = "guest",
      connection = `amqp://${user}:${pass}@localhost`,
      delay = 500;

amqp.connect(connection, (err, conn) => {
  conn.createChannel((err, ch) => {

    const q = 'fairdispach-sample';
    let msgNumber = 1;

    ch.assertQueue(q, {durable: true});

    setInterval(λ => {
      ch.sendToQueue(q, new Buffer.from(`Hello World! #${msgNumber}`), {persistent: false});
      console.log('[x]'.green,`'Hello World! #${msgNumber}' enviado`);
      msgNumber++;
    }, delay);

  });
});
