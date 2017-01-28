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
		if (!(image.hidden)){
			//Want it back either if this image is not hidden...
			console.log("I'm not hidden!", index)
			return true
		} else {
			//or the previous image is not hidden
			var num_images = card_images_arr.length
			//(Normal js modulo handles negative numbers poorly)
			var prev_image_index = (index - 1 + num_images) % (num_images)
			console.log("currently", index)
			console.log("prev", prev_image_index, !(card_images_arr[prev_image_index].hidden))
			return !(card_images_arr[prev_image_index].hidden)
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
		} else if (!(image.hidden)) {
			image.hidden = true	
		} else {
			console.log("WEIRDNESS")
		}
	}
	relevant_images.forEach(flip_hidden)				
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
		setInterval(update_this_card, Math.floor(5000 * Math.random()))
	})
}

/* TODO - consider launching this here
window.onload = function() {
	createImageCards()
}*/
