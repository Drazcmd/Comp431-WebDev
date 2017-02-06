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
   	//IDs needed to grab the HTML5 audio elements
   	let audioTrackIds = [
   		"jazzNyan",
   		"normalNyan"
   	]
   	//Needed so I can play/pause sounds without knowing which audio 
   	//element is currently playing
	let sounds = {
		//To avoid hurting peoples' ears :)
		normalVolume: 0.5,
		quietVolume: 0.075,
		background: document.getElementById(audioTrackIds[0])
	}
	sounds.background.volume = sounds.normalVolume;

    /*
    Odd syntax, but this actually is the best way to get back an iterable
   	of an array's elements. We slice off the 0th index to avoid playing it
   	twice (given that we defined background to start as it by default)
   	*/
   	let songsIter = audioTrackIds.slice(1)[Symbol.iterator]();


	//Click and your spaceship will shoot!
	let click = function(event) {
		shipFires()
		//TODO - take next line out (just for testing)
		increaseDifficulty()
	}

	var increaseDifficulty = function() {
		console.log("Let's ramp it up!")
		loadNextAudio()
	}
	
	var shipFires = function() {
		console.log("I'm a firin' mah lasah!");
	}	

	//Enemy attacks
	var nyanFire = function() {
		console.log("NYANs ARE ATTACKING?");
		console.log(ship);
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
		const recenter = ship.width / 3

		//Update the ships location
		let scaledClientX = rescale * event.clientX
		ship.canvasX = scaledClientX - canvas.offsetLeft - recenter;

		//Now finally draw the ship at the new location
		c.drawImage(shipImg, ship.canvasX, ship.canvasY, ship.width, ship.hight);
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
		sounds.background.volume = sounds.normalVolume;

		//special casing a couple because THEY ARE REALLY LOUD
		if (nextTrackId === "normalNyan"){
			sounds.background.volume = sounds.quietVolume;
		}
		sounds.background.play()	
	}

	var beginGame = function(){
		console.log("It's a new beginning!")	
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
