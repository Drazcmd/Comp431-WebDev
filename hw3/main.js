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
   		canvasX: 0, canvasY: canvas.height - 10, width: 20, height:5
   	}
   	let cats = [
   		{canvasX: 0, canvasY: 30, width: 70, height:35},
   		{canvasX: 80, canvasY: 30, width: 70, height:35},
   		{canvasX: 160, canvasY: 30, width: 70, height:35}
   	]

   	//We only allow player to have one laser firing, as is traditional
   	let shipLaser = {
   		canvasX: -1, canvasY: -1, chargingLaser: false,
   		width: 1, height: 3, laserRefreshRate: 3
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

		//width and height decided by hand to look 'good'
		shipLaser.canvasX = ship.canvasX + ship.width / 2;
		shipLaser.canvasY = ship.canvasY - ship.height;
		var moveShipFire = function() {
			clearImage(shipLaser)

			//Remember, -1 means upwards, +1 means downwards
			shipLaser.canvasY -= 1;

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
		c.strokeWidth = width;
		c.strokeStyle = "white";
		/*
		Note the constants that fudge the bounds of the rectangle; we can't
		use what the drawn image's bounds are exactly due to canvas weirdness
		that sometimes leaves behind pixels
		*/
		c.clearRect(
			canvasX - 1, canvasY - 1,
			width + 2, height + 2
		);
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
		const rescale = 0.5

		//We want the ship's center to be near the mouse, but the 
		//drawImage draws from the top left corner. This nudges it a little
		const recenter = ship.width / 3

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
		console.log("It's a new beginning!")
		cats.forEach(function (cat) {
 			setInterval(() => {
 				drawCat(cat);
 				cat.canvasY += 0.05;
 			}, 1);
		})
	}
	var resumeGame = function(event) {
		console.log("Go ship!");
		canvas.addEventListener("mousemove", drawShip, false);
		sounds.background.play()
	}
	var pauseGame = function(event) {
		console.log("Stop ship!");
		canvas.removeEventListener("mousemove", drawShip, false);
		sounds.background.pause()
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

    // "game" is an object literal that uses closures to let us call any
    // of the functions we set up in createGame.
    var game = createGame(canvas);
    canvas.addEventListener("mousedown", game.click, false);
    canvas.addEventListener("mouseenter", game.resumeGame, false);
    canvas.addEventListener("mouseout", game.pauseGame, false);
    game.beginGame()
}
