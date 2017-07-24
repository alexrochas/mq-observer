// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
"use strict";

const amqp = require("amqplib"),
      Promise = require("bluebird"),
      S = require("string");

function shallPrint(msg){
    const routingKey = msg.fields.routingKey;

    if (S(routingKey).endsWith(".position")) return false;
    return true;
}

function msgReceived (id, msg, mq, messages){
    const content = S(msg.content).trim().s;
    const routingKey = msg.fields.routingKey;

    if (shallPrint(msg)){
        console.log("Msg[%s, key: %s]: %s",mq.name, routingKey, content);
    }

    messages.create({
      id: id,
      message: content
    });
}

function consumeQueue(id, mq, exchange, messages, cb){
    var ctx = {};
    return amqp.connect(mq)
    .then (conn => {
        ctx.conn = conn;
        return conn.createChannel()
    }).then (channel => {
        ctx.channel = channel;
        return channel.assertQueue('', {
            durable: false,
            exclusive: true,
            autoDelete: true
        })
    }).then ( queue => {
        ctx.queue = queue;
        return ctx.channel.bindQueue(queue.queue, exchange,"#")
    }).then ( () => {
        console.log("Connected to queue [name: %s]", mq);
        ctx.channel.consume(ctx.queue.queue, msg => {
            cb(id, msg, mq, messages);
            ctx.channel.ack(msg);
        })
    })
}

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
