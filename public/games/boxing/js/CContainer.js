function CContainer(iX, iY){
    
    var _bVisible = true;
    
    var _iX = 0;
    var _iY = 0;
    var _iTweenCont = 0;
    var _iScaleX = 1;
    var _iScaleY = 1;
    var _iAlpha = 1;
    var _oParent;
    var _aChild;
    
    this._init = function(iX, iY){

        _iX = iX;
        _iY = iY;
        
        _aChild = new Array();
        
    };
    
    this.addChild = function(){

        for(var i=0; i<arguments.length; i++){
            s_oStage.addChild(arguments[i].getChild());
            _aChild.push(arguments[i]);
            
            arguments[i].setAllParameter(this);

        }
    };  
    
    this.removeChild = function(){
               
        for(var i=0; i<arguments.length; i++){
            
            for(var j=0; j<_aChild.length; j++){
                if(arguments[i] === _aChild[j]){
                    _aChild.splice(1,j);
                    s_oStage.removeChild(arguments[i].getChild());
                }
            }            
        }        
        
    };
    
    this.removeAllChildren = function(){
        for(var i=0; i<_aChild.length; i++){
            s_oStage.removeChild(_aChild[i].getChild());
        }
    };
    
    this.setX = function(iX){
        _iX = iX;
        for(var i=0; i<_aChild.length; i++){
            _aChild[i].getChild().x = _aChild[i].getX() + _iX;
        }
        
    };
    
    this.getX = function(){
        return _iX;
    };
    
    this.setY = function(iY){
        _iY = iY;
        for(var i=0; i<_aChild.length; i++){
            _aChild[i].getChild().y = _aChild[i].getY() + _iY;
        }
    };
    
    this.getY = function(){
        return _iY;
    };
    
    this.setScaleX = function(iScale){
        _iScaleX = iScale;
        for(var i=0; i<_aChild.length; i++){
            var iOldRegX = _aChild[i].getChild().regX;
            var iNewRegX = (_aChild[i].getChild().x - _iX);
            
            _aChild[i].setRegX(iNewRegX);
            
            _aChild[i].getChild().scaleX = _aChild[i].getScaleX() * _iScaleX;

            _aChild[i].setRegX(iOldRegX);

        }
    };
    
    this.getScaleX = function(){
        return _iScaleX;
    };
    
    this.setScaleY = function(iScale){
        _iScaleY = iScale;
        for(var i=0; i<_aChild.length; i++){
            _aChild[i].getChild().scaleY = _aChild[i].getScaleY() * _iScaleY;
        }
    };
    
    this.getScaleY = function(){
        return _iScaleY;
    };
    
    this.setAlpha = function(iAlpha){
        _iAlpha = iAlpha;
        for(var i=0; i<_aChild.length; i++){
            _aChild[i].getChild().alpha = _aChild[i].getAlpha() *_iAlpha;
        }
    };
    
    this.getAlpha = function(){
        return _iAlpha;
    };
    
    this.setVisible = function(bVal){
        _bVisible = bVal;
        for(var i=0; i<_aChild.length; i++){
           _aChild[i].getChild().visible = _aChild[i].getVisible() && _bVisible;
        }
    };
    
    this.getVisible = function(){
        return _bVisible;
    };
    
    
    this.setTween = function(oProperty, iTime, callback){
      
        for(var i=0; i<_aChild.length; i++){
        
            var oProp = oProperty;
            var iLength = Object.keys(oProp).length;
            for (var k=0; k< iLength; k++){
                var oItem = Object.keys(oProp)[k];

                switch(oItem){

                    case "x":{
                            _iX = oProperty.x;
                            oProp.x += _aChild[i].getX();
                            break;
                    }
                    case "y":{
                            _iY = oProperty.y;
                            oProp.y += _aChild[i].getY();
                            break;
                    }
                    case "scaleX":{
                            _iScaleX = oProperty.scaleX;
                            oProp.scaleX *= _aChild[i].getScaleX();
                            break;
                    }
                    case "scaleY":{
                            _iScaleY = oProperty.scaleY;
                            oProp.scaleY *= _aChild[i].getScaleY();
                            break;
                    }
                    case "alpha":{
                            _iAlpha = oProperty.alpha;
                            oProp.alpha *= _aChild[i].getAlpha();
                            break;
                    }
                }
            }
            
            createjs.Tween.get(_aChild[i].getChild()).to(oProp, iTime).call(function(){
                if(typeof callback === "function"){
                    _oParent._onTweenFinish(callback);
                }       
            });
            
        }
        
        
    };
    
     this._onTweenFinish = function(callback){
         _iTweenCont++;
         if(_iTweenCont=== _aChild.length){
             _iTweenCont = 0;
             callback();
         }
         
     };
     
    this._testTween = function(){
        for(var i=0; i<_aChild.length; i++){
            
            var iNewRegX = (_iX - _aChild[i].getChild().x);
            _aChild[i].setRegX(iNewRegX);
            _aChild[1].setX(75);

            createjs.Tween.get(_aChild[i].getChild()).to({scaleX : 0.5}, 3000);
        }
            
    };
    _oParent=this;
    this._init(iX, iY);
}


