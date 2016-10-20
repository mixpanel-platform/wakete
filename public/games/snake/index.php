
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
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CEndPanel.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CPausePanel.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CCell.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CLevelMenu.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CLevel.js"></script>
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CNextLevel.js"></script>
        
        <script type="text/javascript" src="<?php echo url($path) ?>/js/CLevelBut.js"></script>
        
        <style>
        header{
          position: relative;
        }
        </style>
    </head>
    <body ondragstart="return false;" ondrop="return false;" >
	   <div style="position: fixed; background-color: transparent; top: 0px; left: 0px; width: 100%; height: 100%"></div>
          <script>
            $(document).ready(function(){
                     var oMain = new CMain({
                                            time_fruit:10000,   //TIME IN MILLISECONDS FOR SPECIAL FRUIT APPEARANCE
                                            apple_eat_adventure: 2, //NUMBER OF APPLES TO BE EATEN FOR SPAWNING THE SPECIAL FRUITS IN ADVENTURE MODE
                                            apple_eat_survival:5,   //NUMBER OF APPLES TO BE EATEN FOR SPAWNING THE SPECIAL FRUIT IN SURVIVAL MODE
                                            starting_speed_snake:300, //STARTING SNAKE SPEED . DECREASE THIS VALUE IF YOU WANT TO SPEED UP THE SNAKE.
                                            level_time:60000         //TIME IN MILLISECONDS FOR EACH LEVEL IN ADVENTURE MODE.
                                           });

                     
                     $(oMain).on("session_start", function(evt) {
                        if(parent.__ctlArcadeSessionStart){
                            parent.__ctlArcadeSessionStart();
                        }
                        //...ADD YOUR CODE HERE EVENTUALLY
                    });

                    $(oMain).on("session_end", function(evt) {
                           if(parent.__ctlArcadeSessionEnd){
                               parent.__ctlArcadeSessionEnd();
                           }
                           //...ADD YOUR CODE HERE EVENTUALLY
                    });

                    $(oMain).on("save_score", function(evt,iScore) {
                           if(parent.__ctlArcadeSaveScore){
                               parent.__ctlArcadeSaveScore(iScore);
                           }
                           //...ADD YOUR CODE HERE EVENTUALLY
                    });

                    $(oMain).on("start_level", function(evt) {
                           if(parent.__ctlArcadeStartLevel){
                               parent.__ctlArcadeStartLevel();
                           }
                           //...ADD YOUR CODE HERE EVENTUALLY
                    });

                    $(oMain).on("end_level", function(evt) {
                           if(parent.__ctlArcadeEndLevel){
                               parent.__ctlArcadeEndLevel();
                           }
                           //...ADD YOUR CODE HERE EVENTUALLY
                    });

                    if(isIphone()){
                        setTimeout(function(){sizeHandler();},200);
                    }else{
                        sizeHandler();
                    }

                
           });

        </script>
        <canvas id="canvas" class='ani_hack' width="1920" height="1080"> </canvas>
        <script>
          $(document).ready(function(){
            checkOrientation();

            

            function resizeSnake() {
              var heightRecalculated = jQuery(window).height() - $('header').height();
              var heightRecalculated = heightRecalculated + "px";

              $('#canvas').css({"height": heightRecalculated});  
            }

            setTimeout(function() { resizeSnake(); }, 800);
          });

          function checkOrientation(){
            if(window.innerHeight > window.innerWidth){
              $("#canvas").css('display','none');
            }else{
              $("#canvas").css('display','initial');
            }
          } 
          $(window).resize(function(){
            location.reload();
          });

          function onVisibilityChanged() {
            if (document.hidden || document.mozHidden || document.webkitHidden || document.msHidden)
              cr_setSuspended(true);
            else
              cr_setSuspended(false);
          };
        </script>

    </body>
</html>
