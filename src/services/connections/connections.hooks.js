

const createConnection = require('../../hooks/create-connection');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [createConnection()],
    update: [],
    patch: [],
    remove: []
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
