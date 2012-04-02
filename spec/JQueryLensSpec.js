describe("The JQueryLens", function () {

	beforeEach(function () {
        var sample_lens_html_code = '<div id="thumbnail"> <div id="locator"> </div> </div> <div id="lens"> <img src="img/image.jpg" /> </div>';
		$(sample_lens_html_code).appendTo('body');
		JQueryLens.init({});
	});

	it("cannot change its width and height", function () {
		var aLens = JQueryLens;

		expect(aLens.setWidth).toBeUndefined();
		expect(aLens.setHeight).toBeUndefined();
	});

	it("has default values for its fields", function () {
		var aLens = JQueryLens;

		expect(aLens.width).toBe(1);
		expect(aLens.height).toBe(1);
		expect(aLens.zoom).toBe(4);
		expect(aLens.lens.divId).toBe("#lens");
		expect(aLens.thumbnail.divId).toBe("#thumbnail");
		expect(aLens.locator.divId).toBe("#locator");
	});

	it("can be initialized with values for its fields", function () {
		var aWidth = 130;
		var aHeight = 140;
		var aZoom = 10;
		var anotherDivId = "anotherId";

		var aLens = JQueryLens;
		aLens.init({
			width:     aWidth, 
			height:    aHeight,
			zoom:      aZoom,
			locator:   { divId: anotherDivId },
			thumbnail: { divId: anotherDivId },
			lens:  	   { divId: anotherDivId }
		});

		expect(aLens.width).toBe(aWidth);
		expect(aLens.height).toBe(aHeight);
		expect(aLens.zoom).toBe(aZoom);
		expect(aLens.locator.divId).toBe(anotherDivId);
		expect(aLens.thumbnail.divId).toBe(anotherDivId);
		expect(aLens.lens.divId).toBe(anotherDivId);
	});

	it("has same proportion than realsize image", function () {
		var aWidth = 800;
		var aHeight = 600;
		var aLens = JQueryLens;
		var anImage = aLens.lens.divId;

		$(anImage).width(aWidth);
		$(anImage).height(aHeight);

		aLens.resize();

		expect(aLens.width / aLens.height).toBe(aWidth / aHeight);
	});

	it("is reduced in the proportion the zoom sets", function () {
		var aWidth = 800;
		var aHeight = 600;
		var aZoom = 5;
		var aLens = JQueryLens;
		var anImage = aLens.lens.divId;

		$(anImage).width(aWidth);
		$(anImage).height(aHeight);

		aLens.setZoom(aZoom);
		aLens.resize();

		expect(aLens.width).toBe(aWidth / aZoom);
		expect(aLens.height).toBe(aHeight / aZoom);
	});

});
