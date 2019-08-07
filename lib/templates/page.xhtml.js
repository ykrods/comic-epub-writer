module.exports = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:epub="http://www.idpf.org/2007/ops"
      xml:lang="{{ epub.language }}">
  <head>
    <title>{{ epub.title }}</title>
    <link type="text/css" rel="stylesheet" href="../default.css"/>
    <meta name="viewport" content="width={{ epub.pageWidth }}, height={{ epub.pageHeight }}"/>
  </head>
  <body>
    <svg xmlns="http://www.w3.org/2000/svg"
         version="1.1"
         xmlns:xlink="http://www.w3.org/1999/xlink"
         width="100%"
         height="100%"
         viewBox="0 0 {{ epub.pageWidth }} {{ epub.pageHeight }}">
      <image x="{{ x }}" y="{{ y }}" width="{{ width }}" height="{{ height }}" xlink:href="{{{ src }}}"/>
    </svg>
  </body>
</html>`;
