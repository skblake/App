
function sprite (options) {
	var that = {};

	that.width = options.width;
	that.height = options.height;
	that.image = options.image;
	that.loop = options.loop;

	var frameIndex = 0;
	var tickCount = 0;
	var ticksPerFrame = options.ticksPerFrame || 0;
	var numberOfFrames = options.numberOfFrames || 1;
	var startingFrame = options.startingFrameIndex || 0;

	that.render = function (x, y) {
		context.drawImage(
			that.image,  // image
			(startingFrame + frameIndex) * that.width,  // source x
			0,  // source y
			that.width,  // source width
			that.height,  // source height
			x,  // destination x
			y,  // destination  y
			that.width,  // destination width
			that.height  // destination height
		);
	};

	that.update = function () {
		tickCount += 1;
		if (tickCount > ticksPerFrame) {
			tickCount = 0;
			if (frameIndex < numberOfFrames - 1) {
				frameIndex += 1;
			}
			else if (that.loop) {
				frameIndex = 0;
			}
		}
	}
	;

	return that;
}
