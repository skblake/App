function initButterfly () {
	var newButterfly = {};

	var butterflyImg = new Image();
	butterflyImg.onload = function () {
		newButterfly.captured = false;
		newButterfly.width = 80;
		newButterfly.height = butterflyImg.height;

		newButterfly.x = (Math.random() * (level.background.width - canvas.width)) + 600;
		newButterfly.y = (Math.random() * (level.background.height/2)) + 50;

		newButterfly.spriteSheet = butterflyImg;

		newButterfly.flyingSprite = sprite({
			width: newButterfly.width,
			height: newButterfly.height,
			image: newButterfly.spriteSheet,
			numberOfFrames: 1,
			startingFrameIndex: 0,
			loop: false
		});

		newButterfly.render = function () {
			newButterfly.flyingSprite.render(newButterfly.canvasX, newButterfly.canvasY);
		};

		newButterfly.update = function () {
			newButterfly.flyingSprite.update();
		};

		newButterfly.capture = function() {
			newButterfly.captured = true;
		};
	};


	butterflyImg.src = "imgs/butterfly-sprite.png";

	return newButterfly;
}