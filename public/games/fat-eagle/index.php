<!DOCTYPE html>
<html>
<head>
	<title>Fat Eagle! - Html5 Game</title>
	<style type="text/css">
		html,body {
			background-color: #000;
			margin: 0;
			padding: 0;
			width: 100%;
			height: 100%;
			overflow: hidden;
		}
	</style>

    <link rel="shortcut icon" href="<?php echo url($path) ?>favicon.ico" type="image/x-icon" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

	<!--<link rel="stylesheet" href="<?php echo url($path) ?>/assets/css/bootstrap.min.css">
	<link rel="stylesheet" id="css-main" href="<?php echo url($path) ?>/assets/css/oneui.css">-->
    <script src="<?php echo asset('/assets/css/bootstrap.min.css') ?>"></script>
    <script src="<?php echo asset('/assets/css/oneui.css') ?>"></script>
    
	<script type="text/javascript" src="<?php echo url($path) ?>/lib/impact/impact.js"></script>
	<script type="text/javascript" src="<?php echo url($path) ?>/lib/game/main.js"></script>
</head>
<body>
		<main id="main-container">
			<div id="game">
				<canvas id="canvas"></canvas>
		    </div>
		</main>
	    <script src="<?php echo asset('/assets/js/core/jquery.min.js') ?>"></script>
		<script src="<?php echo asset('/assets/js/core/bootstrap.min.js') ?>"></script>
	    <script src="<?php echo asset('/assets/js/core/jquery.slimscroll.min.js') ?>"></script>
	    <script src="<?php echo asset('/assets/js/core/jquery.scrollLock.min.js') ?>"></script>
	    <script src="<?php echo asset('/assets/js/core/jquery.appear.min.js') ?>"></script>
	    <script src="<?php echo asset('/assets/js/core/jquery.countTo.min.js') ?>"></script>
	    <script src="<?php echo asset('/assets/js/core/jquery.placeholder.min.js') ?>"></script>
	    <script src="<?php echo asset('/assets/js/core/js.cookie.min.js') ?>"></script>
	    <script src="<?php echo asset('/assets/js/app.js') ?>"></script>

	    <script>
	       jQuery(function () {

	           App.initHelpers('appear');
	       });
	    </script>
	    <script type="text/javascript">
	   //      $(document).ready(function(){
	   //          function resize() {
	   //          	var heightRecalculated = jQuery(window).height() - $('.ctnLogo').height();
	   //              var heightRecalculated = heightRecalculated + "px";

	   //              var widthRecalculated = jQuery(window).width();
	   //              var widthRecalculated = widthRecalculated+'px';

	   //              var height = $(window).height();
				// 	var width = $(window).width(); 

					
				// 	$('#game').attr({ height: heightRecalculated, width: widthRecalculated});
				// 	$('#canvas').attr({ height: heightRecalculated, width: widthRecalculated});
	                
	   //          }

				// resize();
	   //         	jQuery( window ).on("orientationchange",function(event){
	   //         		resize();
	   //          });
	   //      });
	    </script>
</body>
</html>
