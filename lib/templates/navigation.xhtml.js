module.exports = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:epub="http://www.idpf.org/2007/ops"
      xml:lang="{{ epub.language }}">
  <head>
    <title>Navigation</title>
  </head>
  <body>
    <nav epub:type="toc" id="toc">
      <ol>
        {{#navigationItems}}
        <li>
          <a href="{{{ href }}}">{{ title }}</a>
        </li>
        {{/navigationItems}}
      </ol>
    </nav>
  </body>
</html>`;
