import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

import { multiUpdateGenerator } from './miniProfileActions'

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
'This is the "interesting" bit. This is also a "mock" of dispatch.''
*/
const testFieldUpdate = function(action) {
    expect(action).to.eql({
        headline, type: actions.UPDATE_PROFILE_DATA
    })
  done()
}

/** 
'This just handles complex actions that call complex actions (that take
dispatch as an argument). The real dispatch does something similar to this'
*/
const dispatch = function(complexAction) { 
    return complexAction(testFieldUpdate)
}

it('should update the profile data all at once', (done) => {
  // the result from the mocked AJAX call
    const username = 'sep1test'
    const headline = 'A new headline!'
    const email = 'bob@bobmail.com'
    const zipcode = '30333'

    const fields = ['headline', 'email', 'zipcode']
    const fieldVals = [headline, email, zipcode]

    fields.forEach((field, index) => {
        const fieldVal = fieldVals[index]
        //mock up the responses to the 3 fetch calls we intercept
        mock(`${url}/${fieldVal}`, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            json: { username, fieldVal } 
        })
    })

    // call our complex action with our mock of dispatch, which
    //will test our stuff using testFieldUpdate
    multiUpdateGenerator({
        'headline': headline, 'email': email, 'zipcode': zipcode
    })(dispatch)
    done()
})