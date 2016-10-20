function CLevelPanel(iCurLevel){
    
    var _oBg;
    var _oGroup;
    var _oMsgTextBack;
    var _oMsgText;
    var _oScoreTextBack;
    var _oScoreText;
    
    this._init = function(iCurLevel){
        
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('msg_box'));
        _oBg.x = 0;
        _oBg.y = 0;
        
        _oMsgTextBack = new createjs.Text("","bold 45px walibi", "#000000");
        _oMsgTextBack.x = CANVAS_WIDTH/2 +4;
        _oMsgTextBack.y = (CANVAS_HEIGHT/2)-100;
        _oMsgTextBack.textAlign = "center";

        _oMsgText = new createjs.Text("","bold 45px walibi", "#fcff00");
        _oMsgText.x = CANVAS_WIDTH/2;
        _oMsgText.y = (CANVAS_HEIGHT/2) -104;
        _oMsgText.textAlign = "center";
       
        _oScoreTextBack = new createjs.Text("","bold 40px walibi", "#000000");
        _oScoreTextBack.x = CANVAS_WIDTH/2 +4;
        _oScoreTextBack.y = (CANVAS_HEIGHT/2) + 4;
        _oScoreTextBack.textAlign = "center";
        
        _oScoreText = new createjs.Text("","bold 40px walibi", "#fcff00");
        _oScoreText.x = CANVAS_WIDTH/2;
        _oScoreText.y = (CANVAS_HEIGHT/2);
        _oScoreText.textAlign = "center";

        _oGroup = new createjs.Container();
        _oGroup.alpha = 0;
        _oGroup.visible=false;
        
        _oGroup.addChild(_oBg, _oScoreTextBack, _oScoreText, _oMsgTextBack, _oMsgText);

        s_oStage.addChild(_oGroup);
    };
    
    this.unload = function(){
        _oGroup.off("mousedown",this._onExit);
    };
    
    this._initListener = function(){
        _oGroup.on("mousedown",this._onExit);
    };
    
    this.show = function(iScore){
	if(DISABLE_SOUND_MOBILE === false || s_bMobile === false ){
	        createjs.Sound.play("win_level");
	}
        var oParent = this;
        oParent._initListener();
        _oMsgTextBack.text = TEXT_LEVELEND + iCurLevel + TEXT_COMPLETEEND;
        _oMsgText.text = TEXT_LEVELEND + iCurLevel + TEXT_COMPLETEEND;

        _oScoreTextBack.text = TEXT_SCORE +" "+iScore;
        _oScoreText.text = TEXT_SCORE +" "+iScore;
        
        _oGroup.visible = true;
        
        
        createjs.Tween.get(_oGroup).to({alpha:1 }, 500);
        
        $(s_oMain).trigger("save_score",iScore);
    };
    
    this._onExit = function(){
        _oGroup.off("mousedown",this._onExit);
        s_oStage.removeChild(_oGroup);
        
        s_oGame.reset();
    };
    
    this._init(iCurLevel);
    
    return this;
}
