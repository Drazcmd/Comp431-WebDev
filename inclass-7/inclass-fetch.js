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
	function map_articles(articles) {
		// Actually doesn't use 'map', but it works like one :)
		var output_object = {}
		articles.forEach(function(article) {
			output_object[article["_id"]] = article["text"].split(" ").length
	    })
	    return output_object
    }

    function countWords(url) {
        return fetch(url)
            .then(res => {
            	//console.log(res.json())
                // return an object { articleId: wordCount }
                //Can't actually access stuff in the .json since it returns a
                //promise, until you get to the next .then
                return res.json()
            })
            .then(res => {
            	/*
            	console.log(res)	
            	console.log(res["articles"][0])	
            	console.log(res["articles"].map(function(article) {
            		return article["text"]
            	}))
            	*/
            	return map_articles(res["articles"])
            })
    }

    function countWordsSafe(url) {
        return countWords(url)
            .then(res => {
                //console.log('this is inside countWordsSafe')
                //console.log(res)
                return res
            })
            .catch(err => {
                console.error(`Error inside countWordsSafe: ${err.message}`);
                return { }
            })
    }

    function getLargest(url) {
        // IMPLEMENT ME
        return countWords(url)
            .then(res => {
            	console.log(res)
            	let maxId = Object.keys(res).reduce((a, x) => res[x] > res[a] ? x : a)
            	return maxId
            })
    }

    exports.inclass = {
        author: "Clayton Drazner (cmd11)",
        countWords, countWordsSafe, getLargest
    }

})(this);
