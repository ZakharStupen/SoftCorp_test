export default class Form {
    constructor(container) {
        this.container = container;
        this.form =  this.container.querySelector('form');
        console.log(this.form, 'this.form')
        if (this.form) {
            this.fileFields = Array.prototype.slice.call(this.form.querySelectorAll('[data-file]')).map(field => {
                return {
                    wrap: field,
                    fileInput: field.querySelector('input'),
                    buttonReset: field.querySelector('[data-button-reset]'),
                    fileText: field.querySelector('[data-text-file]'),
                }
            })
            this.rangeFields = Array.prototype.slice.call(this.form.querySelectorAll('[data-range]')).map(field => {
                return {
                    wrap: field,
                    inputRange: field.querySelector('input'),
                    inputRangeValue: field.querySelector('[data-range-value]')

                }
            })
            this.selectField = this.form.querySelector('[data-select]')
            this.choices = new Choices(this.selectField, {
                searchEnabled: false,
                itemSelectText: "",
                shouldSort: false,
            })


            this.initUploadField()
            this.initRangeFile()
        }
    }
    clearFileField(field) {
        field.fileText.innerHTML = 'Прикрепить файл';
        field.fileInput.hidden = 0;
        field.wrap.classList.remove('is-download');
        field.fileInput.value = "";
    }
    initUploadField() {
        this.fileFields.forEach(field => {
            field.fileInput.addEventListener('change', () => {
                console.log(field.wrap, 'field')
                field.fileText.innerHTML = field.fileInput.files[0].name;
                field.fileInput.hidden = 1;
                setTimeout(() => {
                    field.wrap.classList.add('is-download');
                    field.wrap.classList.remove('is-loading');
                }, 1500)
                field.wrap.classList.add('is-loading');
            });

            field.buttonReset.addEventListener('click', (event) => {
                event.preventDefault();
                this.clearFileField(field);
            });
        })
    }
    initRangeFile() {
        this.rangeFields.forEach(field => {
            field.inputRange.addEventListener('input', () => {
                field.inputRangeValue.textContent = field.inputRange.value + ` %`;
            })
        })
    }
    /*clearField() {
        this.fileFields.forEach(field => {
            this.clearFileField(field);
        })
    }*/
}



