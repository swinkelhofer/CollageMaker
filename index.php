<?php
	if(isset($_FILES['userfile']))
	{
		$uploaddir = 'uploads/';
		$uploadfile = $uploaddir . basename($_FILES['userfile']['name']);

		if (!move_uploaded_file($_FILES['userfile']['tmp_name'], $uploadfile))
		    echo "Möglicherweise eine Dateiupload-Attacke!\n";
		else
?>
<html>
<head>
	<title>Collage Maker</title>
	<script type="text/javascript" src="mootools-core-1.4.5.js"></script>
	<script type="text/javascript" src="CollageMaker.js"></script>
	<script type="text/javascript" src="CalculateSnippet.js"></script>
	<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
	<div id="image" style="background-image: url(<?php echo $uploadfile; ?>); background-repeat: no-repeat; width:<?php echo getimagesize($uploadfile)[0]; ?>; height:<?php echo getimagesize($uploadfile)[1]; ?>;"></div>
	<script type="text/javascript">
		init();
	</script>
	<input type="button" value="Create" onClick="calcSnippet()" />
	<div id="content" onClick="closeContent()">
	</div>
	<div id="content_html">
		<span id="closer" onClick="closeContent()">X</span>
	</div>
</body>
</html>
<?php
	}
?>
<?php
	if(!isset($_FILES['userfile']))
	{
?>
<html>
<head>
	<title>Collage Maker</title>
</head>
<body>
	<form enctype="multipart/form-data" action="" method="POST">
    <!-- MAX_FILE_SIZE muss vor dem Dateiupload Input Feld stehen -->
    <input type="hidden" name="MAX_FILE_SIZE" value="300000000" />
    <!-- Der Name des Input Felds bestimmt den Namen im $_FILES Array -->
    Diese Datei hochladen: <input name="userfile" type="file" />
    <input type="submit" value="Send File" />
</form>
</body>
</html>

<?php
	}
?>