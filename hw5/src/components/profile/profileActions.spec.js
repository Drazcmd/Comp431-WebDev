import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

import { updateEmail, updateHeadline } from './profileActions'

const url = 'https://webdev-dummy.herokuapp.com'
let Action, actions
beforeEach(() => {
    if (mockery.enable) {
        mockery.enable({warnOnUnregistered: false, useCleanCache:true})
        mockery.registerMock('node-fetch', fetch)
        require('node-fetch')
    }
    Action = require('./../../actions').default
    actions = require('./../../actions')
})

afterEach(() => {
    if (mockery.enable) {
        mockery.deregisterMock('node-fetch')
        mockery.disable()
    }
})

/**
See piazza @138
This is the "interesting" bit.
This is also a "mock" of dispatch.  
*/
const testAction = function(action) {
    expect(action).to.eql({
        headline, type: actions.UPDATE_PROFILE
    })
  done()
}

/** 
This just handles complex actions that call complex actions (that take
dispatch as an argument)  the real dispatch does something similar to this 
*/
const dispatch = function(complexAction) { 
    return complexAction(testAction)
}

it('should update the status message/headline', (done) => {
  // the result from the mocked AJAX call
    const username = 'sep1test'
    const email = 'bob@bobmail.com'
    const zipcode = '20102'

    mock(`${url}/email`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        json: { username, email }
    })
    mock(`${url}/zipcode`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        json: { username, zipcode }
    })

    // call our complex action with our mock of dispatch
    updateEmail('does not matter')(dispatch)
    updateZipcode('does not matter')(dispatch)
    done()
})