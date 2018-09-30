'use strict';

const createGame = (canvas) => { 
    // ACTUAL CONSTANTS
    // (I spaced these by hand to look decent)
    const rowStartingCanvasY = [31, 111, 191, 271]
    const rowStartingCanvasX = [30, 150, 270, 390]
    const padding = 2;
    const baseMovementDown = 10.0;
    const shipImg = document.getElementById("spaceShip");
    const nyanImageIds = [
        "jazzNyanImage",
        "jacksonNyanImage",
        "americaNyanImage",
        "normalNyanImage",
        "tacNaynImage"
    ];
    // These IDs are needed to grab the HTML5 audio elements
    const audioTrackIds = [
        "jazzSong",
        "jackson5Song",
        "americaSong",
        "normalSong",
        "tacNaynSong"
    ];

    // SET UP THE INPUTTED CANVAS OBJECT
    const c = canvas.getContext("2d");
    const getContext = () => {
    	return c
    };

    // CREATE PRIVATE VARIABLES/OBJECTS TO STORE STATE
    let gamePaused = true;

    // (looks nicer to start off in middle if we don't know mouse pos)
    let clientX = canvas.width / 2;

   	// Affects speed increases, choice of cat image used for cats, 
   	// and music. 
   	const difficultyValues = {level: 0, speedIncrease: 1.0};

   	/* 
    Only posisble to have one at a time, so I decided to just make
   	the user's spaceship a static object that gets mutated as a result 
   	of the mousemove events. Note that only the ship's X position changes 
   	- the ship will always be 20 pixels above the bottom of the canvas
   	(20 was chosen arbitrarily just because it looks nice that way)

   	Also, we need width/height defined here rather than the CSS
   	because it makes it a lot easier to draw the images on the canas
   	and do collision detection/draw the laser it shoots out
   	*/
   	const ship = {
   		canvasX: canvas.width/2, canvasY: canvas.height - 20, 
   		width: 50, height:15, waitingToFire: false
   	};

    // We'll be storing these as browser cookies
    const stats = {
        "RoundsWon": 0,
        "FiredLasers": 0,
        "AttemptedShotsWhileChargingLaser": 0,
        "GamePauseCount": 0,
        "MostRoundsWon" : 0
    };

    // Needed so I can play/pause/adjust the volume of sounds without 
    // knowing which audio element is currently playing
    const sounds = {
        normalVolume: 0.5,
        quietVolume: 0.070,
        background: document.getElementById(audioTrackIds[0])
    };

    // Note how I'm setting the default volumes so I avoid melting eardrums :p
    audioTrackIds.forEach(trackId => {
        //special casing to further reduce because these 2 are REALLY LOUD
        if (trackId === "normalSong" || trackId === "tacNaynSong"){
            document.getElementById(trackId).volume = sounds.quietVolume
        } else {
            document.getElementById(trackId).volume = sounds.normalVolume
        }
    });

    /*
    Odd syntax, but this actually is the best way to get back an iterable
    of an array's elements. We slice off the 0th index to avoid playing it
    twice (given that we defined background to start as it by default)
    */
    const songsIter = audioTrackIds.slice(1)[Symbol.iterator]();

    // VARIOUS 'GAME' FUNCTIONS/METHODS
    // We will be getting events independantly of when we wish to draw
   	const updateClientX = event => {
   		clientX = event.clientX;
   	};

 	const getStats = () => {
 		return stats;
 	};

   	//Lets us automatically switch images based on difficulty level
   	const getCurrentNyanImage = () => {
   		//Reason is that the difficulty level can go higher than the
   		//number of images we have available
   		const safeImageIndex = Math.min(
   			difficultyValues.level, nyanImageIds.length - 1
   		);
   		return document.getElementById(nyanImageIds[safeImageIndex]) ;
   	};

    // Weird syntax, basically just a constructor though
   	const defaultCat = ({
   		canvasX = -1,
   		canvasY = -1,
   		//No constant (non-jumps) vertical velocities - only horizontal
   		baseVelocity = 1.5,
   		width = 72,
   		height = 48
   	} = {}) => {
  		return {canvasX, canvasY, baseVelocity, width, height}
  	};

   	const defaultCatRows = () => {
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
   	const defaultLaser = () => {
   		return  { 
   			canvasX: -1, canvasY: 1, chargingLaser: false,
   			width: 2, height: 5, velocity: 10.0
   		};
   	};

   	const processMouseClick = laser => {
   		if (ship.waitingToFire) {
   			ship.waitingToFire = false;
   			return shipAttemptsFiring(laser);
   		}
   		return laser;
   	};
   	const click = event => {
   		if (ship.waitingToFire) {
			stats["AttemptedShotsWhileChargingLaser"] += 1;
            return;
   		} else {
   			ship.waitingToFire = true;
   		}
   	};

   	const collidedWithCat = (nonCatBoundaries, catBoundaries) => {
		return !(nonCatBoundaries.leftBoundary > catBoundaries.rightBoundary ||
			nonCatBoundaries.rightBoundary < catBoundaries.leftBoundary ||
			nonCatBoundaries.topBoundary > catBoundaries.botBoundary ||
			nonCatBoundaries.botBoundary < catBoundaries.topBoundary)
   	};

   	const getBoundaries = movingObject => {
		let leftBoundary = movingObject.canvasX;
		let rightBoundary = movingObject.canvasX +
		 					movingObject.width;
		let topBoundary = movingObject.canvasY;
		let botBoundary = movingObject.canvasY +
		 					movingObject.height;
		return {leftBoundary, rightBoundary, topBoundary, botBoundary}

   	};

   	const updateShipFire = laser => {
   		if (gamePaused) {
   			return laser;
   		}
   		//I don't handle collisions till after moving it
		let updatedLaser = defaultLaser();
		updatedLaser.canvasX = laser.canvasX;
		if (laser.canvasY >= 0) {
			updatedLaser.canvasY = laser.canvasY - laser.velocity;
			updatedLaser.chargingLaser = laser.chargingLaser;
		} else {
			updatedLaser.chargingLaser = false;
		}
		return updatedLaser
   	};

   	const handleCollisions = (laser, catRows) => {
   		//update the result of the laser moving
   		const updatedLaser = defaultLaser();
		updatedLaser.chargingLaser = laser.chargingLaser;
		updatedLaser.canvasX = laser.canvasX;
		updatedLaser.canvasY = laser.canvasY;

        const laserBoundaries = getBoundaries(updatedLaser);

        // Set up a helper method
		const catInACollision = cat => {
			let catBoundaries = getBoundaries(cat);
			return collidedWithCat(laserBoundaries, catBoundaries);
		};

        // Remove any cats that were hit
		const finalizedCatRows = catRows.map(row => {
   		    return row.filter(cat => !catInACollision(cat));
   		});

        // Check if the laser hit *any* cat, and if so replace it with a
        // non-visible 'newly constructed' laser
		const collisionOccurred = catRows.some(row => {
            return row.some(catInACollision);
        });

		const finalizedLaser = collisionOccurred 
            ? defaultLaser()
            : updatedLaser;

   		return [finalizedLaser, finalizedCatRows];
   	};

   	const shipAttemptsFiring = laser => {
		if (laser.chargingLaser) {
			//can't give back a new laser - this laser's running atm
			stats["AttemptedShotsWhileChargingLaser"] += 1;
			return laser;
		}

		stats["FiredLasers"] += 1;
		//Looks nicer if we adjust where the laser shoots out from
		//(remember, canvas places images by their top left corner)
		let newLaser = defaultLaser();
		newLaser.canvasX = ship.canvasX + ship.width / 2;
		newLaser.canvasY = ship.canvasY - ship.height / 2;
		newLaser.chargingLaser = true;
		return newLaser;
	};
	
	const increaseDifficulty = () => {
		loadNextAudio()
		difficultyValues.level += 1;
		difficultyValues.speedIncrease += 0.333;
	};

	// Ship tracks cursor's x coordinate (y stays the same)
	const drawShip = () => {
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
	};

	const loadNextAudio = () => {
		//Must pause currently playing audio first so as to avoid overlapping
		sounds.background.pause();

		//Decided to just keep playing last track if we go through them all
		let nextTrackId = audioTrackIds[audioTrackIds.length - 1];
		let nextElement = songsIter.next();
		if (nextElement.value) {
			nextTrackId = nextElement.value
		} 
		sounds.background = document.getElementById(nextTrackId)
		sounds.background.play()	
	};

	const updateCats = catRows => {
		if (gamePaused) {
			return catRows;
		}

        /*
        Note how in space invaders they all move downwards together when
        the leftmost or rightmost invader(s) hit the side of the screen
        (and they don't move vertically any other time). So unless they
        have something touching the sides this is a no-op.
        */
        const verticallyUpdated = catsHitSides(catRows)
            ? moveCatsDown(catRows)
            : catRows;

        const fullyUpdated = moveCatsHorizontally(verticallyUpdated);
        return fullyUpdated;
	};

    const catsHitSides = catRows => {
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

    const moveCatsDown = catRows => {
        return catRows.map(row => {
            return row.map(cat => {
                let adjustedCat = defaultCat({
                    //want to make sure it doesn't double trigger on accident
                    canvasX: cat.canvasX - (cat.baseVelocity * padding),
                    canvasY: (cat.canvasY + 
                        baseMovementDown * difficultyValues.speedIncrease),
                    //this helps make later calculations easier
                    baseVelocity: -1 * cat.baseVelocity 
                });
                return adjustedCat;
            });
        });
    };

    const moveCatsHorizontally = catRows => {
        return catRows.map(row => {
            return row.map(cat => {
                // second line allows for increasing difficulty on the fly :)
                let newCanvasX = cat.canvasX + (cat.baseVelocity *
                            difficultyValues.speedIncrease);
                // Don't need to worry about hitting the sides since
                // moveCatsDown takes care of flipping the velocity
                let movedCat = defaultCat({
                    canvasX: newCanvasX,
                    canvasY: cat.canvasY,
                    baseVelocity: cat.baseVelocity,
                })
                return movedCat;
            });
        });
    };

	const allCatsDied = catRows => {
		return catRows.every(row => {
			return (row.length == 0 || row.every(cat => {!(cat)}))
		});
	};

	const moveToNextRound = catRows => {
		stats["RoundsWon"] += 1;
		stats["MostRoundsWon"] = Math.max(
			stats["RoundsWon"], stats["MostRoundsWon"]
		);

		let displayedScore = document.getElementById("roundsWon");
		displayedScore.innerHTML = stats["RoundsWon"];
		increaseDifficulty();
		return defaultCatRows();
	};

	//These are both related to mouse events, so I decided to do
	//them automatically independant of the standard frameupdate
	const resumeGame = event => {
		gamePaused = false;
		canvas.addEventListener("mousemove", drawShip, false);
		sounds.background.play()
	};
	const pauseGame = event => {
		gamePaused = true;
		stats["GamePauseCount"] += 1;
		canvas.removeEventListener("mousemove", drawShip, false);
		sounds.background.pause()
	};

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
		handleCollisions: handleCollisions,
		getContext: getContext,
		getCurrentNyanImage: getCurrentNyanImage,
		updateClientX: updateClientX,
		drawShip: drawShip,
		processMouseClick: processMouseClick,
		allCatsDied: allCatsDied,
		moveToNextRound: moveToNextRound,
		getStats: getStats
	};
};


// More or less from provided in-class solution 
const frameUpdate = (callback) => {
    const rAF = (time) => {
        requestAnimationFrame(rAF)
        callback()
    };
    rAF(); // go!
}

window.onload = () => {
	// This is before we've called canvas.getContext,
	// so it can't actually 'do' anything atm.
    let canvas = document.getElementById("gameCanvas");

    // This is the RESOLUTION, not the display size 
    // (that's controlled through the style)
    canvas.width = "600";
    canvas.height = "700";

    // "game" is an object literal that uses closures to let us call any
    // of the functions we set up in createGame.
    let game = createGame(canvas);
    const c = game.getContext();

    // Show the previous game's statistics from a browser cookie
	Object.keys(game.getStats()).forEach(keyStr => {
		const previousCookieVal = getCookie(keyStr);
		if (previousCookieVal == "") {
			// There was no previous log of this statistic
			return;
		}

		// This one stat alone goes up at the top
		if (keyStr === "RoundsWon"){
			// Unlike the other stats, this is a special div just for the value
			let priorScoreDisplay = document.getElementById("priorScore");
			priorScoreDisplay.innerHTML = previousCookieVal;
		} else {
			let statStr = keyStr + ": " +
				previousCookieVal + "\n" + "<br>"; 

			let displayArea = document.getElementById("priorStatsDisplay");
			displayArea.innerHTML += statStr;

			//This one value needs to carry over between games!
			if (keyStr == "MostRoundsWon"){
				game.getStats()["MostRoundsWon"] = previousCookieVal;
			}
		}
	});

    let catRows = game.defaultCatRows();

    // We only allow player to have one laser firing (as is traditional)
    let shipLaser = game.defaultLaser();

    canvas.addEventListener('mouseenter', game.resumeGame, false);
    canvas.addEventListener('mouseout', game.pauseGame, false);
    canvas.addEventListener('mousemove', game.updateClientX, false);
    canvas.addEventListener('mousedown', game.click, false);
    game.resumeGame();

    /*
    We automatically keep track of the mouse for pausing, ship position, and
    the user clicking (the last of which will set a flag for us to handle)
    using events elsewhere. The cats and laser position however (and their
    removal following collisions) are calculated here.
    */
    const modelUpdate = () => {
        if (game.allCatsDied(catRows)) {
            catRows = game.moveToNextRound(catRows);
        }

        catRows = game.updateCats(catRows);
        shipLaser = game.updateShipFire(shipLaser);

        /*
        It's much much easier/cleaner to do collision logic (and the
        resulting removal of the cat/laser) separately from the rest AFTER
        they've both finished moving
        */
        [shipLaser, catRows] = game.handleCollisions(shipLaser, catRows);

        /*
        If the mouse clicked it will have set a flag - we then decide
        whether to allow the ship to fire or not (for example, in classic
        space invaders you can't fire again while your laser is already
        firing)
        */
        shipLaser = game.processMouseClick(shipLaser);
    };

    const viewUpdate = () => {
        // Much to my surprise, it turned out that wiping the whole canvas
        // and then redrawing each element was way faster than clearing and
        // redrawing the individual sprites one at a time
        c.fillStyle = 'white';
        c.fillRect(0, 0, canvas.width, canvas.height);

        game.drawShip();

        catRows.forEach(row => {
            row.forEach(cat => {
                c.drawImage(
                    game.getCurrentNyanImage(),
                    cat.canvasX,
                    cat.canvasY,
                    cat.width,
                    cat.height,
                );
            });
        });

        // Note how this code looks different than other drawing code - it's
        // because the laser isn't a sprite or pre-made image
        c.beginPath();
        c.lineWidth = shipLaser.width;
        c.strokeStyle = 'green';
        c.rect(
            shipLaser.canvasX,
            shipLaser.canvasY,
            shipLaser.width,
            shipLaser.height,
        );
        c.stroke();
    };

    frameUpdate(() => {
        modelUpdate();
        viewUpdate();
    });
};

const updateStatDisplay = (stats, displayArea) => {
	displayArea.innerHTML = ""
	Object.keys(stats).forEach(keyStr => {
		//As the main score, this is the only stat we don't want to
		//display here (because it's already displayed at the top)
		if (keyStr === "RoundsWon") {
			return;
		}
		let updatedStat =  keyStr + ": " +
			stats[keyStr].toString() + "\n" + "<br>"; 
 		displayArea.innerHTML += updatedStat;
	})
};

const updateCookies = (stats) => {
	Object.keys(stats).forEach(keyStr => {
		//We have to do it this way because setting cookies with js is weird 
		let currentCookieVal = getCookie(keyStr);

		//As the main 'score', this value should only be updated if we
		//actually do better than before
		if (currentCookieVal != "" && keyStr === "MostRoundsWon" &&
		stats[keyStr] < currentCookieVal) {
			return;
		}
			
		let updatedCookie = keyStr + "=" + stats[keyStr].toString();
		document.cookie = updatedCookie;
	});
};

//From approved resource w3schools.com
const getCookie = function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};
