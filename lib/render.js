const Mustache = require('mustache');

const CONTAINER_XML = require('./templates/container.xml.js');
const CONTENT_OPF = require('./templates/content.opf.js');
const NAVIGATION_XHTML = require('./templates/navigation.xhtml.js');
const PAGE_XHTML = require('./templates/page.xhtml.js');

const renderer = (template) => {
  return view => Mustache.render(template, view);
};

/**
 * @param {object} view - `{ epub, resource, spineItems }`
 */
const renderContentOpf = (view) => {

  let creatorsProperties = [];
  view.epub.creators.forEach((creator) => {
    const props = Object.keys(creator).filter(key => !['name', 'id'].includes(key)).map((key) => {
      return { creatorId: creator.id, key, value: creator[key] };
    });
    creatorsProperties = creatorsProperties.concat(props);
  });

  return Mustache.render(CONTENT_OPF, Object.assign({}, view, { creatorsProperties }));
};

module.exports = {
  renderContainerXml: renderer(CONTAINER_XML),
  renderContentOpf,
  renderNavigation: renderer(NAVIGATION_XHTML),
  renderPage: renderer(PAGE_XHTML),
}
