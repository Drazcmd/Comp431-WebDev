'use strict';

const random = (min=0, max=800) =>
    Math.random() * (max - min) + min
/*
* This function will do canvas.getContext, in addition to all the
* other game setup-y stuff, before returning an object that lets us
* call various subfunctions we create in here
*/
var createGame = function(canvas) { 
    let c = canvas.getContext("2d");
   	let shipImg = document.getElementById("spaceShip");
   	let normalNyanImage = document.getElementById("normalNyanImage");
   	let padding = 2;
   	let baseMovementDown = 50.0;

   	var defaultCat = ({
   		canvasX = -1,
   		canvasY = -1,
   		//No constant (non-jumps) vertical velocities - only horizontal
   		baseVelocity = 1,
   		width = 128,
   		height = 128
  	} = {}) => {
  		return {canvasX, canvasY, baseVelocity, width, height}
  	}

  	//I spaced these by hand to look decent
   	let rowStartingCanvasX = [30, 180, 330]
   	let rowStartingCanvasY = [30, 180, 330]

   	var defaultCatRow = rowStartingCanvasY.map(startingY => {
   		return rowStartingCanvasX.map(startingX => {
   			return defaultCat({
   				canvasX: startingX, 
   				canvasY: startingY
   			});
   		});
   	});

   	//Basically just used when our ship fires a laser
   	var defaultLaser = function() {
   		return  { 
   			canvasX: -1, canvasY: -1, chargingLaser: false,
   			width: 2, height: 5, laserRefreshRate: 5, moveSpeed: 3
   		}
   	}

   	//Affects speed increases, choice of cat image used for cats, and music
   	let difficultyValues = {level: 0, speedIncrease: 0.0};

   	//We'll be storing these as browser cookies
 	let stats = {
 		"Attempted Shots While Charging Laser": 0,
 		"Fired Lasers": 0,
 		"Game Pause Count": 0
 	}

   	//Adjusted values by hand to just look nice - only x changes, ship will
   	//always be 10 pixels above the bottom of the canvas
   	let ship = {
   		canvasX: canvas.width/2, canvasY: canvas.height - 20, width: 50, height:15
   	}

   	//These IDs are needed to grab the HTML5 audio elements
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
	var click = function(event) {
		Object.entries(stats).forEach((entry) => {console.log(entry)})
		console.log("\n")
		if (!shipLaser.chargingLaser) {
			shipFires()
		} else {
			stats["Attempted Shots While Charging Laser"] += 1;
		}
	}

   	var collisionOccurred = function(nonCatBoundaries) {
   		//Save some cycles by computing ship/ship laser's boundaries once :)
   		return catRows.some(function (row) {
   			return row.some(function (cat) {
   				return collidedWithCat(getBoundaries(cat), nonCatBoundaries)
   			})
   		})
   	}
   	var collidedWithCat = function(nonCatBoundaries, catBoundaries) {
		return !(nonCatBoundaries.leftBoundary > catBoundaries.rightBoundary ||
			nonCatBoundaries.rightBoundary < catBoundaries.leftBoundary ||
			nonCatBoundaries.topBoundary > catBoundaries.botBoundary ||
			nonCatBoundaries.botBoundary < catBoundaries.topBoundary)
   	}

   	var getBoundaries = function(movingObject){
		let leftBoundary = movingObject.canvasX;
		let rightBoundary = movingObject.canvasX +
		 					movingObject.width;
		let topBoundary = movingObject.canvasY;
		let botBoundary = movingObject.canvasY +
		 					movingObject.height;
		return {leftBoundary, rightBoundary, topBoundary, botBoundary}

   	}
	var shipFires = function() {
 		stats["Fired Lasers"] += 1
		shipLaser.chargingLaser = true;

		//So it shoots from center top of the ship
		shipLaser.canvasX = ship.canvasX + ship.width / 2;
		shipLaser.canvasY = ship.canvasY - ship.height;
		var moveShipFire = function() {
			clearImage(shipLaser)
			var didNotCollide = function(cat) {
				console.log(cat)
				console.log(shipLaser)
				return !(collidedWithCat(getBoundaries(shipLaser), getBoundaries(cat)));
			}

			let newCatRows = catRows.map(row => {
				return (row.filter(didNotCollide));
			});

			shipLaser.canvasY -= shipLaser.moveSpeed;
			//Draw the bullet itself

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
			canvasX - padding, canvasY - padding,
			width + padding * 2, height + padding * 2
		)
		c.stroke();
	}

	var increaseDifficulty = function() {
		console.log("Let's ramp it up!")
		loadNextAudio()
		difficultyValues.level += 1;
		difficultyValues.speedIncrease += 1;
	}
	//Enemy attacks
	var nyanFire = function() {
		console.log("NYANs ARE ATTACKING?");
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

		//We want the ship's center to be near the mouse, but the 
		//drawImage draws from the top left corner. This nudges it a little
		const recenter = ship.width / 2;

		//Update the ships location
		ship.canvasX = event.clientX - canvas.offsetLeft - recenter;

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

	var beginGame = function(event){
	    canvas.addEventListener("mousedown", click, false);
	    canvas.addEventListener("mouseenter", resumeGame, false);
	    canvas.addEventListener("mouseout", pauseGame, false);
	    drawShip(event)
	   	resumeGame()
	   	 
		console.log("It's a new beginning!")
    	canvas.removeEventListener("mousedown", beginGame, false)	
	}

	var updateCats = function() {
		//If our update is a no-op, stays the same object
		let updatedCats = catRows;
		let moveAllDown = function(catRows) {
			return catRows.map(row => {
				return row.map(cat => {
					return defaultCat({
				   		canvasX: cat.canvasX,
				   		canvasY: cat.canvasY + baseMovementDown,
				   		//this helps make later calculations easier
				   		baseVelocity: cat.baseVelocity * -1,
					})
				});
			});
		};

		if (mustMoveDown(catRows)) {
			updatedCats = moveAllDown()
		}

		updatedCats = updatedCats.map(row => {
			return row.map(cat => {
				//second line allows for increasing difficulty on the fly :)
				let newCanvasX = cat.canvasX + cat.baseVelocity +
							difficultyValues.speedIncrease;
				//Don't need to worry about hitting the sides since
				//moveAllDown takes care of flipping the velocity
				let movedCat = defaultCat({
			   		canvasX: newCanvasX,
			   		canvasY: cat.canvasY,
			   		baseVelocity: cat.baseVelocity,
				})
			});
		});
	}

	//Need to move all rows down if any ship on any side reaches
	//the boundaries of the canvas
	var mustMoveDown = function() {
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
    	beginGame: beginGame,
    	loadNextAudio: loadNextAudio,
		increaseDifficulty: increaseDifficulty,
		defaultLaser: defaultLaser,
		defaultCatRow: defaultCatRow,
		updateCats: updateCats,
		updateShipFire: updateShipFire
   	}
}

// More or less from provided in-class solution 
const frameUpdate = (cb) => {
    const rAF = (time) => {
        requestAnimationFrame(rAF)
        const diff = ~~(time - (rAF.lastTime || 0)) // ~~ is like floor
        cb(diff)
        rAF.lastTime = time
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
   	let catRows = [
   		game.defaultCatRow(30),
   		game.defaultCatRow(175),
   		game.defaultCatRow(300)
   	]
   	//We only allow player to have one laser firing, as is traditional,
   	//which means there'd be no reason to make this an array (same for ships)
   	let shipLaser = game.defaultLaser()

    canvas.addEventListener("mousedown", game.beginGame, false);
    frameUpdate(() => {
    	/*Basically all my view code (except for the spaceship)
    	since no acceleration and basically constant velocities, 
    	decided it'd just be easier to do away with the time variable

    	First I update the cats lcoations, then update the laser,
    	putting in the catRows as a variable so that I can check if
    	the laser is colliding with anything
    	*/
	    catRows = game.updateCats(catRows)
	    laser = game.updateShipFire(catRows)

	    //Now we can draw everything after we wipe the whole canvas :)
	    c.fillStyle = '#000'
        c.fillRect(0, 0, canvas.width, canvas.height)

        catRows.forEach(row => {
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
		c.lineWidth = shipLaser.width;
		c.strokeStyle = "green";
		c.rect(
			shipLaser.canvasX, shipLaser.canvasY,
			shipLaser.width, shipLaser.height
		);
		c.stroke();
    })
    setTimeout(game.increaseDifficulty, 4000)
}
