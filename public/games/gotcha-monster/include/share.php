<?php
$score = $_GET["score"];
$scorex = explode(":", $score);
$highscore = $scorex[0];
?>
<html>
<head>
<title>Gotcha! Monster</title>
<meta property="og:title" content="I just caught a new monster!"/>
<meta property="og:image" content="http://c2vn.com/gmonster/monster_data/monster_images<?php echo $highscore;?>.png"/>
<meta property="og:site_name" content="Best HTML5 game!"/>
<meta property="og:description" content="Gotcha! Monster is a match 3 game. Many monster have been discovered on game. Catch all them and share with your friend"/>    
</head>
<body>
<meta http-equiv="refresh" content="0;URL=http://c2vn.com/gmonster/" />
</body>
</html>