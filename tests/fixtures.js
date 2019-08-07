const _epub = {
  title: 'test epub',
  title_file_as: 'test_epub',
  creators: [
    { id: 'creator0', name: 'author1', role: 'aut' },
  ],
  uniqueId: 'urn:uid:00000000-1111-2222-3333-444444444444',
  language: 'en',
  modified: '2019-01-01T00:00:00Z',
  direction: 'rtl',
};

module.exports = {
  epub() { return Object.assign({}, _epub) },
};
