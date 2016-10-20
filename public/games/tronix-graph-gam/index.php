
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<meta name="msapplication-tap-highlight" content="no">
	<title>Tronix</title>
	<link rel="stylesheet" href="<?php echo url($path) ?>/css/tronix.css">
	    <link src="<?php echo asset('/assets/css/bootstrap.min.css') ?>"></link>
	    <link src="<?php echo asset('/assets/css/oneui.csss') ?>"></link>
</head>
<body>
		<main id="main-container">
			<canvas id="tronix" width="320" height="480"></canvas>
			<div id="tronix-loadscreen">
				<span id="tronix-loadlabel">Loading Tronix ...</span>
				<div id="tronix-loadprogress">
					<div id="tronix-progressbar"></div>
				</div>
				<span id="tronix-progresslabel">0 %</span>
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
</body>
</html>
