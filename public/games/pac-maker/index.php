<!DOCTYPE HTML>
<html>
	<head>
		<title>Pac-Maker</title>
		<meta content="Extremely configurable labyrinth game" name="description">
		<link rel="stylesheet" type="text/css" media="screen" href="<?php echo url($path) ?>/index.css">
		<meta id="viewport" name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
        <link rel="apple-touch-icon" href="<?php echo url($path) ?>/icons/touch-icon-iphone-60x60.png">
        <link rel="apple-touch-icon" sizes="76x76" href="<?php echo url($path) ?>/icons/touch-icon-ipad-76x76.png">
        <link rel="apple-touch-icon" sizes="120x120" href="<?php echo url($path) ?>/icons/touch-icon-iphone-retina-120x120.png">
        <link rel="apple-touch-icon" sizes="152x152" href="<?php echo url($path) ?>/icons/touch-icon-ipad-retina-152x152.png">
		<meta charset="utf-8">
	</head>
	<body>
		<!-- preview -->
		<div id="preview"><img src="<?php echo url($path) ?>/icons/fbPic.jpg">The incredible Pac-Maker</div>

		<!-- rotate warning -->
		<div id="block_land_true"><div id="rotateDevice" style="margin-top:0"><img src="<?php echo url($path) ?>/data/img/gui/rotate_smart_p.png"></div></div>
		<div id="block_land_false"><div id="rotateDevice" style="margin-top:0"><img src="<?php echo url($path) ?>/data/img/gui/rotate_smart_l.png"></div></div>
		
		<!-- Canvas placeholder -->
		<div id="screen"></div>

		<!-- ads -->
		<div id="ads" style="bottom:0; background-color:#000">HERE YOUR ADS CODE</div>

		
		<!-- melonJS Library -->
		<script type="text/javascript" src="<?php echo url($path) ?>/lib/melonJS.js"></script>

		<!-- md5 Library -->
		<script type="text/javascript" src="<?php echo url($path) ?>/lib/md5.js"></script>
		
		<!-- Game -->
		<script type="text/javascript" src="<?php echo url($path) ?>/js/game.js"></script>
		
		<!-- Bootstrap & Mobile optimization tricks -->
		<script type="text/javascript">
			var PREFS;
			var SID = false;
			window.onReady(function onReady() {
				me.loader.load({name: "prefs",  type:"json",  src: "<?php echo url($path) ?>/pac-maker/data/prefs.json"}, function () {
					PREFS = me.loader.getJSON('prefs');
					for (var key in PREFS) {
						if (PREFS.hasOwnProperty(key)) {
							if(PREFS[key]["type"]=="bool"){
								PREFS[key]["value"] = (PREFS[key]["value"]=="true");
							}
							if(PREFS[key]["type"]=="number" || PREFS[key]["type"]=="range"){
								PREFS[key]["value"] = parseFloat(PREFS[key]["value"]);
							}
						}
					}
					
					if(navigator.isCocoonJS){
						game.onload();
					}else{
						me.loader.load({name: "loading",  type:"image",  src: "<?php echo url($path) ?>/pac-maker/data/img/gui/loading.png"}, function () {game.onload();});
					}
				});
			});
		</script>
	</body>
</html>
