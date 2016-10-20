(function(window,canvas,ctx,cache) {
	window.Canvas = canvas;
	ctx = canvas.getContext("2d");
	Config.cache = {
		icons:{
			x:false,
			o:false
		}
	};
	function Region() {
		this.type = 2;
		this.color = "white";
		this.width = 3;
		this.x = 0;
		this.y = 0;
		this.radius = 40;
		this.isLocked = false;
		this.draw = function() {
			var self = this;
			if(this.type == 0) {
				if(Config.icons.o && Config.icons.o != '') {
					if(Config.cache.icons.o) {
						var width = Config.cache.icons.o.width/2;
						var height = Config.cache.icons.o.height/2;
						ctx.drawImage(Config.cache.icons.o,self.x-width,self.y-height,Config.cache.icons.o.width,Config.cache.icons.o.height);
					} else {
						Config.cache.icons.o = new Image();
						Config.cache.icons.o.src = Config.icons.o;
						Config.cache.icons.o.addEventListener('load',function() {
							if(Config.cache.icons.o.width > self.radius) {
								Config.cache.icons.o.height = (Config.cache.icons.o.height * (self.radius*2)) / Config.cache.icons.o.width;
								Config.cache.icons.o.width = self.radius*2;
							}
							ctx.drawImage(Config.cache.icons.o,self.x-width,self.y-height,Config.cache.icons.o.width,Config.cache.icons.o.height);
						});
						Config.cache.icons.o.addEventListener('error',function() {
							Config.icons.o = null;
						});
					}
				} else {
					ctx.beginPath();
					ctx.strokeStyle = this.color;
					ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
					ctx.lineWidth = this.width;
					ctx.stroke();
				}
			} else if(this.type == 1) {
				if(Config.icons.x && Config.icons.x != '') {
					if(Config.cache.icons.x) {
						var width = Config.cache.icons.x.width/2;
						var height = Config.cache.icons.x.height/2;
						ctx.drawImage(Config.cache.icons.x,self.x-width,self.y-height,Config.cache.icons.x.width,Config.cache.icons.x.height);
					} else {
						Config.cache.icons.x = new Image();
						Config.cache.icons.x.src = Config.icons.x;
						Config.cache.icons.x.addEventListener('load',function() {
							if(Config.cache.icons.x.width > self.radius) {
								Config.cache.icons.x.height = (Config.cache.icons.x.height * (self.radius*2)) / Config.cache.icons.x.width;
								Config.cache.icons.x.width = self.radius*2;
							}
							ctx.drawImage(Config.cache.icons.x,self.x-width,self.y-height,Config.cache.icons.x.width,Config.cache.icons.x.height);
						});
						Config.cache.icons.x.addEventListener('error',function() {
							Config.icons.x = null;
						});
					}
				} else {
					var line = new Line();
					line.color = this.color;
					line.x = this.x-this.radius;
					line.y = this.y-this.radius;
					line.xTo = this.x+this.radius;
					line.yTo = this.y+this.radius;
					line.draw();
					var line2 = new Line();
					line2.color = this.color;
					line2.x = this.x+this.radius;
					line2.y = this.y-this.radius;
					line2.xTo = this.x-this.radius;
					line2.yTo = this.y+this.radius;
					line2.draw();
				}
			}
		};
	}
	function Line() {
		this.color = "black";
		this.width = 4;
		this.x = 0;
		this.y = 0;
		this.xTo = 0;
		this.yTo = 0;
		this.draw = function() {
			ctx.strokeStyle = this.color;
			ctx.beginPath();
			ctx.moveTo(this.x,this.y);
			ctx.lineTo(this.xTo,this.yTo);
			ctx.lineWidth = this.width;
			ctx.stroke();
		};
	}
	function Score() {
		this.x = 40;
		this.y = 40;
		this.color = "white";
		this.text = "x: ";
		this.data = 0;
		this.draw = function() {
			ctx.font = "bold 1.2em sans-serif";
			ctx.fillStyle = this.color;
			ctx.textAlign = "center";
			ctx.fillText(this.text+this.data,this.x,this.y);
		};
	}
	function Game() {
		this.ai = false;
		this.network = false;
		this.scoreLimit = 5;
		this.aiLevel = 0;
		this.p1Score = 0;
		this.p2Score = 0;
		this.win = false;
		this.end = false;
		this.turnCount = 0;
		this.turn = 1;
		this.speed = 5;
		this.clickX = 0;
		this.clickY = 0;
		this.splash = function() {
			ctx.fillStyle = "#00779E";
			ctx.strokeStyle = "#00262A";
			ctx.textAlign = "center";
			ctx.font = "bold 4em sans-serif";
			ctx.lineWidth = 3;
			ctx.strokeText("Tic Tac Toe",canvas.width/2.005,canvas.height/3.015);
			ctx.fillText("Tic Tac Toe",canvas.width/2,canvas.height/3);
			ctx.fillStyle = "#009DD1";
			ctx.font = "normal 2em sans-serif";
			ctx.lineWidth = 3;
			ctx.fillText("1 Player",canvas.width/2,canvas.height/1.8);
			ctx.fillText("2 Player",canvas.width/2,canvas.height/1.35);
			canvas.onclick = function(e) {
				var top = e.pageY - canvas.offsetTop;
				var left = e.pageX - canvas.offsetLeft;
				if(left >= canvas.width/2.5 && left <= canvas.width/1.7 && top >= canvas.height/2.03  && top <= canvas.height/1.6) {
					game.ai = true;
					game.setLevel();
					
				} else if(left >= canvas.width/2.5 && left <= canvas.width/1.7 && top >= canvas.height/1.5  && top <= canvas.height/1.3) {
					game.ai = false;
					game.start();
				}
			};
		};
		this.setLevel = function() {
			ctx.clearRect(0,canvas.height/2.1,canvas.width,canvas.height);
			ctx.fillStyle = "#009DD1";
			ctx.font = "normal 2em sans-serif";
			ctx.lineWidth = 3;
			ctx.fillText("Easy",canvas.width/2,canvas.height/1.8);
			ctx.fillText("Hard",canvas.width/2,canvas.height/1.35);
			game.drawBackLink();
			canvas.onclick = function(e) {
				var top = e.pageY - canvas.offsetTop;
				var left = e.pageX - canvas.offsetLeft;
				if(left >= canvas.width/2.5 && left <= canvas.width/1.7 && top >= canvas.height/2.03  && top <= canvas.height/1.6) {
					game.aiLevel = 0;
					game.start();
				} else if(left >= canvas.width/2.5 && left <= canvas.width/1.7 && top >= canvas.height/1.5  && top <= canvas.height/1.3) {
					game.aiLevel = 2;
					game.start();
				} else if(left >= 20 && left <= 70 && top >= canvas.height-40 && top <= canvas.height-12) {
					game.reset();
					game.splash();
				}
			};
		};
		this.setMultiplayer = function() {
			ctx.clearRect(0,canvas.height/2.1,canvas.width,canvas.height);
			ctx.fillStyle = "#009DD1";
			ctx.font = "normal 2em sans-serif";
			ctx.lineWidth = 3;
			ctx.fillText("Local",canvas.width/2,canvas.height/1.8);
			ctx.fillText("Network",canvas.width/2,canvas.height/1.35);
			game.drawBackLink();
			canvas.onclick = function(e) {
				var top = e.pageY - canvas.offsetTop;
				var left = e.pageX - canvas.offsetLeft;
				if(left >= canvas.width/2.5 && left <= canvas.width/1.7 && top >= canvas.height/2.03  && top <= canvas.height/1.6) {
					game.start();
				} else if(left >= canvas.width/2.5 && left <= canvas.width/1.7 && top >= canvas.height/1.5  && top <= canvas.height/1.3) {
					game.network = true;
					game.start();
				} else if(left >= 20 && left <= 70 && top >= canvas.height-40 && top <= canvas.height-12) {
					game.reset();
					game.splash();
				}
				
			};
		};
		this.drawBackLink = function() {
			ctx.fillStyle = "#009DD1";
			ctx.font = "normal 1.4em sans-serif";
			ctx.lineWidth = 3;
			ctx.fillText("Back",40,canvas.height-20);
		};
		this.reset = function() {
			ctx.clearRect(0,0,canvas.width,canvas.height);
			game.turnCount = 0;
			game.win = false;
			game.end = false;
			game.clickX = 0;
			game.clickY = 0;
			game.p1Score = 0;
			game.turn = 1;
			game.p2Score = 0;
			game.splash();
		};
		this.start = function() {
			var timeout;
			var score = new Score();
			var score2 = new Score();
			var line = new Line();
			var line2 = new Line();
			var line3 = new Line();
			var line4 = new Line();
			var region = [];
			region[0] = new Region();
			region[1] = new Region();
			region[2] = new Region();
			region[3] = new Region();
			region[4] = new Region();
			region[5] = new Region();
			region[6] = new Region();
			region[7] = new Region();
			region[8] = new Region();
			line.color = "white";
			line.x = (canvas.width/2)-70;
			line.y = 70;
			line.xTo = line.x;
			line.yTo = 320;
			line2.color = "white";
			line2.x = line.x+120;
			line2.y = line.y;
			line2.xTo = line2.x;
			line2.yTo = line.yTo;
			line3.color = "white";
			line3.x = line.x-100;
			line3.y = line.y+60;
			line3.xTo = line2.x+100;
			line3.yTo = line3.y;
			line4.color = "white";
			line4.x = line3.x;
			line4.y = line3.y+120;
			line4.xTo = line3.xTo;
			line4.yTo = line4.y;
			region[0].x = line3.x+region[0].radius;
			region[0].y = line.y;
			region[1].x = region[0].x+(region[0].radius*3);
			region[1].y = region[0].y;
			region[2].x = region[1].x+(region[1].radius*3);
			region[2].y = region[0].y;
			region[3].x = region[0].x;
			region[3].y = region[0].y+(region[0].radius*3);
			region[4].x = region[1].x;
			region[4].y = region[3].y;
			region[5].x = region[2].x;
			region[5].y = region[3].y;
			region[6].x = region[0].x;
			region[6].y = region[3].y+(region[0].radius*3);
			region[7].x = region[4].x;
			region[7].y = region[6].y;
			region[8].x = region[2].x;
			region[8].y = region[6].y;
			score.data = game.p1Score;
			score2.text = "o: ";
			score2.x = (canvas.width-40);
			score2.y = score.y;
			score2.data = game.p2Score;
			for(var i=0;i<region.length;i++) {
				region[i].type = i+2;
			}
			loop();
			function loop() {
				ctx.clearRect(0,0,canvas.width,canvas.height);
				game.drawBackLink();
				line.draw();
				line2.draw();
				line3.draw();
				line4.draw();
				score.draw();
				score2.draw();
					if(game.ai) {
						if(game.turn == -1) {
							game.clickX = 0;
							game.clickY = 0;
							var choice,ch,fork = [],priority = [];
							for(var i=0;i<region.length;i++) {
								if(i == 1 || i == 4 || i == 7) {
									if(region[i-1].type == region[i+1].type && !region[i].isLocked) {
										ch = i;
										fork[0] = ch;
										if(region[i-1].type == 0) {
											priority[0] = true;
										}
										}
									if(region[i-1].type == region[i].type && !region[i+1].isLocked) {
										ch = i+1;
										fork[1] = ch;
										if(region[i-1].type == 0) {
											priority[1] = true;
										}
									}
									if(region[i+1].type == region[i].type && !region[i-1].isLocked) {
										ch = i-1;
										fork[2]  = ch;
										if(region[i].type == 0) {
											priority[2] = true;
										}
									}
								}
								if(i == 3 || i == 4 || i == 5) {
									if(region[i-3].type == region[i].type && !region[i+3].isLocked) {
										ch = i+3;
										fork[3]  = ch;
										if(region[i-3].type == 0) {
											priority[3] = true;
										}
									}
									if(region[i-3].type == region[i+3].type && !region[i].isLocked) {
										ch = i;
										fork[4]  = ch;
										if(region[i-3].type == 0) {
											priority[4] = true;
										}
									}
									if(region[i].type == region[i+3].type && !region[i-3].isLocked) {
										ch = i-3;
										fork[5]  = ch;
										if(region[i].type == 0) {
											priority[5] = true;
										}
									}
									if(i == 4) {
										if(region[i-4].type == region[i].type && !region[i+4].isLocked) {
											ch = i+4;
											fork[6]  = ch;
											if(region[i-4].type == 0) {
												priority[6] = true;
											}
										}
										if(region[i+4].type == region[i].type && !region[i-4].isLocked) {
											ch = i-4;
											fork[7]  = ch;
											if(region[i+4].type == 0) {
												priority[7] = true;
											}
										}
										if(region[i-4].type == region[i+4].type && !region[i].isLocked) {
											ch = i;
											fork[8]  = ch;
											if(region[i-4].type == 0) {
												priority[8] = true;
											}
										}
										if(region[i-2].type == region[i].type && !region[i+2].isLocked) {
											ch = i+2;
											fork[9]  = ch;
											if(region[i-2].type == 0) {
												priority[9] = true;
											}
										}
										if(region[i+2].type == region[i].type && !region[i-2].isLocked) {
											ch = i-2;
											fork[10]  = ch;
											if(region[i+2].type == 0) {
												priority[10] = true;
											}
										}
										if(region[i-2].type == region[i+2].type && !region[i].isLocked) {
											ch = i;
											fork[11]  = ch;
											if(region[i-2].type == 0) {
												priority[11] = true;
											}
										}
									}
								}
							}	
							var fin,priorityCounter=0,chosenPriorities = [];
							if(game.aiLevel == 2) {
								for(var p=0;p<priority.length;p++) {
									if(priority[p] === true) {
										chosenPriorities[priorityCounter] = fork[p];
										priorityCounter++;
									}
								}
								if(priorityCounter == 1) {
									fin = chosenPriorities[0];
								} else if(priorityCounter > 1) {
									fin = chosenPriorities[parseInt(Math.random()*chosenPriorities.length)];
								} else {
									fin = fork[parseInt(Math.random()*fork.length)];
								}
							} else {
								fin = fork[parseInt(Math.random()*fork.length)];
							}
								ch = fin === undefined ? ch : fin;
								choice = ch === undefined ? parseInt(Math.random()*9) : ch;
								while(region[choice].isLocked) {
									choice = parseInt(Math.random()*9);
								}
							region[choice].color = "white";
							region[choice].type = 0;
							game.turn *= -1;
							game.turnCount++;
							region[choice].isLocked = true;
							if(game.turnCount > 8) {
								game.win = 3;
							}
						}
					}
				for(var i=0;i<region.length;i++) {
					if(game.clickX > 0 && game.clickY > 0 && game.clickX >= region[i].x-(region[i].radius*1.4) && game.clickX <= region[i].x+(region[i].radius*1.4) && game.clickY >= region[i].y-(region[i].radius*1.4) && game.clickY <= region[i].y+(region[i].radius*1.4)) {
						if(!region[i].isLocked) {
							region[i].color = "white";
							if(game.turn == 1) {
								region[i].type = 1;
							} else {
								region[i].type = 0;
							}
								game.clickX = 0;
								game.clickY = 0;
								game.turn *= -1;
								game.turnCount++;
								region[i].isLocked = true;
								if(game.turnCount > 8) {
									game.win = 3;
								}
						}
					} else if(game.clickX >= 20 && game.clickX <= 70 && game.clickY >= canvas.height-40 && game.clickY <= canvas.height-12) {
						game.end = true;
					}
					region[i].draw();
				}
					if(region[0].type != 2 || region[2].type != 2 || region[6].type != 2 || region[8].type != 2) {
						if(region[0].type == region[1].type && region[0].type == region[2].type) {
							if(region[2].type == 1) {
								game.win = 1;
							} else {
								game.win = 2;
							}
							var ln = new Line();
							ln.color = "white";
							ln.x = region[0].x-region[0].radius;
							ln.xTo = region[2].x+region[2].radius;
							ln.y = region[0].y;
							ln.yTo = ln.y;
							ln.width = 3;
							ln.draw();
						} else if(region[0].type == region[3].type && region[0].type == region[6].type) {
							if(region[0].type == 1) {
								game.win = 1;	
							} else {
								game.win = 2;
							}
							var ln = new Line();
							ln.color = "white";
							ln.x = region[0].x;
							ln.xTo = ln.x;
							ln.y = region[0].y-region[0].radius;
							ln.yTo = region[6].y+region[6].radius;
							ln.width = 3;
							ln.draw();
						} else if(region[1].type == region[4].type && region[1].type == region[7].type) {
							if(region[1].type == 1) {
								game.win = 1;	
							} else {
								game.win = 2;
							}
							var ln = new Line();
							ln.color = "white";
							ln.x = region[1].x;
							ln.xTo = ln.x;
							ln.y = region[1].y-region[1].radius;
							ln.yTo = region[7].y+region[7].radius;
							ln.width = 3;
							ln.draw();
						} else if(region[0].type == region[4].type && region[0].type == region[8].type) {
							if(region[0].type == 1) {
								game.win = 1;	
							} else {
								game.win = 2;
							}
							var ln = new Line();
							ln.color = "white";
							ln.x = region[0].x-region[0].radius;
							ln.xTo = region[8].x+region[8].radius;
							ln.y = region[0].y-region[0].radius;
							ln.yTo = region[8].y+region[8].radius;
							ln.width = 3;
							ln.draw();
						} else if(region[2].type == region[5].type && region[2].type == region[8].type) {
							if(region[2].type == 1) {
								game.win = 1;	
							} else {
								game.win = 2;
							}
							var ln = new Line();
							ln.color = "white";
							ln.x = region[2].x;
							ln.xTo = ln.x;
							ln.y = region[2].y-region[2].radius;
							ln.yTo = region[8].y+region[8].radius;
							ln.width = 3;
							ln.draw();
						} else if(region[6].type == region[7].type && region[6].type == region[8].type) {
							if(region[6].type == 1) {
								game.win = 1;	
							} else {
								game.win = 2;
							}
							var ln = new Line();
							ln.color = "white";
							ln.x = region[6].x-region[6].radius;
							ln.xTo = region[8].x+region[8].radius;
							ln.y = region[6].y;
							ln.yTo = ln.y;
							ln.width = 3;
							ln.draw();
						} else if(region[2].type == region[4].type && region[2].type == region[6].type) {
							if(region[2].type == 1) {
								game.win = 1;	
							} else {
								game.win = 2;
							}
							var ln = new Line();
							ln.color = "white";
							ln.x = region[2].x+region[2].radius;
							ln.xTo = region[6].x-region[6].radius;
							ln.y = region[2].y-region[2].radius;
							ln.yTo = region[6].y+region[6].radius;
							ln.width = 3;
							ln.draw();
						} else if(region[3].type == region[4].type && region[3].type == region[5].type) {
							if(region[3].type == 1) {
								game.win = 1;	
							} else {
								game.win = 2;
							}
							var ln = new Line();
							ln.color = "white";
							ln.x = region[3].x-region[3].radius;
							ln.xTo = region[5].x+region[5].radius;
							ln.y = region[3].y;
							ln.yTo = ln.y;
							ln.width = 3;
							ln.draw();
						}
					}
				if(game.win) {
					clearTimeout(timeout);
					ctx.fillStyle = "white";
					ctx.strokeStyle = "black";
					ctx.font = "bold 2em sans-serif";
					if(game.win < 3) {
						if(game.win == 1) {
							game.p1Score++;	
						} else if(game.win == 2) {
							game.p2Score++;	
						}
						if(game.p1Score == game.scoreLimit || game.p2Score == game.scoreLimit) {
							var winner;
							if(game.p1Score == game.scoreLimit) {
								winner = 1;
							} else if(game.p2Score == game.scoreLimit) {
								winner = 2;
							}
							ctx.strokeText("Player "+winner+" wins the game!",canvas.width/2,50);
							ctx.fillText("Player "+winner+" wins the game!",canvas.width/2,50);
						} else {
							ctx.strokeText("Player "+game.win+" wins!",canvas.width/2,50);
							ctx.fillText("Player "+game.win+" wins!",canvas.width/2,50);
						}
					} else {
						ctx.strokeText("Tie!",canvas.width/2,50);
						ctx.fillText("Tie!",canvas.width/2,50);
					}
					canvas.onclick = function() {
						game.turnCount = 0;
						game.win = false;
						if(game.p1Score == game.scoreLimit || game.p2Score == game.scoreLimit) {
							game.reset();
						} else {
							game.start();
						}
					};
				} else if(game.end) {
					clearTimeout(timeout);
					game.reset();
				} else {
					timeout = setTimeout(loop,game.speed);
				}
			}
			canvas.onclick = function(e) {
				game.clickX = e.pageX-canvas.offsetLeft;
				game.clickY = e.pageY-canvas.offsetTop;
			};
		};
	}	
	var game = new Game();
	game.splash();
})(window,document.getElementById("canvas"));