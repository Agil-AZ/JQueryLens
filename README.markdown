JQueryLens
============================================================

JQueryLens is a JQuery component which allows to implement a lens over an image uploaded.

Example included
-------------------------------------------------------

Inside the "sample" folder is an index.html that shows the operation of the component.

This image is inside the "img" folder and styles are inside the css folder.

Here is where we can manipulate the values ​​of div's names, sizes and positions ("index.html", "css / style.css").

We can change the image instance too ("index.html", "image / image.jpg").

index.html
----------------------------

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

style.css
----------------------------

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