function CVersusPanel(){
    
    var _oBgLoading;
    var _oLoadingPIcon;
    var _oLoadingEIcon;
    var _oTextP;
    var _oTextE;
    var _oVersus;
    var _oLoadingText;



    this._init=function(){

        _oBgLoading= createBitmap(s_oSpriteLibrary.getSprite('bg_pselection'));
        s_oStage.addChild(_oBgLoading);
        
        if(s_iPlayerSelected===0){
            _oTextP = new createjs.BitmapText(TEXT_BOXERW, s_oSpriteSheetBoxing);
            _oTextP.regX  = _oTextP.getBounds().width/2;
            _oTextP.regY  = _oTextP.getBounds().height/2;
            _oTextP.x = 270 ;
            _oTextP.y = 350; 

            _oTextE = new createjs.BitmapText(TEXT_BOXERB, s_oSpriteSheetBoxing);
            _oTextE.regX  = _oTextE.getBounds().width/2;
            _oTextE.regY  = _oTextE.getBounds().height/2;
            _oTextE.x = 460;
            _oTextE.y = 750;

            _oLoadingPIcon= createBitmap(s_oSpriteLibrary.getSprite('bw_versus'));
            _oLoadingEIcon= createBitmap(s_oSpriteLibrary.getSprite('bb_versus'));        
        }else{           
            _oTextP = new createjs.BitmapText(TEXT_BOXERB, s_oSpriteSheetBoxing);
            _oTextP.regX  = _oTextP.getBounds().width/2;
            _oTextP.regY  = _oTextP.getBounds().height/2;
            _oTextP.x = 270 ;
            _oTextP.y = 350;

            _oTextE = new createjs.BitmapText(TEXT_BOXERW, s_oSpriteSheetBoxing);
            _oTextE.regX  = _oTextE.getBounds().width/2;
            _oTextE.regY  = _oTextE.getBounds().height/2;
            _oTextE.x = 460 ;
            _oTextE.y = 750;

            _oLoadingPIcon= createBitmap(s_oSpriteLibrary.getSprite('bb_versus'));
            _oLoadingEIcon= createBitmap(s_oSpriteLibrary.getSprite('bw_versus'));    
        }
        
        _oTextP.visible=false;
        _oTextE.visible=false;
        
        
        _oLoadingPIcon.x=0;
        _oLoadingPIcon.y=250;
        _oLoadingPIcon.regX=_oLoadingPIcon.getBounds().width/2;
        _oLoadingPIcon.regY=_oLoadingPIcon.getBounds().height/2;

        _oLoadingEIcon.x=CANVAS_WIDTH;
        _oLoadingEIcon.y=650;
        _oLoadingEIcon.regX=_oLoadingEIcon.getBounds().width/2;
        _oLoadingEIcon.regY=_oLoadingEIcon.getBounds().height/2;
        
        _oLoadingText = new createjs.BitmapText("Loading...", s_oSpriteSheetBoxing);
        _oLoadingText.regX  = _oLoadingText.getBounds().width/2;
        _oLoadingText.regY  = _oLoadingText.getBounds().height/2;
        _oLoadingText.x = CANVAS_WIDTH/2 ;
        _oLoadingText.y = 850; 
        
        s_oStage.addChild(_oLoadingPIcon);
        s_oStage.addChild(_oLoadingEIcon);
        s_oStage.addChild(_oTextP);
        s_oStage.addChild(_oTextE);
        s_oStage.addChild(_oLoadingText);
        
        createjs.Tween.get(_oLoadingPIcon).to({x:250}, 700);
        createjs.Tween.get(_oLoadingEIcon).to({x:440}, 700);
        
        _oVersus=createBitmap(s_oSpriteLibrary.getSprite('vs'));
        _oVersus.regX  = _oVersus.getBounds().width/2;
        _oVersus.regY  = _oVersus.getBounds().height/2;
        _oVersus.x = CANVAS_WIDTH/2 ;
        _oVersus.y = (CANVAS_HEIGHT/2);
        s_oStage.addChild(_oVersus);
        
        _oVersus.scaleX = _oVersus.scaleY = 2.5;
        _oVersus.alpha = 0.6;
        _oVersus.visible=true;
        
        createjs.Tween.get(_oVersus).to({scaleX:1,scaleY:1,alpha:1},400,createjs.Ease.cubicIn).call(function(){
                                            _oTextP.scaleX = _oTextP.scaleY = 2;
                                            _oTextP.alpha = 0.8;
                                            _oTextP.visible=true;
                                            createjs.Tween.get(_oTextP).to({scaleX:1,scaleY:1,alpha:1},400,createjs.Ease.elasticOut).call(function(){
                                                                _oTextE.scaleX = _oTextE.scaleY = 2;
                                                                _oTextE.alpha = 0.8;
                                                                _oTextE.visible=true;
                                                                createjs.Tween.get(_oTextE).to({scaleX:1,scaleY:1,alpha:1},400,createjs.Ease.elasticOut).call(function(){});
                                                });}
                );

    };
    
    this.setIndex=function(iDepth){
        s_oStage.setChildIndex(_oBgLoading,iDepth);
        s_oStage.setChildIndex(_oLoadingPIcon,iDepth);
        s_oStage.setChildIndex(_oLoadingEIcon,iDepth);
        s_oStage.setChildIndex(_oTextP,iDepth);
        s_oStage.setChildIndex(_oTextE,iDepth);
        s_oStage.setChildIndex(_oVersus,iDepth);
        s_oStage.setChildIndex(_oLoadingText,iDepth);
    };
    
    
    this.unload=function(){
        s_oStage.removeChild(_oBgLoading);
        s_oStage.removeChild(_oLoadingPIcon);
        s_oStage.removeChild(_oLoadingEIcon);
        s_oStage.removeChild(_oTextP);
        s_oStage.removeChild(_oTextE);
        s_oStage.removeChild(_oVersus);
        s_oStage.removeChild(_oLoadingText);
    };
    
        
   this._init();         
};
