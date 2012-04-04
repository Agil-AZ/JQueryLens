JQueryLens = { 

	defaultParams: function() {
		return {
			locator: "locator",
			thumbnail: "thumbnail",
			lens: "lens",
			zoom: 4
		};
	},

	init: function(params) {
		params = jQuery.extend(this.defaultParams(), params);

		this._zoom = params.zoom;
		this.locator = this.getElement(params.locator);
		this.thumbnail = this.getElement(params.thumbnail);
		this.lens = this.getElement(params.lens);
		this.image = $(this.getIdForImage());

		this.resizeLocator();
		this.resizeThumbnail();
		this.resizeImage();
	},

	getIdForImage: function() {
		return this.getElement(this.lens.attr("id") + " img");
	},

	getElement: function(id) {
		return $("#" + id);
	},

	getBorder : function(element) {
		return parseInt(element.css("border-left-width"));
	},

	moveLocator: function() {
		this.locator.offset({
			top: this.locator.offset().top + parseInt(this.thumbnail.css("border-left-width")),
			left: this.locator.offset().left + parseInt(this.thumbnail.css("border-left-width"))
		});
	},

	resizeImage: function() {
		this.image.width(this.thumbnail.width() * this._zoom);
		this.image.height(this.thumbnail.height() * this._zoom);
	},

	resizeLocator: function() {
		this.locator.width(this.lens.width() / this._zoom);
		this.locator.height(this.lens.height() / this._zoom);
	},

	resizeThumbnail: function() {
		var imageHeight = this.image.height();
		var imageWidth = this.image.width();
		this.thumbnail.height(this.thumbnail.width() * imageHeight / imageWidth);
	},

	refreshImageInLens: function() {
		this.image.offset({
			top: this.lens.position().top - 
				 (this.getBorder(this.thumbnail) * this._zoom) - 
				 (this.locator.position().top * this._zoom),
			left: this.lens.position().left - 
				  (this.getBorder(this.thumbnail) * this._zoom) - (this.locator.position().left * this._zoom)
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
		return this.getLimits(this.locator, this.thumbnail);
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
		var position = {
			top: this.locator.offset().top,
			left: this.locator.offset().left
		};

		var adjustedPosition = this.adjust(position, this.locatorLimits());

		this.locator.offset(adjustedPosition);
	},

	refreshLocatorInThumbnail: function(x, y) {
		this.locator.offset({
			top: y - this.locator.height()/2,
			left: x - this.locator.width()/2
		});

		this.adjustLocatorPosition();
		this.refreshImageInLens();
		this.moveLocator();
	},
};

$(document).ready(function() {
	JQueryLens.init({
		zoom: 4
	});
	JQueryLens.thumbnail.mousemove(function(e) {
		JQueryLens.refreshLocatorInThumbnail(e.pageX, e.pageY);
	});
});