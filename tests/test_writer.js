const fixtures = require('./fixtures');

const writer = require('../lib/index');


describe("Writer", function() {

  it(".build makes valid archive", async () => {

    const epub = fixtures.epub();
    const archive = await writer.build(epub);

    expect(await archive.file('mimetype').async('string')).toEqual('application/epub+zip');
    expect(archive.file('META-INF/container.xml')).toBeTruthy();
    expect(archive.file('OEBPS/content.opf')).toBeTruthy();
    expect(archive.file('OEBPS/navigation.xhtml')).toBeTruthy();
    expect(archive.file('OEBPS/default.css')).toBeTruthy();

    // TODO: add chapter and page data, and mock sizeOf().
  });
});
