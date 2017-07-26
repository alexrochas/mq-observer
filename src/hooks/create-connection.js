// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
"use strict";
const Promise = require("bluebird");
const {consumeQueue, msgReceived} = require("../amqp");

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    'use strict';

    const id = hook.data.id;
    const exchange = hook.data.exchange;
    const url = hook.data.url;

    console.log(`${id} - ${url}`);

    const messages = hook.app.service('messages');
    consumeQueue(id, url, exchange, messages, msgReceived);

    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    return Promise.resolve(hook);
  };
};
