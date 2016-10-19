function CMenu(){
    var _oBg;
    var _oButPlay;
    var _oFade;
    var _oAudioToggle;
    var _pStartPosPlay;
    var _pStartPosAudio;

    
    this._init = function(){
         

        _pStartPosPlay = {x: (CANVAS_WIDTH/2), y: CANVAS_HEIGHT -120};
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        s_oStage.addChild(_oBg);
        

        var oSprite = s_oSpriteLibrary.getSprite('but_play');
        _oButPlay = new CGfxButton((_pStartPosPlay.x),_pStartPosPlay.y,oSprite,s_oStage);
        _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
           var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
           _pStartPosAudio = {x: CANVAS_WIDTH - (oSprite.height/2)- 10, y: (oSprite.height/2) + 10};            
           _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive,s_oStage);
           _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);          
       }

        _oFade = createBitmap(s_oSpriteLibrary.getSprite('fade'));
        
        s_oStage.addChild(_oFade);
        
        createjs.Tween.get(_oFade).to({alpha:0}, 500).call(function(){_oFade.visible = false;});  
       
        this.refreshButtonPos(s_iOffsetX,s_iOffsetY);       
          
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            if(s_oSoundtrack === null){
                s_oSoundtrack = createjs.Sound.play("soundtrack",{loop:-1});
                s_oSoundtrack.volume=1;
            }else{
                s_oSoundtrack.play();
                s_oSoundtrack.volume=1;
            }
            
        }
    };
    
    this.unload = function(){
        s_oStage.removeAllChildren();
      
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        s_oMenu = null;
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        _oButPlay.setPosition(_pStartPosPlay.x,_pStartPosPlay.y- iNewY);
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x-iNewX,_pStartPosAudio.y+ iNewY);
        }
    };
    
    this._onAudioToggle = function(){
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this._onButPlayRelease = function(){   
        this.unload();
        s_oMain.gotoPSelection();   
    };
	
  
    s_oMenu = this;
    
    this._init();
}

var s_oMenu = null;