const BaseResourceFactory = require('./base');

// FIXME!!
class BrowserResourceFactory extends BaseResourceFactory {
  // eslint-disable-next-line no-unused-vars
  createImage(id, properties, imageSrc) {
  }
}

module.exports = BrowserResourceFactory;
