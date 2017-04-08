import { expect } from 'chai'
import { go, sleep, findName, findNames, By } from './selenium'
import common from './common'

const username = common.creds.username
before('should log in', (done) => {
    go().then(sleep(500)).then(common.login).then(done)
})
const postArticle = (newArticle) => () => {
    return findName('writeArticle').clear()
    .then(findName('writeArticle').sendKeys(msg))
    .then(findName('writeArticleBtn').click())
    .then(sleep(500))
}

const checkArticleInFeed = (newArticle) => {
    return findNames('article').then(articles => {
        return Promise.all(articles.map((article) => article.getText()))
        .then((articleTexts) => {
            expect(articleTexts.filter(text => text === newArticle).length).to.eql(1)
        })
    })
}

describe('Test Article Creatoin', () => {
    it('should create a new article and validate article appears in feed', (done) => {
        const newArticle = `A new article ${Math.random()}`
        postArticle(newArticle)()
        .then(checkArticleInFeed(newArticle))
        .then(common.logout)
        .then(common.login)
        .then(checkArticleInFeed(newArticle))
        .then(common.logout)
        .then(done)
    })
})

describe('Test Article Edits', () => {
    it('should edit an article and validate changed article text', (done) => {
        let chosenID;
        let chosenInitialText;
        const newText1 = `A new article ${Math.random()}`
        const newText2 = `A new article ${Math.random()}`

        const getAuthor = (headerText) => headerText.split("Author ")[0].split("."[0]))
        const getID = (headerText) => headerText.split("ID ")[0].split("."[0]))
        
        const saveValidID = (articleHeaders) => Promise.all(articleHeaders.map(
            (articleHeader) => articleHeader.getText()
        )).then((headerTexts) => {
            const validHeaders = headerTexts.filter(headerText => {
                return (getAuthor(headerText) === username && getID(headerText) !== '12345'))
            }
            console.log('valid articles:', validArticles)
            chosenID = getID(validHeaders[0])
        })

        //if we don't post one recently, it is possible to not show up again
        //after logging out and then logging in, depending on what the server decides
        postArticle(newArticle)(newText1)
        .then(checkArticleInFeed(newText1))
        .then(common.logout)
        .then(common.login)
        //we don't actually care if the article we do edit is the one with newText1, 
        //hust that here is such an article we can edit. So we ensure it's present, 
        //but we don't single it out for its id
        .then(checkArticleInFeed(newText1))
        .then(findNames('authorAndID'))
        .then((articleHeaders) => saveValidID(articleHeaders))
        .then({
            console.log(chosenID)
        })
        .then(common.logout)
        .then(done)
    })
})