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

//TODO - figure out a non-mutational way to do this!
var position_index = 0
var position_styles = [
	"position:absolute; left:80px; top:40px",
	"position:absolute; left:200px; top:200px",
	"position:absolute; left:30px; top:100px",
	"position:absolute; left:300px; top:300px",
	"position:absolute; left:0px; top:0px"
]
function avoidMouse(){
	var theButton = document.getElementById("movingButton")
	position_index = position_index + 1
	position_index = position_index % 5
	console.log("avoiding the mouse")
	theButton.style = position_styles[position_index]
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