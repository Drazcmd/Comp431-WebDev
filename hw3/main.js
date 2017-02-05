'use strict'

/*
* This function will do canvas.getContext, in addition to all the
* other game setup-y stuff, before returning an object that lets us
* call various subfunctions we create in here
*/
var createGame = function(canvas) { 
    let c = canvas.getContext("2d");
   	var ship = document.getElementById("spaceShip");

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
   		let canvasBoundaries = canvas.getBoundingClientRect();
   		console.log(canvasBoundaries)
		console.log("Go ship!");
		var drawShip = function(event) {
			c.drawImage(ship, event.clientX - canvasBoundaries.left, 135, 35, 15);
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
