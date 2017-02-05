'use strict'

/*
* This function will do canvas.getContext, in addition to all the
* other game setup-y stuff, before returning an object that lets us
* call various subfunctions we create in here
*/
var createGame = function(canvas) { 
    let c = canvas.getContext("2d");
   	let shipImg = document.getElementById("spaceShip");

   	//Adjusted y by hand to just look nice - it stays constant
   	let ship = {canvasX: 0, canvasY: 20}

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
   		let bounds = canvas.getBoundingClientRect();
   		//Canvas coordinate movement scales differently from the
   		//mouse coordinate movement unfortunately :/
   		console.log(bounds)
		console.log("Go ship!");
		var drawShip = function(event) {
			//clear current ship position

			//if ship is farther than a set amount from the mouse, start
			//moving it closer to the mouse (slowly!)
			let cutoff = 3
			if ((event.clientX - bounds.left + cutoff) > ship.canvasX) {
				ship.canvasX = ship.canvasX + 1;
			} else if ((event.clientX - bounds.left - cutoff) < ship.canvasX) {
				ship.canvasX = ship.canvasX - 1;
			} else {
				//TODO - nothing?
				console.log("Don't need to update yet")	
			}
			c.drawImage(shipImg, ship.canvasX, 135, 35, 15);
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
