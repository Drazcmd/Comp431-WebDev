import { expect } from 'chai'
import { go, sleep, findId, findName, findCSS, By } from './selenium'
import common from './common'

const validMsg = "Most recent error: Your registration inputs were valid, but the server's" +
" registration feature isn't working yet"
const invalidMsg = 'Most recent error: First Name is invalid (you entered "").'
//unlike most other tests, no need to log in or log out
describe('Test Registration Feedback', () => {
    it('should display a message when trying to register a new user', (done) => {
        go().then(sleep(500))
            .then(findName("regFirstName").clear())
            .then(findName("regLastName").clear())
            .then(findName("regUsername").clear())
            .then(findName("regPassword").clear())
            .then(findName("regFirstName").sendKeys('bobby'))
            .then(findName("regLastName").sendKeys('bibby'))
            .then(findName("regUsername").sendKeys('babby'))
            .then(findName("regPassword").sendKeys('bebby'))
            .then(findName("regButton").click())
            .then(findName('message').getText()
                .then(text => {
                    expect(text).to.equal(validMsg)
                })
                .then(done))
    })
    it('should display an error message when not filling out all the registration fields', (done) => {
        //this time we leave out just username (to make it easier to test)
        go().then(sleep(500))
            .then(findName("regFirstName").clear())
            .then(findName("regLastName").clear())
            .then(findName("regUsername").clear())
            .then(findName("regPassword").clear())
            .then(findName("regLastName").sendKeys('bibby'))
            .then(findName("regUsername").sendKeys('babby'))
            .then(findName("regPassword").sendKeys('bebby'))
            .then(findName("regButton").click())
            .then(findName('message').getText()
                .then(text => {
                    expect(text).to.equal(invalidMsg)
                })
                .then(done)
            )
    })

})
