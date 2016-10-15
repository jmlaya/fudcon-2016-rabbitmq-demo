var amqp = require('amqplib/callback_api'),
    config = require('./config'),
    args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Uso: exchange-direct-consumer.js [info] [warning] [error]");
  process.exit(1);
}

amqp.connect(config.connection, (err, conn) => {
  conn.createChannel((err, ch) => {
    var ex = 'exchange-direct-p';

    ch.assertExchange(ex, 'direct', {durable: false});

    ch.assertQueue('', {exclusive: true}, (err, q) => {
      console.log(' [*] Esperando por mensajes. To exit press CTRL+C');

      args.forEach((severity) => {
        ch.bindQueue(q.queue, ex, severity);
      });

      ch.consume(q.queue, (msg) => {
        console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
      }, {noAck: true});
    });
  });
});
