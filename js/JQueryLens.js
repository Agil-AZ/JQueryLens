JQueryLens = { 

	init: function(params) {
		this.width     = params.width  ? params.width  : 1;
		this.height    = params.height ? params.height : 1;
		this.zoom      = params.zoom   ? params.zoom   : 4;
		this.locator = params.locator 
			? params.locator  
			: { divId: "#locator"};
		this.thumbnail = params.thumbnail 
			? params.thumbnail   
			: { divId: "#thumbnail" };
		this.lens  = params.lens   
			? params.lens
			: { divId: "#lens" };
	},

	updateView: function() {
		$(this.divId).width(this.width);
		$(this.divId).height(this.height);
	},

	setZoom: function(newZoom) {
		this.zoom = newZoom;
	},

	resize: function() {
		this.width = $("#lens").width()/this.zoom;
		this.height = $("#lens").height()/this.zoom;
		this.updateView();
	},

	calculateLeftIn: function(e) {
		return e.pageX-parseInt($("#locator").css("width"))/2 - parseInt($("#image").css("left"));
	},

	calculateTopIn: function(e) {
		return e.pageY-parseInt($("#locator").css("height"))/2 - parseInt($("#image").css("top"));
	},

	calculateLeftOutForLeft: function() {
		return 0;
	},

	calculateLeftOutForRight: function() {
		return parseInt($("#image").css("width")) - 
			parseInt($("#locator").css("width")) - 
			parseInt($("#locator").css("border-left-width")) - 
			parseInt($("#locator").css("border-right-width"));
	},

	calculateTopOutForTop: function() {
		return 0;
	},

	calculateTopOutForBottom: function() {
		return parseInt($("#image").css("height")) - 
			parseInt($("#locator").css("height")) - 
			parseInt($("#image").css("border-bottom-width")) + 
			parseInt($("#image").css("border-top-width")) - 
			parseInt($("#locator").css("border-bottom-width")) - 
			parseInt($("#locator").css("border-top-width"));
	},

	mouseOverImage: function(e) {
		var imageHeight = parseInt($("#image").css("height"));
		var imageLeft = parseInt($("#image").css("left"));
		var imageTop = parseInt($("#image").css("top"));
		var imageWidth = parseInt($("#image").css("width"));
		var lensMiddleHeight = parseInt($("#locator").css("height"))/2;
		var lensMiddleWidth = parseInt($("#locator").css("width"))/2;

		var isInBottomQuadrant = imageTop + lensMiddleHeight;
		var isInTopQuadrant = imageTop + imageHeight - lensMiddleHeight;
		var isInLeftQuadrant = imageLeft + lensMiddleWidth;
		var isInRightQuadrant = imageLeft + imageWidth - lensMiddleWidth;

		if (e.pageY >= isInBottomQuadrant && e.pageY <= isInTopQuadrant && e.pageX >= isInLeftQuadrant && e.pageX <= isInRightQuadrant)
		{
			$("#locator").css({"left" : this.calculateLeftIn(e)});
			$("#locator").css({"top" : this.calculateTopIn(e)});
		}

		if (e.pageY < isInBottomQuadrant)
		{
			$("#locator").css({"top" : this.calculateTopOutForTop()});
		}

		if (e.pageY > isInTopQuadrant)
		{
			$("#locator").css({"top" : this.calculateTopOutForBottom()});
		}

		if (e.pageX < isInLeftQuadrant)
		{
			$("#locator").css({"left" : this.calculateLeftOutForLeft()});
		}

		if (e.pageX > isInRightQuadrant)
		{
			$("#locator").css({"left" : this.calculateLeftOutForRight()});
		}

		this.setLargeImage();
	},

	setLargeImage: function() {
		$("#lens img").css({"left" : 4*(-parseInt($("#locator").css("left")))});
		$("#lens img").css({"top" : 4*(-parseInt($("#locator").css("top")))});
	},

	on_document_ready: function() {
		this.resize();
		$("#image").mousemove(this.mouseOverImage);
	}

};

//$(document).ready(new JQueryLens().on_document_ready);

JQueryLens.init();
