import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

import { resource } from './dummyRequest'

const url = 'https://webdev-dummy.herokuapp.com'
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

it('resource should be a resource', (done) => {
    mock(`${url}`, {
        method: 'GET',
        headers: {'Content-Type':'application/json'},
        json: { 'hello':'world'} 
    })

    resource('GET', "").then((res) => {
        expect(res.status).to.eql(200)
        return res.json()
    }).then((resJSON) => {
        expect(resJSON).to.eql({ 'hello': 'world'});
        done();
    })
})

it('resource should give me the http error', (done) => {
    const errorEndpint = '/asodifjasdf'
    mock(`${url}${errorEndpint}`, {
        method: 'GET',
        headers: {'Content-Type':'application/json'},
        json: { 'hello':'world'} 
    })
    const invalidRequest = resource('GET', errorEndpint).then((res) =>{
        expect(res.status).to.eql(404)
        done();
    })
})

