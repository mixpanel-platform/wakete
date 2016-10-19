
function CPlayer(iX,iY){
    var _iContDelay = 1;
    var _iFrame=1;
    var _iMaxIndex;
    var _szPlayerState="idle";
    var _oParent;
    var _oPlayerContainer;
    var _aIdle;
    var _aGuard;
    var _aJab;
    var _aHook_R;
    var _aHook_L;
    var _aUppercut;
    var _aGetPunched;
    var _aKo;  
    
    this._init = function(iX,iY){
        
        
        _oPlayerContainer = new CContainer(iX,iY);     

        if(s_iPlayerSelected=== 0){
              _aIdle = new Array();
            var tag;

            for (var i=0; i<s_aBw_Frame[IDLE]; i++){
                tag = 'bw_idle_'+i;
                var oSprite = s_oSpriteLibrary.getSprite(tag);
                var _oChild =createBitmap(oSprite);
                _aIdle[i] = new CChild(0,0,_oChild,_oPlayerContainer);
                _aIdle[i].setVisible(false); 
                _aIdle[i].setRegX(oSprite.width/2);
                _aIdle[i].setRegY(oSprite.height);

              _oPlayerContainer.addChild(_aIdle[i]);

            }
             _aIdle[0].setVisible(true);


            /////////

            //Jab//
            _aJab = new Array();
            var tag;
            for (var i=0; i<s_aBw_Frame[JAB]; i++){
                tag = 'bw_jab_'+i;
                var oSprite = s_oSpriteLibrary.getSprite(tag);
                var _oChild =createBitmap(oSprite);
                _aJab[i] = new CChild(0,0,_oChild,_oPlayerContainer);
                _aJab[i].setVisible(false); 
                _aJab[i].setRegX(oSprite.width/2);
                _aJab[i].setRegY(oSprite.height);

              _oPlayerContainer.addChild(_aJab[i]);

            }

            /////////

             //Hook_r//
           _aHook_R = new Array();
            var tag;
            for (var i=0; i<s_aBw_Frame[HOOK_R]; i++){
                tag = 'bw_hook_r_'+i;
                var oSprite = s_oSpriteLibrary.getSprite(tag);
                var _oChild =createBitmap(oSprite);
                _aHook_R[i] = new CChild(0,0,_oChild,_oPlayerContainer);
                _aHook_R[i].setVisible(false); 
                _aHook_R[i].setRegX(oSprite.width/2);
                _aHook_R[i].setRegY(oSprite.height);

              _oPlayerContainer.addChild(_aHook_R[i]);

            }
            /////////

             //Hook_L//
            _aHook_L = new Array();
            var tag;
            for (var i=0; i<s_aBw_Frame[HOOK_L]; i++){
                tag = 'bw_hook_l_'+i;
                var oSprite = s_oSpriteLibrary.getSprite(tag);
                var _oChild =createBitmap(oSprite);
                _aHook_L[i] = new CChild(0,0,_oChild,_oPlayerContainer);
                _aHook_L[i].setVisible(false); 
                _aHook_L[i].setRegX(oSprite.width/2);
                _aHook_L[i].setRegY(oSprite.height);

              _oPlayerContainer.addChild(_aHook_L[i]);

            }
            /////////

            //Uppercut//
            _aUppercut = new Array();
            var tag;
            for (var i=0; i<s_aBw_Frame[UPPERCUT]; i++){
                tag = 'bw_uppercut_'+i;
                var oSprite = s_oSpriteLibrary.getSprite(tag);
                var _oChild =createBitmap(oSprite);
                _aUppercut[i] = new CChild(0,0,_oChild,_oPlayerContainer);
                _aUppercut[i].setVisible(false); 
                _aUppercut[i].setRegX(oSprite.width/2);
                _aUppercut[i].setRegY(oSprite.height);

              _oPlayerContainer.addChild(_aUppercut[i]);

            }
            /////////

            //GetPunched//
            _aGetPunched = new Array();
            var tag;
            for (var i=0; i<s_aBw_Frame[GETPUNCHED]; i++){
                tag = 'bw_get_punched_'+i;
                var oSprite = s_oSpriteLibrary.getSprite(tag);
                var _oChild =createBitmap(oSprite);
                _aGetPunched[i] = new CChild(0,0,_oChild,_oPlayerContainer);
                _aGetPunched[i].setVisible(false); 
                _aGetPunched[i].setRegX(oSprite.width/2);
                _aGetPunched[i].setRegY(oSprite.height);

              _oPlayerContainer.addChild(_aGetPunched[i]);

            }
            /////////

            //KO/
            _aKo = new Array();
            var tag;
            for (var i=0; i<s_aBw_Frame[KO]; i++){
                tag = 'bw_ko_'+i;
                var oSprite = s_oSpriteLibrary.getSprite(tag);
                var _oChild =createBitmap(oSprite);
                _aKo[i] = new CChild(0,0,_oChild,_oPlayerContainer);
                _aKo[i].setVisible(false); 
                _aKo[i].setRegX(oSprite.width/2);
                _aKo[i].setRegY(oSprite.height);

              _oPlayerContainer.addChild(_aKo[i]);

            }
            /////////

             //player_guard//

           _aGuard = new Array();
            var tag;
            for (var i=0; i<s_aBw_Frame[GUARD]; i++){
                tag = 'bw_guard_'+i;
                var oSprite = s_oSpriteLibrary.getSprite(tag);
                var _oChild =createBitmap(oSprite);
                _aGuard[i] = new CChild(0,0,_oChild,_oPlayerContainer);
                _aGuard[i].setVisible(false); 
                _aGuard[i].setRegX(oSprite.width/2);
                _aGuard[i].setRegY(oSprite.height);

              _oPlayerContainer.addChild(_aGuard[i]);

            }



        }else{
             _aIdle = new Array();
            var tag;

            for (var i=0; i<s_aBb_Frame[IDLE]; i++){
                tag = 'bb_idle_'+i;
                var oSprite = s_oSpriteLibrary.getSprite(tag);
                var _oChild =createBitmap(oSprite);
                _aIdle[i] = new CChild(0,0,_oChild,_oPlayerContainer);
                _aIdle[i].setVisible(false); 
                _aIdle[i].setRegX(oSprite.width/2);
                _aIdle[i].setRegY(oSprite.height);

              _oPlayerContainer.addChild(_aIdle[i]);

            }
             _aIdle[0].setVisible(true);


            /////////

            //Jab//
              _aJab = new Array();
            var tag;
            for (var i=0; i<s_aBb_Frame[JAB]; i++){
                tag = 'bb_jab_'+i;
                var oSprite = s_oSpriteLibrary.getSprite(tag);
                var _oChild =createBitmap(oSprite);
                _aJab[i] = new CChild(0,0,_oChild,_oPlayerContainer);
                _aJab[i].setVisible(false); 
                _aJab[i].setRegX(oSprite.width/2);
                _aJab[i].setRegY(oSprite.height);

              _oPlayerContainer.addChild(_aJab[i]);

            }

            /////////

             //Hook_r//
           _aHook_R = new Array();
            var tag;
            for (var i=0; i<s_aBb_Frame[HOOK_R]; i++){
                tag = 'bb_hook_r_'+i;
                var oSprite = s_oSpriteLibrary.getSprite(tag);
                var _oChild =createBitmap(oSprite);
                _aHook_R[i] = new CChild(0,0,_oChild,_oPlayerContainer);
                _aHook_R[i].setVisible(false); 
                _aHook_R[i].setRegX(oSprite.width/2);
                _aHook_R[i].setRegY(oSprite.height);

              _oPlayerContainer.addChild(_aHook_R[i]);

            }
            /////////

             //Hook_L//
            _aHook_L = new Array();
            var tag;
            for (var i=0; i<s_aBb_Frame[HOOK_L]; i++){
                tag = 'bb_hook_l_'+i;
                var oSprite = s_oSpriteLibrary.getSprite(tag);
                var _oChild =createBitmap(oSprite);
                _aHook_L[i] = new CChild(0,0,_oChild,_oPlayerContainer);
                _aHook_L[i].setVisible(false); 
                _aHook_L[i].setRegX(oSprite.width/2);
                _aHook_L[i].setRegY(oSprite.height);

              _oPlayerContainer.addChild(_aHook_L[i]);

            }
            /////////

            //Uppercut//
            _aUppercut = new Array();
            var tag;
            for (var i=0; i<s_aBb_Frame[UPPERCUT]; i++){
                tag = 'bb_uppercut_'+i;
                var oSprite = s_oSpriteLibrary.getSprite(tag);
                var _oChild =createBitmap(oSprite);
                _aUppercut[i] = new CChild(0,0,_oChild,_oPlayerContainer);
                _aUppercut[i].setVisible(false); 
                _aUppercut[i].setRegX(oSprite.width/2);
                _aUppercut[i].setRegY(oSprite.height);

              _oPlayerContainer.addChild(_aUppercut[i]);

            }
            /////////

            //GetPunched//
            _aGetPunched = new Array();
            var tag;
            for (var i=0; i<s_aBb_Frame[GETPUNCHED]; i++){
                tag = 'bb_get_punched_'+i;
                var oSprite = s_oSpriteLibrary.getSprite(tag);
                var _oChild =createBitmap(oSprite);
                _aGetPunched[i] = new CChild(0,0,_oChild,_oPlayerContainer);
                _aGetPunched[i].setVisible(false); 
                _aGetPunched[i].setRegX(oSprite.width/2);
                _aGetPunched[i].setRegY(oSprite.height);

              _oPlayerContainer.addChild(_aGetPunched[i]);

            }
            /////////

            //KO/
            _aKo = new Array();
            var tag;
            for (var i=0; i<s_aBb_Frame[KO]; i++){
                tag = 'bb_ko_'+i;
                var oSprite = s_oSpriteLibrary.getSprite(tag);
                var _oChild =createBitmap(oSprite);
                _aKo[i] = new CChild(0,0,_oChild,_oPlayerContainer);
                _aKo[i].setVisible(false); 
                _aKo[i].setRegX(oSprite.width/2);
                _aKo[i].setRegY(oSprite.height);

              _oPlayerContainer.addChild(_aKo[i]);

            }
            /////////

             //player_guard//

           _aGuard = new Array();
            var tag;
            for (var i=0; i<s_aBb_Frame[GUARD]; i++){
                tag = 'bb_guard_'+i;
                var oSprite = s_oSpriteLibrary.getSprite(tag);
                var _oChild =createBitmap(oSprite);
                _aGuard[i] = new CChild(0,0,_oChild,_oPlayerContainer);
                _aGuard[i].setVisible(false); 
                _aGuard[i].setRegX(oSprite.width/2);
                _aGuard[i].setRegY(oSprite.height);

              _oPlayerContainer.addChild(_aGuard[i]);

            }

        }
        _iMaxIndex =s_oStage.getChildIndex(_oChild);
        
    };

    this._onJabHit=function(){
           s_oGame.hitEnemy(s_aDamage[JAB]); 
    };
    
    this._onHookRHit=function(){
           s_oGame.hitEnemy(s_aDamage[HOOK_R]);  
    };
    
    this._onHookLHit=function(){
           s_oGame.hitEnemy(s_aDamage[HOOK_L]); 
    };
    
    this._onUppercutHit=function(){
        s_oGame.hitEnemy(s_aDamage[UPPERCUT]);
     };
        
    
    this._animIdle=function(){
        if(_iFrame===0){            

            _aIdle[8].setVisible(false);
            _aIdle[0].setVisible(true);                
        } else {
            _aIdle[_iFrame-1].setVisible(false);
            _aIdle[_iFrame].setVisible(true);

        }       

        _iFrame++;
        if(_iFrame>s_aBw_Frame[IDLE]-1){
            _iFrame=0;
        };
        
           
    };
    
    this._animGuard=function(){
        if(_iFrame===0){            
            _aGuard[9].setVisible(false);
            _aGuard[0].setVisible(true);                
        } else {
            _aGuard[_iFrame-1].setVisible(false);
            _aGuard[_iFrame].setVisible(true);

        }       

        _iFrame++;
        if(_iFrame>s_aBw_Frame[GUARD]-1){
            _iFrame=0;
        };     
    };
    
    this._animJab=function(){
        if(_iFrame===0){
            _aJab[0].setVisible(true);                
        } else {
            _aJab[_iFrame-1].setVisible(false);
            _aJab[_iFrame].setVisible(true);

        } 
        if(_iFrame === s_aFrameHit[JAB]){
            s_oGame.playParticle(PARTICLE_OFFSET_PLAYER[JAB].xp,PARTICLE_OFFSET_PLAYER[JAB].yp);
            this._onJabHit();
            
            if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                if(s_oGame.getEGuard()===false){ 
                    createjs.Sound.play("punch_left");
                }
            } 
 
        }
        if(_iFrame===2){
            s_oGame.reduceStamina(s_aSt_Decrese[JAB]);
        }

        _iFrame++;
        if(_iFrame>s_aBw_Frame[JAB]-1){
            _aIdle[0].setVisible(true);
            this.changeState("idle");
            s_oGame.setPBlocked(false);
            s_oGame.setPIsPunching(false);
            s_oInterface.setGuardButVisibilty(true);   
        };
   
    };
    
    this._animHookR=function(){
        if(_iFrame===0){
            _aHook_R[0].setVisible(true);                
        } else {
            _aHook_R[_iFrame-1].setVisible(false);
            _aHook_R[_iFrame].setVisible(true);

        }     
        if(_iFrame === s_aFrameHit[HOOK_R]){
            s_oGame.playParticle(PARTICLE_OFFSET_PLAYER[HOOK_R].xp,PARTICLE_OFFSET_PLAYER[HOOK_R].yp);
            this._onHookRHit();
            if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                if(s_oGame.getEGuard()===false){  
                    createjs.Sound.play("punch_right");
                }
            } 
        }
        if(_iFrame===2){
            s_oGame.reduceStamina(s_aSt_Decrese[HOOK_R]);
        }

        _iFrame++;
        if(_iFrame>s_aBw_Frame[HOOK_R]-1){
            
                     _aIdle[0].setVisible(true);
                     this.changeState("idle");
                     s_oGame.setPBlocked(false);
                     s_oGame.setPIsPunching(false);
                     s_oInterface.setGuardButVisibilty(true);
            
        };
    }; 
    
    this._animHookL=function(){
        
        if(_iFrame===0){            
            _aHook_L[0].setVisible(true);                
        } else {
            _aHook_L[_iFrame-1].setVisible(false);
            _aHook_L[_iFrame].setVisible(true);

        }       
        if(_iFrame === s_aFrameHit[HOOK_L]){
            s_oGame.playParticle(PARTICLE_OFFSET_PLAYER[HOOK_L].xp,PARTICLE_OFFSET_PLAYER[HOOK_L].yp);
            this._onHookLHit();
            if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                if(s_oGame.getEGuard()===false){  
                  createjs.Sound.play("punch_left");
                }
            } 
        }
        if(_iFrame===2){
           s_oGame.reduceStamina(s_aSt_Decrese[HOOK_L]);
        }

        _iFrame++;
        if(_iFrame>s_aBw_Frame[HOOK_L]-1){  
            _aIdle[0].setVisible(true);
            this.changeState("idle");
            s_oGame.setPBlocked(false);
            s_oGame.setPIsPunching(false);
            s_oInterface.setGuardButVisibilty(true);  
        };    
    }; 
    
     this._animUppercut=function(){
        if(_iFrame===0){ 
            _aUppercut[0].setVisible(true);                
        } else {
            _aUppercut[_iFrame-1].setVisible(false);
            _aUppercut[_iFrame].setVisible(true);

        }       
        if(_iFrame === s_aFrameHit[UPPERCUT]){
            s_oGame.playParticle(PARTICLE_OFFSET_PLAYER[UPPERCUT].xp,PARTICLE_OFFSET_PLAYER[UPPERCUT].yp);    
            this._onUppercutHit();
             if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                if(s_oGame.getEGuard()===false){ 
                    createjs.Sound.play("uppercut");       
                }
            } 
        }
        
        if(_iFrame===2){
            s_oGame.reduceStamina(s_aSt_Decrese[UPPERCUT]);
        }
        
        _iFrame++;
        if(_iFrame>s_aBw_Frame[UPPERCUT]-1){
            _aIdle[0].setVisible(true);
            this.changeState("idle");
            s_oGame.setPBlocked(false);
            s_oGame.setPIsPunching(false);
            s_oInterface.setGuardButVisibilty(true);
        }; 
    };
    
    this._animGetPunched=function(){
        if(_iFrame===0){            
            _aGetPunched[0].setVisible(true);                
        } else {
            _aGetPunched[_iFrame-1].setVisible(false);
            _aGetPunched[_iFrame].setVisible(true);

        }       
        
        _iFrame++;
        if(_iFrame>s_aBw_Frame[GETPUNCHED]-1){
            _aIdle[0].setVisible(true);
            this.changeState("idle");
            s_oGame.setPBlocked(false);
            s_oInterface.setGuardButVisibilty(true);
        };
        
           
    };
    
    this._animKo=function(){
        if(_iFrame===0){     
            s_oInterface.setGuardButVisibilty(false);  
            _aKo[0].setVisible(true);                
        } else {
            _aKo[_iFrame-1].setVisible(false);
            _aKo[_iFrame].setVisible(true);

        }       
        if(_iFrame===8){
            if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                createjs.Sound.play("falling");
            }
        }
        _iFrame++;
        if(_iFrame>s_aBw_Frame[KO]-1){
            s_oGame.playerKo();
        };
   
    };
    
    
    this.changeState=function(szState){
	if(szState === GUARD){
            _aGuard[0].setVisible(true);
        }
		
        if(szState === "get_punched"){
            _aGetPunched[0].setVisible(true);
        }
        
         if(szState === "ko"){
            _aKo[0].setVisible(true);
        }
		
        if(szState === IDLE){
                _aIdle[0].setVisible(true);
        }

        switch(_szPlayerState){
            case IDLE:
                for(var i=0;i<s_aBw_Frame[IDLE];i++){
                    _aIdle[i].setVisible(false);

                }
                _iContDelay=1;

            break;

            case GUARD:
               for(var i=0;i<s_aBw_Frame[GUARD];i++){
                    _aGuard[i].setVisible(false);

                }
                _iContDelay=1;

            break;

            case JAB:
               for(var i=0;i<s_aBw_Frame[JAB];i++){
                    _aJab[i].setVisible(false);

                }
                _iContDelay=1;

            break;

            case HOOK_R:
               for(var i=0;i<s_aBw_Frame[HOOK_R];i++){
                    _aHook_R[i].setVisible(false);

                }
                _iContDelay=1;

            break;

            case HOOK_L:
               for(var i=0;i<s_aBw_Frame[HOOK_L];i++){
                    _aHook_L[i].setVisible(false);

                }
                _iContDelay=1;

            break;

            case UPPERCUT:
               for(var i=0;i<s_aBw_Frame[UPPERCUT];i++){
                    _aUppercut[i].setVisible(false);

                }
                _iContDelay=1;

            break;

            case GETPUNCHED:
               for(var i=0;i<s_aBw_Frame[GETPUNCHED];i++){
                    _aGetPunched[i].setVisible(false);

                }
                _iContDelay=1;

            break;

            case KO:
               for(var i=0;i<s_aBw_Frame[KO];i++){
                    _aKo[i].setVisible(false);

                }
                _iContDelay=1;

            break;
        }
        _szPlayerState=szState;
        
        _iFrame=0; 
    };

    this.moveGuard=function(){
          _oPlayerContainer.setTween({y:_oPlayerContainer.getY()+30}, 100, function() { _oPlayerContainer.setTween({y:_oPlayerContainer.getY()-30}, 100);});
    };
    
    this.setVisible=function(bVisible){
      _oPlayerContainer.setVisible(bVisible);  
    };
    
    this.getMaxIndex=function(){
      return _iMaxIndex; 
    };
    this.playAllAnim=function(){
         switch(_szPlayerState){
             
                case IDLE:
                    if(_iFrame<s_aBw_Frame[IDLE]-1){                           
                            if(_iFrame===0){                               
                                _aIdle[0].setVisible(true);                
                            } else {
                                _aIdle[_iFrame-1].setVisible(false);
                                _aIdle[_iFrame].setVisible(true);

                            }       

                            _iFrame++;

                    }else{
                            _iFrame=0;
                            this.changeState(GUARD);
                    }
                break;
               
               
                case GUARD:
                    if(_iFrame<s_aBw_Frame[GUARD]-1){                           
                            if(_iFrame===0){                               
                                    _aGuard[0].setVisible(true);                
                            }else{
                                    _aGuard[_iFrame-1].setVisible(false);
                                    _aGuard[_iFrame].setVisible(true);

                            }       
                                _iFrame++;

                    }else{
                                _iFrame=0;
                                this.changeState(JAB);
                    }               
                break;
               
               
                case JAB:
                    if(_iFrame<s_aBw_Frame[JAB]-1){                           
                            if(_iFrame===0){                               
                                    _aJab[0].setVisible(true);                
                            }else{
                                    _aJab[_iFrame-1].setVisible(false);
                                    _aJab[_iFrame].setVisible(true);

                            }       
                                _iFrame++;

                    }else{
                                _iFrame=0;
                                this.changeState(HOOK_R);
                    }                
                break;
     
            
               case HOOK_R:
                    if(_iFrame<s_aBw_Frame[HOOK_R]-1){                           
                            if(_iFrame===0){                               
                                    _aHook_R[0].setVisible(true);                
                            }else{
                                    _aHook_R[_iFrame-1].setVisible(false);
                                    _aHook_R[_iFrame].setVisible(true);

                            }       
                                _iFrame++;

                    }else{
                                _iFrame=0;
                                this.changeState(HOOK_L);
                    }
               break;
               
               case HOOK_L:
                    if(_iFrame<s_aBw_Frame[HOOK_L]-1){                           
                            if(_iFrame===0){                               
                                    _aHook_L[0].setVisible(true);                
                            }else{
                                    _aHook_L[_iFrame-1].setVisible(false);
                                    _aHook_L[_iFrame].setVisible(true);

                            }       
                                _iFrame++;

                    }else{
                                _iFrame=0;
                                this.changeState(UPPERCUT);
                    }
               break;
               
               
                case UPPERCUT:
                    if(_iFrame<s_aBw_Frame[UPPERCUT]-1){                           
                            if(_iFrame===0){                               
                                    _aUppercut[0].setVisible(true);                
                            }else{
                                    _aUppercut[_iFrame-1].setVisible(false);
                                    _aUppercut[_iFrame].setVisible(true);

                            }       
                                _iFrame++;

                    }else{
                                _iFrame=0;
                                this.changeState(GETPUNCHED);
                    }
                break;
               
               
               case GETPUNCHED:
                    if(_iFrame<s_aBw_Frame[GETPUNCHED]-1){                           
                            if(_iFrame===0){                               
                                    _aGetPunched[0].setVisible(true);                
                            }else{
                                    _aGetPunched[_iFrame-1].setVisible(false);
                                    _aGetPunched[_iFrame].setVisible(true);

                            }       
                                _iFrame++;

                    }else{
                                _iFrame=0;
                                this.changeState(KO);
                    }
               break;
               
               
               case KO:
                    if(_iFrame<s_aBw_Frame[KO]-1){                           
                            if(_iFrame===0){                               
                                    _aKo[0].setVisible(true);                
                            }else{
                                    _aKo[_iFrame-1].setVisible(false);
                                    _aKo[_iFrame].setVisible(true);

                            }       
                                _iFrame++;

                    }else{
                                s_oGame.onAllAnimPlayed();
                                this.changeState(IDLE);
                    }
               break;
               
           
           }
        
        
    };

    
    this.update=function(){
        
           switch(_szPlayerState){
               case IDLE:
                    if(_iContDelay === IDLE_DELAY && !s_oGame.getKoE()){
                            _iContDelay = 0;
                            this._animIdle();
                        }else{
                            _iContDelay++;
                        }
               break;
               
                case GUARD:
                    if(_iContDelay === IDLE_DELAY){
                            _iContDelay = 0;
                            this._animGuard();
                        }else{
                            _iContDelay++;
                        }
               break;
               
                case JAB:
                    if(_iContDelay === IDLE_DELAY && !s_oGame.getKoE()){
                        
                            _iContDelay = 0;
                            this._animJab();
                        }else{
                            _iContDelay++;
                        }
               break;
               
               case HOOK_R:
                    if(_iContDelay === IDLE_DELAY && !s_oGame.getKoE()){
                        
                            _iContDelay = 0;
                            this._animHookR();
                        }else{
                            _iContDelay++;
                        }
               break;
               
               case HOOK_L:
                    if(_iContDelay === IDLE_DELAY && !s_oGame.getKoE()){
                        
                            _iContDelay = 0;
                            this._animHookL();
                        }else{
                            _iContDelay++;
                        }
               break;
                case UPPERCUT:
                    if(_iContDelay === IDLE_DELAY&& !s_oGame.getKoE()){
                        
                            _iContDelay = 0;
                            this._animUppercut();
                        }else{
                            _iContDelay++;
                        }
               break;
               
               case GETPUNCHED:
                    if(_iContDelay === IDLE_DELAY && PLAYER_KO>0 && !s_oGame.getKoE()){
                        
                            _iContDelay = 0;
                            this._animGetPunched();
                        }else{
                            _iContDelay++;
                        }
               break;
               
               case KO:
                    if(_iContDelay === IDLE_DELAY){
                        
                            _iContDelay = 0;
                            this._animKo();
                        }else{
                            _iContDelay++;
                        }
               break;
               
           
           }
           
           _oParent=this;
          
    };
    
    
    this._init(iX,iY);
}