var amqp = require('amqplib/callback_api'),
    config = require('./config');

amqp.connect(config.connection, (err, conn) => {
  conn.createChannel((err, ch) => {
    var ex = 'exchange-direct-p',
        args = process.argv.slice(2),
        msg = args.slice(1).join(' ') || 'Hello World!',
        severity = (args.length > 0) ? args[0] : 'info';

    ch.assertExchange(ex, 'direct', {durable: false});
    ch.publish(ex, severity, new Buffer(msg));
    console.log(" [x] Enviado %s: '%s'", severity, msg);
  });

  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});
