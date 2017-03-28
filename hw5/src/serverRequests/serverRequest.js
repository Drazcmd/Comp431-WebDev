require('isomorphic-fetch');
/**
'Dummy' as in the dummy server at the url below;
this is a real http request.
*/
const url = 'https://webdev-dummy.herokuapp.com'
/**
See the provided code for connecting to the dummy server
(https://jsbin.com/jeliroluni/edit?js,output)
*/

export const resource = (method, endpoint, payload) => {
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
        throw new Error(r.statusText)
      }
    })
}