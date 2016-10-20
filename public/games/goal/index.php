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
    <script type="text/javascript" src="<?php echo url($path) ?>/js/createjs-2013.12.12.min.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/ctl_utils.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/sprite_lib.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/settings.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/CSlotSettings.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/CLang.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/CPreloader.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/CMain.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/CTextButton.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/CGfxButton.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/CToggle.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/CBetBut.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/CMenu.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/CGame.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/CReelColumn.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/CInterface.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/CHelpPanel.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/CEndPanel.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/CPayTablePanel.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/CStaticSymbolCell.js"></script>
    <script type="text/javascript" src="<?php echo url($path) ?>/js/CTweenController.js"></script>
    <style type="text/css">
        header{
            position: relative;
        }
    </style>
</head>
<body ondragstart="return false;" ondrop="return false;" >
    <script>
        $(window).resize(function(){
            location.reload();
        });

        function checkOrientation(){
            if(window.innerHeight > window.innerWidth){
                $("#canvas").css('display','initial');
            }else{
                $("#canvas").css('display','none');
            }
        } 

        function juego(){
            var oMain = new CMain({
        			min_reel_loop:2,          //NUMBER OF REEL LOOPS BEFORE SLOT STOPS  
        			reel_delay: 6,            //NUMBER OF FRAMES TO DELAY THE REELS THAT START AFTER THE FIRST ONE
        			time_show_win:2000,       //DURATION IN MILLISECONDS OF THE WINNING COMBO SHOWING
        			time_show_all_wins: 2000, //DURATION IN MILLISECONDS OF ALL WINNING COMBO
        			money:2000                //STARING CREDIT FOR THE USER
        		});

            $(oMain).on("game_start", function(evt) {
        		 //alert("game_start");
               });

            $(oMain).on("end_bet", function(evt,iMoney,iBetWin) {
        		 //alert("iMoney: "+iMoney + " Win:"+iBetWin);
               });

            $(oMain).on("restart", function(evt) {
            		 //alert("restart");
           });
        }

        $(document).ready(function(){
        	juego();
        	checkOrientation();
        });


        $(window).resize(function(){
        	location.reload();
        });





    </script>
    <canvas id="canvas" class='ani_hack' width="1024" height="768"> </canvas>

</body>
<script type="text/javascript">
    $(document).ready(function(){
        var heightRecalculated = jQuery(window).height() - $('header').height();
        var heightRecalculated = heightRecalculated + "px";

        function resize() {
            $('#canvas').css({"width" : "100%", "height": heightRecalculated, "left": "0px"});
        }

        setTimeout(function() { resize(); }, 501);
    });
</script>
</html>