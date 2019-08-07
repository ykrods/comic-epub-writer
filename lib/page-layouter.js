const L=0, R=1, C=2;

const props = {};
props[L] = 'rendition:page-spread-left';
props[R] = 'rendition:page-spread-right';
props[C] = 'rendition:page-spread-center';


class PageLayouter {
  constructor (direction) {
    this.direction = direction;// rtl or ltr
    this.cur = undefined;
  }
  getNext(spread) {
    if (spread) {
      return C;
    }
    if (this.cur === L) {
      return R;
    }
    if (this.cur === R) {
      return L;
    }
    // first page
    if (this.cur === undefined) {
      return (this.direction === 'rtl') ? L : R ;
    }
    // next of center
    if (this.cur === C) {
      return (this.direction === 'rtl') ? R : L ;
    }
    throw new Error("Can't determine page layout");
  }

  next (spread=false) {
    this.cur = this.getNext(spread);
    return props[this.cur];
  }
}

module.exports = PageLayouter;
