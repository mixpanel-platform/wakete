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
	<body ondragstart="return false;" ondrop="return false;" >
		<script>
			// function checkOrientation(){
			// 	if(window.innerHeight > window.innerWidth){
			// 		$("#canvas").css('display','none');
			// 	}else{
			// 		$("#canvas").css('display','initial');
			// 	}
			// } 



			$(window).resize(function(){
				location.reload();
			});

			$(document).ready(function(){
				// checkOrientation();
				var oMain = new CMain({
                                        level_time:60000, //TIME (IN MILLISECONDS) FOR LEVEL
                                        level_goal:[      //EDIT THIS TO CHANGE SCORE GOAL FOR EACH LEVEL
                                            800,          //GOAL SCORE FOR LEVEL 1
                                            2000,         //GOAL SCORE FOR LEVEL 2
                                            3000,         //GOAL SCORE FOR LEVEL 3
                                            5000,         //GOAL SCORE FOR LEVEL 4
                                            7000,         //GOAL SCORE FOR LEVEL 5
                                            9000,         //GOAL SCORE FOR LEVEL 6
                                            10500         //GOAL SCORE FOR LEVEL 7
                                            ]
                                        });


				$(oMain).on("game_start", function(evt) {
                             //alert("game_start");
                         });

				$(oMain).on("next_level", function(evt,iLevel) {
                             //alert("iLevel "+iLevel);
                         });

				$(oMain).on("save_score", function(evt,iScore) {
                             //alert("iScore: "+iScore);
                         });

				$(oMain).on("restart", function(evt) {
                             //alert("restart");
                         });

				sizeHandler();

				var heightRecalculated = jQuery(window).height() - $('header').height();
				var heightRecalculated = heightRecalculated + "px";

				$('#canvas').css({"height": heightRecalculated , "margin-top": $('header').height()});
			});

		</script>
		<canvas id="canvas" class='ani_hack' width="1920" height="1080"> </canvas>

	</body>
</html>
