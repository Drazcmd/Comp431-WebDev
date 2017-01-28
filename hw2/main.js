'use strict'
var imgCardIds = [
	"imgcard1",
	"imgcard2",
	"imgcard3",
	"imgcard4",
	"imgcard5"
]

function showNextImages(card_images_arr){
	var is_relevant_image = function (image, index){
		if (image.hidden){
			//Either this image is hidden...
			return true
		} else {
			//or the previous image is hidden
			var num_images = card_images_arr.length
			//(Normal js modulo handles negative numbers poorly)
			var prev_image = card_images_arr[(index - 1 + num_images) % num_images]
			console.log(prev_image)
			return prev_image.hidden	
		}
	}

	/**
	Because we just want to operate on the two images where one is hidden
	and one should be shown next
	**/
	var relevant_images = card_images_arr.filter(is_relevant_image)
	console.log(relevant_images)
	var flip_hidden = function (image){
		if (image.hidden){
			image.hidden = false
		} else {
			image.hidden = true	
		}
	}
	card_images_arr.forEach(flip_hidden)				
}

function createImageCards(){
	console.log("Hello World")
	imgCardIds.forEach(function test(card) {
		var card = document.getElementById(card)
		console.log(card)
		console.log(card.children)
		let card_images_arr = Array.from(card.children)

		//Close over card_images_arr for showNextImages	
		var update_this_card = function() {
			showNextImages(card_images_arr)
		}

		// (Assignment specified the images must change
		// at a random interval between 0 and 5 seconds)
		setInterval(update_this_card, Math.floor(10000 * Math.random()))
	})
}

/* TODO - consider launching this here
window.onload = function() {
	createImageCards()
}*/
