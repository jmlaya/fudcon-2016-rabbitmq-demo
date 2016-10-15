require('colors');
var amqp = require("amqplib/callback_api");
var config = require("./config");

const delay = 1000;

amqp.connect(config.connection, (err, conn) => {
  conn.createChannel((err, ch) => {

    const ex = 'exchange-fanout-p';
    let msgNumber = 1;
    ch.assertExchange(ex, 'fanout', {durable: true})

    setInterval(λ => {
      ch.publish(ex, '', new Buffer.from(`Hello World! #${msgNumber}`));
      console.log('[x]'.green,`'Hello World! #${msgNumber}' enviado`);
      msgNumber++;
    }, delay);

  });
});
