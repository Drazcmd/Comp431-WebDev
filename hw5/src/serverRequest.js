import fetch from 'node-fetch'

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
  if (payload) {
    options.body = JSON.stringify(payload)
  };

  console.log('REMOVE DUMMY REQUEST STUFFFFFS')
  return fetch(`${url}/${endpoint}`, options)
    /*.then(res => {
      if (res.status === 200) {
        //not sure if there's a better way to do ternary indentation
        return (res.headers.get('Content-Type').indexOf('json') > 0)
            ? res.json()
            : res.text()

      } else {
        console.error(`${method} ${endpoint} ${res.statusText}`)
        throw new Error(res.statusText)
      }
    })*/
   
}
