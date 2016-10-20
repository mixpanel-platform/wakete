ig.module(
	'game.entities.heal'
).requires(
	'impact.entity'
).defines(function() {
	EntityHeal = ig.Entity.extend({
		size: {
			x: 40,
			y: 40
		},
		gravityFactor: 0,
		animSheet: new ig.AnimationSheet('/games/fat-eagle/media/heal.png', 40, 40),
		sound: new ig.Sound('/games/fat-eagle/media/audio/continue.*'),
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
			ig.game.player.health += 20;
			if (ig.Sound.enabled) this.sound.play();
			if (ig.game.player.health > ig.game.player.maxHealth) {
				ig.game.player.health = ig.game.player.maxHealth;
			}

			ig.game.uiShield.currentAnim = ig.game.uiShield.anims[ig.game.player.health.floor().toString()];
			this.kill();
		}
	});
});