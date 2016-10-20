ig.module(
	'game.entities.invincible'
).requires(
	'impact.entity'
).defines(function() {
	EntityInvincible = ig.Entity.extend({
		size: {
			x: 40,
			y: 40
		},
		gravityFactor: 0,
		animSheet: new ig.AnimationSheet('/games/fat-eagle/media/invincible.png', 40, 40),
		sound: new ig.Sound('/games/fat-eagle/media/audio/specialCollection.*'),
		type: ig.Entity.TYPE.B,
		init: function(x, y, settings) {
			this.addAnim('idle', 1, [0]);
			this.parent(x, y, settings);
		},
		update: function() {
			this.parent();
			if (this.pos.x - ig.game.screen.x < -this.size.x) {
				this.kill();
			}
		},
		check: function() {
			this.parent();
			if (ig.Sound.enabled) this.sound.play();
			ig.game.invincible = true;
			this.kill();
		},
		kill: function() {
			this.parent();
		}
	});
});