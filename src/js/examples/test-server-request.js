export default class testApi {
  constructor(container) {
    this.container = container;

    this.triggerBtn = this.container.querySelector('[data-test-api]');
    this.requestResult = this.container.querySelector('[data-test-result]');
    this.requestUrl = this.triggerBtn.dataset.testApi;

    this.triggerBtn.addEventListener('click', () => {
      this.requestResponse();
    });
  }

  requestResponse() {
    fetch(this.requestUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          this.requestResult.innerHTML = data.title + data.message;
        }
      });
  }
}
