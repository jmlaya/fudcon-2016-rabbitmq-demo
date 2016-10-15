require('colors');
var amqp = require("amqplib/callback_api");
var config = require("./config");

const delay = 1000;

amqp.connect(config.connection, (err, conn) => {
  conn.createChannel((err, ch) => {
    var q = 'fairdispach-sample';

    ch.assertQueue(q, {durable: true});
    ch.prefetch(1); // => Indicamos que solo reciba un mensaje a la vez
    console.log("[*] Esperando mensajes de ",q.bold.green,". To exit press CTRL+C", q);

    ch.consume(q, msg => {
      setTimeout(λ => {
          console.log(" [x] Recibido %s", msg.content.toString());
          ch.ack(msg);
      }, delay);

    }, {noAck: false});

  });
});
