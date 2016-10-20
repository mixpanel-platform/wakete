////////////////////////////////////////////////////////////
// CANVAS LOADER
////////////////////////////////////////////////////////////

 /*!
 * 
 * START CANVAS PRELOADER - This is the function that runs to preload canvas asserts
 * 
 */
function initPreload(){
	toggleLoader(true);
	
	checkMobileEvent();
	
	$(window).resize(function(){
		resizeGameFunc();
	});
	resizeGameFunc();
	
	loader = new createjs.LoadQueue(false);
	manifest=[{src:'/games/theboiledeggs/assets/logo.png', id:'logo'},
			{src:'/games/theboiledeggs/assets/button_start.png', id:'buttonStart'},
			
			{src:'/games/theboiledeggs/assets/tutorial.png', id:'tutorial'},
			{src:'/games/theboiledeggs/assets/button_gotit.png', id:'buttonGotIt'},
			{src:'/games/theboiledeggs/assets/pot.png', id:'pot'},
			{src:'/games/theboiledeggs/assets/water_Spritesheet3x1.png', id:'water'},
			{src:'/games/theboiledeggs/assets/button_cook.png', id:'buttonCook'},
			{src:'/games/theboiledeggs/assets/button_burn.png', id:'buttonBurn'},
			{src:'/games/theboiledeggs/assets/egg.png', id:'egg'},
			{src:'/games/theboiledeggs/assets/egg_soft.png', id:'eggSoft'},
			{src:'/games/theboiledeggs/assets/egg_half.png', id:'eggHalf'},
			{src:'/games/theboiledeggs/assets/egg_hard.png', id:'eggHard'},
			{src:'/games/theboiledeggs/assets/egg_soft_Spritesheet4x3.png', id:'eggSoftResult'},
			{src:'/games/theboiledeggs/assets/egg_half_Spritesheet4x3.png', id:'eggHalfResult'},
			{src:'/games/theboiledeggs/assets/egg_hard_Spritesheet4x3.png', id:'eggHardResult'},
			{src:'/games/theboiledeggs/assets/fire_Spritesheet2x1.png', id:'fire'},
			
			{src:'/games/theboiledeggs/assets/timer_icon_indicator.png', id:'iconTimerIndicator'},
			{src:'/games/theboiledeggs/assets/timer_icon.png', id:'iconTimer'},
			
			{src:'/games/theboiledeggs/assets/heat_indicator.png', id:'barHeatIndicator'},
			{src:'/games/theboiledeggs/assets/heat_bar.png', id:'barHeat'},
			
			{src:'/games/theboiledeggs/assets/button_replay.png', id:'buttonReplay'},
			{src:'/games/theboiledeggs/assets/icon_facebook.png', id:'iconFacebook'},
			{src:'/games/theboiledeggs/assets/icon_twitter.png', id:'iconTwitter'},
			{src:'/games/theboiledeggs/assets/icon_google.png', id:'iconGoogle'}];
	
	soundOn = true;		
	if($.browser.mobile || isTablet){
		if(!enableMobileSound){
			soundOn=false;
		}
	}
	
	if(soundOn){
		manifest.push({src:'/games/theboiledeggs/assets/sounds/button.ogg', id:'soundButton'})
		manifest.push({src:'/games/theboiledeggs/assets/sounds/musicGame.ogg', id:'musicGame'})
		manifest.push({src:'/games/theboiledeggs/assets/sounds/musicMenu.ogg', id:'musicMenu'})
		manifest.push({src:'/games/theboiledeggs/assets/sounds/water_boiling_2.ogg', id:'waterBoiling2'})
		manifest.push({src:'/games/theboiledeggs/assets/sounds/water_pour.ogg', id:'waterPour'})
		manifest.push({src:'/games/theboiledeggs/assets/sounds/water_boiling.ogg', id:'waterBoiling'})
		manifest.push({src:'/games/theboiledeggs/assets/sounds/burn_start.ogg', id:'soundBurn'})
		manifest.push({src:'/games/theboiledeggs/assets/sounds/burning.ogg', id:'soundBurning'})
		manifest.push({src:'/games/theboiledeggs/assets/sounds/egg_crack.ogg', id:'eggCrack'})
		manifest.push({src:'/games/theboiledeggs/assets/sounds/egg_drop.ogg', id:'eggDrop'})
		manifest.push({src:'/games/theboiledeggs/assets/sounds/fire.ogg', id:'soundFire'})
		manifest.push({src:'/games/theboiledeggs/assets/sounds/score.ogg', id:'soundScore'})
		
		createjs.Sound.alternateExtensions = ["mp3"];
		loader.installPlugin(createjs.Sound);
	}
	
	loader.addEventListener("complete", handleComplete);
	loader.on("progress", handleProgress, this);
	loader.loadManifest(manifest);
}

/*!
 * 
 * CANVAS PRELOADER UPDATE - This is the function that runs to update preloder progress
 * 
 */
function handleProgress() {
	$('#mainLoader').html(Math.round(loader.progress/1*100));
}

/*!
 * 
 * CANVAS PRELOADER COMPLETE - This is the function that runs when preloader is complete
 * 
 */
function handleComplete() {
	toggleLoader(false);
	initMain();
};

/*!
 * 
 * TOGGLE LOADER - This is the function that runs to display/hide loader
 * 
 */
function toggleLoader(con){
	if(con){
		$('#mainLoader').show();
	}else{
		$('#mainLoader').hide();
	}
}