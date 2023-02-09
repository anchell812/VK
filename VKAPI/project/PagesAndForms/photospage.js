const BaseForm = require('../../framework/baseForm/baseForm');
const Label = require('../../framework/elements/label');
const Button = require('../../framework/elements/button');
const Link = require('../../framework/elements/links');


class PhotosPage extends BaseForm {

    constructor() {
        super(new Label('//span[@class="photos_comments_link"]', 'Photo page unique element'), 'Photos page')
    }

    get allWallPhotoAlbum() {
        return new Label('//div[@class="photos_album_thumb crisp_image"]', 'Wall photo album');
    }

    get firstWallPhoto() {
        return new Label('//div[contains(@class, "photos_row")]//a', 'First wall photo');
    }

    get moreButton() {
        return new Button('//a[@class="pv_actions_more"]', 'More button');
    }

    get hrefForDownload() {
        return new Link('//a[@id="pv_more_act_download"]', 'Link for download image');
    
    }

    get closePhotoButton() {
        return new Button('//div[@class="pv_close_btn"]', 'Close photo button');
    }

    async clickallWallPhotoAlbum() {
        return this.allWallPhotoAlbum.waitAndClick();
    }

    async clickfirstWallPhoto() {
        return this.firstWallPhoto.waitAndClick();
    }

    async clickMoreButton() {
        return this.moreButton.waitAndClick();
    }

    async getLinkForDownload() {
        return this.hrefForDownload.getAttribut('href');
    }

    async clickClosePhotoButton() {
        return this.closePhotoButton.waitAndClick();
    }
}

module.exports = new PhotosPage();