function CEnemy(iX,iY){
    
    var bIsActing=false;
    var _iContDelay = 1;
    var _iCurActionTime;
    var _iTimeElaps=0;
    var _iFrame=1;
    var _szPlayerState="idle";
    var _oEnemyContainer;
    var _oParent;
    var _aIdle;
    var _aGuard;
    var _aJab;
    var _aHook_R;
    var _aHook_L;
    var _aUppercut;
    var _aGetPunched;
    var _aKo;
    var _aCombo=["jab","jab","hook_l","hook_r","uppercut"];
   
    this._init = function(iX,iY){
        
        _oEnemyContainer = new CContainer(iX,iY);
        
        
    if(s_iPlayerSelected=== 0){
        
        _aIdle = new Array();
        var tag;
        
        for (var i=0; i<s_aBb_En_Frame[IDLE]; i++){
            tag = 'bb_en_idle_'+i;
            var oSprite = s_oSpriteLibrary.getSprite(tag);
            var _oChild =createBitmap(oSprite);
            _aIdle[i] = new CChild(0,0,_oChild,_oEnemyContainer);
            _aIdle[i].setVisible(false); 
            _aIdle[i].setRegX (oSprite.width/2);
            _aIdle[i].setRegY(oSprite.height);
            _oEnemyContainer.addChild(_aIdle[i]);
            
        }
         _aIdle[0].setVisible(true);

        
        /////////
        
        //Jab//
          _aJab = new Array();
        var tag;
        for (var i=0; i<s_aBb_En_Frame[JAB]; i++){
            tag = 'bb_en_jab_'+i;
            var oSprite = s_oSpriteLibrary.getSprite(tag);
            var _oChild =createBitmap(oSprite);
            _aJab[i] = new CChild(0,0,_oChild,_oEnemyContainer);
            _aJab[i].setVisible(false); 
            _aJab[i].setRegX(oSprite.width/2+ANIMATION_OFFSET_ENEMY[JAB].xb);
            _aJab[i].setRegY(oSprite.height+ANIMATION_OFFSET_ENEMY[JAB].yb);
            _oEnemyContainer.addChild(_aJab[i]);
            
        }
         
        
         //Hook_r//
       _aHook_R = new Array();
        var tag;
        for (var i=0; i<s_aBb_En_Frame[HOOK_R]; i++){
            tag = 'bb_en_hook_r_'+i;
           var oSprite = s_oSpriteLibrary.getSprite(tag);
            var _oChild =createBitmap(oSprite);
            _aHook_R[i] = new CChild(0,0,_oChild,_oEnemyContainer);
            _aHook_R[i].setVisible(false); 
            _aHook_R[i].setRegX (oSprite.width/2+ANIMATION_OFFSET_ENEMY[HOOK_R].xb);
            _aHook_R[i].setRegY (oSprite.height);
            _oEnemyContainer.addChild(_aHook_R[i]);
            
        }
        /////////
        
         //Hook_L//
        _aHook_L = new Array();
        var tag;
        for (var i=0; i<s_aBb_En_Frame[HOOK_L]; i++){
            tag = 'bb_en_hook_l_'+i;
            var oSprite = s_oSpriteLibrary.getSprite(tag);
            var _oChild =createBitmap(oSprite);
            _aHook_L[i] = new CChild(0,0,_oChild,_oEnemyContainer);
            _aHook_L[i].setVisible(false); 
            _aHook_L[i].setRegX (oSprite.width/2+ANIMATION_OFFSET_ENEMY[HOOK_L].xb);
            _aHook_L[i].setRegY (oSprite.height);
            _oEnemyContainer.addChild(_aHook_L[i]);
            
        }
        /////////
        
        //Uppercut//
        _aUppercut = new Array();
        var tag;
        for (var i=0; i<s_aBb_En_Frame[UPPERCUT]; i++){
            tag = 'bb_en_uppercut_'+i;
           var oSprite = s_oSpriteLibrary.getSprite(tag);
            var _oChild =createBitmap(oSprite);
            _aUppercut[i] = new CChild(0,0,_oChild,_oEnemyContainer);
            _aUppercut[i].setVisible(false); 
            _aUppercut[i].setRegX (oSprite.width/2+ANIMATION_OFFSET_ENEMY[UPPERCUT].xb);
            _aUppercut[i].setRegY (oSprite.height);
            _oEnemyContainer.addChild(_aUppercut[i]);
            
        }
        /////////
      
         //player_guard//
         
       _aGuard = new Array();
        var tag;
        for (var i=0; i<s_aBb_En_Frame[GUARD]; i++){
            tag = 'bb_en_guard_'+i;
           var oSprite = s_oSpriteLibrary.getSprite(tag);
            var _oChild =createBitmap(oSprite);
            _aGuard[i] = new CChild(0,0,_oChild,_oEnemyContainer);
            _aGuard[i].setVisible(false); 
            _aGuard[i].setRegX (oSprite.width/2);
            _aGuard[i].setRegY (oSprite.height);
            _oEnemyContainer.addChild(_aGuard[i]);
            
        }
         
         
        
        /////////
        
        //GetPunched//
        _aGetPunched = new Array();
        var tag;
        for (var i=0; i<s_aBb_En_Frame[GETPUNCHED]; i++){
            tag = 'bb_en_get_punched_'+i;
           var oSprite = s_oSpriteLibrary.getSprite(tag);
            var _oChild =createBitmap(oSprite);
            _aGetPunched[i] = new CChild(0,0,_oChild,_oEnemyContainer);
            _aGetPunched[i].setVisible(false); 
            _aGetPunched[i].setRegX (oSprite.width/2+ANIMATION_OFFSET_ENEMY[GETPUNCHED].xb);
            _aGetPunched[i].setRegY (oSprite.height);
            _oEnemyContainer.addChild(_aGetPunched[i]);
            
        }
        /////////////
        
        //KO/
        _aKo = new Array();
        var tag;
        for (var i=0; i<s_aBb_En_Frame[KO]; i++){
            tag = 'bb_en_ko_'+i;
            var oSprite = s_oSpriteLibrary.getSprite(tag);
            var _oChild =createBitmap(oSprite);
            _aKo[i] = new CChild(0,0,_oChild,_oEnemyContainer);
            _aKo[i].setVisible(false); 
            _aKo[i].setRegX (oSprite.width/2);
            _aKo[i].setRegY (oSprite.height);
            _oEnemyContainer.addChild(_aKo[i]);
            
        }
        /////////
        
    }else{
        _aIdle = new Array();
        var tag;
        
        for (var i=0; i<s_aBw_En_Frame[IDLE]; i++){
            tag = 'bw_en_idle_'+i;
            var oSprite = s_oSpriteLibrary.getSprite(tag);
            var _oChild =createBitmap(oSprite);
            _aIdle[i] = new CChild(0,0,_oChild,_oEnemyContainer);
            _aIdle[i].setVisible(false); 
            _aIdle[i].setRegX (oSprite.width/2);
            _aIdle[i].setRegY(oSprite.height);
            _oEnemyContainer.addChild(_aIdle[i]);
            
        }
         _aIdle[0].setVisible(true);
         

        /////////
        
        //Jab//
          _aJab = new Array();
        var tag;
        for (var i=0; i<s_aBw_En_Frame[JAB]; i++){
            tag = 'bw_en_jab_'+i;
            var oSprite = s_oSpriteLibrary.getSprite(tag);
            var _oChild =createBitmap(oSprite);
            _aJab[i] = new CChild(0,0,_oChild,_oEnemyContainer);
            _aJab[i].setVisible(false); 
            _aJab[i].setRegX(oSprite.width/2+ANIMATION_OFFSET_ENEMY[JAB].xb);
            _aJab[i].setRegY(oSprite.height+ANIMATION_OFFSET_ENEMY[JAB].yb);
            _oEnemyContainer.addChild(_aJab[i]);
            
        }
         
        
         //Hook_r//
       _aHook_R = new Array();
        var tag;
        for (var i=0; i<s_aBw_En_Frame[HOOK_R]; i++){
            tag = 'bw_en_hook_r_'+i;
           var oSprite = s_oSpriteLibrary.getSprite(tag);
            var _oChild =createBitmap(oSprite);
            _aHook_R[i] = new CChild(0,0,_oChild,_oEnemyContainer);
            _aHook_R[i].setVisible(false); 
            _aHook_R[i].setRegX (oSprite.width/2+ANIMATION_OFFSET_ENEMY[HOOK_R].xb);
            _aHook_R[i].setRegY (oSprite.height);
            _oEnemyContainer.addChild(_aHook_R[i]);
            
        }
        /////////
        
         //Hook_L//
        _aHook_L = new Array();
        var tag;
        for (var i=0; i<s_aBw_En_Frame[HOOK_L]; i++){
            tag = 'bw_en_hook_l_'+i;
            var oSprite = s_oSpriteLibrary.getSprite(tag);
            var _oChild =createBitmap(oSprite);
            _aHook_L[i] = new CChild(0,0,_oChild,_oEnemyContainer);
            _aHook_L[i].setVisible(false); 
            _aHook_L[i].setRegX (oSprite.width/2+ANIMATION_OFFSET_ENEMY[HOOK_L].xb);
            _aHook_L[i].setRegY (oSprite.height);
            _oEnemyContainer.addChild(_aHook_L[i]);
            
        }
        /////////
        
        //Uppercut//
        _aUppercut = new Array();
        var tag;
        for (var i=0; i<s_aBw_En_Frame[UPPERCUT]; i++){
            tag = 'bw_en_uppercut_'+i;
           var oSprite = s_oSpriteLibrary.getSprite(tag);
            var _oChild =createBitmap(oSprite);
            _aUppercut[i] = new CChild(0,0,_oChild,_oEnemyContainer);
            _aUppercut[i].setVisible(false); 
            _aUppercut[i].setRegX (oSprite.width/2+ANIMATION_OFFSET_ENEMY[UPPERCUT].xb);
            _aUppercut[i].setRegY (oSprite.height);
            _oEnemyContainer.addChild(_aUppercut[i]);
            
        }
        /////////
      
        //player_guard//
         
       _aGuard = new Array();
        var tag;
        for (var i=0; i<s_aBw_En_Frame[GUARD]; i++){
            tag = 'bw_en_guard_'+i;
           var oSprite = s_oSpriteLibrary.getSprite(tag);
            var _oChild =createBitmap(oSprite);
            _aGuard[i] = new CChild(0,0,_oChild,_oEnemyContainer);
            _aGuard[i].setVisible(false); 
            _aGuard[i].setRegX (oSprite.width/2);
            _aGuard[i].setRegY (oSprite.height);
            _oEnemyContainer.addChild(_aGuard[i]);
            
        }
         
         
        
        /////////
        
        //GetPunched//
        _aGetPunched = new Array();
        var tag;
        for (var i=0; i<s_aBw_En_Frame[GETPUNCHED]; i++){
            tag = 'bw_en_get_punched_'+i;
           var oSprite = s_oSpriteLibrary.getSprite(tag);
            var _oChild =createBitmap(oSprite);
            _aGetPunched[i] = new CChild(0,0,_oChild,_oEnemyContainer);
            _aGetPunched[i].setVisible(false); 
            _aGetPunched[i].setRegX (oSprite.width/2+ANIMATION_OFFSET_ENEMY[GETPUNCHED].xb);
            _aGetPunched[i].setRegY (oSprite.height);
            _oEnemyContainer.addChild(_aGetPunched[i]);
            
        }
        /////////////
        
        //KO/
        _aKo = new Array();
        var tag;
        for (var i=0; i<s_aBw_En_Frame[KO]; i++){
            tag = 'bw_en_ko_'+i;
            var oSprite = s_oSpriteLibrary.getSprite(tag);
            var _oChild =createBitmap(oSprite);
            _aKo[i] = new CChild(0,0,_oChild,_oEnemyContainer);
            _aKo[i].setVisible(false); 
            _aKo[i].setRegX (oSprite.width/2);
            _aKo[i].setRegY (oSprite.height);
            _oEnemyContainer.addChild(_aKo[i]);
            
        }
    }
	
	_iCurActionTime = ENEMY_MAX_ACTION_TIME;
        
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
        if(_iFrame>s_aBb_En_Frame[IDLE]-1){
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
        if(_iFrame>s_aBb_En_Frame[GUARD]-1){
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
            this._onJabHit();
            if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                if(s_oGame.getPGuard()===false){ 
                    createjs.Sound.play("punch_left");
                }
            } 
        }
        
        _iFrame++;
        
        if(_iFrame>s_aBb_En_Frame[JAB]-1){
            
            _aIdle[0].setVisible(true);
            bIsActing=false;
            this.changeState("idle");

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
            this._onHookRHit();
            if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                if(s_oGame.getPGuard()===false){ 
                    createjs.Sound.play("punch_right");
                }
            } 
            
        }
        _iFrame++;
        if(_iFrame>s_aBb_En_Frame[HOOK_R]-1){
            
                    _aIdle[0].setVisible(true);
                    bIsActing=false;
                     this.changeState("idle");
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
            this._onHookLHit();
            if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                if(s_oGame.getPGuard()===false){ 
                    createjs.Sound.play("punch_left");
                }
            } 
            
        }
        _iFrame++;
        if(_iFrame>s_aBb_En_Frame[HOOK_L]-1){
            
            _aIdle[0].setVisible(true);
            bIsActing=false;
            this.changeState("idle");
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
            this._onUppercutHit();
            if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                if(s_oGame.getPGuard()===false){ 
                    createjs.Sound.play("uppercut");
                }
            } 
        }
        _iFrame++;
        if(_iFrame>s_aBb_En_Frame[UPPERCUT]-1){
            
                    _aIdle[0].setVisible(true);
                    bIsActing=false;
                     this.changeState("idle");
        };
        
           
    };
    
    this._animGetPunched=function(){
        if(_iFrame===0){
            bIsActing=true;
            _aGetPunched[0].setVisible(true);                
        } else {
            _aGetPunched[_iFrame-1].setVisible(false);
            _aGetPunched[_iFrame].setVisible(true);

        }       
        
        _iFrame++;
        if(_iFrame>s_aBb_En_Frame[GETPUNCHED]-1){
                     bIsActing=false;
                     _aIdle[0].setVisible(true);
                     this.changeState("idle");
                     
            
        };
        
           
    };
    
    this._animKo=function(){
        if(_iFrame===0){     
            bIsActing=true;
            _aKo[0].setVisible(true);                
        } else {
            _aKo[_iFrame-1].setVisible(false);
            _aKo[_iFrame].setVisible(true);

        }       
        if(_iFrame===11){
            if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                createjs.Sound.play("falling");
            }
        }
        _iFrame++;
        
        
        
        if(_iFrame>s_aBb_En_Frame[KO]-1){
            s_oGame.enemyKo();
        };
        
           
    };
    
    this._onJabHit=function(){
           s_oGame.hitPlayer(s_aDamage[JAB]);
           
    };
    
    this._onHookRHit=function(){
           s_oGame.hitPlayer(s_aDamage[HOOK_R]);
           
    };
    
    this._onHookLHit=function(){
          s_oGame.hitPlayer(s_aDamage[HOOK_L]);
           
    };
    
    this._onUppercutHit=function(){
            s_oGame.hitPlayer(s_aDamage[UPPERCUT]);
    };
    
     this.changeState=function(szState){
         if(szState === "get_punched"){
            _aGetPunched[0].setVisible(true);
             
        }
        if(szState === "ko"){
            _aKo[0].setVisible(true);
        }
        switch(_szPlayerState){
            case IDLE:
                 for(var i=0;i<s_aBb_En_Frame[IDLE];i++){
                     _aIdle[i].setVisible(false);

                 }
                 _iContDelay=1;

            break;

            case GUARD:
                for(var i=0;i<s_aBb_En_Frame[GUARD];i++){
                     _aGuard[i].setVisible(false);

                 }
                 _iContDelay=1;

            break;

            case JAB:
                for(var i=0;i<s_aBb_En_Frame[JAB];i++){
                     _aJab[i].setVisible(false);

                 }
                 _iContDelay=1;

            break;

            case HOOK_R:
                for(var i=0;i<s_aBb_En_Frame[HOOK_R];i++){
                     _aHook_R[i].setVisible(false);

                 }
                 _iContDelay=1;

            break;

            case HOOK_L:
                for(var i=0;i<s_aBb_En_Frame[HOOK_L];i++){
                     _aHook_L[i].setVisible(false);

                 }
                 _iContDelay=1;

            break;

            case UPPERCUT:
                for(var i=0;i<s_aBb_En_Frame[UPPERCUT];i++){
                     _aUppercut[i].setVisible(false);

                 }
                 _iContDelay=1;

            break;

           case GETPUNCHED:
                for(var i=0;i<s_aBb_En_Frame[GETPUNCHED];i++){
                     _aGetPunched[i].setVisible(false);

                 }
                 _iContDelay=1;

            break;

            case KO:
                for(var i=0;i<s_aBb_En_Frame[KO];i++){
                     _aKo[i].setVisible(false);

                 }
                 _iContDelay=1;

            break;
               
        }
        _szPlayerState=szState;
        _iFrame=0;
        
    };
    
    this._init(iX,iY);
    
    this.moveGuard=function(){ 
        _oEnemyContainer.setTween({y:_oEnemyContainer.getY()+30}, 100, function() { _oEnemyContainer.setTween({y:_oEnemyContainer.getY()-30}, 100);});
    };
    
    this._action=function(){
        var _iAction=Math.floor((Math.random() * 100) + 1);
        if(_iAction>ENEMY_ATTACK_OCCURR){
            this.changeState("guard");
            s_oGame.setEGuard(true);
            this._guardRelease();
        }else{
            var _iAttack=Math.floor((Math.random() * 5) + 0);
            this.changeState(_aCombo[_iAttack]);
        }  
        
    };
    
    this._guardRelease=function(){
   
        var _iGuardTime=Math.floor((Math.random() * ENEMY_MAX_GUARD_TIME) + ENEMY_MIN_GUARD_TIME);
         
            setTimeout(function(){ 
                if(s_oGame!==null && !s_oGame.getKoE()){ 
                    _oParent.changeState("idle");bIsActing =false;s_oGame.setEGuard(false);
                };
            },_iGuardTime);
             
        
    };
    
    this.setVisible=function(bVisible){
      _oEnemyContainer.setVisible(bVisible);  
      
    };
    
    this.setIsActing=function(bAction){
      bIsActing=bAction; 
      
    };
    this.playAllAnim=function(){
		
         switch(_szPlayerState){
             
                case IDLE:
                if(_iFrame<s_aBb_En_Frame[IDLE]-1){                           
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
                if(_iFrame<s_aBb_En_Frame[GUARD]-1){                           
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
                if(_iFrame<s_aBb_En_Frame[JAB]-1){                           
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
                if(_iFrame<s_aBb_En_Frame[HOOK_R]-1){                           
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
                if(_iFrame<s_aBb_En_Frame[HOOK_L]-1){                           
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
                if(_iFrame<s_aBb_En_Frame[UPPERCUT]-1){                           
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
                if(_iFrame<s_aBb_En_Frame[GETPUNCHED]-1){                           
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
                if(_iFrame<s_aBb_En_Frame[KO]-1){                           
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
        
        if(!bIsActing){
            _iTimeElaps += s_iTimeElaps;
        }
        
        if(_iTimeElaps>_iCurActionTime && !bIsActing && !s_oGame.getKoP() && !s_oGame.getKoE()){
            _iTimeElaps=0;
            bIsActing=true;
            _iCurActionTime = Math.random() * (ENEMY_MAX_ACTION_TIME - ENEMY_MIN_ACTION_TIME) + ENEMY_MIN_ACTION_TIME;
            this._action();
        }
        
        
        
           switch(_szPlayerState){
               case IDLE:
                    if(_iContDelay === IDLE_DELAY && !s_oGame.getKoP() ){
                            _iContDelay = 0;
                            this._animIdle();
                        }else{
                            _iContDelay++;
                        }
               break;
               
                case GUARD:
                    if(_iContDelay === IDLE_DELAY && !s_oGame.getKoP() ){
                        
                            _iContDelay = 0;
                            this._animGuard();
                        }else{
                            _iContDelay++;
                        }
               break;
               
                case JAB:
                    if(_iContDelay === IDLE_DELAY && !s_oGame.getKoP()){
                        
                            _iContDelay = 0;
                            this._animJab();
                        }else{
                            _iContDelay++;
                        }
               break;
               
               case HOOK_R:
                    if(_iContDelay === IDLE_DELAY && !s_oGame.getKoP()){
                        
                            _iContDelay = 0;
                            this._animHookR();
                        }else{
                            _iContDelay++;
                        }
               break;
               
               case HOOK_L:
                    if(_iContDelay === IDLE_DELAY && !s_oGame.getKoP()){
                        
                            _iContDelay = 0;
                            this._animHookL();
                        }else{
                            _iContDelay++;
                        }
               break;
                case UPPERCUT:
                    if(_iContDelay === IDLE_DELAY && !s_oGame.getKoP()){
                        
                            _iContDelay = 0;
                            this._animUppercut();
                        }else{
                            _iContDelay++;
                        }
               break;
               
               case GETPUNCHED:
                    if(_iContDelay === IDLE_DELAY && !s_oGame.getKoP()){
                        
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
   
}