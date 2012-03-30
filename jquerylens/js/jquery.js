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
    return parseInt($("#image").css("width")) - parseInt($("#lens").css("width"));
}

function calculateTopOutForTop()
{
    return 0;
}

function calculateTopOutForBottom()
{
    return parseInt($("#image").css("height")) - parseInt($("#lens").css("height")) - parseInt($("#image").css("border-bottom-width")) + parseInt($("#image").css("border-top-width"));
}

function mouseOverImage(e)
{
    var ImageHeight = parseInt($("#image").css("height"));
    var ImageLeft = parseInt($("#image").css("left"));
    var ImageTop = parseInt($("#image").css("top"));
    var ImageWidth = parseInt($("#image").css("width"));
    var LensMiddleHeight = parseInt($("#lens").css("height"))/2;
    var LensMiddleWidth = parseInt($("#lens").css("width"))/2;

    var isInBottomQuadrant = ImageTop + LensMiddleHeight;
    var isInTopQuadrant = ImageTop + ImageHeight - LensMiddleHeight;
    var isInLeftQuadrant = ImageLeft + LensMiddleWidth;
    var isInRightQuadrant = ImageLeft + ImageWidth - LensMiddleWidth;

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

$(document).ready(function()
{
    $('#image').mousemove(mouseOverImage);
});