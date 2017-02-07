'use strict'

/*
* This function will do canvas.getContext, in addition to all the
* other game setup-y stuff, before returning an object that lets us
* call various subfunctions we create in here
*/
var createGame = function(canvas) { 
    let c = canvas.getContext("2d");
   	let shipImg = document.getElementById("spaceShip");
   	let normalNyanImage = document.getElementById("normalNyanImage")

   	//Adjusted values by hand to just look nice - only x changes, ship will
   	//always be 10 pixels above the bottom of the canvas
   	let ship = {
   		canvasX: 0, canvasY: canvas.height - 20, width: 50, height:15
   	}
   	//actual sprite size is ~ 420x210 I think
   	const LEFT = 0;
   	const RIGHT = 1;
   	let cats = [
   		{canvasX: 10, canvasY: 30, width: 125, height:76, dir: LEFT},
   		{canvasX: 90, canvasY: 30, width: 64, height:32, dir: LEFT},
   		{canvasX: 170, canvasY: 30, width: 64, height:32, dir: LEFT},
   	]

   	//We only allow player to have one laser firing, as is traditional
   	let shipLaser = {
   		canvasX: -1, canvasY: -1, chargingLaser: false,
   		width: 2, height: 5, laserRefreshRate: 5, moveSpeed: 3
   	}

   	//IDs needed to grab the HTML5 audio elements
   	let audioTrackIds = [
   		"jazzNyan",
   		"normalNyan"
   	]

   	//Needed so I can play/pause/adjust the volume of sounds without 
   	//knowing which audio element is currently playing
	let sounds = {
		normalVolume: 0.5,
		quietVolume: 0.075,
		background: document.getElementById(audioTrackIds[0])
	}

	//Set the default volumes to avoid melting eardrums :p
	audioTrackIds.forEach(function(trackId){
		//special casing because this one is REALLY LOUD
		if (trackId === "normalNyan"){
			document.getElementById(trackId).volume = sounds.quietVolume
		} else {
			document.getElementById(trackId).volume = sounds.normalVolume
		}
	})

    /*
    Odd syntax, but this actually is the best way to get back an iterable
   	of an array's elements. We slice off the 0th index to avoid playing it
   	twice (given that we defined background to start as it by default)
   	*/
   	let songsIter = audioTrackIds.slice(1)[Symbol.iterator]();
	var click = function(event) {
		if (!shipLaser.chargingLaser) {
			shipFires()
		} else {
			console.log(shipLaser.chargingLaser)
		}
	}

	var shipFires = function() {
		shipLaser.chargingLaser = true;

		//So it shoots from center top of the ship
		shipLaser.canvasX = ship.canvasX + ship.width / 2;
		shipLaser.canvasY = ship.canvasY - ship.height;
		var moveShipFire = function() {
			clearImage(shipLaser)

			//Remember, -1 means upwards, +1 means downwards
			shipLaser.canvasY -= shipLaser.moveSpeed;

			//Draw the bullet itself
			c.beginPath();
			c.lineWidth = shipLaser.width;
			c.strokeStyle = "green";
			c.rect(
				shipLaser.canvasX, shipLaser.canvasY,
				shipLaser.width, shipLaser.height
			);
			c.stroke();

			//Check when we reach near the top of the canvas (y=0)
			if (shipLaser.canvasY <= 1) {
				clearInterval(laserInterval)
				shipLaser.chargingLaser = false;
				clearImage(shipLaser)
			}

		}
		shipLaser.chargingLaser = true;
		let laserInterval = setInterval(moveShipFire, shipLaser.laserRefreshRate)
	}	
	
	//Needed to clear the last drawn image of things 
	var clearImage = function({canvasX, canvasY, width, height}){
		c.beginPath();
		c.strokeWidth = width + 2;
		c.strokeStyle = "white";
		/*
		Note the constants that fudge the bounds of the rectangle; we can't
		use what the drawn image's bounds are exactly due to canvas weirdness
		that sometimes leaves behind pixels
		*/
		c.clearRect(
			canvasX - 2, canvasY - 2,
			width + 4, height + 4
		)
		c.stroke();
	}

	var increaseDifficulty = function() {
		console.log("Let's ramp it up!")
		loadNextAudio()
	}
	//Enemy attacks
	var nyanFire = function() {
		console.log("NYANs ARE ATTACKING?");
		console.log(ship);
	}

	var drawCat = function(cat){
		clearImage(cat)	
		//Now finally draw the ship at the new location
		c.drawImage(
			normalNyanImage, cat.canvasX, cat.canvasY,
			cat.width, cat.height
		);
	}


	// Ship tracks cursor's x coordinate (y stays the same)
	var drawShip = function(event) {
		clearImage(ship)

		//The canvas mouse coordinates doesn't increase by the same magnitude 
		//s you move your mouse across the scaling -_-
		const rescale = 1.0;

		//We want the ship's center to be near the mouse, but the 
		//drawImage draws from the top left corner. This nudges it a little
		const recenter = ship.width / 2;

		//Update the ships location
		let scaledClientX = rescale * event.clientX;
		ship.canvasX = scaledClientX - canvas.offsetLeft - recenter;

		//Now finally draw the ship at the new location
		c.drawImage(
			shipImg, 
			ship.canvasX, ship.canvasY,
			ship.width, ship.height
		);
	} 

	var loadNextAudio = function() {
		//Must pause currently playing audio first so as to avoid overlapping
		sounds.background.pause();

		//Decided to just keep playing last track if we go through them all
		var nextTrackId = audioTrackIds[audioTrackIds.length - 1];
		let nextElement = songsIter.next();
		if (nextElement.value) {
			nextTrackId = nextElement.value
		} 
		sounds.background = document.getElementById(nextTrackId)
		sounds.background.play()	
	}

	var beginGame = function(){
	    canvas.addEventListener("mousedown", click, false);
	    canvas.addEventListener("mouseenter", resumeGame, false);
	    canvas.addEventListener("mouseout", pauseGame, false);
	   	resumeGame()
	   	 
		console.log("It's a new beginning!")
    	canvas.removeEventListener("mousedown", beginGame, false);
    	// make a wrapper and return this entire thing
    	// then we can assign the returned interval to some object
    	// maybe some sort of 'moveable' thing? idk
		let catsMoving = cats.map(function (cat) {
 			return setInterval(() => {
				clearImage(cat)	
 				if (cat.canvasX <= 0){
 					cat.canvasY += cat.height;
 					cat.dir = Math.abs(cat.dir - 1);
 					cat.canvasX = 10;
 				} else if (cat.canvasX + cat.width >= canvas.width) {
 					cat.canvasY += cat.height;
 					cat.dir = Math.abs(cat.dir - 1);
 					cat.canvasX = canvas.width - 10 - cat.width;
 				}
 				if (cat.dir == RIGHT){
 					cat.canvasX += 0.1;
 				} else {
 					cat.canvasX -= 0.1;
 				}
 				drawCat(cat);
 			}, 2);
		})
	}
	var resumeGame = function(event) {
		console.log("Go ship!");
		canvas.addEventListener("mousemove", drawShip, false);
		sounds.background.play()
		//cats.moveAgain()
	}
	var pauseGame = function(event) {
		console.log("Stop ship!");
		canvas.removeEventListener("mousemove", drawShip, false);
		sounds.background.pause()
		//cats.stopMoving()
	}
    return {
    	click: click,
    	nyanFire: nyanFire,
    	resumeGame: resumeGame,
    	pauseGame: pauseGame,
    	beginGame: beginGame,
    	loadNextAudio: loadNextAudio
   	}
}



// More or less from provided in-class 6 solution 
window.onload = function() {
	// This is before we've called canvas.getContext,
	// so it can't actually 'do' anything atm.
    var canvas = document.getElementById("gameCanvas");

    //This is the RESOLUTION, not the display size 
    //(that's controld through the style)
    canvas.width = "600";
    canvas.height = "700";

    // "game" is an object literal that uses closures to let us call any
    // of the functions we set up in createGame.
    var game = createGame(canvas);
    canvas.addEventListener("mousedown", game.beginGame, false);
}
