ig.module(
	'game.screens.game-start'
).requires(
	'impact.game',
	//'impact.debug.debug',
	'game.entities.player',
	'game.entities.ui',
	'game.entities.invincible',
	'game.entities.heal',
	'game.entities.enemy'
).defines(function() {
	GameStart = ig.Game.extend({
		clearColor: '#1e2d18',
		gravity: 350,
		storage: new ig.Storage(),
		background: new ig.Image('/games/fat-eagle/media/' + _TIME_STRING + 'Sky.png'),
		clouds: new ig.Image('/games/fat-eagle/media/' + _TIME_STRING + 'Clouds.png'),
		mountainA: new ig.Image('/games/fat-eagle/media/' + _TIME_STRING + 'MountainA.png'),
		mountainB: new ig.Image('/games/fat-eagle/media/' + _TIME_STRING + 'MountainB.png'),
		parallax: null,
		score: 0,
		maxScore: 20000,
		speed: 1.5,
		callSpeed: 1.5,
		lifetime: 10,
		seconds: null,
		secondsTimer: null,
		idleTimer: null,
		newIdleTimer: true,
		gameOver: false,
		invincible: false,
		init: function() {
			this.newhighscore = this.storage.get('storage-newhighscore');
			this.oldhighscore = this.storage.get('storage-oldhighscore');
			this.secondsTimer = new ig.Timer(1);

			//key
			ig.input.bind(ig.KEY.MOUSE1, 'click');
			ig.input.bind(ig.KEY.UP_ARROW, 'up');

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
			//
			this.player = this.spawnEntity(EntityPlayer, 100, 72);
			this.uiShield = this.spawnEntity(EntityUi, 10, 10);
			this.uiScore = this.spawnEntity(EntityScore, ig.system.width - 88 - 5, 10);
			this.newItemTable();
		},
		placeEntity: function(entity) {
			var x = ig.system.width + 50;
			var y = Math.random() * ig.system.height;
			var item = this.spawnEntity(entity, x, y);
			item.speed = ig.game.speed + Math.random() * ig.game.speed / 2 - Math.random() * ig.game.speed / 2;
			//invincible Type
			item.invincibleType = this.invincible ? true : false;
			if (y > ig.system.height - item.size.y) {
				item.pos.y = ig.system.height - item.size.y;
			}
		},
		shuffleArray: function(array) {
			var len = array.length;
			var i = len;
			while (i--) {
				var p = parseInt(Math.random() * len);
				var t = array[i];
				array[i] = array[p];
				array[p] = t;
			}
		},
		newItemTable: function() {
			this.entityItemTable = [];
			this.entityItemTable.push(EntityHeal);
			if (!this.invincible) {
				this.entityItemTable.push(EntityInvincible);
			}
			for (var i = 0; i < 30; i++) {
				this.entityItemTable.push(EntityEnemyClouds); 
			}
			this.shuffleArray(this.entityItemTable);
		},
		update: function() {
			this.speed += 0.0005;
			this.callSpeed += 0.0005;
			this.score += ig.system.tick * this.speed * 5;

			for (var i = 0; i < this.entities.length; i++) {
				if (this.entities[i].type == ig.Entity.TYPE.B) {
					this.entities[i].pos.x -= this.entities[i].speed;
					if (!this.entities[i].invincibleType) {
						this.entities[i].pos.x -= ig.game.speed;
					}
				}
			}
			this.tickCount = Math.ceil(this.score / 1000);
			if (this.secondsTimer.delta() > 0) {
				ig.game.seconds++;
				this.secondsTimer.reset();
				for (var i = 0; i < this.tickCount; i++) {
					if (!this.entityItemTable.length) {
						this.newItemTable();
					}
					this.placeEntity(this.entityItemTable.pop());
				}
			}


			if (this.invincible) {
				if (this.newIdleTimer) {
					this.idleTimer = new ig.Timer();
					this.invincibleCountdown = this.spawnEntity(EntityInvincibleCountdown, 100, 72);
					this.newIdleTimer = false;
				}

				if (this.idleTimer.delta() > this.lifetime) {
					this.invincible = false;
					this.newIdleTimer = true;
					return;
				}

				ig.game.speed = this.callSpeed + 10;
				this.parallax.move(100 * this.speed + 200);

			} else {
				this.parallax.move(100 * this.speed);
				ig.game.speed = this.callSpeed;
			}
			this.parent();

			if (this.player.pos.y > ig.system.height + this.player.size.y) {
				this.gameOver = true;
			}
			if (this.gameOver) {
				var newHighscore = (this.score).floor();
				ig.game.storage.setHighest('storage-oldhighscore', newHighscore);
				console.log(newHighscore);
				if (newHighscore > this.oldhighscore) {
					ig.game.storage.setHighest('storage-newhighscore', newHighscore);
				}
			}
		},
		draw: function() {
			if (this.score >= this.maxScore) {
				/*game*/
			} else if (this.gameOver) {
				ig.system.setGame(GameOver);
			} else {
				this.parent();
				this.parallax.draw();

				for (var i = 0; i < this.entities.length; i++) {
					this.entities[i].draw();
				}
			}
		}
	});
});