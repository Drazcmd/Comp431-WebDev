import { expect } from 'chai'
import { go, sleep, findName, findNames, By } from './selenium'
import common from './common'

const username = common.creds.username
before('should log in', (done) => {
    go().then(sleep(500)).then(common.login).then(done)
})
const postArticle = (newArticle) => () => {
    return findName('writeArticle').clear()
    .then(findName('writeArticle').sendKeys(newArticle))
    .then(findName('writeArticleBtn').click())
    .then(sleep(500))
}

const check0thArticle = (newArticle) => {
    return findNames('article').then(articles => {
        const savedArticles = articles
        Promise.all(savedArticles.map((article) => article.getText()))
        .then((articleTexts) => {
            //ensure the 0th article is the one we want...
            expect(articleTexts[0]).to.eql(newArticle)
            //and ensure there re no other such articles in the feed
            expect(articleTexts.filter(text => text === newArticle).length).to.eql(1)
            return savedArticles[0]
        })
    })
}

describe('Test Article Creatoin', () => {
    it('should create a new article and validate article appears in feed', (done) => {
        const newArticle = `A new article ${Math.random()}`
        postArticle(newArticle)()
        .then(check0thArticle(newArticle))
        .then(common.logout)
        .then(common.login)
        .then(check0thArticle(newArticle))
        .then(common.logout)
        .then(done)
    })
})

describe('Test Article Edits', () => {
    it('should edit an article and validate changed article text', (done) => {
        let chosenID;
        const newText1 = `A new article ${Math.random()}`
        const newText2 = `A new article ${Math.random()}`

        const getAuthor = (headerText) => headerText.split("Author ")[0].split("."[0])
        const getID = (headerText) => headerText.split("ID ")[0].split("."[0])

        //only will work if we've recently posted the one we want (so it's the 0 index
        //among stuff we've posted)
        const saveWantedID = (articleHeaders) => Promise.all(articleHeaders.map(
            (articleHeader) => articleHeader.getText()
        )).then((headerTexts) => {
            console.log("hello!", headerTexts)
            const validHeaders = headerTexts.filter(headerText => {
                //filtered since someone else might've posted in the meantime, and 
                //we don't accidentally want the weird one we don't actually own 
                return (getAuthor(headerText) === username && getID(headerText) !== '12345')
            })
            console.log('valid headers:', validHeaders)
            chosenID = getID(validHeaders[0])
        })

        //makes life way easier since we can just look at the 0th result from the
        //findNames, so long as we only allow ones from ourselves as the author 
        common.login()
        .then(postArticle(newText1)())
        .then(check0thArticle(newText1))
        .then(common.logout)
        .then(common.login)
        .then(findNames('authorAndID'))
        .then((articleHeaders) => console.log('got these', articleHeaders))
        .then(findNames('authorAndID'))
        .then((articleHeaders) => saveWantedID(articleHeaders))
        .then(check0thArticle(newText1))
        .then((foundArticle) => {
            console.log(foundArticle.getText())
            foundArticle.clear()
            return foundArticle.sendKeys(newText2)
        }) 
        .then(console.log(chosenID))
        .then(sleep(5000))
        .then(findName(`editArticleBtn${chosenID}`).click())
        .then(common.logout)
        .then(common.login)
        .then(check0thArticle(newText2))
        .then((foundArticle) => {
            console.log(foundArticle.getText())
            foundArticle.clear()
            foundArticle.sendKeys(newText1)
        })
        .then(check0thArticle(newText1))
        .then(sleep(5000))
        .then(common.logout)
        .then(done)
    })
})