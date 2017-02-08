'use strict';

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
   	let baseHorizontalSpeed = 1.0;
   	let rowStartingCanvasX = [10, 150, 300]


   	var defaultCatRow = function(rowCanvasY) {
   		return rowStartingCanvasX.map(defaultX => {
   			return ({canvasY: rowCanvasY, canvasX: defaultX,
   			 dir: LEFT, width: 128, height: 128 });
   		})

   	}
   	//Affects speed increases, choice of cat image used for cats, and music
   	let difficultyValues = {level: 0, speedIncrease: 0.0};

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
   	//actual sprite size is ~ 420x210 I think
   	const LEFT = 0;
   	const RIGHT = 1;
   	var catRows = [
   		defaultCatRow(30),
   		defaultCatRow(175),
   		defaultCatRow(300)
   	]
   	//We only allow player to have one laser firing, as is traditional
   	var shipLaser = {
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
			//something wrong right here I think
			let newCatRows = catRows.map(row => {
				return (row.filter(didNotCollide));
			});
			//gotta make sure old images don't stick around
			catRows.forEach(row => {
				row.forEach(cat => {
					clearImage(cat)
				})
			})
			catRows = newCatRows;
			catRows.forEach(row => {
				row.forEach(cat => {
					drawCat(cat)
				})
			})

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
    	canvas.removeEventListener("mousedown", beginGame, false);
    	setInterval(moveCats, 10)
	}

	var moveCats = function() {
		let moveAllDown = function() {
			catRows.forEach(row => {
				row.forEach(cat => {
					clearImage(cat)	
					cat.canvasY += baseMovementDown
	 				cat.dir = Math.abs(cat.dir - 1);
				})
			});
		};
		if (mustMoveDown()) {
			moveAllDown()
		}
		catRows.forEach(row => {
			row.forEach(cat => {
				clearImage(cat)	
				if (cat.dir == RIGHT){
					cat.canvasX += baseHorizontalSpeed + 
						difficultyValues.speedIncrease;
				} else {
					cat.canvasX -= (baseHorizontalSpeed +
						difficultyValues.speedIncrease);
				}
				drawCat(cat);
			});
		});
	}

	//Need to move all rows down if any ship on any side reaches
	//the boundaries of the canvas
	var mustMoveDown = function() {
		return catRows.some(row => {
			//Obviously, an empty row shouldn't be moving us down
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
    	nyanFire: nyanFire,
    	resumeGame: resumeGame,
    	pauseGame: pauseGame,
    	beginGame: beginGame,
    	loadNextAudio: loadNextAudio,
		moveCats : moveCats,
		increaseDifficulty: increaseDifficulty
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
    setTimeout(game.increaseDifficulty, 4000)
}
