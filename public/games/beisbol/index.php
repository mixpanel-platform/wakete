<!DOCTYPE html>
<html>
    <head>
        <title></title>
        <link rel="stylesheet" href="<?php echo url($path) ?>/css/reset.css" type="text/css">
        <link rel="stylesheet" href="<?php echo url($path) ?>/css/main.css" type="text/css">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">


       <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui" />
	<meta name="msapplication-tap-highlight" content="no"/>

        <script type="text/javascript" src="<?php echo url($path) ?>/js/jquery-2.0.3.min.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/createjs-2014.12.12.min.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/main.js"></script>        
    </head>
    <body ondrop="return false;" >
          <script>
            $(document).ready(function(){
                     var oMain = new CMain({
                                            ball_to_throw: 10,     //THIS PARAM SET THE NUMBER OF BALL LAUNCHING
                                            offset_hit: 80,        //INCREASE THIS VALUE (PIXEL MEASURED) IF YOU WANT TO INCREASE PIXEL RANGE FOR BALL HITTING. IN THIS WAY BALL WILL BE MORE EASY TO HIT.
																   //DECREASE IT, IF YOU WANT TO MAKE THE GAME HARDER.
                                            offset_perfect_hit:10, //LIKE OFFSET_HIT PARAM, THIS VALUE MANAGE THE PIXEL RANGE TO PERFORM A PERFECT HIT (HOME RUN). INCREASE/DECREASE THIS VALUE TO GET PERFECT HIT MORE EASILY/BARELY
                                            step_spd_stadium: 0.5, //BALL SPEED IN STADIUM PANEL
                                            score_area1: 10,       //SCORE FOR BALL THROWN IN SECTOR 1
                                            score_area2: 40,	   //SCORE FOR BALL THROWN IN SECTOR 2
                                            score_area3: 100       //SCORE FOR HOME RUN
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
                     
                     $(oMain).on("next_launch", function(evt) {
                             //alert("next_launch");
                     });
                     
                     sizeHandler();

                     var heightRecalculated = jQuery(window).height() - 66;
                     var heightRecalculated = heightRecalculated + "px";

                     function resize() {
                         $('#canvas').css({"height": heightRecalculated , "margin-top": "66px"});  
                     }

                     setTimeout(function() { resize(); }, 201);

                    
           });

        </script>
        <canvas id="canvas" class='ani_hack' width="790" height="960" style="z-index: -1; margin-top: 66px"> </canvas>

    </body>
</html>
