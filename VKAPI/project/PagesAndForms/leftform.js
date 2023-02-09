const BaseForm = require('../../framework/baseForm/baseForm');
const Label = require('../../framework/elements/label');
const Button = require('../../framework/elements/button');


class LeftForm extends BaseForm {

    constructor() {
        super(new Label('//div[@class="LeftMenu__icon"]', 'Left Form'), 'Left Form')
    }

    get allPhotosButton() {
        return new Button('//li[@id="l_ph"]//span[contains(@class, "left_label")]', 'All photos');
    }

    get newsButton() {
        return new Button('//li[@id="l_nwsf"]//a[@class="left_row"]//span[contains(@class, "left_label")]', 'News button');
    }

    async clickAllPhotos() {
        return this.allPhotosButton.waitAndClick();
    }

    async clickNewsButton() {
        return this.newsButton.waitAndClick();
    }
}

module.exports = new LeftForm();

