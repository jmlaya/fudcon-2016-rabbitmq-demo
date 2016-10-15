const user = "guest",
      pass = "guest",
      connection = `amqp://${user}:${pass}@localhost`;

module.exports = {
  cnnString: connection
};
