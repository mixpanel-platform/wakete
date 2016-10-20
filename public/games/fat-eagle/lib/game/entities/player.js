ig.module(
	'game.entities.player'
).requires(
	'impact.entity'
).defines(function() {
	EntityPlayer = ig.Entity.extend({
		health: 100, //health
		maxHealth: 100, //maxHealth
		size: {
			x: 60,
			y: 30
		},
		offset: {
			x: 15,
			y: 20
		},
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.B,
		animSheet: new ig.AnimationSheet('/games/fat-eagle/media/player.png', 74, 65),
		sound: new ig.Sound('/games/fat-eagle/media/audio/boing.*'),
		//soundinvincible: new ig.Sound('/games/fat-eagle/media/audio/backPackThrust.*'),
		maxVel: {
			x: 0,
			y: 110
		},
		friction: {
			x: 0,
			y: 225
		},
		speed: 200,
		ascend: 140,
		soundLifetime: 1,
		invincible: false,
		init: function(x, y, settings) {
			this.addAnim('idle', 0.09, [0, 1, 2, 3, 4, 5, 6, 7]);
			this.addAnim('up', 0.08, [8, 9, 10, 11, 12, 13, 14, 15]);
			this.addAnim('faint', 0.08, [16, 17, 18, 19, 20, 21, 22, 23]);
			this.addAnim('invincible', 0.08, [24, 25, 26, 27, 28, 29, 30, 31]);
			this.addAnim('invincibleUp', 0.08, [32, 33, 34, 35, 36, 37, 38, 39]);
			this.parent(x, y, settings);
			this.soundTimer = new ig.Timer();
		},
		update: function() {
			if(ig.input.pressed('up')){
				if (ig.Sound.enabled) this.sound.play();
			}
			if (ig.input.state('up') || ig.input.state('click')) {
				if (ig.game.player.pos.y > ig.game.screen.y) {
					
					this.vel.y = -this.ascend;
					this.currentAnim = ig.game.invincible ? this.anims.invincibleUp : this.anims.up;
				}
			} else if (ig.game.invincible) {
				this.currentAnim = this.anims.invincible;
				//if (ig.Sound.enabled) this.soundinvincible.play();
			} else {
				this.currentAnim = this.anims.idle;
			}

			this.parent();

		},
		check: function(other) {
			other.check();
		},
		kill: function() {
			ig.game.spawnEntity(EntityPlayerExplosion, ig.game.player.pos.x, ig.game.player.pos.y, {
				callBack: this.onDeath
			});
			this.parent();
		},
		onDeath: function() {
			ig.game.gameOver = true;
		}
	});
	EntityPlayerExplosion = ig.Entity.extend({
		lifetime: 0.3,
		type: ig.Entity.TYPE.NONE,
		callBack: null,
		animSheet: new ig.AnimationSheet('/games/fat-eagle/media/player-explosion.png', 70, 63),
		init: function(x, y, settings) {
			this.addAnim('idle', 0.1, [0, 1, 2, 3]);
			this.parent(x, y, settings);
			this.idleTimer = new ig.Timer();
		},
		update: function() {
			this.parent();
			if (this.idleTimer.delta() > this.lifetime) {
				this.kill();
				if (this.callBack) {
					this.callBack();
				}
				return;
			}
		}
	});
});