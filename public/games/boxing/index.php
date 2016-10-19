<!DOCTYPE html>
<html>
    <head>
        <title></title>
        <link rel="stylesheet" href="<?php echo url($path) ?>/css/reset.css" type="text/css">
        <link rel="stylesheet" href="<?php echo url($path) ?>/css/main.css" type="text/css">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, minimal-ui" />
        <meta name="msapplication-tap-highlight" content="no"/>
        
        
        <script type="text/javascript" src="<?php echo url($path) ?>/js/hammer.min.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/jquery-2.0.3.min.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/createjs-2014.12.12.min.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/SpriteContainer.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/SpriteStage.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/ctl_utils.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/sprite_lib.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/settings.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CLang.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CPreloader.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CVersusPanel.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CMain.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CSelectButton.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CToggle.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CGfxButton.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CMenu.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CGame.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CInterface.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CHelpPanel.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CPlayer.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CEnemy.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CSelectCharacter.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CContainer.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CChild.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CBitmapFont.js"></script>
        
    </head>
    <body ondragstart="return false;" ondrop="return false;" >
    <div style=" background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%"></div>
          <script>
            $(document).ready(function(){
                
           
                
                         var oMain = new CMain({
                                                enemy_attack_occurr:70, //The enemy percentage of attack values(0-100)
                                                enemy_min_action_time:200,  //The minimum time after wich the enemy will act
                        enemy_max_action_time:900,  //The maximum time after wich the enemy will act
                                                enemy_min_guard_time:500, //The minimum enemy guard time
                                                enemy_max_guard_time:1000,//The maximum enemy guard time
                                                enemy_hp:100, //The enemy health points
                                                player_hp:100,//The player health points
                                                player_stamina:100, //The player stamina
                                                stamina_punch_limit:10 //The player's minimum stamina to attack

                                               });


                         $(oMain).on("game_start", function(evt) {
                                 //alert("game_start");
                         });

                         $(oMain).on("restart", function(evt) {
                                 //alert("restart");
                         });  

                         // Resize
                        var heightRecalculated = jQuery(window).height() - 66;
                        var heightRecalculated = heightRecalculated + "px";

                        function resize() {
                          $('#canvas').css({"height": heightRecalculated});  
                        }

                        setTimeout(function() { resize(); }, 201);
                
                
           });

        </script>  
        <canvas id="canvasbg" class='ani_hack' width="690" height="960" style="z-index: -1; margin-top:60px"> </canvas>
        <canvas id="canvas_interface" class='ani_hack' width="690" height="960" style="display:none; z-index: -1; margin-top:60px"> </canvas>
        <canvas id="canvas" class='ani_hack' width="690" height="960"  style="z-index: -1; margin-top:60px"> </canvas>
        
    </body>
</html>
