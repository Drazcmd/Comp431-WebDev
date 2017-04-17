import { expect } from 'chai'
import { go, sleep, findId, findName, findNames, findCSS, By } from './selenium'
import common from './common'

describe('Followee tests', () => {

    const username = common.creds.username
    it('should add a new follower user and verify the following count increased by one', (done) => {
    	let initialFolloweesNum
        go().then(sleep(500)).then(common.login)
        .then(() => findNames('followee'))
        .then((followees) => {initialFolloweesNum = followees.length})
        .then(findName('addFollowee').clear())
        .then(findName('addFollowee').sendKeys('sep1'))
        .then(findName('addFolloweeBtn').click())
        .then(sleep(1000))
        .then(() => findNames('followee'))
        .then((followees) => {
        	expect(followees.length).to.eql(initialFolloweesNum + 1)
        })
        .then(sleep(500))
        .then(common.logout).then(done)
    })
})
