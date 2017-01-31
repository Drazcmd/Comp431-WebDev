// Inclass Fetch Exercise
// ======================
//
// Navigate to https://webdev-dummy.herokuapp.com/sample
//
// This endpoint returns a list of articles.  Your assignment is to
// write a function countWords that uses fetch() to query the endpoint,
// and return a map from the article id to the number of words in the
// article's text.
//
// Also write two "helper" functions that call this initial function.
//
// If there are any exceptions then fetch() will throw an error.
// Provide a "safe" version of the countWords function that always
// returns a map, which will be empty in the case of errors.
//
// Finally, write a function that returns the article id with the
// most number of words.
//
// Below I have provided you a template, you just need to fill in
// the implementation.
//
// Navigate to mocha-inclass-fetch.html to see if your implementation
// provides the expected results.
//
// Note that during the validation of the tests the browser will be
// directed to download invalid URLs which will result in error messages
// in the console:
//     GET https://webdev-dummy.herokuapp.com/badURL 404 (Not Found)
// this is expected and is not an error with your code.
//
(function(exports) {

    'use strict'

    function countWords(url) {
        return fetch(url)
            .then(res => {
            	//console.log(res.json())
            	//Note that res.json() returns a PROMISE, not the json itself.
                //Therefore, you can't actually access stuff in the .json
                //until you get to the next .then
                return res.json()
            })
            .then(res => {
            	//NOW res is the actual json (assuming no errors)
            	/*
            	console.log(res)	
            	console.log(res["articles"][0])	
            	console.log(res["articles"].map(function(article) {
            		return article["text"]
            	}))
            	*/
				var output_object = {}
				res["articles"].forEach(function(article) {
					output_object[article["_id"]] = article["text"].split(" ").length
	    			return output_object
	    		})
            	return output_object
           })
    }

    function countWordsSafe(url) {
        return countWords(url)
            .then(res => {
            	//Res is the {id: wordcount, ...} object from countWords()
                //console.log(res)
                return res
            })
            .catch(err => {
                console.error(`Error inside countWordsSafe: ${err.message}`);
                return { }
            })
    }

    function getLargest(url) {
        return countWords(url)
            .then(res => {
            	//Res is the {id: wordcount, ...} object from countWords()
            	//console.log(res)
            	let maxId = Object.keys(res).reduce((a, x) => res[x] >= res[a] ? x : a)
            	return maxId
            })
    }

    exports.inclass = {
        author: "Clayton Drazner (cmd11)",
        countWords, countWordsSafe, getLargest
    }

})(this);
