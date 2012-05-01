JQueryLens
============================================================

JQueryLens is a JQuery component that allows to place a lens over a given image.

Quickstart
-------------------------------------------------------

You can see an example of use in the "sample" folder.
As you can see in the index.html, we have a specific div structure to get the lens component properly working; we expect to minimize this sort of dependency in further versions of the component.

### sample/index.html

~~~~~ html
<!-- we can to change the ids of divs inside of body 
(considering that later we have to change the ids in the css) -->

<!DOCTYPE html>
<html>
	<head>
    	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" type="text/css" href="css/reset.css">
	    <link rel="stylesheet" type="text/css" href="css/style.css">
        <script src="../vendor/jquery-1.7.1.min.js" type="text/javascript"></script>
        <script src="../js/JQueryLens.js" type="text/javascript"></script>
        <title>JQueryLens Sample</title>
    </head>
    <body>
        <div id="thumbnail" class="resize">
            <img src="img/image.jpg" alt="imagen" />
            <div id="locator">
            </div>
        </div>
        <div id="lens">
            <img id="view" src="img/image.jpg" alt="imagen" />
        </div>
    </body>
</html>
~~~~~

We also provide a CSS stylesheet file for the example, although further versions of the component are expected to work properly with no stylesheet.

### sample/style.css

~~~~~ css
/* in this file we will specify the ids names corresponding to "index.html", 
also we can to change the position (left, top), size (width, height) and border 
of 3 divs and image included (#lens img) */

#thumbnail
{
    border: 0px solid rgba(0,0,0,1);
    left: 40px;
    position: absolute;
    top: 40px;
    width: 400px;
}

#lens
{
    border: 0px solid rgba(0,0,0,1);
    height: 600px;
    left: 500px;
    overflow: hidden;
    position: absolute;
    top: 40px;
    width: 800px;
}

#lens img
{
    height: 1200px;
    position: absolute;
    width: 1600px;
}

#locator
{
    background-color: rgba(255,255,255,0.5);
    border: 0px solid rgba(0,0,0,0.5);
    cursor: pointer;
    left: 0px;
    position: absolute;
    top: 0px;
}

.resize img
{
    height: 100%;
    position: relative;
    width: 100%;
}
~~~~~

Finally, you can change some behaviour of the component in the js/JQueryLens.js file, which in the end has the following snippet of code:

### js/JQueryLens.js

~~~~~ js
$(document).ready(function() {
	JQueryLens.init({
		zoom: 4
	});
	JQueryLens.thumbnail.mousemove(function(e) {
		JQueryLens.refreshLocatorInThumbnail(e.pageX, e.pageY);
	});
});
~~~~~

In further versions of the component, we expect to simplify this function to a unique call to the init() method that you can do inside your own html files. Currently, supported parameters for the init() method are:

- zoom: proportion between real image and lens frame; default value is 4
- locator: id of the lens locator div
- thumbnail: id of the lens thumbnail div
- lens: id of the lens div
