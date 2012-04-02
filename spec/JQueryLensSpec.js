describe("The JQueryLens", function () {

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

	it("has div ids for the own lens, the thumbnail and the realsize image with proper default values", function () {
		var aLens = JQueryLens;

		expect(aLens.divId).toBeDefined();
		expect(aLens.thumbnail.divId).toBeDefined();
		expect(aLens.realsize.divId).toBeDefined();
		expect(aLens.divId).toBe('#lens');
		expect(aLens.thumbnail.divId).toBe('#thumbnail');
		expect(aLens.realsize.divId).toBe('#realsize');
	});

});
