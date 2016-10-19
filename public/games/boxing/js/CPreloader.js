function CPreloader(){
    var _oLoadingText;
    var _oContainer;
    
    this._init = function(){
       s_oSpriteLibrary.init( this._onImagesLoaded,this._onAllImagesLoaded, this );
       s_oSpriteLibrary.addSprite("bg_menu","/games/boxing/sprites/bg_menu.jpg");
       s_oSpriteLibrary.loadSprites();
       
       _oContainer = new CContainer(0,0);

    };
    
    this.unload = function(){
	_oContainer.removeAllChildren();
        
        s_oStage.removeChild(_oLoadingText);
    };
    
    this.hide = function(){
        var oParent = this;
        setTimeout(function(){oParent.unload();s_oMain.gotoMenu();}, 1000);
    };
    
    this._onImagesLoaded = function(){
        
    };
    
    this._onAllImagesLoaded = function(){
        this.attachSprites();
        
        s_oMain.preloaderReady();
    };
    
    this.attachSprites = function(){
        
        var oSprite= s_oSpriteLibrary.getSprite('bg_menu');
        var _oChild =createBitmap(oSprite);
         var oBg = new CChild(0,0,_oChild,_oContainer);
        _oContainer.addChild(oBg);
       
        _oLoadingText = new createjs.BitmapText("0%", s_oSpriteSheetBoxing);
        _oLoadingText.regX  = _oLoadingText.getBounds().width/2;
        _oLoadingText.regY  = _oLoadingText.getBounds().height/2;
        _oLoadingText.x = CANVAS_WIDTH/2 ;
        _oLoadingText.y = CANVAS_HEIGHT - 150;
        s_oStage.addChild(_oLoadingText);
       
    
    };
    
    this.refreshLoader = function(iPerc){
        _oLoadingText.text = iPerc+"%";
    };
    
    this._init();   
}