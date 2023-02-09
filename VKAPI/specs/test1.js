const {assert} = require('chai');
const mainPage = require('../project/PagesAndForms/mainpage');
const config = require('../configData/config.json');
const authorizationPage = require('../project/PagesAndForms/authorpage');
const userPage = require('../project/PagesAndForms/userpage');
const vkApiUtils = require('../project/vkApiUtils/vkapiutils');
const data = require('../testData/data.json');
const filesUtils = require('../utils/fileUtils');
const leftform = require('../project/PagesAndForms/leftform');
const photosPage = require('../project/PagesAndForms/photospage');
const stringUtils = require('../utils/stringUtils');



describe('VK API testing', () => {
    it('Authorization and creating, editing, deleting wall posts and comment testing', async () => {
        await browser.open(config.url);
        assert.isTrue(await mainPage.isPageOpened(), 'Main page is opened');
        await mainPage.goToAuthorizationPage();
        assert.isTrue(await authorizationPage.isPageOpened(), 'Authorization page is opened');
        await authorizationPage.sendLoginData(data.login);
        await authorizationPage.clickSubmitButton();
        await authorizationPage.sendPasswordData(data.password);
        await authorizationPage.clickSubmitButton();
        assert.isTrue(await userPage.isPageOpenedafterWait(), 'User page is opened');
        const randomTextMessage = await stringUtils.createMessage(data.lengthOfMessage);
        const postid = await vkApiUtils.createWallPost(randomTextMessage);
        await userPage.clickNewPostsButton();
        assert.equal(randomTextMessage, await userPage.newestWallPostText(), 'Message is correct');
        assert.equal(await userPage.getHrefOfNewPostAuthor(), `/id${data.id}`, 'New post`s author is correct');
        const newRandomTextMessage = await stringUtils.createMessage(data.lengthOfMessage);
        const uploadPhoto = await vkApiUtils.uploadPhotoToWall(data.pathToUploadingFile);
        const photOID = await vkApiUtils.saveWallPhoto(uploadPhoto);
        await vkApiUtils.editWallPost(newRandomTextMessage, postid, photOID);
        await leftform.clickAllPhotos();
        await photosPage.clickallWallPhotoAlbum();
        await photosPage.clickfirstWallPhoto();
        await photosPage.clickMoreButton();
        const urlForDownloadImage = await photosPage.getLinkForDownload();
        const downloadedFile = filesUtils.getFileDestination(config.downloadDir, data.fileName, `.${data.extention}`);
        await filesUtils.downloadFile(urlForDownloadImage);
        await filesUtils.checkFileExists(downloadedFile);
        const comparingImages = await filesUtils.compareImages(downloadedFile, data.pathToUploadingFile);
        assert.isTrue(comparingImages, 'Images should be the same');
        // await photosPage.clickClosePhotoButton();
        // await leftform.clickNewsButton();
        // const editedText = await userPage.refreshNewestPost(randomTextMessage);
        // assert.equal(newRandomTextMessage, editedText, 'Message is edited');
        // const randomComment = await stringUtils.createMessage(data.lengthOfMessage); 
        // await vkApiUtils.addCommentToWallPost(randomComment, postid);
        // await userPage.clickShowCommentButton();
        // assert.equal(await userPage.getHrefOfcommentAuthor(), `/id${data.id}`, 'Comment`s author is correct')
        // await userPage.clickLikeButton();
        // const idUserLike = await vkApiUtils.getLikes(postid);
        // assert.equal(idUserLike, data.id, 'Wall post is liked by correct user');
        // await vkApiUtils.deletePost(postid);
        // const newestWallPostAfterDeleting = await userPage.getPostTextAfterDeleting();
        // assert.equal(newestWallPostAfterDeleting, newRandomTextMessage, 'Post is deleted');
    })
});
