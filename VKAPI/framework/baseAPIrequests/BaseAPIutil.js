const axios = require('axios').default;
const logger = require('../../logger/log');


class BaseAPIUtil {

    async sendPostRequest(url) {
        logger.info('Send post request');
        return axios.post(url);
        }

    async sendServerRequest(url, data) {
        logger.info('Send post request');
        return axios.post(url, data);
    }     

    async getRequest(url) {
        logger.info('Send get request');
        return axios.get(url);
    }

    async deleteRequest(url) {
        logger.info('Delete request');
        return axios.delete(url);
    }
    
}

module.exports = new BaseAPIUtil();