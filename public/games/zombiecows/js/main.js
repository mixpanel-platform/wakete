var newUrl = "/games/zombiecows";
TEXT_GAMEOVER = "YOU LOST";
TEXT_LEVEL = "YOU REACHED LEVEL: ";
TEXT_SCORE = "SCORE ";
TEXT_WIN = "YOU HAVE WON!!!";
TEXT_NEXT_LEVEL = "YOU PASSED TO THE LEVEL: ";
COW_MESSAGE = "+20\nPTS +10\nPTS +10\nPTS +50\nPTS +40\nPTS HAMMER\nBLOCK -10\nSECS +10\nSECS +70\nPTS".split(" ");
COW_MESSAGE_HELP = [{
    num: "+20",
    type: "points"
}, {
    num: "+10",
    type: "points"
}, {
    num: "+10",
    type: "points"
}, {
    num: "+50",
    type: "points"
}, {
    num: "+40",
    type: "points"
}, {
    num: "STEAL",
    type: "hammer when\n mouth is open"
}, {
    num: "-10",
    type: "seconds"
}, {
    num: "+10",
    type: "seconds"
}];

function CInterface() {
    var a, d, b, e, f, g, h, c, k, l, r, u, v, w, p, m, n, t, q = null;
    this._init = function() {
        var q = s_oSpriteLibrary.getSprite("but_exit");
        b = CANVAS_WIDTH - q.height / 2 - 10;
        e = q.height / 2 + 10;
        c = new CGfxButton(b, e, q, s_oStage);
        c.addEventListener(ON_MOUSE_UP, this._onExit, this);
        a = CANVAS_WIDTH - q.width / 2 - 120;
        d = q.height / 2 + 10;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) q = s_oSpriteLibrary.getSprite("audio_icon"), h = new CToggle(a, d, q, s_bAudioActive), h.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        m = new createjs.Container;
        m.x = TIME_X;
        m.y = TIME_Y;
        s_oStage.addChild(m);
        q = s_oSpriteLibrary.getSprite("bg_timebar");
        v = createBitmap(q);
        m.addChild(v);
        q = s_oSpriteLibrary.getSprite("fill_timebar");
        w = createBitmap(q);
        m.addChild(w);
        r = new createjs.Text("00:00", "bold 20px " + FONT, "#ffffff");
        r.y = 50;
        r.textAlign = "left";
        r.textBaseline = "alphabetic";
        r.lineWidth = 200;
        m.addChild(r);
        u = new createjs.Text("Time", "bold 20px " + FONT, "#ffffff");
        u.x = 290;
        u.y = 50;
        u.textAlign = "left";
        u.textBaseline = "alphabetic";
        u.lineWidth = 200;
        m.addChild(u);
        f = TIME_BAR_WIDTH;
        g = TIME_BAR_HEIGHT;
        p = new createjs.Shape;
        p.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(0, 0, f, g);
        m.addChild(p);
        w.mask = p;
        l = new createjs.Text("0", "bold 60px " + FONT, "#633f01");
        l.x = 360;
        l.y = 670;
        l.textAlign = "left";
        l.textBaseline = "alphabetic";
        l.lineWidth = 200;
        l.outline = 5;
        s_oStage.addChild(l);
        k = new createjs.Text("0", "bold 60px " + FONT, "#fff");
        k.x = 360;
        k.y = 670;
        k.textAlign = "left";
        k.textBaseline = "alphabetic";
        k.lineWidth = 200;
        s_oStage.addChild(k);
        t = new createjs.Text("0", "bold 60px " + FONT, "#633f01");
        t.x = 360;
        t.y = 750;
        t.textAlign = "left";
        t.textBaseline = "alphabetic";
        t.lineWidth = 200;
        t.outline = 5;
        s_oStage.addChild(t);
        n = new createjs.Text("0", "bold 60px " + FONT, "#ffcc00");
        n.x = 360;
        n.y = 750;
        n.textAlign = "left";
        n.textBaseline = "alphabetic";
        n.lineWidth = 200;
        s_oStage.addChild(n);
        q = createBitmap(s_oSpriteLibrary.getSprite("hammer_icon"));
        q.x = 280;
        q.y = 622;
        s_oStage.addChild(q);
        q = createBitmap(s_oSpriteLibrary.getSprite("target"));
        q.x = 280;
        q.y = 698;
        s_oStage.addChild(q);
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.unload = function() {
        if (!1 ===
            DISABLE_SOUND_MOBILE || !1 === s_bMobile) h.unload(), h = null;
        c.unload();
        null !== q && q.unload();
        s_oInterface = null
    };
    this.refreshButtonPos = function(q, f) {
        c.setPosition(b - q, f + e);
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || h.setPosition(a - q, f + d)
    };
    this.setButVisible = function(a) {
        (void 0).setVisible(a)
    };
    this.refreshTime = function(a) {
        p.scaleX = a
    };
    this.refreshTimeText = function(a) {
        r.text = a
    };
    this.refreshScore = function(a, b) {
        l.text = a;
        k.text = a;
        a >= b && !1 === s_bGoalReached && (createjs.Tween.get(l).to({
            scaleX: 2,
            scaleY: 2
        }, 500, createjs.Ease.bounceOut).call(function() {
            createjs.Tween.get(l).to({
                scaleX: 1,
                scaleY: 1
            }, 500, createjs.Ease.bounceOut)
        }), createjs.Tween.get(k).to({
            scaleX: 2,
            scaleY: 2
        }, 500, createjs.Ease.bounceOut).call(function() {
            createjs.Tween.get(k).to({
                scaleX: 1,
                scaleY: 1
            }, 500, createjs.Ease.bounceOut)
        }), s_bGoalReached = !0, !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("zc_goal"))
    };
    this.refreshGoal = function(a) {
        t.text = a;
        n.text = a
    };
    this._onRestart = function() {
        s_oGame.restartGame()
    };
    this._onButHelpRelease = function() {
        q = new CHelpPanel
    };
    this._onButRestartRelease = function() {
        s_oGame.restartGame()
    };
    this.onExitFromHelp = function() {
        q.unload()
    };
    this._onAudioToggle = function() {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this._onExit = function() {
        s_oGame.onExit()
    };
    s_oInterface = this;
    this._init();
    return this
}
var s_oInterface = null;

function CHelp() {
    var a, d, b, e, f, g, h, c;
    this._init = function() {
        g = createBitmap(s_oSpriteLibrary.getSprite("bg_help"));
        s_oStage.addChild(g);
        b = CANVAS_WIDTH - 400;
        var k = s_oSpriteLibrary.getSprite("but_play");
        e = CTextButton(b, 875, k, "START!", FONT, "#ffcc00", 60);
        e.addEventListener(ON_MOUSE_UP, this._onStart, this, 0);
        k = s_oSpriteLibrary.getSprite("but_play");
        f = CTextButton(400, 875, k, "MENU", FONT, "#ffcc00", 60);
        f.addEventListener(ON_MOUSE_UP, this._onMenu, this, 0);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) k = s_oSpriteLibrary.getSprite("audio_icon"),
            a = CANVAS_WIDTH - k.width / 2, d = k.height / 2 + 10, h = new CToggle(a, d, k, s_bAudioActive), h.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        c = new createjs.Text(COW_MESSAGE_HELP[0].num, "bold 100px " + FONT, "#ffcb00");
        c.x = 790;
        c.y = 410;
        c.textAlign = "center";
        c.textBaseline = "alphabetic";
        c.lineWidth = 200;
        s_oStage.addChild(c);
        c = new createjs.Text(COW_MESSAGE_HELP[0].type, "bold 40px " + FONT, "#ffffff");
        c.x = 790;
        c.y = 450;
        c.textAlign = "center";
        c.textBaseline = "alphabetic";
        c.lineWidth = 200;
        s_oStage.addChild(c);
        c = new createjs.Text(COW_MESSAGE_HELP[1].num,
            "bold 100px " + FONT, "#fffe09");
        c.x = 850;
        c.y = 170;
        c.textAlign = "center";
        c.textBaseline = "alphabetic";
        c.lineWidth = 200;
        s_oStage.addChild(c);
        c = new createjs.Text(COW_MESSAGE_HELP[1].type, "bold 40px " + FONT, "#ffffff");
        c.x = 850;
        c.y = 210;
        c.textAlign = "center";
        c.textBaseline = "alphabetic";
        c.lineWidth = 200;
        s_oStage.addChild(c);
        c = new createjs.Text(COW_MESSAGE_HELP[2].num, "bold 100px " + FONT, "#9dff08");
        c.x = 1450;
        c.y = 300;
        c.textAlign = "center";
        c.textBaseline = "alphabetic";
        c.lineWidth = 200;
        s_oStage.addChild(c);
        c = new createjs.Text(COW_MESSAGE_HELP[2].type,
            "bold 40px " + FONT, "#ffffff");
        c.x = 1450;
        c.y = 340;
        c.textAlign = "center";
        c.textBaseline = "alphabetic";
        c.lineWidth = 200;
        s_oStage.addChild(c);
        c = new createjs.Text(COW_MESSAGE_HELP[3].num, "bold 100px " + FONT, "#00cbfd");
        c.x = 1270;
        c.y = 150;
        c.textAlign = "center";
        c.textBaseline = "alphabetic";
        c.lineWidth = 200;
        s_oStage.addChild(c);
        c = new createjs.Text(COW_MESSAGE_HELP[3].type, "bold 40px " + FONT, "#ffffff");
        c.x = 1270;
        c.y = 190;
        c.textAlign = "center";
        c.textBaseline = "alphabetic";
        c.lineWidth = 200;
        s_oStage.addChild(c);
        c = new createjs.Text(COW_MESSAGE_HELP[4].num,
            "bold 100px " + FONT, "#91d400");
        c.x = 820;
        c.y = 650;
        c.textAlign = "center";
        c.textBaseline = "alphabetic";
        c.lineWidth = 200;
        s_oStage.addChild(c);
        c = new createjs.Text(COW_MESSAGE_HELP[4].type, "bold 40px " + FONT, "#ffffff");
        c.x = 820;
        c.y = 690;
        c.textAlign = "center";
        c.textBaseline = "alphabetic";
        c.lineWidth = 200;
        s_oStage.addChild(c);
        c = new createjs.Text(COW_MESSAGE_HELP[5].num, "bold 100px " + FONT, "#cc989a");
        c.x = 1350;
        c.y = 610;
        c.textAlign = "center";
        c.textBaseline = "alphabetic";
        c.lineWidth = 200;
        s_oStage.addChild(c);
        c = new createjs.Text(COW_MESSAGE_HELP[5].type,
            "bold 40px " + FONT, "#ffffff");
        c.x = 1350;
        c.y = 640;
        c.textAlign = "center";
        c.textBaseline = "alphabetic";
        c.lineWidth = 200;
        s_oStage.addChild(c);
        c = new createjs.Text(COW_MESSAGE_HELP[6].num, "bold 100px " + FONT, "#fd38cd");
        c.x = 1200;
        c.y = 425;
        c.textAlign = "center";
        c.textBaseline = "alphabetic";
        c.lineWidth = 200;
        s_oStage.addChild(c);
        c = new createjs.Text(COW_MESSAGE_HELP[6].type, "bold 40px " + FONT, "#ffffff");
        c.x = 1200;
        c.y = 465;
        c.textAlign = "center";
        c.textBaseline = "alphabetic";
        c.lineWidth = 200;
        s_oStage.addChild(c);
        c = new createjs.Text(COW_MESSAGE_HELP[7].num,
            "bold 100px " + FONT, "#f7bae3");
        c.x = 420;
        c.y = 570;
        c.textAlign = "center";
        c.textBaseline = "alphabetic";
        c.lineWidth = 200;
        s_oStage.addChild(c);
        c = new createjs.Text(COW_MESSAGE_HELP[4].type, "bold 40px " + FONT, "#ffffff");
        c.x = 420;
        c.y = 610;
        c.textAlign = "center";
        c.textBaseline = "alphabetic";
        c.lineWidth = 200;
        s_oStage.addChild(c);
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.unload = function() {
        e.unload();
        f.unload();
        s_oHelp = null;
        s_oStage.removeAllChildren()
    };
    this._onStart = function() {
        s_oHelp.unload();
        s_oMain.gotoGame()
    };
    this._onMenu = function() {
        s_oHelp.unload();
        s_oMain.gotoMenu()
    };
    this._onAudioToggle = function() {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this.refreshButtonPos = function(b, c) {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || h.setPosition(a - b, c + d)
    };
    s_oHelp = this;
    this._init()
}
var s_oMenu = null;

function CHammer(a) {
    var d, b;
    this._init = function(a) {
        b = {
            images: [s_oSpriteLibrary.getSprite("hammerSprites")],
            framerate: 20,
            frames: {
                width: HAMMER_WIDTH,
                height: HAMMER_HEIGHT,
                regX: HAMMER_WIDTH / 2,
                regY: HAMMER_HEIGHT / 2
            },
            animations: {
                start: [0],
                hit: [1, 5, "start"]
            }
        };
        var f = new createjs.SpriteSheet(b);
        d = createSprite(f, "start", 0, 0, HAMMER_WIDTH, HAMMER_HEIGHT);
        d.x = 1800;
        d.y = 525;
        d.alpha = 0;
        a.addChild(d)
    };
    this.unload = function() {
        createjs.Tween.removeAllTweens();
        a.removeAllChildren()
    };
    this._showHammer = function(a, b) {
        d.y = a;
        d.x = b;
        d.visible = !0;
        d.alpha = 1;
        createjs.Tween.get(d, {
            override: !0
        }).wait(300).call(function() {});
        d.gotoAndPlay("hit");
        createjs.Tween.get(d).wait(500).to({
            alpha: 0
        }, 500).call(function() {})
    };
    this._init(a)
}

function CGfxButton(a, d, b) {
    var e, f, g, h = [],
        c;
    this._init = function(a, b, d) {
        e = 1;
        f = [];
        g = [];
        c = createBitmap(d);
        c.x = a;
        c.y = b;
        c.regX = d.width / 2;
        c.regY = d.height / 2;
        s_oStage.addChild(c);
        this._initListener()
    };
    this.unload = function() {
        c.off("mousedown", this.buttonDown);
        c.off("pressup", this.buttonRelease);
        s_oStage.removeChild(c)
    };
    this.setVisible = function(a) {
        c.visible = a
    };
    this._initListener = function() {
        c.on("mousedown", this.buttonDown);
        c.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(a, b, c) {
        f[a] = b;
        g[a] =
            c
    };
    this.addEventListenerWithParams = function(a, b, c, d) {
        f[a] = b;
        g[a] = c;
        h = d
    };
    this.buttonRelease = function() {
        c.scaleX = e;
        c.scaleY = e;
        f[ON_MOUSE_UP] && f[ON_MOUSE_UP].call(g[ON_MOUSE_UP], h)
    };
    this.buttonDown = function() {
        c.scaleX = .9 * e;
        c.scaleY = .9 * e;
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("zc_press_but");
        f[ON_MOUSE_DOWN] && f[ON_MOUSE_DOWN].call(g[ON_MOUSE_DOWN], h)
    };
    this.setScale = function(a) {
        e = a;
        c.scaleX = a;
        c.scaleY = a
    };
    this.setPosition = function(a, b) {
        c.x = a;
        c.y = b
    };
    this.setX = function(a) {
        c.x = a
    };
    this.setY =
        function(a) {
            c.y = a
        };
    this.getButtonImage = function() {
        return c
    };
    this.getX = function() {
        return c.x
    };
    this.getY = function() {
        return c.y
    };
    this._init(a, d, b);
    return this
}

function CGame(a) {
    var d = 0,
        b = s_iLevel,
        e = [{
            score: 20,
            time: 1300
        }, {
            score: 10,
            time: 1500
        }, {
            score: 10,
            time: 1500
        }, {
            score: 50,
            time: 1E3
        }, {
            score: 40,
            time: 1350
        }, {
            score: 70,
            time: 1800
        }, {
            score: 10,
            time: 2E3
        }, {
            score: -10,
            time: 1E3
        }],
        f, g = 0,
        h, c = 0,
        k, l, r = [],
        u = [0, 0, 0, 0, 0, 0, 0, 0, 0],
        v, w = !1,
        p, m, n, t, q = null;
    this._init = function() {
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) s_oSoundTrack.volume = .5;
        f = TIME_LEVEL;
        g = 0;
        s_bHammerUsable = !0;
        s_bGoalReached = !1;
        s_iDeleted = 1;
        var a = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
        s_oStage.addChild(a);
        m = new createjs.Container;
        s_oStage.addChild(m);
        s_oLevelSettings = new CLevelSettings(b);
        h = s_oLevelSettings.getGoalInLevel(b);
        k = s_oLevelSettings.getElementsNum(b);
        for (a = 0; a < k; a++) r[a] = s_oLevelSettings.getLevel(b, a);
        t = new CInterface;
        r = shuffle(r);
        t.refreshGoal(h);
        this._createCells();
        p = new CHammer(m);
        this.onNextLevel(b)
    };
    this._initLevel = function(a) {
        b = a;
        g = 0;
        s_bHammerUsable = !0;
        s_bGoalReached = !1;
        s_iDeleted = 1;
        s_oLevelSettings = new CLevelSettings(b);
        h = s_oLevelSettings.getGoalInLevel(b);
        k = s_oLevelSettings.getElementsNum(b);
        for (a = 0; a < k; a++) r[a] = s_oLevelSettings.getLevel(b, a);
        t.refreshGoal(h);
        this.onNextLevel(b)
    };
    this._createCells = function() {
        var a = START_X_GRID,
            b = START_Y_GRID;
        l = [];
        for (var c = 0; c < NUM_ROWS; c++) {
            l[c] = [];
            for (var d = 0; d < NUM_COLS; d++) l[c][d] = new CCow(c, d, a, b, m, "hole"), n = new createjs.Shape, n.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(a - HOLE_WIDTH / 2, b - HOLE_HEIGHT, HOLE_WIDTH, HOLE_HEIGHT), m.addChild(n), n.on("mousedown", s_oGame._hammerOn, this, !1, {
                iRow: c,
                iCol: d
            }), a += HOLE_WIDTH;
            b += HOLE_HEIGHT;
            a = START_X_GRID
        }
    };
    this._selectCow = function() {
        for (var a = s_iDeleted = 0; 9 > a; a++) {
            var b, d;
            if (Math.floor(2 * Math.random())) {
                do b = Math.floor(Math.random() * NUM_COLS), d = Math.floor(Math.random() * NUM_ROWS); while (!1 !== l[b][d].getValue());
                c++;
                c >= k && (r = shuffle(r), c = 0);
                u[b * NUM_COLS + d] = r[c];
                l[b][d].spawnCow(u[b * NUM_COLS + d], e[r[c]].time);
                s_iDeleted++
            }
        }
    };
    this._hammerOn = function(a, b) {
        w || (w = !0, s_bHammerUsable && (l[b.iRow][b.iCol]._hitCell(u[NUM_COLS * b.iRow + b.iCol]), p._showHammer(START_Y_GRID + HOLE_HEIGHT * b.iRow - 150, START_X_GRID + HOLE_WIDTH *
            b.iCol), !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("hammer")), w = !1)
    };
    this._hammerOff = function() {
        p.unload()
    };
    this._timerModifier = function(a) {
        v = !1;
        var b = g,
            b = g + 1E3 * e[a].score;
        g = 0 >= b ? 0 : g + 1E3 * e[a].score;
        v = !0
    };
    this.onNextLevel = function(a) {
        v = !1;
        new CNextLevel(s_oSpriteLibrary.getSprite("msg_box"), a, h)
    };
    this.onNextLevelExit = function() {
        v = !0;
        this._selectCow()
    };
    this._scoreModifier = function(a) {
        d += e[a].score;
        t.refreshScore(d, h)
    };
    this.unload = function() {
        t.unload();
        null !== q && q.unload();
        s_oLevelSettings.unload();
        for (var a = 0; a < NUM_ROWS; a++)
            for (var b = 0; b < NUM_COLS; b++) l[a][b].unload();
        this._hammerOff();
        s_oGame = null;
        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren()
    };
    this.onExit = function() {
        this.unload();
        s_oMain.gotoMenu();
        $(s_oMain).trigger("restart")
    };
    this.gameOver = function() {
        q = CEndPanel(s_oSpriteLibrary.getSprite("msg_box"));
        LEVEL_MAX === b + 1 && d >= h ? q.win(d) : d < h && q.show(d, b++)
    };
    this.update = function() {
        if (v) {
            g += s_iTimeElaps;
            var a = f - g,
                c, e;
            0 >= a && d >= h && b + 1 < LEVEL_MAX ? (s_iDeleted = 0, v = s_bHammerUsable = !1, c =
                new createjs.Text("CONGRATULATIONS!!!!", "bold 10px " + FONT, "#000000"), c.x = CANVAS_WIDTH / 2 + 2, c.y = CANVAS_HEIGHT / 2 + 2, c.textAlign = "center", c.textBaseline = "alphabetic", c.lineWidth = 200, s_oStage.addChild(c), e = new createjs.Text("CONGRATULATIONS!!!!", "bold 10px " + FONT, "#ffcc00"), e.x = CANVAS_WIDTH / 2, e.y = CANVAS_HEIGHT / 2, e.textAlign = "center", e.textBaseline = "alphabetic", e.lineWidth = 200, s_oStage.addChild(e), createjs.Tween.get(c).to({
                    scaleX: 10,
                    scaleY: 10
                }, 500, createjs.Ease.bounceOut).wait(2E3).call(function() {}), createjs.Tween.get(e).to({
                    scaleX: 10,
                    scaleY: 10
                }, 500, createjs.Ease.bounceOut).wait(2E3).call(function() {
                    s_oGame._initLevel(b + 1);
                    c.text = "";
                    e.text = ""
                })) : b + 1 === LEVEL_MAX && d >= h && 0 >= a ? (s_iDeleted = 0, v = s_bHammerUsable = !1, c = new createjs.Text("CONGRATULATIONS!!!!", "bold 10px " + FONT, "#000000"), c.x = CANVAS_WIDTH / 2 + 2, c.y = CANVAS_HEIGHT / 2 + 2, c.textAlign = "center", c.textBaseline = "alphabetic", c.lineWidth = 200, s_oStage.addChild(c), e = new createjs.Text("CONGRATULATIONS!!!!", "bold 10px " + FONT, "#ffcc00"), e.x = CANVAS_WIDTH / 2, e.y = CANVAS_HEIGHT / 2, e.textAlign = "center",
                e.textBaseline = "alphabetic", e.lineWidth = 200, s_oStage.addChild(e), createjs.Tween.get(c).to({
                    scaleX: 10,
                    scaleY: 10
                }, 500, createjs.Ease.bounceOut).wait(2E3).call(function() {}), createjs.Tween.get(e).to({
                    scaleX: 10,
                    scaleY: 10
                }, 500, createjs.Ease.bounceOut).wait(2E3).call(function() {
                    s_oGame.gameOver();
                    c.text = "";
                    e.text = ""
                })) : 0 >= a && d < h ? (v = !1, this.gameOver()) : (t.refreshTime(a / f), 0 > a ? t.refreshTimeText(formatTime(0)) : t.refreshTimeText(formatTime(a)));
            0 >= s_iDeleted && v && this._selectCow()
        }
    };
    s_oGame = this;
    TIME_LEVEL = a.level_time;
    SCORE_GOAL = a.level_goal;
    this._init()
}
var s_oGame;

function CEndPanel(a) {
    var d, b, e, f, g;
    this._init = function(a) {
        d = createBitmap(a);
        f = new createjs.Text("", " 100px " + FONT, "#a74085");
        f.x = CANVAS_WIDTH / 2;
        f.y = CANVAS_HEIGHT / 2 - 100;
        f.textAlign = "center";
        f.textBaseline = "alphabetic";
        f.lineWidth = 600;
        e = new createjs.Text("", " 55px " + FONT, "#633f01");
        e.x = CANVAS_WIDTH / 2;
        e.y = CANVAS_HEIGHT / 2 + 10;
        e.textAlign = "center";
        e.textBaseline = "alphabetic";
        e.lineWidth = 500;
        g = new createjs.Text("", " 55px " + FONT, "#a74085");
        g.x = CANVAS_WIDTH / 2;
        g.y = CANVAS_HEIGHT / 2 + 130;
        g.textAlign = "center";
        g.textBaseline = "alphabetic";
        g.lineWidth = 500;
        b = new createjs.Container;
        b.alpha = 0;
        b.visible = !1;
        b.addChild(d, g, e, f);
        s_oStage.addChild(b)
    };
    this.unload = function() {
        b.off("mousedown", this._onExit)
    };
    this._initListener = function() {
        b.on("mousedown", this._onExit)
    };
    this.show = function(a, c) {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("game_over");
        f.text = TEXT_GAMEOVER;
        e.text = TEXT_LEVEL + (c + 1);
        g.text = TEXT_SCORE + a;
        b.visible = !0;
        var d = this;
        createjs.Tween.get(b).to({
            alpha: 1
        }, 500).call(function() {
            d._initListener()
        });
        $(s_oMain).trigger("save_score", [a])
    };
    this.win = function(a) {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("game_over");
        f.text = TEXT_WIN;
        g.text = TEXT_SCORE + a;
        b.visible = !0;
        var c = this;
        createjs.Tween.get(b).to({
            alpha: 1
        }, 500).call(function() {
            c._initListener()
        });
        $(s_oMain).trigger("save_score", [a])
    };
    this._onExit = function() {
        b.off("mousedown", this._onExit);
        s_oStage.removeChild(b);
        s_oGame.onExit()
    };
    this._init(a);
    return this
}

function CCow(a, d, b, e, f, g) {
    var h, c, k = this,
        l, r, u, v = [],
        w = [],
        p = [],
        m = [],
        n = [],
        t = Array(COW_NUM);
    this._init = function(a, b, d, e, f, k) {
        a = {
            images: [s_oSpriteLibrary.getSprite("HoleSprites")],
            frames: {
                width: HOLE_WIDTH,
                height: HOLE_HEIGHT,
                regX: HOLE_WIDTH / 2,
                regY: HOLE_HEIGHT
            },
            animations: {
                hole0: [0],
                hole1: [1],
                hole2: [2],
                hole3: [3],
                hole4: [4],
                hole5: [5],
                hole6: [6],
                hole7: [7]
            }
        };
        t[0] = {
            images: [s_oSpriteLibrary.getSprite("cow0")],
            framerate: 6,
            frames: {
                width: COW_WIDTH[0],
                height: COW_HEIGHT[0],
                regX: COW_WIDTH[0] / 2,
                regY: COW_HEIGHT[0]
            },
            animations: {
                start: [0],
                idle: [0, 3, "idle"],
                hit: [4]
            }
        };
        t[1] = {
            images: [s_oSpriteLibrary.getSprite("cow1")],
            framerate: 6,
            frames: {
                width: COW_WIDTH[1],
                height: COW_HEIGHT[1],
                regX: COW_WIDTH[1] / 2,
                regY: COW_HEIGHT[1]
            },
            animations: {
                start: [0],
                idle: [0, 3, "idle"],
                hit: [4]
            }
        };
        t[2] = {
            images: [s_oSpriteLibrary.getSprite("cow2")],
            framerate: 6,
            frames: {
                width: COW_WIDTH[2],
                height: COW_HEIGHT[2],
                regX: COW_WIDTH[2] / 2,
                regY: COW_HEIGHT[2]
            },
            animations: {
                start: [0],
                idle: [0, 3, "idle"],
                hit: [4]
            }
        };
        t[3] = {
            images: [s_oSpriteLibrary.getSprite("cow3")],
            framerate: 6,
            frames: {
                width: COW_WIDTH[3],
                height: COW_HEIGHT[3],
                regX: COW_WIDTH[3] / 2,
                regY: COW_HEIGHT[3]
            },
            animations: {
                start: [0],
                idle: [0, 3, "idle"],
                hit: [4]
            }
        };
        t[4] = {
            images: [s_oSpriteLibrary.getSprite("cow4")],
            framerate: 6,
            frames: {
                width: COW_WIDTH[4],
                height: COW_HEIGHT[4],
                regX: COW_WIDTH[4] / 2,
                regY: COW_HEIGHT[4]
            },
            animations: {
                start: [0],
                idle: [0, 3, "idle"],
                hit: [4]
            }
        };
        t[5] = {
            images: [s_oSpriteLibrary.getSprite("cow5")],
            framerate: 5,
            frames: {
                width: COW_WIDTH[5],
                height: COW_HEIGHT[5],
                regX: COW_WIDTH[5] / 2,
                regY: COW_HEIGHT[5]
            },
            animations: {
                start: [0],
                idle: [0, 4, "idle"],
                hitOpen: [5, 7, "hit"],
                hitClose: [8]
            }
        };
        t[6] = {
            images: [s_oSpriteLibrary.getSprite("cow6")],
            framerate: 6,
            frames: {
                width: COW_WIDTH[6],
                height: COW_HEIGHT[6],
                regX: COW_WIDTH[6] / 2,
                regY: COW_HEIGHT[6]
            },
            animations: {
                start: [0],
                idle: [0, 3, "idle"],
                hit: [4]
            }
        };
        t[7] = {
            images: [s_oSpriteLibrary.getSprite("cow7")],
            framerate: 5,
            frames: {
                width: COW_WIDTH[7],
                height: COW_HEIGHT[7],
                regX: COW_WIDTH[7] / 2,
                regY: COW_HEIGHT[7]
            },
            animations: {
                start: [0],
                idle: [0, 1, "idle"],
                hit: [1, 4, "start"]
            }
        };
        a = new createjs.SpriteSheet(a);
        l = createSprite(a,
            g + Math.floor(7 * Math.random()), 0, 0, HOLE_WIDTH, HOLE_HEIGHT);
        l.x = d;
        l.y = e;
        l.rotation = 0;
        f.addChild(l);
        u = !1;
        h = HOLE_WIDTH;
        c = BIGGER_HEIGHT;
        r = new createjs.Shape;
        r.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(d - HOLE_WIDTH / 2, e - HOLE_HEIGHT - 177, h, c);
        f.addChild(r);
        for (a = 0; a < COW_NUM; a++) b = new createjs.SpriteSheet(t[a]), n.push(createSprite(b, "start", 0, 0, COW_WIDTH[a], COW_HEIGHT[a])), n[a].x = d, v.push(d), n[a].y = e + HOLE_HEIGHT + 50, w.push(e + HOLE_HEIGHT + 50), n[a].rotation = 0, n[a].stop, f.addChild(n[a]), n[a].mask = r,
            m.push(new createjs.Text(COW_MESSAGE[a], "bold 60px " + FONT, "#000000")), m[a].x = d + 2, m[a].y = e - 298, m[a].textAlign = "center", m[a].textBaseline = "alphabetic", m[a].lineWidth = 200, m[a].visible = !1, s_oStage.addChild(m[a]), p.push(new createjs.Text(COW_MESSAGE[a], "bold 60px " + FONT, "#ffcc00")), p[a].x = d, p[a].y = e - 300, p[a].textAlign = "center", p[a].textBaseline = "alphabetic", p[a].lineWidth = 200, p[a].visible = !1, s_oStage.addChild(p[a]);
        m.push(new createjs.Text(COW_MESSAGE[a], "bold 60px " + FONT, "#000000"));
        m[8].x = d + 2;
        m[8].y =
            e - 298;
        m[8].textAlign = "center";
        m[8].textBaseline = "alphabetic";
        m[8].lineWidth = 200;
        m[8].visible = !1;
        s_oStage.addChild(m[8]);
        p.push(new createjs.Text(COW_MESSAGE[a], "bold 60px " + FONT, "#ffcc00"));
        p[8].x = d;
        p[8].y = e - 300;
        p[8].textAlign = "center";
        p[8].textBaseline = "alphabetic";
        p[8].lineWidth = 200;
        p[8].visible = !1;
        s_oStage.addChild(p[8])
    };
    this.spawnCow = function(a, b) {
        n[a].gotoAndPlay("idle");
        createjs.Tween.get(n[a]).to({
            y: n[a].y - HOLE_HEIGHT - 100
        }, 500, createjs.Ease.cubicOut).wait(b).call(function() {
            k.deleteCow(a)
        });
        u = !0
    };
    this.deleteCow = function(a) {
        n[a].gotoAndStop("start");
        createjs.Tween.get(n[a]).to({
            y: w[a]
        }, 300, createjs.Ease.cubicIn).call(function() {
            s_iDeleted--
        });
        u = !1
    };
    this._hitCell = function(a) {
        u && (5 < a ? s_oGame._timerModifier(a) : 5 > a && s_oGame._scoreModifier(a), 5 === a ? 0 === n[a].currentFrame || 1 === n[a].currentFrame ? (s_oGame._scoreModifier(a), n[a].gotoAndStop("hitClose"), createjs.Tween.get(n[a], {
                override: !0
            }).wait(500).to({
                y: w[a]
            }, 500, createjs.Ease.cubicIn).call(function() {
                s_iDeleted--
            }), a += 3) : (s_bHammerUsable = !1,
                n[a].gotoAndPlay("hitOpen"), createjs.Tween.get(n[a], {
                    override: !0
                }).wait(2E3).to({
                    y: w[a]
                }, 500, createjs.Ease.cubicIn).call(function() {
                    s_iDeleted--;
                    s_bHammerUsable = !0
                })) : 7 === a ? (n[a].gotoAndPlay("hit"), createjs.Tween.get(n[a], {
                override: !0
            }).wait(600).to({
                y: w[a]
            }, 500, createjs.Ease.cubicIn).call(function() {
                s_iDeleted--
            })) : (n[a].gotoAndStop("hit"), createjs.Tween.get(n[a], {
                override: !0
            }).to({
                x: n[a].x + 5
            }, 500, createjs.Ease.bounceInOut).call(function() {
                n[a].x = v[a];
                createjs.Tween.get(n[a], {
                    override: !0
                }).to({
                        y: w[a]
                    },
                    500, createjs.Ease.cubicIn).call(function() {
                    s_iDeleted--
                })
            })), 0 === a || 1 === a ? !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("hit_cow_1") : 8 === a || 4 === a ? !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("hit_cow_2") : 2 === a ? !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("hit_dog") : 3 === a ? !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("hit_horse") : 6 === a ? !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("explosion") : 7 === a ? !1 !== DISABLE_SOUND_MOBILE &&
            !1 !== s_bMobile || createjs.Sound.play("present") : 5 === a && (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("bite")), p[a].visible = !0, createjs.Tween.get(p[a]).to({
                y: p[a].y - 50
            }, 1500), createjs.Tween.get(p[a]).to({
                alpha: 0
            }, 2E3).call(function() {
                p[a].visible = !1;
                p[a].y += 50;
                p[a].alpha = 1
            }), m[a].visible = !0, createjs.Tween.get(m[a]).to({
                y: m[a].y - 50
            }, 1500), createjs.Tween.get(m[a]).to({
                alpha: 0
            }, 2E3).call(function() {
                m[a].visible = !1;
                m[a].y += 50;
                m[a].alpha = 1
            }), u = !1)
    };
    this.getValue = function() {
        return u
    };
    this.unload =
        function(a) {
            for (a = 0; a < COW_NUM; a++) n.pop(), m.pop(), p.pop();
            m.pop();
            p.pop()
        };
    this._init(a, d, b, e, f, g)
}

function CSpriteLibrary() {
    var a, d, b, e, f, g;
    this.init = function(h, c, k) {
        b = d = 0;
        e = h;
        f = c;
        g = k;
        a = {}
    };
    this.addSprite = function(b, c) {
        a.hasOwnProperty(b) || (a[b] = {
            szPath: c,
            oSprite: new Image
        }, d++)
    };
    this.getSprite = function(b) {
        return a.hasOwnProperty(b) ? a[b].oSprite : null
    };
    this._onSpritesLoaded = function() {
        f.call(g)
    };
    this._onSpriteLoaded = function() {
        e.call(g);
        ++b == d && this._onSpritesLoaded()
    };
    this.loadSprites = function() {
        for (var b in a) a[b].oSprite.oSpriteLibrary = this, a[b].oSprite.onload = function() {
                this.oSpriteLibrary._onSpriteLoaded()
            },
            a[b].oSprite.src = a[b].szPath
    };
    this.getNumSprites = function() {
        return d
    }
}
var CANVAS_WIDTH = 1920,
    CANVAS_HEIGHT = 1080,
    EDGEBOARD_X = 200,
    EDGEBOARD_Y = 70,
    FONT = "jackinputregular",
    FPS = 30,
    DISABLE_SOUND_MOBILE = !1,
    STATE_LOADING = 0,
    STATE_MENU = 1,
    STATE_HELP = 1,
    STATE_GAME = 3,
    NUM_ROWS = 3,
    NUM_COLS = 3,
    COW_NUM = 8,
    LEVEL_MAX, BIGGER_HEIGHT = 367,
    START_X_GRID = 950,
    START_Y_GRID = 425,
    TIME_BAR_WIDTH = 338,
    TIME_BAR_HEIGHT = 22,
    TIME_X = 225,
    TIME_Y = 460,
    HOLE_WIDTH = 297,
    HOLE_HEIGHT = 253,
    HAMMER_WIDTH = 202,
    HAMMER_HEIGHT = 272,
    TIME_LEVEL, SCORE_GOAL, COW_WIDTH = [212, 194, 335, 222, 275, 298, 212, 213],
    COW_HEIGHT = [283, 320, 316, 367, 303, 287,
        317, 332
    ],
    ON_MOUSE_DOWN = 0,
    ON_MOUSE_UP = 1,
    ON_MOUSE_OVER = 2,
    ON_MOUSE_OUT = 3,
    ON_DRAG_START = 4,
    ON_DRAG_END = 5;

function CToggle(a, d, b, e) {
    var f, g, h, c = [],
        k;
    this._init = function(a, b, c, d) {
        g = [];
        h = [];
        var e = new createjs.SpriteSheet({
            images: [c],
            frames: {
                width: c.width / 2,
                height: c.height,
                regX: c.width / 2 / 2,
                regY: c.height / 2
            },
            animations: {
                state_true: [0],
                state_false: [1]
            }
        });
        f = d;
        k = createSprite(e, "state_" + f, c.width / 2 / 2, c.height / 2, c.width / 2, c.height);
        k.mouseEnabled = !0;
        k.x = a;
        k.y = b;
        k.stop();
        s_oStage.addChild(k);
        this._initListener()
    };
    this.unload = function() {
        k.off("mousedown", this.buttonDown);
        k.off("pressup", this.buttonRelease);
        k.mouseEnabled = !1;
        s_oStage.removeChild(k)
    };
    this._initListener = function() {
        k.on("mousedown", this.buttonDown);
        k.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(a, b, c) {
        g[a] = b;
        h[a] = c
    };
    this.addEventListenerWithParams = function(a, b, d, e) {
        g[a] = b;
        h[a] = d;
        c = e
    };
    this.setActive = function(a) {
        f = a;
        k.gotoAndStop("state_" + f)
    };
    this.buttonRelease = function() {
        k.scaleX = 1;
        k.scaleY = 1;
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("zc_press_but");
        f = !f;
        k.gotoAndStop("state_" + f);
        g[ON_MOUSE_UP] && g[ON_MOUSE_UP].call(h[ON_MOUSE_UP],
            c)
    };
    this.buttonDown = function() {
        k.scaleX = .9;
        k.scaleY = .9;
        g[ON_MOUSE_DOWN] && g[ON_MOUSE_DOWN].call(h[ON_MOUSE_DOWN], c)
    };
    this.setPosition = function(a, b) {
        k.x = a;
        k.y = b
    };
    this.setVisible = function(a) {
        k.visible = a
    };
    this._init(a, d, b, e)
}
(function(a) {
    (jQuery.browser = jQuery.browser || {}).mobile = /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,
        4))
})(navigator.userAgent || navigator.vendor || window.opera);
$(window).resize(function() {
    sizeHandler()
});

function trace(a) {
    console.log(a)
}

function getSize(a) {
    var d = a.toLowerCase(),
        b = window.document,
        e = b.documentElement;
    if (void 0 === window["inner" + a]) a = e["client" + a];
    else if (window["inner" + a] != e["client" + a]) {
        var f = b.createElement("body");
        f.id = "vpw-test-b";
        f.style.cssText = "overflow:scroll";
        var g = b.createElement("div");
        g.id = "vpw-test-d";
        g.style.cssText = "position:absolute;top:-1000px";
        g.innerHTML = "<style>@media(" + d + ":" + e["client" + a] + "px){body#vpw-test-b div#vpw-test-d{" + d + ":7px!important}}</style>";
        f.appendChild(g);
        e.insertBefore(f, b.head);
        a = 7 == g["offset" + a] ? e["client" + a] : window["inner" + a];
        e.removeChild(f)
    } else a = window["inner" + a];
    return a
}
window.addEventListener("orientationchange", onOrientationChange);

function onOrientationChange() {
    window.matchMedia("(orientation: portrait)").matches && sizeHandler();
    window.matchMedia("(orientation: landscape)").matches && sizeHandler()
}

function getIOSWindowHeight() {
    return document.documentElement.clientWidth / window.innerWidth * window.innerHeight
}

function getHeightOfIOSToolbars() {
    var a = (0 === window.orientation ? screen.height : screen.width) - getIOSWindowHeight();
    return 1 < a ? a : 0
}

function sizeHandler() {
    window.scrollTo(0, 1);
    if ($("#canvas")) {
        var a;
        a = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? getIOSWindowHeight() : getSize("Height");
        var d = getSize("Width"),
            b = Math.min(a / CANVAS_HEIGHT, d / CANVAS_WIDTH),
            e = CANVAS_WIDTH * b,
            b = CANVAS_HEIGHT * b,
            f = 0;
        b < a ? (f = a - b, b += f, e += CANVAS_WIDTH / CANVAS_HEIGHT * f) : e < d && (f = d - e, e += f, b += CANVAS_HEIGHT / CANVAS_WIDTH * f);
        var f = a / 2 - b / 2,
            g = d / 2 - e / 2,
            h = CANVAS_WIDTH / e;
        if (g * h < -EDGEBOARD_X || f * h < -EDGEBOARD_Y) b = Math.min(a / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y), d / (CANVAS_WIDTH - 2 *
            EDGEBOARD_X)), e = CANVAS_WIDTH * b, b *= CANVAS_HEIGHT, f = (a - b) / 2, g = (d - e) / 2, h = CANVAS_WIDTH / e;
        s_iOffsetX = -1 * g * h;
        s_iOffsetY = -1 * f * h;
        0 <= f && (s_iOffsetY = 0);
        0 <= g && (s_iOffsetX = 0);
        null !== s_oInterface && s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        $("#canvas").css("width", e + "px");
        $("#canvas").css("height", b + "px");
        0 > f ? $("#canvas").css("top", f + "px") : $("#canvas").css("top", "0px");
        $("#canvas").css("left", g + "px")
    }
}

function createBitmap(a, d, b) {
    var e = new createjs.Bitmap(a),
        f = new createjs.Shape;
    d && b ? f.graphics.beginFill("#fff").drawRect(0, 0, d, b) : f.graphics.beginFill("#ff0").drawRect(0, 0, a.width, a.height);
    e.hitArea = f;
    return e
}

function createSprite(a, d, b, e, f, g) {
    a = null !== d ? new createjs.Sprite(a, d) : new createjs.Sprite(a);
    d = new createjs.Shape;
    d.graphics.beginFill("#000000").drawRect(-b, -e, f, g);
    a.hitArea = d;
    return a
}

function randomFloatBetween(a, d, b) {
    "undefined" === typeof b && (b = 2);
    return parseFloat(Math.min(a + Math.random() * (d - a), d).toFixed(b))
}

function rotateVector2D(a, d) {
    var b = d.getX() * Math.cos(a) + d.getY() * Math.sin(a),
        e = d.getX() * -Math.sin(a) + d.getY() * Math.cos(a);
    d.set(b, e)
}

function tweenVectorsOnX(a, d, b) {
    return a + b * (d - a)
}

function shuffle(a) {
    for (var d = a.length, b, e; 0 !== d;) e = Math.floor(Math.random() * d), --d, b = a[d], a[d] = a[e], a[e] = b;
    return a
}

function bubbleSort(a) {
    var d;
    do {
        d = !1;
        for (var b = 0; b < a.length - 1; b++) a[b] > a[b + 1] && (d = a[b], a[b] = a[b + 1], a[b + 1] = d, d = !0)
    } while (d)
}

function compare(a, d) {
    return a.index > d.index ? -1 : a.index < d.index ? 1 : 0
}

function easeLinear(a, d, b, e) {
    return b * a / e + d
}

function easeInQuad(a, d, b, e) {
    return b * (a /= e) * a + d
}

function easeInSine(a, d, b, e) {
    return -b * Math.cos(a / e * (Math.PI / 2)) + b + d
}

function easeInCubic(a, d, b, e) {
    return b * (a /= e) * a * a + d
}

function getTrajectoryPoint(a, d) {
    var b = new createjs.Point,
        e = (1 - a) * (1 - a),
        f = a * a;
    b.x = e * d.start.x + 2 * (1 - a) * a * d.traj.x + f * d.end.x;
    b.y = e * d.start.y + 2 * (1 - a) * a * d.traj.y + f * d.end.y;
    return b
}

function formatTime(a) {
    a /= 1E3;
    var d = Math.floor(a / 60);
    a = Math.floor(a - 60 * d);
    var b = "",
        b = 10 > d ? b + ("0" + d + ":") : b + (d + ":");
    return 10 > a ? b + ("0" + a) : b + a
}

function degreesToRadians(a) {
    return a * Math.PI / 180
}

function checkRectCollision(a, d) {
    var b, e;
    b = getBounds(a, .9);
    e = getBounds(d, .98);
    return calculateIntersection(b, e)
}

function calculateIntersection(a, d) {
    var b, e, f, g, h, c, k, l;
    b = a.x + (f = a.width / 2);
    e = a.y + (g = a.height / 2);
    h = d.x + (c = d.width / 2);
    k = d.y + (l = d.height / 2);
    b = Math.abs(b - h) - (f + c);
    e = Math.abs(e - k) - (g + l);
    return 0 > b && 0 > e ? (b = Math.min(Math.min(a.width, d.width), -b), e = Math.min(Math.min(a.height, d.height), -e), {
        x: Math.max(a.x, d.x),
        y: Math.max(a.y, d.y),
        width: b,
        height: e,
        rect1: a,
        rect2: d
    }) : null
}

function getBounds(a, d) {
    var b = {
        x: Infinity,
        y: Infinity,
        width: 0,
        height: 0
    };
    if (a instanceof createjs.Container) {
        b.x2 = -Infinity;
        b.y2 = -Infinity;
        var e = a.children,
            f = e.length,
            g, h;
        for (h = 0; h < f; h++) g = getBounds(e[h], 1), g.x < b.x && (b.x = g.x), g.y < b.y && (b.y = g.y), g.x + g.width > b.x2 && (b.x2 = g.x + g.width), g.y + g.height > b.y2 && (b.y2 = g.y + g.height);
        Infinity == b.x && (b.x = 0);
        Infinity == b.y && (b.y = 0);
        Infinity == b.x2 && (b.x2 = 0);
        Infinity == b.y2 && (b.y2 = 0);
        b.width = b.x2 - b.x;
        b.height = b.y2 - b.y;
        delete b.x2;
        delete b.y2
    } else {
        var c, k;
        a instanceof createjs.Bitmap ?
            (f = a.sourceRect || a.image, h = f.width * d, c = f.height * d) : a instanceof createjs.Sprite ? a.spriteSheet._frames && a.spriteSheet._frames[a.currentFrame] && a.spriteSheet._frames[a.currentFrame].image ? (f = a.spriteSheet.getFrame(a.currentFrame), h = f.rect.width, c = f.rect.height, e = f.regX, k = f.regY) : (b.x = a.x || 0, b.y = a.y || 0) : (b.x = a.x || 0, b.y = a.y || 0);
        e = e || 0;
        h = h || 0;
        k = k || 0;
        c = c || 0;
        b.regX = e;
        b.regY = k;
        f = a.localToGlobal(0 - e, 0 - k);
        g = a.localToGlobal(h - e, c - k);
        h = a.localToGlobal(h - e, 0 - k);
        e = a.localToGlobal(0 - e, c - k);
        b.x = Math.min(Math.min(Math.min(f.x,
            g.x), h.x), e.x);
        b.y = Math.min(Math.min(Math.min(f.y, g.y), h.y), e.y);
        b.width = Math.max(Math.max(Math.max(f.x, g.x), h.x), e.x) - b.x;
        b.height = Math.max(Math.max(Math.max(f.y, g.y), h.y), e.y) - b.y
    }
    return b
}

function NoClickDelay(a) {
    this.element = a;
    window.Touch && this.element.addEventListener("touchstart", this, !1)
}

function shuffle(a) {
    for (var d = a.length, b, e; 0 < d;) e = Math.floor(Math.random() * d), d--, b = a[d], a[d] = a[e], a[e] = b;
    return a
}
NoClickDelay.prototype = {
    handleEvent: function(a) {
        switch (a.type) {
            case "touchstart":
                this.onTouchStart(a);
                break;
            case "touchmove":
                this.onTouchMove(a);
                break;
            case "touchend":
                this.onTouchEnd(a)
        }
    },
    onTouchStart: function(a) {
        a.preventDefault();
        this.moved = !1;
        this.element.addEventListener("touchmove", this, !1);
        this.element.addEventListener("touchend", this, !1)
    },
    onTouchMove: function(a) {
        this.moved = !0
    },
    onTouchEnd: function(a) {
        this.element.removeEventListener("touchmove", this, !1);
        this.element.removeEventListener("touchend",
            this, !1);
        if (!this.moved) {
            a = document.elementFromPoint(a.changedTouches[0].clientX, a.changedTouches[0].clientY);
            3 == a.nodeType && (a = a.parentNode);
            var d = document.createEvent("MouseEvents");
            d.initEvent("click", !0, !0);
            a.dispatchEvent(d)
        }
    }
};
(function() {
    function a(a) {
        var e = {
            focus: "visible",
            focusin: "visible",
            pageshow: "visible",
            blur: "hidden",
            focusout: "hidden",
            pagehide: "hidden"
        };
        a = a || window.event;
        a.type in e ? document.body.className = e[a.type] : (document.body.className = this[d] ? "hidden" : "visible", "hidden" === document.body.className ? s_oMain.stopUpdate() : s_oMain.startUpdate())
    }
    var d = "hidden";
    d in document ? document.addEventListener("visibilitychange", a) : (d = "mozHidden") in document ? document.addEventListener("mozvisibilitychange", a) : (d = "webkitHidden") in
        document ? document.addEventListener("webkitvisibilitychange", a) : (d = "msHidden") in document ? document.addEventListener("msvisibilitychange", a) : "onfocusin" in document ? document.onfocusin = document.onfocusout = a : window.onpageshow = window.onpagehide = window.onfocus = window.onblur = a
})();

function CTextButton(a, d, b, e, f, g, h) {
    var c, k, l, r, u;
    this._init = function(a, b, d, e, f, g, h) {
        c = [];
        k = [];
        var z = createBitmap(d),
            y = Math.ceil(h / 20);
        u = new createjs.Text(e, "bold " + h + "px " + f, "#000000");
        u.textAlign = "center";
        u.textBaseline = "alphabetic";
        var x = u.getBounds();
        u.x = d.width / 2 + 10 + y;
        u.y = Math.floor(d.height / 2) + x.height / 4 + y;
        r = new createjs.Text(e, "bold " + h + "px " + f, g);
        r.textAlign = "center";
        r.textBaseline = "alphabetic";
        x = r.getBounds();
        r.x = d.width / 2 + 10;
        r.y = Math.floor(d.height / 2) + x.height / 4;
        l = new createjs.Container;
        l.x = a;
        l.y = b;
        l.regX = d.width / 2;
        l.regY = d.height / 2;
        l.addChild(z, u, r);
        s_oStage.addChild(l);
        this._initListener()
    };
    this.unload = function() {
        l.off("mousedown");
        l.off("pressup");
        s_oStage.removeChild(l)
    };
    this.setVisible = function(a) {
        l.visible = a
    };
    this._initListener = function() {
        l.on("mousedown", this.buttonDown);
        l.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(a, b, d) {
        c[a] = b;
        k[a] = d
    };
    this.buttonRelease = function() {
        l.scaleX = 1;
        l.scaleY = 1;
        c[ON_MOUSE_UP] && c[ON_MOUSE_UP].call(k[ON_MOUSE_UP])
    };
    this.buttonDown =
        function() {
            l.scaleX = .9;
            l.scaleY = .9;
            !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("zc_press_but");
            c[ON_MOUSE_DOWN] && c[ON_MOUSE_DOWN].call(k[ON_MOUSE_DOWN])
        };
    this.setTextPosition = function(a) {
        r.y = a;
        u.y = a + 2
    };
    this.setPosition = function(a, b) {
        l.x = a;
        l.y = b
    };
    this.setX = function(a) {
        l.x = a
    };
    this.setY = function(a) {
        l.y = a
    };
    this.getButtonImage = function() {
        return l
    };
    this.getX = function() {
        return l.x
    };
    this.getY = function() {
        return l.y
    };
    this._init(a, d, b, e, f, g, h);
    return this
}

function CPreloader() {
    var a, d, b, e, f, g, h;
    this._init = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("bg_menu", newUrl+"/sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("progress_bar", newUrl+"/sprites/progress_bar.png");
        s_oSpriteLibrary.loadSprites();
        h = new createjs.Container;
        s_oStage.addChild(h)
    };
    this.unload = function() {
        h.removeAllChildren()
    };
    this.hide = function() {
        var a = this;
        setTimeout(function() {
            createjs.Tween.get(g).to({
                alpha: 1
            }, 500).call(function() {
                a.unload();
                s_oMain.gotoModeMenu()
            })
        }, 1E3)
    };
    this._onImagesLoaded = function() {};
    this._onAllImagesLoaded = function() {
        this.attachSprites();
        s_oMain.preloaderReady()
    };
    this.attachSprites = function() {
        var c = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        h.addChild(c);
        c = s_oSpriteLibrary.getSprite("progress_bar");
        e = createBitmap(c);
        e.x = CANVAS_WIDTH / 2 - c.width / 2;
        e.y = CANVAS_HEIGHT - 250;
        h.addChild(e);
        a = c.width;
        d = c.height;
        f = new createjs.Shape;
        f.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(e.x, e.y, 1, d);
        h.addChild(f);
        e.mask = f;
        b = new createjs.Text("", "30px " + FONT, "#fff");
        b.x = CANVAS_WIDTH / 2;
        b.y = CANVAS_HEIGHT - 250;
        b.shadow = new createjs.Shadow("#000", 2, 2, 2);
        b.textBaseline = "alphabetic";
        b.textAlign = "center";
        h.addChild(b);
        g = new createjs.Shape;
        g.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        g.alpha = 0;
        h.addChild(g)
    };
    this.refreshLoader = function(c) {
        b.text = c + "%";
        f.graphics.clear();
        c = Math.floor(c * a / 100);
        f.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(e.x, e.y, c, d)
    };
    this._init()
}

function CNextLevel(a, d, b) {
    var e, f, g, h;
    this._init = function(a) {
        e = createBitmap(a);
        g = new createjs.Text("", " 120px " + FONT, "#a74085");
        g.x = CANVAS_WIDTH / 2;
        g.y = CANVAS_HEIGHT / 3 + 100;
        g.textAlign = "center";
        g.textBaseline = "alphabetic";
        g.lineWidth = 600;
        h = new createjs.Text(b, " 70px " + FONT, "#633f01");
        h.x = CANVAS_WIDTH / 2;
        h.y = CANVAS_HEIGHT / 2 + 50;
        h.textAlign = "center";
        h.textBaseline = "alphabetic";
        h.lineWidth = 500;
        f = new createjs.Container;
        f.alpha = 0;
        f.visible = !1;
        f.addChild(e, g, h);
        s_oStage.addChild(f);
        this.show(d)
    };
    this._initListener =
        function() {
            f.on("mousedown", this._onExit)
        };
    this.show = function(a) {
        0 < a && (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("win"));
        g.text = "LEVEL " + (a + 1);
        h.text = "THE SCORE TO BEAT IS " + b;
        f.visible = !0;
        var d = this;
        createjs.Tween.get(f).to({
            alpha: 1
        }, 500).call(function() {
            d._initListener()
        });
        $(s_oMain).trigger("next_level", [a])
    };
    this._onExit = function() {
        f.off("mousedown", this._onExit);
        s_oStage.removeChild(f);
        s_oGame.onNextLevelExit()
    };
    this._init(a);
    return this
}

function CMenu() {
    var a, d, b, e, f;
    this._init = function() {
        e = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        s_oStage.addChild(e);
        var g = CANVAS_WIDTH / 2,
            h = s_oSpriteLibrary.getSprite("but_play");
        b = CTextButton(g, 875, h, "START", FONT, "#ffcc00", 60);
        b.addEventListener(ON_MOUSE_UP, this._onStart, this, 0);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) g = s_oSpriteLibrary.getSprite("audio_icon"), a = CANVAS_WIDTH - g.width / 2, d = g.height / 2 + 10, f = new CToggle(a, d, g, s_bAudioActive), f.addEventListener(ON_MOUSE_UP, this._onAudioToggle,
            this), s_oSoundTrack.volume = 1;
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.unload = function() {
        b.unload();
        s_oMenu = null;
        s_oStage.removeAllChildren()
    };
    this.refreshButtonPos = function(b, e) {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || f.setPosition(a - b, e + d)
    };
    this._onStart = function(a) {
        s_oMenu.unload();
        s_oMain.gotoHelp()
    };
    this._onAudioToggle = function() {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    s_oMenu = this;
    this._init()
}
s_oMenu = null;

function CMain(a) {
    var d, b = 0,
        e = 0,
        f = STATE_LOADING,
        g, h, c;
    this.initContainer = function() {
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
        createjs.Touch.enable(s_oStage);
        s_bMobile = jQuery.browser.mobile;
        !1 === s_bMobile && (s_oStage.enableMouseOver(20), $("body").on("contextmenu", "#canvas", function(a) {
            return !1
        }));
        s_iPrevTime = (new Date).getTime();
        createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.setFPS(FPS);
        navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0);
        s_oSpriteLibrary = new CSpriteLibrary;
        h = new CPreloader
    };
    this.preloaderReady = function() {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || this._initSounds();
        this._loadImages();
        d = !0
    };
    this.soundLoaded = function() {
        b++;
        h.refreshLoader(Math.floor(b / e * 100));
        if (b === e) {
            h.unload();
            if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) s_oSoundTrack = createjs.Sound.play("soundtrack", {
                loop: -1
            });
            this.gotoMenu()
        }
    };
    this._initSounds = function() {
        createjs.Sound.initializeDefaultPlugins() && (0 < navigator.userAgent.indexOf("Opera") || 0 <
            navigator.userAgent.indexOf("OPR") ? (createjs.Sound.alternateExtensions = ["mp3"], createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this)), createjs.Sound.registerSound(newUrl+"/sounds/zc_soundtrack.ogg", "soundtrack"), createjs.Sound.registerSound(newUrl+"/sounds/zc_but_press.ogg", "click"), createjs.Sound.registerSound(newUrl+"/sounds/zc_game_over.ogg", "game_over"), createjs.Sound.registerSound(newUrl+"/sounds/zc_hammer.ogg", "hammer", 9), createjs.Sound.registerSound(newUrl+"/sounds/zc_hit_cow_1.ogg", "hit_cow_1",
                2), createjs.Sound.registerSound(newUrl+"/sounds/zc_hit_cow_2.ogg", "hit_cow_2", 2), createjs.Sound.registerSound(newUrl+"/sounds/zc_hit_dog.ogg", "hit_dog", 2), createjs.Sound.registerSound(newUrl+"/sounds/zc_hit_horse.ogg", "hit_horse", 2), createjs.Sound.registerSound(newUrl+"/sounds/zc_explosion.ogg", "explosion", 2), createjs.Sound.registerSound(newUrl+"/sounds/zc_present.ogg", "present"), createjs.Sound.registerSound(newUrl+"/sounds/zc_bite.ogg", "bite"), createjs.Sound.registerSound(newUrl+"/sounds/zc_win.ogg", "win"), createjs.Sound.registerSound(newUrl+"/sounds/zc_press_but.ogg",
                "zc_press_but"), createjs.Sound.registerSound(newUrl+"/sounds/zc_goal.ogg", "zc_goal")) : (createjs.Sound.alternateExtensions = ["ogg"], createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this)), createjs.Sound.registerSound(newUrl+"/sounds/zc_soundtrack.mp3", "soundtrack"), createjs.Sound.registerSound(newUrl+"/sounds/zc_but_press.mp3", "click"), createjs.Sound.registerSound(newUrl+"/sounds/zc_game_over.mp3", "game_over"), createjs.Sound.registerSound(newUrl+"/sounds/zc_hammer.mp3", "hammer", 9), createjs.Sound.registerSound(newUrl+"/sounds/zc_hit_cow_1.mp3",
                "hit_cow_1", 2), createjs.Sound.registerSound(newUrl+"/sounds/zc_hit_cow_2.mp3", "hit_cow_2", 2), createjs.Sound.registerSound(newUrl+"/sounds/zc_hit_dog.mp3", "hit_dog", 2), createjs.Sound.registerSound(newUrl+"/sounds/zc_hit_horse.mp3", "hit_horse", 2), createjs.Sound.registerSound(newUrl+"/sounds/zc_explosion.mp3", "explosion", 2), createjs.Sound.registerSound(newUrl+"/sounds/zc_present.mp3", "present"), createjs.Sound.registerSound(newUrl+"/sounds/zc_bite.mp3", "bite"), createjs.Sound.registerSound(newUrl+"/sounds/zc_win.mp3", "win"), createjs.Sound.registerSound(newUrl+"/sounds/zc_press_but.mp3",
                "zc_press_but"), createjs.Sound.registerSound(newUrl+"/sounds/zc_goal.mp3", "zc_goal")), e += 12)
    };
    this._loadImages = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("but_play", newUrl+"/sprites/but_play.png");
        s_oSpriteLibrary.addSprite("msg_box", newUrl+"/sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("bg_menu", newUrl+"/sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_help", newUrl+"/sprites/bg_help.jpg");
        s_oSpriteLibrary.addSprite("bg_game", newUrl+"/sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("but_exit", newUrl+"/sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("audio_icon", newUrl+"/sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("hole_button", newUrl+"/sprites/buco1.png");
        s_oSpriteLibrary.addSprite("bg_timebar", newUrl+"/sprites/bg_timebar.png");
        s_oSpriteLibrary.addSprite("fill_timebar", newUrl+"/sprites/fill_timebar.png");
        s_oSpriteLibrary.addSprite("target", newUrl+"/sprites/target.png");
        s_oSpriteLibrary.addSprite("hammer_icon", newUrl+"/sprites/hammer_icon.png");
        s_oSpriteLibrary.addSprite("HoleSprites",
            newUrl+"/sprites/HoleSprites.png");
        s_oSpriteLibrary.addSprite("hammerSprites", newUrl+"/sprites/hammerSprites.png");
        for (var a = 0; 8 > a; a++) s_oSpriteLibrary.addSprite("cow" + a, newUrl+"/sprites/cow" + a + ".png");
        e += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites()
    };
    this._onImagesLoaded = function() {
        b++;
        h.refreshLoader(Math.floor(b / e * 100));
        if (b === e) {
            h.unload();
            if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) s_oSoundTrack = createjs.Sound.play("soundtrack", {
                loop: -1
            });
            this.gotoMenu()
        }
    };
    this._onAllImagesLoaded = function() {};
    this.onAllPreloaderImagesLoaded = function() {
        this._loadImages()
    };
    this.gotoMenu = function() {
        new CMenu;
        f = STATE_MENU
    };
    this.gotoGame = function() {
        trace("_oData.level_time " + g.level_time);
        trace("_oData.level_goal " + g.level_goal);
        c = new CGame(g);
        f = STATE_GAME;
        $(s_oMain).trigger("game_start")
    };
    this.gotoHelp = function() {
        new CHelp;
        f = STATE_HELP
    };
    this.stopUpdate = function() {
        d = !1
    };
    this.startUpdate = function() {
        d = !0
    };
    this._update = function(a) {
        if (!1 !== d) {
            var b = (new Date).getTime();
            s_iTimeElaps = b - s_iPrevTime;
            s_iCntTime += s_iTimeElaps;
            s_iCntFps++;
            s_iPrevTime = b;
            1E3 <= s_iCntTime && (s_iCurFps = s_iCntFps, s_iCntTime -= 1E3, s_iCntFps = 0);
            f === STATE_GAME && c.update();
            s_oStage.update(a)
        }
    };
    s_oMain = this;
    g = a;
    trace("assign data: " + g);
    this.initContainer()
}
var s_bMobile, s_bAudioActive = !0,
    s_iCntTime = 0,
    s_iTimeElaps = 0,
    s_iPrevTime = 0,
    s_iCntFps = 0,
    s_iCurFps = 0,
    s_szImage, s_iDeleted = 0,
    s_iLevel = 0,
    s_bHammerUsable = !0,
    s_bGoalReached = !1,
    s_oDrawLayer, s_oStage, s_oMain, s_oSpriteLibrary, s_oSoundTrack, s_oCanvas, s_oLevelSettings;

function CLevelSettings(a) {
    var d, b = [];
    this._init = function(a) {
        b[0] = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2];
        b[1] = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 6, 6, 6, 6, 6, 7];
        b[2] = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 6, 6, 6, 6, 6, 7];
        b[3] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 6, 7];
        b[4] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 6, 6, 6, 6, 6, 7];
        b[5] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6,
            6, 7
        ];
        b[6] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7];
        d = [];
        for (a = 0; a < SCORE_GOAL.length; a++) d[a] = SCORE_GOAL[a];
        LEVEL_MAX = b.length
    };
    this.getLevel = function(a, d) {
        return b[a][d]
    };
    this.getElementsNum = function(a) {
        return b[a].length
    };
    this.getLevelMax = function() {
        return b.lenght - 1
    };
    this.getGoalInLevel = function(a) {
        return d[a]
    };
    this.unload = function() {
        for (var a = 0; 7 > a; a++) b.pop(), d.pop()
    };
    this._init(a)
};