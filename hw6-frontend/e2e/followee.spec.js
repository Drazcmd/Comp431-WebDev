import { expect } from 'chai'
import { go, sleep, findId, findName, findNames, findCSS, By } from './selenium'
import common from './common'

before('should log in', (done) => {
    go().then(sleep(500)).then(common.login).then(done)
})
describe('Followee tests', () => {

    const username = common.creds.username
    it('should add a new follower user and verify the following count increased by one', (done) => {
    	let initialFolloweesNum
        sleep(500)
        .then(() => findNames('followee'))
        .then((followees) => {initialFolloweesNum = followees.length})
        .then(findName('addFollowee').clear())
        .then(findName('addFollowee').sendKeys('sep1'))
        .then(findName('addFolloweeBtn').click())
        .then(sleep(500))
        .then(() => findNames('followee'))
        .then((followees) => {
        	expect(followees.length).to.eql(initialFolloweesNum + 1)
        })
        .then(sleep(500))
        .then(done)
    })
})
after('should log out', (done) => {
    common.logout().then(done)
})
