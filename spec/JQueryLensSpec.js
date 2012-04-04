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
		expect(JQueryLens.lens.attr("id")).toBe("lens");
		expect(JQueryLens.thumbnail.attr("id")).toBe("thumbnail");
		expect(JQueryLens.locator.attr("id")).toBe("locator");
	});

	it("can be initialized with values for its fields", function () {
		var anotherDivId = "temp-div";
        var temp_div = '<div id="' + anotherDivId + '"></div>';
		$(temp_div).appendTo('body');

		JQueryLens.init({
			locator:   anotherDivId,
			thumbnail: anotherDivId,
			lens:  	   anotherDivId
		});

		expect(JQueryLens.locator.attr("id")).toBe(anotherDivId);
		expect(JQueryLens.thumbnail.attr("id")).toBe(anotherDivId);
		expect(JQueryLens.lens.attr("id")).toBe(anotherDivId);

		$('#temp-div').remove();
	});

	it("has locator with same proportion than lens", function () {
		JQueryLens.lens.width(800);
		JQueryLens.lens.height(600);

		JQueryLens.resizeLocator();

		expect(JQueryLens.locator.width() / JQueryLens.locator.height()).toBe(800 / 600);
	});

	it("resizes locator in the proportion the zoom sets when initialized", function () {
		JQueryLens.lens.width(800);
		JQueryLens.lens.height(600);
		JQueryLens.init({zoom: 4});

		expect(JQueryLens.locator.width()).toBe(800 / 4);
		expect(JQueryLens.locator.height()).toBe(600 / 4);
	});

	it("sets thumbnail height according to thumbnail width and the image proportion", function() {
		var image = JQueryLens.image;
		var thumbnail = JQueryLens.thumbnail;

		image.width(1000);
		image.height(500);
		thumbnail.width(200);

		JQueryLens.init({});

		expect(thumbnail.width() / thumbnail.height()).toBe(image.width() / image.height());
	});

	it("sets image position according to locator position in thumbnail", function () {

		var layout = function(scenario) {
			JQueryLens.thumbnail.width(scenario.thumbnailWidth);
			JQueryLens.lens.width(scenario.lensWidth);
			JQueryLens.lens.height(scenario.lensHeight);
			JQueryLens.image.width(scenario.imageWidth);
			JQueryLens.image.height(scenario.imageHeight);
			JQueryLens.init({zoom: scenario.zoom});
			JQueryLens.locator.offset(scenario.locatorPosition);
			JQueryLens.lens.offset(scenario.lensPosition);
		};

		var scenarios = [ 
			{
				thumbnailWidth: 200,
				lensWidth: 400,
				lensHeight: 200,
				imageWidth: 1000,
				imageHeight: 500,
				zoom: 6,
				lensPosition: {top: 0, left: 0},
				locatorPosition: {top: 10, left: 25},
				expectedImagePosition: {top: -60, left: -150}
			},
			{
				thumbnailWidth: 200,
				lensWidth: 400,
				lensHeight: 200,
				imageWidth: 1000,
				imageHeight: 500,
				zoom: 6,
				lensPosition: {top: 0, left: 0},
				locatorPosition: {top: 0, left: 0},
				expectedImagePosition: {top: 0, left: 0}
			},
			{
				thumbnailWidth:  200,
				lensWidth: 400,
				lensHeight: 200,
				imageWidth: 1000,
				imageHeight: 500,
				zoom: 6,
				lensPosition: {top: 0, left: 0},
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
		JQueryLens.thumbnail.width(200);
		JQueryLens.thumbnail.offset({top:100,left:50})
		JQueryLens.lens.width(400);
		JQueryLens.lens.height(200);
		JQueryLens.image.width(1000);
		JQueryLens.image.height(500);

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

			expect(JQueryLens.locator.offset()).toEqual(scenario.expectedLocatorPosition);
		}
	});

	it("moves image in lens when mouse moves in thumbnail", function() {
		JQueryLens.thumbnail.width(400);
		JQueryLens.thumbnail.offset({top:40,left:40})
		JQueryLens.lens.offset({top:40,left:500});
		JQueryLens.lens.width(800);
		JQueryLens.lens.height(600);
		JQueryLens.image.width(1600);
		JQueryLens.image.height(1200);

		JQueryLens.init({zoom: 4});

		var scenarios = [
			{
				mouse: {x:90, y:77.5}, 
				expectedImagePosition: {top:0, left:0}
			},
			{
				mouse: {x:140, y:115}, 
				expectedImagePosition: {top:0, left:0}
			} 
		];

		for (var index in scenarios) {
			var scenario = scenarios[index];

			JQueryLens.refreshLocatorInThumbnail(scenario.mouse.x, scenario.mouse.y);

			expect(JQueryLens.image.position()).toEqual(scenario.expectedImagePosition);
		}
	});

	it("moves image in lens without being affected by position of lens", function() {
		var mouse = {x:100, y:50};

		JQueryLens.thumbnail.width(200);
		JQueryLens.thumbnail.offset({top:100,left:50})
		JQueryLens.lens.width(400);
		JQueryLens.lens.height(200);
		JQueryLens.image.width(1000);
		JQueryLens.image.height(500);

		JQueryLens.init({zoom: 4});

		var scenario1 = { lensTop: 0,  lensLeft: 0 };
		var scenario2 = { lensTop: 40, lensLeft: 400 };
				
		JQueryLens.lens.offset({top: scenario1.lensTop, left: scenario1.lensLeft});
		JQueryLens.refreshLocatorInThumbnail(mouse.x, mouse.y);
		var imagePositionScenario1 = JQueryLens.image.position();

		JQueryLens.lens.offset({top: scenario2.lensTop, left: scenario2.lensLeft});
		JQueryLens.refreshLocatorInThumbnail(mouse.x, mouse.y);
		var imagePositionScenario2 = JQueryLens.image.position();

		expect(imagePositionScenario2).toEqual(imagePositionScenario1);
	});

	it("resizes image on lens depending of zoom", function() {
		JQueryLens.thumbnail.width(400);
		JQueryLens.lens.width(800);
		JQueryLens.lens.height(600);
		JQueryLens.image.width(1600);
		JQueryLens.image.height(1200);	

		var zoom = 6;

		JQueryLens.init({zoom: zoom});

		expect(JQueryLens.image.width()/JQueryLens.thumbnail.width()).toEqual(zoom);
		expect(JQueryLens.image.height()/JQueryLens.thumbnail.height()).toEqual(zoom);
	});

	it("moves locator in thumbnail when assigns a border to thumbnail", function() {
		JQueryLens.thumbnail.width(400);
		JQueryLens.thumbnail.offset({top:40, left:40});
		JQueryLens.lens.width(800);
		JQueryLens.lens.height(600);
		JQueryLens.lens.offset({top:40, left:500});
		JQueryLens.image.width(1600);
		JQueryLens.image.height(1200);

		var zoom = 4;
		var scenario1 = {
							locatorAbsolutePosition:{top:40, left:40}, 
							expectedLocatorPosition:{top:0, left:0}
						}

		JQueryLens.locator.offset({top:scenario1.locatorAbsolutePosition.top, left:scenario1.locatorAbsolutePosition.left});
		JQueryLens.thumbnail.css({border:"10px solid #000"});

		JQueryLens.init({zoom: zoom});
		JQueryLens.refreshLocatorInThumbnail(140, 115);

		expect(JQueryLens.locator.position()).toEqual(scenario1.expectedLocatorPosition);
	});
});