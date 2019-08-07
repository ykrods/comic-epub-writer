module.exports = `<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://www.idpf.org/2007/opf"
         xml:lang="{{ epub.language }}"
         unique-identifier="pub-id"
         version="3.0"
         prefix="rendition: http://www.idpf.org/vocab/rendition/#">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:title id="title">{{ epub.title }}</dc:title>
    <meta refines="#title" property="file-as">{{ epub.title_file_as }}</meta>
    {{#epub.creators}}
    <dc:creator id="{{ id }}">{{ name }}</dc:creator>
    {{/epub.creators}}
    {{#creatorsProperties}}
    <meta refines="#{{ creatorId }}" property="{{ key }}">{{ value }}</meta>
    {{/creatorsProperties}}
    <dc:identifier id="pub-id">{{ epub.uniqueId }}</dc:identifier>
    <dc:language>{{ epub.language }}</dc:language>
    <meta property="dcterms:modified">{{ epub.modified }}</meta>
    <meta property="rendition:layout">pre-paginated</meta>
    <meta property="rendition:orientation">{{ epub.renditionOrientation }}</meta>
    <meta property="rendition:spread">{{ epub.renditionSpread }}</meta>
  </metadata>
  <manifest>
    {{#resources}}
    <item id="{{ id }}" href="{{{ href }}}" media-type="{{{ mediaType }}}"{{#properties}} properties="{{ properties }}"{{/properties}}/>
    {{/resources}}
  </manifest>
  <spine page-progression-direction="{{ epub.direction }}">
    {{#spineItems}}
    <itemref idref="{{ idref }}"{{#propertiesStr}} properties="{{ propertiesStr }}"{{/propertiesStr}}/>
    {{/spineItems}}
  </spine>
</package>`;
