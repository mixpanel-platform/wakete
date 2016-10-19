function CHelpPanel(){
    var _oParent;
    var _oPanelBg;
    var _oText1;
    var _oButSkip;
    var _oButSkip2;
    var _oButFight;
    var _iContPage=0;
    var _iLastPage=1;//Number of Pages minus 1
    
    this._init=function(){
            _oPanelBg=createBitmap(s_oSpriteLibrary.getSprite("bg_help_"+(_iContPage+1))); 
          
            _oPanelBg.regX  = _oPanelBg.getBounds().width/2;
            _oPanelBg.regY  = _oPanelBg.getBounds().height/2;
            _oPanelBg.x = CANVAS_WIDTH/2 ;
            _oPanelBg.y = (CANVAS_HEIGHT/2);
            
            s_oStage.addChild(_oPanelBg);
            
            _oText1 = new createjs.BitmapText("HOW TO PLAY", s_oSpriteSheetBoxing);
            _oText1.regX  = _oText1.getBounds().width/2;
            _oText1.regY  = _oText1.getBounds().height/2;
            _oText1.x = CANVAS_WIDTH/2 ;
            _oText1.y = 180;
            s_oStage.addChild(_oText1);
            
            var oSprite = s_oSpriteLibrary.getSprite('but_skip');
            _oButSkip = new CGfxButton((CANVAS_WIDTH-165),CANVAS_HEIGHT-120,oSprite,s_oStage);
            _oButSkip.addEventListener(ON_MOUSE_UP, this._onSkipButtonPressedNext, this);
            
            var oSprite = s_oSpriteLibrary.getSprite('but_skip');
            _oButSkip2 = new CGfxButton(165,CANVAS_HEIGHT-120,oSprite,s_oStage);
            _oButSkip2.addEventListener(ON_MOUSE_UP, this._onSkipButtonPressedPrevious , this);
            _oButSkip2.setScaleX(-1);
            
            var oSprite = s_oSpriteLibrary.getSprite('but_fight');
            _oButFight = new CGfxButton((CANVAS_WIDTH/2),CANVAS_HEIGHT-130,oSprite,s_oStage);
            _oButFight.addEventListener(ON_MOUSE_UP,s_oGame.closeHelpPanel, this);      
 
    };
    
    
    this._onSkipButtonPressedNext=function(){
        _iContPage+=1;

        if(_iContPage===_iLastPage+1){
            _iContPage=0;
            _oPanelBg.image=s_oSpriteLibrary.getSprite("bg_help_"+(_iContPage+1));
            
        }else{
            _oPanelBg.image=s_oSpriteLibrary.getSprite("bg_help_"+(_iContPage+1));
            
        }
            
    };
    
     this._onSkipButtonPressedPrevious=function(){
        _iContPage-=1;        
        if(_iContPage===-1){
            _iContPage=_iLastPage;
            _oPanelBg.image=s_oSpriteLibrary.getSprite("bg_help_"+(_iContPage+1));
            
        }else{
            _oPanelBg.image=s_oSpriteLibrary.getSprite("bg_help_"+(_iContPage+1));
            
        }
            
    };
    
  
    
     this.unload=function(){
         
        s_oStage.removeChild( _oParent);
        s_oStage.removeChild( _oPanelBg);
        s_oStage.removeChild( _oText1);
        _oButSkip.unload();
        _oButSkip2.unload();
        _oButFight.unload();
        
     };


    _oParent=this;
    this._init();

}
