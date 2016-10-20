function CMain(oData){
    var _bUpdate;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    var _oData;
    
    var _oPreloader;
    var _oMenu;
    var _oModeMenu;
    var _oHelp;
    var _oGame;
    var newUrl = "/games/JumperFrog/";

    this.initContainer = function(){
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
        createjs.Touch.enable(s_oStage);
		
	s_bMobile = jQuery.browser.mobile;
        if(s_bMobile === false){
            s_oStage.enableMouseOver(20);  
            $('body').on('contextmenu', '#canvas', function(e){ return false; });
        }
		
        s_iPrevTime = new Date().getTime();

	createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.setFPS(24);
        
        if(navigator.userAgent.match(/Windows Phone/i)){
                DISABLE_SOUND_MOBILE = true;
        }
        
        s_oSpriteLibrary  = new CSpriteLibrary();

        //ADD PRELOADER
        _oPreloader = new CPreloader();
		
	
    };
    
    this.preloaderReady = function(){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            this._initSounds();
        }
        
        this._loadImages();
        _bUpdate = true;
    };
    
    this.soundLoaded = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);
        _oPreloader.refreshLoader(iPerc);

         if(_iCurResource === RESOURCE_TO_LOAD){
             _oPreloader.unload();
            
            if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                s_oSoundtrack = createjs.Sound.play("soundtrack",{ loop:-1});
            }
            this.gotoMenu();
         }
    };
    
    this._initSounds = function(){
         if (!createjs.Sound.initializeDefaultPlugins()) {
             return;
         }

        if(navigator.userAgent.indexOf("Opera")>0 || navigator.userAgent.indexOf("OPR")>0){
                createjs.Sound.alternateExtensions = ["m4a"];
                createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

                createjs.Sound.registerSound(newUrl+"./sounds/fr_soundtrack.ogg", "soundtrack");
                createjs.Sound.registerSound(newUrl+"./sounds/press_button.ogg", "click");
                createjs.Sound.registerSound(newUrl+"./sounds/fr_game_over.ogg", "game_over");                
                createjs.Sound.registerSound(newUrl+"./sounds/fr_frog_arrived.ogg", "frog_arrived");
                createjs.Sound.registerSound(newUrl+"./sounds/fr_frog_death_road.ogg", "splat");
                createjs.Sound.registerSound(newUrl+"./sounds/fr_frog_death_water.ogg", "drown");
                createjs.Sound.registerSound(newUrl+"./sounds/fr_frog_jump.ogg", "jump", 5);
                createjs.Sound.registerSound(newUrl+"./sounds/fr_power_up.ogg", "eat_fly");
                createjs.Sound.registerSound(newUrl+"./sounds/fr_win_level.ogg", "win_level");
                createjs.Sound.registerSound(newUrl+"./sounds/fr_horn_1.ogg", "big_hornet");
                createjs.Sound.registerSound(newUrl+"./sounds/fr_horn_2.ogg", "small_hornet");
        }else{
                createjs.Sound.alternateExtensions = ["ogg"];
                createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

                createjs.Sound.registerSound(newUrl+"./sounds/fr_soundtrack.m4a", "soundtrack");
                createjs.Sound.registerSound(newUrl+"./sounds/press_button.m4a", "click");
                createjs.Sound.registerSound(newUrl+"./sounds/fr_game_over.m4a", "game_over");
                createjs.Sound.registerSound(newUrl+"./sounds/fr_frog_arrived.m4a", "frog_arrived");
                createjs.Sound.registerSound(newUrl+"./sounds/fr_frog_death_road.m4a", "splat");
                createjs.Sound.registerSound(newUrl+"./sounds/fr_frog_death_water.m4a", "drown");
                createjs.Sound.registerSound(newUrl+"./sounds/fr_frog_jump.m4a", "jump", 5);
                createjs.Sound.registerSound(newUrl+"./sounds/fr_power_up.m4a", "eat_fly");
                createjs.Sound.registerSound(newUrl+"./sounds/fr_win_level.m4a", "win_level");
                createjs.Sound.registerSound(newUrl+"./sounds/fr_horn_1.m4a", "big_hornet");
                createjs.Sound.registerSound(newUrl+"./sounds/fr_horn_2.m4a", "small_hornet");

        }
        
        RESOURCE_TO_LOAD += 11;
        
    };

    this._loadImages = function(){
        s_oSpriteLibrary.init( this._onImagesLoaded,this._onAllImagesLoaded, this );

        s_oSpriteLibrary.addSprite("but_play",newUrl+"./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("msg_box",newUrl+"./sprites/msg_box.png");
        
        s_oSpriteLibrary.addSprite("bg_menu",newUrl+"./sprites/bg_menu.jpg"); 
        s_oSpriteLibrary.addSprite("bg_game",newUrl+"./sprites/bg_game.png");        
        s_oSpriteLibrary.addSprite("gui_panel_bottom",newUrl+"./sprites/gui_panel_bottom.png");
        s_oSpriteLibrary.addSprite("gui_panel_top",newUrl+"./sprites/gui_panel_top.png");
        s_oSpriteLibrary.addSprite("life",newUrl+"./sprites/life.png");
        s_oSpriteLibrary.addSprite("time_bar_frame",newUrl+"./sprites/time_bar_frame.png");
        s_oSpriteLibrary.addSprite("time_bar_fill",newUrl+"./sprites/time_bar_fill.png");
        s_oSpriteLibrary.addSprite("bg_help",newUrl+"./sprites/bg_help.png");
        
        s_oSpriteLibrary.addSprite("but_exit",newUrl+"./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("audio_icon",newUrl+"./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("but_up",newUrl+"./sprites/but_up.png");
        s_oSpriteLibrary.addSprite("but_down",newUrl+"./sprites/but_down.png");
        s_oSpriteLibrary.addSprite("but_left",newUrl+"./sprites/but_left.png");
        s_oSpriteLibrary.addSprite("but_right",newUrl+"./sprites/but_right.png");
		s_oSpriteLibrary.addSprite("skid_rows",newUrl+"./sprites/skid_rows.png");
                
        var szTag;
        for(var i=0; i<10; i++){
            szTag = "water_anim_"+i;
            s_oSpriteLibrary.addSprite(szTag,newUrl+"./sprites/"+szTag+".jpg");
        }
        var szTag2;
        for(var i=1; i<11; i++){
            szTag = "car_"+i;
            szTag2 = "car_"+(i-1);
            s_oSpriteLibrary.addSprite(szTag2,newUrl+"./sprites/"+szTag+".png");
        }
        
        s_oSpriteLibrary.addSprite("trunk",newUrl+"./sprites/trunk.png");
        s_oSpriteLibrary.addSprite("turtle",newUrl+"./sprites/turtle.png");
        s_oSpriteLibrary.addSprite("fly",newUrl+"./sprites/fly.png");
        
        s_oSpriteLibrary.addSprite("frog",newUrl+"./sprites/frog.png");
        
        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };
    
    this._onImagesLoaded = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);
        _oPreloader.refreshLoader(iPerc);
        
        if(_iCurResource === RESOURCE_TO_LOAD){
            _oPreloader.unload();
            
            if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                s_oSoundtrack = createjs.Sound.play("soundtrack",{ loop:-1});
            }
            
            this.gotoMenu();
        }
    };
    
    this._onAllImagesLoaded = function(){
        
    };
    
    this.onAllPreloaderImagesLoaded = function(){
        this._loadImages();
    };
    
    this.gotoMenu = function(){
        _oMenu = new CMenu();
        _iState = STATE_MENU;
    };

    this.gotoGame = function(bEasyMode){
        s_bEasyMode=bEasyMode;
        _oGame = new CGame(_oData);   						
        _iState = STATE_GAME;

        $(s_oMain).trigger("game_start");
    };
    
    this.gotoHelp = function(){
        _oHelp = new CHelp();
        _iState = STATE_HELP;
    };
	
	this.stopUpdate = function(){
		_bUpdate = false;
	};
	
	this.startUpdate = function(){
		_bUpdate = true;
	};
    
    this._update = function(event){
        if(_bUpdate === false){
                return;
        }
        var iCurTime = new Date().getTime();
        s_iTimeElaps = iCurTime - s_iPrevTime;
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        s_iPrevTime = iCurTime;
        
        if ( s_iCntTime >= 1000 ){
            s_iCurFps = s_iCntFps;
            s_iCntTime-=1000;
            s_iCntFps = 0;
        }
                
        if(_iState === STATE_GAME){
            _oGame.update();
        }
        
        s_oStage.update(event);

    };
    
    s_oMain = this;
    
    _oData = oData;
    
    this.initContainer();
}
var s_bMobile;
var s_bEasyMode;
var s_bAudioActive = true;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;

var s_oDrawLayer;
var s_oStage;
var s_oMain;
var s_oSpriteLibrary;
var s_oSoundTrack;
var s_oCanvas;
