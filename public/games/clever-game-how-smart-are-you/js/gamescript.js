/*
* Copyright 2014 İsmail Altunören
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/*
*
* Are you clever?
* The JavaScript Game App
* http://codecanyon.net/users/apyazilim
*
* Twitter : @APYazilim
* Web : www.apyazilim.com
*/



var boxcount = 39;
var firstcount = 3;
var startlevel = 1;
var startsecond = 5;
var FACEBOOK_APPID = '1436029243307260';


$(document).ready(function(){
			var title = document.getElementsByTagName("title")[0].innerHTML;
			var realurl = "http://"+window.location.hostname + window.location.pathname;
		
			$("a.facebook").click(function(){
			var totalpoint  = $("a#points").attr('point');
			 FB.ui({ method: 'feed',
					 name: 'I scored "'+totalpoint+'" on Clever Game!',
					 link: realurl,
					 picture: realurl+'clevergame.jpg',
					 caption: title,
					 description:  'I scored '+totalpoint+'! Can you beat my high score?',
					 message: 'I scored '+totalpoint+' on Clever Game!'
				   },
				   function(response) {
					 if (response && response.post_id) {
					  $("a.facebook").html("Shared.");
					 } else {
					     $("a.facebook").html("Canceled.");
					 }
				   });
});	

				$("a.twitter").click(function(){
						var totalpoint  = $("a#points").attr('point');
						texttitle = 'I scored '+totalpoint+'! Can you beat my high score?';
					     window.open("https://twitter.com/share?url="+escape(realurl)+"&text="+texttitle, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
						 return false; 						
				});	

});	

var Clever = {};
Clever.Game = function() {


    var box = firstcount,
        lev = startlevel,
        score = 0,
        second = startsecond,
        randomArr = [],
        level = $('.level'),
        scoreEl = $('.score'),
        time = $('.time'),
        gameZone = $('section ul li'),
        setTime,

        isRandomNumber = function(number) {
            var array = [],
                number = number,
                len = number.length,
                i = 0,
                j = 0;

            for ( i; i < len; i++ ) {
                
                for ( j = i+1;  j < len; j++ ) {
                    
                    if ( number[i] === number[j] ) {
                        j = ++i;
                    }
                }
                array.push( number[i] );
            }
            return array;
        },

        createRandomNumber = function() {
            var i = 0;

            for ( i; i < box; i++ ) {
               randomArr[i] = Math.floor( Math.random() * boxcount+1 );
            }

            randomArr = isRandomNumber(randomArr);

            if ( randomArr.length !== box ) {
                createRandomNumber();
				
            }

            gameZoneBox();

            return randomArr;
        },

        gameZoneBox = function() {
			
			var totalx =  score * second;
		
            var i = 0;

            gameZone.removeClass("ok err");
            
            clearTimeout(setTime);

            setTime = setInterval( function() {
                time.text( 'Time : ' + second-- + ' sec' );
				
                if( second <= -1 ) {
                    clearTimeout(setTime);
                    gameZone.selightbox('#lightTimeOver');
					
				
                }
            }, 1000);
			
			
            level.text( 'Level: ' + lev );
            scoreEl.text( 'Point: ' + totalx );
            time.text( 'Time : ' + second + ' sec' );
			
			
			$("a#points").attr("point", ""+totalx+"")
			

            for ( i; i < box; i++ ) {
                $('#gameZone' + randomArr[i]).css('background','url(/games/clever-game-how-smart-are-you/images/sprite.png) 0 -' + randomArr[i] * 95 + 'px');
            }

            setTimeout( function() {
                gameZone.css('background','');
            }, 1500);
			

		
		
        };

    gameZone.click( function(e) {
        var i = 0,
            currentId = e.currentTarget.id,
            elCurrentId = $('#' + currentId);

        for ( i; i < box; i++ ) {

            if ( currentId !== 'gameZone' + randomArr[i] ) {
                elCurrentId.addClass("err");
            } else {
                elCurrentId.removeClass("err").addClass("ok");
                break;
            }
        }

        if ( elCurrentId.hasClass("err") ) {
            clearTimeout(setTime);
            gameZone.selightbox('#lightBoxLose');

				
        }

        if( $('.ok').length == box ) {
            score = score+box;
            box++;

            if ( box == boxcount ) {
                clearTimeout(setTime);
                gameZone.selightbox('#lightBoxWin');
				
            } else {
                second = 7 + lev;
                lev++;
                createRandomNumber();
            }
        }
    });

    gameZone.dblclick( function(e) {
        e.preventDefault();
        $(e.target).trigger('click');
        return false;
    });

    $('#lbNewGame, a#lbNewGame, a#lbWin, a#lbTimeout').click( function() {
        lev = 1;
        box = 3;
        score = 0;
        second = 5;
        createRandomNumber();
    });
   
    createRandomNumber();
	
};

$(function(){
    $("section section").append('<ul></ul>');
    
    var start = $("#startGame"),
        article = $("article"),
        sectionUl = $("section ul"),
        sprite = new Image(),
        i = 0;

    sprite.src = "/games/clever-game-how-smart-are-youimages/sprite.png";
    sprite.onload = function() {
        article.css('background','none');
        start.fadeIn();
    };

    for ( i; i <= boxcount; i++ ) {
        sectionUl.append('<li id="gameZone' + i + '"></li>')
    };

    start.click(function(){
        article.hide();
        sectionUl.show();
        new Clever.Game();
    });
	
  });	
	
window.fbAsyncInit = function() {
        FB.init({
          appId      : FACEBOOK_APPID,
          xfbml      : true,
          version    : 'v2.1'
        });
};
	(function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
