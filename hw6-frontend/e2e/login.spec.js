import { expect } from 'chai'
import { go, sleep, findId, findName, findCSS, By } from './selenium'
import common from './common'

before('should log in', (done) => {
    go().then(sleep(500)).then(common.login).then(done)
})
describe('Test Login', () => {
    const username = common.creds.username

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

        const getHeadline = (msg) => 
            `${common.creds.username}, your current status is: '${msg}'`

        const updateHeadline = (msg) => () => {
            return findName('newHeadline').clear()
            .then(findName('newHeadline').sendKeys(msg))
            .then(findName('headlineBtn').click())
            .then(common.logout)
            .then(common.login)
            .then(findName('headline').getText().then(text => {
                expect(text).to.equal(getHeadline(msg))
            }))
        }

        updateHeadline(newHeadline)()
        .then(updateHeadline(initialHeadline))
        .then(common.logout)
        .then(done)
    })
})
after('should log out', (done) => {
    console.log('logging out')
    sleep(50).then(common.logout).then(done)
})
