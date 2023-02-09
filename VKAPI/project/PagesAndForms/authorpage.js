const BaseForm = require('../../framework/baseForm/baseForm');
const Label = require('../../framework/elements/label');
const Button = require('../../framework/elements/links');
const InputField = require('../../framework/elements/input');


class AuthorizationPage extends BaseForm {
    
    constructor() {
        super(new Label('//div[@class="vkc__PassportBox__box"]', 'Authorization page unique element'), 'Authorization page')
    }    

    get loginDataInput() {
        return new InputField('//input[@name="login"]', 'Login input field');
    }

    get passwordDataInput() {
        return new InputField('//input[@name="password"]', 'Password input field');
    }

    get submitButton() {
        return new Button('//button[@type="submit"]', 'Submit button');
    }

    async sendLoginData(login) {
        return this.loginDataInput.sendData(login); 
    }

    async sendPasswordData(password) {
        return this.passwordDataInput.sendData(password); 
    }

    async clickSubmitButton() {
        return this.submitButton.click();
    }
}

module.exports = new AuthorizationPage();