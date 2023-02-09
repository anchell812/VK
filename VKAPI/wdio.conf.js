const filesUtil = require('./utils/fileUtils');
const configData = require('../VKAPI/configData/config.json');
const logger = require('./logger/log');


exports.config = {

    specs: [
        './specs/*.js'
    ],

    maxInstances: 10,

    // Test Configurations

    logLevel: 'error',

    logLevels: {
        webdriver: 'error',
    },

    bail: 0,

    baseUrl: 'https://vk.com/',

    waitforTimeout: 10000,

    connectionRetryTimeout: 120000,

    connectionRetryCount: 3,

    // Test runner services

    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },


    // Hooks

    before: async () => {
        browser.addCommand('open', async function (url) {
            logger.info(`Opening ${url}`);
            return this.url(url);
        });
    },

    beforeTest: async () => {
        await browser.maximizeWindow();
    },

    afterTest: async () => { await filesUtil.deleteFile(configData.downloadDir) },

}
