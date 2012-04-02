describe("The JQueryLens", function () {

	beforeEach(function () {
        	var sample_lens_html_code = '<div id="thumbnail"> <div id="lens"> </div> </div> <div id="realsize"> <img src="img/image.jpg" /> </div>';
		$(sample_lens_html_code).appendTo('body');
		JQueryLens.init({});
	});

	it("can change its width and height", function () {
		var aWidth = 130;
		var aHeight = 140;
		var aLens = JQueryLens;
		aLens.setWidth(aWidth);
		aLens.setHeight(aHeight);

		expect(aLens.width).toBe(aWidth);
		expect(aLens.height).toBe(aHeight);
	});

	it("has default values for its fields", function () {
		var aLens = JQueryLens;

		expect(aLens.width).toBe(1);
		expect(aLens.height).toBe(1);
		expect(aLens.zoom).toBe(4);
		expect(aLens.divId).toBe("#lens");
		expect(aLens.thumbnail.divId).toBe("#thumbnail");
		expect(aLens.realsize.divId).toBe("#realsize");
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
			divId:     anotherDivId,
			thumbnail: { divId: anotherDivId },
			realsize:  { divId: anotherDivId }
		});

		expect(aLens.width).toBe(aWidth);
		expect(aLens.height).toBe(aHeight);
		expect(aLens.zoom).toBe(aZoom);
		expect(aLens.divId).toBe(anotherDivId);
		expect(aLens.thumbnail.divId).toBe(anotherDivId);
		expect(aLens.realsize.divId).toBe(anotherDivId);
	});

	it("has div ids for the own lens, the thumbnail and the realsize image with proper default values", function () {
		var aLens = JQueryLens;

		expect(aLens.divId).toBeDefined();
		expect(aLens.thumbnail.divId).toBeDefined();
		expect(aLens.realsize.divId).toBeDefined();
		expect(aLens.divId).toBe('#lens');
		expect(aLens.thumbnail.divId).toBe('#thumbnail');
		expect(aLens.realsize.divId).toBe('#realsize');
	});

	it("changes its div dimensions when setWidth and setHeight are called", function () {
		var aWidth = 130;
		var aHeight = 140;
		var aLens = JQueryLens;
		aLens.setWidth(aWidth);
		aLens.setHeight(aHeight);

		expect($(aLens.divId).width()).toBe(aWidth);
		expect($(aLens.divId).height()).toBe(aHeight);
	});

	it("has same proportion than realsize image", function () {
		var aWidth = 800;
		var aHeight = 600;
		var aLens = JQueryLens;
		var anImage = aLens.realsize.divId;

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
		var anImage = aLens.realsize.divId;

		$(anImage).width(aWidth);
		$(anImage).height(aHeight);

		aLens.setZoom(aZoom);
		aLens.resize();

		expect(aLens.width).toBe(aWidth / aZoom);
		expect(aLens.height).toBe(aHeight / aZoom);
	});

});
