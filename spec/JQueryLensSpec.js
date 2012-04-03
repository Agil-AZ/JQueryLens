describe("The JQueryLens", function () {

	beforeEach(function () {
		$('#test-div').remove();
        var sample_lens_html_code = '<div id="test-div"><div id="thumbnail"> <div id="locator"> </div> </div> <div id="lens"> <img src="img/image.jpg" /> </div></div>';
		$(sample_lens_html_code).appendTo('body');
		JQueryLens.init({});
	});

	it("cannot change not query its width, height and zoom", function () {
		expect(JQueryLens.setWidth).toBeUndefined();
		expect(JQueryLens.setHeight).toBeUndefined();
		expect(JQueryLens.setZoom).toBeUndefined();
		expect(JQueryLens.width).toBeUndefined();
		expect(JQueryLens.height).toBeUndefined();
		expect(JQueryLens.zoom).toBeUndefined();
	});

	it("has default values for its fields", function () {
		expect(JQueryLens.lens.id).toBe("#lens");
		expect(JQueryLens.thumbnail.id).toBe("#thumbnail");
		expect(JQueryLens.locator.id).toBe("#locator");
	});

	it("can be initialized with values for its fields", function () {
		var anotherDivId = "anotherId";

		JQueryLens.init({
			locator:   { id: anotherDivId },
			thumbnail: { id: anotherDivId },
			lens:  	   { id: anotherDivId }
		});

		expect(JQueryLens.locator.id).toBe(anotherDivId);
		expect(JQueryLens.thumbnail.id).toBe(anotherDivId);
		expect(JQueryLens.lens.id).toBe(anotherDivId);
	});

	it("has locator with same proportion than lens", function () {
		var aWidth = 800;
		var aHeight = 600;
		var lensDiv = $(JQueryLens.lens.id);
		var locatorDiv = $(JQueryLens.locator.id);

		lensDiv.width(aWidth);
		lensDiv.height(aHeight);

		JQueryLens.resizeLocator();

		expect(locatorDiv.width() / locatorDiv.height()).toBe(aWidth / aHeight);
	});

	it("resizes locator in the proportion the zoom sets when initialized", function () {
		var aWidth = 800;
		var aHeight = 600;
		var aZoom = 5;
		var lensDiv = $(JQueryLens.lens.id);
		var locatorDiv = $(JQueryLens.locator.id);

		lensDiv.width(aWidth);
		lensDiv.height(aHeight);
		JQueryLens.init({zoom: aZoom});

		expect(locatorDiv.width()).toBe(aWidth / aZoom);
		expect(locatorDiv.height()).toBe(aHeight / aZoom);
	});

	it("sets thumbnail height according to thumbnail width and the image proportion", function() {
		var thumbnailDiv = $(JQueryLens.thumbnail.id);
		var image = JQueryLens.image;

		image.width(1000);
		image.height(500);
		thumbnailDiv.width(200);

		JQueryLens.init({});

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

	it("sets locator position when mouse is inside thumbnail", function() {
		var thumbnailDiv = $(JQueryLens.thumbnail.id);
		var locatorDiv = $(JQueryLens.locator.id);
		var lensDiv = $(JQueryLens.lens.id);
		var image = JQueryLens.image;

		thumbnailDiv.width(200);
		thumbnailDiv.offset({top:100,left:50})
		lensDiv.width(400);
		lensDiv.height(200);
		image.width(1000);
		image.height(500);

		JQueryLens.init({zoom: 4});

		var scenarios = [
			{
				mouse: {x:150, y:150},
				expectedLocatorPosition: {top:125, left:100}
			},
			{
				mouse: {x:150, y:125},
				expectedLocatorPosition: {top:100, left:100}
			},
			{
				mouse: {x:150, y:100},
				expectedLocatorPosition: {top:100, left:100}
			},
			{
				mouse: {x:150, y:50},
				expectedLocatorPosition: {top:100, left:100}
			},
			{
				mouse: {x:150, y:175},
				expectedLocatorPosition: {top:150, left:100}
			},
			{
				mouse: {x:150, y:200},
				expectedLocatorPosition: {top:150, left:100}
			},
			{
				mouse: {x:150, y:250},
				expectedLocatorPosition: {top:150, left:100}
			},
			{
				mouse: {x:100, y:150},
				expectedLocatorPosition: {top:125, left:50}
			},
			{
				mouse: {x:75, y:150},
				expectedLocatorPosition: {top:125, left:50}
			},
			{
				mouse: {x:200, y:150},
				expectedLocatorPosition: {top:125, left:150}
			},
			{
				mouse: {x:250, y:150},
				expectedLocatorPosition: {top:125, left:150}
			}
		];

		for (var index in scenarios) {
			var scenario = scenarios[index];

			JQueryLens.refreshLocatorInThumbnail(scenario.mouse.x, scenario.mouse.y);

			expect(locatorDiv.offset()).toEqual(scenario.expectedLocatorPosition);
		}
	});

	it("moves image in lens when mouse moves in thumbnail", function() {
		var thumbnailDiv = $(JQueryLens.thumbnail.id);
		var locatorDiv = $(JQueryLens.locator.id);
		var lensDiv = $(JQueryLens.lens.id);
		var image = JQueryLens.image;

		thumbnailDiv.width(200);
		thumbnailDiv.offset({top:100,left:50})
		lensDiv.width(400);
		lensDiv.height(200);
		image.width(1000);
		image.height(500);

		JQueryLens.init({zoom: 4});

		var scenarios = [
			{
				mouse: {x:150, y:150},
				expectedImagePosition: {top:-150, left:-300}
			}
		];

		for (var index in scenarios) {
			var scenario = scenarios[index];

			JQueryLens.refreshLocatorInThumbnail(scenario.mouse.x, scenario.mouse.y);

			expect(image.position()).toEqual(scenario.expectedImagePosition);
		}
	});

});
