import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

import { updateHeadline } from './miniProfileActions'

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

//See piazza @138
// This is the "interesting" bit.
// This is also a "mock" of dispatch.  
const testAction = function(action) {
    expect(action).to.eql({
        headline, type: actions.UPDATE_PROFILE
    })
  done()
}

// this just handles complex actions that call complex actions (that take dispatch as an argument)
// the real dispatch does something similar to this
const dispatch = function(complexAction) { 
    return complexAction(testAction)
}


it('should update the status message', (done) => {
  
  // the result from the mocked AJAX call
    const username = 'sep1test'
    const headline = 'A new headline!'

    mock(`${url}/headline`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        json: { username, headline }
    })

    // call our complex action with our mock of dispatch
    updateHeadline('does not matter')(dispatch)
    done()
})