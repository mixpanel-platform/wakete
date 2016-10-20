<!DOCTYPE html>
<html>
<head>
    <title></title>
    <link rel="stylesheet" href="<?php echo url($path) ?>/css/reset.css" type="text/css">
    <link rel="stylesheet" href="<?php echo url($path) ?>/css/main.css" type="text/css">
    <link href='http://fonts.googleapis.com/css?family=Chewy' rel='stylesheet' type='text/css'>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0" />
    <meta name="msapplication-tap-highlight" content="no"/>


    <script type="text/javascript" src="<?php echo url($path) ?>/js/jquery-2.0.3.min.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/createjs-2013.12.12.min.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/ctl_utils.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/sprite_lib.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/settings.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/CLang.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/CPreloader.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/CMain.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/CTextButton.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/CGfxButton.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/CToggle.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/CMenu.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/CGame.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/CInterface.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/CEndPanel.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/CTweenController.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/CLevelSettings.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/CHero.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/CBezier.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/CBall.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/CNextLevel.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/CExtraScore.js"></script>

    <style type="text/css">
        header{
            position: relative;
        }
    </style>
    
</head>
<body >
    <script>
        function checkOrientation(){
               if(window.innerHeight > window.innerWidth){
                 
                  $("#canvas").css('display','initial');
              }else{
                   $("#canvas").css('display','none');
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

            $(document).ready(function(){
               juego();
               checkOrientation();

               setTimeout(function() {
                var heightRecalculated = jQuery(window).height() - $('header').height();
                var heightRecalculated = heightRecalculated + "px";

                $('#canvas').css({"width" : "100%","height": heightRecalculated , "margin-top": "0px",'left':'0px',"position":"relative"});
            }
            ,800);


           });

            $(window).on("orientationchange",function(event){
               checkOrientation();
           });

            $(window).resize(function(){
               checkOrientation();
               location.reload();
           });			




                       </script>
                       <canvas id="canvas" class='ani_hack' width="1024" height="768"> </canvas>

                   </body>
                   </html>