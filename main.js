function FormValidate(form) {
    const _errorWrapperClass = 'error';
    const _errorItemClass = 'error__item';
    const _parentItemClass = 'form-control';
    const _elements = form.elements;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        this.checkFormElement();
    })

    this.checkFormElement = function () {
        for (let i = 0; i < _elements.length; i++) {
            const element = _elements[i];
            this.clearFormError(element);
            const passwordMessage = element.dataset.password;
            if (passwordMessage) {
                this.validPassword(passwordMessage);
            }
            const emailMessage = element.dataset.email;
            if (emailMessage) {
                this.validEmail(element, emailMessage);
            }
            const requiredMessage = element.dataset.req;
            if (requiredMessage) {
                this.required(element, requiredMessage);
            }
            const minLength = element.dataset.min_length;
            const minLengthMessage = element.dataset.min_message;
            if (minLengthMessage) {
                this.minLength(element, minLengthMessage.replace("N", minLength));
            }
        }
    }

    this.clearFormError = function (item) {
        const parent = item.closest(`.${_parentItemClass}`);
        const checkParent = parent !== null && parent.classList.contains(_errorWrapperClass) === true;
        if (checkParent) {
            parent.classList.remove(_errorWrapperClass);
            parent.querySelector(`.${_errorItemClass}`).remove();
        }
    }

    this.validPassword = function (message) {
        const allPasswordElement = form.querySelectorAll("input[type='password']");
        const valueArr = Array.from(allPasswordElement).map(element => element.value);

        if (valueArr[0] !== valueArr[1]) {
            allPasswordElement.forEach(item => this.errorTemplate(item, message))
        }
    }

    this.validEmail = function (item, message) {
        const emailElement = form.querySelector("input[name='email']");
        const emailElValue = emailElement.value.toLowerCase();
        const emailRegExp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!emailElValue.match(emailRegExp)) {
            this.errorTemplate(item, message);
        }
    }

    this.required = function (item, message) {
        const invalidString = item.value.length === 0;
        const invalidCheckBox = item.type === "checkbox" && item.checked === false;
        if (invalidString || invalidCheckBox) {
            this.errorTemplate(item, message);
        }
    }

    this.minLength = function (item, message) {
        const validLength = item.value.length >= item.dataset.min_length;
        if (!validLength) {
            this.errorTemplate(item, message);
        }

    }

    this.errorTemplate = function (element, message) {
        const parent = element.closest(`.${_parentItemClass}`);
        if (!parent.classList.contains(_errorWrapperClass)) {
            parent.classList.add(_errorWrapperClass);
            parent.insertAdjacentHTML('beforeend', `<small class="${_errorItemClass}">${message}</small>`)
        }
    }
}

const form = new FormValidate(document.querySelector('#form'));
