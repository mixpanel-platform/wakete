function CInterface(){   
    
    var _iFrame=0;
    var _iBaseX;
    var _iBaseY;
    var _pStartPosGuard;
    var _pStartPosExit;
    var _pStartPosAudio;
    var _oButGuard;
    var _oButExitBig;
    var _oButRestart;
    var _oAudioToggle;
    var _oButExit;
    var _oEnergyP;  
    var _oFillPHp;
    var _oMaskPHp;
    var _oImagePlayer;
    var _oIconHpP;
    var _oIconStP;
    var _oIconHpE;
    var _oStaminaP; 
    var _oFillPSt;
    var _oMaskPSt;
    var _oEnergyE;
    var _oFillEHp;
    var _oMaskEHp;
    var _oImageEnemy;
    var _aParticle;
    
    this._init = function(){                
       _pStartPosGuard = {x: (CANVAS_WIDTH/2), y: CANVAS_HEIGHT -70};

        var oSprite = s_oSpriteLibrary.getSprite('but_defence');
        _oButGuard= new CGfxButton((_pStartPosGuard.x),_pStartPosGuard.y,oSprite,s_oStage);
        _oButGuard.setVisible(true);
        _oButGuard.addEventListener(ON_MOUSE_UP, this._onGuardButReleased, this);
        _oButGuard.addEventListener(ON_MOUSE_DOWN, this._onGuardButPressed, this);
  
        
       ///Player HP///  
       
       var oSprite = s_oSpriteLibrary.getSprite('fill_energy');
       _oFillPHp = createBitmap(oSprite);
       _oFillPHp.regY = oSprite.height;
       _oFillPHp.rotation=180;
       _oFillPHp.x = 92;
       _oFillPHp.y = 385;
       s_oStageInterface.addChild(_oFillPHp);
         
       _oMaskPHp = createBitmap(s_oSpriteLibrary.getSprite('mask_energy'));
       _oMaskPHp.rotation=180;
       _oMaskPHp.regY = oSprite.height;
       _oMaskPHp.x = 92; 
       _oMaskPHp.y = 385;
       _oMaskPHp.scaleY = 0;
       s_oStageInterface.addChild(_oMaskPHp);
       
       var oSprite = s_oSpriteLibrary.getSprite('energy_bar');
       _oEnergyP = createBitmap(oSprite);
       _oEnergyP.regY = oSprite.height;
      _oEnergyP.rotation=180; 
       _oEnergyP.x = 102;
       _oEnergyP.y = 375;
       s_oStageInterface.addChild(_oEnergyP);
       ////////////////////
       
       ///Stamina Player///
       var oSprite = s_oSpriteLibrary.getSprite('fill_stamina');
       _oFillPSt = createBitmap(oSprite);
       _oFillPSt.regY = oSprite.height;
       _oFillPSt.rotation=180;
       _oFillPSt.x = 112;
       _oFillPSt.y = 385;
       s_oStageInterface.addChild(_oFillPSt);
          
       _oMaskPSt = createBitmap(s_oSpriteLibrary.getSprite('mask_energy'));
       _oMaskPSt.x = 96; 
       _oMaskPSt.y = 385;
       _oMaskPSt.scaleY = 0;
       s_oStageInterface.addChild(_oMaskPSt);
       
       var oSprite = s_oSpriteLibrary.getSprite('energy_bar');
       _oStaminaP = createBitmap(oSprite);
       _oStaminaP.regY = oSprite.height;
       _oStaminaP.rotation=180; 
       _oStaminaP.x = 122;
       _oStaminaP.y = 375;
       s_oStageInterface.addChild(_oStaminaP);
       ///////////////////
       
       ///Enemy HP///
       var oSprite = s_oSpriteLibrary.getSprite('fill_energy');
       _oFillEHp = createBitmap(oSprite);             
       _oFillEHp.x = 576;
       _oFillEHp.y = 190;
       s_oStageInterface.addChild(_oFillEHp);
        
        
       _oMaskEHp = createBitmap(s_oSpriteLibrary.getSprite('mask_energy'));
       _oMaskEHp.rotation=180;
       _oMaskEHp.x = 592;  
       _oMaskEHp.y = 641;  
       _oMaskEHp.scaleY = 0;
       s_oStageInterface.addChild(_oMaskEHp); 
      
       _oEnergyE = createBitmap(s_oSpriteLibrary.getSprite('energy_bar'));
       _oEnergyE.x = 566;
       _oEnergyE.y = 180;
       s_oStageInterface.addChild(_oEnergyE);
       
        if(s_iPlayerSelected===0){
            _oImagePlayer=createBitmap(s_oSpriteLibrary.getSprite('energy_avatar_white'));
            _oImageEnemy=createBitmap(s_oSpriteLibrary.getSprite('energy_avatar_black'));
        }else{
            _oImagePlayer=createBitmap(s_oSpriteLibrary.getSprite('energy_avatar_black'));
            _oImageEnemy=createBitmap(s_oSpriteLibrary.getSprite('energy_avatar_white'));
        }
       
        ///////Avatar//////     
       _oImagePlayer.x = 63; 
       _oImagePlayer.y = 820;
       s_oStageInterface.addChild(_oImagePlayer);
       ///////////////////
        
        ///////Avatar////// 
       _oImageEnemy.x = 551; 
       _oImageEnemy.y = 160;
       s_oStageInterface.addChild(_oImageEnemy);
       ///////////////////
       
       _oIconHpP=createBitmap(s_oSpriteLibrary.getSprite('icon_energy'));
       _oIconHpP.x = 77; 
       _oIconHpP.y = 800;
       s_oStageInterface.addChild(_oIconHpP);
       
       _oIconStP=createBitmap(s_oSpriteLibrary.getSprite('icon_stamina'));
       _oIconStP.x = 98; 
       _oIconStP.y = 800;
       s_oStageInterface.addChild(_oIconStP);

       _oIconHpE=createBitmap(s_oSpriteLibrary.getSprite('icon_energy'));
       _oIconHpE.x = 577; 
       _oIconHpE.y = 200;
       s_oStageInterface.addChild(_oIconHpE);
       //////////////
       
       
       //Functional buttons//
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: (CANVAS_WIDTH -120), y: 50};
        _oButExit= new CGfxButton((_pStartPosExit.x),_pStartPosExit.y,oSprite,s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExitButReleased, this);

        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                _pStartPosAudio = {x: (CANVAS_WIDTH -40), y: 50};
                _oAudioToggle= new CToggle((_pStartPosAudio.x),_pStartPosAudio.y,s_oSpriteLibrary.getSprite('audio_icon2'),s_bAudioActive,s_oStage);
                _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        }		
      

        var oSprite = s_oSpriteLibrary.getSprite('but_exit_big');
        _oButExitBig= new CGfxButton(CANVAS_WIDTH/2 -100,CANVAS_HEIGHT-200,oSprite,s_oStage);
        _oButExitBig.setVisible(false);
        _oButExitBig.addEventListener(ON_MOUSE_UP, this._onExitButReleased, this);
     
        var oSprite = s_oSpriteLibrary.getSprite('but_restart');
        _oButRestart= new CGfxButton(CANVAS_WIDTH/2 +100,CANVAS_HEIGHT-200,oSprite,s_oStage);
        _oButRestart.setVisible(false);
        _oButRestart.addEventListener(ON_MOUSE_UP, this._onRestartButReleased, this);
        ////////////////////
        _aParticle = new Array();
         for (var i=0; i<5; i++){               
            var oSprite = s_oSpriteLibrary.getSprite("particle_"+i);          
            _aParticle[i] = createBitmap(oSprite);
            _aParticle[i].visible=false; 
            _aParticle[i].x = CANVAS_WIDTH/2-100;
            _aParticle[i].y = 300;
            
          s_oStage.addChild(_aParticle[i]);
         }
         _iBaseX=_aParticle[0].x;
         _iBaseY=_aParticle[0].y;
       this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
      s_oStageInterface.update();
    };
    
    this.unload = function(){
        
    };
    

     this.refreshButtonPos = function(iNewX,iNewY){
        _oButGuard.setPosition(_pStartPosGuard.x,_pStartPosGuard.y - iNewY);
        _oButExit.setPosition(_pStartPosExit.x - iNewX,_pStartPosExit.y + iNewY);
        s_oGame.setTapLimit(_pStartPosGuard.y - iNewY);
         
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
               _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,_pStartPosAudio.y + iNewY);
        }        

        s_oStageInterface.update();        
    };
    
    this._onGuardButReleased = function(){
        if(!s_oGame.getPIsPunching() && !s_oGame.getKoP()){
           s_oGame.changePlayerState(IDLE);
           s_oGame.setPBlocked(false);
           s_oGame.setPGuard(false);
       }
    };
    
    this._onGuardButPressed = function(){
        if(!s_oGame.getPIsPunching()&& !s_oGame.getKoP()){   
            s_oGame.changePlayerState(GUARD);
            s_oGame.setPBlocked(true);
            s_oGame.setPGuard(true);

        }
    };
    
     this._onExitButReleased = function(){
         s_oGame.onExit(); 
     };
     
     this._onAudioToggle = function(){
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
     
    this._onRestartButReleased = function(){
             s_oGame.onRestart();
    };
    
    this.setGuardButVisibilty = function(bVisibilityValue){
        _oButGuard.setVisible(bVisibilityValue);
 
    };
    
    this.getGuardButVisibilty = function(){
        return _oButGuard.getVisible();
    };
    
    this.setPlayerHp = function(iPHp){
        _oMaskPHp.scaleY=1-(iPHp/100);
	s_oStageInterface.update(); 
    };
    
    this.setPlayerStamina = function(iPSt){
        if(iPSt<0){
            iPSt=0;
        }
        _oMaskPSt.scaleY=1-(iPSt/100);
	s_oStageInterface.update(); 
    };
    
    this.setEnemyHp = function(iEHp){
       _oMaskEHp.scaleY=1-(iEHp/100);
        s_oStageInterface.update(); 
    };
    
    this.setKoButVisibility = function(bVisible){
      _oButExitBig.setVisible(bVisible);
      _oButRestart.setVisible(bVisible);
      s_oStageInterface.update();
    };
    
     this.setEnergyVisibility = function(bVisibilityValue){
        _oEnergyP.visible=bVisibilityValue;
        _oFillPHp.visible=bVisibilityValue;
        _oMaskPHp.visible=bVisibilityValue;
        _oStaminaP.visible=bVisibilityValue;
        _oFillPSt.visible=bVisibilityValue;
        _oMaskPSt.visible=bVisibilityValue;
        _oEnergyE.visible=bVisibilityValue;
        _oFillEHp.visible=bVisibilityValue;
        _oMaskEHp.visible=bVisibilityValue;
        _oImagePlayer.visible=bVisibilityValue;
        _oImageEnemy.visible=bVisibilityValue;
        _oIconHpE.visible=bVisibilityValue;
        _oIconHpP.visible=bVisibilityValue;
        _oIconStP.visible=bVisibilityValue;
        s_oStageInterface.update(); 
    };
    
    this.playParticle = function(iOffX,iOffY){
        if(_iFrame===0){            
           _aParticle[0].visible=true;
           _aParticle[0].x+=iOffX;
           _aParticle[0].y+=iOffY;
           
        } else {
            _aParticle[_iFrame-1].visible=false;
            _aParticle[_iFrame-1].x=_iBaseX;
            _aParticle[_iFrame-1].y=_iBaseY;
            
            _aParticle[_iFrame].x+=iOffX;
            _aParticle[_iFrame].y+=iOffY;
            _aParticle[_iFrame].visible=true;

        }       
        
        
        _iFrame++;
        
        if(_iFrame===5){
            s_oGame.stopParticle();
            _aParticle[4].visible=false;
            _iFrame=0;
            
        }
        
    };
    
    s_oInterface = this;
    
    this._init();
    
    return this;
}

var s_oInterface = null;