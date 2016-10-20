ig.module(
	'game.screens.game-over'
).requires(
	'impact.game',
	'game.entities.button'
).defines(function() {
	GameOver = ig.Game.extend({
		clearColor: '#efebe0',
		background: new ig.Image('/games/fat-eagle/media/' + _TIME_STRING + 'Sky.png'),
		clouds: new ig.Image('/games/fat-eagle/media/' + _TIME_STRING + 'Clouds.png'),
		mountainA: new ig.Image('/games/fat-eagle/media/' + _TIME_STRING + 'MountainA.png'),
		mountainB: new ig.Image('/games/fat-eagle/media/' + _TIME_STRING + 'MountainB.png'),
		bestScore: new ig.Image('/games/fat-eagle/media/ui/ui-score.png'),
		gameOverImg: new ig.Image('/games/fat-eagle/media/ui/screen-gameover.png'),
		font: new ig.Font('/games/fat-eagle/media/ui/telemarines.font.png'),
		bestScore: new ig.Image('/games/fat-eagle/media/ui/ui-best.png'),
		scoreScore: new ig.Image('/games/fat-eagle/media/ui/ui-score.png'),
		storage: new ig.Storage(),
		init: function() {
			this.newhighscore = ig.game.storage.get('storage-newhighscore');
			this.oldhighscore = ig.game.storage.get('storage-oldhighscore');
			//Parallax
			this.parallax = new Parallax();

			//background
			this.parallax.add(this.background.path, {
				distance: 99999,
				y: 0
			});
			//
			this.parallax.add(this.mountainA.path, {
				distance: 15,
				y: ig.system.height - this.mountainA.height
			});
			//
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
			this.ButtonRestart = this.spawnEntity(EntityButtonRestart, ig.system.width - 60 - 20, ig.system.height - 60 - 20);
			this.ButtonHome = this.spawnEntity(EntityButtonHome, 20, ig.system.height - 60 - 20);
		},
		update: function() {
			this.parent();
			this.parallax.move(0);
		},
		draw: function() {
			this.parent();
			this.parallax.draw();
			//gameOver img
			this.gameOverImg.draw(ig.system.width / 2 - this.gameOverImg.width / 2, 50);
			//best
			this.bestScore.draw(ig.system.width - this.bestScore.width - 20, 65);
			this.font.draw(this.newhighscore, ig.system.width - 38, 103, ig.Font.ALIGN.RIGHT);
			//score
			this.scoreScore.draw(20, 65);
			this.font.draw(this.oldhighscore, 38, 103, ig.Font.ALIGN.LEFT);

			for (var i = 0; i < this.entities.length; i++) {
				this.entities[i].draw();
			}
		}

	});
});