const render = require('../render');

/**
 * Base factory to create resources.
 *
 * `Resource` represents the file listed as manifest items in `content.opf`.
 * Resource definition is below.
 *
 * @typedef {Object} Resource
 * @property {string} id
 * @property {string} href - relative path from the `content.opf`
 * @property {string} mediaType
 * @property {properties} - (optional) property of <item> tag
 * @property {function():Promise} data - returns Promise object to get contents of the file
 */
class BaseResourceFactory {

  createCss(epub) {
    return {
      id: 'default-style',
      href: 'default.css',
      mediaType: 'text/css',
      async data() {
        return `@charset "UTF-8";
body {
  background-color: ${epub.pageBgColor};
}
`;
      }
    }
  }

  createNavigation(id, epub, navigationItems) {
    return {
      id,
      href: 'navigation.xhtml',
      mediaType: 'application/xhtml+xml',
      properties: 'nav',
      async data() {
        return render.renderNavigation({ epub, navigationItems });
      }
    }
  }

  /**
   * Since the method of getting image data depends on the operating environment, it is not implemented in this class.
   */
  // eslint-disable-next-line no-unused-vars
  createImage(id, properties, imageSrc) {
    throw new Error('Not Implemented');
  }

  /**
   * @param {string} id
   * @param {Object} image - image resource. required width and height properties.
   * @param {Object} epub - epub data stracture
   */
  createPage(id, image, epub) {
    return {
      id,
      href: `pages/${id}.xhtml`,
      mediaType: 'application/xhtml+xml',
      async data() {
        // Adjust image size to fit page size
        let scale;
        if ((epub.pageHeight / epub.pageWidth ) < (image.height / image.width)) {
          scale = epub.pageHeight / image.height;
        } else {
          scale = epub.pageWidth / image.width;
        }
        const width = image.width * scale;
        const height = image.height * scale;

        return render.renderPage({
          epub,
          src: `../${image.href}`,
          x: (epub.pageWidth - width) / 2,
          y: (epub.pageHeight - height) / 2,
          width,
          height,
        });
      }
    }
  }
}

module.exports = BaseResourceFactory;
