
<!DOCTYPE html>
<html>
    <head>
        <title></title>
        <link rel="stylesheet" href="<?php echo url($path) ?>/css/reset.css" type="text/css">
        <link rel="stylesheet" href="<?php echo url($path) ?>/css/main.css" type="text/css">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0" />
		<meta name="msapplication-tap-highlight" content="no"/>

        <script type="text/javascript" src="<?php echo url($path) ?>/js/jquery-2.0.3.min.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/createjs-2014.12.12.min.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/ctl_utils.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/sprite_lib.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/settings.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CLang.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CPreloader.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CMain.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CTextButton.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CToggle.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CGfxButton.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CMenu.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CGame.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CInterface.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CHelpPanel.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CEndPanel.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CWinText.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CFrog.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CWater.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CStreet.js"></script>        
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CCar.js"></script>        
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CTrunk.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CTurtle.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CLevelPanel.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CFly.js"></script>
        <style type="text/css">
        header{
        	position: relative;
        }
        </style>
    </head>
    <body ondragstart="return false;" ondrop="return false;" >
          <script>
		 function checkOrientation(){
			if(window.innerHeight < window.innerWidth){
				//$("#canvas").css('display','none');
			}else{
				$("#canvas").css('display','initial');
			}
		} 

		function juego(){
			var oMain = new CMain({
				lives: 5, //Number of starting lives
				crossing_time: 60000, // Maximum time available to get a frog into a cove (in ms)
				score_in_nest: 100,   //Points earned when a frog is in the cove
				score_with_fly: 500,  //Points earned when a frog eat a fly in the cove
				score_death: -200,    //Points losed when frog deads

				frog_speed : 100,     //Set the frog jump speed(in ms)
				
				sink_turtle_occurrency: 4,  //Number of standard turtle-group before a sink turtle-group
				num_level_increase_sink: 5, //Number of level before reduce by 1, the "sink_turtle_occurrency" parameter
				
				time_fly_to_spawn: 7000, //Time to spawn a fly (in ms)
				time_fly_to_disappear: 3000, //Time before a fly disappear (in ms)
															
				//Time-Speed of a street lane (in ms). Each value will be randomly assigned to a lane every level
				street_lane_timespeed: [12000, 10000, 9000, 7000, 6000],
				//Decrease time-speed of a street lane (in ms) every level. Each value will be add to "street_lane_speed" parameters vector, respectively
				street_timespeed_decrease_per_level: [-100, -100, -200, -100, -200],
				//Occurrence of a street lane cars spawn (in ms). Each value will be randomly assigned to a lane every level, according with "street_lane_speed" parameters vector
				street_lane_occurrence: [3500, 3700, 3900, 4100, 4300],
				//Decrease occurrence of a street lane cars spawn(in ms). Each value will be subtract to "street_lane_occurrence" parameters vector, respectively
				street_occurrence_decrease_per_level: [-100, -100, -100, -100, -100],
				
				//Time-Speed of a water lane (in ms). From bottom to top:
				water_lane_timespeed: [ 13000,      //FIRST LANE  
										10000,      //SECOND LANE
										8000,       //THIRD LANE
										10000,      //FOURTH LANE
										10000 ],    //FIFTH LANE
				//Decrease time-speed of a water lane (in ms) every level. Each value will be add to "water_lane_speed" parameters vector, respectively
				water_timespeed_decrease_per_level: [   -100,    //FIRST LANE
														-100,    //SECOND LANE
														-200,    //THIRD LANE
														-100,    //FOURTH LANE
														-100 ],  //FIFTH LANE
				//Occurrence of a water lane trunk or turtle spawn (in ms). From bottom to top:
				water_lane_occurrence: [    5000,   //FIRST LANE
											4000,   //SECOND LANE
											3000,   //THIRD LANE
											3500,   //FOURTH LANE
											5000 ], //FIFTH LANE
				//Increase occurrence of a water lane trunk or turtle spawn (in ms). Each value will be add to "water_lane_occurrence" parameters vector, respectively
				water_occurrence_increase_per_level: [  50,   //FIRST LANE
														50,   //SECOND LANE
														50,   //THIRD LANE
														50,   //FOURTH LANE
														50 ]  //FIFTH LANE
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
 	var heightRecalculated = jQuery(window).height() - $('.ctnLogo').height();
                var heightRecalculated = heightRecalculated + "px";

                var widthRecalculated = jQuery(window).width();

                function resizer() {
                    $('#canvas').css({"width" : "100%", "height": heightRecalculated});
                }

                setTimeout(function() { resizer(); }, 201);
});

$(window).on("orientationchange",function(event){
	checkOrientation();
});

$(window).resize(function(){
	checkOrientation();
});




        </script>
        <canvas id="canvas" class='ani_hack' width="640" height="1136"> </canvas>

    </body>
</html>
