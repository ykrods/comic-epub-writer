const Writer = require('./writer');

const NodeResourceFactory = require('./resource-factories/node');

module.exports = new Writer('nodebuffer', new NodeResourceFactory());
