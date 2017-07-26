// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const {cancelQueue} = require("../amqp");

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    hook.app.service('connections').find({id: hook.id}).then(response => {
      const connection = response.data[0];
      cancelQueue(connection.id, connection.url, connection.exchange);
    });
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    return Promise.resolve(hook);
  };
};
