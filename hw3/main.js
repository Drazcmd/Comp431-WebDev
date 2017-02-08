'use strict';

var createGame = function(canvas) { 
    let c = canvas.getContext("2d");
    var getContext = function() {
    	return c
    }
   	let shipImg = document.getElementById("spaceShip");
   	let normalNyanImage = document.getElementById("normalNyanImage");

  	//I spaced these by hand to look decent
   	//let rowStartingCanvasY = [31, 111, 191, 271]
   	//let rowStartingCanvasX = [30, 120, 210, 300, 390, 480]
   	let rowStartingCanvasY = [31, 111]
   	let rowStartingCanvasX = [30, 120]
   	let padding = 2;
   	let baseMovementDown = 10.0;

   	/* Only posisble to have one at a time, so I decided to just make
   	the user's spaceship a static object that gets mutated as a result 
   	of the mousemove events. Note that only the ship's X position changes 
   	- the ship will always be 20 pixels above the bottom of the canvas
   	(20 was chosen arbitrarily just because it looks nice that way)

   	Also, we need width/height defined here rather than the CSS
   	because it makes it a lot easier to draw the images on the canas
   	and do collision detection/draw the laser it shoots out
   	*/
   	let ship = {
   		canvasX: canvas.width/2, canvasY: canvas.height - 20, 
   		width: 50, height:15, waitingToFire: false
   	}

   	//looks nicer to start off in middle if we don't know mouse pos
   	let clientX = canvas.width/2;

   	//We will be getting events independantly of when we wish to draw
   	var updateClientX = function(event){
   		console.log("update client x")
   		clientX = event.clientX;
   	}

   	//Affects speed increases, choice of cat image used for cats, 
   	//and music. This will be a static object we mutate
   	let difficultyValues = {level: 0, speedIncrease: 1.0};

   	//We'll be storing these as browser cookies. Also static
 	let stats = {
 		"Attempted Shots While Charging Laser": 0,
 		"Fired Lasers": 0,
 		"Game Pause Count": 0,
 		"Rounds Won": 0
 	}

   	//These IDs are needed to grab the HTML5 audio elements
   	let audioTrackIds = [
   		"jazzNyan",
   		"normalNyan"
   	]

   	//Plan to automatically switch images based on difficulty level
   	var getCurrentNyanImage = function() {
   		return normalNyanImage;
   	}

   	var defaultCat = ({
   		canvasX = -1,
   		canvasY = -1,
   		//No constant (non-jumps) vertical velocities - only horizontal
   		baseVelocity = 1.5,
   		width = 64,
   		height = 64
   	} = {}) => {
  		return {canvasX, canvasY, baseVelocity, width, height}
  	}

   	var defaultCatRows = function() {
   		return rowStartingCanvasY.map(startingY => {
	   		return rowStartingCanvasX.map(startingX => {
	   			return defaultCat({
	   				canvasX: startingX, 
	   				canvasY: startingY
	   			});
	   		});
	   	});
   	};

   	//Basically just used when our ship fires a laser
   	var defaultLaser = function() {
   		return  { 
   			canvasX: -1, canvasY: 1, chargingLaser: false,
   			width: 2, height: 5, velocity: 3.0
   		}
   	}

   	//Needed so I can play/pause/adjust the volume of sounds without 
   	//knowing which audio element is currently playing
	let sounds = {
		normalVolume: 0.5,
		quietVolume: 0.075,
		background: document.getElementById(audioTrackIds[0])
	}

	//I'm setting the default volumes so I avoid melting eardrums :p
	audioTrackIds.forEach(function(trackId){
		//special casing to further reduce because this one is REALLY LOUD
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

   	var processMouseClick = function(laser) {
   		if (ship.waitingToFire) {
   			console.log("Tryin to fire!");
   			ship.waitingToFire = false;
   			return shipAttemptsFiring(laser)
   		} else {
   			return laser
   		}
   	}
   	var click = function(event){
   		console.log("clicked")
   		if (ship.waitingToFire) {
			stats["Attempted Shots While Charging Laser"] += 1;
   		} else {
   			console.log("now waiting to fire")
   			ship.waitingToFire = true;
   		}
   	}

   	var collidedWithCat = function(nonCatBoundaries, catBoundaries) {
		return !(nonCatBoundaries.leftBoundary > catBoundaries.rightBoundary ||
			nonCatBoundaries.rightBoundary < catBoundaries.leftBoundary ||
			nonCatBoundaries.topBoundary > catBoundaries.botBoundary ||
			nonCatBoundaries.botBoundary < catBoundaries.topBoundary)
   	}

   	var getBoundaries = function(movingObject) {
		let leftBoundary = movingObject.canvasX;
		let rightBoundary = movingObject.canvasX +
		 					movingObject.width;
		let topBoundary = movingObject.canvasY;
		let botBoundary = movingObject.canvasY +
		 					movingObject.height;
		return {leftBoundary, rightBoundary, topBoundary, botBoundary}

   	}

   	var updateShipFire = function(laser) {
   		//I don't handle collisions till after moving it
		let updatedLaser = defaultLaser();
		updatedLaser.canvasX = laser.canvasX;
		if (laser.canvasY > 0) {
			updatedLaser.canvasY = laser.canvasY - laser.velocity;
			updatedLaser.chargingLaser = true;
		} else {
			updatedLaser.velocity = 0;
		}
		return updatedLaser
   	}

   	//AKA handler collisions between a laser and a cat
   	var updateLaserCat = function(laser, catRows) {
   		//update the result of the laser moving, first of all
   		let updatedLaser = defaultLaser();
		updatedLaser.chargingLaser = laser.chargingLaser;
		updatedLaser.canvasX = laser.canvasX;
		updatedLaser.canvasY = laser.canvasY;
		let laserBoundaries = getBoundaries(updatedLaser)

		var noCollision = function(cat){
			let catBoundaries = getBoundaries(cat)
			return !collidedWithCat(laserBoundaries, catBoundaries)
		}
		let updatedCatRows = catRows.map(row => {
   			return row.filter(noCollision)
   		});

		//lastly, if there was a collision, we still haven't updated
		//the laser to the result of the collision
		if (catRows.some(row => {
			return (row.some(cat => {
				let catBoundaries = getBoundaries(cat)
				return (collidedWithCat(laserBoundaries, catBoundaries));
			}));
		})) {
			var finalizedLaser = defaultLaser();
		} else {
			var finalizedLaser = updatedLaser;
		}	
   		return [finalizedLaser, updatedCatRows]
   	}

   	var shipAttemptsFiring = function(laser) {
   		console.log("Attempting fire now...")
		if (laser.chargingLaser) {
			console.log("... but is still charging")
			//can't give back a new laser - this laser's running atm
			stats["Attempted Shots While Charging Laser"] += 1;
			return laser;
		} else {
			console.log("and succeeded")
			stats["Fired Lasers"] += 1;
			//Looks nicer if we adjust where the laser shoots out from
			//(remember, canvas places images by their top left corner)
			let newLaser = defaultLaser();
			newLaser.canvasX = ship.canvasX + ship.width / 2;
			newLaser.canvasY = ship.canvasY - ship.height / 2;
			newLaser.chargingLaser = true;
			return newLaser;
		}
	}	
	
	var increaseDifficulty = function() {
		console.log("Let's ramp it up!")
		loadNextAudio()
		difficultyValues.level += 1;
		difficultyValues.speedIncrease += 0.333;
	}
	//Enemy attacks
	var nyanFire = function() {
		console.log("NYANs ARE ATTACKING?");
	}

	// Ship tracks cursor's x coordinate (y stays the same)
	var drawShip = function() {
		//We want the ship's center to be near the mouse, but the 
		//drawImage draws from the top left corner. This nudges it a little
		const recenter = ship.width / 2;

		//Update the ships location
		ship.canvasX = clientX - canvas.offsetLeft - recenter;

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

	var updateCats = function(catRows) {
		//If our update is a no-op, stays the same object
		let updatedCats = catRows;
		var moveAllDown = function(catRows) {
			return catRows.map(row => {
				return row.map(cat => {
					let adjustedCat = defaultCat({
						//want to make sure it doesn't double trigger on accident
				   		canvasX: cat.canvasX - (cat.baseVelocity * padding),
				   		canvasY: cat.canvasY + baseMovementDown,
				   		//this helps make later calculations easier
				   		baseVelocity: -1 * cat.baseVelocity 
					});
					return adjustedCat;
				});
			});
		};
		if (mustMoveDown(catRows)) {
			updatedCats = moveAllDown(updatedCats)
		}
		//we can do the horizontal movement completely separately :)	
		let updatedCats2 = updatedCats.map(row => {
			return row.map(cat => {
				//second line allows for increasing difficulty on the fly :)
				let newCanvasX = cat.canvasX + (cat.baseVelocity *
							difficultyValues.speedIncrease);
				//Don't need to worry about hitting the sides since
				//moveAllDown takes care of flipping the velocity
				let movedCat = defaultCat({
			   		canvasX: newCanvasX,
			   		canvasY: cat.canvasY,
			   		baseVelocity: cat.baseVelocity,
				})
				return movedCat;
			});
		});
		return updatedCats2;
	}

	//Need to move all rows down if any ship on any side reaches
	//the boundaries of the canvas
	var mustMoveDown = function(catRows) {
		return catRows.some(row => {
			//Obviously, an empty row shouldn't be moving us down. This
			//helps since we can now assume there's entries on the ends
			if (row.length == 0){
				return false
			}
			//Works because canvasX is the leftmost point of the image
			//Note I left out a '0' in the math (canvas x starts at 0)
			let catFarLeft = row[0].canvasX - padding;
			let catFarRight = row[row.length - 1].canvasX +
			 				  row[row.length - 1].width + padding
			return (catFarLeft <= 0 || catFarRight >= canvas.width)
		});
	};

	var allCatsDied = function(catRows) {
		return catRows.every(row => {
			return (row.length == 0 || row.every(cat => {!(cat)}))
		});
	}
	var moveToNextRound = function(catRows) {
		stats["Rounds Won"] += 1;
		let displayedScore = document.getElementById("roundsWon");
		console.log(displayedScore);
		displayedScore.innerHTML = stats["Rounds Won"];
		increaseDifficulty();
		return defaultCatRows();
	}

	//These are both related to mouse events, so I decided to do
	//them automatically independant of the standard frameupdate
	var resumeGame = function(event) {
		console.log("GAME RESUMED");
		canvas.addEventListener("mousemove", drawShip, false);
		sounds.background.play()
		//catRows.moveAgain()
	}
	var pauseGame = function(event) {
		stats["Game Pause Count"] += 1;
		console.log("GAME PAUSED");
		canvas.removeEventListener("mousemove", drawShip, false);
		sounds.background.pause()
		//catRows.stopMoving()
	}
    return {
    	click: click,
    	resumeGame: resumeGame,
    	pauseGame: pauseGame,
    	loadNextAudio: loadNextAudio,
		increaseDifficulty: increaseDifficulty,
		defaultLaser: defaultLaser,
		defaultCatRows: defaultCatRows,
		updateCats: updateCats,
		updateShipFire: updateShipFire,
		updateLaserCat: updateLaserCat,
		getContext: getContext,
		getCurrentNyanImage: getCurrentNyanImage,
		updateClientX: updateClientX,
		drawShip: drawShip,
		processMouseClick: processMouseClick,
		allCatsDied: allCatsDied,
		moveToNextRound: moveToNextRound	

	}
}


// More or less from provided in-class solution 

const frameUpdate = (callback) => {
    const rAF = (time) => {
        requestAnimationFrame(rAF)
        callback()
    }
    rAF() // go!
}

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
    let c = game.getContext()
   	let catRows = game.defaultCatRows()
   	
   	//We only allow player to have one laser firing, as is traditional,
   	//which means there'd be no reason to make this an array (same for ships)
   	let shipLaser = game.defaultLaser()

	function beginGame(){
	    canvas.addEventListener("mouseenter", game.resumeGame, false);
	    canvas.addEventListener("mouseout", game.pauseGame, false);
	    canvas.addEventListener("mousemove", game.updateClientX, false)
	    canvas.addEventListener("mousedown", game.click, false);
	}
    beginGame()
    frameUpdate(() => {
    	/*
    	The game automatically keeps track of the mouse position for pausing
    	and ship position using events. However, everything else is updated
    	in a functional manner - the game state's not getting mutated, so
    	unless I manually call functions to update stuff it won't get updated
    	*/    		
	    let updatedCatRows = game.updateCats(catRows)
	    let updatedShipLaser = game.updateShipFire(shipLaser)

	    /*
	    Much easier to do this logic separately from the rest AFTER 
	    they've already moved. Sadly js doesn't support easy unpacking 
	    like python
	    */
	    let resultOfLaserCatCollisions = game.updateLaserCat(
	    	updatedShipLaser, updatedCatRows
	    );

	    updatedShipLaser = resultOfLaserCatCollisions[0]
    	updatedShipLaser = game.processMouseClick(updatedShipLaser);
	    updatedCatRows = resultOfLaserCatCollisions[1]

        /*Basically all my view code is below. I decided thatsince no
		acceleration and basically constant velocities, it'd just be 
		easier to do away with the time variable. 

		(Note that clearing individual bits and then redrawing htem 
		is more expensive than wiping the whole canvas and then 
		redrawing each element)*/
	    c.fillStyle = "white"
        c.fillRect(0, 0, canvas.width, canvas.height)

    	game.drawShip()

        updatedCatRows.forEach(row => {
        	row.forEach(cat => {
				c.drawImage(
					normalNyanImage, cat.canvasX, cat.canvasY,
					cat.width, cat.height
				);
        	})
        })
		
		//Looks different than other drawing code because this is
		//not actually a sprite or pre-made image        
		c.beginPath();
		c.lineWidth = updatedShipLaser.width;
		c.strokeStyle = "green";
		c.rect(
			updatedShipLaser.canvasX, updatedShipLaser.canvasY,
			updatedShipLaser.width, updatedShipLaser.height
		);
		c.stroke();

		shipLaser = updatedShipLaser;
		catRows = updatedCatRows;
		if (game.allCatsDied(catRows)) {
			catRows = game.moveToNextRound(catRows);
		}
    })
}