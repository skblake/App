function initLevel(maxScore) {
	var newLevel = {};
	newLevel.butterflies = [];

	newLevel.currentScore = 0;
	newLevel.maxScore = maxScore;

	newLevel.background = {
		x: 0,
		y: 0
	};
	// background image
	backgroundImg = new Image();

	backgroundImg.onload = function () {
		context.drawImage(backgroundImg, newLevel.background.x, newLevel.background.y);
		newLevel.background.width = backgroundImg.width;
		newLevel.background.height = backgroundImg.height;
		generateButterflies();
	};

	function generateButterflies() {
		for (var i = 0; i < level.maxScore; i++) {
			newLevel.butterflies.push(initButterfly());
		}
	}


	newLevel.reset = function(newMaxScore) {
		newLevel.maxScore = newMaxScore;
		// make new butterflies
		generateButterflies();
		// reset background x, y
		newLevel.background.x = 0;
		newLevel.background.y = 0;
		newLevel.currentScore = 0;
	};

	newLevel.render = function () {
		// draw the background
		context.drawImage(backgroundImg, newLevel.background.x, newLevel.background.y);
	};

	backgroundImg.src = "imgs/background.png";

	return newLevel;
}