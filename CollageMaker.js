var tempX = 0;
var tempY = 0;
var dragX = 0;
var dragY = 0;
var newDiv = 0;
var resize = false;
var draw = false;
var drag = false;
var dragDiv = 0;
function init()
{
	$('image').addEvent('mousedown', function(event){
	if(!event.rightClick)
	{
		tempX = 0;
		tempY = 0;
		beginDraw(event.page.x, event.page.y);
		    	}
});
$('image').addEvent('mouseup', function(event){
	endDraw(event.page.x, event.page.y);
	endDrag(0,0);
});
$('image').addEvent('mousemove', function(event){
	    		duringDraw(event.page.x, event.page.y);
});
$('image').addEvent('mousemove', function(event)
{
	duringDrag(event.page.x, event.page.y);
});
}
function beginDraw(x, y)
{
	if(dragDiv == 0)
	{
		tempX = x;
		tempY = y;
		draw = true;
		newDiv = new Element('div', {
	    'class': 'overlays'
		});
		$('image').grab(newDiv);
	}
}
function duringDraw(x, y)
{
	if(draw)
	{
		if(tempX < x)
			newDiv.setStyle('left', tempX);
		else	
			newDiv.setStyle('left', x);

		if(tempY < y)
			newDiv.setStyle('top', tempY);
		else
			newDiv.setStyle('top', y);
		newDiv.setStyle('width', Math.abs(x - tempX));
		newDiv.setStyle('height', Math.abs(y - tempY));
	}
}
function endDraw(x, y)
{
	if(draw)
	{
		if(tempX < x)
			newDiv.setStyle('left', tempX);
		else	
			newDiv.setStyle('left', x);

		if(tempY < y)
			newDiv.setStyle('top', tempY);
		else
			newDiv.setStyle('top', y);
		newDiv.setStyle('width', Math.abs(x - tempX));
		newDiv.setStyle('height', Math.abs(y - tempY));
		newDiv.addEvent('mousedown', function(event){
		if(!event.rightClick)
			beginDrag(event.page.x, event.page.y, event.target);
		else
			deleteElement(event.target);
		});
		newDiv.addEvent('mousemove', function(event)
		{
			duringDrag(event.page.x, event.page.y);
		});
		newDiv.addEvent('mouseup', function(event){
			endDrag(event.page.x,event.page.y);
		});
		if(newDiv.getStyle('width').toInt() < 2 || newDiv.getStyle('height').toInt() < 2)
			newDiv.destroy();
		newDiv = 0;
		draw = false;
	}
}
function deleteElement(elem)
{
	if(confirm("Shall I delete this Element?"))
		elem.destroy();
}
function beginDrag(x, y, elem)
{
	if(x > (elem.getStyle('left').toInt() + elem.getStyle('width').toInt() - 5) && y > (elem.getStyle('top').toInt() + elem.getStyle('height').toInt() - 5))
	{
		resize = true;
		dragX = x;
		dragY = y;
		dragDiv = elem;
		dragDiv.setStyle('cursor', 'se-resize')
	}
	else
	{
		dragX = x;
		dragY = y;
		drag = true;
		dragDiv = elem;
	}
}
function duringDrag(x, y)
{
	if(drag)
	{
		dragDiv.setStyle('left', dragDiv.getStyle('left').toInt() - (dragX - x));
		dragDiv.setStyle('top', dragDiv.getStyle('top').toInt() - (dragY - y));
		dragX = x;
		dragY = y;
	}
	else if(resize)
	{
		dragDiv.setStyle('width', dragDiv.getStyle('width').toInt() - (dragX - x));
		dragDiv.setStyle('height', dragDiv.getStyle('height').toInt() - (dragY - y));
		dragX = x;
		dragY = y;
	}
}
function endDrag(x, y)
{
	if(drag || resize)
	{
		dragDiv.setStyle('cursor', 'move');
		dragX = 0;
		dragY = 0;
		drag = false;
		resize = false;
		dragDiv = 0;
	}
}