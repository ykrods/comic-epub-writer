const parser = require('fast-xml-parser');

const fixtures = require('./fixtures');
const render = require('../lib/render');

const parseXml = (data) => {
  return parser.parse(data, {
    ignoreAttributes: false,
    attributeNamePrefix: '',
    attrNodeName: "@attr",
    textNodeName : "#text",
  });
};


const resources = [
  { id: 'cover', href: 'pages/cover.png', mediaType: 'image/png', properties: 'cover'},
  { id: 'p-1', href: 'pages/p-1.xhtml', mediaType: 'text/html+xml' },
];

const spineItems = [
  { idref: 'p-1', linear:'left?' },
];


describe("check paser behavior", () => {
  it("Raise Error for invalid string", () => {
    const result = parser.validate('INVALID<xml></xml>');
    expect(result).not.toEqual(true);
    expect(result.hasOwnProperty('err')).toEqual(true);
  });
});

describe(".renderContainerXml", () => {
  it("Returns valid xml", () => {
    const result = render.renderContainerXml();
    expect(parser.validate(result)).toEqual(true);
  });
});

describe(".renderContentOpf", () => {
  it("Returns valid xml", () => {
    const epub = fixtures.epub();
    const result = render.renderContentOpf({ epub, resources, spineItems });
    expect(parser.validate(result)).toEqual(true);
  });

  it("has correct values", () => {
    const epub = fixtures.epub();
    const result = render.renderContentOpf({ epub, resources, spineItems });
    const parsed = parseXml(result);

    expect(parsed['package']['metadata']['dc:title']['#text']).toEqual(epub.title);
    expect(parsed['package']['metadata']['meta'].find((meta) => {
      return (meta['@attr']['refines'] === `#${epub.creators[0].id}` &&
              meta['@attr']['property'] === 'role');
    })['#text']).toEqual(epub.creators[0].role);
  });
});

// TODO: add test
