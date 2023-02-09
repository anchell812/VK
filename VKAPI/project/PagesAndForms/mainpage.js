const BaseForm = require('../../framework/baseForm/baseForm');
const Label = require('../../framework/elements/label');
const Button = require('../../framework/elements/button');


class MainPage extends BaseForm {
  
    constructor() {
        super(new Label("//div[@class='VkIdForm__header']", "Main Page unique element"), "Main Page")
    }  

    get signinButton () {
        return new Button('//button[contains(@class, "FlatButton--primary")]//span[@class="FlatButton__in"]//span[@class="FlatButton__content"]', 'Sign in button');
    }

    async goToAuthorizationPage () {
        await this.signinButton.click();
    }
 }

 module.exports = new MainPage();
