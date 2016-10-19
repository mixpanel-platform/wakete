function CChild(iX, iY, oChild, oParentContainer){
    
    var _bVisible=true;
    
    var _iX;
    var _iY;
    var _iRegX;
    var _iRegY;
    var _iScaleX;
    var _iScaleY;
    var _iAlpha;
    
    var _oChild;
    var _oParentContainer; 
    
    this._init = function(iX, iY, oChild, oParentContainer){
        
        _bVisible = true;
        
        _iX = iX;
        _iY = iY;
        _iRegX = 0;
        _iRegY = 0;
        _iScaleX = 1;
        _iScaleY = 1;
        _iAlpha = 1;
        
        _oChild = oChild;
        _oParentContainer = oParentContainer;

        if(typeof _oParentContainer !== "undefined"){
            _oChild.x = _oParentContainer.getX() + _iX;
            _oChild.y = _oParentContainer.getY() + _iY;
            _oChild.scaleX = _oParentContainer.getScaleX()*_iScaleX;
            _oChild.scaleY = _oParentContainer.getScaleY()*_iScaleY;
            
            _oParentContainer.addChild(this);
        } else {
            _oChild.x = _iX;
            _oChild.y = _iY;
        }        
    };
    
    this.setAllParameter = function(oParentContainer){
        _oParentContainer = oParentContainer;
        
        _oChild.x = _oParentContainer.getX() + _iX;
        _oChild.y = _oParentContainer.getY() + _iY;
        _oChild.scaleX = _oParentContainer.getScaleX()*_iScaleX;
        _oChild.scaleY = _oParentContainer.getScaleY()*_iScaleY;
        _oChild.regX = _iRegX;
        _oChild.regY = _iRegY;
        _oChild.alpha = _iAlpha;
        _oChild.visible = _bVisible;
    };
    
    this.setX = function(iX){
        _iX = iX;
        if(typeof _oParentContainer !== "undefined"){
            _oChild.x = _oParentContainer.getX() + _iX;
        } else {
            _oChild.x = _iX;
        }    
    };
    
    this.getX = function(){
        return _iX;
    };
    
    this.setY = function(iY){
        _iY = iY;
        if(typeof _oParentContainer !== "undefined"){
            _oChild.y = _oParentContainer.getY() + _iY;
        } else {
            _oChild.y = _iY;
        }    
    };
    
    this.getY = function(){
        return _iY;
    };
    
    this.setRegX = function(iRegX){
        _iRegX = iRegX;
        _oChild.regX = _iRegX;
    };
    
    this.getRegX = function(){
        return _iRegX;
    };
    
    this.setRegY = function(iRegY){
        _iRegY = iRegY;
        _oChild.regY = _iRegY;
    };
    
    this.getRegY = function(){
        return _iRegY;
    };
    
    this.setScaleX = function(iScaleX){
        _iScaleX = iScaleX;
        if(typeof _oParentContainer !== "undefined"){
            _oChild.scaleX = _oParentContainer.getScaleX() * _iScaleX;
        } else {
            _oChild.scaleX = _iScaleX;
        }    
    };
    
    this.getScaleX = function(){
        return _iScaleX;
    };
    
    this.setScaleY = function(iScaleY){
        _iScaleY = iScaleY;
        if(typeof _oParentContainer !== "undefined"){
            _oChild.scaleY = _oParentContainer.getScaleY() * _iScaleY;
        } else {
            _oChild.scaleY = _iScaleY;
        }    
    };
    
    this.getScaleY = function(){
        return _iScaleY;
    };
    
    this.setAlpha = function(iAlpha){
        _iAlpha = iAlpha;
        if(typeof _oParentContainer !== "undefined"){
            _oChild.alpha = _oParentContainer.getAlpha() * _iAlpha;
        } else {
            _oChild.alpha = _iAlpha;
        }    
    };
    
    this.getAlpha = function(){
        return _iAlpha;
    };
    
    this.setVisible = function(bVisible){
        _bVisible = bVisible;
        if(typeof _oParentContainer !== "undefined"){
            _oChild.visible = _oParentContainer.getVisible && _bVisible;
        } else {
            _oChild.visible = _bVisible;
        }    
    };
    
    this.getVisible = function(){
        return _bVisible;
    };
    
    this.getChild = function(){
        return _oChild;
    };
    
    
    
    this._init(iX, iY, oChild, oParentContainer);
    
}
