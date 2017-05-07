function initPlayer (startingX) {
	var newPlayer = {};

	newPlayer.reset = function() {
		newPlayer.x = startingX;
		newPlayer.maxSpeed = 10;
		newPlayer.xVelocity = 0;
		newPlayer.yVelocity = 0;
		newPlayer.jumping = false;
		newPlayer.walking = false;
		newPlayer.direction = 'right';
	};

	newPlayer.reset();

	var playerImg = new Image();
	playerImg.onload = function () {
		newPlayer.y = height - playerImg.height;
		newPlayer.width = 220;
		newPlayer.height = playerImg.height;
		newPlayer.spriteSheet = playerImg;
		newPlayer.xyArray = [width][height];

		newPlayer.rightStandingSprite = sprite({
			width: newPlayer.width,
			height: newPlayer.height,
			image: newPlayer.spriteSheet,
			numberOfFrames: 1,
			startingFrameIndex: 0,
			loop: false
		});

		newPlayer.leftStandingSprite = sprite({
			width: newPlayer.width,
			height: newPlayer.height,
			image: newPlayer.spriteSheet,
			numberOfFrames: 1,
			startingFrameIndex: 1,
			loop: false
		});

		newPlayer.rightWalkingSprite = sprite({
			width: player.width,
			height: player.height,
			image: player.spriteSheet,
			numberOfFrames: 4,
			ticksPerFrame: 20,
			startingFrameIndex: 2,
			loop: true
		});

		newPlayer.leftWalkingSprite = sprite({
			width: player.width,
			height: player.height,
			image: player.spriteSheet,
			numberOfFrames: 4,
			ticksPerFrame: 20,
			startingFrameIndex: 6,
			loop: true
		});

		newPlayer.rightJumpingSprite = sprite({
			width: player.width,
			height: player.height,
			image: player.spriteSheet,
			numberOfFrames: 1,
			ticksPerFrame: 20,
			startingFrameIndex: 10,
			loop: false
		});

		newPlayer.leftJumpingSprite = sprite({
			width: player.width,
			height: player.height,
			image: player.spriteSheet,
			numberOfFrames: 1,
			ticksPerFrame: 20,
			startingFrameIndex: 11,
			loop: false
		});

		function setCurrentSprite () {
			if (newPlayer.direction === 'left') {
				newPlayer.currentSprite = newPlayer.jumping ?
					newPlayer.leftJumpingSprite :
					(newPlayer.walking ? newPlayer.leftWalkingSprite : newPlayer.leftStandingSprite);
			}
			else {
				newPlayer.currentSprite = newPlayer.jumping ?
					newPlayer.rightJumpingSprite :
					(newPlayer.walking ? newPlayer.rightWalkingSprite : newPlayer.rightStandingSprite);
			}
		}

		newPlayer.render = function () {
			newPlayer.walking = newPlayer.xVelocity > 0.01 || newPlayer.xVelocity < -0.01;
			setCurrentSprite();
			newPlayer.currentSprite.render(newPlayer.canvasX, newPlayer.canvasY);
		};

		newPlayer.update = function () {
			setCurrentSprite();
			newPlayer.currentSprite.update();
		};
	};

	newPlayer.collisionCheck = function (other) {
		var collisionObject = {
			x: newPlayer.direction === 'left' ? newPlayer.x + 70 : newPlayer.x + 40,
			y: newPlayer.y + 25,
			width: newPlayer.width - 110,
			height: newPlayer.height - 25
		};

		return checkColl(collisionObject, other);
	};

	playerImg.src = "imgs/human-sprite.png";

	return newPlayer;
}