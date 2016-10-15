require('colors');
var amqp = require("amqplib/callback_api");
var config = require("./config");

const delay = 3000;

amqp.connect(config.connection, (err, conn) => {
  conn.createChannel((err, ch) => {
    const ex = 'exchange-fanout-e';

    ch.assertExchange(ex, 'fanout', {durable: true});
    ch.assertQueue('', {exclusive: true, durable: true}, (err, q) => {
      console.log("[*] Esperando mensajes de ",q.queue.bold.green,". To exit press CTRL+C");
      ch.prefetch(1);
      ch.bindQueue(q.queue.toString(), ex, '');
      ch.consume(q.queue, msg => {
        setTimeout(λ => {
            console.log(" [x] Recibido %s", msg.content.toString());
            ch.ack(msg);
        }, delay);

      }, {noAck: false});
    });




  });
});
