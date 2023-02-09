const formData = require('form-data');
const fs = require('fs');
const logger = require('../../logger/log');
const baseAPIUtil = require('../../framework/baseAPIrequests/BaseAPIutil');
const config = require('../../configData/config.json');
const data = require('../../testData/data.json');


class VkApiUtils {

    static async getFullUrlForRequest(method, requestData) {
        return (config.baseUrlForApi + method + requestData);
    }

    static async createWallPost(messageText) {
        logger.info('Sending post request with random message');
        const postData = `owner_id=${data.id}&access_token=${data.accessToken}&message=${messageText}&v=${config.v}`;
        const url = await this.getFullUrlForRequest(config.wallPost, postData);
        const sendpost = await baseAPIUtil.sendPostRequest(url);
        return sendpost.data.response.post_id;
        }

    static async getUploadServerAddressAlbum() {
        logger.info('Getting upload server data');
        const requestData = `owner_id=${data.id}&access_token=${data.accessToken}&v=${config.v}&album_id=${data.albumId}`;
        const url = await this.getFullUrlForRequest(config.getUploadServerAlbum, requestData);
        const serverAddress = await baseAPIUtil.getRequest(url);
        return serverAddress.data.response.upload_url;
    }

    static async getUploadServerAddressWall() {
        logger.info('Getting upload server data');
        const requestData = `owner_id=${data.id}&access_token=${data.accessToken}&v=${config.v}`;
        const url = await this.getFullUrlForRequest(config.getUploadServerWall, requestData);
        const serverAddress = await baseAPIUtil.getRequest(url);
        logger.info(serverAddress.data.response.upload_url);
        return serverAddress.data.response.upload_url;
    }

    static async uploadPhotoToServer(upUrl, pathToPhoto) {
        logger.info('Uploading photo');
        let form = new formData();
        let myPhoto = pathToPhoto;
        form.append('photo', fs.createReadStream(myPhoto));
        let response = await baseAPIUtil.sendServerRequest(upUrl, form);
        return response.data;
    }

    static async uploadPhotoToWall(pathToPhoto) {
        const getServerAddress = await this.getUploadServerAddressWall();
        const uploadToServer = await this.uploadPhotoToServer(getServerAddress, pathToPhoto);
        return uploadToServer;
    }

    static async saveWallPhoto(object) { 
        logger.info('Saving wall photo');
        const requestData = `user_id=${data.id}&access_token=${data.accessToken}&v=${config.v}&server=${object.server}&photo=${object.photo}&hash=${object.hash}`;
        const url = await this.getFullUrlForRequest(config.saveWallPhoto, requestData);
        const saveWallPhoto = await baseAPIUtil.getRequest(url);
        logger.info(saveWallPhoto.data.response[0].id);
        return saveWallPhoto.data.response[0].id;
    }

    static async editWallPost(messageText, postId, photoId) {
        logger.info('Editing post request');
        const postData = `owner_id=${data.id}&post_id=${postId}&access_token=${data.accessToken}&message=${messageText}&v=${config.v}&attachments=photo${data.id}_${photoId}`;
        const url = await this.getFullUrlForRequest(config.editWallPost, postData);
        const editpost = await baseAPIUtil.sendPostRequest(url);
        return editpost.data;
        }

    static async addCommentToWallPost(messageText, postId) {
        logger.info('Add comment to wall`s post');
        const postData = `owner_id=${data.id}&post_id=${postId}&access_token=${data.accessToken}&message=${messageText}&v=${config.v}`;
        const url = await this.getFullUrlForRequest(config.addComment, postData);
        const addComment = await baseAPIUtil.sendPostRequest(url);
        logger.info(await addComment.data.response);
        return addComment.data;
    }

    static async getLikes(postId) {
        logger.info('Getting likes of wall`s post');
        const requestData = `owner_id=${data.id}&post_id=${postId}&access_token=${data.accessToken}&v=${config.v}`;
        const url = await this.getFullUrlForRequest(config.getLikes, requestData);
        const getLikes = await baseAPIUtil.getRequest(url);
        return getLikes.data.response.users[0].uid;
    }

    static async deletePost(postId) {
        logger.info('Deleting wall post');
        const postData = `owner_id=${data.id}&post_id=${postId}&access_token=${data.accessToken}&v=${config.v}`;
        const url = await this.getFullUrlForRequest(config.deletePost, postData);
        const deletePost = await baseAPIUtil.getRequest(url);
        logger.info(deletePost.data);
        return deletePost;
    }

}
module.exports = VkApiUtils;