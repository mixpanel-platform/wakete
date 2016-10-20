//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//                                      A GAME BY OFFICINE PIXEL SNC
//
//                                      Thank you for purchasing a license
//                                      Please don't spread games files
//                                      Your support let us making more games
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* Game namespace */
var game = {
	// an object where to store game information
	data : {},
	// Run on page load.
	"onload" : function () {
		// Initialize the video.
		game.data.centertop = 0;						// used for centering CANVAS vertically on browser
		game.data.device_portrait_orientated=null;		// true=portrait false=landscape
		game.data.lowres=null;							// tell to the engine if game is running in low relolution or not 
		game.data.Path_Layer = null;					// ref to layer storing path data
		game.data.Dots_Layer = null;					// ref to layer storing collectable dots (it may exists or not)
		game.data.locale = {};							// this will contains translation strings
		game.data.scorePw = "p@cM@k3r";					// password for accessing leaderboard
		game.data.widthGame=0;
		game.data.heightGame=0;
		game.data.real_widthGame=0;
		game.data.real_heightGame=0; 
		
		setupScreenSize();
		var w = getScreenSize("w");
		var h = getScreenSize("h");
		var ratio = h/w;
	
		game.data.real_widthGame=game.data.widthGame;
		game.data.real_heightGame=game.data.heightGame;
	
		game.data.device_portrait_orientated = devicePortraitOriented();
		var videoRenderer =  me.video.CANVAS; // me.video.CANVAS or me.video.WEBGL
		if(me.device.isMobile){							
			 if(navigator.isCocoonJS){												// resolution for mobile devices using Cocoon
				if(game.data.device_portrait_orientated){	// portrait
					me.video.init(game.data.widthGame, parseInt(game.data.widthGame*ratio, 10), {wrapper: "screen", renderer: videoRenderer, scale: 'auto', maintainAspectRatio: true, transparent: false, antiAlias: true});
					game.data.real_heightGame = parseInt(game.data.widthGame*ratio, 10);
				}else{						// landscape
					me.video.init(parseInt(game.data.heightGame/ratio, 10),  game.data.heightGame, {wrapper: "screen", renderer: videoRenderer, scale: 'auto', maintainAspectRatio: true, transparent: false, antiAlias: true});
					game.data.real_widthGame = parseInt(game.data.heightGame/ratio, 10);
				}
				me.sys.interpolation=true;
				me.sys.scalingInterpolation=false;
			}else{																	// resolution for mobile devices browser
				me.event.subscribe(me.event.WINDOW_ONRESIZE, function (event) {
					if(me.device.isFullscreen){
						document.getElementById("screen").style.marginTop = "0px";
					}else{
						game.data.centertop = (window.innerHeight - (window.innerWidth/game.data.widthGame * game.data.heightGame)) /2;
						if(game.data.centertop>0){
							document.getElementById("screen").style.marginTop = game.data.centertop.toString()+"px";
						}else{
							document.getElementById("screen").style.marginTop = "0px";
						}
					}
				});
				game.data.centertop = (window.innerHeight - (window.innerWidth/game.data.widthGame * game.data.heightGame)) /2;
				if(game.data.centertop>0) document.getElementById("screen").style.marginTop = game.data.centertop.toString()+"px";
				if (!me.video.init(game.data.widthGame,  game.data.heightGame, {wrapper: "screen", renderer: videoRenderer, scale: 'auto', maintainAspectRatio: true, transparent: false, antiAlias: true})) {
					alert("Your browser does not support HTML5 CANVAS.");
					return;
				}
				me.sys.scalingInterpolation=PREFS["SCALE_INTERPOLATION_MOBILE"].value;
				me.sys.interpolation=true;
				setTimeout(checkOrientation(), 1000);
			}
	   }else{																		// resolution for desktop browser

			// centering CANVAS if we are on desktop
			me.event.subscribe(me.event.WINDOW_ONRESIZE, function (event) {
				if(me.device.isFullscreen){
					document.getElementById("screen").style.marginTop = "0px";
				}else{
					game.data.centertop = (window.innerHeight - (window.innerWidth/game.data.widthGame * game.data.heightGame)) /2;
					if(game.data.centertop>0){
						document.getElementById("screen").style.marginTop = game.data.centertop.toString()+"px";
					}else{
						document.getElementById("screen").style.marginTop = "0px";
					}
		    	}
			});
		    game.data.centertop = (window.innerHeight - (window.innerWidth/game.data.widthGame * game.data.heightGame)) /2;
		    if(game.data.centertop>0) document.getElementById("screen").style.marginTop = game.data.centertop.toString()+"px";


			if (!me.video.init(game.data.widthGame,  game.data.heightGame, {wrapper: "screen", renderer: videoRenderer, scale: 'auto', maintainAspectRatio: true, transparent: false, antiAlias: true})) {
				alert("Your browser does not support HTML5 CANVAS.");
				return;
			}
		
			me.sys.scalingInterpolation=PREFS["SCALE_INTERPOLATION_DESKTOP"].value;
			me.sys.interpolation=false;
		}	

		me.game.sortOn = "y";

		// Initialize the audio.
		if( me.device.wp ){
			PREFS["AUDIOENABLED"].value = false;	// if Windows Phone do NOT initialize audio.
		}else{
			me.audio.init("mp3,ogg");
		}
	
		// add "#mute" to the URL to disable sounds
		if (document.location.hash === "#mute") {
			window.onReady(function () {
				//me.audio.muteAll();
				PREFS["AUDIOENABLED"].value = false;
			});
		}	
		
		// distinguish between Amazon and Google Play
		if(typeof amazon !== 'undefined'){
			ANDROID_RATING_URL = AMAZON_RATING_URL;
		}

		/// build resource list
		if( !me.device.wp ) game.resources = game.resources.concat(game.resourcesSFX);

		if(me.device.isMobile) {
			game.resources = game.resources.concat(game.resourcesGFX_mobile);
		}else{
			game.resources = game.resources.concat(game.resourcesGFX_desktop);
		}

		/// adding background map graphic files from config
		for( var i = 0; i<PREFS["MAP_FILES"].value.length; i++){
			if(SID){
				game.resources = game.resources.concat([{name: PREFS["MAP_FILES"].value[i].split('/').pop().slice(0, -4), type: "image", src: "users/"+SID+"/" + PREFS["MAP_FILES"].value[i]},]);
			}else{
				game.resources = game.resources.concat([{name: PREFS["MAP_FILES"].value[i].split('/').pop().slice(0, -4), type: "image", src: "data/img/map/" + PREFS["MAP_FILES"].value[i]},]);
			}	
		}

		/// adding levels from config
		for( var i = 0; i<PREFS["LEVELS_FILES"].value.length; i++){
			if(SID){
				game.resources = game.resources.concat([{name: "level"+(i+1), type: "tmx", src: "users/"+SID+"/" + PREFS["LEVELS_FILES"].value[i]},]);
			}else{
				game.resources = game.resources.concat([{name: "level"+(i+1), type: "tmx", src: "data/map/" + PREFS["LEVELS_FILES"].value[i]},]);
			}
		}
	
		/// adding SPRITES from config
		for( var i = 0; i<PREFS["SPRITES_FILES"].value.length; i++){
			if(SID){
				game.resources = game.resources.concat([{name: PREFS["SPRITES_FILES"].value[i].split('/').pop().slice(0, -4), type: "image", src: "users/"+SID+"/" + PREFS["SPRITES_FILES"].value[i]},]);
			}else{
				game.resources = game.resources.concat([{name: PREFS["SPRITES_FILES"].value[i].split('/').pop().slice(0, -4), type: "image", src: "data/img/sprite/" + PREFS["SPRITES_FILES"].value[i]},]);
			}
		}

		// Set custom loader
		me.state.set(me.state.LOADING, new CustomLoadingScreen());
		// Set a callback to run when loading is complete.
		me.loader.onload = this.loaded.bind(this);

		// load the loading image
		me.loader.load({name: "loading",  type:"image",  src: "data/img/gui/loading.png"}, function () {
			// Load the resources.
			me.loader.preload(game.resources);
			// Display a loading screen.
			me.state.change(me.state.LOADING);
		});
	},

	// Run on game resources loaded.
	"loaded" : function () {
		me.state.set(me.state.MENU, new game.MenuScreen());
		me.state.set(me.state.GAMEOVER, new game.GameOverScreen());
		me.state.set(me.state.READY, new game.YouDidItScreen());
		me.state.set(me.state.PLAY, new game.PlayScreen());
		me.state.set(me.state.USER + 1, new game.ChooseScreen());
		me.state.set(me.state.USER + 2, new game.HowToPlayScreen());
		me.state.set(me.state.USER + 3, new game.InfoScreen());
		me.state.set(me.state.USER + 4, new game.NameInputScreen());
		me.state.set(me.state.USER + 6, new game.FullAdScreen());
		me.state.set(me.state.SCORE, new game.ScoreScreen());
		me.state.set(me.state.USER + 7, new game.Restart());

		// add our player entity in the entity pool
		me.pool.register("player", game.PlayerEntity);
		me.pool.register("enemy", game.EnemyEntity);
		me.pool.register("dot", game.dotEntity, true);
		me.pool.register("pill", game.pillEntity, true);
		me.pool.register("exit", game.ExitEntity, true);
		me.pool.register("teleport", game.teleportEntity);
				 
		// enable the keyboard
		me.input.bindKey(me.input.KEY.LEFT,  "left");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.UP,  "up");
		me.input.bindKey(me.input.KEY.DOWN, "down");
		me.input.bindKey(me.input.KEY.P, "pause");
		
		
		if( navigator.userAgent.toLowerCase().indexOf('chrome') > -1 || navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ){
			var gamepads = navigator.getGamepads();
			if( typeof gamepads[0] == 'undefined' ){
				game.gamepad = {axes:[0,0]};
			}else{
				game.gamepad = gamepads[0];
			}
		}else{
			game.gamepad = {axes:[0,0]};
		}
		
		me.input.bindGamepad(0, {type:"buttons", code: me.input.GAMEPAD.BUTTONS.UP}, me.input.KEY.UP );
		me.input.bindGamepad(0, {type:"buttons", code: me.input.GAMEPAD.BUTTONS.DOWN}, me.input.KEY.DOWN );
		me.input.bindGamepad(0, {type:"buttons", code: me.input.GAMEPAD.BUTTONS.LEFT}, me.input.KEY.LEFT );
		me.input.bindGamepad(0, {type:"buttons", code: me.input.GAMEPAD.BUTTONS.RIGHT}, me.input.KEY.RIGHT );
			
		me.input.bindGamepad(0, {type:"buttons", code: me.input.GAMEPAD.BUTTONS.FACE_1}, me.input.KEY.P );
		me.input.bindGamepad(0, {type:"buttons", code: me.input.GAMEPAD.BUTTONS.FACE_2}, me.input.KEY.P );
		me.input.bindGamepad(0, {type:"buttons", code: me.input.GAMEPAD.BUTTONS.FACE_3}, me.input.KEY.P );
		me.input.bindGamepad(0, {type:"buttons", code: me.input.GAMEPAD.BUTTONS.FACE_4}, me.input.KEY.P );

        game.data.tilewidth = PREFS["TILES_WIDTH"].value;
        game.data.tileheight = PREFS["TILES_HEIGHT"].value;

		
		
		// load language
		var l_lang;
			if (navigator.userLanguage) // Explorer
				l_lang = navigator.userLanguage;
			else if (navigator.language) // FF
				l_lang = navigator.language;
			else
				l_lang = "english";
		var lang = l_lang.substring(0, 2);
		if(PREFS["GAME_LANGUAGES"].value.indexOf(lang)==-1) lang=PREFS["GAME_LANGUAGES"].value[0];
		me.loader.load({
				name   : "locale",
				type   : "json",
				src    : "data/locale/"+lang+".json"
			}, function () {
				game.data.locale = me.loader.getJSON('locale');
				me.state.change(me.state.MENU);
			}
		);
	}
};

function checkOrientation() {
    if(PREFS["GAME_WIDTH"].value<PREFS["GAME_HEIGHT"].value != window.innerWidth<window.innerHeight){
    	game.data.centertop = (window.innerHeight - 320) /2;
        if(game.data.centertop>0) document.getElementById('block_land_'+game.data.device_portrait_orientated).style.paddingTop = game.data.centertop.toString()+"px";
    	document.getElementById('block_land_'+game.data.device_portrait_orientated).style.display = 'block';
    }else{
    	document.getElementById('block_land_'+game.data.device_portrait_orientated).style.display = 'none';
    }
    setTimeout(checkOrientation, 100);
}

function devicePortraitOriented(){
	if(PREFS["GAME_WIDTH"].value<PREFS["GAME_HEIGHT"].value){
		return true;
	}else{
		return false;
	}
}

function setupScreenSize(){
		game.data.widthGame=PREFS["GAME_WIDTH"].value;
		game.data.heightGame=PREFS["GAME_HEIGHT"].value;
		game.data.lowres=true;
}

function getScreenSize(l){
	var w = window.innerWidth;
	var h = window.innerHeight;
	if(devicePortraitOriented){
		if (w>h){	// vogliamo sempre lo schermo verticale
			var tmp = w;
			w=h;
			h=tmp;
		}
	}else{
		if (w<h){	// vogliamo sempre lo schermo orizzontale
			var tmp = w;
			w=h;
			h=tmp;
		}
	}
	if(l=="h"){
		return(h);
	}else{
		return(w);
	}
}

Array.prototype.compare = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].compare(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}

if (!Date.now) {
    Date.now = function() { return new Date().getTime(); };
}

function trace(text){
	console.info(text);
}

function getLayerByName(name){
	var layers = me.levelDirector.getCurrentLevel().getLayers();
	for(var i=0; i<layers.length; i++){
		if(layers[i].name==name){
			var layer = layers[i];
			break;
		}
	}
	return layer;
}

game.resourcesGFX_mobile = [
	{name: "help_img", type:"image", src: "data/img/gui/help_mobile.png"}
];

game.resourcesGFX_desktop = [
	{name: "help_img", type:"image", src: "data/img/gui/help_desktop.png"}
];

game.resources = [
	// Graphics. 
	{name: "gui_bg", type:"image", src: "data/img/gui/gui_bg.jpg"},
	{name: "cover", type:"image", src: "data/img/gui/cover.png"},
	{name: "title", type:"image", src: "data/img/gui/title.png"},
	{name: "bitmap_font", type:"image", src: "data/img/font/16x16_font.png"},
	{name: "menu_button", type:"image", src: "data/img/gui/menu_button.png"},
	{name: "small_button", type:"image", src: "data/img/gui/small_button.png"},
	{name: "level_button_lock", type:"image", src: "data/img/gui/level_button_lock.png"},
	{name: "audio_off_button", type:"image", src: "data/img/gui/audio_off_button.png"},
	{name: "audio_on_button", type:"image", src: "data/img/gui/audio_on_button.png"},
	{name: "fullscreen_off_button", type:"image", src: "data/img/gui/fullscreen_off_button.png"},
	{name: "fullscreen_on_button", type:"image", src: "data/img/gui/fullscreen_on_button.png"},
	{name: "info_button", type:"image", src: "data/img/gui/info_button.png"},
	{name: "hiscore_button", type:"image", src: "data/img/gui/hiscore_button.png"},
	{name: "home_button", type:"image", src: "data/img/gui/home_button.png"},
	{name: "restart_button", type:"image", src: "data/img/gui/restart_button.png"},
	{name: "continue_button", type:"image", src: "data/img/gui/continue_button.png"},
	{name: "butt_up", type:"image", src: "data/img/gui/butt_up.png"},
	{name: "butt_down", type:"image", src: "data/img/gui/butt_down.png"},
	{name: "butt_right", type:"image", src: "data/img/gui/butt_right.png"},
	{name: "butt_left", type:"image", src: "data/img/gui/butt_left.png"},
	{name: "butt_x", type:"image", src: "data/img/gui/butt_x.png"},
	{name: "butt_pause", type:"image", src: "data/img/gui/butt_pause.png"},
	{name: "head", type:"image", src: "data/img/gui/head.png"},
	{name: "radar", type:"image", src: "data/img/gui/radar.png"},
	{name: "arrows", type:"image", src: "data/img/gui/arrows.png"}
];

game.resourcesSFX= [
	// Background music. 
	{name: "menu", type: "audio", src: "data/bgm/"},
	{name: "soundtrack", type: "audio", src: "data/bgm/"},
	// Sound effects. 
    {name: "click",  type: "audio", src: "data/sfx/"},
    {name: "victory",  type: "audio", src: "data/sfx/"},
    {name: "dead",  type: "audio", src: "data/sfx/"},
    {name: "dot",  type: "audio", src: "data/sfx/"},
    {name: "growl",  type: "audio", src: "data/sfx/"},
    {name: "powerup",  type: "audio", src: "data/sfx/"},
    {name: "powerdown",  type: "audio", src: "data/sfx/"},
    {name: "killenemy",  type: "audio", src: "data/sfx/"}
];


////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////       ENTITY MANAGER      //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

function entityManager(self, wantedDirection){
	
	if(self.direction == self.wantedDirection){	// entity is going into desired direction
		switch(self.direction){
			case 2:	////////////////////////////////////////////////////////////////////  DOWN v
				if(!self.renderable.isCurrentAnimation("down"+self.mode)){
					self.renderable.setCurrentAnimation("down"+self.mode);
				}
				break;
			
			case 8:	////////////////////////////////////////////////////////////////////  UP ^
				if(!self.renderable.isCurrentAnimation("up"+self.mode)){
					self.renderable.setCurrentAnimation("up"+self.mode);
				}
				break;
			
			case 1:	//////////////////////////////////////////////////////////////////// LEFT <
				if(!self.renderable.isCurrentAnimation("left"+self.mode)){
					self.renderable.setCurrentAnimation("left"+self.mode);
				}
				break
			
			case 4:	//////////////////////////////////////////////////////////////////// RIGHT >
				if(!self.renderable.isCurrentAnimation("right"+self.mode)){
					self.renderable.setCurrentAnimation("right"+self.mode);
				}
				break
		}
	}
	
	//// set desired direction
	if(wantedDirection!=0) self.wantedDirection=wantedDirection;
	
	if( self.pos.x + self.width > game.data.Path_Layer.cols*game.data.Path_Layer.tilewidth ){
		self.body.vel.x = 0;
		self.pos.x = Math.floor((self.pos.x+(game.data.tilewidth/2))/game.data.tilewidth)*game.data.tilewidth;
	}else if( self.pos.x < 0 ){
		self.body.vel.x = 0;
		self.pos.x = Math.floor((self.pos.x+(game.data.tilewidth/2))/game.data.tilewidth)*game.data.tilewidth;
	}
	if( self.pos.y + self.height > game.data.Path_Layer.rows* game.data.Path_Layer.tileheight ){
		self.body.vel.y = 0;
		self.pos.y = Math.floor((self.pos.y+(game.data.tileheight/2))/game.data.tileheight)*game.data.tileheight;
	}else if( self.pos.y<0 ){
		self.body.vel.y = 0;
		self.pos.y = Math.floor((self.pos.y+(game.data.tileheight/2))/game.data.tileheight)*game.data.tileheight;
	}

	var currentTile = getTile(self);
	
	var deltaTilex = Math.abs((Math.floor((self.pos.x+(game.data.tilewidth/2))/game.data.tilewidth)*game.data.tilewidth)-self.pos.x);
	var deltaTiley = Math.abs((Math.floor((self.pos.y+(game.data.tileheight/2))/game.data.tileheight)*game.data.tileheight)-self.pos.y);
	var maxDeltaForStearing = self.velocity; // distanza massima dal centro del tile a cui è consentito svltate

	// collisions

	if ( (currentTile & self.direction) == 8 ){			// up
		self.body.vel.y = game.data.playerIsHunter ? -self.powerupVelocity : -self.velocity ;	// accelera
		self.pos.x = Math.floor((self.pos.x+(game.data.tilewidth/2))/game.data.tilewidth)*game.data.tilewidth;
		self.body.vel.x = 0;
	}else if( (currentTile & self.direction) == 2 ){		// down
		self.body.vel.y = game.data.playerIsHunter ? self.powerupVelocity : self.velocity ;	// accelera
		self.pos.x = Math.floor((self.pos.x+(game.data.tilewidth/2))/game.data.tilewidth)*game.data.tilewidth;
		self.body.vel.x = 0;
	}else if( (currentTile & self.direction) == 4 ){		// right
		self.body.vel.x = game.data.playerIsHunter ? self.powerupVelocity : self.velocity ;	// accelera
		self.pos.y = Math.floor((self.pos.y+(game.data.tileheight/2))/game.data.tileheight)*game.data.tileheight;
		self.body.vel.y = 0;
	}else if( (currentTile & self.direction) == 1 ){		// left
		self.body.vel.x = game.data.playerIsHunter ? -self.powerupVelocity : -self.velocity ;	// accelera
		self.pos.y = Math.floor((self.pos.y+(game.data.tileheight/2))/game.data.tileheight)*game.data.tileheight;
		self.body.vel.y = 0;
	}else{
		if(deltaTilex<maxDeltaForStearing && deltaTiley<maxDeltaForStearing){
			self.body.vel.x = 0;
			self.body.vel.y = 0;
			self.pos.x = Math.floor((self.pos.x+(game.data.tilewidth/2))/game.data.tilewidth)*game.data.tilewidth;
			self.pos.y = Math.floor((self.pos.y+(game.data.tileheight/2))/game.data.tileheight)*game.data.tileheight;
		}
	}

	
	var nextTile = getAheadTile(self);

	// gestione curve e inversioni

	if ( (currentTile & self.wantedDirection) == 8  && deltaTilex<maxDeltaForStearing){			// up
		self.body.vel.y = game.data.playerIsHunter ? -self.powerupVelocity : -self.velocity ;	// accelera
		self.direction = self.wantedDirection;
		self.pos.x = Math.floor((self.pos.x+(game.data.tilewidth/2))/game.data.tilewidth)*game.data.tilewidth;
		self.body.vel.x = 0;

	}else if( (currentTile & self.wantedDirection) == 2  && deltaTilex<maxDeltaForStearing){		// down
		self.body.vel.y =  game.data.playerIsHunter ? self.powerupVelocity : self.velocity ;	// accelera
		self.direction = self.wantedDirection;
		self.pos.x = Math.floor((self.pos.x+(game.data.tilewidth/2))/game.data.tilewidth)*game.data.tilewidth;
		self.body.vel.x = 0;

	}else if( (currentTile & self.wantedDirection) == 4  && deltaTiley<maxDeltaForStearing){		// right
		self.body.vel.x =  game.data.playerIsHunter ? self.powerupVelocity : self.velocity ;	// accelera
		self.direction = self.wantedDirection;
		self.pos.y = Math.floor((self.pos.y+(game.data.tileheight/2))/game.data.tileheight)*game.data.tileheight;
		self.body.vel.y = 0;

	}else if( (currentTile & self.wantedDirection) == 1  && deltaTiley<maxDeltaForStearing){		// left
		self.body.vel.x =  game.data.playerIsHunter ? -self.powerupVelocity : -self.velocity ;	// accelera
		self.direction = self.wantedDirection;
		self.pos.y = Math.floor((self.pos.y+(game.data.tileheight/2))/game.data.tileheight)*game.data.tileheight;
		self.body.vel.y = 0;
	}
	
	return [currentTile,nextTile];
}

function getTile(self){
	var tile = game.data.Path_Layer.getTile(self.pos.x + self.width/2, self.pos.y + self.height/2);
	if (tile!=null){
		return parseInt( tile.tileset.getTileProperties(tile.tileId).direction ,2);
	}else{
		return 0;
	}
}

function getAheadTile(self){
	var dx=0;
	var dy=0;
	switch (self.direction){
		case 8:
			dx=self.width/2;
			dy=-1;
			break;
		case 4:
			dx=self.width+1;
			dy=self.height/2;
			break;
		case 2:
			dx=self.width/2;
			dy=self.height+1;
			break;
		case 1:
			dx=-1;
			dy=self.height/2;
			break;
	}
	if(self.pos.y + dy > game.data.heightGame) return 0;
	if(self.pos.x + dx > game.data.widthGame) return 0;
	if(self.pos.y + dy < 0) return 0;
	if(self.pos.x + dx < 0) return 0;
	
	var tile = game.data.Path_Layer.getTile(self.pos.x + dx, self.pos.y + dy);
	if (tile!=null){
		property = tile.tileset.getTileProperties(tile.tileId);
		if( typeof property != 'undefined'){
			return parseInt( property.direction ,2);
		}else{
			return 0;
		}
	}else{
		return 0;
	}
}

function getBacksideTile(self){
	var dx=0;
	var dy=0;
	switch (self.direction){
		case 8:
			dx=self.width/2;
			dy=self.height;
			break;
		case 4:
			dx=0;
			dy=self.height/2;
			break;
		case 2:
			dx=self.width/2;
			dy=0;
			break;
		case 1:
			dx=self.width
			dy=self.height/2;
			break;
	}
	var tileid = game.data.Path_Layer.getTileId(self.pos.x + dx, self.pos.y + dy);
	if (tileid!=null){
		return parseInt( game.data.Path_Layer.tilesets.getTilesetByGid(tileid).getTileProperties(tileid).direction ,2);
	}else{
		return 0;
	}
}

function registerToRadarAndCollisions(self){
		// setup or clean collision array
		var cols = game.data.Path_Layer.cols;
		var rows = game.data.Path_Layer.rows;
		if(typeof game.data.collisionArray == "undefined"){
			game.data.collisionArray = new Array();
			for(c = 0; c < cols; c++){
				game.data.collisionArray[c] = new Array();
				for(r = 0; r < rows; r++){
					game.data.collisionArray[c].push(0);
				}
			}		
		}else{
			if(game.data.radarEntities.length==0){	// se il radar è vuoto allora questa è la prima entità che si registra e puliamo l'array collisioni
				for(c = 0; c < cols; c++){
					for(r = 0; r < rows; r++){
						game.data.collisionArray[c][r] = 0;
					}
				}
			}
		}
		
		game.data.radarEntities.push(self);
		
		var col = Math.floor((self.pos.x+(game.data.tilewidth/2))/game.data.tilewidth);
		var row = Math.floor((self.pos.y+(game.data.tileheight/2))/game.data.tileheight);
		game.data.collisionArray[col][row] = self.type;
		self.currentTileId = col*row + row;
		self.currentTilePos = new Array(col,row);
		self.previousTileId = self.currentTileId;
		self.previousTilePos = new Array(col,row);
}

function removeFromRadar(self){
	var myID = game.data.radarEntities.indexOf(self);
	game.data.radarEntities.splice(myID, 1);
}

function updateCollisionArray(self){
	var col = Math.floor((self.pos.x+(game.data.tilewidth/2))/game.data.tilewidth);
	var row = Math.floor((self.pos.y+(game.data.tileheight/2))/game.data.tileheight);
	self.currentTileId = col*row + row;
	self.currentTilePos = [col,row];
	if(self.previousTileId != self.currentTileId){
		game.data.collisionArray[self.previousTilePos[0]][self.previousTilePos[1]] = 0;
		game.data.collisionArray[col][row] = self.type;
		self.previousTileId = self.currentTileId;
		self.previousTilePos = [col,row];
	}
}

function getCurrentCollisionArray(self){
	var col = Math.floor((self.pos.x+(game.data.tilewidth/2))/game.data.tilewidth);
	var row = Math.floor((self.pos.y+(game.data.tileheight/2))/game.data.tileheight);
	return game.data.collisionArray[col][row];
}

function getAheadCollisionArray(self){
	var col = Math.floor((self.pos.x+(game.data.tilewidth/2))/game.data.tilewidth);
	var row = Math.floor((self.pos.y+(game.data.tileheight/2))/game.data.tileheight);
	var dx=0;
	var dy=0;
	switch (self.direction){
		case 8:
			dx=0;
			dy=-1;
			break;
		case 4:
			dx=1;
			dy=0;
			break;
		case 2:
			dx=0;
			dy=1;
			break;
		case 1:
			dx=-1;
			dy=0;
			break;
	}
	
	if(col+dx>=game.data.Path_Layer.cols) return 0;
	if(row+dy>=game.data.Path_Layer.rows) return 0;
	if(col+dx<0) return 0;
	if(row+dy<0) return 0;
	return game.data.collisionArray[col+dx][row+dy];
}


1//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////    PLAYER    //////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
game.PlayerEntity = me.Entity.extend({

//////////////////////////////////////////////////////////// INIT PLAYER 
    init: function(x, y, settings) {
		game.data.Path_Layer = getLayerByName("Path");
		this.image = me.loader.getImage("player");
        settings.image = this.image;
		settings.framewidth = game.data.tilewidth;
		settings.frameheight = game.data.tileheight;
		settings.width = game.data.tilewidth;
		settings.height = game.data.tileheight;
		
        this._super(me.Entity, 'init',[x, y, settings]);
        
        // animations
		this.renderable.addAnimation ("up_stand", PREFS["PLAYER_ANIMATION_NORMAL_UP_STAND"].value,60);
		this.renderable.addAnimation ("down_stand", PREFS["PLAYER_ANIMATION_NORMAL_DOWN_STAND"].value,60);
		this.renderable.addAnimation ("right_stand", PREFS["PLAYER_ANIMATION_NORMAL_RIGHT_STAND"].value,60);
		this.renderable.addAnimation ("left_stand", PREFS["PLAYER_ANIMATION_NORMAL_LEFT_STAND"].value,60);

		this.renderable.addAnimation ("up", PREFS["PLAYER_ANIMATION_NORMAL_UP_WALK"].value,60);
		this.renderable.addAnimation ("down", PREFS["PLAYER_ANIMATION_NORMAL_DOWN_WALK"].value,60);
		this.renderable.addAnimation ("right", PREFS["PLAYER_ANIMATION_NORMAL_RIGHT_WALK"].value,60);
		this.renderable.addAnimation ("left", PREFS["PLAYER_ANIMATION_NORMAL_LEFT_WALK"].value,60);

		this.renderable.addAnimation ("up_stand_hunter", PREFS["PLAYER_ANIMATION_POWER_UP_UP_STAND"].value,60);
		this.renderable.addAnimation ("down_stand_hunter", PREFS["PLAYER_ANIMATION_POWER_UP_DOWN_STAND"].value,60);
		this.renderable.addAnimation ("right_stand_hunter", PREFS["PLAYER_ANIMATION_POWER_UP_RIGHT_STAND"].value,60);
		this.renderable.addAnimation ("left_stand_hunter", PREFS["PLAYER_ANIMATION_POWER_UP_LEFT_STAND"].value,60);

		this.renderable.addAnimation ("up_hunter", PREFS["PLAYER_ANIMATION_POWER_UP_UP_WALK"].value,60);
		this.renderable.addAnimation ("down_hunter", PREFS["PLAYER_ANIMATION_POWER_UP_DOWN_WALK"].value,60);
		this.renderable.addAnimation ("right_hunter", PREFS["PLAYER_ANIMATION_POWER_UP_RIGHT_WALK"].value,60);
		this.renderable.addAnimation ("left_hunter", PREFS["PLAYER_ANIMATION_POWER_UP_LEFT_WALK"].value,60);

		this.renderable.addAnimation ("up_stand_power_down", PREFS["PLAYER_ANIMATION_POWER_DOWN_UP_STAND"].value,60);
		this.renderable.addAnimation ("down_stand_power_down", PREFS["PLAYER_ANIMATION_POWER_DOWN_DOWN_STAND"].value,60);
		this.renderable.addAnimation ("right_stand_power_down", PREFS["PLAYER_ANIMATION_POWER_DOWN_RIGHT_STAND"].value,60);
		this.renderable.addAnimation ("left_stand_power_down", PREFS["PLAYER_ANIMATION_POWER_DOWN_LEFT_STAND"].value,60);

		this.renderable.addAnimation ("up_power_down", PREFS["PLAYER_ANIMATION_POWER_DOWN_UP_WALK"].value,60);
		this.renderable.addAnimation ("down_power_down", PREFS["PLAYER_ANIMATION_POWER_DOWN_DOWN_WALK"].value,60);
		this.renderable.addAnimation ("right_power_down", PREFS["PLAYER_ANIMATION_POWER_DOWN_RIGHT_WALK"].value,60);
		this.renderable.addAnimation ("left_power_down", PREFS["PLAYER_ANIMATION_POWER_DOWN_LEFT_WALK"].value,60);

		this.renderable.addAnimation ("victory", PREFS["PLAYER_ANIMATION_VICTORY"].value,60);
		
		this.renderable.addAnimation ("die", PREFS["PLAYER_ANIMATION_DYING"].value,60);
		
		game.data.player=this;

        this.name="player";
        this.state="ready";

		game.data.running=false;

		this.type = game.data.PLAYER_OBJECT;
		me.game.viewport.follow(this, me.game.viewport.AXIS.BOTH);
		this.body.gravity = 0;
		
        this.body.setVelocity(999, 999);		// set the default horizontal & vertical speed (accel vector)
        this.body.vel.x = 0;
        this.body.vel.y = 0;
		
		this.alwaysUpdate = true;				// player can exit the viewport (jumping, falling into a hole, etc.)
		
		this.directions = new Array(8,4,2,1);
		var currentTile = getTile(this);
		do{
			this.direction = this.directions[Math.floor(Math.random()*4)];
		}while ( (this.direction & currentTile) == 0 && currentTile!=0);

		this.wantedDirection=this.direction;
		
		switch(this.direction){
			case 8:
				 this.renderable.setCurrentAnimation("up_stand");
				 break;
			case 4:
				 this.renderable.setCurrentAnimation("right_stand");
				 break;
			case 2:
				 this.renderable.setCurrentAnimation("down_stand");
				 break;
			case 1:
				 this.renderable.setCurrentAnimation("left_stand");
				 break;
		}
		
		registerToRadarAndCollisions(this);

		me.game.world.addChild(new arrows(this), 999);
		
		//me.game.world.addChild(new debug(this), 999);
		
		if(settings.velocity!=null){								// VELOCITY
			this.velocity = parseInt(settings.velocity)/PREFS["MAX_FPS"].value;;
		}else{
			this.velocity = PREFS["PLAYER_VELOCITY"].value/PREFS["MAX_FPS"].value;
		}

		if(settings.powerup_velocity!=null){								// POWER UP VELOCITY
			this.powerupVelocity = parseInt(settings.powerup_velocity)/PREFS["MAX_FPS"].value;;
		}else{
			this.powerupVelocity = PREFS["PLAYER_VELOCITY_ON_POWER_UP"].value/PREFS["MAX_FPS"].value;
		}
		
		game.data.playerIsHunter = false;
		game.data.hunterTimer = 0;
		this.mode="";
		this.teleportTrigger = "allowed";
		
    },
 
//////////////////////////////////////////////////////////// UPDATE PLAYER
    update: function(delta) {
		//console.info(me.timer.tick);
		
		if (me.input.isKeyPressed("pause") && game.data.running) { 		//////////////////////////////////// PAUSA
			me.input.triggerKeyEvent(me.input.KEY.P, false);
			var self = this;
			var w=me.video.renderer.getWidth();
			var h=me.video.renderer.getHeight();
			var pause = new butt_continue_pause(w/2-50,h/2+30);
			me.game.world.addChild(pause,999);
			var home = new butt_home_pause(w/2+50,h/2+30);
			me.game.world.addChild(home,999);
			this.overlay = new me.ColorLayer("overlay", new me.Color(0, 0, 0, 0.3), 0);
			me.game.world.addChild(this.overlay,10);
	    	me.sys.resumeOnFocus=false;
			me.audio.muteAll();
			game.data.text ="pause";
			me.state.pause();
			var resume_loop = setInterval(function check_resume() {
				if (me.input.isKeyPressed("pause")) {
					clearInterval(resume_loop);
					if(PREFS["AUDIOENABLED"].value) me.audio.unmuteAll();
					me.sys.resumeOnFocus = true;
					me.state.resume();
					game.data.text ="";
					me.game.world.removeChild(home);
					me.game.world.removeChild(pause);
					me.input.triggerKeyEvent(me.input.KEY.P, false);
					me.game.world.removeChild(self.overlay);
				}
			}, 10);				
		}
		
		
		switch(this.state) {
			case "ready":		//////////////////////////////////////////////////////// GET READY
				var self = this;
				me.sys.resumeOnFocus=false;
				this.overlay = new me.ColorLayer("overlay", new me.Color(0, 0, 0, 0.3), 0);
				me.game.world.addChild(this.overlay,10);
				this.updateWhenPaused = true;
				this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
					if (action === "up" || action === "down" || action === "left" || action === "right") {
						if(PREFS["MUSICENABLED"].value && PREFS["AUDIOENABLED"].value) me.audio.playTrack("soundtrack");
						game.data.text ="";
						if(self.renderable) self.renderable.alpha=1;
						me.sys.resumeOnFocus=true;
						me.state.resume();
						if(self.renderable) self.state="play";
						me.event.unsubscribe(self.handler);
						me.game.world.removeChild(self.overlay);
						self.updateWhenPaused = false;
						game.data.running = true;
					}
				});
				game.data.text ="getready";
				game.data.running=false;
				me.state.pause();
				this.state="wait";
				break;
			
			case "wait":	//////////////////////////////////////////////////////// GET READY WAIT
				if (game.gamepad.axes[1]!=0 || game.gamepad.axes[0]!=0){
					me.input.triggerKeyEvent(me.input.KEY.LEFT, true);
					me.input.triggerKeyEvent(me.input.KEY.LEFT, false);
				}
				break;
			
			case "done":		//////////////////////////////////////////////////////// DONE
				if (!this.renderable.isCurrentAnimation("victory")){
					this.body.vel.x=0;
					this.body.vel.y=0;
					game.data.running=false;
					if(PREFS["AUDIOENABLED"].value){
						me.audio.play("victory");
					}
					if(PREFS["MUSICENABLED"].value && PREFS["AUDIOENABLED"].value){
						me.audio.stopTrack("soundtrack");
					}
					this.renderable.setCurrentAnimation("victory", (function () {
							me.state.change(me.state.READY);
						}).bind(this));
					this.renderable.setAnimationFrame(1);
					
				}
				break;
			
			case "play": 		//////////////////////////////////////////////////////// PLAY		
				
				if (me.input.isKeyPressed('up') || game.gamepad.axes[1]<0){
					var keyDirection = 8;
				}else if(me.input.isKeyPressed('down') || game.gamepad.axes[1]>0){
					var keyDirection = 2;
				}else if(me.input.isKeyPressed('right') || game.gamepad.axes[0]>0){
					var keyDirection = 4;
				}else if(me.input.isKeyPressed('left') || game.gamepad.axes[0]<0){
					var keyDirection = 1;
				}else{
					var keyDirection = 0;
				}
				
				//////// manage player
				var tiles = entityManager(this, keyDirection);
				var col = Math.floor((this.pos.x+(game.data.tilewidth/2))/game.data.tilewidth);
				var row = Math.floor((this.pos.y+(game.data.tileheight/2))/game.data.tileheight);
				
				// checks for teleports
				if(PREFS["PLAYER_USES_TELEPORT"].value){	
					if(typeof game.data.teleportArray !== "undefined"){
						var cell = game.data.teleportArray[col][row];
						if(cell !== 0){
								var deltaTilex = Math.abs((Math.floor((this.pos.x+(game.data.tilewidth/2))/game.data.tilewidth)*game.data.tilewidth)-this.pos.x);
								var deltaTiley = Math.abs((Math.floor((this.pos.y+(game.data.tileheight/2))/game.data.tileheight)*game.data.tileheight)-this.pos.y);
								if(deltaTilex<4 && deltaTiley<4){
									if(this.teleportTrigger==="allowed"){
										this.teleportTrigger="denied";
										var destinationId = cell.destination;
										var pos = game.data.teleportList[destinationId];
										this.pos.x = pos[0];
										this.pos.y = pos[1];
										// align direction according path direction
										var currentTile = getTile(this);
										do{
											this.direction = this.directions[Math.floor(Math.random()*4)];
										}while ( (this.direction & currentTile) == 0 && currentTile!=0);
										this.wantedDirection=this.direction;
									}
								}
						}else{
							this.teleportTrigger="allowed";
						}
					}
				}
				
				// checks for coins  entity
				var cell = game.data.dotArray[col][row];
				if(cell !== 0){
					if(cell.name==="pill"){
						game.data.playerIsHunter =true;
						game.data.hunterTimer = me.timer.getTime() + PREFS["POWER_UP_DURATION"].value;
						game.data.score += PREFS["PILL_POINTS"].value;
						if(PREFS["PILL_ANIMATION_PICKUP"].value.length>0){
							cell.setCurrentAnimation("pick", (function () {
							   me.game.world.removeChild(cell);
							   removeFromRadar(cell);
							   return false; // do not reset to first frame
							}).bind(this));
						}else{
							me.game.world.removeChild(cell);
							removeFromRadar(cell);
						}
						if(PREFS["AUDIOENABLED"].value) me.audio.play("powerup");
					}else{
						game.data.score += PREFS["DOT_POINTS"].value;
						if(PREFS["DOT_ANIMATION_PICKUP"].value.length>0){
							cell.setCurrentAnimation("pick", (function () {
							   me.game.world.removeChild(cell);
							   removeFromRadar(cell);
							   return false; // do not reset to first frame
							}).bind(this));
						}else{
							me.game.world.removeChild(cell);
							removeFromRadar(cell);
						}
						if(PREFS["AUDIOENABLED"].value) me.audio.play("dot");
					}
					game.data.dotArray[col][row] = 0;
					game.data.dotCounter -= 1;
					if(game.data.dotCounter === 0) this.state="done";
				}
				
				// checks for dots layer
				if(game.data.Dots_Layer != null){
					var tileId = game.data.Dots_Layer.getTileId(this.pos.x+(game.data.tilewidth/2), this.pos.y+(game.data.tileheight/2));
					if(tileId != null){
						game.data.dotCounter -= 1;
						game.data.score += PREFS["DOT_POINTS"].value;
						game.data.Dots_Layer.clearTile(Math.floor((this.pos.x+(game.data.tilewidth/2))/game.data.tilewidth), Math.floor((this.pos.y+(game.data.tileheight/2))/game.data.tileheight))
						if(PREFS["AUDIOENABLED"].value) me.audio.play("dot");
						if(game.data.dotCounter === 0) this.state="done";
					}
				}
				
				////// ending powerup time
				if(game.data.playerIsHunter){
					if(game.data.hunterTimer-me.timer.getTime() < PREFS["ENDING_POWER_UP_ALERT"].value){
							this.mode="_power_down";
						}else{
							this.mode="_hunter";
						}
					
					if(game.data.hunterTimer<me.timer.getTime()){
						game.data.playerIsHunter = false;
						this.mode="";
						if(PREFS["AUDIOENABLED"].value) me.audio.play("powerdown");
					}
				}
				
				//////// stops player animation when player stuck on walls
				if(this.body.vel.x===0 && this.body.vel.y===0){
					switch(this.direction){
						case 2:
							if(!this.renderable.isCurrentAnimation("down_stand"+this.mode)) this.renderable.setCurrentAnimation("down_stand"+this.mode);
							break;
						case 8:
							if(!this.renderable.isCurrentAnimation("up_stand"+this.mode)) this.renderable.setCurrentAnimation("up_stand"+this.mode);
							break;
						case 1:
							if(!this.renderable.isCurrentAnimation("left_stand"+this.mode)) this.renderable.setCurrentAnimation("left_stand"+this.mode);
							break
						case 4:
							if(!this.renderable.isCurrentAnimation("right_stand"+this.mode)) this.renderable.setCurrentAnimation("right_stand"+this.mode);
							break
					}
				}
				
				
				updateCollisionArray(this);
				// handle collisions against other shapes
    			me.collision.check(this);
 				break; 
 			
 			case "die": 	//////////////////////////////////////////////////////// DIE
				game.data.running=false;
				this.body.vel.x=0;
				this.body.vel.y=0;
				if(!this.renderable.isCurrentAnimation("die")){
					this.renderable.setCurrentAnimation("die");
				}
				if(PREFS["MUSICENABLED"].value && PREFS["AUDIOENABLED"].value){
					me.audio.stopTrack("soundtrack");
				}
				if(game.data.lives>0){
					window.setTimeout(function() {
						if(PREFS["ADS_ON_DEATH"].value){
							if (navigator.isCocoonJS){			// fullscreen ad show
								if(ads.interstitialAlreadyDownloaded){
									Cocoon.Ad.showInterstitial();
								}
								me.state.change(me.state.USER + 7); // restart
							}else{
								me.state.change(me.state.USER + 6);
							}
						}else{
							me.state.change(me.state.USER + 7); // restart
							//me.state.current().onResetEvent();
							//me.game.reset();
						}
			
					}, 3000);
				}else{
					window.setTimeout(function() {
						me.state.change(me.state.GAMEOVER);
			
					}, 3000);
				}
				game.data.lives -=1;	
				this.state="wait";
 				break;
 		}
		
		// check & update player movement
        this.body.update();
        // update animation
        this._super(me.Entity, "update", [delta])
        return true;
    },
     
	onCollision : function (response, other) {
		//console.info(response, other);
		other.isCollidingWithPlayer=true;
		// Make all other objects not solid
		return false;
	}
 
});



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////    EXIT    ///////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
game.ExitEntity = me.Entity.extend(
{
	init : function(x, y, settings) {
		this._super(me.Entity, 'init',[x, y, settings]);
		this.layers = me.levelDirector.getCurrentLevel().getLayers();
		this.alwaysUpdate = true;
		this.name="exit";
		this.type=0;
		//registerToRadarAndCollisions(this);
		this.c=Math.floor((x+1)/64);
		this.r=Math.floor((y+1)/64);
		this.w=Math.floor((settings.width+1)/64);
		this.h=Math.floor((settings.height+1)/64); 
		this.Ground_switch =  getLayerByName("Grnd_switch");
		this.Collision_switch =  getLayerByName("Coll_switch");
		this.Ground =  getLayerByName("Ground");
		this.Collision =  getLayerByName("Collision");
	},
	
	update: function(dt){
		if(game.data.surviviorsCounter==0){
			game.data.surviviorsCounter = -1;
			registerToRadarAndCollisions(this);
			
			for(var x=this.c; x<this.c+this.w; x++){
		    	for(var y=this.r; y<this.r+this.h; y++){

		    		var tileId = this.Ground_switch.getTileId(x*64+1,y*64+1);
		    		if(tileId!=null){
		    			//console.info(tileId)
		    			this.Ground.clearTile(x, y)
		    			this.Ground.setTile(x, y, tileId);
		    		}
		    		
		    		var tileId = this.Collision_switch.getTileId(x*64+1,y*64+1);
		    		if(tileId!=null){
		    			this.Collision.clearTile(x, y)
		    			this.Collision.setTile(x, y, tileId);
		    		}
		    	}
		    }
		    me.game.repaint();
		}
	}
});



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////    DEBUG    //////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var debug = me.Renderable.extend({
	init:function(self){
		this.self=self
		this.image =  me.loader.getImage("head");
		this._super(me.Renderable, "init", [0, 0, 10,10]);
		this.floating = true;
		this.sprite_size = 16;
	},

	draw: function(context) {
		//var x = this.self.currentTilePos[0]*game.data.tilewidth;
		//var y = this.self.currentTilePos[1]*game.data.tileheight
		var x = 0;
		var y = 0;
		
		var cols = game.data.Path_Layer.cols;
		var rows = game.data.Path_Layer.rows;
			for(c = 0; c < cols; c++){
				for(r = 0; r < rows; r++){
					if(game.data.collisionArray[c][r]  === game.data.PLAYER_OBJECT ){
						x = c*game.data.tilewidth;
						y = r*game.data.tileheight
					}
				}
			}		
		
		context.drawImage(
			this.image,
			0, 0,
			this.sprite_size, this.sprite_size,
			x, y,
			this.sprite_size,this.sprite_size
		);			
    }
});



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////    ARROWS    //////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var arrows = me.Renderable.extend({
	init:function(self){
		this.self=self
		this.image =  me.loader.getImage("arrows");
		this._super(me.Renderable, "init", [0, 0, 10,10]);
		this.floating = true;
		this.sprite_size = 128;
		this.sinistra = (game.data.real_widthGame/2) - (game.data.widthGame/2);
		this.destra = (game.data.real_widthGame/2) + (game.data.widthGame/2) - this.sprite_size;
		this.alto = (game.data.real_heightGame/2) - (game.data.heightGame/2);
		this.basso = (game.data.real_heightGame/2) + (game.data.heightGame/2) -this.sprite_size;
		this.centerH = (game.data.real_widthGame/2) - (this.sprite_size/2);
		this.centerV = (game.data.real_heightGame/2) - (this.sprite_size/2);
	},

	draw: function(context) {
		if(this.self.direction!=this.self.wantedDirection){	// showing wanted direction
			switch(this.self.wantedDirection){
				case 8:
					context.drawImage(
						this.image,
						0, 0,
						this.sprite_size, this.sprite_size,
						this.centerH, this.alto,
						this.sprite_size,this.sprite_size
					);
					break;
				case 4:
					context.drawImage(
						this.image,
						this.sprite_size, 0,
						this.sprite_size, this.sprite_size,
						this.destra, this.centerV,
						this.sprite_size,this.sprite_size
					);
					break;
				case 2:
					context.drawImage(
						this.image,
						this.sprite_size*2, 0,
						this.sprite_size, this.sprite_size,
						this.centerH, this.basso,
						this.sprite_size,this.sprite_size
					);
					break;
				case 1:
					context.drawImage(
						this.image,
						this.sprite_size*3, 0,
						this.sprite_size, this.sprite_size,
						this.sinistra, this.centerV,
						this.sprite_size,this.sprite_size
					);
					break;
			}				
		}
    }
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////    BUTTONS   //////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var butt_home_pause = me.GUI_Object.extend(
{	
	init:function(x, y,image){
		var settings = {}
		this.image =  me.loader.getImage("home_button");
		settings.image = this.image;
		settings.framewidth = this.image.width;
		settings.frameheight = this.image.height;
		this.x=x-settings.framewidth/2;
		this.y=y-settings.frameheight/2;
		this._super(me.GUI_Object, "init", [x-settings.framewidth/2, y-settings.frameheight/2, settings]);
		this.pos.z = 4;
	},
	
	draw: function(renderer) {
        renderer.drawImage(this.image, this.x, this.y);
    },

	onClick:function(){
		if(PREFS["AUDIOENABLED"].value) me.audio.play("click");
		me.input.triggerKeyEvent(me.input.KEY.P, true);
		if(PREFS["AUDIOENABLED"].value && PREFS["AUDIOENABLED"].value) me.audio.stopTrack("soundtrack");
		me.state.change(me.state.MENU);
		return true;
	}
});

var butt_continue_pause = me.GUI_Object.extend(
{	
	init:function(x, y,image){
		var settings = {}
		this.image =  me.loader.getImage("continue_button");
		settings.image = this.image;
		settings.framewidth = this.image.width;
		settings.frameheight = this.image.height;
		this.x=x-settings.framewidth/2;
		this.y=y-settings.frameheight/2;
		this._super(me.GUI_Object, "init", [x-settings.framewidth/2, y-settings.frameheight/2, settings]);
		this.pos.z = 4;
	},
	
	draw: function(renderer) {
        renderer.drawImage(this.image, this.x, this.y);
    },

	onClick:function(){
		me.input.triggerKeyEvent(me.input.KEY.P, true);
		if(PREFS["AUDIOENABLED"].value) me.audio.play("click");
		return true;
	}
});

var butt_submit_score_pause = me.GUI_Object.extend(
{	
	init:function(x, y,image){
		var settings = {}
		this.image =  me.loader.getImage("butt_submit_score");
		settings.image = this.image;
		settings.framewidth = this.image.width;
		settings.frameheight = this.image.height;
		this.x=x-settings.framewidth/2;
		this.y=y-settings.frameheight/2;
		this._super(me.GUI_Object, "init", [x-settings.framewidth/2, y-settings.frameheight/2, settings]);
		this.pos.z = 4;
	},
	
	draw: function(renderer) {
        renderer.drawImage(this.image, this.x, this.y);
    },
    
	onClick:function(){
		if(PREFS["AUDIOENABLED"].value) me.audio.play("click");
		me.input.triggerKeyEvent(me.input.KEY.P, true);
		if(PREFS["AUDIOENABLED"].value && PREFS["AUDIOENABLED"].value) me.audio.stopTrack("soundtrack");
		me.state.change(me.state.USER + 4);	// go to input name screen
		return true;
	}
});

////////////////////////////////////////////////////////////////////////////
////////////////////////////////    HUD    /////////////////////////////////
////////////////////////////////////////////////////////////////////////////

game.HUD = game.HUD || {};

game.HUD.Container = me.Container.extend({

	init: function() {
		this._super(me.Container, 'init');
		this.isPersistent = true;
		this.collidable = false;
		this.z = Infinity;
    	this.floating = true;
		this.name = "HUD";
		
		this.w=me.video.renderer.getWidth();
		this.h=me.video.renderer.getHeight();

		// add our child score object at the top left corner
		if(PREFS["HUD_POSITION"].value === "upper"){							
			this.addChild(new game.HUD.ScoreItem(this.w-10, 10), Infinity); 
			this.addChild(new game.HUD.LivesItem_graphic(10, 10), Infinity);
			if(PREFS["PAUSE_BUTTON"].value) this.addChild(new game.HUD.butt_pause(this.w/2,16), Infinity);
			this.addChild(new game.HUD.TextItem(), Infinity);
		}else{																	
			this.addChild(new game.HUD.ScoreItem(this.w-10, this.h-20)); 
			this.addChild(new game.HUD.LivesItem_graphic(10, this.h-20));
			if(PREFS["PAUSE_BUTTON"].value) this.addChild(new game.HUD.butt_pause(this.w/2-40, this.h-16));
			this.addChild(new game.HUD.TextItem());
		}
		
		var scaleFactor = this.h/window.innerHeight;
		if(PREFS["RADAR"].value) this.addChild(new game.HUD.RadarItem());
		
		if(me.device.isMobile) {
			if(PREFS["MOBILE_CONTROLS"].value="swipe"){
				me.game.world.addChild(new swipe(),999);
			}else{
				me.game.world.addChild(new tap(),999);
			}
		}
	}
});


////////////////////////////////////////////////////////////////////////////
////////////////////////////////   RADAR   /////////////////////////////////
////////////////////////////////////////////////////////////////////////////
game.HUD.RadarItem = me.Renderable.extend({	
	init: function() {
		var radarUnitSize = PREFS["RADAR_WIDTH"].value/game.data.Path_Layer.cols; // radar block size
		var radar_size= game.data.Path_Layer.cols*radarUnitSize;
		var radar_sizeW= game.data.Path_Layer.cols*radarUnitSize;
		var radar_sizeH= game.data.Path_Layer.rows*radarUnitSize;
		this.x=(me.video.renderer.getWidth()-radar_sizeW) * PREFS["RADAR_POS_X"].value;
		this.y=(me.video.renderer.getHeight()-radar_sizeH) * PREFS["RADAR_POS_Y"].value;
		this._super(me.Renderable, "init", [this.x, this.y, radar_sizeW, radar_sizeH]);
		this.floating = true;
		this.image=me.loader.getImage("radar");
		this.block_size=this.image.height;
		this.radarUnitSize=radarUnitSize;
		this.blink=0;
		this.radar_sizeW= radar_sizeW;
		this.radar_sizeH= radar_sizeH;
		this.floating = true;
		me.input.registerPointerEvent('pointerdown', this, this.onStartEvent.bind(this), true);
		me.input.registerPointerEvent('pointerup', this, this.onEndEvent.bind(this), true);
	},

	/* callback for event click */
	onStartEvent : function(e) {
		if(game.data.running) me.input.triggerKeyEvent(me.input.KEY.P, true);
	},

	/* callback for event click */
	onEndEvent : function(e) {
		if(game.data.running) me.input.triggerKeyEvent(me.input.KEY.P, false);
	},


	/* called when the object is destroyed */
	destroy : function() {
		// unregister events
		me.input.releasePointerEvent('pointerdown', this, this.onStartEvent.bind(this));
		me.input.releasePointerEvent('pointerup', this, this.onEndEvent.bind(this));
	}, 
	
	draw : function (context) {
		context.drawImage(
			this.image,
			this.block_size, 0,
			this.block_size-1, this.block_size,
			this.x, this.y,
			this.radar_sizeW, this.radar_sizeH
		);
		
		this.blink +=1;
		if(this.blink>9)this.blink=0;
				
		for( var i = 0; i<game.data.radarEntities.length; i++){
			var x = this.x + Math.floor(game.data.radarEntities[i].pos.x/(game.data.tilewidth/this.radarUnitSize));
			var y = this.y + Math.floor(game.data.radarEntities[i].pos.y/(game.data.tileheight/this.radarUnitSize));
			if(game.data.radarEntities[i].name=="player"){var type = 2*this.block_size; var blinkTreshold=0;}
			if(game.data.radarEntities[i].name=="dot"){var type = 3*this.block_size; var blinkTreshold=0;}
			if(game.data.radarEntities[i].name=="enemy"){var type = 4*this.block_size; var blinkTreshold=0;}
			if(game.data.radarEntities[i].name=="pill"){var type = 5*this.block_size; var blinkTreshold=6;}
			if(this.blink >= blinkTreshold){
				context.drawImage(
					this.image,
					type, 0,
					this.block_size, this.block_size,
					x, y,
					this.block_size, this.block_size
				);
			}
		}
	}

});



////////////////////////////////////////////////////////////////////////////
////////////////////////////////   SCORE   /////////////////////////////////
////////////////////////////////////////////////////////////////////////////
game.HUD.ScoreItem = me.Renderable.extend({	
	init: function(x, y) {
		this._super(me.Renderable, "init", [x, y, 10,10]);
        var fontsize = game.data.lowres ? 16 : 32;
        this.font = new me.BitmapFont("bitmap_font", fontsize);
        this.font.set("right");
		this.score = -1;
		this.floating = true;
	},

	update : function () {
		if (this.score !== game.data.score) {	
			this.score = game.data.score;
			return true;
		}
		return false;
	},

	draw: function(renderer) {
		this.font.draw (renderer, game.data.score, this.pos.x, this.pos.y);
	}

});

////////////////////////////////////////////////////////////////////////////
////////////////////////////////   LIVES   /////////////////////////////////
////////////////////////////////////////////////////////////////////////////

game.HUD.LivesItem_textual = me.Renderable.extend({	
	init: function(x, y) {	
		this._super(me.Renderable, "init", [x, y, 10,10]);
		var fontsize = game.data.lowres ? 16 : 32;
        this.font = new me.BitmapFont("bitmap_font", fontsize);
        this.font.set("left");
		this.score = -1;
		this.floating = true;
	},

	update : function () {
		if (this.lives !== game.data.lives) {	
			this.lives = game.data.lives;
			return true;
		}
		return false;
	},

	draw: function(renderer) {
		var text = game.data.lives>=0 ? game.data.lives: 0;
		this.font.draw (renderer, "P:"+text, this.pos.x, this.pos.y);
	}

});


game.HUD.LivesItem_graphic = me.Renderable.extend({	
	init: function(x, y) {	

		this._super(me.Renderable, "init", [x, y, 10,10]);
		this.lives = -1;
		this.floating = true;
		this.image = me.loader.getImage("head");

	},

	update : function () {
		if (this.lives !== game.data.lives) {	
			this.lives = game.data.lives;
			return true;
		}
		return false;
	},

	draw : function (context) {
		for (var i=0; i<game.data.lives; i++){
			context.drawImage(this.image, 5+i*this.image.width, 5);
		}
	}

});




////////////////////////////////////////////////////////////////////////////
////////////////////////////////   TEXT   /////////////////////////////////
////////////////////////////////////////////////////////////////////////////

game.HUD.TextItem = me.Renderable.extend({	
	/* constructor	 */
	init: function() {
		this._super(me.Renderable, "init", [0, 0, 10,10]);
        this.font = prepareFont(parseInt(game.data.widthGame/24));
        this.font2 = prepareFont(parseInt(game.data.widthGame/16));
		this.floating = true;
	},

	update : function () {
		return true;
	},

	draw: function(renderer) {
		if(game.data.text=="getready"){
			if(me.device.isMobile){
				text = game.data.locale.start_mobile;
			}else{
				text = game.data.locale.start_desktop;
			}
			drawText (renderer, text, me.game.viewport.width/2, me.game.viewport.height/2, 460, this.font2.font, this.font2.shadow);
		}
		
		if(game.data.text=="pause"){
			var text = game.data.locale.pause;
			drawText (renderer, text, me.game.viewport.width/2, me.game.viewport.height/2-50, 460, this.font2.font, this.font2.shadow);
		}
	}

});

////////////////////////////////////////////////////////////////////////////
//////////////////////////////   BUTTON PAUSE   ////////////////////////////
////////////////////////////////////////////////////////////////////////////

game.HUD.butt_pause = me.GUI_Object.extend(
{	
	init:function(x, y){
		settings = {};
		this.image = me.loader.getImage("butt_pause");
		settings.image = this.image;
		settings.framewidth = this.image.width;
		settings.frameheight = this.image.height;
		this._super(me.GUI_Object, 'init', [x-(settings.framewidth/2), y-(settings.frameheight/2), settings]);
		this.x=x-settings.framewidth/2;
		this.y=y-settings.frameheight/2;
	},

	draw: function(renderer) {
		if(game.data.text==""){
        	renderer.drawImage(this.image, this.x, this.y);
        }
    },

	onClick:function(){
		if(game.data.text=="" && game.data.running){
			me.input.triggerKeyEvent(me.input.KEY.P, true);
		}
	}
});

////////////////////////////////////////////////////////////////////////////
//////////////////////////////      SWIPE     //////////////////////////////
////////////////////////////////////////////////////////////////////////////
var swipe = me.Renderable.extend(
{	
	init:function(){
		this._super(me.Renderable, 'init', [0, 0, game.data.widthGame,game.data.heightGame]);
		this.floating = true;
		me.input.registerPointerEvent('pointerdown', this, this.onStartEvent.bind(this));
		me.input.registerPointerEvent('pointerup', this, this.onEndEvent.bind(this));
		me.input.registerPointerEvent('pointermove', this, this.onMoveEvent.bind(this));
		this.startPos =  new me.Vector2d();
	},

	/* callback for event Start Touch */
	onStartEvent : function(e) {
		//console.info("!", e.changedTouches, e.targetTouches);
		if(typeof e.changedTouches != 'undefined'){
			var touchobj = e.changedTouches[0];
			var pos = me.input.globalToLocal(touchobj.pageX, touchobj.pageY);
		}else{
			var touchobj = e;
			//alert( JSON.stringify(e) );
			var pos = me.input.globalToLocal(touchobj.gameX, touchobj.gameY);
		}
		
		this.startPos = pos;
		//console.info("start")
		me.input.triggerKeyEvent(me.input.KEY.RIGHT, false);
		me.input.triggerKeyEvent(me.input.KEY.LEFT, false);
		me.input.triggerKeyEvent(me.input.KEY.UP, false);
		me.input.triggerKeyEvent(me.input.KEY.DOWN, false);
	},

	/* callback for event End Touch */
	onEndEvent : function(e) {
		if(typeof e.changedTouches != 'undefined'){
			var touchobj = e.changedTouches[0];
			var pos = me.input.globalToLocal(touchobj.pageX, touchobj.pageY);
		}else{
			var touchobj = e;
			var pos = me.input.globalToLocal(touchobj.gameX, touchobj.gameY);
		}
		
		var dx = this.startPos.x - pos.x;
		var dy = this.startPos.y - pos.y;
		if(Math.abs(dx)>10 || Math.abs(dy)>10){
			if(Math.abs(dx) > Math.abs(dy)){
				if(dx>0){
					me.input.triggerKeyEvent(me.input.KEY.LEFT, true);
				}else{
					me.input.triggerKeyEvent(me.input.KEY.RIGHT, true);
				}
			}else{
				if(dy>0){
					me.input.triggerKeyEvent(me.input.KEY.UP, true);
				}else{
					me.input.triggerKeyEvent(me.input.KEY.DOWN, true);
				}
			}
		}
	},
	
	/* callback for event Move Touch */
	onMoveEvent : function(e) {
		//console.info(e.changedTouches, e.targetTouches);
		if(typeof e.changedTouches != 'undefined'){
			var touchobj = e.changedTouches[0];
			var pos = me.input.globalToLocal(touchobj.pageX, touchobj.pageY);
		}else{
			var touchobj = e;
			var pos = me.input.globalToLocal(touchobj.gameX, touchobj.gameY);
		}
		
		var dx = this.startPos.x - pos.x;
		var dy = this.startPos.y - pos.y;
		if(Math.abs(dx)>10 || Math.abs(dy)>10){
			me.input.triggerKeyEvent(me.input.KEY.RIGHT, false);
			me.input.triggerKeyEvent(me.input.KEY.LEFT, false);
			me.input.triggerKeyEvent(me.input.KEY.UP, false);
			me.input.triggerKeyEvent(me.input.KEY.DOWN, false);
			if(Math.abs(dx) > Math.abs(dy)){
				if(dx>0){
					me.input.triggerKeyEvent(me.input.KEY.LEFT, true);
				}else{
					me.input.triggerKeyEvent(me.input.KEY.RIGHT, true);
				}
			}else{
				if(dy>0){
					me.input.triggerKeyEvent(me.input.KEY.UP, true);
				}else{
					me.input.triggerKeyEvent(me.input.KEY.DOWN, true);
				}
			}
			this.startPos = pos;
			//console.info("start")
		}
	},

	/* called when the object is destroyed */
	destroy : function() {
		// unregister events
		me.input.releasePointerEvent('pointerdown', this, this.onStartEvent.bind(this));
		me.input.releasePointerEvent('pointerup', this, this.onEndEvent.bind(this));
		me.input.releasePointerEvent('pointermove', this, this.onMoveEvent.bind(this));
	}
});



////////////////////////////////////////////////////////////////////////////
//////////////////////////////       TAP      //////////////////////////////
////////////////////////////////////////////////////////////////////////////
var tap = me.Renderable.extend(
{	
	init:function(){
		this.image =  me.loader.getImage("arrows");
		this._super(me.Renderable, 'init', [0, 0, game.data.widthGame,game.data.heightGame]);
		this.floating = true;
		this.sprite_size = 128;
		this.region = new me.Rect(0,0,game.data.widthGame,game.data.heightGame);
		this.region.floating = true;
		me.input.registerPointerEvent('pointerdown', this, this.onStartEvent.bind(this),true);
		me.input.registerPointerEvent('pointerup', this, this.onEndEvent.bind(this),true);
	},

	/* callback for event Start Touch */
	onStartEvent : function(e) {
		//console.info(e.changedTouches, e.targetTouches);
		var touchobj = e.changedTouches[0]
		var pos = me.input.globalToLocal(touchobj.pageX, touchobj.pageY);
		var dx = game.data.widthGame/2 - pos.x;
		var dy = game.data.heightGame/2 - pos.y;
		if(Math.abs(dx) > Math.abs(dy)){
			if(dx>0){
				me.input.triggerKeyEvent(me.input.KEY.LEFT, true);
			}else{
				me.input.triggerKeyEvent(me.input.KEY.RIGHT, true);
			}
		}else{
			if(dy>0){
				me.input.triggerKeyEvent(me.input.KEY.UP, true);
			}else{
				me.input.triggerKeyEvent(me.input.KEY.DOWN, true);
			}
		}		
	},

	/* callback for event End Touch */
	onEndEvent : function(e) {
		var touchobj = e.changedTouches[0]
		me.input.triggerKeyEvent(me.input.KEY.RIGHT, false);
		me.input.triggerKeyEvent(me.input.KEY.LEFT, false);
		me.input.triggerKeyEvent(me.input.KEY.UP, false);
		me.input.triggerKeyEvent(me.input.KEY.DOWN, false);
	},
	
	draw: function(context) {
		if (me.input.isKeyPressed('up')){
			context.drawImage(
						this.image,
						0, 0,
						this.sprite_size, this.sprite_size,
						game.data.widthGame/2-this.sprite_size/2, 0,
						this.sprite_size,this.sprite_size
					);
		}else if(me.input.isKeyPressed('down')){
			context.drawImage(
						this.image,
						this.sprite_size*2, 0,
						this.sprite_size, this.sprite_size,
						game.data.widthGame/2-this.sprite_size/2, game.data.heightGame-this.sprite_size,
						this.sprite_size,this.sprite_size
					);
		}else if(me.input.isKeyPressed('right')){
			context.drawImage(
						this.image,
						this.sprite_size, 0,
						this.sprite_size, this.sprite_size,
						game.data.widthGame-this.sprite_size, game.data.heightGame/2-this.sprite_size/2,
						this.sprite_size,this.sprite_size
					);
		}else if(me.input.isKeyPressed('left')){
			context.drawImage(
						this.image,
						this.sprite_size*3, 0,
						this.sprite_size, this.sprite_size,
						0, game.data.heightGame/2-this.sprite_size/2,
						this.sprite_size,this.sprite_size
					);
		}
    },
	
	/* called when the object is destroyed */
	destroy : function() {
		// unregister events
		me.input.releasePointerEvent('pointerdown', this, this.onStartEvent.bind(this));
		me.input.releasePointerEvent('pointerup', this, this.onEndEvent.bind(this));
	}
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////    ENEMY    ///////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
game.EnemyEntity = me.Entity.extend({
	//////////////////////////////////////////////////////////// INIT ENEMY
	init: function(x, y, settings) {
		game.data.Path_Layer =  getLayerByName("Path");
		this.enemyType = settings.type;
		
		this.image = me.loader.getImage(this.enemyType);
        settings.image = this.image;
		settings.framewidth = game.data.tilewidth;
		settings.frameheight = game.data.tileheight
		settings.width = game.data.tilewidth;
		settings.height = game.data.tileheight;

		this.initialX=x;
		this.initialY=y;
		//settings.shapes[0] = new me.Rect(16, 16, 1, 1);
		
		this._super(me.Entity, "init", [x, y, settings]);

        if(settings.behavior!=null){								// behavior
			this.behavior = settings.behavior;
		}else{
			this.behavior = "random";
		}
        
        if(settings.delay!=null){								// delay
			this.respawnTimer = me.timer.getTime()+parseInt(settings.delay);
		}else{
			this.respawnTimer = 0;
		}
        
        // animazioni
		this.renderable.addAnimation ("up", PREFS["ENEMY_ANIMATION_NORMAL_UP_WALK"].value,60);
		this.renderable.addAnimation ("down", PREFS["ENEMY_ANIMATION_NORMAL_DOWN_WALK"].value,60);
		this.renderable.addAnimation ("right", PREFS["ENEMY_ANIMATION_NORMAL_RIGHT_WALK"].value,60);
		this.renderable.addAnimation ("left", PREFS["ENEMY_ANIMATION_NORMAL_LEFT_WALK"].value,60);
		
		this.renderable.addAnimation ("up_attack", PREFS["ENEMY_ANIMATION_ATTACK_UP_WALK"].value,60);
		this.renderable.addAnimation ("down_attack", PREFS["ENEMY_ANIMATION_ATTACK_DOWN_WALK"].value,60);
		this.renderable.addAnimation ("right_attack", PREFS["ENEMY_ANIMATION_ATTACK_RIGHT_WALK"].value,60);
		this.renderable.addAnimation ("left_attack", PREFS["ENEMY_ANIMATION_ATTACK_LEFT_WALK"].value,60);
		
		this.renderable.addAnimation ("up_bite", PREFS["ENEMY_ANIMATION_BITE_UP_WALK"].value,60);
		this.renderable.addAnimation ("down_bite", PREFS["ENEMY_ANIMATION_BITE_DOWN_WALK"].value,60);
		this.renderable.addAnimation ("right_bite", PREFS["ENEMY_ANIMATION_BITE_RIGHT_WALK"].value,60);
		this.renderable.addAnimation ("left_bite", PREFS["ENEMY_ANIMATION_BITE_LEFT_WALK"].value,60);

		this.renderable.addAnimation ("up_scared", PREFS["ENEMY_ANIMATION_SCARED_UP_WALK"].value,60);
		this.renderable.addAnimation ("down_scared", PREFS["ENEMY_ANIMATION_SCARED_DOWN_WALK"].value,60);
		this.renderable.addAnimation ("right_scared", PREFS["ENEMY_ANIMATION_SCARED_RIGHT_WALK"].value,60);
		this.renderable.addAnimation ("left_scared", PREFS["ENEMY_ANIMATION_SCARED_LEFT_WALK"].value,60);

		this.renderable.addAnimation ("up_transition", PREFS["ENEMY_ANIMATION_ENDING_UP_WALK"].value,60);
		this.renderable.addAnimation ("down_transition", PREFS["ENEMY_ANIMATION_ENDING_DOWN_WALK"].value,60);
		this.renderable.addAnimation ("right_transition", PREFS["ENEMY_ANIMATION_ENDING_RIGHT_WALK"].value,60);
		this.renderable.addAnimation ("left_transition", PREFS["ENEMY_ANIMATION_ENDING_LEFT_WALK"].value,60);

		this.renderable.addAnimation ("die", PREFS["ENEMY_ANIMATION_DYING"].value,60);

		this.renderable.addAnimation ("respawn", PREFS["ENEMY_ANIMATION_RESPAWN"].value,60);

        this.name="enemy";
		this.type = game.data.ENEMY_OBJECT;

		this.body.gravity = 0;
		
        this.body.setVelocity(999, 999);		// set the default horizontal & vertical speed (accel vector)

		if(settings.keepAlive!=null){								// KEEP ALIVE
			this.alwaysUpdate = settings.keepAlive;	// player can exit the viewport (jumping, falling into a hole, etc.)
		}else{
			this.alwaysUpdate = false;
		}

		this.directions = new Array(8,4,2,1);
		this.wantedDirection=0;
		
		var currentTile = getTile(this);
		do{
			this.direction = this.directions[Math.floor(Math.random()*4)];
		}while ( (this.direction & currentTile) == 0 && currentTile!=0 );

		switch(this.direction){
			case 8:
				 this.renderable.setCurrentAnimation("up");
				 break;
			case 4:
				 this.renderable.setCurrentAnimation("right");
				 break;
			case 2:
				 this.renderable.setCurrentAnimation("down");
				 break;
			case 1:
				 this.renderable.setCurrentAnimation("left");
				 break;
		}
		
		this.initialDirection = this.direction;
		
		this.state = "idle";
		this.aiTimer = 0;
		this.aiMinTime = 500;
		this.aiMaxTime = 1000;
		
		registerToRadarAndCollisions(this);

		this.currentTileType = 0;
		this.nextTileType = 0;
		
		this.attack=false;
		
		if(settings.velocity!=null){										// VELOCITY
			this.velocity = parseInt(settings.velocity);
		}else{
			this.velocity = PREFS["ENEMY_VELOCITY"].value/PREFS["MAX_FPS"].value;
		}

		if(settings.powerup_velocity!=null){								// POWER UP VELOCITY
			this.powerupVelocity = parseInt(settings.powerup_velocity);
		}else{
			this.powerupVelocity = PREFS["ENEMY_VELOCITY_ON__POWER_UP"].value/PREFS["MAX_FPS"].value;
		}
		
		
		if(PREFS["ENEMY_ANIMATION_RESPAWN"].value.length>0) this.renderable.alpha=0;
		this.mode="";
		//me.game.viewport.follow(this, me.game.viewport.AXIS.BOTH); // debug
		this.isCollidingWithPlayer="false";

	},

	//////////////////////////////////////////////////////////// UPDATE ENEMY
	update: function(delta) {
		switch(this.state) {
			case "idle":
				if(this.respawnTimer<me.timer.getTime() ){
					if(PREFS["ENEMY_ANIMATION_RESPAWN"].value.length>0){
						this.renderable.setCurrentAnimation("respawn", (function () {
							this.state="running";
							return false; // do not reset to first frame
						}).bind(this));
						this.renderable.setAnimationFrame(0);
						this.renderable.alpha=1;
						this.state="donothing";
					}else{
						this.renderable.alpha=1;
						this.state="running";
					}
				}
				break;

			case "donothing":
				// nothing
				break;
			
			case "running":
				if(game.data.running){
					if(game.data.playerIsHunter){
						if(game.data.hunterTimer-me.timer.getTime() < PREFS["ENDING_POWER_UP_ALERT"].value){
							this.mode="_transition";
						}else{
							this.mode="_scared";
						}
					}else{
						this.mode="";
					}
					var keyDirection = 0;
					var currentTile = getTile(this);
					if((this.aiTimer<me.timer.getTime()) || (this.body.vel.x==0 && this.body.vel.y==0) ){
						this.aiTimer = me.timer.getTime() + this.aiMinTime + Math.random()*(this.aiMaxTime-this.aiMinTime);
						
						if(this.behavior=="random"){			////// wandering
							var keyDirection = this.directions[Math.floor(Math.random()*4)];						
							while((keyDirection & currentTile) == 0 && currentTile!=0){
								keyDirection = this.directions[Math.floor(Math.random()*4)];
							}
						}else{									///// Chase
							if(Math.random()>0.5){
								if((this.pos.y+(game.data.tilewidth/2))/game.data.tilewidth > (game.data.player.pos.y+(game.data.tilewidth/2))/game.data.tilewidth) keyDirection=8;
								if((this.pos.y+(game.data.tileheight/2))/game.data.tileheight < (game.data.player.pos.y+(game.data.tileheight/2))/game.data.tileheight) keyDirection=2;
							}else{
								if((this.pos.x+(game.data.tilewidth/2))/game.data.tilewidth > (game.data.player.pos.x+(game.data.tilewidth/2))/game.data.tilewidth) keyDirection=1;
								if((this.pos.x+(game.data.tileheight/2))/game.data.tileheight < (game.data.player.pos.x+(game.data.tileheight/2))/game.data.tileheight) keyDirection=4;
							}

							if( (keyDirection & currentTile) == 0 && (this.body.vel.x==0 && this.body.vel.y==0) ){
								var keyDirection = this.directions[Math.floor(Math.random()*4)];						
								while((keyDirection & currentTile) == 0 && currentTile!=0){
									keyDirection = this.directions[Math.floor(Math.random()*4)];
								}
							}
						}
					}
				
					if(PREFS["ENEMIES_USE_TELEPORT"].value){	
						var col = Math.floor((this.pos.x+(game.data.tilewidth/2))/game.data.tilewidth);
						var row = Math.floor((this.pos.y+(game.data.tileheight/2))/game.data.tileheight);
						// checks for teleports
						if(typeof game.data.teleportArray !== "undefined"){
							var cell = game.data.teleportArray[col][row];
							if(cell !== 0){
								var deltaTilex = Math.abs((Math.floor((this.pos.x+(game.data.tilewidth/2))/game.data.tilewidth)*game.data.tilewidth)-this.pos.x);
								var deltaTiley = Math.abs((Math.floor((this.pos.y+(game.data.tileheight/2))/game.data.tileheight)*game.data.tileheight)-this.pos.y);
								if(deltaTilex<4 && deltaTiley<4){
									//console.info("cell destination: "+cell.destination, "cell id: "+cell.id, "this pos: "+game.data.teleportList[cell.id], "destination pos: "+game.data.teleportList[cell.destination], "trigger: "+this.teleportTrigger);
									if(this.teleportTrigger==="allowed"){
										this.teleportTrigger="denied";
										var destinationId = cell.destination;
										var pos = game.data.teleportList[destinationId];
										this.pos.x = pos[0];
										this.pos.y = pos[1];
										//console.info(destinationId, pos, game.data.teleportList);
										// align direction according path direction
										var currentTile = getTile(this);
										do{
											this.direction = this.directions[Math.floor(Math.random()*4)];
										}while ( (this.direction & currentTile) == 0 && currentTile!=0);
										this.wantedDirection=this.direction;
									}
								}
							}else{
								this.teleportTrigger="allowed";
							}
						}
					}
				
					// avoid collisions with other enemies
					var aheadCollision = getAheadCollisionArray(this);
				
					if(aheadCollision == game.data.PLAYER_OBJECT){
						if(!this.attack && !game.data.playerIsHunter){
							this.attack=true;
							if(PREFS["AUDIOENABLED"].value) me.audio.play("growl");
							this.mode="_attack";
							if (this.renderable.isCurrentAnimation("up")) this.renderable.setCurrentAnimation( "up_attack");
							if (this.renderable.isCurrentAnimation("down")) this.renderable.setCurrentAnimation( "down_attack");
							if (this.renderable.isCurrentAnimation("left")) this.renderable.setCurrentAnimation( "left_attack");
							if (this.renderable.isCurrentAnimation("right")) this.renderable.setCurrentAnimation( "right_attack");
						}
					}else{
						this.attack=false;
					}
					
					var tiles = entityManager(this, keyDirection);
					// check and update movement
					
					//////////////////////////////////////////////////////////////////////////// DIE
					if(this.isCollidingWithPlayer){
						if(this.pos.distance(game.data.player.pos)<20){
							if(game.data.playerIsHunter && PREFS["POWER_UP_INVULNERABILITY"].value){		// player in hunter mode
								if(PREFS["POWER_UP_KILLS_ENEMIES"].value){
									game.data.score += PREFS["ENEMY_POINTS"].value
									me.game.world.addChild(new game.EnemyPointsEntity(this.pos.x, this.pos.y, PREFS["ENEMY_POINTS"].value), 999);

									if(PREFS["ENEMY_ANIMATION_DYING"].value.length>0){
										this.renderable.setCurrentAnimation("die", (function () {
											if(PREFS["ON_DEAD_ENEMY_ACTION"].value==="respawn"){
												this.pos.x = this.initialX;
												this.pos.y = this.initialY;
												this.respawnTimer = me.timer.getTime() + PREFS["ENEMY_RESPAWN_TIME"].value;
												this.body.vel.x=0;
												this.body.vel.y=0;
												this.state="idle";
												this.mode="";
												this.direction = this.initialDirection;
												switch(this.direction){
													case 8: this.renderable.setCurrentAnimation("up"); break;
													case 4: this.renderable.setCurrentAnimation("right"); break;
													case 2: this.renderable.setCurrentAnimation("down"); break;
													case 1: this.renderable.setCurrentAnimation("left"); break;
												}
												this.renderable.alpha= PREFS["ENEMIES_HIDDEN_ON_DEAD"].value==true ? 0:1;
												this.body.update();
											}else{
												me.game.world.removeChild(this);
												removeFromRadar(this);
											}
											
											return false; // do not reset to first frame
										}).bind(this));
										this.renderable.setAnimationFrame(0);
										this.state="donothing";
									}else{
										if(PREFS["ON_DEAD_ENEMY_ACTION"].value==="respawn"){
											this.pos.x = this.initialX;
											this.pos.y = this.initialY;
											this.respawnTimer = me.timer.getTime() + PREFS["ENEMY_RESPAWN_TIME"].value;
											this.body.vel.x=0;
											this.body.vel.y=0;
											this.state="idle";
											this.mode="";
											this.renderable.alpha=1;
											this.direction = this.initialDirection;
											switch(this.direction){
												case 8: this.renderable.setCurrentAnimation("up"); break;
												case 4: this.renderable.setCurrentAnimation("right"); break;
												case 2: this.renderable.setCurrentAnimation("down"); break;
												case 1: this.renderable.setCurrentAnimation("left"); break;
											}
										}else{
											me.game.world.removeChild(this);
											removeFromRadar(this);
										}
									}
									if(PREFS["AUDIOENABLED"].value) me.audio.play("killenemy");
								}
							}else{								// enemy not in hunter mode
								if (this.renderable.isCurrentAnimation("up") || this.renderable.isCurrentAnimation("up_attack")) this.renderable.setCurrentAnimation( "up_bite");
								if (this.renderable.isCurrentAnimation("down") || this.renderable.isCurrentAnimation("down_attack")) this.renderable.setCurrentAnimation( "down_bite");
								if (this.renderable.isCurrentAnimation("left") || this.renderable.isCurrentAnimation("left_attack")) this.renderable.setCurrentAnimation( "left_bite");
								if (this.renderable.isCurrentAnimation("right") || this.renderable.isCurrentAnimation("right_attack")) this.renderable.setCurrentAnimation( "right_bite");
								if(PREFS["AUDIOENABLED"].value) me.audio.play("dead");
								game.data.player.state="die";
								me.game.world.moveToTop(game.data.player);
							}
						}
					}
					
					this.body.update();

					this.isCollidingWithPlayer="false";
					
				}else{
					this.body.vel.x=0;
					this.body.vel.y=0;
				}
				break;
		}
		// update object animation
		this._super(me.Entity, "update", [delta])
		return true;
	},
	
	onCollision : function (response, other) {
		// Make all other objects not solid
		return false;
	}
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////// ENEMY POINTS //////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
game.EnemyPointsEntity = me.Renderable.extend({	
	/* constructor	 */
	init: function(x, y, value) {
		this._super(me.Renderable, "init", [x, y, 10,10]);
        this.font = new me.BitmapFont("bitmap_font", 16);
        this.font.set("center");
		this.value = value;
		this.life = 0;
	},

	/* update function */
	update : function () {
		if(this.life<20){
			this.pos.y -= 1;
			this.life++;
        }else{
        	me.game.world.removeChild(this);
        }
		
		return true;
	},

	/* draw the score */
	draw : function (context) {
		this.font.draw (context, this.value, this.pos.x, this.pos.y);
	}

});



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////       COLLECTABLES      //////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////       COIN      //////////////////////////////////////////////////
game.dotEntity = me.AnimationSheet.extend({
	//////////////////////////////////////////////////////////// INIT COIN
	init: function(x, y, settings) {
		game.data.Path_Layer =  getLayerByName("Path");
		this.image = me.loader.getImage("dots");
        this._super(me.AnimationSheet, 'init',[x, y, { image: this.image, framewidth: game.data.tilewidth, frameheight: game.data.tileheight, anchorPoint : new me.Vector2d(0, 0) }]);
        // animations
		this.addAnimation ("idle", PREFS["DOT_ANIMATION_LOOP"].value,80);
		this.addAnimation ("pick", PREFS["DOT_ANIMATION_PICKUP"].value,80);
		this.setCurrentAnimation("idle" );
		this.setAnimationFrame(Math.floor(Math.random()*PREFS["DOT_ANIMATION_LOOP"].value.length))
		this.state="idle";
        this.name="dot";
		this.alwaysUpdate = true;
		addToDotsArray(this);
		registerToRadarAndCollisions(this);
		this.collidable = false;
	}
});


////////////////////////////////////////////////       PILL      /////////////////////////////////////////////////
game.pillEntity = me.AnimationSheet.extend({
	//////////////////////////////////////////////////////////// INIT PILL
	init: function(x, y, settings) {
		game.data.Path_Layer =  getLayerByName("Path");
		this.image = me.loader.getImage("pills");
        this._super(me.AnimationSheet, 'init',[x, y, { image: this.image, framewidth: game.data.tilewidth, frameheight: game.data.tileheight, anchorPoint : new me.Vector2d(0, 0) }]);
        // animations
		this.addAnimation ("idle", PREFS["PILL_ANIMATION_LOOP"].value,80);
		this.addAnimation ("pick", PREFS["PILL_ANIMATION_PICKUP"].value,80);
		this.setCurrentAnimation("idle" );
		this.setAnimationFrame(Math.floor(Math.random()*PREFS["PILL_ANIMATION_LOOP"].value.length))
		this.state="idle";
        this.name="pill";
		this.alwaysUpdate = false;
		addToDotsArray(this);
		registerToRadarAndCollisions(this);
		this.collidable = false;
	}
});



function addToDotsArray(self){
	////////////////////////////////////// creates the dot array
	var cols = game.data.Path_Layer.cols;
	var rows = game.data.Path_Layer.rows;
	if( game.data.dotCounter === 0 ){			// if is the first instance
		if(typeof game.data.dotArray == "undefined"){
			game.data.dotArray = new Array();
		}else{
			game.data.dotArray.length = 0;
		}
		for(c = 0; c < cols; c++){
			game.data.dotArray[c] = new Array();
			for(r = 0; r < rows; r++){
				game.data.dotArray[c].push(0);
			}
		}		
	}
	var col = Math.floor((self.pos.x+(game.data.tilewidth/2))/game.data.tilewidth);
	var row = Math.floor((self.pos.y+(game.data.tileheight/2))/game.data.tileheight);
	game.data.dotArray[col][row] = self;
	game.data.dotCounter += 1;
}




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////       TELEPORT      ////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
game.teleportEntity = me.Renderable.extend({
	//////////////////////////////////////////////////////////// INIT DOT
	init: function(x, y, settings) {
		game.data.Path_Layer =  getLayerByName("Path");
        this._super(me.Renderable, 'init',[x, y, game.data.tilewidth, game.data.tileheight]);
        this.name="teleport";
        if(settings.id!=null){								// VELOCITY
			this.id = parseInt(settings.id);
		}else{
			alert("You must assign 'id' property to teleport entity");
		}
		if(settings.destination!=null){								// VELOCITY
			this.destination = parseInt(settings.destination);
		}else{
			alert("You must assign 'send_to' property to teleport entity");
		}
		addToTeleportArray(this);
	}
});


function addToTeleportArray(self){
	////////////////////////////////////// creates the dot array
	var cols = game.data.Path_Layer.cols;
	var rows = game.data.Path_Layer.rows;
	if( game.data.teleportCounter == 0 ){			// if is the first instance
		if(typeof game.data.teleportArray == "undefined"){
			game.data.teleportArray = new Array();
		}else{
			game.data.teleportArray.length = 0;
		}

		for(c = 0; c < cols; c++){
			game.data.teleportArray[c] = new Array();
			for(r = 0; r < rows; r++){
				game.data.teleportArray[c].push(0);
			}
		}

		if(typeof game.data.teleportList == "undefined"){
			game.data.teleportList = new Array();
		}else{
			game.data.teleportList.length = 0;
		}
	}
	var col = Math.floor((self.pos.x+(game.data.tilewidth/2))/game.data.tilewidth);
	var row = Math.floor((self.pos.y+(game.data.tileheight/2))/game.data.tileheight);
	game.data.teleportArray[col][row] = self;
	game.data.teleportList[self.id] = [self.pos.x,self.pos.y];
	game.data.teleportCounter += 1;
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////        LOADING SCREEN        ///////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

   var ProgressBar = me.Renderable.extend({
        init: function (v, w, h) {
            me.Renderable.prototype.init.apply(this, [v.x, v.y, w, h]);
            this.invalidate = false;
            this.barHeight = 4;
            this.progress = 0;
        },

        // make sure the screen is refreshed every frame
        onProgressUpdate : function (progress) {
            this.progress = ~~(progress * this.width);
            this.invalidate = true;
        },

        // make sure the screen is refreshed every frame
        update : function () {
            if (this.invalidate === true) {
                this.invalidate = false;
                return true;
            }
            return false;
        },

         draw : function (renderer) {
            // draw the progress bar
            renderer.setColor("black");
            renderer.fillRect(0, (this.height / 2) - (this.barHeight / 2)+ PREFS["GAME_NAME_1_SIZE"].value+ PREFS["GAME_NAME_2_SIZE"].value +10, this.width, this.barHeight);
            renderer.setColor(PREFS["LOADING_BAR_COLOR"].value);
            renderer.fillRect(2, (this.height / 2) - (this.barHeight / 2)+ PREFS["GAME_NAME_1_SIZE"].value+ PREFS["GAME_NAME_2_SIZE"].value +10, this.progress, this.barHeight);
            renderer.setColor("white");
        }
});

// logo
var TextLogo = me.Renderable.extend ({
    init : function(w, h) {
        this._super(me.Renderable, "init", [0,0, w, h]);
        this.logo1 = new me.Font('arial, helvetica, sans-serif', parseInt(PREFS["GAME_NAME_1_SIZE"].value), PREFS["GAME_NAME_1_COLOR"].value, 'middle');
        this.logo2 = new me.Font('arial, helvetica, sans-serif', parseInt(PREFS["GAME_NAME_2_SIZE"].value), PREFS["GAME_NAME_2_COLOR"].value, 'middle');
        this.logo2.bold();
        if(!navigator.isCocoonJS) this.image=me.loader.getImage("loading");
        this.imageH=20;
    },

	draw: function(renderer) {
        var logo1_width = this.logo1.measureText(renderer, PREFS["GAME_NAME_1"].value).width;
        var logo2_width = this.logo2.measureText(renderer, PREFS["GAME_NAME_2"].value).width
        var xpos1 = (this.width - logo1_width ) / 2;
        var xpos2 = (this.width - logo2_width ) / 2;
        var ypos1 = (this.height / 2);
        var ypos2 = (this.height / 2) + (this.logo1.measureText(renderer, PREFS["GAME_NAME_1"].value).height);
        this.logo1.draw(renderer, PREFS["GAME_NAME_1"].value, xpos1 , ypos1);
        this.logo2.draw(renderer, PREFS["GAME_NAME_2"].value, xpos2, ypos2);
        if(!navigator.isCocoonJS) renderer.drawImage( this.image, (this.width - this.image.width) /2 ,(this.height/2 - this.image.height)-this.imageH);
    }        
});

var CustomLoadingScreen = me.ScreenObject.extend({
    // call when the loader is resetted
        onResetEvent : function () {
            // background color
            me.game.world.addChild(new me.ColorLayer("background", PREFS["LOADING_BG_COLOR"].value, 0), 0);

            // progress bar
            var progressBar = new ProgressBar(
                new me.Vector2d(),
                me.video.renderer.getWidth(),
                me.video.renderer.getHeight()
            );

            this.loaderHdlr = me.event.subscribe(
                me.event.LOADER_PROGRESS,
                progressBar.onProgressUpdate.bind(progressBar)
            );

            this.resizeHdlr = me.event.subscribe(
                me.event.VIEWPORT_ONRESIZE,
                progressBar.resize.bind(progressBar)
            );

            me.game.world.addChild(progressBar, 1);
            this.iconCanvas = me.video.createCanvas(me.game.viewport.width, me.game.viewport.height, false);

            me.game.world.addChild(new TextLogo(me.video.renderer.getWidth(), me.video.renderer.getHeight()), 1);
        },

        // destroy object at end of loading
        onDestroyEvent : function () {
            // cancel the callback
            me.event.unsubscribe(this.loaderHdlr);
            me.event.unsubscribe(this.resizeHdlr);
            this.loaderHdlr = this.resizeHdlr = null;
        }

    
});


////////////////////////////////////////////////////////////////////////////
/////////////////////////////    MAIN MENU    //////////////////////////////
////////////////////////////////////////////////////////////////////////////

game.MenuScreen = me.ScreenObject.extend({
	onResetEvent: function() {
		me.video.renderer.clearSurface(me.video.renderer.getContext(), "#ffffff", true)
		this.w=me.video.renderer.getWidth();
		this.h=me.video.renderer.getHeight();
		
		// gui background
		var back_image = me.loader.getImage('gui_bg');
        this.background = new me.Sprite(this.w/2 , this.h/2 , {image:back_image});
        me.game.world.addChild(this.background, 1);
        this.background.draw(me.video.renderer);
        
        // main title
        this.maintitle_instance = new maintitle(this.w*.5,this.h*.18);
		me.game.world.addChild(this.maintitle_instance,30);
		this.maintitle_instance.draw(me.video.renderer);
		
		// cover
		this.cover_instance = new cover(this.w*.5, this.h*.5-20);
		me.game.world.addChild(this.cover_instance,30);
		this.cover_instance.draw(me.video.renderer);

		var deltah = 40;
		if(PREFS["MORE_GAMES_BUTTON"].value){																							// play more games
			me.game.world.addChild((new menu_playmoregames(this.w*.5,this.h-deltah)),40);
			deltah += 60;
		}
		if(PREFS["HOW_TO_PLAY_BUTTON"].value){																							// how to play
			me.game.world.addChild((new menu_howtoplay(this.w*.5,this.h-deltah,20)),40);
			deltah += 60;
		}
		me.game.world.addChild((new menu_play(this.w*.5,this.h-deltah,40)),40);											// play

		
		var slots = [[26,26],[this.w-26,26], [26,76], [this.w-26,76], [26,126], [this.w-26,126] ];
		var slot = 0;
		
		if(PREFS["TOGGLE_AUDIO_BUTTON"].value){																						// audio button
			me.game.world.addChild( new menu_audio(slots[slot][0], slots[slot][1]), 40);
			slot ++;
		}
		if(PREFS["INFORMATION_BUTTON"].value){																							// info button
			me.game.world.addChild(new menu_info( slots[slot][0], slots[slot][1], "info_button"), 40);
			slot ++;
		}
		if(PREFS["FULLSCREEN_BUTTON"].value){																							//fullscreen button
			if(me.device.hasFullscreenSupport && !me.device.isMobile){
				me.game.world.addChild(new menu_fullscreen(slots[slot][0], slots[slot][1]),40);
				slot ++;
			}
		}
		if(PREFS["HISCORE_BUTTON"].value){																							// hi score
			me.game.world.addChild(new menu_hiscore( slots[slot][0], slots[slot][1], "hiscore_button"), 40);
			slot ++;
		}
				
		if(PREFS["AUDIOENABLED"].value && PREFS["MUSICENABLED"].value && me.audio.getCurrentTrack()==null) me.audio.playTrack("menu",0.5);
		
	}
	
	
});

//////////////////////////////////////////////////////////////////// GENERIC BIG BUTTON
var generic_big_button = me.GUI_Object.extend(
{	
	init:function(x, y, fontSize){
		var settings = {}
		this.image = me.loader.getImage("menu_button");
		settings.image = this.image;
		settings.framewidth = this.image.width;
		settings.frameheight = this.image.height;
		this.x=x-settings.framewidth/2;
		this.y=y-settings.frameheight/2;
		this.textx=x;
		this.texty=y;
		this.font = prepareFont(fontSize);
		this._super(me.GUI_Object, "init", [x-settings.framewidth/2, y-settings.frameheight/2, settings]);
	}
});

//////////////////////////////////////////////////////////////////// GENERIC SMALL BUTTON
var generic_small_button = me.GUI_Object.extend(
{	
	init:function(x, y,image){
		var settings = {}
		if(image!=""){
			this.image = me.loader.getImage(image);
		}else{
			this.image =  me.loader.getImage("small_button");
		}
		settings.image = this.image;
		settings.framewidth = this.image.width;
		settings.frameheight = this.image.height;
		this.x=x-settings.framewidth/2;
		this.y=y-settings.frameheight/2;
		this._super(me.GUI_Object, "init", [x-settings.framewidth/2, y-settings.frameheight/2, settings]);
		this.pos.z = 4;
	},
	
	draw: function(renderer) {
        renderer.drawImage(this.image, this.x, this.y);
    }
});


//////////////////////////////////////////////////////////////////// PLAY BUTTON
var menu_play = generic_big_button.extend(
{	
	init : function(x, y, fontSize) {
    	this._super(generic_big_button, 'init',[x, y, fontSize]);
	},
	
	draw: function(renderer) {
        renderer.drawImage(this.image, this.x, this.y);
        text = game.data.locale.play; // PLAY
        drawText(renderer, text, this.textx, this.texty, 200, this.font.font, this.font.shadow);

    },

	onClick:function(){
		resetGame();
		if(PREFS["USE_SELECT_LEVEL_SCREEN"].value){
			me.state.change(me.state.USER + 1);
		}else{
			me.state.change(me.state.PLAY);
			if(PREFS["AUDIOENABLED"].value) me.audio.stopTrack("menu");
		}
		if(PREFS["AUDIOENABLED"].value) me.audio.play("click");
		return true;
	}
});

//////////////////////////////////////////////////////////////////// HOW TO PLAY BUTTON
var menu_howtoplay = generic_big_button.extend(
{	
	init : function(x, y, fontSize) {
    	this._super(generic_big_button, 'init',[x, y, fontSize]);
	},

	draw: function(renderer) {
        renderer.drawImage(this.image, this.x, this.y);
        text = game.data.locale.how_to_play; // HOW TO PLAY
		drawText (renderer, text, this.textx, this.texty, 200, this.font.font, this.font.shadow);
    },

	onClick:function(){
		me.state.change(me.state.USER+2);
		if(PREFS["AUDIOENABLED"].value) me.audio.play("click");
		return true;
	}
});

//////////////////////////////////////////////////////////////////// PLAY MORE GAMES - RATE THIS GAME BUTTON
var menu_playmoregames = me.GUI_Object.extend(
{	
	init:function(x, y){
		settings = {}
		var settings = {}
		this.image = me.loader.getImage("menu_button");
		settings.image = this.image;
		settings.framewidth = this.image.width;
		settings.frameheight = this.image.height;
		this.x=x-settings.framewidth/2;
		this.y=y-settings.frameheight/2;
		this.textx=x;
		this.texty=y;
		this.font = prepareFont(20);
		settings.width = settings.framewidth;
		settings.height = settings.frameheight;
		this._super(me.GUI_Object, "init", [x-settings.framewidth/2, y-settings.frameheight/2, settings]);
		
		if(navigator.isCocoonJS){	// cocoon
			this.role="rate";
			if(Math.random()>0.5) this.role="moregames";
		}else{					// web
			this.role="moregames";
		}
	},

	draw: function(renderer) {
        renderer.drawImage(this.image, this.x, this.y);
        if(this.role=="moregames"){
        	var text = game.data.locale.play_more_games;	//PLAY MORE GAMES
		}else{
        	var text = game.data.locale.rate_this_game;	//RATE THIS GAME
        }
		drawText (renderer, text, this.textx, this.texty, 250, this.font.font, this.font.shadow);
    },

	onClick:function(){
		if(PREFS["AUDIOENABLED"].value) me.audio.play("click");
		if(this.role=="moregames"){	//PLAY MORE GAMES
			if (navigator.isCocoonJS){
				Cocoon.App.openURL(PREFS["MORE_GAMES_URL"].value);
			}else{
				//document.location.assign(PREFS["MORE_GAMES_URL"].value);
				window.open(PREFS["MORE_GAMES_URL"].value);
			}
		}else{								//RATE THIS GAME
			if (/ios/.test(navigator.userAgent)){
				Cocoon.App.openURL(PREFS["IOS_RATING_URL"].value);
			}else if (/android/.test(navigator.userAgent)){
				Cocoon.App.openURL(PREFS["ANDROID_RATING_URL"].value);
			}
		}
		return true;
	}
});

//////////////////////////////////////////////////////////////////// INFO BUTTON
var menu_info = generic_small_button.extend(
{	
	onClick:function(){
		if(PREFS["AUDIOENABLED"].value) me.audio.play("click");
		me.state.change(me.state.USER+3);
		return true;
	}
});

//////////////////////////////////////////////////////////////////// PREFERENCES BUTTON
var menu_prefs = generic_small_button.extend(
{	
	onClick:function(){
		if(PREFS["AUDIOENABLED"].value) me.audio.play("click");
		me.state.change(me.state.USER+7);
		return true;
	}
});

//////////////////////////////////////////////////////////////////// HISCORE BUTTON
var menu_hiscore = generic_small_button.extend(
{	
	onClick:function(){
		if(PREFS["AUDIOENABLED"].value) me.audio.play("click");
		me.state.change(me.state.SCORE);
		return true;
	}
});

//////////////////////////////////////////////////////////////////// AUDIO BUTTON
var menu_audio = me.GUI_Object.extend(
{	
	init:function(x, y){
		settings = {}
		if(PREFS["AUDIOENABLED"].value){
			settings.image = me.loader.getImage("audio_on_button");
		}else{
			settings.image = me.loader.getImage("audio_off_button");
		}
		settings.framewidth = 48;
		settings.frameheight = 48;
		this.x=x-settings.framewidth/2;
		this.y=y-settings.frameheight/2;
		settings.width = settings.framewidth;
		settings.height = settings.frameheight;
		this._super(me.GUI_Object, "init", [x-settings.framewidth/2, y-settings.frameheight/2, settings]);

		this.image_on = me.loader.getImage("audio_on_button");
		this.image_off = me.loader.getImage("audio_off_button");
	},

	draw: function(renderer) {
        renderer.drawImage(this.image, this.x, this.y);
    },
    
	onClick:function(){
		if( !me.device.wp ){
			if(PREFS["AUDIOENABLED"].value){
				this.image = this.image_off;
				me.audio.muteAll();
				PREFS["AUDIOENABLED"].value = false;
			}else{
				this.image = this.image_on;
				me.audio.unmuteAll();
				me.audio.play("click");
				PREFS["AUDIOENABLED"].value = true;
			}
		}
		return true;
	}
});

//////////////////////////////////////////////////////////////////// FULLSCREEN BUTTON
var menu_fullscreen = me.GUI_Object.extend(
{	
	init:function(x, y){
		settings = {}
		if(PREFS["AUDIOENABLED"].value){
			settings.image = me.loader.getImage("fullscreen_on_button");
		}else{
			settings.image = me.loader.getImage("fullscreen_off_button");
		}
		settings.framewidth = 48;
		settings.frameheight = 48;
		this.x=x-settings.framewidth/2;
		this.y=y-settings.frameheight/2;
		settings.width = settings.framewidth;
		settings.height = settings.frameheight;
		this._super(me.GUI_Object, "init", [x-settings.framewidth/2, y-settings.frameheight/2, settings]);
		this.image_on = me.loader.getImage("fullscreen_on_button");
		this.image_off = me.loader.getImage("fullscreen_off_button");
		this.image = this.image_on;
	},

	draw: function(renderer) {
        renderer.drawImage(this.image, this.x, this.y);
    },
    
	onClick:function(){
		if(me.device.isFullscreen){
			if(PREFS["AUDIOENABLED"].value) me.audio.play("click");
			this.image = this.image_on;
			me.device.exitFullscreen();
		}else{
			if(PREFS["AUDIOENABLED"].value) me.audio.play("click");
			this.image = this.image_off;
			me.device.requestFullscreen();
		}
			
		return true;
	}
});

//////////////////////////////////////////////////////////////////// BACK BUTTON
var menu_back = generic_big_button.extend(
{	
	init : function(x, y, fontSize) {
    	this._super(generic_big_button, 'init',[x, y, fontSize]);
	},

	draw: function(renderer) {
        renderer.drawImage(this.image, this.x, this.y);
		text = game.data.locale.back;
        drawText (renderer, text, this.textx, this.texty, 200, this.font.font, this.font.shadow);
    },

	onClick:function(){
		me.state.change(me.state.MENU);
		if(PREFS["AUDIOENABLED"].value) me.audio.play("click");
		return true;
	}
});

//////////////////////////////////////////////////////////////////// TITLE
var maintitle = me.Renderable.extend(
{	
	init:function(x, y){
		this.image =  me.loader.getImage("title");
		this.x=x-this.image.width/2;
		this.y=y-this.image.height/2;
		this._super(me.Renderable, 'init',[0, 0, 1, 1]);
	},

	draw: function(renderer) {
        renderer.drawImage(this.image, this.x, this.y);
    }
});
//////////////////////////////////////////////////////////////////// COVER IMAGE
var cover = me.Renderable.extend(
{	
	init:function(x, y){
		this.image = me.loader.getImage("cover");
		this.x=x-this.image.width/2;
		this.y=y-this.image.height/2;
		this._super(me.Renderable, 'init',[0, 0, 1, 1]);
	},

	draw: function(renderer) {
        renderer.drawImage(this.image, this.x, this.y);
    }
});

///////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////// CUSTOM ALERT BOX
///////////////////////////////////////////////////////////////////////////

var Alert = function(text){
	setTimeout(function(){me.game.world.addChild((new CustomAlert(text)),999)}, 1000);
	//me.game.world.addChild((new CustomAlert(text)),999);	
}

var CustomAlert = me.GUI_Object.extend(
{	
	init:function(text){
		settings = {}
		this.text = text;
		this.w=me.video.renderer.getWidth();
		this.h=me.video.renderer.getHeight();

		this.image = me.loader.getImage("alert");
		settings.image = this.image;
		this.x=(this.w/2)-(this.image.width/2);
		this.y=(this.h/2)-(this.image.height/2);
		this.font = new me.Font("arial, helvetica, sans-serif", 18, "black", "center");
		settings.framewidth = this.image.width;
		settings.frameheight = this.image.height;

		settings.width = settings.framewidth;
		settings.height = settings.frameheight;
		
		this._super(me.GUI_Object, "init", [this.x, this.y, settings]);
	},

	onClick:function(){
		 me.game.world.removeChild(this,true);
		 me.game.repaint();
	},
	
	draw: function(renderer) {
        renderer.drawImage(this.image, this.x, this.y);
        drawText (renderer, this.text, this.x+(this.image.width/2), this.y+(this.image.height/2)-40, 250, this.font);
		
    }

});

///////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////// DRAW TEXT
///////////////////////////////////////////////////////////////////////////

function prepareFont(size, color){
		if (typeof color == 'undefined') color = "#ffffff"
		var font = new me.Font("arial, helvetica, sans-serif", size, color, "center");
		var shadow = new me.Font("arial, helvetica, sans-serif", size, "black", "center");
		font.textBaseline="middle";
		shadow.textBaseline="middle";
		font.bold();
		shadow.bold();
		return {"font":font, "shadow":shadow};
}

function drawText(context, txt, x, y, width, font, shadow){
		var txtarray = txt.split("\n"); 
		var outTxt = ""

		for (index = 0; index < txtarray.length; ++index) {
			var text = txtarray[index];
		    var totalWidth = font.measureText(context, text).width;
		    var linee = Math.ceil(totalWidth/width);
		    chWidth = text.length/linee;
			var offset = 0
			for( var i = 1; i<linee; i++){
				var k=0;
				while(text.charAt(parseInt(offset+chWidth-k))!=" "){ k++; }
				offset = parseInt(offset+chWidth-k);
				text = text.replaceAt(offset, "\n");
				if(i==linee-1){		// controlliamo che l'ultima riga non sbordi
					var ultimaRiga= text.substr(offset+1, text.length);
					var ultimaRigaWidth = font.measureText(context, ultimaRiga).width;
					if(ultimaRigaWidth>width){
						k=0;
						while(text.charAt(offset+chWidth-k)!=" "){ k++; }
						offset = offset+chWidth-k;
						text = text.replaceAt(offset, "\n");
					}
				}
			}
			outTxt = outTxt+text+"\n";
		}
	if(shadow){
		shadow.draw (context, outTxt, x-1, y-1);
		shadow.draw (context, outTxt, x+1, y-1);
		shadow.draw (context, outTxt, x-1, y+1);
		shadow.draw (context, outTxt, x+1, y+1);
	}
	font.draw (context, outTxt, x, y);

}

String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////// HOW TO PLAY ////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

var helpPage=1;

game.HowToPlayScreen = me.ScreenObject.extend({
	onResetEvent: function() {
		this.w=me.video.renderer.getWidth();
		this.h=me.video.renderer.getHeight();
		// gui background
		var back_image = me.loader.getImage('gui_bg');
		this.background = new me.Sprite(this.w/2 , this.h/2 , {image:back_image});
        me.game.world.addChild(this.background, 1);
        
		var buttonImage = me.loader.getImage("butt_left");
		var buttonWidth = buttonImage.width;
		me.game.world.addChild((new menu_left(buttonWidth/2+20,this.h-40,"butt_left")),4);
		me.game.world.addChild((new menu_right(this.w-buttonWidth/2-20,this.h-40,"butt_right")),4);
		if(game.data.lowres){
			me.game.world.addChild(new helpImage(this.w,0), 10);
			me.game.world.addChild(new helpText(this.w/2,this.h/2), 10);
		}else{
			me.game.world.addChild(new helpImage(this.w,60), 10);
			me.game.world.addChild(new helpText(this.w/2,this.h/2), 10);
		}
		helpPage=1;
	}
});



//////////////////////////////////////////////////////////////////// HELP IMAGE
var helpImage = me.Entity.extend ({
    // constructor
    init : function(w,h) {
        settings = {}
		settings.image = me.loader.getImage("help_img"); ;
		settings.spritewidth = 400;
		settings.spriteheight = 180;
		game.data.helpPages = settings.image.height/180;
		settings.width = settings.spritewidth;
		settings.height = settings.spriteheight;
		this._super(me.Entity, 'init',[w/2-settings.width/2, h, settings]);
		var pages = 
		this.renderable.addAnimation ("1", [0]);
		this.renderable.addAnimation ("2", [1]);
		this.renderable.addAnimation ("3", [2]);
		this.renderable.addAnimation ("4", [3]);
		this.renderable.addAnimation ("5", [4]);

    },
    
    update: function(delta){
    	switch(helpPage) {
			case 1:
				this.renderable.setCurrentAnimation("1");
				break;
			case 2:
				this.renderable.setCurrentAnimation("2");
				break;
			case 3:
				this.renderable.setCurrentAnimation("3");
				break;
			case 4:
				this.renderable.setCurrentAnimation("4");
				break;
			case 5:
				this.renderable.setCurrentAnimation("5");
				break;
				
			}

    	this._super(me.Entity, "update", [delta])
		return true;
    }
});

//////////////////////////////////////////////////////////////////// HELP TEXT
var helpText = me.Renderable.extend ({
	init: function(x, y) {
		this._super(me.Renderable, 'init',[x, y , 10, 10]);
		if(game.data.lowres){
			this.font = prepareFont(16, "white");
		}else{
			this.font = prepareFont(20, "white");
		}
		this.font.font.lineHeight = 1.2;
		this.font.shadow.lineHeight = 1.2;

	},

	draw: function(renderer) {
		switch(helpPage) {
			case 1:
				if(me.device.isMobile) {
					var text = game.data.locale.howToPlay_mobile.p1;
				}else{
					var text = game.data.locale.howToPlay_desktop.p1;
				}
				break
			case 2:
				if(me.device.isMobile) {
					var text = game.data.locale.howToPlay_mobile.p2;
				}else{
					var text = game.data.locale.howToPlay_desktop.p2;
				}
				break
			case 3:
				if(me.device.isMobile) {
					var text = game.data.locale.howToPlay_mobile.p3;
				}else{
					var text = game.data.locale.howToPlay_desktop.p3;
				}
				break
			case 4:
				if(me.device.isMobile) {
					var text = game.data.locale.howToPlay_mobile.p4;
				}else{
					var text = game.data.locale.howToPlay_desktop.p4;
				}
				break
			case 5:
				if(me.device.isMobile) {
					var text = game.data.locale.howToPlay_mobile.p5;
				}else{
					var text = game.data.locale.howToPlay_desktop.p5;
				}
				break
		}
		
		drawText (renderer, text, this.pos.x, this.pos.y, game.data.widthGame-20, this.font.font, this.font.shadow);

	}

});

//////////////////////////////////////////////////////////////////// LEFT
var menu_left = generic_small_button.extend(
{	
	onClick:function(){
		if(helpPage >1){
			helpPage -= 1;
		}else{
			me.state.change(me.state.MENU);
		}
		if(PREFS["AUDIOENABLED"].value) me.audio.play("click");
		return true;
	}
});

//////////////////////////////////////////////////////////////////// RIGHT
var menu_right = generic_small_button.extend(
{	
	onClick:function(){
		if(helpPage < game.data.helpPages){
			helpPage += 1;
		}else{
			me.state.change(me.state.MENU);
		}
		if(PREFS["AUDIOENABLED"].value) me.audio.play("click");
		return true;
	}
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// INFO ////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

game.InfoScreen = me.ScreenObject.extend({
	onResetEvent: function() {
		this.w=me.video.renderer.getWidth();
		this.h=me.video.renderer.getHeight();
		// gui background
		var back_image = me.loader.getImage('gui_bg');
		this.background = new me.Sprite(this.w/2 , this.h/2 , {image:back_image});
        me.game.world.addChild(this.background, 1);
        this.background.draw(me.video.renderer);
		// back button
		me.game.world.addChild((new menu_back(this.w/2,this.h-40,20)),4);
		// text
		this.text = new infoText(this.w/2,20);
		me.game.world.addChild( this.text, 10);
		this.text.draw(me.video.renderer);
		helpPage=1;
	}
});

var infoText = me.Renderable.extend ({
	init: function(x, y) {
		this._super(me.Renderable, 'init',[x, y, 10, 10]);
		if(game.data.lowres){
			this.fontA = prepareFont(12, "white");
		    this.fontB = prepareFont(18, "white");
		}else{
			this.fontA = prepareFont(16, "white");
		    this.fontB = prepareFont(22, "white");
        }
        this.fontA.font.lineHeight = 1.2;
		this.fontA.shadow.lineHeight = 1.2;
        this.h = me.video.renderer.getHeight()-60
	},

	draw: function(renderer) {
		var hamount = 0.05;
		text = game.data.locale.info.title1;
		drawText (renderer, text,  this.pos.x, this.h*hamount, game.data.widthGame-20, this.fontB.font, this.fontB.shadow);
		text = game.data.locale.info.text1;
		drawText (renderer, text,  this.pos.x, this.h*hamount+25, game.data.widthGame-20, this.fontA.font, this.fontA.shadow);
		
		var hamount = 0.20;
		text = game.data.locale.info.title2;
		drawText (renderer, text,  this.pos.x, this.h*hamount, game.data.widthGame-20, this.fontB.font, this.fontB.shadow);
		text = game.data.locale.info.text2;
		drawText (renderer, text,  this.pos.x, this.h*hamount+25, game.data.widthGame-20, this.fontA.font, this.fontA.shadow);
		
		var hamount = 0.35;
		text = game.data.locale.info.title3;
		drawText (renderer, text,  this.pos.x, this.h*hamount, game.data.widthGame-20, this.fontB.font, this.fontB.shadow);
		text = game.data.locale.info.text3;
		drawText (renderer, text,  this.pos.x, this.h*hamount+25, game.data.widthGame-20, this.fontA.font, this.fontA.shadow);

		var hamount = 0.55;
		text = game.data.locale.info.title4;
		drawText (renderer, text,  this.pos.x, this.h*hamount, game.data.widthGame-20, this.fontB.font, this.fontB.shadow);
		text = game.data.locale.info.text4;
		drawText (renderer, text,  this.pos.x, this.h*hamount+25, game.data.widthGame-20, this.fontA.font, this.fontA.shadow);

		var hamount = 0.7;
		text = game.data.locale.info.title5;
		drawText (renderer, text,  this.pos.x, this.h*hamount, game.data.widthGame-20, this.fontB.font, this.fontB.shadow);
		text = game.data.locale.info.text5;
		drawText (renderer, text,  this.pos.x, this.h*hamount+25, game.data.widthGame-20, this.fontA.font, this.fontA.shadow);

		var hamount = 0.85;
		text = game.data.locale.info.title6;
		drawText (renderer, text,  this.pos.x, this.h*hamount, game.data.widthGame-20, this.fontB.font, this.fontB.shadow);
		text = game.data.locale.info.text6;
		drawText (renderer, text,  this.pos.x, this.h*hamount+25, game.data.widthGame-20, this.fontA.font, this.fontA.shadow);

	}

});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////// NAME INPUT /////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

game.NameInputScreen = me.ScreenObject.extend({
	onResetEvent: function() {
		this.w=me.video.renderer.getWidth();
		this.h=me.video.renderer.getHeight();
		// gui background
		var back_image = me.loader.getImage('gui_bg');
		this.background = new me.Sprite(this.w/2 , this.h/2 , {image:back_image});
        me.game.world.addChild(this.background, 1);
		me.game.world.addChild(new nameInputTitle(this.w/2,20), 10);
		
		if(PREFS["KEYBOARD_NUMBERS"].value){
			if(game.data.device_portrait_orientated){
				var col = 6;
				var y = this.h/4;
				var a = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ",".",",", "!", "1","2","3","4","5","6","7","8","9","0", "&", "OK"];
			}else{
				var col = 8;
				var y = this.h/3
				var a = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ",".", "1","2","3","4","5","6","7","8","9","0", "&", "OK"];
			}
		
		}else{
		
			if(game.data.device_portrait_orientated){
				var col = 5;
				var y = this.h/4;
				var a = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ",".", "&", "OK"];
			}else{
				var col = 8;
				var y = this.h/2.8;
				var a = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ",".",",", "!", "&", "OK"];
			}
		}
		
		
		
		var index = 0;
		var row = Math.ceil(a.length/col);
		this.h2=this.h-y;
		for(var r=0; r<row; r++){
			for(var c=0; c<col; c++){
				if(index >= a.length) break;
				me.game.world.addChild((new key(this.w/(col)*c+26, y+(this.h2/(row)*r), a[index])), 99);
				index++;
			}
		}
		game.data.nickname_max_lenght = 14;
		game.data.keyboard_key = "";
		document.addEventListener('keydown', keyboard, true);
	},
	
	onDestroyEvent: function() {
    	document.removeEventListener('keydown', keyboard, true);
	}
	
});


function keyboard(event) {
	keys = {48:"0",49:"1", 50:"2", 51:"3" ,52:"4",53: "5",54: "6",55: "7",56: "8",57: "9",65: "A",66: "B",67: "C",68: "D",69: "E",70: "F",71: "G",72: "H",73: "I",74: "J",75: "K",76: "L",77: "M",78: "N",79: "O",80: "P",81: "Q",82: "R",83: "S",84: "T",85: "U",86: "V",87: "W",88: "X",89: "Y",90: "Z",8: "backspace",46: "delete",13:"enter"};
	if(keys[event.keyCode]!=undefined) {
		game.data.keyboard_key = keys[event.keyCode];
	}
}



var nameInputTitle = me.Renderable.extend ({
	init: function(x, y) {
		this._super(me.Renderable, 'init',[x, y, 10, 10]);
        this.h=me.video.renderer.getHeight();
        if(game.data.lowres){
			this.playerNameY= 60;
		    this.font = prepareFont(20);
		    this.font2 = prepareFont(14);
		}else{
			this.playerNameY = this.h/4;
		    this.font = prepareFont(30);
		    this.font2 = prepareFont(20);
		}
	},

	update: function(dt){
		if(game.data.keyboard_key!=""){
			if( game.data.keyboard_key == "backspace"){
				game.data.playerName = game.data.playerName.substring(0, game.data.playerName.length - 1);
				if(PREFS["AUDIOENABLED"].value) me.audio.play("click");
			}else if(game.data.playerName.length<game.data.nickname_max_lenght){
				game.data.playerName += game.data.keyboard_key;
				if(PREFS["AUDIOENABLED"].value) me.audio.play("click");
			}
			game.data.keyboard_key="";
			me.video.renderer.blitSurface();
			me.video.renderer.blitSurface();
		}
		return true;
	},
	
	draw: function(renderer) {
		var text  = game.data.locale.input_nickname;
		drawText (renderer, text, this.pos.x, this.pos.y, 460, this.font2.font, this.font2.shadow);
		drawText (renderer,  game.data.playerName, this.pos.x, this.playerNameY, game.data.widthGame-20, this.font.font, this.font.shadow);
	}

});



var key = me.GUI_Object.extend(
{	
	init:function(x, y,key){
		settings = {}
		settings.image = me.loader.getImage("small_button");

		settings.spritewidth = 48;
		settings.spriteheight = 48;
		this.x=x-settings.spritewidth/2;
		this.y=y-settings.spriteheight/2;
		this.textx=x;
		this.texty=y;
		this.key=key;
		this.font = new me.BitmapFont("bitmap_font", 16);
		this.font.textBaseline="middle";
		this.font.textAlign="center";
		this._super(me.GUI_Object, 'init',[x-settings.spritewidth/2, y-settings.spriteheight/2, settings]);
		this.submitted=false
	},

	draw: function(renderer) {
        renderer.drawImage(this.image, this.x, this.y);
        this.font.draw(renderer, this.key, this.textx, this.texty);
    },

	onClick:function(){
		if(PREFS["AUDIOENABLED"].value) me.audio.play("click");
		if(this.key=="&"){
			game.data.playerName = game.data.playerName.substring(0, game.data.playerName.length - 1);
		}else if(this.key=="OK" && !this.submitted ){
			if(game.data.playerName!=""){
				this.submitted=true;
				// save score on the server
				var playername = game.data.playerName;
				var score = game.data.score;
				var magic = hex_md5(score + playername + game.data.scorePw); // scorepassword is defined in game.js
				var data = "playerName=" + playername + "&playerScore=" + score + "&magic=" + magic;	// this is your data that you want to pass to the server (could be json) next you would initiate a XMLHTTPRequest as following (could be more advanced):
				var http = makeHttpObject();
				http.open("GET", PREFS["SCORE_URL"].value+"?"+data, true);
				//Send the proper header information along with the request
				http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				http.onreadystatechange = function() {//Call a function when the state changes.
					if(http.readyState == 4 && http.status == 200) {
						clearTimeout(httpTimeout);
						me.state.change(me.state.SCORE);
					}
				}
				var httpTimeout=setTimeout(function (){http.abort();me.state.change(me.state.MENU);},5000);
				http.send();
			}
		
		}else{
			if(game.data.playerName.length<game.data.nickname_max_lenght){
				game.data.playerName += this.key
			}
		}
		return true;
	}
});



function makeHttpObject() {
  try {return new XMLHttpRequest();}
  catch (error) {}
  try {return new ActiveXObject("Msxml2.XMLHTTP");}
  catch (error) {}
  try {return new ActiveXObject("Microsoft.XMLHTTP");}
  catch (error) {}

  throw new Error("Could not create HTTP request object.");
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////// SCORE ////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

var scoretable = "";
var scroll = 0;

game.ScoreScreen = me.ScreenObject.extend({
	// action to perform on state change
	onResetEvent: function() {
		this.w=me.video.renderer.getWidth();
		this.h=me.video.renderer.getHeight();
		// gui background
		var back_image = me.loader.getImage('gui_bg');
		this.background = new me.Sprite(this.w/2 , this.h/2 , {image:back_image});
        me.game.world.addChild(this.background, 1);
		me.game.world.addChild((new menu_done(this.w/2,this.h-40, 20)),4);
		me.game.world.addChild((new button_score_up(this.w-26,26)),4);
		me.game.world.addChild((new button_score_down(this.w-26,this.h-100)),4);
		var timestamp = new Date().getTime();		// let's add timestamp to the url so to avoid cache
		var data = "magic=getScore&t="+timestamp;	// this is your data that you want to pass to the server (could be json) next you would initiate a XMLHTTPRequest as following (could be more advanced):
		var http = makeHttpObject();
		http.open("GET", PREFS["SCORE_URL"].value+"?"+data, true);		
		//Send the proper header information along with the request
		http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		var self = this;
		http.onreadystatechange = function() {//Call a function when the state changes.
			if(http.readyState == 4 && http.status == 200) {
			    //console.info(http.responseText);//check if the data was revived successfully.
			    clearTimeout(httpTimeout);
				scoretable = JSON.parse(http.responseText);
				me.game.world.addChild(new scoreText(self.w/2,30), 10);
			}
		}
		var httpTimeout=setTimeout(function (){console.info(http.responseText); http.abort();me.state.change(me.state.MENU);},5000);
		http.send();
	}
});

var scoreText = me.Renderable.extend ({
	init: function(x, y) {
		this._super(me.Renderable, 'init',[x, y , 10, 10]);
		this.w=me.video.renderer.getWidth();
		this.h=me.video.renderer.getHeight();
		if(game.data.lowres){
		    this.font = prepareFont(24);
		    this.fontB = prepareFont(18);
        }else{
		    this.font = prepareFont(30);
		    this.fontB = prepareFont(20);        
        }
 		this.fontB.font.textAlign ="left";
		this.fontB.shadow.textAlign ="left";
       this.numbOfLines =parseInt((me.video.renderer.getHeight()-120)/25)
	},

	draw: function(renderer) {
		var text = game.data.locale.score.hi_score;
		drawText (renderer, text, this.pos.x, this.pos.y, this.w-20, this.font.font, this.font.shadow);
		var pos=1.5;
		for(i=scroll; i<scroll+this.numbOfLines; i++){
			if (i == scoretable.length) break;
			var text = scoretable[i]["score"] + " : " + scoretable[i]["name"];
			drawText (renderer, text, 10, this.pos.y+25*pos, this.w-20, this.fontB.font, this.fontB.shadow);
			pos++;
		}
		if(scoretable.length==0){
			this.fontB.font.textAlign ="center";
			this.fontB.shadow.textAlign ="center";
			drawText (renderer, game.data.locale.score.no_score_yet, this.w/2, this.h/2, this.w-20, this.fontB.font, this.fontB.shadow);
		}
	}

});


var button_score_up = me.GUI_Object.extend(
{	
	init:function(x, y){
		settings = {}
		settings.image = me.loader.getImage("butt_up");
		settings.spritewidth = 48;
		settings.spriteheight = 48;
		this.x=x-settings.spritewidth/2;
		this.y=y-settings.spriteheight/2;
		this._super(me.GUI_Object, 'init',[x-settings.spritewidth/2, y-settings.spriteheight/2, settings]);
	},

	draw: function(renderer) {
		var context = renderer.getContext();
		context.save();
		if(scroll==0) context.globalAlpha = 0.4;
        context.drawImage(this.image, this.x, this.y);
		context.restore();
    },

	onClick:function(){
		if(scroll>0){
			if(PREFS["AUDIOENABLED"].value) me.audio.play("click");
			scroll--;
		}
		return true;
	}
});

var button_score_down = me.GUI_Object.extend(
{	
	init:function(x, y){
		settings = {}
		settings.image = me.loader.getImage("butt_down");
		settings.spritewidth = 48;
		settings.spriteheight = 48;
		this.x=x-settings.spritewidth/2;
		this.y=y-settings.spriteheight/2;
		this._super(me.GUI_Object, 'init',[x-settings.spritewidth/2, y-settings.spriteheight/2, settings]);
		this.numbOfLines =parseInt((me.video.renderer.getHeight()-120)/25)
	},

	draw: function(renderer) {
		var context = renderer.getContext();
		context.save();
		if(scoretable.length<this.numbOfLines || scroll>=scoretable.length-this.numbOfLines) context.globalAlpha = 0.4;
        context.drawImage(this.image, this.x, this.y);
		context.restore();
    },

	onClick:function(){
		if(scroll<scoretable.length-this.numbOfLines){
			if(PREFS["AUDIOENABLED"].value) me.audio.play("click");
			scroll++;
		}
		return true;
	}
});



var menu_done = generic_big_button.extend(
{	
	draw: function(renderer) {
        renderer.drawImage(this.image, this.x, this.y);
        var text = game.data.locale.score.done;
        drawText (renderer, text,  this.textx, this.texty, 460, this.font.font, this.font.shadow);
    },

	onClick:function(){
		if(PREFS["AUDIOENABLED"].value) me.audio.play("click");
		me.state.change(me.state.MENU);
		return true;
	}
});


game.ChooseScreen = me.ScreenObject.extend({
	onResetEvent: function() {
		this.w=me.video.renderer.getWidth();
		this.h=me.video.renderer.getHeight();
		
		// gui background
		var back_image = me.loader.getImage('gui_bg');
        this.background = new me.Sprite(this.w/2 , this.h/2 , {image:back_image});
        me.game.world.addChild(this.background, 1);
        this.background.draw(me.video.renderer);

		me.game.world.addChild((new choose_title(this.w/2, 40)), 99);

		var levels = me.levelDirector.levelCount();
		
		try{								// carichiamo il numero del livello sbloccato
			me.save.add({ level : 1});
			var currentLevel=parseInt(me.save.level);
		}catch(err){
			//console.info("Error on local storage: " + err.message + "\n\n");
			var currentLevel = game.data.level;
 		}

		me.game.world.addChild((new button_levels_up(this.w-26,70)),4);
		me.game.world.addChild((new button_levels_down(this.w-26,this.h-100)),4);
		me.game.world.addChild((new menu_back(this.w/2,this.h-40, 20)),4);
		
		if(game.data.lowres){
			game.data.spazioTop = 95;
			game.data.spazioBottom = 75;
		}else{
			game.data.spazioTop = 140;
			game.data.spazioBottom = 100;
		
		}
		game.data.spaziov = me.video.renderer.getHeight()-(game.data.spazioTop+game.data.spazioBottom+48);
		game.data.maxPerPage = 4; // linee per pagina
		game.data.scroll = 0;
		game.data.spacing = parseInt(game.data.spaziov/(game.data.maxPerPage-1));

		if(game.data.lowres){
			var col = 4;
		}else{
			var col = !navigator.isCocoonJS ? 4 : 5;
		}
		var row = Math.ceil(levels/col);
		game.data.row = row;
		var lev = 1
		for(var r=0; r<row; r++){
			for(var c=1; c<=col; c++){
				if(lev<=currentLevel){
					me.game.world.addChild((new button_level(-20+this.w/(col+1)*c, game.data.spazioTop+(game.data.spacing*r), lev,false)), 99);
				}else{
					me.game.world.addChild((new button_level(-20+this.w/(col+1)*c, game.data.spazioTop+(game.data.spacing*r), lev,true)), 99);
				}
				lev++;
				if(lev>levels) break;
			}
		}
	}

});

//////////////////////////////////////////////////////////////////// LEVEL BUTTON
var button_level = me.GUI_Object.extend(
{	
	init:function(x, y,level, locked){
		settings = {}
		settings.image = me.loader.getImage("small_button");
		this.imageLocked = me.loader.getImage("level_button_lock");
		settings.spritewidth = 48;
		settings.spriteheight = 48;
		this.spritewidth = settings.spritewidth;
		this.spriteheight= settings.spriteheight;
		this.x=x-settings.spritewidth/2;
		this.y=y-settings.spriteheight/2;
		this.textx=x;
		this.texty=y;
		this.level=level;
		this.locked = locked;
		this.texty=y+2;
		this.font = prepareFont(26, "white");
		this._super(me.GUI_Object, 'init',[x-settings.spritewidth/2, y-settings.spriteheight/2, settings]);

	},

	draw: function(renderer) {
		var context = renderer.getContext();
		this.pos.y = this.y+game.data.scroll*game.data.spacing;
		if(this.y+game.data.scroll*game.data.spacing >= game.data.spazioTop-this.spriteheight/2 && this.y+game.data.scroll*game.data.spacing<=me.video.renderer.getHeight()-game.data.spazioBottom){
		    renderer.drawImage(this.image, this.x, this.y+game.data.scroll*game.data.spacing);
		    var text = this.level.toString();
		    drawText (renderer, text, this.textx, this.texty+game.data.scroll*game.data.spacing, 200, this.font.font, this.font.shadow);
		    if(this.locked) renderer.drawImage(this.imageLocked, this.x, this.y+game.data.scroll*game.data.spacing);
		}
    },

	onClick:function(){
		if(!this.locked){
			if(PREFS["AUDIOENABLED"].value) me.audio.play("click");
			if(PREFS["AUDIOENABLED"].value) me.audio.stopTrack("menu");
			game.data.level=this.level;
			me.state.change(me.state.PLAY);
		}
		return true;
	}
});

//////////////////////////////////////////////////////////////////// TITLE
var choose_title = me.Renderable.extend(
{	
	init:function(x, y){
		this.x=x;
		this.y=y;
		if(game.data.lowres){
			this.font = prepareFont(20);
		}else{
			this.font = prepareFont(30);
		}
		this.font.textBaseline="middle";
		this.font.textAlign="center";
		this._super(me.Renderable, 'init',[this.x, this.y , 10, 10]);
	},

	draw: function(renderer) {
        text = game.data.locale.choose_level;
		drawText (renderer, text,  this.x, this.y, 460, this.font.font, this.font.shadow);
    }
});





//////////////////////////////////////////////////////////////////// UP BUTTON
var button_levels_up = me.GUI_Object.extend(
{	
	init:function(x, y){
		settings = {}
		settings.image = me.loader.getImage("butt_up");
		settings.spritewidth = 48;
		settings.spriteheight = 48;
		this.x=x-settings.spritewidth/2;
		this.y=y-settings.spriteheight/2;
		this._super(me.GUI_Object, 'init',[x-settings.spritewidth/2, y-settings.spriteheight/2, settings]);
	},

	draw: function(renderer) {
		renderer.save();
		if(+game.data.scroll==0) renderer.setGlobalAlpha(0.4);
        renderer.drawImage(this.image, this.x, this.y);
		renderer.restore();
    },

	onClick:function(){
		if(game.data.scroll<0){
			if(PREFS["AUDIOENABLED"].value) me.audio.play("click");
			game.data.scroll += 1;
		}
		return true;
	}
});

//////////////////////////////////////////////////////////////////// DOWN BUTTON
var button_levels_down = me.GUI_Object.extend(
{	
	init:function(x, y){
		settings = {}
		settings.image = me.loader.getImage("butt_down");
		settings.spritewidth = 48;
		settings.spriteheight = 48;
		this.spritewidth = settings.spritewidth;
		this.spriteheight= settings.spriteheight;
		this.x=x-settings.spritewidth/2;
		this.y=y-settings.spriteheight/2;
		this._super(me.GUI_Object, 'init',[x-settings.spritewidth/2, y-settings.spriteheight/2, settings]);
		this.numbOfLines =parseInt((me.video.renderer.getHeight()-90)/20)
	},

	draw: function(renderer) {
		renderer.save();
		var bottomLine = game.data.spazioTop + ((game.data.row + game.data.scroll -1) * game.data.spacing) + this.spriteheight/2;
		if( bottomLine <= me.video.renderer.getHeight()-game.data.spazioBottom ) renderer.setGlobalAlpha( 0.4);
        renderer.drawImage(this.image, this.x, this.y);
		renderer.restore();
    },

	onClick:function(){
		var bottomLine = game.data.spazioTop + ((game.data.row + game.data.scroll -1) * game.data.spacing) + this.spriteheight/2;
		if( bottomLine <= me.video.renderer.getHeight()-game.data.spazioBottom ){
		}else{
			if(PREFS["AUDIOENABLED"].value) me.audio.play("click");
			game.data.scroll -= 1;
		}
		return true;
	}
});

//////////////////////////////////////////////////////////////////// BUTTON BACK
var menu_back = generic_big_button.extend(
{	
	draw: function(renderer) {
        renderer.drawImage(this.image, this.x, this.y);
		text = game.data.locale.back;
		drawText(renderer, text, this.textx, this.texty, 200, this.font.font, this.font.shadow);
    },

	onClick:function(){
		me.state.change(me.state.MENU);
		me.audio.play("click");
		return true;
	}
});

function line(context, y, color){
	context.beginPath();
	context.moveTo(0,y);
	context.lineTo(480,y);
	context.strokeStyle=color;
	context.stroke();
}

////////////////////////////////////////////////////////////////////////////
/////////////////////////////    GAME OVER    //////////////////////////////
////////////////////////////////////////////////////////////////////////////

game.GameOverScreen = me.ScreenObject.extend( {
	onResetEvent: function() {	
		this.w=me.video.renderer.getWidth();
		this.h=me.video.renderer.getHeight();

		this.overlay = new me.ColorLayer("overlay", new me.Color(0, 0, 0, 0.3), 1);
		me.game.world.addChild(this.overlay);

		// add the game over text
		me.game.world.addChild(new (me.Renderable.extend ({
			// constructor
			init : function() {
				this._super(me.Renderable, 'init', [0, 0, 10, 10]);
				this.font = prepareFont(30);
				this.font2 = prepareFont(20);
				this.upd = true;
			},
			update : function (dt) {
				if (this.upd){
		            this.upd = false;
		            return true;
		        }else{
		        	return false;
		        }
		    },
			draw: function(renderer) {
				var text = game.data.locale.game_over;
				drawText (renderer, text, me.game.viewport.width/2, me.game.viewport.height/4, game.data.widthGame, this.font.font, this.font.shadow);
				var text = game.data.locale.final_score;
				drawText (renderer, text, me.game.viewport.width/2, me.game.viewport.height/2.5, game.data.widthGame, this.font2.font, this.font2.shadow);
				drawText (renderer, (game.data.score).toString(), me.game.viewport.width/2, me.game.viewport.height/2.5+40, game.data.widthGame, this.font.font, this.font.shadow);
			}
		})), 20);
		
		var deltah = 120;
		if(PREFS["SUBMIT_SCORE_BUTTON"].value){
			me.game.world.addChild((new butt_submit_score(this.w*.5,this.h-deltah,20)),40);
			deltah += 60;
		}
		me.game.world.addChild((new butt_main_menu(this.w*.5,this.h-40,20)),40);
		
	}
});


//////////////////////////////////////////////////////////////////// MAIN MENU BUTTON
var butt_main_menu = generic_big_button.extend(
{	
	draw: function(renderer) {
        renderer.drawImage(this.image, this.x, this.y);
		text = game.data.locale.main_menu;
        drawText (renderer, text, this.textx, this.texty, 200, this.font.font, this.font.shadow);
    },

	onClick:function(){
		me.state.change(me.state.MENU);
		if(PREFS["AUDIOENABLED"].value) me.audio.play("click");
		return true;
	}
});

//////////////////////////////////////////////////////////////////// SUBMIT SCORE BUTTON
var butt_submit_score = generic_big_button.extend(
{	
	draw: function(renderer) {
        renderer.drawImage(this.image, this.x, this.y);
		text = game.data.locale.submit_score;
        drawText (renderer, text, this.textx, this.texty, 200, this.font.font, this.font.shadow);
    },

	onClick:function(){
		me.state.change(me.state.USER + 4);
		if(PREFS["AUDIOENABLED"].value) me.audio.play("click");
		return true;
	}
});



////////////////////////////////////////////////////////////////////////////
/////////////////////////////    YOU DID IT   //////////////////////////////
////////////////////////////////////////////////////////////////////////////

game.YouDidItScreen = me.ScreenObject.extend( {

	onResetEvent: function() {
		this.w =  me.game.viewport.width;
		this.h =  me.game.viewport.height;
		var _this = this;

		
		if (navigator.isCocoonJS ){			// fullscreen ad show
			if(ads.interstitialAlreadyDownloaded){
				Cocoon.Ad.showInterstitial();
				console.info("mostra fullscreen");
			}
		}

		this.overlay = new me.ColorLayer("overlay", new me.Color(0, 0, 0, 0.3), 0);
		me.game.world.addChild(this.overlay,-999);

		me.game.world.addChild((new menu_home(this.w/2-70,this.h/2-20)),40);
		me.game.world.addChild((new menu_restart(this.w/2,this.h/2-20)),40);
		me.game.world.addChild((new menu_continue(this.w/2+70,this.h/2-20)),40);
		
		// add the "you did it" text
		this.youdidit = new (me.Renderable.extend ({
			// constructor
			init : function() {
				this._super(me.Renderable, 'init', [0, 0, 100, 100]);
				this.font = prepareFont(30);
				this.upd = true;
			},
			update : function (dt) {
				if (game.gamepad.axes[1]!=0 || game.gamepad.axes[0]!=0){
					if(PREFS["AUDIOENABLED"].value) me.audio.play("click");
					game.data.level++;
					try{
						if(game.data.level > me.save.level) me.save.level = game.data.level;
					}catch(err){
						console.info("Error on local storage: " + err.message + "\n\n");
					}
					if(!navigator.isCocoonJS && PREFS["ADS_ON_NEW_LEVEL"].value ){
						me.state.change(me.state.USER + 6);
					}else{
						me.state.change(me.state.PLAY);
					}
				}
				
				
				if (this.upd){
		            this.upd = false;
		            return true;
		        }else{
		        	return false;
		        }
		    },
			draw: function(renderer) {
				var text = game.data.locale.you_did_it;
				drawText (renderer, text,  _this.w/2, _this.h/2-100, 460, this.font.font, this.font.shadow);
			}
		}));
		me.game.world.addChild(this.youdidit, 999);
		this.youdidit.pos.z = 999
		this.youdidit.draw(me.video.renderer);

	}
});

//////////////////////////////////////////////////////////////////// MENU HOME
var menu_home = me.GUI_Object.extend(
{	
	init:function(x, y,image){
		var settings = {}
		this.image =  me.loader.getImage("home_button");
		settings.image = this.image;
		settings.framewidth = this.image.width;
		settings.frameheight = this.image.height;
		this.x=x-settings.framewidth/2;
		this.y=y-settings.frameheight/2;
		this._super(me.GUI_Object, "init", [x-settings.framewidth/2, y-settings.frameheight/2, settings]);
		this.pos.z = 4;
	},
	
	draw: function(renderer) {
        renderer.drawImage(this.image, this.x, this.y);
    },

	onClick:function(){
		if(PREFS["AUDIOENABLED"].value) me.audio.play("click");
		me.state.change(me.state.MENU);
		return true;
	}
});

//////////////////////////////////////////////////////////////////// MENU RESTART
var menu_restart = me.GUI_Object.extend(
{	
	init:function(x, y,image){
		var settings = {}
		this.image =  me.loader.getImage("restart_button");
		settings.image = this.image;
		settings.framewidth = this.image.width;
		settings.frameheight = this.image.height;
		this.x=x-settings.framewidth/2;
		this.y=y-settings.frameheight/2;
		this._super(me.GUI_Object, "init", [x-settings.framewidth/2, y-settings.frameheight/2, settings]);
		this.pos.z = 4;
	},
	
	draw: function(renderer) {
        renderer.drawImage(this.image, this.x, this.y);
    },

	onClick:function(){
		if(PREFS["AUDIOENABLED"].value) me.audio.play("click");
		if(!navigator.isCocoonJS){
			me.state.change(me.state.USER + 6);
		}else{
			me.state.change(me.state.PLAY);
		}
		return true;
	}
});

//////////////////////////////////////////////////////////////////// MENU CONTINUE
var menu_continue = me.GUI_Object.extend(
{	
	init:function(x, y,image){
		var settings = {}
		this.image =  me.loader.getImage("continue_button");
		settings.image = this.image;
		settings.framewidth = this.image.width;
		settings.frameheight = this.image.height;
		this.x=x-settings.framewidth/2;
		this.y=y-settings.frameheight/2;
		this._super(me.GUI_Object, "init", [x-settings.framewidth/2, y-settings.frameheight/2, settings]);
		this.pos.z = 4;
	},
	
	draw: function(renderer) {
        renderer.drawImage(this.image, this.x, this.y);
    },
	
	onClick:function(){
		if(PREFS["AUDIOENABLED"].value) me.audio.play("click");
		game.data.level++;
		try{
			if(game.data.level > me.save.level) me.save.level = game.data.level;
		}catch(err){
			console.info("Error on local storage: " + err.message + "\n\n");
		}
		if(!navigator.isCocoonJS && PREFS["ADS_ON_NEW_LEVEL"].value ){
			me.state.change(me.state.USER + 6);
		}else{
			me.state.change(me.state.PLAY);
		}
		return true;
	}
});




////////////////////////////////////////////////////////////////////////////
////////////////////////////    FULL SCREEN AD   ///////////////////////////
////////////////////////////////////////////////////////////////////////////

game.FullAdScreen = me.ScreenObject.extend( {

	onResetEvent: function() {
		this.w =  me.game.viewport.width;
		this.h =  me.game.viewport.height;
		var scaleFactor1 = me.video.renderer.getHeight()/window.innerHeight;
		var scaleFactor2 = me.video.renderer.getWidth()/window.innerWidth;
		var scaleFactor = scaleFactor1<scaleFactor2 ? scaleFactor2 : scaleFactor1;
		var delta =  (window.innerHeight - (me.video.renderer.getHeight()/scaleFactor)) / 2;

		var newdiv = document.createElement('div');
		if(me.device.isMobile){
			newdiv.innerHTML = '<iframe src="'+ PREFS["BETWEEN_LEVELS_ADS_MOBILE"].value + '" width="100%" height="100%" frameborder="0" ></iframe>';
		}else{
			newdiv.innerHTML = '<iframe src="'+ PREFS["BETWEEN_LEVELS_ADS_DESKTOP"].value + '" width="100%" height="100%" frameborder="0" ></iframe>';
		}
		newdiv.style.position="absolute";
		newdiv.style.zIndex = '999';
		newdiv.style.top = delta + 30/scaleFactor + 'px';
		newdiv.style.margin='0';
		newdiv.style.padding='0';
		newdiv.style.width=window.innerWidth+'px';
		newdiv.style.height=window.innerHeight+'px';
		newdiv.style.background='white';
		newdiv.id = "fullads";
		document.body.appendChild(newdiv);
		me.game.world.addChild((new x_button(this.w-15,15)),40);
	},

	onDestroyEvent : function() {
		var ads = document.getElementById("fullads");
		document.body.removeChild(ads);
	}
});

//////////////////////////////////////////////////////////////////// X BUTTON
var x_button = me.GUI_Object.extend(
{	
	init:function(x, y){
		settings = {}
		settings.image = me.loader.getImage("butt_x");
		settings.framewidth = settings.image.width;
		settings.frameheight = settings.image.height;
		this.x=x;
		this.y=y;
		settings.width = settings.spritewidth;
		settings.height = settings.spriteheight;
		this._super(me.GUI_Object, "init", [x-settings.spritewidth/2, y-settings.spriteheight/2, settings]);
		me.sys.pauseOnBlur = false;
	},

	onClick:function(){
		setTimeout(function() {
			me.state.change(me.state.PLAY);
			me.sys.pauseOnBlur = true;
		}, 300);
		return true;
	}
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////    PLAY SCREEN    ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

game.PlayScreen = me.ScreenObject.extend({
	onResetEvent: function() {

		// load a level
        game.data.radarEntities.length=0;
        delete game.data.collisionArray;
        game.data.dotCounter = 0;
        game.data.teleportCounter = 0;
        delete game.data.teleportArray;
        delete game.data.teleportList;
        me.sys.fps=PREFS["MAX_FPS"].value;
        
        if( game.data.level > me.levelDirector.levelCount() ){ // if last level let's start over
			game.data.level = 1; 
			game.data.levelNumberShift ++;
		}
		
        me.levelDirector.loadLevel("level"+game.data.level.toString());
        
		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
		game.data.Path_Layer.alpha = 0;

		// ingame ads
		if(PREFS["IN_GAME_ADS"].value){
			if (navigator.isCocoonJS) {	// cocoon ads
				Cocoon.Ad.showBanner();
			}else{						// browser ads
				var ads = document.getElementById("ads");
				ads.style.zIndex = "999";
				ads.style.display = 'block';
			}
		}
		
		//// optimized dots system
		game.data.Dots_Layer =  getLayerByName("dots");
		if(game.data.Dots_Layer != null){
			var cols = game.data.Path_Layer.cols;
			var rows = game.data.Path_Layer.rows;

			for( var c = 0; c<cols; c++){
				for( var r = 0; r<rows; r++){
					var tileId = game.data.Dots_Layer.getTileId(c*game.data.tilewidth+(game.data.tilewidth/2), r*game.data.tileheight+(game.data.tileheight/2));
					if(tileId != null) game.data.dotCounter += 1;
				}		
			}
		}
	},

	onDestroyEvent: function() {
		me.sys.fps=60;
		// remove the HUD from the game world
		if(me.game.world.hasChild(this.HUD)){
			me.game.world.removeChild(this.HUD);
		}

		// dismiss ingame ads
		if(PREFS["IN_GAME_ADS"].value){
			if (navigator.isCocoonJS){
				Cocoon.Ad.hideBanner();
			}else{
				var ads = document.getElementById("ads");
				ads.style.zIndex = "-999";
				ads.style.display = 'none';
			}
		}
	}
});

game.Restart = me.ScreenObject.extend({
	onResetEvent: function() {
		me.state.change(me.state.PLAY);
	}
});

function resetGame(){
	// set costants
	game.data.PLAYER_OBJECT	= 1;
	game.data.ENEMY_OBJECT	= 2;
	// reset game variables
	game.data.score = 0;
	game.data.lives = 2;
	game.data.text = "";
	game.data.title = "";
	game.data.level = 1;
	game.data.running = true;
	game.data.levelNumberShift = 0;
	game.data.playerName="";
	game.data.radarEntities	= new Array();
}



