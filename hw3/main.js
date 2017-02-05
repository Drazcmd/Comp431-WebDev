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
   	let ship = {canvasX: 0, canvasY: 20, width: 35, hight:15}

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

	// Moves towards the x coordinate of cursor (y stays the same)
	var shipFollowsCursor = function(event) {
   		//Canvas coordinate movement scales differently from the
   		//mouse coordinate movement unfortunately :/
		console.log("Go ship!");
		var drawShip = function(event) {
			//current ship position is at ship.canvasX
			//TODO - clear image	

			//The canvas scaling doesn't match up with the browser scaling -_-
			const rescale = 0.7
			let scaledClientX = rescale * event.clientX

			//We want the ship's center to be near the mouse, but the 
			//drawImage draws from the top left corner. This nudges it a little
			let recenter = ship.width / 3

			ship.canvasX = scaledClientX - canvas.offsetLeft - recenter;
			c.drawImage(shipImg, ship.canvasX, 135, ship.width, ship.hight);
			console.log("hi");
		} 
		canvas.addEventListener("mousemove", drawShip, false);
	}
	var shipStaysStill = function(event) {
		console.log("Stop ship!");
	}


    return {
    	click: click,
    	nyanFire: nyanFire,
    	shipFollowsCursor: shipFollowsCursor,
    	shipStaysStill: shipStaysStill,
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
    canvas.addEventListener("mouseenter", game.shipFollowsCursor, false);
    canvas.addEventListener("mouseout", game.shipStaysStill, false);
    game.beginGame()
}
