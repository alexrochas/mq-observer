const messages = require('./messages/messages.service.js');
const connections = require('./connections/connections.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(messages);
  app.configure(connections);
};
