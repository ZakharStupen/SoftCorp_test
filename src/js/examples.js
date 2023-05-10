import testServerRequest from './examples/test-server-request.js';
import testJSConnect from './examples/test-js-connect.js';

function examplesInit() {
  app.initModule(testServerRequest, '.js-test-api');
  app.initModule(testJSConnect, '.js-test-js-connect');
}

window.addEventListener('DOMContentLoaded', examplesInit);
