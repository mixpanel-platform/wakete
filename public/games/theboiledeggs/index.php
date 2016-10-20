<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>The Boiled Eggs</title>
        
        <meta name="Title" content="The Boiled Eggs" />
        <meta name="description" content="The Boiled Eggs is a HTML5 game where you have to boiled different types of eggs with simple steps and controls!.">
		<meta name="keywords" content="cook, boiled, eggs, half, hard, soft, burn, meter, water, pot, types, game">
        
        <!-- for Facebook -->
        <meta property="og:title" content="The Boiled Eggs"/>
        <meta property="og:site_name" content="The Boiled Eggs"/>
        <meta property="og:image" content="http://demonisblack.com/code/theboiledeggs/game/share.jpg" />
        <meta property="og:url" content="http://demonisblack.com/code/theboiledeggs/game/" />
        <meta property="og:description" content="The Boiled Eggs is a HTML5 game where you have to boiled different types of eggs with simple steps and controls!.">
        
        <!-- for Twitter -->
        <meta name="twitter:title" content="The Boiled Eggs" />
        <meta name="twitter:description" content="The Boiled Eggs is a HTML5 game where you have to boiled different types of eggs with simple steps and controls!." />
        <meta name="twitter:image" content="http://demonisblack.com/code/theboiledeggs/game/share.jpg" />
        
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
		<script>
        if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
            var msViewportStyle = document.createElement("style");
            msViewportStyle.appendChild(
                document.createTextNode(
                    "@-ms-viewport{width:device-width}"
                )
            );
            document.getElementsByTagName("head")[0].
                appendChild(msViewportStyle);
        }
        </script>

        <link rel="shortcut icon" href="<?php echo url($path) ?>/icon.ico" type="image/x-icon">
        <link rel="stylesheet" href="<?php echo url($path) ?>/css/normalize.css">
        <link rel="stylesheet" href="<?php echo url($path) ?>/css/main.css">
        <script src="<?php echo url($path) ?>/js/vendor/modernizr-2.6.2.min.js"></script>
        <style>
        header{
            position: relative;
        }
        </style>
    </head>
    <body>
        <!-- PERCENT LOADER START-->
    <div id="mainLoader">0</div>
        <!-- PERCENT LOADER END-->
        
        <!-- CONTENT START-->
        <div id="mainHolder">
        
        	<!-- BROWSER NOT SUPPORT START-->
        	<div id="notSupportHolder">
                <div class="notSupport">YOUR BROWSER ISN'T SUPPORTED.<br/>PLEASE UPDATE YOUR BROWSER IN ORDER TO RUN THE GAME</div>
            </div>
            <!-- BROWSER NOT SUPPORT END-->
            
            <!-- ROTATE INSTRUCTION START-->
            <div id="rotateHolder">
                <div class="mobileRotate">
                        <div class="rotateDesc">Rotate your device <br/>to landscape</div>
                </div>
            </div>
            <!-- ROTATE INSTRUCTION END-->
            
            <!-- CANVAS START-->
            <div id="canvasHolder">
                <canvas id="gameCanvas" width="1024" height="768"></canvas>
            </div>
            <!-- CANVAS END-->
            
        </div>
        <!-- CONTENT END-->
        
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="<?php echo url($path) ?>/js/vendor/jquery-1.8.3.min.js"><\/script>')</script>
        
        <script src="<?php echo url($path) ?>/js/vendor/detectmobilebrowser.js"></script>
        <script src="<?php echo url($path) ?>/js/vendor/TweenMax.min.js"></script>
        <script src="<?php echo url($path) ?>/js/vendor/preloadjs-0.6.1.min.js"></script>
        <script src="<?php echo url($path) ?>/js/vendor/easeljs-0.8.1.min.js"></script>
        <script src="<?php echo url($path) ?>/js/vendor/soundjs-0.6.1.min.js"></script>
        
        <script src="<?php echo url($path) ?>/js/plugins.js"></script>
        <script src="<?php echo url($path) ?>/js/sound.js"></script>
        <script src="<?php echo url($path) ?>/js/canvas.js"></script>
        <script src="<?php echo url($path) ?>/js/game.js"></script>
        <script src="<?php echo url($path) ?>/js/mobile.js"></script>
        <script src="<?php echo url($path) ?>/js/main.js"></script>
        <script src="<?php echo url($path) ?>/js/loader.js"></script>
        <script src="<?php echo url($path) ?>/js/init.js"></script>

        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
        <script>
		  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		  ga('create', 'UA-424386-40', 'auto');
		  ga('send', 'pageview');
		</script>

        <script>
        $(document).ready(function() {
            var headerHeight = $('header').height();
            var windowHeight = $(window).height();
            var heightRecalculated = (windowHeight - headerHeight);

            $('#gameCanvas').css({ "height": heightRecalculated, "width" : "100%"});
        });

        $(window).resize(function(){
            location.reload();
        });  
        </script>
    </body>
</html>