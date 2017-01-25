function setupButton() {
	var theButton = document.getElementById("movingButton")

	//This instance of the reset Game event handler lasts for just enough time
	//so its absence doesn't cause errors when resetGame() tries to remove it
	//- can't actually event fire off.
	theButton.addEventListener("click", resetGame)
	resetGame()
}

//TODO - make it only do so when specifically just the shift key
//is pressed down	
function enableAvoid() {
	var theButton = document.getElementById("movingButton")
	console.log("avoiding re-enabled")
	theButton.addEventListener("mouseover", avoidMouse)
}
function disableAvoid() {
	var theButton = document.getElementById("movingButton")
	console.log("avoiding disabled")
	theButton.removeEventListener("mouseover", avoidMouse)
}

//TODO - how on earth did the prof get it to move in two dimensions
//randomly like that??? So confused. Thought I'd be able to use the
//position arg to move it, but that doesn't seem to be working
function avoidMouse(){
	var theButton = document.getElementById("movingButton")
	console.log("TODO - avoid the mouse")
	theButton.style.position = "1000px"
}
function gameWon(){
	var theButton = document.getElementById("movingButton")
	console.log("A winner is you!")
	theButton.removeEventListener("click", gameWon)
	theButton.addEventListener("click", resetGame)
	theButton.innerHTML = " Reset Game "
	console.log(theButton)

	//Disable the keydown-keyup behavior until game is going again
	document.body.removeEventListener("keydown", disableAvoid)
	document.body.removeEventListener("keyup", enableAvoid)
	disableAvoid()
	console.log(theButton)
}
function resetGame(){
	var theButton = document.getElementById("movingButton")
	console.log("Resetting")
	theButton.removeEventListener("click", resetGame)
	theButton.addEventListener("click", gameWon)
	theButton.innerHTML = " Click Me "

	//Enable the keydown-keyup behavior now that the game's restarted
	document.body.addEventListener("keydown", disableAvoid)
	document.body.addEventListener("keyup", enableAvoid)
	enableAvoid()
	theButton.style.position = "0px"
	console.log(theButton)
}