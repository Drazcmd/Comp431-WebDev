//turns out you CANNOT do "import fetch from 'node-fetch'" - it
//imports some stuff that wrecks how the cookies work :/
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
export const getMainData = (userList) => {
  const userListStr = userList.join(',')
    return Promise.all([
        resource('GET', 'articles'),
        resource('GET', `headlines/${userListStr}`),
        resource('GET', `avatars/${userListStr}`),
        //this one is to get our own headline!
        resource('GET', `headlines`)
    ]).then(getRequests => {
        const articles = getRequests[0].articles

        //we need to package each followee up for my components to use
        const followeesHeadlines = getRequests[1].headlines
        const followeesAvatars = getRequests[2].avatars
        const followees = followeesHeadlines.map((followeeWithHeadline) => {
            const headline = followeeWithHeadline.headline
            const username = followeeWithHeadline.username
            const possibleAvatar = followeesAvatars.find((followee) => {
                return followee.username === username
            })
            const avatar = possibleAvatar ? possibleAvatar.avatar : null
            return { 
                name: username,
                status: headline,
                img: avatar
            }
        })
        //response is like {headlines: [{username: cmd11, headline: "woo!"}]}
        const ourHeadline = getRequests[3].headlines[0].headline
        const ourUsername = getRequests[3].headlines[0].username
        return {
            articles: articles,
            followees: followees,
            //the reducer will only update what we put in here
            profileData: {
              name: ourUsername,
              status: ourHeadline
            }
        }
    })
}
export const getProfileData = () => {
    return Promise.all([
        resource('GET', 'email'),
        resource('GET', 'zipcode')
    ]).then(getRequests => {
        const email = getRequests[0].email
        const zipcode = getRequests[1].zipcode
        return {
          profileData: {
              email: email,
              zipcode: zipcode
          }
       } 
    })
}

/**  
These two can be used for updating any of the various user fields who are
updated using a PUT with endpoint as /${fieldname} and required payload as
{ ${fieldname}: value }.

This includes the user's headline, user email,  zipcode, and password,
*/
const updateField = (field, value) => {
  //unfortunately there's no way to functionally interpolate the
  //field variable as our key (rather than 'field' as the key) :(
  const payload = {}
  payload[field] = value
  return resource('PUT', field, payload)
}
export const updateFields = (fieldValueObjs) => {
  const resultingDataAcc = {}
  return Promise.all(
    fieldValueObjs.map(fieldValueObj => {
      //i.e. email, zipcode, headline, etc
      const fieldToUpdate = fieldValueObj.field
      //i.e. a@gmail.com, 33333, etc.
      const newValue = fieldValueObj.value
      return updateField(fieldToUpdate, newValue)
    })
  ).then((fetchResponses) => {
    return fetchResponses.reduce(
      ((resultingDataAcc, fetchResponse, index) => {
        //Index should be the same due to use of Promise.all
        const field = fieldValueObjs[index].field
        //And now package it up nicely for our reducers to use
        const withField = {
          ...resultingDataAcc
        }
        //Same inability to interpolate as above :/ It's a
        //fundamental limitation of js as far as I understand
        withField[field] = fetchResponse[field]
        return withField
      })
    )
  })
}

