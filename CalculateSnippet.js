function fill(a)
{
	while(a.length < 3)
	{
		a = "0" + a;
	}
	return a;
}

function roundUp(a)
{
	if((a - Math.floor(a)) == 0)
		return a;
	else if((a - Math.floor(a)) <= 0.5)
		return (Math.floor(a)+0.5);
	else
		return (Math.floor(a)+1);
}

function roundDown(a)
{
	if((a - Math.floor(a)) < 0.5)
		return (Math.floor(a));
	else
		return (Math.floor(a)+0.5);
}

function closeContent()
{
	$('content').setStyle('display', 'none');
	$('content_html').setStyle('display', 'none');
}

function calcSnippet()
{
	var pic = $('image').getStyle('background-image');
	pic = pic.substring(13, pic.length - 2);
	var html = "<samp>&lt;div id=\"puzzle_container\"&gt;<br />&lt;div style=\"position: absolute;\" id=\"puzzle\" onMouseOver=\"javascript: document.getElementById('pic_text').style.visibility = 'visible';\" onMouseOut=\"javascript: document.getElementById('pic_text').style.visibility = 'hidden';\"&gt;<br />&lt;img src=\"../../tl_files/projects/personaltowntours/Images/Puzzles/";
	html += pic.substr(0, pic.length - 4);
	html += "_text";
	html += pic.substr(pic.length - 4);
	html += "\" id=\"pic_text\" style=\"position: absolute; visibility: hidden;\" /&gt;<br />&lt;img src=\"../../tl_files/projects/personaltowntours/Images/Puzzles/";
	html += pic;
	html += "\" id=\"pic\"/&gt;";
	var children = $('image').getFirst();
	var next = 0;
	var count = $('image').getChildren().length;

	for(i = 0; i < count; ++i)
	{
		html += "<br />&lt;span id=\"";
		html += fill(i.toString(16));
		html += "\" style=\"left: ";
		html += roundDown((children.getStyle('left').toInt() - (window.innerWidth - $('image').getStyle('width').toInt()) / 2) * 100 / $('image').getStyle('width').toInt());
		html += "%; top: ";
		html += roundDown(children.getStyle('top').toInt() * 100 / $('image').getStyle('height').toInt());
		html += "%; height: ";
		html += roundUp(children.getStyle('height').toInt() * 100 / $('image').getStyle('height').toInt());
		html += "%; width: ";
		html += roundUp(children.getStyle('width').toInt() * 100 / $('image').getStyle('width').toInt());
		html += "%;\" onClick=\"popupContent(this)\"&gt;<br />&lt;/span&gt;";
		children = children.getNext();
	}

	html += "<br />&lt;div id=\"content\"&gt;<br />&lt;span id=\"closer\" onClick=\"closeContent()\"&gt;X&lt;/span&gt;<br />&lt;div id=\"content_text\"&gt;&lt;/div&gt;<br />&lt;/div&gt;<br />&lt;/div&gt;<br />&lt;/div&gt;</samp>";

	$('content').setStyle('display', 'inline');
	$('content_html').setStyle('display', 'inline');
	document.getElementById('content_html').innerHTML = "<span id=\"closer\" onClick=\"closeContent()\">X</span>" + html;
}
