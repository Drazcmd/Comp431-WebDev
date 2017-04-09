import { expect } from 'chai'
import { go, sleep, findName, findNames, By } from './selenium'
import common from './common'

const username = common.creds.username
const postArticle = (newArticle) => () => {
    return findName('writeArticle').clear()
    .then(findName('writeArticle').sendKeys(newArticle))
    .then(findName('writeArticleBtn').click())
    .then(sleep(500))
}

const check0thArticle = (newArticle) => {
    return findNames('article').then(articles => {
        const savedArticles = articles
        return Promise.all(savedArticles.map((article) => article.getText()))
        .then((articleTexts) => {
            //ensure the 0th article is the one we want...
            expect(articleTexts[0]).to.eql(newArticle)
            //and ensure there re no other such articles in the feed
            expect(articleTexts.filter(text => text === newArticle).length).to.eql(1)
            return savedArticles[0]
        })
    })
}

before('should log in', (done) => {
    go().then(sleep(500)).then(common.login).then(done)
})

describe('Test Articles', () => {
    it('should create a new article and validate article appears in feed', (done) => {
        const newArticle = `A new article ${Math.random()}`
        postArticle(newArticle)()
        .then(check0thArticle(newArticle))
        .then(common.logout)
        .then(common.login)
        .then(check0thArticle(newArticle))
        .then(done)
    })
    
    it('should edit an article and validate changed article text', (done) => {
        const newText1 = `A new article ${Math.random()}`
        const newText2 = `A new article ${Math.random()}`

        const getID = (headerText) => headerText.split("ID: ")[1].split(".")[0]
        const getAuthor = (headerText) => headerText.split("Author: ")[1].split(".")[0]

        //only will work if we've recently posted the one we want (so it's the 0 index
        //among stuff we've posted)
        const getWantedID = () => findNames('authorAndID').then(articleHeaders => {
            return Promise.all(articleHeaders.map(
                (articleHeader) => articleHeader.getText()
            )).then((headerTexts) => {
                const validHeaders = headerTexts.filter(headerText => {
                    //filtered since someone else might've posted in the meantime, and 
                    //we don't accidentally want the weird one we don't actually own 
                    return getAuthor(headerText) === username && getID(headerText) !== '12345'
                })
                return getID(validHeaders[0])
            })
        })

        //makes life way easier since we can just look at the 0th result from the
        //findNames, so long as we only allow ones from ourselves as the author 
        postArticle(newText1)()
        .then(sleep(500))
        .then(check0thArticle(newText1))
        .then(sleep(500))
        .then(common.logout)
        .then(common.login)
        .then(sleep(500))
        .then(findName('authorAndID'))
        .then(check0thArticle(newText1))
        .then(findName('article').clear())
        .then(findName('article').sendKeys(newText2))
        .then(sleep(500))
        .then(getWantedID().then(foundID => {
            findName(`editArticleBtn${foundID}`).click()
        }))
        .then(common.logout)
        .then(common.login)
        .then(check0thArticle(newText2))
        .then(done)
    })
})    
it('should find the special article ("Only one article like this")', (done) => {
    const specialText = 'Only One Article Like This -- This test article has been prepared for you. Be sure to validate the author of this article in your test suite'

    findNames('article').then(articles => {
        return Promise.all(savedArticles.map((article) => article.getText()))
        .then(articleTexts => {
            console.log('article texts', articleTexts)
            //one of the articles should have the special text we want, and its ID should be 12345
            expect(articleTexts.some(text => text === specialText)).to.be.true
            //and ensure there re no other such articles in the feed
            expect(articleTexts.filter(text => text === specialText).length).to.eql(1)
        })
    })
    .then(() => findNames('authorAndID'))
    .then(articleHeaders => {
        console.log('headers:', articleHeader)
        //and now ensure there's only one article with id 12345 written by the user
        //that'll be the article we found
        return Promise.all(articleHeaders.map(
            (articleHeader) => articleHeader.getText()
        )).then((headerTexts) => {
            console.log(headerTexts)
            const validHeaders = headerTexts.filter(headerText => {
                //filtered since someone else might've posted in the meantime, and 
                //we don't accidentally want the weird one we don't actually own 
                return getAuthor(headerText) === username && getID(headerText) === '12345'
            })
            expect(validHeaders.length).to.eql(1)
        })
    })
    .then(done)
})
after('should log out', (done) => {
    common.logout().then(done)
})
