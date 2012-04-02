JQueryLens = { 

	width: 1,
	height: 1,

	divId: "#lens",
	thumbnail: { divId: "#thumbnail" },
	realsize: { divId: "#realsize" },

	setWidth: function(newWidth) {
		this.width = newWidth;
	},

	setHeight: function(newHeight) {
		this.height = newHeight;
	},

	calculateLeftIn: function(e) {
		return e.pageX-parseInt($("#lens").css("width"))/2 - parseInt($("#image").css("left"));
	},

	calculateTopIn: function(e) {
		return e.pageY-parseInt($("#lens").css("height"))/2 - parseInt($("#image").css("top"));
	},

	calculateLeftOutForLeft: function() {
		return 0;
	},

	calculateLeftOutForRight: function() {
		return parseInt($("#image").css("width")) - 
			parseInt($("#lens").css("width")) - 
			parseInt($("#lens").css("border-left-width")) - 
			parseInt($("#lens").css("border-right-width"));
	},

	calculateTopOutForTop: function() {
		return 0;
	},

	calculateTopOutForBottom: function() {
		return parseInt($("#image").css("height")) - 
			parseInt($("#lens").css("height")) - 
			parseInt($("#image").css("border-bottom-width")) + 
			parseInt($("#image").css("border-top-width")) - 
			parseInt($("#lens").css("border-bottom-width")) - 
			parseInt($("#lens").css("border-top-width"));
	},

	mouseOverImage: function(e) {
		var imageHeight = parseInt($("#image").css("height"));
		var imageLeft = parseInt($("#image").css("left"));
		var imageTop = parseInt($("#image").css("top"));
		var imageWidth = parseInt($("#image").css("width"));
		var lensMiddleHeight = parseInt($("#lens").css("height"))/2;
		var lensMiddleWidth = parseInt($("#lens").css("width"))/2;

		var isInBottomQuadrant = imageTop + lensMiddleHeight;
		var isInTopQuadrant = imageTop + imageHeight - lensMiddleHeight;
		var isInLeftQuadrant = imageLeft + lensMiddleWidth;
		var isInRightQuadrant = imageLeft + imageWidth - lensMiddleWidth;

		if (e.pageY >= isInBottomQuadrant && e.pageY <= isInTopQuadrant && e.pageX >= isInLeftQuadrant && e.pageX <= isInRightQuadrant)
		{
			$("#lens").css({"left" : this.calculateLeftIn(e)});
			$("#lens").css({"top" : this.calculateTopIn(e)});
		}

		if (e.pageY < isInBottomQuadrant)
		{
			$("#lens").css({"top" : this.calculateTopOutForTop()});
		}

		if (e.pageY > isInTopQuadrant)
		{
			$("#lens").css({"top" : this.calculateTopOutForBottom()});
		}

		if (e.pageX < isInLeftQuadrant)
		{
			$("#lens").css({"left" : this.calculateLeftOutForLeft()});
		}

		if (e.pageX > isInRightQuadrant)
		{
			$("#lens").css({"left" : this.calculateLeftOutForRight()});
		}

		this.setLargeImage();
	},

	setLargeImage: function() {
		$("#view").css({"left" : 4*(-parseInt($("#lens").css("left")))});
		$("#view").css({"top" : 4*(-parseInt($("#lens").css("top")))});
	},

	resizeLensRespectLargeImage: function() {
		$("#lens").css({"height" : parseInt($("#large-image").css("height"))/4});
		$("#lens").css({"width" : parseInt($("#large-image").css("width"))/4});
	},

	on_document_ready: function() {
		this.resizeLensRespectLargeImage();
		$("#image").mousemove(this.mouseOverImage);
	}

};

//$(document).ready(new JQueryLens().on_document_ready);
