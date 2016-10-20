ig.module(
	'game.screens.screen-start'
).requires(
	'impact.game',
	'game.entities.player',
	'game.entities.button'
).defines(function() {
	ScreenStart = ig.Game.extend({
		clearColor: '#efebe0',
		font: new ig.Font('/games/fat-eagle/media/ui/telemarines.font.png'),
		logoTitle: new ig.Image('/games/fat-eagle/media/ui/logo.png'),
		background: new ig.Image('/games/fat-eagle/media/' + _TIME_STRING + 'Sky.png'),
		clouds: new ig.Image('/games/fat-eagle/media/' + _TIME_STRING + 'Clouds.png'),
		mountainA: new ig.Image('/games/fat-eagle/media/' + _TIME_STRING + 'MountainA.png'),
		mountainB: new ig.Image('/games/fat-eagle/media/' + _TIME_STRING + 'MountainB.png'),
		bestScore: new ig.Image('/games/fat-eagle/media/ui/ui-best.png'),
		backgroundMusic: new ig.Sound('/games/fat-eagle/media/audio/soundtrack.*'),
		storage: new ig.Storage(),
		init: function() {
			this.storage.initUnset('storage-newhighscore', 0);
			this.storage.initUnset('storage-oldhighscore', 0);

			this.newhighscore = ig.game.storage.get('storage-newhighscore');
			this.oldhighscore = ig.game.storage.get('storage-oldhighscore');

			//init key
			//pc
			ig.input.bind(ig.KEY.W, 'W'); //w
			ig.input.bind(ig.KEY.S, 'S'); //s
			ig.input.bind(ig.KEY.A, 'A'); //a 
			ig.input.bind(ig.KEY.D, 'D'); //d
			//mobile
			ig.input.bind(ig.KEY.ENTER, 'ENTER'); //ENTER
			ig.input.bind(ig.KEY.SPACE, 'SPACE'); //SPACE
			ig.input.bind(ig.KEY.X, 'start');
			ig.input.bind(ig.KEY.MOUSE1, 'click');

			ig.music.volume = 0.2;
			ig.music.add(this.backgroundMusic);
			ig.music.play();

			//Parallax
			this.parallax = new Parallax();

			//background
			this.parallax.add(this.background.path, {
				distance: 99999,
				y: 0
			});
			
			this.parallax.add(this.mountainA.path, {
				distance: 15,
				y: ig.system.height - this.mountainA.height
			});
			
			this.parallax.add(this.mountainB.path, {
				distance: 5,
				y: ig.system.height - this.mountainB.height
			});
			//clouds
			this.parallax.add(this.clouds.path, {
				distance: 10,
				y: ig.system.height - this.clouds.height
			});
			//init Entity
			//this.player = this.spawnEntity(EntityPlayer, 10, this._height / 5);
			this.ButtonStart = this.spawnEntity(EntityButtonStart, ig.system.width - 60 - 20, ig.system.height - 60 - 20);
			this.ButtonAudio = this.spawnEntity(EntityButtonAudio, ig.system.width - 40 - 10, 10)
		},
		update: function() {
			this.parent();
			if (ig.input.pressed('start')) {
				ig.system.setGame(GameStart);
				return;
			}
			this.parallax.move(200);
		},
		draw: function() {
			this.parent();
			this.parallax.draw();
			//logo
			this.logoTitle.draw((ig.system.width - this.logoTitle.width) / 2, 70);
			//score
			this.bestScore.draw(20, ig.system.height - 75);
			this.font.draw(this.newhighscore, 43, ig.system.height - 35, ig.Font.ALIGN.LEFT);
			//entities draw 
			for (var i = 0; i < this.entities.length; i++) {
				this.entities[i].draw();
			}
		}

	});
});