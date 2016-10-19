function CGame(oData){    
    
    var _bIsRegStamina=false;
    var _bIsRegKoP=false;
    var _bIsRegKoE=false;
    var _bKoP=false;
    var _bKoE=false;
    var _bReduceDamage=false;    
    var bPlayerBlocked=false;
    var bPlayerIsPunching=false;
    var bPlayerGuard=false;    
    var bEnemyGuard=false;
    var _bUpdate=false;
    var _bPlayAllAnimations=false;
    var _bPlayParticle=false;
    var _bHelpPanelOpen=true;
    var _bKoCountdown=false;
    var _iWakeUpTime;
    var _iCountdown=0;
    var _iTimeElaps=0;
    var _iTimeElaps2=0;
    var _iTimeKo=0;
    var _iPHp;
    var _iEHp;
    var _iPSt;
    var _iPKo;
    var _iEKo;
    var _iAnimReady=0;
    var iOffsetParticleX;
    var iOffsetParticleY;
    var iTouchLimit;
    var _oInterface;    
    var _oParent;
    var _oHammer;
    var _oPlayer;
    var _oEnemy;
    var _oBg;
    var _oVersusPanel;
    var _oKoPPanel;
    var _oKoEPanel;
    var _oKoPPanelWake;
    var _oKoEPanelWake;
    var _oKoPText;
    var _oKoEText;
    var _oHelpPanel;
    var _oText1;
    var _oText2;
    var _oCrowdIdle;
    
    
    
    this._init = function(bLoadBoxer){ 
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_game'));
        s_oStageBg.addChild(_oBg); //Draws on canvas
		
         _iPHp = PLAYER_HP;
         _iEHp = ENEMY_HP;
         _iPSt = PLAYER_STAMINA;
         _iPKo = PLAYER_KO;
         _iEKo = ENEMY_KO;
           
         if(s_iPlayerSelected===0){
            _oKoPPanel = createBitmap(s_oSpriteLibrary.getSprite('countdown_panel_white'));
            _oKoEPanel = createBitmap(s_oSpriteLibrary.getSprite('countdown_panel_black'));
            _oKoPPanelWake = createBitmap(s_oSpriteLibrary.getSprite('countdown_panel_continue_white'));
            _oKoEPanelWake = createBitmap(s_oSpriteLibrary.getSprite('countdown_panel_continue_black'));
            _oKoPText = createBitmap(s_oSpriteLibrary.getSprite('ko_white'));
            _oKoEText = createBitmap(s_oSpriteLibrary.getSprite('ko_black'));
         }else{
            _oKoPPanel = createBitmap(s_oSpriteLibrary.getSprite('countdown_panel_black'));
            _oKoEPanel = createBitmap(s_oSpriteLibrary.getSprite('countdown_panel_white'));
            _oKoPPanelWake = createBitmap(s_oSpriteLibrary.getSprite('countdown_panel_continue_black'));
            _oKoEPanelWake = createBitmap(s_oSpriteLibrary.getSprite('countdown_panel_continue_white'));
            _oKoPText = createBitmap(s_oSpriteLibrary.getSprite('ko_black'));
            _oKoEText = createBitmap(s_oSpriteLibrary.getSprite('ko_white'));
        
         }
        
        _oKoPPanel.regX  = _oKoPPanel.getBounds().width/2;
        _oKoPPanel.regY  = _oKoPPanel.getBounds().height/2;
        _oKoPPanel.x = CANVAS_WIDTH/2 ;
        _oKoPPanel.y = (CANVAS_HEIGHT/2);
        _oKoPPanel.visible=false;
        s_oStage.addChild(_oKoPPanel);
        
       
        _oKoEPanel.regX  = _oKoEPanel.getBounds().width/2;
        _oKoEPanel.regY  = _oKoEPanel.getBounds().height/2;
        _oKoEPanel.x = CANVAS_WIDTH/2 ;
        _oKoEPanel.y = (CANVAS_HEIGHT/2);
        _oKoEPanel.visible=false;
        s_oStage.addChild(_oKoEPanel);
        
        _oKoPPanelWake.alpha=0.3;
        _oKoPPanelWake.regX  = _oKoPPanelWake.getBounds().width/2;
        _oKoPPanelWake.regY  = _oKoPPanelWake.getBounds().height/2;
        _oKoPPanelWake.x = CANVAS_WIDTH/2-4;
        _oKoPPanelWake.y = (CANVAS_HEIGHT/2+4);
        _oKoPPanelWake.visible=false;
        s_oStage.addChild(_oKoPPanelWake);
        
        _oKoEPanelWake.alpha=0.3;
        _oKoEPanelWake.regX  = _oKoEPanelWake.getBounds().width/2;
        _oKoEPanelWake.regY  = _oKoEPanelWake.getBounds().height/2;
        _oKoEPanelWake.x = CANVAS_WIDTH/2-4;
        _oKoEPanelWake.y = (CANVAS_HEIGHT/2+4);
        _oKoEPanelWake.visible=false;
        s_oStage.addChild(_oKoEPanelWake);
        
         
        _oKoPText.regX  = _oKoPText.getBounds().width/2;
        _oKoPText.regY  = _oKoPText.getBounds().height/2;
        _oKoPText.x = CANVAS_WIDTH/2 ;
        _oKoPText.y = (CANVAS_HEIGHT/2);
        _oKoPText.visible=false;
        s_oStage.addChild(_oKoPText);
        
        
        _oKoEText.regX  = _oKoEText.getBounds().width/2;
        _oKoEText.regY  = _oKoEText.getBounds().height/2;
        _oKoEText.x = CANVAS_WIDTH/2 ;
        _oKoEText.y = (CANVAS_HEIGHT/2);
        _oKoEText.visible=false;
        s_oStage.addChild(_oKoEText);
        
        _oText1 = new createjs.BitmapText("1", s_oSpriteSheetBoxing);
        _oText1.visible=false;
        _oText1.regX  = _oText1.getBounds().width/2;
        _oText1.regY  = _oText1.getBounds().height/2;
        _oText1.x = CANVAS_WIDTH/2 ;
        _oText1.y = 200;
         s_oStage.addChild(_oText1);
         
        _oText2 = new createjs.BitmapText("Prepare to fight!", s_oSpriteSheetBoxing);
        _oText2.visible=false;
        _oText2.regX  = _oText2.getBounds().width/2;
        _oText2.regY  = _oText2.getBounds().height/2;
        _oText2.x = CANVAS_WIDTH/2 ;
        _oText2.y = (0);
         s_oStage.addChild(_oText2);
         
         if(bLoadBoxer){           
            _oEnemy= new CEnemy(CANVAS_WIDTH/2,1000);
            _oPlayer = new CPlayer(CANVAS_WIDTH/2,CANVAS_HEIGHT);
            bPlayerIsPunching=false;    
         }

        _oInterface = new CInterface();
        
        s_oInterface.setPlayerHp(_iPHp);
        s_oInterface.setPlayerStamina(_iPSt);    
        s_oInterface.setEnemyHp(_iEHp);

        this.changePlayerState(IDLE);
        
        s_oStageBg.update();        

        _oHelpPanel=new CHelpPanel();
        	
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                s_oSoundtrack.volume=0.3;
        }
        
        _bUpdate=true;
            
    };
    
    this._preloadPW = function(){ 
         s_oSpriteLibrary.init( this._onImagesLoaded,this._onAllImagesLoadedPW, this );
         ///////////BoxerWhitePlayer///////////
        for(var i=0;i<s_aBw_Frame[IDLE];i++){
             s_oSpriteLibrary.addSprite("bw_idle_"+i,"/games/boxing/sprites/bw_idle/bw_idle_"+i+".png");
        }
        
        for(var i=0;i<s_aBw_Frame[GUARD];i++){
             s_oSpriteLibrary.addSprite("bw_guard_"+i,"/games/boxing/sprites/bw_guard/bw_guard_"+i+".png");
        }
        
        for(var i=0;i<s_aBw_Frame[JAB];i++){
             s_oSpriteLibrary.addSprite("bw_jab_"+i,"/games/boxing/sprites/bw_jab/bw_jab_"+i+".png");
        }
        
        for(var i=0;i<s_aBw_Frame[HOOK_R];i++){
             s_oSpriteLibrary.addSprite("bw_hook_r_"+i,"/games/boxing/sprites/bw_hook_right/bw_hook_right_"+i+".png");
        }
        
        for(var i=0;i<s_aBw_Frame[HOOK_L];i++){
             s_oSpriteLibrary.addSprite("bw_hook_l_"+i,"/games/boxing/sprites/bw_hook_left/bw_hook_left_"+i+".png");
        }
        
        for(var i=0;i<s_aBw_Frame[UPPERCUT];i++){
             s_oSpriteLibrary.addSprite("bw_uppercut_"+i,"/games/boxing/sprites/bw_uppercut/bw_uppercut_"+i+".png");
        }
        
        for(var i=0;i<s_aBw_Frame[GETPUNCHED];i++){
             s_oSpriteLibrary.addSprite("bw_get_punched_"+i,"/games/boxing/sprites/bw_get_punched/bw_get_punched_"+i+".png");
        }
        
        for(var i=0;i<s_aBw_Frame[KO];i++){
             s_oSpriteLibrary.addSprite("bw_ko_"+i,"/games/boxing/sprites/bw_ko/bw_ko_"+i+".png");
        }
        /////////////////////////////////////
    
        ///////////BoxerBlackEnemy///////////
        
        for(var i=0;i<s_aBb_En_Frame[IDLE];i++){
             s_oSpriteLibrary.addSprite("bb_en_idle_"+i,"/games/boxing/sprites/bb_en_idle/bb_en_idle_"+i+".png");
        }
        
        for(var i=0;i<s_aBb_En_Frame[GUARD];i++){
             s_oSpriteLibrary.addSprite("bb_en_guard_"+i,"/games/boxing/sprites/bb_en_guard/bb_en_guard_"+i+".png");
        }
        
        for(var i=0;i<s_aBb_En_Frame[JAB];i++){
             s_oSpriteLibrary.addSprite("bb_en_jab_"+i,"/games/boxing/sprites/bb_en_jab/bb_en_jab_"+i+".png");
        }
        
        for(var i=0;i<s_aBb_En_Frame[HOOK_R];i++){
             s_oSpriteLibrary.addSprite("bb_en_hook_r_"+i,"/games/boxing/sprites/bb_en_hook_right/bb_en_hook_right_"+i+".png");
        }
        
        for(var i=0;i<s_aBb_En_Frame[HOOK_L];i++){
             s_oSpriteLibrary.addSprite("bb_en_hook_l_"+i,"/games/boxing/sprites/bb_en_hook_left/bb_en_hook_left_"+i+".png");
        }
        
        for(var i=0;i<s_aBb_En_Frame[UPPERCUT];i++){
             s_oSpriteLibrary.addSprite("bb_en_uppercut_"+i,"/games/boxing/sprites/bb_en_uppercut/bb_en_uppercut_"+i+".png");
        }
        
        for(var i=0;i<s_aBb_En_Frame[GETPUNCHED];i++){
             s_oSpriteLibrary.addSprite("bb_en_get_punched_"+i,"/games/boxing/sprites/bb_en_get_punched/bb_en_get_punched_"+i+".png");
        }
        
        for(var i=0;i<s_aBb_En_Frame[KO];i++){
             s_oSpriteLibrary.addSprite("bb_en_ko_"+i,"/games/boxing/sprites/bb_en_ko/bb_en_ko_"+i+".png");
        }
        
         ///////////../games/boxing///////////
        
        s_oSpriteLibrary.loadSprites();
    };
    
     this._preloadPB = function(){ 
         s_oSpriteLibrary.init( this._onImagesLoaded,this._onAllImagesLoadedPB, this );
         ///////////BoxerBlackPlayer///////////
        for(var i=0;i<s_aBb_Frame[IDLE];i++){
             s_oSpriteLibrary.addSprite("bb_idle_"+i,"/games/boxing/sprites/bb_idle/bb_idle_"+i+".png");
        }
        
        for(var i=0;i<s_aBb_Frame[GUARD];i++){
             s_oSpriteLibrary.addSprite("bb_guard_"+i,"/games/boxing/sprites/bb_guard/bb_guard_"+i+".png");
        }
        
        for(var i=0;i<s_aBb_Frame[JAB];i++){
             s_oSpriteLibrary.addSprite("bb_jab_"+i,"/games/boxing/sprites/bb_jab/bb_jab_"+i+".png");
        }
        
        for(var i=0;i<s_aBb_Frame[HOOK_R];i++){
             s_oSpriteLibrary.addSprite("bb_hook_r_"+i,"/games/boxing/sprites/bb_hook_right/bb_hook_right_"+i+".png");
        }
        
        for(var i=0;i<s_aBb_Frame[HOOK_L];i++){
             s_oSpriteLibrary.addSprite("bb_hook_l_"+i,"/games/boxing/sprites/bb_hook_left/bb_hook_left_"+i+".png");
        }
        
        for(var i=0;i<s_aBb_Frame[UPPERCUT];i++){
             s_oSpriteLibrary.addSprite("bb_uppercut_"+i,"/games/boxing/sprites/bb_uppercut/bb_uppercut_"+i+".png");
        }
        
        for(var i=0;i<s_aBb_Frame[GETPUNCHED];i++){
             s_oSpriteLibrary.addSprite("bb_get_punched_"+i,"/games/boxing/sprites/bb_get_punched/bb_get_punched_"+i+".png");
        }
        
        for(var i=0;i<s_aBb_Frame[KO];i++){
             s_oSpriteLibrary.addSprite("bb_ko_"+i,"/games/boxing/sprites/bb_ko/bb_ko_"+i+".png");
        }
        /////////////////////////////////////
    
        ///////////BoxerWhiteEnemy///////////
        
        for(var i=0;i<s_aBw_En_Frame[IDLE];i++){
             s_oSpriteLibrary.addSprite("bw_en_idle_"+i,"/games/boxing/sprites/bw_en_idle/bw_en_idle_"+i+".png");
        }
        
        for(var i=0;i<s_aBw_En_Frame[GUARD];i++){
             s_oSpriteLibrary.addSprite("bw_en_guard_"+i,"/games/boxing/sprites/bw_en_guard/bw_en_guard_"+i+".png");
        }
        
        for(var i=0;i<s_aBw_En_Frame[JAB];i++){
             s_oSpriteLibrary.addSprite("bw_en_jab_"+i,"/games/boxing/sprites/bw_en_jab/bw_en_jab_"+i+".png");
        }
        
        for(var i=0;i<s_aBw_En_Frame[HOOK_R];i++){
             s_oSpriteLibrary.addSprite("bw_en_hook_r_"+i,"/games/boxing/sprites/bw_en_hook_right/bw_en_hook_right_"+i+".png");
        }
        
        for(var i=0;i<s_aBw_En_Frame[HOOK_L];i++){
             s_oSpriteLibrary.addSprite("bw_en_hook_l_"+i,"/games/boxing/sprites/bw_en_hook_left/bw_en_hook_left_"+i+".png");
        }
        
        for(var i=0;i<s_aBw_En_Frame[UPPERCUT];i++){
             s_oSpriteLibrary.addSprite("bw_en_uppercut_"+i,"/games/boxing/sprites/bw_en_uppercut/bw_en_uppercut_"+i+".png");
        }
        
        for(var i=0;i<s_aBw_En_Frame[GETPUNCHED];i++){
             s_oSpriteLibrary.addSprite("bw_en_get_punched_"+i,"/games/boxing/sprites/bw_en_get_punched/bw_en_get_punched_"+i+".png");
        }
        
        for(var i=0;i<s_aBw_En_Frame[KO];i++){
             s_oSpriteLibrary.addSprite("bw_en_ko_"+i,"/games/boxing/sprites/bw_en_ko/bw_en_ko_"+i+".png");
        }
        
         ///////////../games/boxing///////////
        
        s_oSpriteLibrary.loadSprites();

        
    };
    
    this._onAllImagesLoadedPW = function(){
        s_bLoadedPlayerWhite=true;
        _oEnemy= new CEnemy(CANVAS_WIDTH/2,1000);
        _oPlayer = new CPlayer(CANVAS_WIDTH/2,CANVAS_HEIGHT);   
        _oVersusPanel.setIndex(_oPlayer.getMaxIndex());
        _bPlayAllAnimations=true;
      
        
    };
    
    this._onAllImagesLoadedPB = function(){    
        s_bLoadedPlayerBlack=true;
        _oEnemy= new CEnemy(CANVAS_WIDTH/2,1000);
        _oPlayer = new CPlayer(CANVAS_WIDTH/2,CANVAS_HEIGHT);
        _oVersusPanel.setIndex(_oPlayer.getMaxIndex());
        _bPlayAllAnimations=true;
        
    };
    
    this.onAllAnimPlayed =function(){
        if(_iAnimReady===1){  
            _bPlayAllAnimations=false;
            _oVersusPanel.unload();    
            this._init(false);
            _iAnimReady=0;
        }else{ 
          _iAnimReady++;
        }
    };
    
    this._onImagesLoaded = function(){
      
    };
    
    this._initHammer = function(){
       _oHammer = new Hammer(document.getElementById("canvas"));
       _oHammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
       _oHammer.get('swipe').set({ velocity: 0.005});
       _oHammer.get('swipe').set({ threshold: 0.1 });

       
       _oHammer.on("tap",function(e){
                            if(_iPSt>=STAMINA_PUNCH_LIMIT && !_bHelpPanelOpen){ 
                              if(_iPSt<=s_aSt_Decrese[JAB]){ 
                                  _bReduceDamage=true;
                              }       
                                if(s_oMultiplier<1){
                                    var _iY = (e.center.y/s_oMultiplier);

                                    if(_iY<iTouchLimit){
                                        _oParent._swipeControl("tap");
                                    }
                                }else{
                                    var _iY = (e.center.y*s_oMultiplier);

                                    if(_iY<iTouchLimit){
                                        _oParent._swipeControl("tap");
                                    }               
                                }
                            }


                           }
               );
       
       _oHammer.on("swipeleft",function(e){

                            if(_iPSt>=STAMINA_PUNCH_LIMIT && !_bHelpPanelOpen){
                              if(_iPSt<=s_aSt_Decrese[HOOK_R]){ 
                                 _bReduceDamage=true;
                              }
                                if(s_oMultiplier<1){
                                    var _iY = (e.center.y/s_oMultiplier);

                                    if(_iY<iTouchLimit){
                                        _oParent._swipeControl("left");
                                    }
                                }else{
                                    var _iY = (e.center.y*s_oMultiplier);

                                    if(_iY<iTouchLimit){
                                        _oParent._swipeControl("left");
                                    }               
                                }            
                            }
        
        });
       
       _oHammer.on("swiperight",function(e){
                            if(_iPSt>=STAMINA_PUNCH_LIMIT && !_bHelpPanelOpen){   
                             if(_iPSt<=s_aSt_Decrese[HOOK_L]){ 
                                _bReduceDamage=true;
                             }
                                if(s_oMultiplier<1){
                                    var _iY = (e.center.y/s_oMultiplier);

                                    if(_iY<iTouchLimit){
                                        _oParent._swipeControl("right");
                                    }
                                }else{
                                    var _iY = (e.center.y*s_oMultiplier);

                                    if(_iY<iTouchLimit){
                                        _oParent._swipeControl("right");
                                    }               
                                }                             
                            }

       });
       
       _oHammer.on("swipeup",function(e){
                            if(_iPSt>=STAMINA_PUNCH_LIMIT && !_bHelpPanelOpen){
                             if(_iPSt<=s_aSt_Decrese[UPPERCUT]){ 
                                 _bReduceDamage=true;
                             }  
                                if(s_oMultiplier<1){
                                    var _iY = (e.center.y/s_oMultiplier);

                                    if(_iY<iTouchLimit){
                                        _oParent._swipeControl("up");
                                    }
                                }else{
                                    var _iY = (e.center.y*s_oMultiplier);

                                    if(_iY<iTouchLimit){
                                        _oParent._swipeControl("up");
                                    }               
                                }
                           }

                           }
            );
       
    };
    
    this._swipeControl = function(szType){
     if(_bUpdate){   
        switch(szType) {
            case "left":{   
            if(!bPlayerBlocked && !_bKoP && !_bKoE){
                bPlayerBlocked=true;
                bPlayerIsPunching=true;
                _oPlayer.changeState("hook_r");
                s_oInterface.setGuardButVisibilty(false);
            }
                   
                
                break;
            }
            
            case "right":{
            if(!bPlayerBlocked && !_bKoP && !_bKoE){
                bPlayerBlocked=true;
                bPlayerIsPunching=true;
                _oPlayer.changeState("hook_l");
                s_oInterface.setGuardButVisibilty(false);
            }
            
                break;
            }
            
            case "up":{
            if(!bPlayerBlocked && !_bKoP && !_bKoE){
                bPlayerBlocked=true;
                bPlayerIsPunching=true;
                _oPlayer.changeState("uppercut");
                s_oInterface.setGuardButVisibilty(false);
            }
                    
                
                break;
            }
            
            case "tap":{
                    
            if(!bPlayerBlocked && !_bKoP && !_bKoE){
                bPlayerBlocked=true;
                bPlayerIsPunching=true;
                _oPlayer.changeState("jab");
                s_oInterface.setGuardButVisibilty(false);
            }
                    
                
                break;
            }
            
        }    

     }
    };  
    
    
    
    this.unload = function(){
        s_oStage.removeAllChildren();
        s_oStageBg.removeAllChildren();
	s_oStageInterface.removeAllChildren();
        s_oStageBg.update();
        s_oGame=null;    
		
	$("#canvas_interface").css("display","none");
    };
 
    this.onExit = function(){
        this.unload();
        s_oMain.gotoMenu();
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                _oCrowdIdle.stop();
        }

        $(s_oMain).trigger("restart");
    };
    
    this.onRestart = function(){
        this.unload();
        s_oMain.gotoGame();  
    };
    
    
    this.changePlayerState = function(szState){  
        _oPlayer.changeState(szState);
    };
    
    this.setTapLimit = function(iTouchY){  
        iTouchLimit=iTouchY;
    };
    
    /////player///
    this.getPBlocked = function(){  
        return bPlayerBlocked;
    };

    this.setPBlocked = function(bBlockedState){  
        bPlayerBlocked=bBlockedState;  
    };
    
    this.getPIsPunching = function(){  
        return bPlayerIsPunching;        
    };
    
    this.setPIsPunching = function(bPunchState){  
        bPlayerIsPunching=bPunchState;          
    };
    
    this.getPGuard = function(){  
        return bPlayerGuard;     
    };
    
    this.setPGuard = function(bGuardState){  
        bPlayerGuard=bGuardState;           
    };
    
    ////////////////////
    
    ////////enemy///////
    this.setEGuard = function(bGuardState){  
        bEnemyGuard=bGuardState;
    };
    
    this.getEGuard = function(){  
        return bEnemyGuard;
    };
    
    ////////////
    
    this.hitEnemy = function(iDamage){
        if(bEnemyGuard){
           _iEHp=_iEHp-1; 
           _iEKo=_iEKo-1;
           _oEnemy.moveGuard();
        }else{
            _oEnemy.changeState(GETPUNCHED);
            bPlayerBlocked=true;
             if(!_bReduceDamage){
                _iEHp=_iEHp-iDamage;
                _iEKo=_iEKo-iDamage;
             }else{
                _iEHp=_iEHp-(iDamage/2);
                _iEKo=_iEKo-(iDamage/2);

             }
       }
       s_oInterface.setEnemyHp(_iEHp);
       
       
        if(_iEHp<=0 || _iEKo<=1){
            _bKoE=true;      
            _oEnemy.changeState(KO);
            
            if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                createjs.Sound.play("crowd_exultance");
            }
        }
        _bReduceDamage=false;
         
    };
    
    this.hitPlayer = function(iDamage){
        if(bPlayerGuard){
            _iPSt= _iPSt-3;   
            _iPHp=_iPHp-1; 
            _oPlayer.moveGuard();
        }else{
             _iPSt= _iPSt-5;
             _iPHp=_iPHp-iDamage;
             if(_iPSt<10){
                  _iPKo=_iPKo-(iDamage*2);
             }else{
                  _iPKo=_iPKo-(iDamage);   
             }
             
             this.setPIsPunching(false);
             _oPlayer.changeState(GETPUNCHED);
             bPlayerBlocked=true;
        }
        s_oInterface.setPlayerHp(_iPHp);
       
        if(_iPHp<=0 || _iPKo<=1){  
           s_oInterface.setGuardButVisibilty(false);
           
           _bKoP=true;
           _oPlayer.changeState(KO);  
           
           if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                createjs.Sound.play("crowd_exultance");
            }
        }
         
         s_oInterface.setPlayerStamina(_iPSt);    
         _bReduceDamage=false; 
    };

    this.gamePause =function(){
         _bUpdate=false;
    };
    
    this.gameResume =function(){
         _bUpdate=true;
    };
    
    this.reduceStamina =function(iDamage){
         _iPSt-= iDamage;
         s_oInterface.setPlayerStamina(_iPSt);  
    };
    
    this.regenStamina =function(){
         _iPSt= _iPSt+ 1.5;
         s_oInterface.setPlayerStamina(_iPSt);
         _bIsRegStamina=false;
         
    };
    
    this.getKoP =function(){
         return _bKoP;  
    };
    
    this.getKoE =function(){
         return _bKoE;  
    };
    
    this.regenKoP =function(){
         _iPKo += 1;
         _bIsRegKoP=false;
    };
    
    this.regenKoE =function(){
         _iEKo += 1;
         _bIsRegKoE=false;
    };
    
    this.playParticle =function(iOffsetX,iOffsetY){
        if(!bEnemyGuard){
            _bPlayParticle=true;
            iOffsetParticleX=iOffsetX;
            iOffsetParticleY=iOffsetY;
        }
    };
    
    this.stopParticle =function(){
        _bPlayParticle=false;
    };

    this.playerKo=function(){  
        this.gamePause();  
        _oEnemy.setVisible(false);
        _oPlayer.setVisible(false);         
        s_oInterface.setGuardButVisibilty(false);
        s_oInterface.setEnergyVisibility(false);
        _oKoPPanel.visible=true;       
        _bKoCountdown=true;
        
        if(_iPHp>=PLAYER_MIN_HP_KO){
          _iWakeUpTime= Math.floor((Math.random() * 8) + 3);
            if(_iPHp<=PLAYER_KO){
              _iPKo=_iPHp;              
            }else{
               _iPKo=PLAYER_KO;
            }
        }else{
            _iWakeUpTime=100;
        }
        
    };
    
    this.enemyKo=function(){  
        this.gamePause(); 
        _oPlayer.setVisible(false);
        _oEnemy.setVisible(false);
        s_oInterface.setGuardButVisibilty(false);
        s_oInterface.setEnergyVisibility(false);
        _oKoEPanel.visible=true;
        _bKoCountdown=true;
        
          
        if(_iEHp>=ENEMY_MIN_HP_KO){
          _iWakeUpTime= Math.floor((Math.random() * 8) + 3);
          if(_iEHp<=ENEMY_KO){
              _iEKo=_iEHp;              
          }else{
              _iEKo=ENEMY_KO;
          }
        }else{            
          _iWakeUpTime=100;
        }
        
    };
    
    this._wakeUp = function(){
        _oPlayer.changeState(IDLE);
        _oEnemy.changeState(IDLE);
        bPlayerIsPunching=false;
        bPlayerBlocked=false;
        _oKoPPanel.visible=false; 
        _oKoEPanel.visible=false;
        _oKoPPanelWake.visible=false; 
        _oKoEPanelWake.visible=false;
        s_oInterface.setGuardButVisibilty(true);
        s_oInterface.setEnergyVisibility(true);
        _bKoP=false;
        _bKoE=false;
        _oEnemy.setVisible(true);
        _oEnemy.setIsActing(false);
        _oPlayer.setVisible(true);                     
        this.gameResume();
        _oText1.visible=false;
        _iCountdown=0;
    };
    
    this.closeHelpPanel=function(){  
        _oHelpPanel.unload();
        _bHelpPanelOpen=false;
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            s_oSoundtrack.stop();
            _oCrowdIdle=createjs.Sound.play("crowd_idle",{loop:-1});
            createjs.Sound.play("start_match");
        }
		
        s_oGame._initHammer();
                
	$("#canvas_interface").css("display","block");
    };
    
    this.update = function(){
        if(_bPlayAllAnimations){
            _oPlayer.playAllAnim();
            _oEnemy.playAllAnim();
            
        }
        
        if(_bUpdate && !_bHelpPanelOpen){
           _iTimeElaps += s_iTimeElaps;
             
           if(_iTimeElaps>STAMINA_REGEN_TIME){  
             if((!bPlayerIsPunching && _iPSt <100) && !_bIsRegStamina ){  
                _iTimeElaps=0;
                _bIsRegStamina=true;
                this.regenStamina();
             }
           }
           
            _iTimeElaps2 += s_iTimeElaps;
             
           if(_iTimeElaps2>KO_REGEN_TIME){ 
               
             if(_iPKo <PLAYER_KO && _iPKo >0 && !_bIsRegKoP){  
                _iTimeElaps2=0;
                _bIsRegKoP=true;
                this.regenKoP();
             }
             
             if(_iEKo <ENEMY_KO & _iPKo >0 && !_bIsRegKoE){  
                _iTimeElaps2=0;
                _bIsRegKoE=true;
                this.regenKoE();
             }
             
           }
        
            _oPlayer.update();
            _oEnemy.update();   
            
            if(_bPlayParticle){
                _oInterface.playParticle(iOffsetParticleX,iOffsetParticleY);
            }
        }
        
        
        if(_bKoCountdown){
            
            _iTimeKo+= s_iTimeElaps;
             if(_iTimeKo>1000){
                _iTimeKo=0;
                _iCountdown+=1;
                
                 if(_iCountdown <=10){
                     _oText1.visible=true;
                    _oText1.text=""+_iCountdown;
                                       
                    if(_iCountdown===_iWakeUpTime){  
                        _bKoCountdown=false; 
                        _oText1.visible=false;
                        _oText2.visible=true;
                        
                        if(_bKoP){
                            _oKoPPanelWake.visible=true; 
                            createjs.Tween.get(_oKoPPanelWake).to({alpha:1}, 500);
                        }else{
                            _oKoEPanelWake.visible=true;
                            createjs.Tween.get(_oKoEPanelWake).to({alpha:1}, 500);
                        }
                        createjs.Tween.get(_oText2).to({y:CANVAS_HEIGHT/2}, 300);
                        
                        setTimeout(function(){createjs.Tween.get(_oText2).to({y:0}, 300).
                            call(function(){_oParent._wakeUp(),_oText2.visible=true;});},2000);
                     
                        
                    }
                    if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                        if(_iCountdown!==_iWakeUpTime && _iCountdown<10){
                            createjs.Sound.play(""+_iCountdown);   
                        }
 
                    }
                    
                 }else{
                    if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){ 
                        createjs.Sound.play("ko");
                    }
                    s_oInterface.setKoButVisibility(true);
                    _bKoCountdown = false; 
                    _oText1.visible=false;
                    if(_bKoP){
                        _oKoPText.scaleX = _oKoPText.scaleY = 3;
                        _oKoPText.alpha = 0.6;
                        _oKoPText.visible=true;
                        createjs.Tween.get(_oKoPText).to({scaleX:1,scaleY:1,alpha:1},400,createjs.Ease.elasticOut).call(function(){});
                    }else{
                        _oKoEText.scaleX = _oKoPText.scaleY = 3;
                        _oKoEText.alpha = 0.6;
                        _oKoEText.visible=true;
                        createjs.Tween.get(_oKoEText).to({scaleX:1,scaleY:1,alpha:1},400,createjs.Ease.elasticOut).call(function(){});
                    }           
                  
                  }                 
                  
             }
            
            
        }
        
        
    };

    
    ENEMY_ATTACK_OCCURR = oData.enemy_attack_occurr;
    ENEMY_MIN_ACTION_TIME = oData.enemy_min_action_time;
    ENEMY_MAX_ACTION_TIME = oData.enemy_max_action_time;
    ENEMY_MIN_GUARD_TIME = oData.enemy_min_guard_time;
    ENEMY_MAX_GUARD_TIME = oData.enemy_max_guard_time;
    ENEMY_HP = oData.enemy_hp;
    PLAYER_HP = oData.player_hp;
    PLAYER_STAMINA = oData.player_stamina;
    STAMINA_PUNCH_LIMIT = oData.stamina_punch_limit;
    s_oGame=this;
    
    _oParent=this;
    
    if(s_iPlayerSelected===0) {
         if(s_bLoadedPlayerWhite){
             this._init(true);
         }else{
        
            _oVersusPanel=new CVersusPanel();
            this._preloadPW();
         }
    }else{
        if(s_bLoadedPlayerBlack){
            this._init(true);
        }else{
           _oVersusPanel=new CVersusPanel(); 
            this._preloadPB(); 
        }
    }
}
var s_oEndPanel;
var s_oGame;
