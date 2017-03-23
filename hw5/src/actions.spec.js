import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

const url = 'https://webdev-dummy.herokuapp.com'

/*
CODE ALMOST ENTIRELY COPIED FROM THAT PROVIDED ON THE 
ASSIGNMENT POSTING! 
See https://www.clear.rice.edu/comp431/#/assignments
*/
let Action, actions
beforeEach(() => {
    if (mockery.enable) {
    	mockery.enable({warnOnUnregistered: false, useCleanCache:true})
    	mockery.registerMock('node-fetch', fetch)
    	require('node-fetch')
    }
    Action = require('./actions').default
    actions = require('./actions')
})

afterEach(() => {
    if (mockery.enable) {
	   mockery.deregisterMock('node-fetch')
	   mockery.disable()
    }
})


//According to Suzanne this is all I need ^-^
it('should navigate (to profile, main, or landing)', (done) => {
    const changeAction = actions.updateLocation(actions.MAIN_PAGE)
    const expectedAction = { 
        type: actions.ActionTypes.LOCATION_CHANGE, 'location': actions.MAIN_PAGE
    } 
    expect(changeAction).to.eql(expectedAction)
    done()
})