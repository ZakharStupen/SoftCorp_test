export default class testJSConnect {
  constructor(container) {
    this.container = container;

    this.triggerBtn = this.container.querySelector('[data-test-api]');
    this.requestResult = this.container.querySelector('[data-test-result]');

    this.triggerBtn.addEventListener('click', () => {
      this.requestResponse();
    });
  }

  requestResponse() {
    // eslint-disable-next-line
    import('./test-dynamic-import')
      .then((foo) => foo.default)
      .then((module) => {
        this.requestResult.innerHTML = 'Modules Loaded';

        new module();
      })
      .catch((error) => {
        console.log(error);
        this.requestResult.innerHTML =
          'There is an error to load files. See details in the console.';
      });
  }
}
