ig.module(
	'game.entities.ui'
).requires(
	'impact.entity'
).defines(function() {

	EntityUi = ig.Entity.extend({
		size: {
			x: 100,
			y: 20
		},
		gravityFactor: 0,
		animSheet: new ig.AnimationSheet('/games/fat-eagle/media/ui/ui-shield.png', 63, 21),
		type: ig.Entity.TYPE.NONE,
		init: function(x, y, settings) {
			this.addAnim('10', 0.1, [0]);
			this.addAnim('20', 0.1, [1]);
			this.addAnim('30', 0.1, [2]);
			this.addAnim('40', 0.1, [3]);
			this.addAnim('50', 0.1, [4]);
			this.addAnim('60', 0.1, [5]);
			this.addAnim('70', 0.1, [6]);
			this.addAnim('80', 0.1, [7]);
			this.addAnim('90', 0.1, [8]);
			this.addAnim('100', 0.1, [9]);
			this.currentAnim = this.anims['100'];
			this.parent(x, y, settings);
		},
		update: function() {
			this.parent();
		}
	});
	//ui Score
	EntityScore = ig.Entity.extend({
		font: new ig.Font('/games/fat-eagle/media/ui/telemarines.font.png'),
		size: {
			x: 75,
			y: 25
		},
		gravityFactor: 0,
		animSheet: new ig.AnimationSheet('/games/fat-eagle/media/ui/ui-score-1.png', 75, 25),
		type: ig.Entity.TYPE.NONE,
		init: function(x, y, settings) {
			this.addAnim('idle', 1, [0]);
			this.parent(x, y, settings);
		},
		update: function() {
			this.parent();
		},
		draw: function() {
			this.parent();
			this.font.draw(ig.game.score.floor().toString(), ig.system.width - 25, 18, ig.Font.ALIGN.RIGHT);
		}
	});
	//ui Invincible Countdown
	EntityInvincibleCountdown = ig.Entity.extend({
		gravityFactor: 0,
		font: new ig.Font('/games/fat-eagle/media/one.font.png'),
		invincibleCountdown: new ig.Image('/games/fat-eagle/media/ui/InvincibleCountdown.png'),
		type: ig.Entity.TYPE.NONE,
		start: true,
		init: function(x, y, settings) {
			this.idleTimer = new ig.Timer();
			this.Timer = new ig.Timer(1);
			this.parent(x, y, settings);
		},
		update: function() {
			this.parent();
			if (ig.game.lifetime - this.idleTimer.delta().floor().toString() <= 0) {
				this.kill();
			}
		},
		draw: function() {
			this.parent();
			var it = this.Timer.delta();
			this.invincibleCountdown.draw(ig.system.width / 2 - this.invincibleCountdown.width / 2, (it * it * -it).limit(0, 1).map(1, 0, -(this.invincibleCountdown.height), 0));
			this.font.draw(ig.game.lifetime - this.idleTimer.delta().floor().toString() - 1, ig.system.width / 2 + 12, (it * it * -it).limit(0, 1).map(1, 0, -38, 0), ig.Font.ALIGN.RIGHT);

		},
		kill: function() {
			this.parent();
			ig.game.spawnEntity(EntityInvincibleCountdownExplosion, ig.system.width / 2 - this.invincibleCountdown.width / 2, 0);
		}
	});
	EntityInvincibleCountdownExplosion = ig.Entity.extend({
		lifetime: 0.3,
		type: ig.Entity.TYPE.NONE,
		gravityFactor: 0,
		callBack: null,
		animSheet: new ig.AnimationSheet('/games/fat-eagle/media/InvincibleCountdown-explosion.png', 44, 40),
		init: function(x, y, settings) {
			this.addAnim('idle', 0.1, [0, 1, 2, 3]);
			this.parent(x, y, settings);
			this.idleTimer = new ig.Timer();
		},
		update: function() {
			this.parent();
			if (this.idleTimer.delta() > this.lifetime) {
				this.kill();
				return;
			}
		}
	});
});