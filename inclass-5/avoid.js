function setupButton() {
	console.log("sup")
	var theButton = document.getElementById("movingButton")

	//Event handler lasts for just enough time so it doesn't cause errors
	//when resetGame() tries to remove it - can't actually event fire off.
	theButton.addEventListener("click", resetGame)
	resetGame()
}

//TODO - make it only do so when specifically just the shift key
//is pressed down	
//TODO - Can't figure out how to deal with two conflicting problems:
//to pass in an arg, function basically has to be anonymous. But, it
//the function is anonymous, can't remove the event listener -_-
function avoidMouse(){
	var theButton = document.getElementById("movingButton")
	console.log("TODO - avoid the mouse")
}
function gameWon(){
	var theButton = document.getElementById("movingButton")
	console.log("A winner is you!")
	theButton.removeEventListener("click", gameWon)
	theButton.addEventListener("click", resetGame)
	theButton.innerHTML = " Reset Game "
	console.log(theButton)

	//Disable the keydown-keyup behavior until game is going again
	document.body.removeEventListener("keydown", disableAvoid = function() {
		console.log("avoiding disabled...")
		theButton.removeEventListener("mouseover", avoidMouse)
	})
	document.body.removeEventListener("keyup", enableAvoid = function() {
		console.log("avoiding re-enabled")
		theButton.addEventListener("mouseover", avoidMouse)
	})
	theButton.removeEventListener("mouseover", avoidMouse)
	console.log(theButton)
}
function resetGame(){
	var theButton = document.getElementById("movingButton")
	console.log("Resetting")
	theButton.removeEventListener("click", resetGame)
	theButton.addEventListener("click", gameWon)
	theButton.innerHTML = " Click Me "
	document.body.addEventListener("keydown", disableAvoid = function() {
		console.log("avoiding disabled...")
		theButton.removeEventListener("mouseover", avoidMouse)
	})
	document.body.addEventListener("keyup", enableAvoid = function() {
		console.log("avoiding re-enabled")
		theButton.addEventListener("mouseover", avoidMouse)
	})
	theButton.addEventListener("mouseover", avoidMouse)
	console.log(theButton)
}