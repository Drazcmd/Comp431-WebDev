import { expect } from 'chai'
import { go, sleep, findId, findName, findCSS, By } from './selenium'
import common from './common'

describe('Test Dummy Server Example Page', () => {

    const username = common.creds.username
    before('should log in', (done) => {
        go().then(sleep(500)).then(common.login).then(done)
    })

    it('should log in as the test user', (done) => {
        sleep(500)
            .then(findName('headline').getText()
                .then(text => {
                    //looks like the following:
                    //'cmd11test, your current status is:...'
                    expect(text.indexOf(username)).to.equal(0)
                })
                .then(done))
    })

    it("Update the headline and verify the change", (done) => {
        const initialHeadline = 'Test Account'
        const newHeadline = `A new status message ${Math.random()}`

        const getMessage = (msg) => 
            `${common.creds.username}, your current status is: '${msg}'`

        const updateHeadline = (msg) => () => 
            findName('newHeadline').sendKeys(msg)
            .then(findName('headlineBtn').click())
            .then(common.logout)
            //to ensure there aren't multiple of the same names/ids 
            .then(go())
            .then(sleep(500))
            .then(common.login)
            .then(sleep(500))
            .then(findName('newHeadline').clear())
            .then(findName('headline').getText().then(text => {
                expect(text).to.equal(getMessage(msg))
            }))

        updateHeadline(newHeadline)()
        .then(sleep(500))
        .then(updateHeadline(initialHeadline))
        .then(done)
    })

    after('should log out', (done) => {
        common.logout().then(done)
    })
})
