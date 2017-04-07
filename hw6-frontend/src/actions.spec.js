import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'
describe("Test Actions", () => {

const url = 'https://webdev-dummy.herokuapp.com'
let resource, actions
beforeEach(() => {
    if (mockery.enable) {
        mockery.enable({warnOnUnregistered: false, useCleanCache:true})
        mockery.registerMock('node-fetch', fetch)
        require('node-fetch')
    }
    resource = require('./serverRequest')
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
    resource.resource('PUT', endpoint)
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
    resource.resource('GET', endpoint)
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
    resource.resource('GET', endpoint)
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
    resource.resource('GET', endpoint)
    .then((resJSON) =>{
        expect(resJSON).to.be.ok
        expect(resJSON).to.eql({'username': username, 'zipcode': zipcode})
        done()
    }).catch((error) => {
        done(error)
    })
})

it ('should update error message (for displaying error message to user', (done) => {
    const errorMessage = 'You messed up!'
    const expectedAction = { 
        type: actions.ActionTypes.UPDATE_ERROR_MESSAGE,
        message: 'You messed up!'
    } 
    expect(actions.dispError('You messed up!')).to.eql(expectedAction)
    done()
})
})
