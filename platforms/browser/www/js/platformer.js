// globally accessible variables
var requestAnimationFrame, canvas, context, width, height, player, keys, friction, gravity, level;
var background, backgroundImg;
var levelCleared = false;
var levelCount = 1;

var score, scoreCard;

// var ON_TOP = 1;
// var BELOW = 2;
// var ON_RIGHT = 3;
// var ON_LEFT = 4;

(initialize());

// set up our variables
function initialize () {
	document.getElementById('playButton').onclick = function () {
		document.getElementById('music').play();
		document.getElementById('playButton').style.display = 'none';
		document.getElementById('pauseButton').style.display = 'block';
	};
	document.getElementById('pauseButton').onclick = function () {
		document.getElementById('music').pause();
		document.getElementById('pauseButton').style.display = 'none';
		document.getElementById('playButton').style.display = 'block';
	};

	level = initLevel(42);
	score = 0;
	scoreCard = document.getElementById('score');
	scoreCard.innerHTML = score;

	requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimation || window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');

	// these can be arbitrary, but should be less than the background image dimensions
	// height can be the same if there will be no vertical change in background
	width = 800;
	height = 600;

	player = initPlayer(width / 4);

	keys = [];
	friction = 0.8;
	gravity = 1;
	canvas.width = width;
	canvas.height = height;
}

// update our canvas each frame
function update () {
	if (!levelCleared) {
		updateGame();
	}
	else {
		context.fillStyle = '#8060B6';
		context.font = '6em "Grand Hotel"';
		var message = 'Level ' + levelCount + ' cleared!';
		context.fillText(message, (canvas.width - context.measureText(message).width)/2, canvas.height/2);
		var timeout = window.setTimeout(function () {
			levelCleared = false;
			levelCount++;
			window.clearTimeout(timeout);
		}, 2000);
	}
	// update frame
	requestAnimationFrame(update);
}

// on page load
window.addEventListener('load', function () {
	update();
});

// on keydown event
document.body.addEventListener('keydown', function (e) {
	keys[e.keyCode] = true;
});

// on keyup event
document.body.addEventListener('keyup', function (e) {
	keys[e.keyCode] = false;
});

function checkColl (obj1, obj2) {
	//check top and bottom collisions
	if ((obj1.x + obj1.width >= obj2.x) && (obj1.x <= obj2.x + obj2.width)){
// //		if (obj1.y <= obj2.y) {  //detect collisions where obj1 is on top of obj2
// //			console.log("obj1 is on top of obj2");
// //			return ON_TOP;
// //			}
// //		if (obj1.y >= obj2.y + obj2.height) {  //detect collisions where obj1 hits obj2 from the bottom
// //			console.log("obj1 is below obj2");
// //			return BELOW;
// //		}
//
// 		//check for left and right collisions
		if ((obj1.y <= obj2.y + obj2.height) && (obj1.y + obj1.height >= obj2.y)) {
			return true;
// 	//		if (obj1.x == obj2.x) {
// 	//			console.log("obj1 is on the left of obj2"); //detect collisions where obj1 hits obj2 from the left
// 	//			return ON_LEFT;
// 	//		}
// 	//		if (obj1.x + obj1.width == obj2.x + obj2.width) {
// 	//			console.log("obj1 is on the right of obj2"); //detect collisions where obj1 hits obj2 from the right
// 	//			return ON_RIGHT;
// 	//		}
		}
	}
	return false;
}

function incrementScore(butterfly) {
	if (!butterfly.captured) {
		butterfly.capture();
		level.currentScore++;
		document.getElementById('score').innerHTML = score + level.currentScore;
	}

	if (level.currentScore == level.maxScore) {
		levelCleared = true;
		score = score + level.currentScore;
		level.reset(level.maxScore + 10);
		player.reset();
	}
}
function jump() {
if (!player.jumping) {
			player.jumping = true;
			player.yVelocity = -player.maxSpeed * 2;
		}
	}

	function moveRight() {

		player.direction = 'right';
		// right arrow
		if (player.xVelocity < player.maxSpeed) {
			player.xVelocity++;
		}
	}

	function moveLeft() {

		player.direction = 'left';
		if (player.xVelocity > -player.maxSpeed) {
			player.xVelocity--;
		}
	}

function updateGame() {
	if (keys[38] || keys[32]) {
		// up arrow || space bar
		if (!player.jumping) {
			player.jumping = true;
			player.yVelocity = -player.maxSpeed * 2;
		}
	}
	if (keys[39]) {
		player.direction = 'right';
		// right arrow
		if (player.xVelocity < player.maxSpeed) {
			player.xVelocity++;
		}
	}
	if (keys[37]) {
		// left arrow
		player.direction = 'left';
		if (player.xVelocity > -player.maxSpeed) {
			player.xVelocity--;
		}
	}
	// apply physics
	player.xVelocity *= friction;
	player.yVelocity += gravity;
	// change player position
	player.x += player.xVelocity;
	player.y += player.yVelocity;

	// check for background boundaries to change the background position
	// 0 + width/2 -> don't move the background, let player move up to 0
	if (player.x <= canvas.width / 2) {
		level.background.x = 0;
		if (player.x <= 0) {
			player.x = 0;
		}
		player.canvasX = player.x;
	}
	// background.width - width/2 -> don't move the background, let player move up to background.width
	else if (player.x >= level.background.width - canvas.width / 2) {
		level.background.x = -(level.background.width - canvas.width);
		if (player.x >= level.background.width - player.width) {
			player.x = level.background.width - player.width;
		}
		player.canvasX = player.x - level.background.width + canvas.width;
	}
	// anything in between -> move both the background and the player
	else {
		level.background.x -= player.xVelocity;
		player.canvasX = canvas.width / 2;
	}

	// check for vertical boundaries
	if (player.y >= height - player.height) {
		player.y = height - player.height;
		player.jumping = false;
	}
	player.canvasY = player.y;

	for (var index in level.butterflies) {
		var butterfly = level.butterflies[index];
		if (butterfly.x >= -(level.background.x) - butterfly.width && butterfly.x <= -(level.background.x) + canvas.width) {
			butterfly.canvasX = butterfly.x + level.background.x;
			butterfly.canvasY = butterfly.y;
		}
		else {
			butterfly.canvasX = undefined;
			butterfly.canvasY = undefined;
		}
	}

	//clear the canvas
	context.clearRect(0, 0, canvas.width, height);

	level.render();

	for (index in level.butterflies) {
		butterfly = level.butterflies[index];
		if (player.collisionCheck(butterfly)) {
			incrementScore(butterfly);
		}
		if (butterfly.update && butterfly.render && !butterfly.captured) {
			butterfly.update();
			butterfly.render();
		}
	}

	player.update();
	player.render();
}