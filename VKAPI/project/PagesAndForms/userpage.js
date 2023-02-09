const BaseForm = require('../../framework/baseForm/baseForm');
const InputField = require('../../framework/elements/input');
const Label = require('../../framework/elements/label');
const Button = require('../../framework/elements/links');
const data = require('../../testData/data.json');


class UserPage extends BaseForm {
    
    constructor() {
        super(new Label('//a[@id="ui_rmenu_news"]', 'User page unique element'), 'User page')
    }    

    get newestWallPost() {
        return new Label('//div[contains(@class, "wall_post_text")]', 'Newest wall post');
    }

    get wallPostAfterEditing() {
        return new Label('//div[@class="wall_post_text"]', 'Wall post after editing')
    }

    get showNewPostsButton() {
        return new Button('//div[@id="feed_new_posts"]', 'Show new posts button');
    }

    get authorOfNewestPost() {
        return new Label('(//a[@class="author"])[1]', 'Author of newest post');
    }

    get showCommentButton() {
        return new Button('//div[contains(@class, "reply_wrap")]/a[contains(@class,"reply_image")]', 'Show comment button');
    }

    get authorOfcomment() {
        return new Label('//div[@class="reply_author"]//a[@class="author"]', 'Author of wall`s post comment');
    }

    get likeButton() {
        return new Button('//div[contains(@class, "PostBottomAction") and @role="button"]', 'Like button');
    }

    get inputWriteComment() {
        return new InputField('//div[contains(@class, "reply_field") and contains(@class, "submit_post_field")]', 'Leave comment input')
    }

    get newestImageOnWall() {
        return new Label('//img[@class="PagePostLimitedThumb"]/..', 'Newest image on the wall');
    
    }

    async clickNewestImageOnWall() {
        return this.newestImageOnWall.waitAndClick();
    }

    async getNewestPostText(text){
        return new Label(`//div[text()="${text}"]`, 'Newest post text')
    }

    async clickLikeButton() {
        return this.likeButton.waitAndClick();
    }

    async getHrefOfcommentAuthor() {
        return this.authorOfcomment.getAttribut('href');
    }

    async clickShowCommentButton() {
        await this.showCommentButton.scrollToElement()
        return this.showCommentButton.waitAndClick();
    }

    async getHrefOfNewPostAuthor() {
        return this.authorOfNewestPost.getAttribut('href');
    }

    async clickNewPostsButton() {
        return this.showNewPostsButton.waitAndClick();
    }

    async newestWallPostText() {
        return this.newestWallPost.getElementText();
    }

    async refreshNewestPost(firstText) {
        const element = await this.getNewestPostText(firstText);
        await element.waitForAbsent();
        return this.wallPostAfterEditing.getElementText();
    }

    async getPostTextAfterDeleting() {
        return this.wallPostAfterEditing.getElementText();
    }
}

module.exports = new UserPage();