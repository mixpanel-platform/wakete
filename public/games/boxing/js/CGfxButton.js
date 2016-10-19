function CGfxButton(iXPos,iYPos,oSprite,oParentContainer){
    
    var _aCbCompleted;
    var _aCbOwner;
    var _oButton;
    var _oParentContainer;
    
    this._init =function(iXPos,iYPos,oSprite){
        
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        
        _oButton = createBitmap( oSprite);
        _oButton.x = iXPos;
        _oButton.y = iYPos; 
                                   
        _oButton.regX = oSprite.width/2;
        _oButton.regY = oSprite.height/2;
       
        _oParentContainer.addChild(_oButton);
        
        
        this._initListener();
    };
    
    this.unload = function(){
       _oButton.off("mousedown", this.buttonDown);
       _oButton.off("pressup" , this.buttonRelease); 
       
       _oParentContainer.removeChild(_oButton);
    };
    
    this.setVisible = function(bVisible){
        _oButton.visible = bVisible;
    };
    
    this.getVisible = function(bVisible){
        return _oButton.visible;
    };
    
    this._initListener = function(){
       _oButton.on("mousedown", this.buttonDown);
       _oButton.on("pressup" , this.buttonRelease);      
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.buttonRelease = function(){
        if(_oButton.scaleX>=0){
            _oButton.scaleX = 1;            
        }else{
            _oButton.scaleX = -1;            
        }
        _oButton.scaleY = 1;

        if(_aCbCompleted[ON_MOUSE_UP]){
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP]);
        }
        _oParentContainer.update(); 
    };
    
    this.buttonDown = function(){
        if(_oButton.scaleX>=0){
            _oButton.scaleX = 0.9;
        }else{
            _oButton.scaleX = -0.9;   
            
        }
        _oButton.scaleY = 0.9;
        
       if(_aCbCompleted[ON_MOUSE_DOWN]){
           _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN]);
       }
      oParentContainer.update(); 
    };
    
    this.setPosition = function(iXPos,iYPos){
         _oButton.x = iXPos;
         _oButton.y = iYPos;
    };
    
    this.setX = function(iXPos){
         _oButton.x = iXPos;
    };
    
    this.setY = function(iYPos){
         _oButton.y = iYPos;
    };
    
    this.setScaleX = function(iXPos){
         _oButton.scaleX = iXPos;
    };
    
    this.setScaleY = function(iYPos){
         _oButton.scaleY = iYPos;
    };
    
    this.getButtonImage = function(){
        return _oButton;
    };
    
    
    this.getX = function(){
        return _oButton.x;
    };
    
    this.getY = function(){
        return _oButton.y;
    };
	
    _oParentContainer = oParentContainer;
	
    this._init(iXPos,iYPos,oSprite);
    
    return this;
}