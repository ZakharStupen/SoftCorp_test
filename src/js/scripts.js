import svg4everybody from 'svg4everybody';
import scrollLock from 'scroll-lock';
import 'focus-visible';

import Header from './components/header';

svg4everybody();

class App {
  header = null
  mobileBreakpoint = 767.99 / 16
  scroll = {
    disable: scrollLock.disablePageScroll,
    enable: scrollLock.enablePageScroll,
  }

  constructor() {
    this.header = new Header('.js-header');

    // how to init modules:
    // this.initModule(testJSConnect, '.js-test-js-connect');
    // this.initModule(testServerRequest, '.js-test-api');

  }

  initModule(Module, selector) {
    if (selector) {
      const blocks = Array.prototype.slice.call(document.querySelectorAll(selector));
      blocks.forEach((block) => {
        new Module(block);
      });
    } else {
      new Module();
    }
  }

  mobileQuery = () =>  window.matchMedia(`(max-width: ${this.mobileBreakpoint}rem)`).matches

  setInert(...args) {
    args.forEach((item) => {
      item.setAttribute('inert', true);
    });
  }

  removeInert(...args) {
    args.forEach((item) => {
      item.removeAttribute('inert');
    });
  }


}


window.addEventListener('DOMContentLoaded', () => {

  window.app = new App;

});
