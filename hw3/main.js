'use strict'

/*
* This function will do canvas.getContext, in addition to all the
* other game setup-y stuff, before returning an object that lets us
* call various subfunctions we create in here
*/
var createGame = function(canvas) { 
    let c = canvas.getContext("2d");
   	let shipImg = document.getElementById("spaceShip");

   	//Adjusted values by hand to just look nice - only x changes
   	let ship = {canvasX: 0, canvasY: 133, width: 35, hight:15}

	//Click and your spaceship will shoot!
	let click = function(event) {
		console.log("I'm a firin' mah lasah!");
	}

	//Enemy attacks
	var nyanFire = function() {
		console.log("NYANs ARE ATTACKING?");
		console.log(ship);
	}


	var beginGame = function(){
		console.log("It's a new beginning!")
	}


	// Ship tracks cursor's x coordinate (y stays the same)
	var drawShip = function(event) {
		//Goal of this is to clear the last drawn image of the ship
		c.clearRect(ship.canvasX, ship.canvasY, ship.width, ship.hight)

		//The canvas mouse coordinates doesn't increase by the same magnitude 
		//s you move your mouse across the scaling -_-
		const rescale = 0.7

		//We want the ship's center to be near the mouse, but the 
		//drawImage draws from the top left corner. This nudges it a little
		let recenter = ship.width / 3

		//Update the ships location
		let scaledClientX = rescale * event.clientX
		ship.canvasX = scaledClientX - canvas.offsetLeft - recenter;

		//Now finally draw the ship at the new location
		c.drawImage(shipImg, ship.canvasX, ship.canvasY, ship.width, ship.hight);
	} 


	var resumeGame = function(event) {
		console.log("Go ship!");
		canvas.addEventListener("mousemove", drawShip, false);
	}
	var pauseGame = function(event) {
		console.log("Stop ship!");
		canvas.removeEventListener("mousemove", drawShip, false);
	}

    return {
    	click: click,
    	nyanFire: nyanFire,
    	resumeGame: resumeGame,
    	pauseGame: pauseGame,
    	beginGame: beginGame
    }
}



// More or less from provided in-class 6 solution 
window.onload = function() {
	// This is before we've called canvas.getContext,
	// so it can't actually 'do' anything atm.
    var canvas = document.getElementById("gameCanvas");

    // "game" is an object literal that uses closures to let us call any
    // of the functions we set up in createGame.
    var game = createGame(canvas);
    canvas.addEventListener("mousedown", game.click, false);
    canvas.addEventListener("mouseenter", game.resumeGame, false);
    canvas.addEventListener("mouseout", game.pauseGame, false);
    game.beginGame()
}
