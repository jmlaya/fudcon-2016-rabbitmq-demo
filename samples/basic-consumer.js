require('colors');
var amqp = require("amqplib/callback_api");

const user = "guest",
      pass = "guest",
      connection = `amqp://${user}:${pass}@localhost`,
      delay = 500;

amqp.connect(connection, (err, conn) => {
  conn.createChannel((err, ch) => {
    var q = 'basic-sample';

    ch.assertQueue(q, {durable: true});
    console.log("[*] Esperando mensajes de ",q.bold.green,". To exit press CTRL+C", q);

    ch.consume(q, msg => {
      setTimeout(λ => {
          console.log(" [x] Recibido %s", msg.content.toString());
      }, delay);

    }, {noAck: true});

  });
});
