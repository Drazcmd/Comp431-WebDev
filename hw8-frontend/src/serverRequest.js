//turns out you CANNOT do "import fetch from 'node-fetch'" - it
//imports some stuff that wrecks how the cookies work :/
const fetch = require('isomorphic-fetch');

//URL of the backend server - used to be https://webdev-dummy.herokuapp.com
//Now it's of my backend that I deployed to heroku
//const url = "https://besthw7serverever.herokuapp.com"
//const url = "https://webdev-dummy.herokuapp.com"
const url = "http://localhost:3000"

/**
See the provided code for connecting to the dummy server
(https://jsbin.com/jeliroluni/edit?js,output)
*/
const fetchWrap = (endpoint, options) => {
  return fetch(`${url}/${endpoint}`, options)
  .then(r => {
    if (r.status === 200) {
      return (r.headers.get('Content-Type').indexOf('json') > 0) ? r.json() : r.text()
    } else {
      throw new Error(r.statusText)
    }
  })
}

/**
 * Basically a hack/workaround I made to see if we're already logged in since 
 * the API doesn't support a true 'isLoggedIn' endpoint
 *
 * Should return a promise for a repsonse that will be true iff the brower's 
 * current sid cookie is accepted by the backend as valid for a logged in user
 */
export const pingBackend = () => {
  //choice of 'email' as the endpoint we're poking at was pretty arbitrary - I
  //just wanted something that was fast (little reading/writing on either side) 
  //and requried being logged in
  const arbitraryEndpoint = 'email'
  return resource('GET', arbitraryEndpoint)
  .then((response) => {
    //a response that's not 401 unauthorize means we are authenticated!
    return true
  })
  .catch((err) => {
    //a response that's 401 unauthorized results in an error being caught here
    //therefore, at htis point we know we're not logged in (assuming the code
    //for sending POST requsts is working correctly)
    return false
  })
}

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
  }
  return fetchWrap(endpoint, options)
}

export const nonJsonResource = (method, endpoint, textMessage, imageBytestream) => {
  // See https://www.clear.rice.edu/comp431/data/api.html#upload
  // The keys 'text' and 'image' are super super important! 
  const fdPaylod = new FormData()
  if (textMessage) {
    fdPaylod.append('text', textMessage ? textMessage : "")
  }
  if (imageBytestream) {
    fdPaylod.append('image', imageBytestream)
  }
  //Note how we removed the application/json header
  const options =  {
    method,
    credentials: 'include'
  }
  if (fdPaylod) {
    options.body = fdPaylod
  }
  return fetchWrap(endpoint, options)
}


export const getMainData = (userList) => {
  const userListStr = userList.join(',')
    return Promise.all([
        resource('GET', 'articles'),
        resource('GET', `headlines/${userListStr}`),
        resource('GET', `avatars/${userListStr}`),

        //these two are to get our own headline and avatar!
        resource('GET', `headlines`),
        resource('GET', `avatars`)
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
        const ourAvatar = getRequests[4].avatars[0].avatar
        return {
            articles: articles,
            followees: followees,
            //the reducer will only update what we put in here
            profileData: {
              name: ourUsername,
              status: ourHeadline,
              img: ourAvatar
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