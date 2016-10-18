<?php

	
	   
?>
<html lang='en'>
<title>Air Hockey HTML5 game</title> <!--page title-->
<head>
<meta http-equiv='X-UA-Compatible' content='IE=edge' />
<meta http-equiv='pragma' content='no-cache' />
<meta name='apple-mobile-web-app-capable' content='yes' />
<meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0, user-scalable=0, width=device-width, height=device-height' />
<meta name='apple-mobile-web-app-status-bar-style' content='black-translucent' />
<meta charset='utf-8' />
</head>
<body style='background:url(<?php echo url($path) ?>/bg.jpg); margin: 0; padding: 0; overflow: hidden;-webkit-user-select: none;-moz-user-select: none;-ms-user-select:none;-user-select: none;'>
		<main id="main-container">
			<div id='tululoogame' style='width: 320px;margin: 30px auto;
			    -moz-box-shadow: 0 0 10px rgba(0,0,0,0.8);
			    -webkit-box-shadow: 0 0 10px rgba(0,0,0,0.8);
			    box-shadow: 0 0 10px rgba(0,0,0,0.8);'>
			    
			</div>
		</main>
		<script type='text/javascript' src='<?php echo url($path) ?>/game.js'></script>
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
	        $(document).ready(function(){
	            function resize() {
	            	var heightRecalculated = jQuery(window).height() - $('.ctnLogo').height();
	                var heightRecalculated = heightRecalculated + "px";

	                var widthRecalculated = jQuery(window).width();

	                var height = $(window).height();
					var width = $(window).width(); 

					if(width > height) {
					// Landscape
						$('#c2canvas').css({ height: heightRecalculated});
					} else {
					// Portrait
						
					}
	                
	            }

	            setTimeout(function() { resize(); }, 201);

	           	jQuery( window ).on("orientationchange",function(event){
	           		resize();
	            });
	        });
	    </script>
</body>
</html>
