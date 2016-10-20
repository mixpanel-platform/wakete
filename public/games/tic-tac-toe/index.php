
<!DOCTYPE html>
<html lang="en-us">
<head>
<meta charset="UTF-8"/>
	<title>Tic Tac Toe</title>
<link rel="<?php echo url($path) ?>/stylesheet" href="reset.css"/>
<link rel="<?php echo url($path) ?>/stylesheet" href="styles.css"/>
	    <link src="<?php echo asset('/assets/css/bootstrap.min.css') ?>"></link>
	    <link src="<?php echo asset('/assets/css/oneui.css') ?>"></link>
<script src="<?php echo url($path) ?>/config.js"></script>
</head>
<body>
		<main id="main-container">
			<div id="wrapper">
				<div id="game" class="box" style="background-color:transparent;">
					<canvas id="canvas" width="760" height="390"></canvas><!--#canvas-->
				</div><!--#game-->
			</div><!--#wrapper-->
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
	        $(document).ready(function(){
	            function resize() {
	            	var heightRecalculated = jQuery(window).height() - $('.ctnLogo').height();
	                var heightRecalculated = heightRecalculated + "px";

	                var widthRecalculated = jQuery(window).width();
	                var widthRecalculated = widthRecalculated+'px';

	                var height = $(window).height();
					var width = $(window).width(); 

					if(width > height) {
					// Landscape
						//$('#game, #canvas').attr({ height: heightRecalculated, width: widthRecalculated});
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