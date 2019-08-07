const uuidv4 = require('uuid/v4');
const moment = require('moment');

class Epub {
  constructor(data) {
    if (!data) {
      data = {}
    }
    this.title = data.title;
    this.title_file_as = data.title_file_as;
    this.creators = [];

    // shorthand for adding creator with author role.
    if (data.author && typeof data.author === 'string') {
      this.addCreator({ name: data.author, role: 'aut' });
    }
    if (Array.isArray(data.creators)) {
      data.creators.forEach(c => this.addCreator(c));
    }
    this.direction = data.direction || 'rtl';
    this.language = data.language;
    this.uniqueId = data.uniqueId || `urn:uuid:${uuidv4()}`;

    this.modified = data.modified || moment().utc().format();

    this.cover = data.cover;
    // available values: [portrait, landscape, auto]
    this.renditionOrientation = data.renditionOrientation || 'auto';
    // available values: [none, portrait, landscape, both, auto]
    this.renditionSpread = data.renditionSpread || 'auto';

    // page settings
    this.pageWidth = parseInt(data.pageWidth,10) || 800;
    this.pageHeight = parseInt(data.pageHeight,10) || 1200;
    this.pageBgColor = data.pageBgColor || '#FFFFFF';
  }

  addCreator(creator) {
    let c = { id: `creator${this.creators.length}` };
    if (typeof creator === 'string') {
      c.name = creator;
    } else {
      c = Object.assign({}, creator, c);
    }
    this.creators.push(c);
  }
}

/**
 *  Fixed Layout EPUB model
 */
class ComicEpub extends Epub {
  constructor(data) {
    if (!data) {
      data = {};
    }
    super(data);

    this.chapters = [];
    if (Array.isArray(data.chapters)) {
      data.chapters.forEach(c => this.addChapter(c));
    }
  }

  addChapter(chapter) {
    const c = {
      title: chapter.title,
      pages: [],
    }

    if (Array.isArray(chapter.pages)) {
      c.pages = chapter.pages.map(page => {
        if (typeof page === 'string') {
          return { src: page };
        } else {
          return { src: page.src, properties: page.properties };
        }
      });
    }
    this.chapters.push(c);
  }
}

module.exports = ComicEpub;
