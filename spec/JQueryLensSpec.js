describe("The JQueryLens", function () {

	beforeEach(function () {
		$('<div id="lens"></div>').appendTo('body');
		JQueryLens.init({});
	});

	it("has a width and a height", function () {
		var aLens = JQueryLens;

		expect(aLens.width).toBeDefined();
		expect(aLens.height).toBeDefined();
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

	it("can be initialized with width and height", function () {
		var aWidth = 130;
		var aHeight = 140;
		var aLens = JQueryLens;
		aLens.init({width: aWidth, height: aHeight});

		expect(aLens.width).toBe(aWidth);
		expect(aLens.height).toBe(aHeight);
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
});
