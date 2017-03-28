import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

const url = 'https://webdev-dummy.herokuapp.com'
let Action, actions, interceptedResource
beforeEach(() => {
    if (mockery.enable) {
        mockery.enable({warnOnUnregistered: false, useCleanCache:true})
        mockery.registerMock('node-fetch', fetch)
        require('node-fetch')
    }
    interceptedResource = require('./serverRequest')
    Action = require('./../actions').default
    actions = require('./../actions')
})

afterEach(() => {
    if (mockery.enable) {
        mockery.deregisterMock('node-fetch')
        mockery.disable()
    }
})

it('resource should be a resource', (done) => {
    mock(`${url}/`, {
        method: 'GET',
        headers: {'Content-Type':'application/json'},
        json: { 'hello':'world'} 
    })
    interceptedResource.resource('GET', "")
    .then((resJSON) => {
        expect(resJSON).to.be.ok
        expect(resJSON).to.eql({ 'hello': 'world'});
        done();
    }).catch(error => {
        done(error)
    })
})

it('resource should give me the http error', (done) => {
    const errorEndpint = 'asodifjasdf'
    mock(`${url}/${errorEndpint}`, {
        method: 'GET',
        headers: {'Content-Type':'application/json'},
        status: 404
    })
    interceptedResource.resource('GET', errorEndpint)
    .then((problematicResponse) => {
        //we want to fail if an error isn't thrown
        expect(1).to.eql(2)
        done()
    })
    .catch((error) => {
        expect(error).to.be.ok
        //this means success!
        done()
    })
})

/*
I test post through a hardcoded login using test dummy credentials
However, all I care about is the returned status - not the login results
*/
it('resource should be POSTable', (done) => {
    const endpoint = 'login'
    mock(`${url}/${endpoint}`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        json: { 'username':'cmd11test', 'result':'success' } 
    })
    const payload = {'username':'cmd11test', 'password':'damage-butter-memory'}
    interceptedResource.resource('POST', endpoint, payload)
    .then((resJSON) =>{
        expect(resJSON).to.be.ok
        expect(resJSON).to.eql({ 'username':'cmd11test', 'result':'success' })
        done()
    }).catch((error) => {
        done(error)
    })
})