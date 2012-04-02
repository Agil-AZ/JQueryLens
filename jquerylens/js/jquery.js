function calculateLeftIn(e)
{
    return e.pageX-parseInt($("#lens").css("width"))/2 - parseInt($("#image").css("left"));
}

function calculateTopIn(e)
{
    return e.pageY-parseInt($("#lens").css("height"))/2 - parseInt($("#image").css("top"));
}

function calculateLeftOutForLeft()
{
    return 0;
}

function calculateLeftOutForRight()
{
    return parseInt($("#image").css("width")) - 
           parseInt($("#lens").css("width")) - 
           parseInt($("#lens").css("border-left-width")) - 
           parseInt($("#lens").css("border-right-width"));
}

function calculateTopOutForTop()
{
    return 0;
}

function calculateTopOutForBottom()
{
    return parseInt($("#image").css("height")) - 
           parseInt($("#lens").css("height")) - 
           parseInt($("#image").css("border-bottom-width")) + 
           parseInt($("#image").css("border-top-width")) - 
           parseInt($("#lens").css("border-bottom-width")) - 
           parseInt($("#lens").css("border-top-width"));
}

function mouseOverImage(e)
{
    var imageHeight = parseInt($("#image").css("height"));
    var imageLeft = parseInt($("#image").css("left"));
    var imageTop = parseInt($("#image").css("top"));
    var imageWidth = parseInt($("#image").css("width"));
    var lensMiddleHeight = parseInt($("#lens").css("height"))/2;
    var lensMiddleWidth = parseInt($("#lens").css("width"))/2;

    var isInBottomQuadrant = imageTop + lensMiddleHeight;
    var isInTopQuadrant = imageTop + imageHeight - lensMiddleHeight;
    var isInLeftQuadrant = imageLeft + lensMiddleWidth;
    var isInRightQuadrant = imageLeft + imageWidth - lensMiddleWidth;

    if (e.pageY >= isInBottomQuadrant && e.pageY <= isInTopQuadrant && e.pageX >= isInLeftQuadrant && e.pageX <= isInRightQuadrant)
    {
        $("#lens").css({"left" : calculateLeftIn(e)});
        $("#lens").css({"top" : calculateTopIn(e)});
    }

    if (e.pageY < isInBottomQuadrant)
    {
        $("#lens").css({"top" : calculateTopOutForTop()});
    }

    if (e.pageY > isInTopQuadrant)
    {
        $("#lens").css({"top" : calculateTopOutForBottom()});
    }

    if (e.pageX < isInLeftQuadrant)
    {
        $("#lens").css({"left" : calculateLeftOutForLeft()});
    }

    if (e.pageX > isInRightQuadrant)
    {
        $("#lens").css({"left" : calculateLeftOutForRight()});
    }
}

function setLargeImage()
{
    $("#view").css({"left" : 4*(-parseInt($("#lens").css("left")))});
    $("#view").css({"top" : 4*(-parseInt($("#lens").css("top")))});
}

$(document).ready(function()
{
    $("#large-image").css({"height" : 4*parseInt($("#lens").css("height"))});
    $("#large-image").css({"width" : 4*parseInt($("#lens").css("width"))});

    $("#view").css({"height" : 4*parseInt($("#image").css("height"))});
    $("#view").css({"width" : 4*parseInt($("#image").css("width"))});

    $("#image").mousemove(mouseOverImage);
    $("#lens").mousemove(setLargeImage);
});