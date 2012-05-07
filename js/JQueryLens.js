/*
 * Copyright (c) 2012 Agil-AZ S.L.
 * 
 * Permission is hereby granted, free of charge, to any person 
 * obtaining a copy of this software and associated documentation 
 * files (the "Software"), to deal in the Software without restriction, 
 * including without limitation the rights to use, copy, modify, merge, 
 * publish, distribute, sublicense, and/or sell copies of the Software, 
 * and to permit persons to whom the Software is furnished to do so, 
 * subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * 
 */

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

	moveLocatorAccordingToBorder: function() {
		this.locator.offset({
			top: this.locator.offset().top + 
				 this.getBorder(this.thumbnail),
			left: this.locator.offset().left + 
				  this.getBorder(this.thumbnail)
		});
	},

	moveImageAccordingToBorder: function() {
		this.image.offset({
			top: this.image.offset().top + 
				this.getBorder(this.lens),
			left: this.image.offset().left + 
				this.getBorder(this.lens)
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
		var lensTop = Math.ceil(this.lens.position().top);
		var lensLeft = Math.ceil(this.lens.position().left);
		this.image.offset({
			top: lensTop - 
				 (this.getBorder(this.thumbnail) * this._zoom) - 
				 (this.locator.position().top * this._zoom) - 
				 (this.getBorder(this.locator) * this._zoom),
			left: lensLeft  - 
				  (this.getBorder(this.thumbnail) * this._zoom) - 
				  (this.locator.position().left * this._zoom) - 
				  (this.getBorder(this.locator) * this._zoom)
		});
	},

	getDifference: function(innerDiv, outerDiv) {
		return {
			vertical: outerDiv.height() - innerDiv.height() - this.getBorder(innerDiv)*2,
			horizontal: outerDiv.width() - innerDiv.width() - this.getBorder(innerDiv)*2,
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
			top: Math.ceil(this.locator.offset().top),
			left: Math.ceil(this.locator.offset().left)
		};

		var adjustedPosition = this.adjust(position, this.locatorLimits());

		this.locator.offset(adjustedPosition);
	},

	refreshLocatorInThumbnail: function(x, y) {
		this.locator.offset({
			top: y - (this.locator.height() + this.getBorder(this.locator) * 2) / 2,
			left: x - (this.locator.width() + this.getBorder(this.locator) * 2) / 2
		});

		this.adjustLocatorPosition();
		this.refreshImageInLens();
		this.moveLocatorAccordingToBorder();
		this.moveImageAccordingToBorder();
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
