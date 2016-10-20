//TIC TAC TOE SETUP

//use these settings to change the appearance of the X's and O's in the game. If an image is not found, game default will be used.

var iconForX = ''; 	// Sets the icon image to use instead of X (e.g. 'icons/x.png').
var iconForO = '';	// Sets the icon image to use instead of O. (e.g. 'icons/o.png').


// Nothing needs to be done with the stuff below, (unless you know what you're doing :p)
(function(window,a,b){config={cache:{},icons:{x:a,o:b}};window.Config=config;})(window,iconForX,iconForO);