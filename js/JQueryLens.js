JQueryLens = { 

	init: function(params) {
		this._zoom   = params.zoom ? params.zoom : 4;
		this.locator = params.locator 
			? params.locator 
			: { id: "#locator" };
		this.thumbnail = params.thumbnail 
			? params.thumbnail 
			: { id: "#thumbnail" };
		this.lens  = params.lens 
			? params.lens 
			: { id: "#lens" };
		this.image = $(this.getIdForImage());
		this.resizeLocator();
		this.resizeThumbnail();
	},

	getIdForImage: function() {
		return this.lens.id + " img";
	},

	resizeLocator: function() {
		$(this.locator.id).width($(this.lens.id).width()/this._zoom);
		$(this.locator.id).height($(this.lens.id).height()/this._zoom);
	},

	resizeThumbnail: function() {
		var imageHeight = this.image.height();
		var imageWidth = this.image.width();
		var thumbnail = $(this.thumbnail.id);
		thumbnail.height(thumbnail.width() * imageHeight / imageWidth);
	},

	getRange: function(elem1, elem2) {
		return {
			vertical:   elem2.height() - elem1.height(),
			horizontal: elem2.width() - elem1.width(),
		};
	},

	refreshImageInLens: function() {
		var locator = $(this.locator.id);
		var thumbnail = $(this.thumbnail.id);
		var lens = $(this.lens.id);
		var lensRange = this.getRange(lens, this.image);
		var locatorRange = this.getRange(locator, thumbnail);
		this.image.offset({
			top: -(locator.position().top * lensRange.vertical / locatorRange.vertical),
			left: -(locator.position().left * lensRange.horizontal / locatorRange.horizontal)
		});
	},

	getDifference: function(innerDiv, outerDiv) {
		return {
			vertical: outerDiv.height() - innerDiv.height(),
			horizontal: outerDiv.width() - innerDiv.width(),
		};
	},

	getLimits: function(innerDiv, outerDiv) {
		var outerTop = outerDiv.position().top;
		var outerLeft = outerDiv.position().left;
		var difference = this.getDifference(innerDiv, outerDiv);
		return {
			minTop: outerTop,
			maxTop: outerTop + difference.vertical,
			minLeft: outerLeft,
			maxLeft: outerLeft + difference.horizontal
		};
	},

	locatorLimits: function() {
		return this.getLimits($(this.locator.id), $(this.thumbnail.id));
	},

	adjust: function(position, limits) {
		if (position.top < limits.minTop)
			position.top = limits.minTop;

		if (position.top > limits.maxTop)
			position.top = limits.maxTop;

		if (position.left < limits.minLeft)
			position.left = limits.minLeft;

		if (position.left > limits.maxLeft)
			position.left = limits.maxLeft;

		return position;
	},

	adjustLocatorPosition: function() {
		var locator = $(this.locator.id);

		var position = {
			top: locator.offset().top,
			left: locator.offset().left
		};

		var adjustedPosition = this.adjust(position, this.locatorLimits());

		locator.offset(adjustedPosition);
	},

	refreshLocatorInThumbnail: function(x, y) {
		var locator = $(this.locator.id);

		locator.offset({
			top: y - locator.height()/2,
			left: x - locator.width()/2
		});

		this.adjustLocatorPosition();
		this.refreshImageInLens();
	},

	mouseOverImage: function(e) {
		this.refreshLocatorInThumbnail(e.pageX, e.pageY);
	},

	on_document_ready: function() {
		this.image.mousemove(this.mouseOverImage);
	}

};

JQueryLens.init({
	
});

$(document).ready(JQueryLens.on_document_ready);