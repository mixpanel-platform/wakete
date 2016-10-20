<!DOCTYPE html>
<html lang="it">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0" />
        <meta name="msapplication-tap-highlight" content="no"/>

        <script type="text/javascript" src="<?php echo url($path) ?>/js/jquery-2.0.2.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/jquery-ui-1.10.3.custom.min.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/jquery.animate-enhanced.min.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/jquery.transit.min.js"></script> 
        <script type="text/javascript" src="<?php echo url($path) ?>/js/main.js"></script>
        
        
        <link rel="stylesheet" href="<?php echo url($path) ?>/css/reset.css" type="text/css" media="screen">
        <link rel="stylesheet" type="text/css" href="<?php echo url($path) ?>/css/main.css" />
        <link rel="stylesheet" type="text/css" href="<?php echo url($path) ?>/css/skins/sweety/skin.css" />
        
        <title>Mahjong</title>
    <style type="text/css">
        header{
            position: relative;
        }
    </style>

    </head>
    <body ondragstart="return false;" ondrop="return false;">
        
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

$(document).ready(function(){
    juego();
    checkOrientation();

    var heightRecalculated = jQuery(window).height() - 200;
    var heightRecalculated = heightRecalculated + "px";

    $('#main_game_container').css({"transform": "scale(0.84, 0.5)" , "margin-top": "0px",'left':'0px'});
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
