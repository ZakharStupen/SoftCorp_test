export default class Validation {
    constructor(container) {
        this.container = container;
        this.form =  this.container.querySelector('form');
        this.resultInput = this.container.querySelector('[data-results-input]');
        this.cancel = this.container.querySelector('[data-button-cancel]')


        this.validationRules = {
            required: {
                test: (val) => {
                    return val.entry.value.length >= 0
                },
                error: (field) => `please fill in this field`,
            },
            email: {
                test: (val) => {
                    let regex = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;

                    return regex.test(val.entry.value) || val.entry.value.length === 0
                },
                error: (field) => 'Please enter a valid email'
            },
            phone: {
                test: (val) => {
                    let regex = /^([+]?[0-9\s-\(\)]{3,25})*$/i;

                    return regex.test(val.entry.value) || val.entry.value.length === 0
                },
                error: (field) => 'Please enter a valid phone number'
            },
            address: {
                test: (val) => {
                    return val.entry.value.length > 5
                },
                error: (field) => 'Please enter a valid address'
            },
            name: {
                test: (val) => {
                /*    let regex = /^[a-z ,.'-]{2,20}$/i; regex.test(val.entry.value) ||*/
                   /* return  val.entry.value.length > 5*/
                    return val.entry.value.length > 2 && val.entry.value.length < 20
                },
                error: (field) => `Please enter a valid ${field}`,
            },


            message: {
                test: (val) => {
                    return val.entry.value.length > 5
                },
                error: (field) => `Please enter a valid message`,
            },
            checkif: {
                test: (val) => {
                    return val.entry.checked === true
                },
                error: (field) => `Please checked field`

            },
            suitable: {
                test: (val) => {
                    let suitableElem = this.fileFields.filter(elem  => elem.name === val.entry.name &&  elem.entry.checked === true)
                    return suitableElem.length > 3
                },

                error: (field) => `Please checked more options`
            },
            select: {
                test: (val) => {
                    return val.entry.selectedIndex  > 0
                },
                error: (field) => `Please checked more options`
            },
        };


        this.fileFields = Array.prototype.slice.call(container.querySelectorAll('[data-validate]')).map(field => {
            let wrapper = field.closest('[data-field]');
            return {
                wrap: wrapper,
                entry: field,
                name: field.name,
                value: field.value,
                type: field.type,
                checked: field.checked,
                message: wrapper.querySelector('[data-validate-mess]'),
                rules: field.hasAttribute('data-validate') ? field.dataset.validate.split('|') : [],
                validateName: field.hasAttribute('data-validate-as') ? field.dataset.validateAs : field.name,
                isValid: null

            };
        });





        this.fileFields.forEach((item) => {
            if (item.rules.length) {
                item.entry.addEventListener('blur', () => {
                    this.validateField(item);
                });
                item.entry.addEventListener('input', () => {
                    this.validateField(item);
                });
            }
        });






        this.form.addEventListener('submit', (event) => {
                event.preventDefault();
            if (this.validateForm()) {
                this.scrollToElement();
                this.formResult();
            }
        });

        this.cancel.addEventListener('click', () => {
          this.fileFields.forEach((field) => {
              field.message.innerHTML = '';
              field.wrap.classList.remove('is-invalid');
          })
        })

    }



    validateForm() {
        let formIsValid = true;
        this.fileFields.forEach(field => {
            formIsValid = this.validateField(field) ? formIsValid : false;
        });

        return formIsValid;
    }

    validateField(field) {
        field.isValid = true;
        field.rules.forEach(rule => {
            if (this.validationRules.hasOwnProperty(rule) && !this.validationRules[rule].test(field) ) {
                field.isValid = false;
                this.showError(field, this.validationRules[rule].error(field.validateName));
            }
        });

        if (field.isValid) {
            this.hideError(field);
        }
        return field.isValid;
    }


    formResult() {
        let valueList = []
        this.fileFields.forEach(item => {
            if (item.type === 'radio' || item.type === 'checkbox') {
                if (item.entry.checked === true) {
                    let checkedElement = valueList.find(i => {
                        return i.name === item.name
                    })

                    if (typeof checkedElement === "undefined") {
                        valueList.push({
                            name: item.name,
                            value: item.entry.value,
                            type: item.type,
                        })

                    } else {
                        checkedElement.value += item.entry.value;
                    }

                }

            } else if (item.entry.value !== "") {
                valueList.push({
                    name: item.name,
                    value: item.entry.value,
                })
            }


        });

        let messageMail = 'mail';

        let findMail = valueList.find(item => {
            return item.name === messageMail
        });

        if (typeof findMail === "undefined") {
            valueList.push({
                name: "",
                value: 'Do not add to maling list',
            })
        } else {
            findMail.value = 'Add to maling list';
        }

        const idToRemove = 'privacy';

        const delPrivacy = valueList.filter((item) => item.name !== idToRemove);

        delPrivacy.forEach(item => {
            if( item.name.length > 0) {
                this.resultInput.innerHTML += `<li><strong>${item.name}</strong>` + ': ' + `${item.value}</li>`;
            }
            else {
                this.resultInput.innerHTML += `<li>${item.value}</li>`;
            }

        })
    }



    scrollToElement() {
        if (this.container.classList.toggle('is-sent-success')) {
            this.container.scrollIntoView({
                block: "center"
            });
        }

    }

    showError(field, message) {
        field.message.innerHTML = message;
        field.wrap.classList.add('is-invalid');
    }

    hideError(field) {
        field.message.innerHTML = '';
        field.wrap.classList.remove('is-invalid');
    }
}



