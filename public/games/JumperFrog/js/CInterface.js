function CInterface(){
    var _oAudioToggle;
    var _oButExit;
    var _oButUp;
    var _oButDown;
    var _oButLeft;
    var _oButRight;
    var _oHelpPanel=null;
    var _oScoreText;
    var _oScoreNum;
    var _oScoreNumTextOutline;
    var _oTimeText;
    var _oBarFill;
    var _oMask;    
    var _oLifeText;

    
    this._init = function(){                
        
        var oSprite = s_oSpriteLibrary.getSprite('gui_panel_top');
        var oTopPanel = createBitmap(oSprite);
        s_oStage.addChild(oTopPanel);
        
        
        var oExitX;
        
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _oButExit = new CGfxButton(CANVAS_WIDTH - (oSprite.height/2)- 5,(oSprite.height/2) + 5,oSprite,true);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
        
        oExitX = CANVAS_WIDTH - (oSprite.width/2) - 80;
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _oAudioToggle = new CToggle(oExitX,5+ (oSprite.height/2),oSprite,s_bAudioActive);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);          
        }

        var oSprite = s_oSpriteLibrary.getSprite('life');
        var oLife = createBitmap(oSprite);
        oLife.x = 14;
        oLife.y = 14;
        s_oStage.addChild(oLife);
        
        _oLifeText = new createjs.Text("X"+LIVES,"bold 40px walibi", "#fcff00");
        _oLifeText.x = 70;
        _oLifeText.y = 48;
        _oLifeText.textAlign = "left";
        _oLifeText.textBaseline = "alphabetic";
        _oLifeText.lineWidth = 200;
        s_oStage.addChild(_oLifeText);
        
        var oInfoContainer = new createjs.Container();
        oInfoContainer.x = 20;
        oInfoContainer.y = 940;        
        s_oStage.addChild(oInfoContainer);
        
        _oTimeText = new createjs.Text(TEXT_TIME,"bold 40px walibi", "#fcff00");//87d304
        _oTimeText.x =10;
        _oTimeText.y =0;
        _oTimeText.textAlign = "left";
        _oTimeText.textBaseline = "alphabetic";
        _oTimeText.lineWidth = 200;        
        oInfoContainer.addChild(_oTimeText);
        
        var oTimeTextOutline = new createjs.Text(TEXT_TIME,"bold 40px walibi", "#000000");
        oTimeTextOutline.x =10;
        oTimeTextOutline.y =0;
        oTimeTextOutline.textAlign = "left";
        oTimeTextOutline.textBaseline = "alphabetic";
        oTimeTextOutline.lineWidth = 200;
        oTimeTextOutline.outline = 3;
        oInfoContainer.addChild(oTimeTextOutline);

        var oSprite = s_oSpriteLibrary.getSprite('time_bar_fill');
        _oBarFill = createBitmap(oSprite);
        _oBarFill.x = 10;
        _oBarFill.y = 18;

        oInfoContainer.addChild(_oBarFill);
        
        _oMask = new createjs.Shape();
        _oMask.graphics.beginFill("rgba(255,0,0,0.01)").drawRect(0, 0, oSprite.width,oSprite.height);
        _oMask.x= 10;
        _oMask.y= 18;      
        oInfoContainer.addChild(_oMask);

        _oBarFill.mask = _oMask;

        var oSprite = s_oSpriteLibrary.getSprite('time_bar_frame');
        var oBarFrame = createBitmap(oSprite);
        oBarFrame.x = 7;
        oBarFrame.y = 15;
        oInfoContainer.addChild(oBarFrame);
        
        _oScoreText = new createjs.Text(TEXT_SCORE,"bold 40px walibi", "#fcff00");
        _oScoreText.x =10;
        _oScoreText.y =110;
        _oScoreText.textAlign = "left";
        _oScoreText.textBaseline = "alphabetic";
        _oScoreText.lineWidth = 200;        
        oInfoContainer.addChild(_oScoreText);
        
        var oScoreTextOutline = new createjs.Text(TEXT_SCORE,"bold 40px walibi", "#000000");
        oScoreTextOutline.x =10;
        oScoreTextOutline.y =110;
        oScoreTextOutline.textAlign = "left";
        oScoreTextOutline.textBaseline = "alphabetic";
        oScoreTextOutline.lineWidth = 200;
        oScoreTextOutline.outline = 3;
        oInfoContainer.addChild(oScoreTextOutline);
        
        _oScoreNum = new createjs.Text("0","bold 36px walibi", "#fcff00");
        _oScoreNum.x = 10;
        _oScoreNum.y = 155;
        _oScoreNum.textAlign = "left";
        _oScoreNum.textBaseline = "alphabetic";
        _oScoreNum.lineWidth = 200;
        oInfoContainer.addChild(_oScoreNum);
        
        _oScoreNumTextOutline = new createjs.Text("0","bold 36px walibi", "#000000");
        _oScoreNumTextOutline.x =10;
        _oScoreNumTextOutline.y =155;
        _oScoreNumTextOutline.textAlign = "left";
        _oScoreNumTextOutline.textBaseline = "alphabetic";
        _oScoreNumTextOutline.lineWidth = 200;
        _oScoreNumTextOutline.outline = 3;
        oInfoContainer.addChild(_oScoreNumTextOutline);

        var oButtonPosition = {x: 425, y: CANVAS_HEIGHT - 190};        
        var oButUp = s_oSpriteLibrary.getSprite('but_up');
        _oButUp = new CGfxButton(oButtonPosition.x + 80, oButtonPosition.y - 5, oButUp, 1.2, true);        
        _oButUp.addEventListener(ON_MOUSE_DOWN, this._onButUpPress, this);

        var oButDown = s_oSpriteLibrary.getSprite('but_down');
        _oButDown = new CGfxButton(oButtonPosition.x + 80, oButtonPosition.y + 135, oButDown, 1.2, true);
        _oButDown.addEventListener(ON_MOUSE_DOWN, this._onButDownPress, this);

        var oButLeft = s_oSpriteLibrary.getSprite('but_left');
        _oButLeft = new CGfxButton(oButtonPosition.x + 1, oButtonPosition.y + 65, oButLeft, 1.2, true);
        _oButLeft.addEventListener(ON_MOUSE_DOWN, this._onButLeftPress, this);
        
        var oButRight = s_oSpriteLibrary.getSprite('but_right');
        _oButRight = new CGfxButton(oButtonPosition.x + 157, oButtonPosition.y + 65, oButRight, 1.2, true);
        _oButRight.addEventListener(ON_MOUSE_DOWN, this._onButRightPress, this);
    };
    
    this.unload = function(){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }

        _oButExit.unload();
        
        _oButUp.unload();
        _oButDown.unload();
        _oButLeft.unload();
        _oButRight.unload();
    };

    this.refreshScore = function(iValue){
        _oScoreNum.text = iValue;
        _oScoreNumTextOutline.text = iValue;
    };
    
    this.refreshLives = function (iLives){
        _oLifeText.text = "X"+iLives;
    };
    
    this.refreshBar = function(){
        _oMask.scaleX = 1;
        createjs.Tween.get(_oMask, {override:true}).to({scaleX:0}, LEVEL_TIME, createjs.Ease.linear).call(function(){s_oGame.gameOver()});
    };
   
    this.stopBar = function(){
        createjs.Tween.removeTweens(_oMask);
    };
   
    this._onButUpPress = function(){        
        s_oGame.onUpPress();
    };
    
    this._onButDownPress = function(){
        s_oGame.onDownPress();
    };

    this._onButLeftPress = function(){
        s_oGame.onLeftPress();
    };
    
    this._onButRightPress = function(){
        s_oGame.onRightPress();
    };

    this._onButHelpRelease = function(){
        _oHelpPanel = new CHelpPanel();
    };
    
    this._onButRestartRelease = function(){
        s_oGame.restartGame();
    };
    
    this.onExitFromHelp = function(){
        _oHelpPanel.unload();
    };
    
    this._onAudioToggle = function(){
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this._onExit = function(){
      s_oGame.onExit();  
    };
    
    this._init();
    
    return this;
}
