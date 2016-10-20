ig.module(
	'game.entities.button'
).requires(
	'impact.entity',
	'game.screens.game-start'
).defines(function() {
	//button class
	EntityButton = ig.Entity.extend({
		sound: new ig.Sound('/games/fat-eagle/media/audio/button-click.*'),
		init: function(x, y, settings) {
			this.addAnim('released', 1, [0]);
			this.addAnim('pressed', 1, [1]);
			this.parent(x, y, settings);

		},
		inFocus: function() {
			return ((this.pos.x <= (ig.input.mouse.x + ig.game.screen.x)) && ((ig.input.mouse.x + ig.game.screen.x) <= this.pos.x + this.size.x) && (this.pos.y <= (ig.input.mouse.y + ig.game.screen.y)) && ((ig.input.mouse.y + ig.game.screen.y) <= this.pos.y + this.size.y));
		}
	});
	//start button
	EntityButtonStart = EntityButton.extend({
		size: {
			x: 60,
			y: 60
		},
		animSheet: new ig.AnimationSheet('/games/fat-eagle/media/ui/button-start.png', 60, 60),
		update: function() {
			if (ig.input.pressed('click') && this.inFocus()) {
				this.currentAnim = this.anims['pressed'];
				if (ig.Sound.enabled) this.sound.play();
			}
			if (ig.input.released('click') && this.inFocus()) {
				ig.system.setGame(GameStart);
			}
			if (ig.input.released('click')) {
				this.currentAnim = this.anims['released'];
			}
		}
	});
	//restart button
	EntityButtonRestart = EntityButton.extend({
		size: {
			x: 60,
			y: 60
		},
		animSheet: new ig.AnimationSheet('/games/fat-eagle/media/ui/button-restart.png', 60, 60),
		update: function() {
			if (ig.input.pressed('click') && this.inFocus()) {
				this.currentAnim = this.anims['pressed'];
				if (ig.Sound.enabled) this.sound.play();
			}
			if (ig.input.released('click') && this.inFocus()) {
				ig.system.setGame(GameStart);
			}
			if (ig.input.released('click')) {
				this.currentAnim = this.anims['released'];
			}
		}
	});
	//home button
	EntityButtonHome = EntityButton.extend({
		size: {
			x: 60,
			y: 60
		},
		animSheet: new ig.AnimationSheet('/games/fat-eagle/media/ui/button-home.png', 60, 60),
		update: function() {
			if (ig.input.pressed('click') && this.inFocus()) {
				this.currentAnim = this.anims['pressed'];
				if (ig.Sound.enabled) this.sound.play();
			}
			if (ig.input.released('click') && this.inFocus()) {
				ig.system.setGame(ScreenStart);
			}
			if (ig.input.released('click')) {
				this.currentAnim = this.anims['released'];
			}
		}
	});
	EntityButtonAudio = EntityButton.extend({
		size: {
			x: 39,
			y: 39
		},
		animSheet: new ig.AnimationSheet('/games/fat-eagle/media/ui/button-audio.png', 39, 39),
		update: function() {
			if (ig.input.pressed('click') && this.inFocus()) {
				ig.Sound.enabled = !ig.Sound.enabled;
				this.currentAnim = this.anims[(ig.Sound.enabled ? 'released' : 'pressed').toString()];

				if (ig.Sound.enabled) {
					ig.music.play();
					this.sound.play();
				} else {
					ig.music.pause();
				}
			}
		}
	});
});