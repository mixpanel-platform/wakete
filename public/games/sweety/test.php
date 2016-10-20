<?php

include('../../libreria/funciones.php');

sesionlive();

?>
<!DOCTYPE html>
<html lang="it">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0" />
	  	<meta name="msapplication-tap-highlight" content="no"/>

        <script type="text/javascript" src="js/jquery-2.0.2.js"></script>
        <script type="text/javascript" src="js/jquery-ui-1.10.3.custom.min.js"></script>
        <script type="text/javascript" src="js/jquery.animate-enhanced.min.js"></script>
        <script type="text/javascript" src="js/jquery.transit.min.js"></script> 
        <script type="text/javascript" src="js/main.js"></script>
		
        
        <link rel="stylesheet" href="css/reset.css" type="text/css" media="screen">
        <link rel="stylesheet" type="text/css" href="css/main.css" />
        <link rel="stylesheet" type="text/css" href="css/skins/sweety/skin.css" />
        
        
        <title>Mahjong</title>
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
    <body ondragstart="return false;" ondrop="return false;">
		<div class="volver"><a href="http://juegosmarket.net/catalogo.php" target="_self"><< Volver atrás</a></div>
		<div id='main_game_container' class='ani_hack'>

                <div id="menu_container"></div>
            
                <div id='menu_layout'></div> 
                
                <div id='help_container'></div>
                
                <div id="match_game_container"></div>
				
                <div id='msg_box'>
                        <div id="msg_box_title" class="msg_box_text"></div>
                        <div id="msg_box_text" class="msg_box_text text_class"></div>
                        <div id="msg_box_button1" class="msg_box_but button_class"></div>
                        <div id="msg_box_button2" class="msg_box_but button_class"></div>
                        <div id="msg_box_button3" class="msg_box_but button_class"></div>
                </div>
        </div>
        
        
        <script>
function checkOrientation(){
	if(window.innerHeight > window.innerWidth){
		$("#main_game_container").css('display','none');
		please();
	}else{
		$("#please").remove();
		$("#main_game_container").css('display','initial');
	}
} 

function juego(){
	var oMain = new CApp();
	$(oMain).on("game_start", function(evt) {
			//alert("game_start");
	 });

	 $(oMain).on("save_score", function(evt,score,bWin) {
			 //alert("save_score: "+score);
			 //alert("bWin: "+bWin);
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
       
    </body>
</html>
