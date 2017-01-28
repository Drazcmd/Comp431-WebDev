'use strict'
var imgCardIds = [
	"imgcard1",
	"imgcard2",
	"imgcard3",
	"imgcard4",
	"imgcard5"
]

/**
Mutates the image elements' .hidden attribute as needed, with
the net effect being that the currently showing image is hid
and the image after it in the array is shown.
*/
function showNextImage(card_images_arr){
	var is_relevant_image = function (image, index){
		if (!(image.hidden)){
			//Want it back either if this image is not hidden...
			return true
		} else {
			//or the previous image is not hidden
			var num_images = card_images_arr.length
			//(Normal js modulo handles negative numbers poorly)
			var prev_image_index = (index - 1 + num_images) % (num_images)
			return !(card_images_arr[prev_image_index].hidden)
		}
	}

	/**
	We just want to flip .hidden of the two images where image_a is visible
	and image_b needs and needs to be shown next
	**/
	var relevant_images = card_images_arr.filter(is_relevant_image)
	var flip_hidden = function (image){
		if (image.hidden){
			image.hidden = false
		} else {
			image.hidden = true	
		} 
		
	}
	relevant_images.forEach(flip_hidden)				
}

/**
Gives each of the image cards a working button and constructs/launches
any neccessary functions that responsible for cycling through the images.
*/
function createImageCards(){
	console.log("Hello World")
	imgCardIds.forEach(function(card) {
		var card = document.getElementById(card)
		let card_images_arr = Array.from(card.children)

		//Safe to add button as new child so long as we use the non-mutating 
		//Array.from of card.children in the last line to deal with images
		var interval_button = document.createElement("BUTTON")
		card.appendChild(interval_button)

		//Close over card_images_arr for showNextImage
		var update_this_card = function() {
			showNextImage(card_images_arr)
		}

		var launch_intervals = function(){
			// (Assignment specified the images must change
			// at a random interval between 0 and 5 seconds)
			interval_button.innerHTML = "Pause Images"
			var interval_control = setInterval(update_this_card, Math.floor(5000 * Math.random()))
			var pause_interval = function() {
				interval_button.innerHTML = "Cycle images"
				interval_button.removeEventListener("click", pause_interval)
				interval_button.addEventListener("click", launch_intervals)
	 			clearInterval(interval_control)
			}
			interval_button.addEventListener("click", pause_interval)

		}
		launch_intervals()
	})

}