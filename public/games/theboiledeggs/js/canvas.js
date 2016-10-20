////////////////////////////////////////////////////////////
// CANVAS
////////////////////////////////////////////////////////////
var stage
var canvasW=0;
var canvasH=0;

/*!
 * 
 * START GAME CANVAS - This is the function that runs to setup game canvas
 * 
 */
function initGameCanvas(w,h){
	canvasW=w;
	canvasH=h;
	stage = new createjs.Stage("gameCanvas");
	
	createjs.Touch.enable(stage);
	stage.enableMouseOver(20);
	stage.mouseMoveOutside = true;
	
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", tick);	
}

var canvasContainer, mainContainer, tutorialContainer, popContainer, gameContainer, resultContainer;
var bg, logo, buttonStart, tutorial, buttonGotIt, waterData, scoreTxt, mistakeTxt, resultTitleTxt, resultScoreTxt, buttonReplay, iconFacebook, iconTwitter, iconGoogle, shareTxt;

$.pot={};
$.bubblesContainer={};
$.bubbles={};
$.water={};
$.buttons={};
$.eggs={};
$.txt={};
$.result={};
$.heat={};
$.timer={};

/*!
 * 
 * BUILD GAME CANVAS ASSERTS - This is the function that runs to build game canvas asserts
 * 
 */
function buildGameCanvas(){
	canvasContainer = new createjs.Container();
	mainContainer = new createjs.Container();
	tutorialContainer = new createjs.Container();
	gameContainer = new createjs.Container();
	popContainer = new createjs.Container();
	resultContainer = new createjs.Container();
	
	bg = new createjs.Shape();
	bg.graphics.beginFill(bgColour).drawRect(0, 0, canvasW, canvasH);
	
	logo = new createjs.Bitmap(loader.getResult('logo'));
	centerReg(logo);
	logo.x = canvasW/2;
	logo.y = canvasH/100 * 45;
	
	buttonStart = new createjs.Bitmap(loader.getResult('buttonStart'));
	centerReg(buttonStart);
	buttonStart.x = canvasW/2;
	buttonStart.y = canvasH/100 * 80;
	
	tutorial = new createjs.Bitmap(loader.getResult('tutorial'));
	buttonGotIt = new createjs.Bitmap(loader.getResult('buttonGotIt'));
	centerReg(buttonGotIt);
	buttonGotIt.x = canvasW/100 * 77;
	buttonGotIt.y = canvasH/100 * 83;
	
	var _frameW=183;
	var _frameH=10;
	var _frame = {"regX": (_frameW/2), "regY": (_frameH/2), "height": _frameH, "count": 3, "width": _frameW};
	var _animations = {static:{frames: [0]},
						boil:{frames: [1,2], speed: 1, next:'boil'}};
	//game
	waterData = new createjs.SpriteSheet({
		"images": [loader.getResult("water").src],
		"frames": _frame,
		"animations": _animations
	});
	
	var frameSpeed = 1;
	var _frame = {"regX":70, "regY":50, "height": 188, "width": 147, "count": 10};
	var _animations = {static:{frames: [0]}, anime:{frames: [1,2,3,4,5,6,7,8,9], speed: frameSpeed, next:'last'}, last:{frames: [9], speed: frameSpeed}};
	
	$.eggs['result_soft'] = new createjs.SpriteSheet({
		"images": [loader.getResult('eggSoftResult').src],
		"frames": _frame,
		"animations": _animations
	});
	
	var _frame = {"regX":70, "regY":50, "height": 150, "width": 147, "count": 10};
	var _animations = {static:{frames: [0]}, anime:{frames: [1,2,3,4,5,6,7,8,9], speed: frameSpeed, next:'last'}, last:{frames: [9], speed: frameSpeed}};
	$.eggs['result_half'] = new createjs.SpriteSheet({
		"images": [loader.getResult('eggHalfResult').src],
		"frames": _frame,
		"animations": _animations
	});
	
	var _frame = {"regX":70, "regY":50, "height": 115, "width": 147, "count": 10};
	var _animations = {static:{frames: [0]}, anime:{frames: [1,2,3,4,5,6,7,8,9], speed: frameSpeed, next:'last'}, last:{frames: [9], speed: frameSpeed}};
	$.eggs['result_hard'] = new createjs.SpriteSheet({
		"images": [loader.getResult('eggHardResult').src],
		"frames": _frame,
		"animations": _animations
	});
	
	var _frame = {"regX":215/2, "regY":121/2, "height": 121, "width": 215, "count": 2};
	var _animations = {static:{frames: [0]}, anime:{frames: [0,0,1,1], speed: frameSpeed, next:'anime'}};
	$.result['result_fire'] = new createjs.SpriteSheet({
		"images": [loader.getResult('fire').src],
		"frames": _frame,
		"animations": _animations
	});
	
	for(n=0;n<pots_arr.length;n++){
		$.pot[n] = new createjs.Bitmap(loader.getResult('pot'));
		centerReg($.pot[n]);
		$.pot[n].x = pots_arr[n].x;
		$.pot[n].y = pots_arr[n].y;
		
		$.bubblesContainer[n] = new createjs.Container();
		$.bubblesContainer[n].x = pots_arr[n].x;
		$.bubblesContainer[n].y = pots_arr[n].y + ($.pot[n].image.naturalHeight/2);
		
		$.water[n] = new createjs.Sprite(waterData, "static");
		$.water[n].framerate = 20;
		$.water[n].x = pots_arr[n].x;
		
		var buttonY = 165;
		$.buttons[n+'_cook'] = new createjs.Bitmap(loader.getResult('buttonCook'));
		centerReg($.buttons[n+'_cook']);
		$.buttons[n+'_cook'].x = pots_arr[n].x;
		$.buttons[n+'_cook'].y = pots_arr[n].y + buttonY;
		
		$.buttons[n+'_burn'] = new createjs.Bitmap(loader.getResult('buttonBurn'));
		centerReg($.buttons[n+'_burn']);
		$.buttons[n+'_burn'].x = pots_arr[n].x;
		$.buttons[n+'_burn'].y = pots_arr[n].y + buttonY;
		
		var buttonTextY = 170;
		$.txt[n+'_button_text'] = new createjs.Text();
		$.txt[n+'_button_text'].font = "35px garglecondensed";
		$.txt[n+'_button_text'].color = "#ffffff";
		$.txt[n+'_button_text'].text = '';
		$.txt[n+'_button_text'].textAlign = "center";
		$.txt[n+'_button_text'].textBaseline='alphabetic';
		$.txt[n+'_button_text'].x = pots_arr[n].x;
		$.txt[n+'_button_text'].y = pots_arr[n].y + buttonTextY;
		
		$.eggs[n+'_1'] = new createjs.Bitmap(loader.getResult('egg'));
		centerReg($.eggs[n+'_1']);
		
		$.eggs[n+'_2'] = new createjs.Bitmap(loader.getResult('egg'));
		centerReg($.eggs[n+'_2']);
		
		$.txt[n+'_progress'] = new createjs.Text();
		$.txt[n+'_progress'].font = "35px garglecondensed";
		$.txt[n+'_progress'].color = "#000000";
		$.txt[n+'_progress'].text = '';
		$.txt[n+'_progress'].textAlign = "center";
		$.txt[n+'_progress'].textBaseline='alphabetic';
		$.txt[n+'_progress'].x = pots_arr[n].x;
		$.txt[n+'_progress'].y = pots_arr[n].y + 120;
		
		$.eggs[n+'_soft'] = new createjs.Bitmap(loader.getResult('eggSoft'));
		centerReg($.eggs[n+'_soft']);
		$.eggs[n+'_soft'].x = pots_arr[n].x;
		$.eggs[n+'_soft'].y = pots_arr[n].y - 10;
		
		$.eggs[n+'_half'] = new createjs.Bitmap(loader.getResult('eggHalf'));
		centerReg($.eggs[n+'_half']);
		$.eggs[n+'_half'].x = pots_arr[n].x;
		$.eggs[n+'_half'].y = pots_arr[n].y - 10;
		
		$.eggs[n+'_hard'] = new createjs.Bitmap(loader.getResult('eggHard'));
		centerReg($.eggs[n+'_hard']);
		$.eggs[n+'_hard'].x = pots_arr[n].x;
		$.eggs[n+'_hard'].y = pots_arr[n].y - 10;
		
		var resultY = 30;
		$.eggs[n+'_result_soft'] = new createjs.Sprite($.eggs['result_soft'], "static");
		$.eggs[n+'_result_soft'].framerate = 20;
		$.eggs[n+'_result_soft'].gotoAndStop('static');
		$.eggs[n+'_result_soft'].x = pots_arr[n].x;
		$.eggs[n+'_result_soft'].y = pots_arr[n].y - resultY;
		
		$.eggs[n+'_result_half'] = new createjs.Sprite($.eggs['result_half'], "static");
		$.eggs[n+'_result_half'].framerate = 20;
		$.eggs[n+'_result_half'].gotoAndStop('static');
		$.eggs[n+'_result_half'].x = pots_arr[n].x;
		$.eggs[n+'_result_half'].y = pots_arr[n].y - resultY;
		
		$.eggs[n+'_result_hard'] = new createjs.Sprite($.eggs['result_hard'], "static");
		$.eggs[n+'_result_hard'].framerate = 20;
		$.eggs[n+'_result_hard'].gotoAndStop('static');
		$.eggs[n+'_result_hard'].x = pots_arr[n].x;
		$.eggs[n+'_result_hard'].y = pots_arr[n].y - resultY;
		
		$.result[n+'_result_fire'] = new createjs.Sprite($.result['result_fire'], "static");
		$.result[n+'_result_fire'].framerate = 20;
		$.result[n+'_result_fire'].gotoAndStop('static');
		$.result[n+'_result_fire'].x = pots_arr[n].x;
		$.result[n+'_result_fire'].y = pots_arr[n].y;
		
		$.heat[n+'_bar'] = new createjs.Bitmap(loader.getResult('barHeat'));
		centerReg($.heat[n+'_bar']);
		$.heat[n+'_bar'].x = pots_arr[n].x;
		$.heat[n+'_bar'].y = pots_arr[n].y + 100;
		
		$.heat[n+'_indicator'] = new createjs.Bitmap(loader.getResult('barHeatIndicator'));
		centerReg($.heat[n+'_indicator']);
		$.heat[n+'_indicator'].x = pots_arr[n].x;
		$.heat[n+'_indicator'].y = pots_arr[n].y + 100;
		
		$.timer[n+'_icon'] = new createjs.Bitmap(loader.getResult('iconTimer'));
		centerReg($.timer[n+'_icon']);
		$.timer[n+'_icon'].x = pots_arr[n].x;
		$.timer[n+'_icon'].y = pots_arr[n].y - 100;
		
		$.timer[n+'_indicator'] = new createjs.Bitmap(loader.getResult('iconTimerIndicator'));
		$.timer[n+'_indicator'].regY = $.timer[n+'_indicator'].image.naturalHeight;
		$.timer[n+'_indicator'].x = pots_arr[n].x;
		$.timer[n+'_indicator'].y = pots_arr[n].y - 100;
		
		gameContainer.addChild($.pot[n], $.eggs[n+'_1'], $.eggs[n+'_2'], $.bubblesContainer[n], $.water[n], $.buttons[n+'_cook'], $.buttons[n+'_burn'], $.txt[n+'_button_text'], $.eggs[n+'_soft'], $.eggs[n+'_half'], $.eggs[n+'_hard'], $.eggs[n+'_result_soft'], $.eggs[n+'_result_half'], $.eggs[n+'_result_hard'], $.result[n+'_result_correct'], $.result[n+'_result_wrong'], $.heat[n+'_bar'], $.heat[n+'_indicator'], $.timer[n+'_icon'], $.timer[n+'_indicator'], $.result[n+'_result_fire'], $.txt[n+'_progress']);
	}
	
	scoreTxt = new createjs.Text();
	scoreTxt.font = "40px garglecondensed";
	scoreTxt.color = "#000000";
	scoreTxt.text = scoreText;
	scoreTxt.textAlign = "right";
	scoreTxt.textBaseline='alphabetic';
	scoreTxt.x = canvasW/100 * 96;
	scoreTxt.y = canvasH/100 * 7;
	
	eggIcon = new createjs.Bitmap(loader.getResult('egg'));
	centerReg(eggIcon);
	eggIcon.x = canvasW/100 * 47;
	eggIcon.y = canvasH/100 * 5;
	
	mistakeTxt = new createjs.Text();
	mistakeTxt.font = "40px garglecondensed";
	mistakeTxt.color = "#000000";
	mistakeTxt.text = mistakeText;
	mistakeTxt.textAlign = "left";
	mistakeTxt.textBaseline='alphabetic';
	mistakeTxt.x = canvasW/100 * 3;
	mistakeTxt.y = canvasH/100 * 7;
	
	var eggStartX = canvasW/100 * 18;
	var eggStartY = canvasH/100 * 5;
	var eggSpace = 45;
	
	for(n=0; n<totalMistake; n++){
		$.eggs[n+'_mistake'] = new createjs.Bitmap(loader.getResult('egg'));
		$.eggs[n+'_mistake'].scaleX = $.eggs[n+'_mistake'].scaleY = .8;
		centerReg($.eggs[n+'_mistake']);
		$.eggs[n+'_mistake'].x = eggStartX;
		$.eggs[n+'_mistake'].y = eggStartY;
		eggStartX+=eggSpace;
		
		gameContainer.addChild($.eggs[n+'_mistake']);
	}
	
	resultTitleTxt = new createjs.Text();
	resultTitleTxt.font = "100px garglecondensed";
	resultTitleTxt.color = "#707070";
	resultTitleTxt.text = resultTitleText;
	resultTitleTxt.textAlign = "center";
	resultTitleTxt.textBaseline='alphabetic';
	resultTitleTxt.x = canvasW/2;
	resultTitleTxt.y = canvasH/100 * 35;
	
	resultScoreTxt = new createjs.Text();
	resultScoreTxt.font = "70px garglecondensed";
	resultScoreTxt.color = "#707070";
	resultScoreTxt.text = resultScoreText;
	resultScoreTxt.textAlign = "center";
	resultScoreTxt.textBaseline='alphabetic';
	resultScoreTxt.x = canvasW/2;
	resultScoreTxt.y = canvasH/100 * 45;
	
	buttonReplay = new createjs.Bitmap(loader.getResult('buttonReplay'));
	centerReg(buttonReplay);
	buttonReplay.x = canvasW/2;
	buttonReplay.y = canvasH/100 * 53;
	
	shareTxt = new createjs.Text();
	shareTxt.font = "50px garglecondensed";
	shareTxt.color = "#707070";
	shareTxt.text = shareText;
	shareTxt.textAlign = "center";
	shareTxt.textBaseline='alphabetic';
	shareTxt.x = canvasW/2;
	shareTxt.y = canvasH/100 * 70;
	
	iconFacebook = new createjs.Bitmap(loader.getResult('iconFacebook'));
	iconTwitter = new createjs.Bitmap(loader.getResult('iconTwitter'));
	iconGoogle = new createjs.Bitmap(loader.getResult('iconGoogle'));
	centerReg(iconFacebook);
	createHitarea(iconFacebook);
	centerReg(iconTwitter);
	createHitarea(iconTwitter);
	centerReg(iconGoogle);
	createHitarea(iconGoogle);
	iconFacebook.x = canvasW/100*40;
	iconTwitter.x = canvasW/2;
	iconGoogle.x = canvasW/100*60;
	iconFacebook.y = iconTwitter.y = iconGoogle.y = canvasH/100 * 80;
	
	mainContainer.addChild(logo, buttonStart);
	tutorialContainer.addChild(tutorial, buttonGotIt);
	gameContainer.addChild(scoreTxt, mistakeTxt, popContainer)
	resultContainer.addChild(resultTitleTxt, resultScoreTxt, buttonReplay);
	if(shareOption){
		resultContainer.addChild(shareTxt, iconFacebook, iconTwitter, iconGoogle);
	}
	canvasContainer.addChild(bg, mainContainer, tutorialContainer, gameContainer, resultContainer);
	stage.addChild(canvasContainer);
	
	resizeCanvas();
}


/*!
 * 
 * RESIZE GAME CANVAS - This is the function that runs to resize game canvas
 * 
 */
function resizeCanvas(){
 	if(canvasContainer!=undefined){
		canvasContainer.scaleX=canvasContainer.scaleY=scalePercent;
	}
}

/*!
 * 
 * REMOVE GAME CANVAS - This is the function that runs to remove game canvas
 * 
 */
 function removeGameCanvas(){
	 stage.autoClear = true;
	 stage.removeAllChildren();
	 stage.update();
	 createjs.Ticker.removeEventListener("tick", tick);
	 createjs.Ticker.removeEventListener("tick", stage);
 }

/*!
 * 
 * CANVAS LOOP - This is the function that runs for canvas loop
 * 
 */ 
function tick(event) {
	updateGame();
	stage.update(event);
}

/*!
 * 
 * CANVAS MISC FUNCTIONS
 * 
 */
function centerReg(obj){
	obj.regX=obj.image.naturalWidth/2;
	obj.regY=obj.image.naturalHeight/2;
}

function createHitarea(obj){
	obj.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, obj.image.naturalWidth, obj.image.naturalHeight));	
}