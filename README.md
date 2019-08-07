# comic-epub-writer

[WIP] A javascript library to create comic epub file.

# Installation

WIP

# Usage

```javascript
const fs = require('fs');

const writer = require('epub-comic-writer');

const epub = {
  title: 'title 01',
  title_file_as: 'title_01',
  author: 'Author',
  language: 'ja',
  cover: './images/cover.jpg',
  chapters: [
    {
      title: 'chapter01',
      pages: ['./images/p001.jpg'],
    },
  ],
  direction: 'rtl',
  pageWidth: 800,
  pageHeight: 1200,
  pageBgColor: '#FFFFFF',
};

writer.write(epub).then(content => {
  fs.writeFile('./tmp/hello.epub', content, (error) => {
    if (!error) {
      console.log("save");
    } else {
      console.log(error);
    }
  });
});
```

# TODO

- [ ] browser support
- [ ] documentation
