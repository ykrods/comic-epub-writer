const PageLayouter = require('../lib/page-layouter');

const makeOne = (direction) => {
  return new PageLayouter(direction);
};

describe('PageLayouter', () => {
  it('in case: given rtl', () => {
    const target = makeOne('rtl');
    expect(target.next()).toEqual('rendition:page-spread-left');
    expect(target.next()).toEqual('rendition:page-spread-right');
    expect(target.next()).toEqual('rendition:page-spread-left');
    expect(target.next(true)).toEqual('rendition:page-spread-center');
    expect(target.next()).toEqual('rendition:page-spread-right');
    expect(target.next()).toEqual('rendition:page-spread-left');
  });

  it('in case: given ltr', () => {
    const target = makeOne('ltr');
    expect(target.next()).toEqual('rendition:page-spread-right');
    expect(target.next()).toEqual('rendition:page-spread-left');
    expect(target.next()).toEqual('rendition:page-spread-right');
    expect(target.next(true)).toEqual('rendition:page-spread-center');
    expect(target.next()).toEqual('rendition:page-spread-left');
    expect(target.next()).toEqual('rendition:page-spread-right');
  });

});
