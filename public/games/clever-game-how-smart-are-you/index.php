<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>How smart are you?</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, minimal-ui" />
        <script src="<?php echo asset('/assets/js/core/jquery.min.js') ?>"></script>
        <link rel="stylesheet" href="<?php echo url($path) ?>/styles/style.css" />
        <script src="<?php echo url($path) ?>/js/apbox.js"></script>
        <script src="<?php echo url($path) ?>/js/gamescript.js"></script>
        
        <script src="<?php echo asset('/assets/css/bootstrap.min.css') ?>"></script>
        <script src="<?php echo asset('/assets/css/oneui.css') ?>"></script>
		<!--<link rel="stylesheet" href="<?php echo url($path) ?>/assets/css/bootstrap.min.css">
        <link rel="stylesheet" id="css-main" href="<?php echo url($path) ?>/assets/css/oneui.css">-->
    </head>
    <body>
        <main id="main-container">
    	    <div id="fb-root"></div>
            <header>
                <h1>How smart are you?</h1>
                <ul class="scoretext">
                    <li class="time"></li>
                    <li class="score"></li>
                    <li class="level"></li>
                </ul>
            </header>
    		<div class="separate"></div>
            <section id="c2canvas" style="width:100%;">
                <section class="c2canvas">
                    <article style="padding-top:0px;">
                        <p class="three-dee">Do you want to prove how smart you are? Lets do it...</p>
                        <button id="startGame">Start Game</button>
                    </article>
                </section>

                <div id="lightBoxLose" class="lb">
                    <div>
                        <h3>Wrong Box !!!</h3>
                        <div id="lbContent">
                            <p>Be remembered that the boxes of the images must click on them.</p>
                        </div>
                        <p><a id="lbNewGame" class="sb text play margin" href="#">Play Again</a><span id="point">
    					<a href="#" id="points" point="" class="sb text facebook">Facebook</a>
    					<a href="#" id="points" point="" class="sb text twitter">Twitter</a>
    					</span></p>
                    </div>
                </div>
                
                <div id="lightBoxWin" class="lb">
                    <div>
                        <h3>Congratulations !!!</h3>
                        <div id="lbContent">
                            <p>You completed a game! Indeed, you are very smart :)</p>
                            <p class="lblevScore"></p>
                        </div>
                        <p><a id="lbWin" class="sb text play margin" href="#">Play Again</a><span id="point">
    					<a href="#" id="points" point="" class="sb text facebook">Facebook</a>
    					<a href="#" id="points" point="" class="sb text twitter">Twitter</a>
    					</span></p>
                    </div>
                </div>

                <div id="lightTimeOver" class="lb">
                    <div>
                        <h3>Time is over !!!</h3>
                        <div id="lbContent">
                            <p>Time is over. You should make better use of time.</p>
                            <p class="lblevScore"></p>
                        </div>
                        <p><a id="lbTimeout" class="sb text play margin" href="#">Play Again</a><span id="point">
    					<a href="#" id="points" point="" class="sb text facebook">Facebook</a>
    					<a href="#" id="points" point="" class="sb text twitter">Twitter</a>
    					</span></p>
                    </div>
                </div>
            </section>

            <footer>
                <p>www.apyazilim.com</p>
            </footer>
            <script>
              (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
              (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
              m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
              })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

              ga('create', 'UA-49508315-1', 'auto');
              ga('send', 'pageview');

            </script>
        </main>

        <script src="<?php echo asset('/assets/js/core/bootstrap.min.js') ?>"></script>
        <script src="<?php echo asset('/assets/js/core/jquery.slimscroll.min.js') ?>"></script>
        <script src="<?php echo asset('/assets/js/core/jquery.scrollLock.min.js') ?>"></script>
        <script src="<?php echo asset('/assets/js/core/jquery.appear.min.js') ?>"></script>
        <script src="<?php echo asset('/assets/js/core/jquery.countTo.min.js') ?>"></script>
        <script src="<?php echo asset('/assets/js/core/jquery.placeholder.min.js') ?>"></script>
        <script src="<?php echo asset('/assets/js/core/js.cookie.min.js') ?>"></script>
        <script src="<?php echo asset('/assets/js/app.js') ?>"></script>

        <script>
           jQuery(function () {

               App.initHelpers('appear');
           });
        </script>
        <script type="text/javascript">
            $(document).ready(function(){
                function resize() {
                    var heightRecalculated =  $('#main-container').height() - $('.ctnLogo').height();
                    var heightRecalculated = heightRecalculated + "px";

                    var widthRecalculated = jQuery(window).width();
                    var widthRecalculated = widthRecalculated+'px';

                    var height = $(window).height();
                    var width = $(window).width(); 

                    if(width > height) {
                    // Landscape
                        $('#c2canvas, .c2canvas').css({ height: heightRecalculated, width : widthRecalculated});
                    } else {
                    // Portrait
                        
                    }
                    
                }

                setTimeout(function() { resize(); }, 201);

                jQuery( window ).on("orientationchange",function(event){
                    resize();
                });
            });
        </script>
	</body>
</html>