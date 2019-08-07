const Writer = require('./writer');

const BrowserResourceFactory = require('./resource-factories/browser');

module.exports = new Writer('blob', new BrowserResourceFactory());
