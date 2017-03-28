import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

const url = 'https://webdev-dummy.herokuapp.com'
let Action, actions, interceptedResource, dataFetching
beforeEach(() => {
    if (mockery.enable) {
    	mockery.enable({warnOnUnregistered: false, useCleanCache:true})
    	mockery.registerMock('node-fetch', fetch)
    	require('node-fetch')
    }
    interceptedResource = require('./serverRequests/serverRequest')
    dataFetching = require('./serverRequests/dataFetching')
    Action = require('./actions').default
    actions = require('./actions')
})

afterEach(() => {
    if (mockery.enable) {
	   mockery.deregisterMock('node-fetch')
	   mockery.disable()
    }
})


// mainly for mocking the ajax call
const username = 'cmd11test'
const headline = 'A new headline!'
const email = 'bob@bobmail.com'
const zipcode = '30333'

it('should navigate (to landing)', (done) => {
    const changeAction = actions.updateLocation(actions.LANDING_PAGE)
    const expectedAction = { 
        type: actions.ActionTypes.LOCATION_CHANGE, 'newLocation': actions.LANDING_PAGE
    } 
    expect(changeAction).to.eql(expectedAction)
    done()
})


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
