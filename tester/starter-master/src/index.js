import React from 'react'
import { render } from 'react-dom'
const url = 'https://webdev-dummy.herokuapp.com'

const resource = (method, endpoint, payload) => {
  const options =  {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (payload) options.body = JSON.stringify(payload)

  return fetch(`${url}/${endpoint}`, options)
    .then(r => {
      if (r.status === 200) {
        return (r.headers.get('Content-Type').indexOf('json') > 0) ? r.json() : r.text()
      } else {
        // useful for debugging, but remove in production
        console.error(`${method} ${endpoint} ${r.statusText}`)
        throw new Error(r.statusText)
      }
    })
}

const login = () => {
  
  const username = "cmd11test"
  const password = "damage-butter-memory" 

  return resource('POST', 'login', { username, password })
    .then(r => resource('GET', 'headlines'))
    .then(r => {
      const user = r.headlines[0]
      console.log(`you are logged in as ${user.username} "${user.headline}"`)
    })
    .catch(r => box.innerHTML = `"${r.message || 'Error'}" when logging in`)
}

const logout = () => {
  return resource('PUT', 'logout')
    .then(r => console.log("You have logged out" ))
    .catch(r => console.log(`"${r.message}" when logging out`))
}

login()
render(
    <div> 
    </div>,
    document.getElementById('app')
)
