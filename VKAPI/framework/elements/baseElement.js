const times = require("../../configData/timeouts.json");
const logger = require("../../logger/log");

class BaseElement {

    constructor(locator, elName) {
        this.locator = locator;
        this.elName = elName;
    }

    async isElementPresent() {
        logger.info(`Checking presence of ${this.elName}`);
        const element = await $$(this.locator);
        return element.length > 0;
    }

    async getAttribut(name) {
        logger.info(`Getting attribute of ${this.elName}`);
        const element = await $(this.locator);
        return element.getAttribute(name);
    }

    async click() {
        logger.info(`Click on ${this.elName}`);
        const element = await $(this.locator);
        return element.click();
    }

    async waitAndClick() {
        logger.info(`Click on ${this.elName} after ${times.waits}`);
        const element = await $(this.locator);
        await element.waitForClickable(`${{timeout: times.waits}}`);
        return element.click();
    }

    async getElementText() {
        logger.info(`Getting text from ${this.elName}`);
        const element = await $(this.locator);
        return element.getText();
    }

    async waitForAbsent() {
        logger.info('Waiting for element absense');
        const element = await $(this.locator);
        await element.waitForExist({timeout:times.waits, interval:times.interval, reverse:true});
    }

    async waitForPresent() {
        logger.info('Waiting for element present');
        const element = await $(this.locator);
        await element.waitForExist({timeout:times.waits, interval:times.interval});
    }
    
    async getElementsText() {
        logger.info(`Getting text from multiple elements ${this.elName}`);
        const elements = await $$(this.locator);
        const textarray = [];
        for await (let element of elements) {
            textarray.push(await element.getText());
        }
        return textarray;
    }

    async scrollToElement() {
        logger.info(`Scrolling to ${this.elName}`);
        const element = await $(this.locator);
        return element.scrollIntoView();
    }
}

module.exports = BaseElement;