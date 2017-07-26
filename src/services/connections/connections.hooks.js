

const createConnection = require('../../hooks/create-connection');

const removeConnection = require('../../hooks/remove-connection');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [createConnection()],
    update: [],
    patch: [],
    remove: [removeConnection()]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
