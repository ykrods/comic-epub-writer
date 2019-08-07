const fs = require('fs');

const sizeOf = require('image-size');
const mime = require('mime');

const BaseResourceFactory = require('./base');


class NodeResourceFactory extends BaseResourceFactory {
  /**
   * @param {string} id
   * @param {string} properties - `properties` attribute of <item> tag
   *                              XXX: prefer to list
   * @param {string} imageSrc - local image path.
   */
  createImage(id, properties, imageSrc) {
    const size = sizeOf(imageSrc);
    return {
      id,
      properties,
      href: `images/${id}.${size.type}`,
      mediaType: mime.getType(size.type),
      data() {
        return new Promise((resolve, reject) => {
          fs.readFile(imageSrc, (err, data) => {
            if (!err) {
              resolve(data);
            } else {
              reject(err);
            }
          });
        });
      },
      // for createPage()
      width: size.width,
      height: size.height,
    }
  }
}

module.exports = NodeResourceFactory;
