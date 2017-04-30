import { expect } from 'chai'
import { go, sleep, findId, findName, findNames, findCSS, By } from './selenium'
import common from './common'


const email1 = "a@b.com"
const email2 = "c@abc.org"
const zipcode1 = "11111"
const zipcode2 = "77755"
describe('Profile data update tests', () => {
    const username = common.creds.username
    it('should be able to update email and zipcode (my design forces updating both at once)', (done) => {
        const updateProfile = ((email, zipcode) => {
            sleep(500).then(common.login)
            .then(findName('Profile').click())
            .then(sleep(500))
            .then(findName('updateEmail').clear())
            .then(findName('updateEmail').sendKeys(email))
            .then(findName('updateZipcode').clear())
            .then(findName('updateZipcode').sendKeys(zipcode))
            .then(findName('profileUpdateBtn').click())
            .then(common.logout)
            .then(sleep(500))
            .then(common.login)
            .then(findName('Profile').click())
            .then(sleep(500))
            .then(() => findName('email').getText())
            .then((emailText) => {expect(emailText).to.eql('Email: ' + email)})
            .then(() => findName('zipcode').getText())
            .then((zipcodeText) => {expect(zipcodeText).to.eql('Zip: ' + zipcode)})
            .then(sleep(500))
            .then(common.logout)
        })

        go().then(sleep(500))
        .then(updateProfile(email1, zipcode1))
        .then(sleep(500))
        .then(updateProfile(email2, zipcode2))
        .then(done)
    })
    it('should have an update password button (really? this was kinda weird...', (done) => {
        go().then(sleep(500)).then(common.login)
        .then(findName('Profile').click())
        .then(sleep(500))
        .then(findName('updatePassword'))
        .then(findName('passwordUpdateBtn'))
        //so long as it hasn't crashed we're good to go
        .then(done)
    })
})
