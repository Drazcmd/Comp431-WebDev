import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

const url = 'https://webdev-dummy.herokuapp.com'

/*
CODE ALMOST ENTIRELY COPIED FROM THAT PROVIDED ON THE 
ASSIGNMENT POSTING! 
See https://www.clear.rice.edu/comp431/#/assignments
*/
let Action, actions, interceptedResource
beforeEach(() => {
    if (mockery.enable) {
    	mockery.enable({warnOnUnregistered: false, useCleanCache:true})
    	mockery.registerMock('node-fetch', fetch)
    	require('node-fetch')
    }
    Action = require('./actions').default
    actions = require('./actions')
    interceptedResource = require('./serverRequests/serverRequest')
})

afterEach(() => {
    if (mockery.enable) {
	   mockery.deregisterMock('node-fetch')
	   mockery.disable()
    }
})


//According to Suzanne this is all I need for the action side ^-^
//The rest of the test for it can be found back in the reducer
it('should navigate (to landing)', (done) => {
    const changeAction = actions.updateLocation(actions.LANDING_PAGE)
    const expectedAction = { 
        type: actions.ActionTypes.LOCATION_CHANGE, 'newLocation': actions.LANDING_PAGE
    } 
    expect(changeAction).to.eql(expectedAction)
    done()
})


// mainly for mocking the ajax call
const username = 'cmd11test'
const headline = 'A new headline!'
const email = 'bob@bobmail.com'
const zipcode = '30333'

it('should update user headline', (done) => {
    const endpoint = 'headline'
    mock(`${url}/${endpoint}`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        json: { 'headlines':
            [{'username': username, 'headline': headline}]
        }
    })
    interceptedResource.resource('PUT', endpoint)
    .then((resJSON) =>{
        expect(resJSON).to.be.ok
        expect(resJSON).to.eql({
            headlines: [{'username': username, 'headline': headline}]
        })
        done()
    }).catch((error) => {
        done(error)
    })
})

it('should fetch users profile info (headline)', (done) => {
    const endpoint = 'headlines/'
    mock(`${url}/${endpoint}`, {
        method: 'GET',
        headers: {'Content-Type':'application/json'},
        json: { 'headlines':
            [{'username': username, 'headline': headline}]
        }
    })
    interceptedResource.resource('GET', endpoint)
    .then((resJSON) =>{
        expect(resJSON).to.be.ok
        expect(resJSON).to.eql({
            headlines: [{'username': username, 'headline': headline}]
        })
        done()
    }).catch((error) => {
        done(error)
    })
})

it('should fetch users profile info (email)', (done) => {
    const endpoint = 'email/'
    mock(`${url}/${endpoint}`, {
        method: 'GET',
        headers: {'Content-Type':'application/json'},
        json: {'username': username, 'email': email} 
    })
    interceptedResource.resource('GET', endpoint)
    .then((resJSON) =>{
        expect(resJSON).to.be.ok
        expect(resJSON).to.eql({'username': username, 'email': email})
        done()
    }).catch((error) => {
        done(error)
    })
})
it('should fetch users profile info (zipcode)', (done) => {
    const endpoint = 'zipcode/'
    mock(`${url}/${endpoint}`, {
        method: 'GET',
        headers: {'Content-Type':'application/json'},
        json: {'username': username, 'zipcode': zipcode} 
    })
    interceptedResource.resource('GET', endpoint)
    .then((resJSON) =>{
        expect(resJSON).to.be.ok
        expect(resJSON).to.eql({'username': username, 'zipcode': zipcode})
        done()
    }).catch((error) => {
        done(error)
    })
})
