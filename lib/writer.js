const JSZip = require('jszip');

const pkg = require('../package.json');
const ComicEpub = require('./comic-epub');
const PageLayouter = require('./page-layouter');

const render = require('./render');

class Writer {
  constructor (generateType, resourceFactory) {
    this.generateType = generateType;
    this.rf = resourceFactory;
    this.logLines = [];
    this.listener = undefined;
  }

  log (message, progressHints) {
    const timestamp = new Date();
    let line = `[${timestamp.toISOString()}]: ${message}`;
    if (progressHints) {
      line += ` progressHints: ${JSON.stringify(progressHints)}`;
    }
    this.logLines.push(line);

    if (this.listener) {
      this.listener({timestamp, message, progressHints});
    }
  }

  /**
   * @returns {{ resources: Array, spineItems: Array}}
   *
   */
  async prepare(epub) {
    const resources = [
      this.rf.createCss(epub), // common resource
    ];

    const spineItems = [];
    const navigationItems = [];

    const pageLayouter = new PageLayouter(epub.direction);

    if (epub.cover) {
      const cover = await Promise.resolve(
        this.rf.createImage('i-cover', 'cover-image', epub.cover)
      );
      resources.push(cover);

      // generate cover image page
      const coverPage = this.rf.createPage('p-cover', cover, epub)
      resources.push(coverPage);

      spineItems.push({
        idref: 'p-cover',
        propertiesStr: pageLayouter.next(),
      });

      navigationItems.push({href: coverPage.href, title: 'cover'});
    }

    let no = 1;
    // enable to await and get index
    for (let i = 0; i < epub.chapters.length; i++ ) {
      const chapter = epub.chapters[i];
      for (let j = 0; j < chapter.pages.length; j++ ) {
        const pageParam = chapter.pages[j];

        const pNo = (new String(no)).padStart(3, '0');
        this.log(`Source Image: ${pageParam.src}`);

        const image = await Promise.resolve(
          this.rf.createImage(`i-${pNo}`, null, pageParam.src)
        );
        resources.push(image);

        const page = this.rf.createPage(`p-${pNo}`, image, epub);
        resources.push(page);

        // make spine item properties
        // XXX: messy
        let properties = [ pageLayouter.next(pageParam.spread)];
        if (Array.isArray(pageParam.properties)) {
          properties = properties.concat(pageParam.properties);
        }

        spineItems.push({
          idref: `p-${pNo}`,
          properties,
          get propertiesStr() { return this.properties.join(' '); },
        });

        if (j === 0) {
          navigationItems.push({href: page.href, title: chapter.title});
        }

        no++;
      }
    }

    resources.push(this.rf.createNavigation('nav', epub, navigationItems));

    return { resources, spineItems };
  }

  async write (epubData, listener) {
    const zip = await this.build(epubData, listener);
    return await zip.generateAsync({type: this.generateType});
  }

  /**
   * @returns {JSZip} zip instance
   */
  async build (epubData, listener) {
    this.listener = listener;
    this.log(`${pkg.name} v${pkg.version}`);
    this.log(`Start building.`);

    const epub = new ComicEpub(epubData);


    const { resources, spineItems } = await this.prepare(epub);

    this.log('Finish to list resources.', { cur: 0, max: resources.length });
    const zip = new JSZip();

    const compressingOption = {
      compression: 'DEFLATE',
      compressionOptions: { level: 9 },
    };

    zip.file('mimetype', 'application/epub+zip', {compression: 'STORE'});
    zip.file('META-INF/container.xml', render.renderContainerXml(), compressingOption);

    const oebps = zip.folder('OEBPS');

    oebps.file(
      'content.opf',
      render.renderContentOpf({ epub, resources, spineItems }),
      compressingOption,
    );

    oebps.folder('images');
    oebps.folder('pages');

    // XXX: It seems like that the viewport size of the first page is applied globally on `book` app of macOS and iOS.
    this.log(`Epub pageSize: (${epub.pageWidth}, ${epub.pageHeight})`);

    for (let i=0; i < resources.length; i++) {
      const resource = resources[i];

      oebps.file(resource.href, await resource.data(), compressingOption);
      this.log(`Resource id=${resource.id} is bundled.`, { cur: (i + 1), max: resources.length });
    }

    zip.file('build.log', this.logLines.join('\n'), compressingOption);

    return zip;
  }
}

module.exports = Writer;
