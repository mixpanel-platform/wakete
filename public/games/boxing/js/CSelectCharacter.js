function CSelectCharacter(){
    var _oBg;
    var _oButBWhite;
    var _oButBBlack;
    var _oLogo;
    var _oLogoText;
    var _oTextBW;
    var _oTextBB;
    var _oFade;
    var _oAudioToggle;
    var _pStartPosLogo;
    var _pStartPosAudio;
    var _pStartPosLogoText;
    
    this._init = function(){
        
        
        _pStartPosLogo = {x: 5, y: 5};
        _pStartPosLogoText = {x: CANVAS_WIDTH/2, y: 60};      
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_pselection'));
        s_oStage.addChild(_oBg);

       _oLogo = createBitmap(s_oSpriteLibrary.getSprite('logo'));
       _oLogo.x = _pStartPosLogo.x;
       _oLogo.y = _pStartPosLogo.y;
       s_oStage.addChild(_oLogo);
       
       _oLogoText = createBitmap(s_oSpriteLibrary.getSprite('logo_text'));
       _oLogoText.regX=165;
       _oLogoText.x = _pStartPosLogoText.x;
       _oLogoText.y = _pStartPosLogoText.y;
       s_oStage.addChild(_oLogoText);
       
       
        
        var oSprite = s_oSpriteLibrary.getSprite('bw_selection');
        _oButBWhite = new CSelectButton((CANVAS_WIDTH/2),CANVAS_HEIGHT - 600,oSprite,true);
        _oButBWhite.addEventListener(ON_MOUSE_UP, this._onButChooseWhite, this);

        
        var oSprite = s_oSpriteLibrary.getSprite('bb_selection');
        _oButBBlack = new CSelectButton((CANVAS_WIDTH/2),CANVAS_HEIGHT -300,oSprite,true);
        _oButBBlack.addEventListener(ON_MOUSE_UP, this._onButChooseBlack, this);

         _oTextBW = new createjs.BitmapText(TEXT_BOXERW, s_oSpriteSheetBoxing);
        _oTextBW.regX  = _oTextBW.getBounds().width/2;
        _oTextBW.regY  = _oTextBW.getBounds().height/2;
        _oTextBW.x = CANVAS_WIDTH/2+50 ;
        _oTextBW.y = 463;
        s_oStage.addChild(_oTextBW);
        
         _oTextBB = new createjs.BitmapText(TEXT_BOXERB, s_oSpriteSheetBoxing);
        _oTextBB.regX  = _oTextBB.getBounds().width/2;
        _oTextBB.regY  = _oTextBB.getBounds().height/2;
        _oTextBB.x = CANVAS_WIDTH/2+65 ;
        _oTextBB.y = CANVAS_HEIGHT - 200;
        s_oStage.addChild(_oTextBB);
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
                _pStartPosAudio = {x: (CANVAS_WIDTH -40), y: 50};
                _oAudioToggle= new CToggle((_pStartPosAudio.x),_pStartPosAudio.y,oSprite,s_bAudioActive,s_oStage);
                _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        }
        
        this.refreshButtonPos(s_iOffsetX,s_iOffsetY);

        _oFade = createBitmap(s_oSpriteLibrary.getSprite('fade'));
        
        s_oStage.addChild(_oFade);
        
        createjs.Tween.get(_oFade).to({alpha:0}, 500).call(function(){_oFade.visible = false;});  
    };
    
    this.unload = function(){
         s_oStage.removeAllChildren();
         s_oSelectCharacter= null;  
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
       _oLogo.x = _pStartPosLogo.x + iNewX;
       _oLogo.y = iNewY + _pStartPosLogo.y;
       
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x-iNewX,_pStartPosAudio.y+ iNewY);
        }
       _oLogoText.y = iNewY + _pStartPosLogoText.y;
    };
    
    
    this._onButChooseWhite = function(){
        s_iPlayerSelected=0;
        this.unload();
        setTimeout(function(){s_oMain.gotoGame();},200);
        
    };
    
    this._onButChooseBlack = function(){
        s_iPlayerSelected=1;
        this.unload();
         setTimeout(function(){s_oMain.gotoGame();},200);
        
    };
	
    this._onAudioToggle = function(){
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
  
    s_oSelectCharacter= this;
    
    this._init();
}

var s_oSelectCharacter = null;


