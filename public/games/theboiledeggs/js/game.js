////////////////////////////////////////////////////////////
// GAME
////////////////////////////////////////////////////////////

/*!
 * 
 * GAME SETTING CUSTOMIZATION START
 * 
 */
 
//Game Text
var bgColour = '#f4eee0';
var playBackgroundMusic = true; //toggle background music

var cookButtonText = 'COOK'; //gameplay cook text button
var heatButtonText = 'BURN'; //gameplay burn text button
var mistakeText = 'MISTAKE :'; //text for gameplay mistake, [NUMBER] will replace with value
var scoreText = 'SCORE : [NUMBER]'; //text for gameplay score, [NUMBER] will replace with value
var resultTitleText = 'GAME OVER!'; //text for result page title
var resultScoreText = 'Your best score is [NUMBER]'; //text for result page score

var totalMistake = 3; //total mistakes
var gameScore = 100; //game score
var targetScore = 100; //score target to increase game speed, it will multiplied for next speed eg.(100, 200, 400, 800...)
var burnerIncreaseSpeed = .005; //burn meter speed to increase game speed
var burnerButtonSpeed = .8; //burn meter button speed

var startCookCountdown = 5; //countdown for auto start cook
var waterBoilTime = 6000; //total boil time 6 sec
var waterStartBoilTime = 5000; //water start boil animation time 5 sec (note timer must set lower than waterBoilTime);
var potWidth = 150; //pot width
var potWaterHeight = 40; //pot water height
var eggDropHeight = 60; //total height for egg drop aniamtion

//types of eggs name and cook time
var eggTypes_arr = [{name:'Soft Boiled Eggs', time:60000},
					{name:'Half Boiled Eggs', time:120000},
					{name:'Boiled Eggs', time:180000}];
var eggAdditionalRandomTimer = 6000; //total random timer to plus
var boilingText = 'Boiling water...'; //boiling water text
var gameScoreText = 'Good!'; //score text
var failedScoreText = 'Overcooked!'; //fail text

//Social share, [SCORE] will replace with game score
var shareOption = true; //toggle share option
var shareText ='SHARE NOW...'; //text for share instruction
var shareTitle = 'Highscore on The Boiled Eggs is [SCORE]';//social share score title
var shareMessage = '[SCORE] is mine new highscore on The Boiled Eggs! Try it now!'; //social share score message

/*!
 *
 * GAME SETTING CUSTOMIZATION END
 *
 */
var user_data = {score:0, mistake:0, heat:.03, oriHeat:.03};

var boilBubbles_setting = [{time:0, amount:3, speed:.5},
						{time:2000, amount:5, speed:.3},
						{time:4500, amount:6, speed:.1}];
						
var cookBubbles_setting = [{stat:'normal', amount:6, speed:.5},
						{stat:'warning', amount:8, speed:.3},
						{stat:'burning', amount:10, speed:.1}];
						
var eggs_position = [{x1:-12, y1:-32, rota1:15, x2:36, y2:-30, rota2:-45},
					{x1:4, y1:-23, rota1:-90, x2:53, y2:-32, rota2:0},
					{x1:-39, y1:-30, rota1:-150, x2:10, y2:-32, rota2:-15},
					{x1:-3, y1:-32, rota1:11, x2:43, y2:-32, rota2:-7}];

var openPotNum = 0;
var pots_arr = [{x:234, y: 210, buttonCount:0, bubbleNum:0, bubbleSpeed:0, bubbleAmount:0, bubbleTimer:0, interval:'', step:'', type:'', timer:0, cook:false},
				{x:512, y: 210, buttonCount:0, bubbleNum:0, bubbleSpeed:0, bubbleAmount:0, bubbleTimer:0, interval:'', step:'', type:'', timer:0, cook:false},
				{x:790, y: 210, buttonCount:0, bubbleNum:0, bubbleSpeed:0, bubbleAmount:0, bubbleTimer:0, interval:'', step:'', type:'', timer:0, cook:false},
				{x:234, y: 530, buttonCount:0, bubbleNum:0, bubbleSpeed:0, bubbleAmount:0, bubbleTimer:0, interval:'', step:'', type:'', timer:0, cook:false},
				{x:512, y: 530, buttonCount:0, bubbleNum:0, bubbleSpeed:0, bubbleAmount:0, bubbleTimer:0, interval:'', step:'', type:'', timer:0, cook:false},
				{x:790, y: 530, buttonCount:0, bubbleNum:0, bubbleSpeed:0, bubbleAmount:0, bubbleTimer:0, interval:'', step:'', type:'', timer:0, cook:false}];

/*!
 * 
 * GAME BUTTONS - This is the function that runs to setup button event
 * 
 */
function buildGameButton(){
	buttonStart.cursor = "pointer";
	buttonStart.addEventListener("click", function(evt) {
		playSound('soundButton');
		goPage('tutorial');
	});
	
	buttonGotIt.cursor = "pointer";
	buttonGotIt.addEventListener("click", function(evt) {
		playSound('soundButton');
		goPage('game');
	});
	
	for(n=0;n<pots_arr.length;n++){
		$.buttons[n+'_cook'].cursor = "pointer";
		$.buttons[n+'_cook'].id = n;
		$.buttons[n+'_cook'].addEventListener("click", function(evt) {
			evt.preventDefault();
			startCook(evt.target.id);
		});
		
		$.buttons[n+'_burn'].cursor = "pointer";
		$.buttons[n+'_burn'].id = n;
		$.buttons[n+'_burn'].addEventListener("mousedown", function(evt) {
			evt.preventDefault();
			pots_arr[evt.target.id].heatUp = true;
			playSound('soundBurn');
		});
		
		$.buttons[n+'_burn'].addEventListener("pressup", function(evt) {
			evt.preventDefault();
			pots_arr[evt.target.id].heatUp = false;
		});
	}
	
	buttonReplay.cursor = "pointer";
	buttonReplay.addEventListener("click", function(evt) {
		playSound('soundButton');
		goPage('tutorial');
	});
	
	iconFacebook.cursor = "pointer";
	iconFacebook.addEventListener("click", function(evt) {
		share('facebook');
	});
	iconTwitter.cursor = "pointer";
	iconTwitter.addEventListener("click", function(evt) {
		share('twitter');
	});
	iconGoogle.cursor = "pointer";
	iconGoogle.addEventListener("click", function(evt) {
		share('google');
	});
}

/*!
 * 
 * DISPLAY PAGES - This is the function that runs to display pages
 * 
 */
var curPage=''
function goPage(page){
	curPage=page;
	
	mainContainer.visible=false;
	tutorialContainer.visible=false;
	gameContainer.visible=false;
	resultContainer.visible=false;
	
	var targetContainer = ''
	switch(page){
		case 'main':
			targetContainer = mainContainer;
			if(playBackgroundMusic){
				stopSoundLoop('musicGame');
				playSoundLoop('musicMenu');
			}
		break;
		
		case 'tutorial':
			targetContainer = tutorialContainer;
		break;
		
		case 'game':
			if(playBackgroundMusic){
				stopSoundLoop('musicMenu');
				playSoundLoop('musicGame');
			}
				
			targetContainer = gameContainer;
			resetGame();
			startGame();
		break;
		
		case 'result':
			targetContainer = resultContainer;
			if(playBackgroundMusic){
				stopSoundLoop('musicGame');
				playSoundLoop('musicMenu');
			}
			
			resultScoreTxt.text = resultScoreText.replace('[NUMBER]', user_data.score);
		break;
	}
	
	targetContainer.alpha=0;
	targetContainer.visible=true;
	$(targetContainer)
	.clearQueue()
	.stop(true,true)
	.animate({ alpha:1 }, 500);
}

/*!
 * 
 * START GAME - This is the function that runs to start play game
 * 
 */
function startGame(){
	user_data.score = 0;
	updateScore(0);
	checkPots();
}

function resetGame(){
	user_data.heat = user_data.oriHeat;
	user_data.targetScore = targetScore;
	user_data.mistake = totalMistake;
	updateMistake();
	
	openPotNum = 1;
	
	for(n=0;n<pots_arr.length;n++){
		for(p=0;p<pots_arr[n].bubbleNum;p++){
			if($.bubbles[n+'_'+p] != undefined){
				TweenMax.killTweensOf($.bubbles[n+'_'+p]);
				$.bubblesContainer[n].removeChild($.bubbles[n+'_'+p]);
				$.bubbles[n+'_'+p] = null;
			}
			$.bubblesContainer[n].removeAllChildren();
		}
		
		TweenMax.killTweensOf($.water[n]);
		TweenMax.killTweensOf($.pot[n]);
		TweenMax.killTweensOf(pots_arr[n]);
		TweenMax.killTweensOf($.eggs[n+'_1']);
		TweenMax.killTweensOf($.eggs[n+'_1']);
		
		$.txt[n+'_progress'].text = '';
		$.txt[n+'_button_text'].text = '';
		pots_arr[n].step = 0;
		pots_arr[n].cook = false;
		$.pot[n].alpha = .3;
		$.water[n].visible = false;
		$.buttons[n+'_cook'].visible = false;
		$.buttons[n+'_burn'].visible = false;
		
		$.result[n+'_result_fire'].gotoAndStop('static');
		$.result[n+'_result_fire'].visible = false;
		
		$.heat[n+'_bar'].visible = false;
		$.heat[n+'_indicator'].visible = false;
		$.timer[n+'_icon'].visible = false;
		$.timer[n+'_indicator'].visible = false;
		$.timer[n+'_indicator'].rotation = 0;
		
		$.heat[n+'_indicator'].x = $.heat[n+'_bar'].x;
		
		$.eggs[n+'_1'].visible = false;
		$.eggs[n+'_2'].visible = false;
		$.eggs[n+'_soft'].visible = false;
		$.eggs[n+'_half'].visible = false;
		$.eggs[n+'_hard'].visible = false;
		
		$.eggs[n+'_result_soft'].visible = false;
		$.eggs[n+'_result_half'].visible = false;
		$.eggs[n+'_result_hard'].visible = false;
		
		$.result[n+'_result_fire'].gotoAndStop('static');
		$.result[n+'_result_fire'].visible = false;
		
		clearInterval(pots_arr[n].interval);
		pots_arr[n].interval = null;
	}
}

 /*!
 * 
 * STOP GAME - This is the function that runs to stop play game
 * 
 */
function stopGame(){
	resetGame();
	goPage('result');
}

 /*!
 * 
 * CHECK POTS - This is the function that runs to check total pots can cook
 * 
 */
function checkPots(){
	for(n=0;n<pots_arr.length;n++){
		if(n < openPotNum && !pots_arr[n].cook){
			chooseEggTypes(n);
		}
	}
}

 /*!
 * 
 * CHOOSE MENU - This is the function that runs to prepare types for cooking
 * 
 */
function chooseEggTypes(num){
	pots_arr[num].step = 1;
	pots_arr[num].count = startCookCountdown;
	$.txt[num+'_button_text'].text = cookButtonText+' ('+pots_arr[num].count+'s)';;
	pots_arr[num].interval = setInterval(updatePot, 1000, num);
	
	$.eggs[num+'_result_soft'].visible = false;
	$.eggs[num+'_result_half'].visible = false;
	$.eggs[num+'_result_hard'].visible = false;
	
	pots_arr[num].cook = true;
	pots_arr[num].type = Math.round(Math.random()*2);
	
	if(pots_arr[num].type == 0){
		$.eggs[num+'_soft'].visible = true;
	}else if(pots_arr[num].type == 1){
		$.eggs[num+'_half'].visible = true;
	}else if(pots_arr[num].type == 2){
		$.eggs[num+'_hard'].visible = true;
	}
	$.txt[num+'_progress'].text = eggTypes_arr[pots_arr[num].type].name;
	
	$.buttons[num+'_cook'].visible = true;
	$.result[num+'_result_fire'].gotoAndStop('static');
	$.result[num+'_result_fire'].visible = false;
}

 /*!
 * 
 * START COOK - This is the function that runs to start boiling water
 * 
 */
function startCook(num){
	pots_arr[num].bubbleNum = 0;
	pots_arr[num].bubbleTimer = 0;
	pots_arr[num].step = 2;
	
	$.txt[num+'_button_text'].text = '';
	clearInterval(pots_arr[num].interval);
	pots_arr[num].interval = setInterval(updatePot, 100, num);
	
	$.buttons[num+'_cook'].visible=false;
	$.pot[num].alpha = 1;
	
	$.eggs[num+'_soft'].visible = false;
	$.eggs[num+'_half'].visible = false;
	$.eggs[num+'_hard'].visible = false;
	$.txt[num+'_progress'].text = boilingText;
	
	var waterY = pots_arr[num].y + ($.pot[num].image.naturalHeight/2);
	$.water[num].y = pots_arr[num].y + ($.pot[num].image.naturalHeight/2);
	waterY -= potWaterHeight+5;
	$.water[num].gotoAndStop('static');
	$.water[num].visible = true;
	TweenMax.to($.water[num], 1, {y:waterY, overwrite:true, ease:Linear.easeNone});
	
	playSound('waterPour');
}

 /*!
 * 
 * LOOP FOR EACH POT - This is the function that runs to loop for each pots
 * 
 */
function updatePot(num){
	pots_arr[num].bubbleTimer += 100;
	
	if(pots_arr[num].step == 1){
		if(pots_arr[num].count <= 1){
			startCook(num);
		}else{
			pots_arr[num].count -= 1;
			$.txt[num+'_button_text'].text = cookButtonText+' ('+pots_arr[num].count+'s)';
		}
	}else if(pots_arr[num].step == 2){
		if(pots_arr[num].bubbleTimer > waterBoilTime){
			lowerEggs(num);
		}
		
		if(pots_arr[num].bubbleTimer > waterStartBoilTime && $.water[num].currentAnimation == 'static'){
			playSound('waterBoiling2');
			$.water[num].gotoAndPlay('boil');
		}
		
		for(n=$.bubblesContainer[num].getNumChildren(); n<pots_arr[num].bubbleAmount; n++){
			createBubbles(num);
		}
		
		for(n=0; n<boilBubbles_setting.length; n++){
			if(pots_arr[num].bubbleTimer > boilBubbles_setting[n].time){
				pots_arr[num].bubbleSpeed = boilBubbles_setting[n].speed;
				pots_arr[num].bubbleAmount = boilBubbles_setting[n].amount;
			}
		}
	}else if(pots_arr[num].step == 3){
		for(n=$.bubblesContainer[num].getNumChildren(); n<pots_arr[num].bubbleAmount; n++){
			createBubbles(num);
		}
		
		pots_arr[num].timer -= 1000;
		$.timer[num+'_indicator'].rotation = 360 - (pots_arr[num].timer/pots_arr[num].totalTimer * 360);
		
		if(pots_arr[num].timer <= 0){
			displayCookResult(num, true);	
		}
	}
}

 /*!
 * 
 * HEAT METER - This is the function that runs to update heat meter
 * 
 */
var burnSoundLoop = false;
var boilingSoundLoop = false;
function updateHeatIndicator(num){
	var barTotal = $.heat[num+'_bar'].image.naturalWidth/2;
	var barCenterX = $.heat[num+'_bar'].x;
	
	if(pots_arr[num].heatUp){
		pots_arr[num].heat += burnerButtonSpeed;
	}else{
		pots_arr[num].heat -= (Math.random()*5)*user_data.heat;
	}
	pots_arr[num].heat = pots_arr[num].heat >= barTotal ? barTotal : pots_arr[num].heat;
	pots_arr[num].heat = pots_arr[num].heat <= 0-barTotal ? 0-barTotal : pots_arr[num].heat;
	
	pots_arr[num].bubbleSpeed = cookBubbles_setting[0].speed;
	pots_arr[num].bubbleAmount = cookBubbles_setting[0].amount;
		
	if(Math.abs(pots_arr[num].heat) >= barTotal/100 * 45){
		pots_arr[num].burn += 1;
		pots_arr[num].bubbleSpeed = cookBubbles_setting[2].speed;
		pots_arr[num].bubbleAmount = cookBubbles_setting[2].amount;
	}else if(Math.abs(pots_arr[num].heat) >= barTotal/100 * 25){
		pots_arr[num].bubbleSpeed = cookBubbles_setting[1].speed;
		pots_arr[num].bubbleAmount = cookBubbles_setting[1].amount;
		pots_arr[num].burn -= 1;
	}else{
		pots_arr[num].burn -= 1;	
	}
	pots_arr[num].burn = pots_arr[num].burn <= 0 ? 0 : pots_arr[num].burn;
	
	TweenMax.to(pots_arr[num], 1, {heatIndicator:pots_arr[num].heat, overwrite:true});
	$.heat[num+'_indicator'].x = barCenterX + pots_arr[num].heatIndicator;
	
	if(pots_arr[num].burn > 50){
		displayCookResult(num, false);	
	}
}

 /*!
 * 
 * LOOP GAME - This is the function that runs to loop game
 * 
 */
function updateGame(){
	var heatUp = false;
	var boiling = false;
	
	for(n=0;n<pots_arr.length;n++){
		if(pots_arr[n].step == 3){
			boiling = true;
			updateHeatIndicator(n);
			
			if(pots_arr[n].heatUp){
				heatUp = true;
			}
		}
	}
	
	if(heatUp){
		if(!burnSoundLoop){
			burnSoundLoop = true;
			playSoundLoop('soundBurning');
		}
	}else{
		burnSoundLoop = false;
		stopSoundLoop('soundBurning');
	}
	
	if(boiling){
		if(!boilingSoundLoop){
			boilingSoundLoop = true;
			playSoundLoop('waterBoiling');
		}
	}else{
		boilingSoundLoop = false;
		stopSoundLoop('waterBoiling');
	}
}

 /*!
 * 
 * CREATE BUBBLES - This is the function that runs to create bubbles
 * 
 */
var bubbleW = 5;
function createBubbles(num){
	 var bubbleNum = pots_arr[num].bubbleNum;
	 pots_arr[num].bubbleNum++;
	 
	 $.bubbles[num+'_'+bubbleNum] = new createjs.Shape();
	 $.bubbles[num+'_'+bubbleNum].id = num+'_'+bubbleNum;
	 $.bubblesContainer[num].addChild($.bubbles[num+'_'+bubbleNum]);
	 
	 resetBubbles(num, num+'_'+bubbleNum);
}

function resetBubbles(num, bubbleNum){
	var curBubbleW = (Math.random()*bubbleW)+(bubbleW/2);
	$.bubbles[bubbleNum].graphics.clear();
	$.bubbles[bubbleNum].graphics.setStrokeStyle(2).beginStroke("#000000").drawCircle(0,0,curBubbleW);
	$.bubbles[bubbleNum].y = 0 - curBubbleW;
	$.bubbles[bubbleNum].x = (Math.random()*potWidth) - (potWidth/2);
	
	var delayNum = (Math.random() * 9) * .1;
	$.bubbles[bubbleNum].alpha = 0;
	
	var bubbleSpeed = (Math.random() * 9)*.01;
	bubbleSpeed += pots_arr[num].bubbleSpeed
	TweenMax.to($.bubbles[bubbleNum], bubbleSpeed, {delay:delayNum, y:-potWaterHeight, overwrite:true, onComplete:finishBubbleAnimation, onCompleteParams:[num, bubbleNum], onStart:function(){
		$.bubbles[bubbleNum].alpha = 1;
	}, ease:Linear.easeNone});
}

function finishBubbleAnimation(num, bubbleNum){
	if($.bubblesContainer[num].getNumChildren() > pots_arr[num].bubbleAmount){
		 $.bubblesContainer[num].removeChild($.bubbles[bubbleNum]);
	}else{
		resetBubbles(num, bubbleNum);
	}
}

 /*!
 * 
 * LOWER EGGS - This is the function that runs to lower the eggs
 * 
 */
function lowerEggs(num){
	pots_arr[num].step = 3;
	pots_arr[num].burn = 0;
	pots_arr[num].heat = 0;
	pots_arr[num].heatIndicator = 0;
	pots_arr[num].heatUp = false;
	burnSoundLoop = false;
	boilingSoundLoop = false;
	pots_arr[num].totalTimer = eggTypes_arr[pots_arr[num].type].time;
	pots_arr[num].totalTimer += Math.random()*eggAdditionalRandomTimer;
	pots_arr[num].timer = pots_arr[num].totalTimer;
	
	var egg1 = num+'_1';
	var egg2 = num+'_2';
	
	var randomEggNum = Math.round(Math.random()*(eggs_position.length-1));
	var potBottotmY = pots_arr[num].y + ($.pot[num].image.naturalHeight/2);
	$.eggs[egg1].visible = true;
	$.eggs[egg1].x = pots_arr[num].x + eggs_position[randomEggNum].x1;
	$.eggs[egg1].y = potBottotmY - eggDropHeight;
	$.eggs[egg1].newY = potBottotmY + eggs_position[randomEggNum].y1;
	$.eggs[egg1].rotation = eggs_position[randomEggNum].rota1;
	
	$.eggs[egg2].visible = true;
	$.eggs[egg2].x = pots_arr[num].x + eggs_position[randomEggNum].x2;
	$.eggs[egg2].y = potBottotmY - eggDropHeight;
	$.eggs[egg2].newY = potBottotmY + eggs_position[randomEggNum].y2;
	$.eggs[egg2].rotation = eggs_position[randomEggNum].rota2;
	
	var eggDropSpeed1 = ((Math.random()*3)*.1)+.3;
	var eggDropSpeed2 = ((Math.random()*3)*.1)+.3;
	
	playSound('eggDrop');
	TweenMax.to($.eggs[egg1], eggDropSpeed1, {y:$.eggs[egg1].newY, overwrite:true});
	TweenMax.to($.eggs[egg2], eggDropSpeed2, {y:$.eggs[egg2].newY, overwrite:true, onComplete:function(){
		$.heat[num+'_bar'].visible = true;
		$.heat[num+'_indicator'].visible = true;
		$.timer[num+'_icon'].visible = true;
		$.timer[num+'_indicator'].visible = true;
		$.timer[num+'_indicator'].rotation = 0;
		
		$.txt[num+'_progress'].text = '';
		$.txt[num+'_button_text'].text = heatButtonText;
		$.buttons[num+'_burn'].visible = true;
		
		animateTimerIcon($.timer[num+'_icon']);
		animateTimerIcon($.timer[num+'_indicator']);
	}});
}

 /*!
 * 
 * ANIMATE TIMER ICON - This is the function that runs to animate timer icon
 * 
 */
function animateTimerIcon(obj){
	obj.alpha=1;
	$(obj)
	.animate({ alpha:.1}, 500)
	.animate({ alpha:1}, 500, function(){
		animateTimerIcon(obj);	
	});	
}

 /*!
 * 
 * DISPLAY COOK RESULT - This is the function that runs to display cook result
 * 
 */
function displayCookResult(num, con){
	pots_arr[num].step = 4;
	$.txt[num+'_button_text'].text = '';
	
	pots_arr[num].bubbleSpeed = boilBubbles_setting[0].speed;
	pots_arr[num].bubbleAmount = boilBubbles_setting[0].amount;
	
	for(n=0;n<pots_arr[num].bubbleNum;n++){
		if($.bubbles[num+'_'+n] != undefined){
			TweenMax.killTweensOf($.bubbles[num+'_'+n]);
			$.bubblesContainer[num].removeChild($.bubbles[num+'_'+n]);
			$.bubbles[num+'_'+n] = null;
		}
	}
	$.bubblesContainer[num].removeAllChildren();
	
	$.heat[num+'_bar'].visible = false;
	$.heat[num+'_indicator'].visible = false;
	$.timer[num+'_icon'].visible = false;
	$.timer[num+'_indicator'].visible = false;
	$.buttons[num+'_burn'].visible = false;
	
	pots_arr[num].bubbleNum = 0;
	pots_arr[num].bubbleTimer = 0;
	clearInterval(pots_arr[num].interval);
	pots_arr[num].interval = null;
	
	$.eggs[num+'_1'].visible = false;
	$.eggs[num+'_2'].visible = false;
	$.pot[num].alpha = .3;
	$.water[num].visible = false;
	
	if(!con){
		eggResult = failedScoreText;
		user_data.mistake--;
		updateMistake();
		$.result[num+'_result_fire'].visible = true;
		$.result[num+'_result_fire'].gotoAndPlay('anime');
		playSound('soundFire');
		
		$.txt[num+'_progress'].text = eggResult;
		
		prepareNextPot(num, 2);
	}else{
		playSound('eggCrack');
		
		if(pots_arr[num].type == 0){
			$.eggs[num+'_result_soft'].visible = true;
			$.eggs[num+'_result_soft'].gotoAndPlay('anime');
		}else if(pots_arr[num].type == 1){
			$.eggs[num+'_result_half'].visible = true;
			$.eggs[num+'_result_half'].gotoAndPlay('anime');
		}else if(pots_arr[num].type == 2){
			$.eggs[num+'_result_hard'].visible = true;
			$.eggs[num+'_result_hard'].gotoAndPlay('anime');
		}
		
		TweenMax.to($.pot[num], .8, {overwrite:true, onComplete:function(){
			updateScore(gameScore);
			$.txt[num+'_progress'].text = gameScoreText;
			
			prepareNextPot(num, 1);
		}});
	}
}

 /*!
 * 
 * PREPARE NEXT POT/MENU - This is the function that runs to prepare next pot/menu
 * 
 */
function prepareNextPot(num, speed){
	TweenMax.to($.pot[num], speed, {overwrite:true, onComplete:function(){
		chooseEggTypes(num);
		
		if(user_data.mistake <= 0){
			stopGame();
		}else if(user_data.score >= user_data.targetScore){
			user_data.targetScore += user_data.targetScore;
			user_data.heat += burnerIncreaseSpeed;
			openPotNum += 1;
			checkPots();
		}
	}});	
}

 /*!
 * 
 * UPDATE SCORE - This is the function that runs to update game score
 * 
 */
function updateScore(score){
	user_data.score += score;
	scoreTxt.text = scoreText.replace('[NUMBER]', user_data.score);
	
	if(score !=0)
		playSound('soundScore');
}

 /*!
 * 
 * UPDATE MISTAKE - This is the function that runs to update game mistake
 * 
 */
function updateMistake(num){
	for(n=0; n<totalMistake; n++){
		if(n < user_data.mistake){
			$.eggs[n+'_mistake'].alpha = 1;
		}else{
			$.eggs[n+'_mistake'].alpha = .3;
		}
	}
}

/*!
 * 
 * SHARE - This is the function that runs to open share url
 * 
 */
function share(action){
	var loc = location.href
	loc = loc.substring(0, loc.lastIndexOf("/") + 1);
	var title = '';
	var text = '';
	title = shareTitle.replace("[SCORE]", user_data.score);
	text = shareMessage.replace("[SCORE]", user_data.score);
	var shareurl = '';
	
	if( action == 'twitter' ) {
		shareurl = 'https://twitter.com/intent/tweet?url='+loc+'&text='+text;
	}else if( action == 'facebook' ){
		shareurl = 'http://www.facebook.com/sharer.php?u='+encodeURIComponent(loc+'share.php?desc='+text+'&title='+title+'&url='+loc+'&thumb='+loc+'share.jpg');
	}else if( action == 'google' ){
		shareurl = 'https://plus.google.com/share?url='+loc;
	}
	
	window.open(shareurl);
}