function CHelpPanel(){
    var _oText1;
    var _oText1Back;
    var _oText2;
    var _oText2Back;
    var _oText3;
    var _oText3Back;
    var _oText4;
    var _oText4Back;
    var _oMessage1;
    var _oMessage2;
    var _oHelpBg;
    var _oGroup;

    this._init = function(){
        _oHelpBg = createBitmap(s_oSpriteLibrary.getSprite('bg_help'));
        s_oStage.addChild(_oHelpBg);
        

        if(s_bMobile === false){
            _oMessage1=TEXT_HELP1;
        } else {
            _oMessage1=TEXT_HELP_MOB1;
        }
        
        var oPos = {x: 70, y: 220, shadow: 4}
        
        _oText1Back = new createjs.Text(_oMessage1,"bold 18px walibi", "#000000");
        _oText1Back.textAlign = "left";
        _oText1Back.x = oPos.x + oPos.shadow;
        _oText1Back.y = oPos.y + oPos.shadow;
        _oText1Back.textBaseline = "alphabetic";
        _oText1Back.lineWidth = 380;
		
	_oText1 = new createjs.Text(_oMessage1,"bold 18px walibi", "#fcff00");
        _oText1.textAlign = "left";
        _oText1.x = oPos.x;
        _oText1.y = oPos.y;
        _oText1.textBaseline = "alphabetic";
        _oText1.lineWidth = 380;

        _oText2Back = new createjs.Text(TEXT_HELP2,"bold 22px walibi", "#000000");
        _oText2Back.textAlign = "left";
        _oText2Back.x = oPos.x + oPos.shadow + 250;
        _oText2Back.y = oPos.y + 190 + oPos.shadow;
        _oText2Back.textBaseline = "alphabetic";
        _oText2Back.lineWidth = 250;
		
	_oText2 = new createjs.Text(TEXT_HELP2,"bold 22px walibi", "#fcff00");
        _oText2.textAlign = "left";
        _oText2.x = oPos.x + 250;
        _oText2.y = oPos.y + 190;
        _oText2.textBaseline = "alphabetic";
        _oText2.lineWidth = 250;
        
        _oText3Back = new createjs.Text(TEXT_HELP3,"bold 22px walibi", "#000000");
        _oText3Back.textAlign = "left";
        _oText3Back.x = oPos.x + oPos.shadow;
        _oText3Back.y = oPos.y  + 320 + oPos.shadow;
	_oText3Back.textBaseline = "alphabetic";
        _oText3Back.lineWidth = 250;
        
	_oText3 = new createjs.Text(TEXT_HELP3,"bold 22px walibi", "#fcff00");
        _oText3.textAlign = "left";
        _oText3.x = oPos.x;
        _oText3.y = oPos.y + 320;
        _oText3.textBaseline = "alphabetic";
        _oText3.lineWidth = 250;
        
        _oText4Back = new createjs.Text(TEXT_HELP4,"bold 22px walibi", "#000000");
        _oText4Back.textAlign = "left";
        _oText4Back.x = oPos.x + oPos.shadow + 170;
        _oText4Back.y = oPos.y  + 492+ oPos.shadow;
	_oText4Back.textBaseline = "alphabetic";
        _oText4Back.lineWidth = 350;
        
	_oText4 = new createjs.Text(TEXT_HELP4,"bold 22px walibi", "#fcff00");
        _oText4.textAlign = "left";
        _oText4.x = oPos.x + 170;
        _oText4.y = oPos.y +492;
        _oText4.textBaseline = "alphabetic";
        _oText4.lineWidth = 350;
        
        _oGroup = new createjs.Container();
        _oGroup.addChild(_oHelpBg,_oText1Back,_oText1,_oText2Back,_oText2,_oText3Back,_oText3, _oText4Back,_oText4);
        s_oStage.addChild(_oGroup);

        var oParent = this;
        _oGroup.on("pressup",function(){oParent._onExitHelp();});

        
    };

    this.unload = function(){
        s_oStage.removeChild(_oGroup);

        var oParent = this;
        _oGroup.off("pressup",function(){oParent._onExitHelp()});
    };

    this._onExitHelp = function(){
        this.unload();
        s_oGame._onExitHelp();
    };

    this._init();

}
