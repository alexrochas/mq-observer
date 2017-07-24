const assert = require('assert');
const app = require('../../src/app');

describe('\'connections\' service', () => {
  it('registered the service', () => {
    const service = app.service('connections');

    assert.ok(service, 'Registered the service');
  });
});
