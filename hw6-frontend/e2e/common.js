import { expect } from 'chai'
import { findId, findName, sleep, wait } from './selenium'

exports.creds = {
    username: 'cmd11test',
    password: 'damage-butter-memory'
}

exports.login = () =>
    sleep(500)
        .then(findName('username').clear())
        .then(findName('password').clear())
        .then(findName('username').sendKeys(exports.creds.username))
        .then(findName('password').sendKeys(exports.creds.password))
        .then(findName('loginBtn').click())
        .then(sleep(2000))

exports.logout = () =>
    sleep(500)
    .then(findName('logoutBtn').click())
    .then(sleep(500))
