function CMain(oData){

    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    
    var _oData;
    var _oPreloader;
    var _oMenu;
    var _oHelp;
    var _oGame;
    var newUrl = "/games/goal/";

    this.initContainer = function(){
        var canvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(canvas);       
        createjs.Touch.enable(s_oStage);
        
        s_bMobile = jQuery.browser.mobile;
        if(s_bMobile === false){
            s_oStage.enableMouseOver(20);  
        }
        
        
        s_iPrevTime = new Date().getTime();

        createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", this._update);
		
		if(navigator.userAgent.match(/Windows Phone/i)){
			DISABLE_SOUND_MOBILE = true;
		}
		
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            this._initSounds();
        }
		
        s_oSpriteLibrary  = new CSpriteLibrary();

        //ADD PRELOADER
        _oPreloader = new CPreloader();

        this._loadImages();
    };

    this.soundLoaded = function(){
         _iCurResource++;

         if(_iCurResource === RESOURCE_TO_LOAD){
              new CSlotSettings();
             _oPreloader.unload();
            
            this.gotoMenu();
         }
    };
    
    this._initSounds = function(){
         if (!createjs.Sound.initializeDefaultPlugins()) {
             return;
         }

        
		
		if(navigator.userAgent.indexOf("Opera")>0 || navigator.userAgent.indexOf("OPR")>0){
			createjs.Sound.alternateExtensions = ["mp3"];
			createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));
		
			createjs.Sound.registerSound(newUrl+"./sounds/press_but.ogg", "press_but");
			createjs.Sound.registerSound(newUrl+"./sounds/win.ogg", "win");
			createjs.Sound.registerSound(newUrl+"./sounds/reels.ogg", "reels");
			createjs.Sound.registerSound(newUrl+"./sounds/reel_stop.ogg", "reel_stop",6);
			createjs.Sound.registerSound(newUrl+"./sounds/start_reel.ogg", "start_reel",6);
		}else{
			createjs.Sound.alternateExtensions = ["ogg"];
			createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));
		
			createjs.Sound.registerSound(newUrl+"./sounds/press_but.mp3", "press_but");
			createjs.Sound.registerSound(newUrl+"./sounds/win.mp3", "win");
			createjs.Sound.registerSound(newUrl+"./sounds/reels.mp3", "reels");
			createjs.Sound.registerSound(newUrl+"./sounds/reel_stop.mp3", "reel_stop",6);
			createjs.Sound.registerSound(newUrl+"./sounds/start_reel.mp3", "start_reel",6);
		}
        RESOURCE_TO_LOAD += 5;
        
    };
    
    this._loadImages = function(){
        s_oSpriteLibrary.init( this._onImagesLoaded,this._onAllImagesLoaded, this );

        s_oSpriteLibrary.addSprite("but_bg",newUrl+"./sprites/but_play_bg.png");
        s_oSpriteLibrary.addSprite("but_exit",newUrl+"./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("bg_menu",newUrl+"./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_game",newUrl+"./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("paytable",newUrl+"./sprites/paytable.jpg");
        s_oSpriteLibrary.addSprite("mask_slot",newUrl+"./sprites/mask_slot.png");
        s_oSpriteLibrary.addSprite("spin_but",newUrl+"./sprites/but_spin_bg.png");
        s_oSpriteLibrary.addSprite("coin_but",newUrl+"./sprites/but_coin_bg.png");
        s_oSpriteLibrary.addSprite("info_but",newUrl+"./sprites/but_info_bg.png");
        s_oSpriteLibrary.addSprite("bet_but",newUrl+"./sprites/bet_but.png");
        s_oSpriteLibrary.addSprite("win_frame_anim",newUrl+"./sprites/win_frame_anim.png");
        s_oSpriteLibrary.addSprite("but_lines_bg",newUrl+"./sprites/but_lines_bg.png");
        s_oSpriteLibrary.addSprite("but_maxbet_bg",newUrl+"./sprites/but_maxbet_bg.png");
        s_oSpriteLibrary.addSprite("audio_icon",newUrl+"./sprites/audio_icon.png");
        
        for(var i=1;i<NUM_SYMBOLS+1;i++){
            s_oSpriteLibrary.addSprite("symbol_"+i,newUrl+"./sprites/symbol_"+i+".png");
            s_oSpriteLibrary.addSprite("symbol_"+i+"_anim",newUrl+"./sprites/symbol_"+i+"_anim.png");
        }
        
        for(var j=1;j<NUM_PAYLINES+1;j++){
            s_oSpriteLibrary.addSprite("payline_"+j,newUrl+"./sprites/payline_"+j+".png");
        }
        
        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();

        s_oSpriteLibrary.loadSprites();
    };
    
    this._onImagesLoaded = function(){
        _iCurResource++;

        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);

        _oPreloader.refreshLoader(iPerc);
        
        if(_iCurResource === RESOURCE_TO_LOAD){
            new CSlotSettings();
            _oPreloader.unload();
            
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
    
    this.gotoGame = function(){
        _oGame = new CGame(_oData);   
							
        _iState = STATE_GAME;
        $(s_oMain).trigger("game_start");
    };
    
    this.gotoHelp = function(){
        _oHelp = new CHelp();
        _iState = STATE_HELP;
    };
    
    this._update = function(event){
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