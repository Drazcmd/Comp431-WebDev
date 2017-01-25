function setupButton(){
	console.log("sup")
	var theButton = document.getElementById("movingButton")
	theButton.addEventListener("click", gameWon)
}
function avoidMouse(theButton){
	console.log("hi!")
}
function gameWon(){
	var theButton = document.getElementById("movingButton")
	console.log("A winner is you!")
	theButton.removeEventListener("click", gameWon)
	theButton.addEventListener("click", resetGame)
	theButton.innerHTML = "HELLOOOO"
	console.log(theButton)
}
function resetGame(){
	var theButton = document.getElementById("movingButton")
	console.log("Resetting")
	theButton.removeEventListener("click", resetGame)
	theButton.addEventListener("click", gameWon)
	theButton.innerHTML = " Click Me "
	console.log(theButton)
}