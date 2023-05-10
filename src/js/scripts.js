"use strict";
import svg4everybody from 'svg4everybody';
import scrollLock from 'scroll-lock';

import Header from './components/header'
import testServerRequest from './components/test-server-request.js'
import Validation from './components/validation.js'
import loadMore from './components/load-more.js'

svg4everybody();

window.app = {
  header: null,
  scroll: {
    disable: scrollLock.disablePageScroll,
    enable: scrollLock.enablePageScroll
  },
  setInert(...args) {
    args.forEach(item => {
      item.setAttribute('inert', true);
    })
  },
  removeInert(...args) {
    args.forEach(item => {
      item.removeAttribute('inert');
    })
  },

  initModule(Module, selector) {
    if (!!selector) {
      let blocks = Array.prototype.slice.call(document.querySelectorAll(selector));
      blocks.forEach(block => {
        new Module(block);
      });
    } else {
      new Module();
    }
  },

  init () {
    window.app.header = new Header('.js-header');

    window.app.initModule(Validation, '.js-validate');

    window.app.initModule(loadMore, '.js-load-more');

    app.initModule(testServerRequest, '.js-test-api');
  }

};


window.addEventListener('DOMContentLoaded', app.init);