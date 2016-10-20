<?php

include('../../libreria/funciones.php');

sesionlive();

?>
<!DOCTYPE html>
<html>
    <head>
        <title></title>
        <link rel="stylesheet" href="css/reset.css" type="text/css">
        <link rel="stylesheet" href="css/main.css" type="text/css">
		<link href='http://fonts.googleapis.com/css?family=Chewy' rel='stylesheet' type='text/css'>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0" />
	<meta name="msapplication-tap-highlight" content="no"/>

        <script type="text/javascript" src="js/jquery-2.0.3.min.js"></script>
        <script type="text/javascript" src="js/createjs-2013.12.12.min.js"></script>
        <script type="text/javascript" src="js/ctl_utils.js"></script>
        <script type="text/javascript" src="js/sprite_lib.js"></script>
        <script type="text/javascript" src="js/settings.js"></script>
        <script type="text/javascript" src="js/CLang.js"></script>
        <script type="text/javascript" src="js/CPreloader.js"></script>
        <script type="text/javascript" src="js/CMain.js"></script>
        <script type="text/javascript" src="js/CTextButton.js"></script>
        <script type="text/javascript" src="js/CGfxButton.js"></script>
        <script type="text/javascript" src="js/CToggle.js"></script>
        <script type="text/javascript" src="js/CMenu.js"></script>
        <script type="text/javascript" src="js/CGame.js"></script>
        <script type="text/javascript" src="js/CInterface.js"></script>
        <script type="text/javascript" src="js/CEndPanel.js"></script>
        <script type="text/javascript" src="js/CTweenController.js"></script>
        <script type="text/javascript" src="js/CLevelSettings.js"></script>
        <script type="text/javascript" src="js/CHero.js"></script>
        <script type="text/javascript" src="js/CBezier.js"></script>
        <script type="text/javascript" src="js/CBall.js"></script>
        <script type="text/javascript" src="js/CNextLevel.js"></script>
        <script type="text/javascript" src="js/CExtraScore.js"></script>
        
        <style type="text/css">
        .volver{
            position: relative;
            left: 0px;
            top: 0px;
            height: 35px;
            background: #F4A903;
            
            font-family: verdana,sans-serif;
            font-weight: 900;
            font-size:14px;
            z-index: 31474836470
        }
        .volver a{
            padding: 5px 10px;
            color: #715A47;
            text-decoration:none;
            position: absolute;
            left:0;
            top:0;
        }
        </style>
    
    </head>
    <body ondragstart="return false;" ondrop="return false;" >
    <div class="volver"><a href="http://juegosmarket.net/catalogo.php" target="_self"><< Volver atrás</a></div>
	<div style="position: fixed; background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%"></div>
          <script>
function checkOrientation(){
	if(window.innerHeight > window.innerWidth){
		$("#canvas").css('display','none');
		please();
	}else{
		$("#please").remove();
		$("#canvas").css('display','initial');
	}
} 

function juego(){
	 var oMain = new CMain({
		combo_value: 50,  //amount added to the score for each ball exploded in a combo
		extra_score: 100  //amount added to the score when level is completely cleared
	});

	 $(oMain).on("game_start", function(evt) {
			 //alert("game_start");
	 });

	 $(oMain).on("save_score", function(evt,iScore) {
			 //alert("iScore: "+iScore);
	 });

	 $(oMain).on("restart", function(evt) {
			 //alert("restart");
	 });
}

function please(){
	if ($("body").find("h1").html()){
	}else{
		var htmlPlease = '<div id="please"><img src="http://juegosmarket.net/games/indiana/img_turn.png"><p><h1 style="color:white">Por favor, gira tu tel&eacute;fono</h1></p></div>';
		$(htmlPlease).appendTo("body");	
	}
}

$(document).ready(function(){
	juego();
	checkOrientation();
});

$(window).on("orientationchange",function(event){
	checkOrientation();
});

$(window).resize(function(){
	checkOrientation();
});			




        </script>
        <canvas id="canvas" class='ani_hack' width="1024" height="768"> </canvas>

    </body>
</html>