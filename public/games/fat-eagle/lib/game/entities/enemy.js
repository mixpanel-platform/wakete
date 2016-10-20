ig.module(
	'game.entities.enemy'
).requires(
	'impact.entity'
).defines(function() {
	//Enemy
	EntityEnemy = ig.Entity.extend({
		size: {
			x: 50,
			y: 43
		},
		gravityFactor: 0,
		animSheet: new ig.AnimationSheet('/games/fat-eagle/media/enemy/enemy_a.png', 50, 43),
		direction: 0,
		type: ig.Entity.TYPE.B,
		init: function(x, y, settings) {
			this.addAnim('idle', 0.1, [0, 1, 2, 3, 4, 5, 6, 7]);
			this.parent(x, y, settings);
			this.direction = ((Math.floor((Math.random() * 2)) * 2) - 1);

		},
		update: function() {
			this.parent();

			if (this.pos.x - ig.game.screen.x < -this.size.x) {
				this.kill();
			} /**/
			if (this.pos.y > ig.system.height - this.size.y || this.pos.y < 0) {
				this.direction = -this.direction;
			}
			this.pos.y += this.direction;
		},
		check: function() {
			//ig.game.player.kill();
		}
	});
	//Enemy Clouds
	EntityEnemyClouds = ig.Entity.extend({
		sound: new ig.Sound('/games/fat-eagle/media/audio/ouch.*'),
		sizes: [16, 21, 32, 42, 47],
		damage: [10, 10, 20, 20, 30],
		/*
		enemySizes: [{
			w: 70,
			h: 23
		}, {
			w: 100,
			h: 32
		}, {
			w: 120,
			h: 39
		}],*/
		gravityFactor: 0,
		num: 0,
		direction: 0,
		type: ig.Entity.TYPE.B,
		init: function(x, y, settings) {

			this.num = Math.floor(Math.random() * this.sizes.length);
			var actualSize = this.sizes[this.num];
			this.size = {
				x: actualSize,
				y: actualSize
			};
			this.animSheet = new ig.AnimationSheet('/games/fat-eagle/media/enemy/asteroid-' + actualSize + '.png', actualSize, actualSize);
			this.addAnim('idle', 0.1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
			this.parent(x, y, settings);
		},
		update: function() {
			this.parent();
			//kill
			if (this.pos.x - ig.game.screen.x < -100) {
				this.kill();
			}
		},
		check: function() {
			if (ig.Sound.enabled) this.sound.play();
			if (!ig.game.invincible) {
				//receiveDamage(amount, from) 
				ig.game.player.receiveDamage(this.damage[this.num], this);
			}
			//Shield
			ig.game.uiShield.currentAnim = ig.game.uiShield.anims[ig.game.player.health.floor().toString()];

			this.kill();
		},
		kill: function() {
			if (this.pos.x + 50 > 0) {
				ig.game.spawnEntity(EntityEnemyExplosion, this.pos.x, this.pos.y);
			}
			this.parent();
		}
	});
	EntityEnemyExplosion = ig.Entity.extend({
		lifetime: 0.3,
		type: ig.Entity.TYPE.NONE,
		gravityFactor: 0,
		callBack: null,
		animSheet: new ig.AnimationSheet('/games/fat-eagle/media/enemy-explosion.png', 44, 40),
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