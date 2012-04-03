describe("The JQueryLens", function () {

	beforeEach(function () {
		$('#test-div').remove();
        var sample_lens_html_code = '<div id="test-div"><div id="thumbnail"> <div id="locator"> </div> </div> <div id="lens"> <img src="img/image.jpg" /> </div></div>';
		$(sample_lens_html_code).appendTo('body');
		JQueryLens.init({});
	});

	it("cannot change nor query its width, height and zoom", function () {
		var aLens = JQueryLens;

		expect(aLens.setWidth).toBeUndefined();
		expect(aLens.setHeight).toBeUndefined();
		expect(aLens.setZoom).toBeUndefined();
		expect(aLens.width).toBeUndefined();
		expect(aLens.height).toBeUndefined();
		expect(aLens.zoom).toBeUndefined();
	});

	it("has default values for its fields", function () {
		var aLens = JQueryLens;

		expect(aLens.lens.id).toBe("#lens");
		expect(aLens.thumbnail.id).toBe("#thumbnail");
		expect(aLens.locator.id).toBe("#locator");
	});

	it("can be initialized with values for its fields", function () {
		var anotherDivId = "anotherId";

		var aLens = JQueryLens;
		aLens.init({
			locator:   { id: anotherDivId },
			thumbnail: { id: anotherDivId },
			lens:  	   { id: anotherDivId }
		});

		expect(aLens.locator.id).toBe(anotherDivId);
		expect(aLens.thumbnail.id).toBe(anotherDivId);
		expect(aLens.lens.id).toBe(anotherDivId);
	});

	it("has locator with same proportion than lens", function () {
		var aWidth = 800;
		var aHeight = 600;
		var aLens = JQueryLens;
		var lensDiv = $(aLens.lens.id);
		var locatorDiv = $(aLens.locator.id);

		lensDiv.width(aWidth);
		lensDiv.height(aHeight);

		aLens.resizeLocator();

		expect(locatorDiv.width() / locatorDiv.height()).toBe(aWidth / aHeight);
	});

	it("resizes locator in the proportion the zoom sets when initialized", function () {
		var aWidth = 800;
		var aHeight = 600;
		var aZoom = 5;
		var aLens = JQueryLens;
		var lensDiv = $(aLens.lens.id);
		var locatorDiv = $(aLens.locator.id);

		lensDiv.width(aWidth);
		lensDiv.height(aHeight);
		aLens.init({zoom: aZoom});

		expect(locatorDiv.width()).toBe(aWidth / aZoom);
		expect(locatorDiv.height()).toBe(aHeight / aZoom);
	});

	it("sets thumbnail height according to thumbnail width and the image proportion", function() {
		var thumbnailDiv = $(JQueryLens.thumbnail.id);
		var image = JQueryLens.image;

		image.width(1000);
		image.height(500);
		thumbnailDiv.width(200);

		var aLens = JQueryLens;
		aLens.init({});

		expect(thumbnailDiv.width() / thumbnailDiv.height()).toBe(image.width() / image.height());
	});

	it("sets image position according to locator position in thumbnail", function () {

		var layout = function(scenario) {
			var thumbnailDiv = $(JQueryLens.thumbnail.id);
			var locatorDiv = $(JQueryLens.locator.id);
			var lensDiv = $(JQueryLens.lens.id);
			var image = JQueryLens.image;
			thumbnailDiv.width(scenario.thumbnailWidth);
			lensDiv.width(scenario.lensWidth);
			lensDiv.height(scenario.lensHeight);
			image.width(scenario.imageWidth);
			image.height(scenario.imageHeight);
			JQueryLens.init({zoom: scenario.zoom});
			locatorDiv.offset(scenario.locatorPosition);
		};

		var scenarios = [ 
			{
				thumbnailWidth:  200,
				lensWidth: 400,
				lensHeight: 200,
				imageWidth: 1000,
				imageHeight: 500,
				zoom: 4,
				locatorPosition: {top: 10, left: 25},
				expectedImagePosition: {top: -60, left: -150}
			},
			{
				thumbnailWidth:  200,
				lensWidth: 400,
				lensHeight: 200,
				imageWidth: 1000,
				imageHeight: 500,
				zoom: 4,
				locatorPosition: {top: 0, left: 0},
				expectedImagePosition: {top: 0, left: 0}
			},
			{
				thumbnailWidth:  200,
				lensWidth: 400,
				lensHeight: 200,
				imageWidth: 1000,
				imageHeight: 500,
				zoom: 4,
				locatorPosition: {top: 50, left: 100},
				expectedImagePosition: {top: -300, left: -600}
			}
		];

		for (var index in scenarios) {
			var scenario = scenarios[index];

			layout(scenario);

			JQueryLens.refreshImageInLens();

			expect(JQueryLens.image.position()).toEqual(scenario.expectedImagePosition);			
		}

	});

});
