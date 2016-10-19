function CPitcher(a) {
    var b = [];
    this._init = function(a) {
        for (var d = 0; d < NUM_SPRITE_PLAYERS; d++)
            b.push(createBitmap(s_oSpriteLibrary.getSprite("pitcher_" + d))),
            b[d].x = PITCHER_X,
            b[d].y = PITCHER_Y,
            b[d].rotation = 0,
            b[d].visible = !1,
            a.addChild(b[d]);
        b[0].visible = !0
    }
    ;
    this.viewPitcher = function(a) {
        b[a].visible = !0
    }
    ;
    this.hidePitcher = function(a) {
        b[a].visible = !1
    }
    ;
    this.getValue = function() {
        return _bCellOccupied
    }
    ;
    this.unload = function(a) {}
    ;
    s_oPticher = this;
    this._init(a)
}
s_oPticher = null ;
function CPanel(a) {
    var b, c, d, e, g, f, h, k;
    this._init = function(a) {
        b = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
        d = new createjs.Text(TEXT_PANEL," 60px " + FONT2,"#ffffff");
        d.x = CANVAS_WIDTH / 2;
        d.y = CANVAS_HEIGHT / 2 - 50;
        d.textAlign = "center";
        d.textBaseline = "alphabetic";
        d.lineWidth = 450;
        d.lineHeight = 60;
        d.outline = 5;
        e = new createjs.Text(TEXT_PANEL," 60px " + FONT2,"#ff0000");
        e.x = CANVAS_WIDTH / 2;
        e.y = CANVAS_HEIGHT / 2 - 50;
        e.textAlign = "center";
        e.textBaseline = "alphabetic";
        e.lineWidth = 450;
        e.lineHeight = 60;
        h = new createjs.Text(a," 60px " + FONT2,"#ffffff");
        h.x = CANVAS_WIDTH / 2 - 50;
        h.y = CANVAS_HEIGHT / 2 + 80;
        h.textAlign = "right";
        h.textBaseline = "alphabetic";
        h.lineWidth = 500;
        h.outline = 5;
        k = new createjs.Text(a," 60px " + FONT2,"#ff0000");
        k.x = CANVAS_WIDTH / 2 - 50;
        k.y = CANVAS_HEIGHT / 2 + 80;
        k.textAlign = "right";
        k.textBaseline = "alphabetic";
        k.lineWidth = 500;
        g = new createjs.Text(TEXT_PANEL_POINT," 60px " + FONT2,"#ffffff");
        g.x = CANVAS_WIDTH / 2 + 30;
        g.y = CANVAS_HEIGHT / 2 + 80;
        g.textAlign = "center";
        g.textBaseline = "alphabetic";
        g.lineWidth = 500;
        g.outline = 5;
        f = new createjs.Text(TEXT_PANEL_POINT," 60px " + FONT2,"#ff0000");
        f.x = CANVAS_WIDTH / 2 + 30;
        f.y = CANVAS_HEIGHT / 2 + 80;
        f.textAlign = "center";
        f.textBaseline = "alphabetic";
        f.lineWidth = 500;
        c = new createjs.Container;
        c.alpha = 0;
        c.addChild(b, d, h, k, e, g, f);
        s_oStage.addChild(c);
        this.show()
    }
    ;
    this._initListener = function() {
        c.on("mousedown", this._onExit)
    }
    ;
    this.show = function() {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("win");
        c.visible = !0;
        var a = this;
        createjs.Tween.get(c).to({
            alpha: 1
        }, 500, createjs.Ease.cubicOut).call(function() {
            a._initListener()
        })
    }
    ;
    this._onExit = function() {
        c.off("mousedown", this._onExit);
        s_oStage.removeChild(c);
        s_oGame._restart()
    }
    ;
    this._init(a);
    return this
}
function CMenu() {
    var a, b, c, d, e, g, f;
    this._init = function() {
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            s_oSoundtrack.volume = 1,
            s_oBgSound.volume = 0;
        c = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        s_oStage.addChild(c);
        d = createBitmap(s_oSpriteLibrary.getSprite("logo_menu"));
        d.x = 140;
        d.y = 20;
        s_oStage.addChild(d);
        var h = s_oSpriteLibrary.getSprite("but_play");
        e = new CGfxButton(CANVAS_WIDTH / 2,CANVAS_HEIGHT - 225,h);
        e.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            h = s_oSpriteLibrary.getSprite("audio_icon"),
            a = CANVAS_WIDTH - h.height / 2 - 10,
            b = h.height / 2 + 10,
            f = new CToggle(a,b,h,s_bAudioActive),
            f.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        g = new createjs.Shape;
        g.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(g);
        createjs.Tween.get(g).to({
            alpha: 0
        }, 1E3).call(function() {
            g.visible = !1
        });
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    }
    ;
    this.unload = function() {
        e.unload();
        e = null ;
        g.visible = !1;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            f.unload(),
            f = null ;
        s_oStage.removeAllChildren();
        s_oMenu = null
    }
    ;
    this.refreshButtonPos = function(c, d) {
        f.setPosition(a - c, d + b)
    }
    ;
    this._onAudioToggle = function() {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    }
    ;
    this._onButPlayRelease = function() {
        this.unload();
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("click");
        s_oMain.gotoGame()
    }
    ;
    s_oMenu = this;
    this._init()
}
var s_oMenu = null ;
function CMain(a) {
    var b, c = 0, d = 0, e = STATE_LOADING, g, f, h;
    this.initContainer = function() {
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
        createjs.Touch.enable(s_oStage);
        s_bMobile = jQuery.browser.mobile;
        !1 === s_bMobile && (s_oStage.enableMouseOver(20),
        $("body").on("contextmenu", "#canvas", function(a) {
            return !1
        }));
        s_iPrevTime = (new Date).getTime();
        createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.setFPS(30);
        navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0);
        s_oSpriteLibrary = new CSpriteLibrary;
        f = new CPreloader
    }
    ;
    this.preloaderReady = function() {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || this._initSounds();
        this._loadImages();
        b = !0
    }
    ;
    this.soundLoaded = function() {
        c++;
        f.refreshLoader(Math.floor(c / d * 100));
        if (c === d) {
            f.unload();
            if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
                s_oSoundtrack = createjs.Sound.play("baseball_soundtrack", {
                    loop: -1
                }),
                s_oBgSound = createjs.Sound.play("crowd_cheering", {
                    loop: -1
                }),
                s_oBgSound.volume = 0;
            this.gotoMenu()
        }
    }
    ;
    this._initSounds = function() {
        createjs.Sound.initializeDefaultPlugins() && (0 < navigator.userAgent.indexOf("Opera") || 0 < navigator.userAgent.indexOf("OPR") ? (createjs.Sound.alternateExtensions = ["mp3"],
        createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this)),
        createjs.Sound.registerSound("/games/beisbol/sounds/baseball_buzzer.ogg", "baseball_buzzer"),
        createjs.Sound.registerSound("/games/beisbol/sounds/baseball_countdown_1.ogg", "baseball_countdown1"),
        createjs.Sound.registerSound("/games/beisbol/sounds/baseball_countdown_2.ogg", "baseball_countdown2"),
        createjs.Sound.registerSound("/games/beisbol/sounds/baseball_crowd_homerun.ogg", "baseball_crowd_homerun"),
        createjs.Sound.registerSound("/games/beisbol/sounds/baseball_crowd_strike.ogg", "baseball_crowd_strike"),
        createjs.Sound.registerSound("/games/beisbol/sounds/baseball_drop_bounce_grass.ogg", "baseball_drop_bounce_grass"),
        createjs.Sound.registerSound("/games/beisbol/sounds/baseball_hit_ball.ogg", "baseball_hit_ball"),
        createjs.Sound.registerSound("/games/beisbol/sounds/crowd_cheering.ogg", "crowd_cheering"),
        createjs.Sound.registerSound("/games/beisbol/sounds/baseball_applauses.ogg", "baseball_applauses"),
        createjs.Sound.registerSound("/games/beisbol/sounds/baseball_soundtrack.ogg", "baseball_soundtrack"),
        createjs.Sound.registerSound("/games/beisbol/sounds/crowd_ohhh.ogg", "crowd_ohhh")) : (createjs.Sound.alternateExtensions = ["ogg"],
        createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this)),
        createjs.Sound.registerSound("/games/beisbol/sounds/baseball_buzzer.mp3", "baseball_buzzer"),
        createjs.Sound.registerSound("/games/beisbol/sounds/baseball_countdown_1.mp3", "baseball_countdown1"),
        createjs.Sound.registerSound("/games/beisbol/sounds/baseball_countdown_2.mp3", "baseball_countdown2"),
        createjs.Sound.registerSound("/games/beisbol/sounds/baseball_crowd_homerun.mp3", "baseball_crowd_homerun"),
        createjs.Sound.registerSound("/games/beisbol/sounds/baseball_crowd_strike.mp3", "baseball_crowd_strike"),
        createjs.Sound.registerSound("/games/beisbol/sounds/baseball_drop_bounce_grass.mp3", "baseball_drop_bounce_grass"),
        createjs.Sound.registerSound("/games/beisbol/sounds/baseball_hit_ball.mp3", "baseball_hit_ball"),
        createjs.Sound.registerSound("/games/beisbol/sounds/crowd_cheering.mp3", "crowd_cheering"),
        createjs.Sound.registerSound("/games/beisbol/sounds/baseball_applauses.mp3", "baseball_applauses"),
        createjs.Sound.registerSound("/games/beisbol/sounds/baseball_soundtrack.mp3", "baseball_soundtrack"),
        createjs.Sound.registerSound("/games/beisbol/sounds/crowd_ohhh.mp3", "crowd_ohhh")),
        d += 11)
    }
    ;
    this._loadImages = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("but_play", "/games/beisbol/sprites/but_play.png");
        s_oSpriteLibrary.addSprite("msg_box", "/games/beisbol/sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("bg_menu", "/games/beisbol/sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("but_exit", "/games/beisbol/sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("logo_menu", "/games/beisbol/sprites/logo_menu.png");
        s_oSpriteLibrary.addSprite("audio_icon", "/games/beisbol/sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("bg_game", "/games/beisbol/sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("score_panel", "/games/beisbol/sprites/score_panel.png");
        s_oSpriteLibrary.addSprite("air_view", "/games/beisbol/sprites/air_view.jpg");
        s_oSpriteLibrary.addSprite("ball", "/games/beisbol/sprites/ball.png");
        s_oSpriteLibrary.addSprite("ball_shadow", "/games/beisbol/sprites/ball_shadow.png");
        s_oSpriteLibrary.addSprite("area_bottom", "/games/beisbol/sprites/area_bottom.png");
        s_oSpriteLibrary.addSprite("area_top", "/games/beisbol/sprites/area_top.png");
        s_oSpriteLibrary.addSprite("crowd_left", "/games/beisbol/sprites/crowd_left.png");
        s_oSpriteLibrary.addSprite("crowd_right", "/games/beisbol/sprites/crowd_right.png");
        s_oSpriteLibrary.addSprite("1", "/games/beisbol/sprites/1.png");
        s_oSpriteLibrary.addSprite("2", "/games/beisbol/sprites/2.png");
        s_oSpriteLibrary.addSprite("3", "/games/beisbol/sprites/3.png");
        s_oSpriteLibrary.addSprite("start_msg", "/games/beisbol/sprites/start_msg.png");
        s_oSpriteLibrary.addSprite("strike_msg", "/games/beisbol/sprites/strike_msg.png");
        for (var a = 0; a < NUM_SPRITE_BATTING; a++)
            s_oSpriteLibrary.addSprite("batter_batting_" + a, "/games/beisbol/sprites/batter_hit/batter_batting_" + a + ".png");
        for (a = 0; a < NUM_SPRITE_PLAYERS; a++)
            s_oSpriteLibrary.addSprite("batter_idle_" + a, "/games/beisbol/sprites/batter_idle/batter_idle_" + a + ".png");
        for (a = 0; a < NUM_SPRITE_PLAYERS; a++)
            s_oSpriteLibrary.addSprite("pitcher_" + a, "/games/beisbol/sprites/pitcher/pitcher_" + a + ".png");
        d += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites()
    }
    ;
    this._onImagesLoaded = function() {
        c++;
        f.refreshLoader(Math.floor(c / d * 100));
        if (c === d) {
            f.unload();
            if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
                s_oSoundtrack = createjs.Sound.play("soundtrack", {
                    loop: -1
                });
            this.gotoMenu()
        }
    }
    ;
    this._onAllImagesLoaded = function() {}
    ;
    this.onAllPreloaderImagesLoaded = function() {
        this._loadImages()
    }
    ;
    this.gotoMenu = function() {
        new CMenu;
        e = STATE_MENU
    }
    ;
    this.gotoGame = function() {
        h = new CGame(g);
        e = STATE_GAME;
        $(s_oMain).trigger("game_start")
    }
    ;
    this.gotoHelp = function() {
        new CHelp;
        e = STATE_HELP
    }
    ;
    this.stopUpdate = function() {
        b = !1
    }
    ;
    this.startUpdate = function() {
        b = !0
    }
    ;
    this._update = function(a) {
        if (!1 !== b) {
            var c = (new Date).getTime();
            s_iTimeElaps = c - s_iPrevTime;
            s_iCntTime += s_iTimeElaps;
            s_iCntFps++;
            s_iPrevTime = c;
            1E3 <= s_iCntTime && (s_iCurFps = s_iCntFps,
            s_iCntTime -= 1E3,
            s_iCntFps = 0);
            e === STATE_GAME && h.update();
            s_oStage.update(a)
        }
    }
    ;
    s_oMain = this;
    g = a;
    this.initContainer()
}
var s_bMobile, s_bAudioActive = !0, s_iCntTime = 0, s_iTimeElaps = 0, s_iPrevTime = 0, s_iCntFps = 0, s_iCurFps = 0, s_bBounce = !0, s_oDrawLayer, s_oStage, s_oMain, s_oStadium, s_oBall, s_oSpriteLibrary, s_oSoundtrack, s_oBgSound, s_oCanvas;
TEXT_GAMEOVER = "YOU RAN OUT OF BALLS.";
TEXT_SCORE = "YOUR FINAL SCORE IS:\n\n";
TEXT_PAUSE = "PAUSE";
TEXT_PANEL = "CONGRATULATIONS! YOU GOT";
TEXT_PANEL_POINT = " POINTS";
STRIKE_TEXT = "STRIKE!";
SCORE_TEXT = "PTS: ";
function CInterface() {
    var a, b, c, d, e, g, f, h, k, n, m, l, v, t, u, p, w, q, x, z, y;
    this._init = function() {
        var r = s_oSpriteLibrary.getSprite("but_exit");
        c = CANVAS_WIDTH - r.height / 2 - 10;
        d = r.height / 2 + 10;
        v = new CGfxButton(c,d,r,s_oStage);
        v.addEventListener(ON_MOUSE_UP, this._onExit, this);
        a = CANVAS_WIDTH - r.width / 2 - 90;
        b = r.height / 2 + 10;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            r = s_oSpriteLibrary.getSprite("audio_icon"),
            l = new CToggle(a,b,r,s_bAudioActive),
            l.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        t = s_oSpriteLibrary.getSprite("score_panel");
        n = CANVAS_WIDTH / 2 - 260;
        m = 35;
        z = new CGfxButton(n,m,t,s_oStage);
        f = CANVAS_WIDTH / 2 - 315;
        p = new createjs.Text(SCORE_TEXT,"bold 30px " + FONT,"#ff0000");
        p.x = f;
        p.y = 47;
        p.textAlign = "center";
        p.textBaseline = "alphabetic";
        s_oStage.addChild(p);
        g = CANVAS_WIDTH / 2 - 150;
        w = new createjs.Text("0","bold 30px " + FONT,"#ff0000");
        w.x = g;
        w.y = 47;
        w.textAlign = "right";
        w.textBaseline = "alphabetic";
        s_oStage.addChild(w);
        u = s_oSpriteLibrary.getSprite("ball");
        h = CANVAS_WIDTH / 2 - 370;
        k = 80;
        y = new CGfxButton(h,k,u,s_oStage);
        e = CANVAS_WIDTH / 2 - 350;
        q = new createjs.Text("x " + BALL_TO_THROW,"bold 30px " + FONT2,"#ffffff");
        q.x = e;
        q.y = 88;
        q.textAlign = "left";
        q.textBaseline = "alphabetic";
        q.outline = 5;
        s_oStage.addChild(q);
        x = new createjs.Text("x " + BALL_TO_THROW,"bold 30px " + FONT2,"#ff0000");
        x.x = e;
        x.y = 88;
        x.textAlign = "left";
        x.textBaseline = "alphabetic";
        s_oStage.addChild(x);
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    }
    ;
    this.unload = function() {
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            l.unload(),
            l = null ;
        v.unload();
        s_oInterface = null
    }
    ;
    this.refreshButtonPos = function(r, t) {
        v.setPosition(c - r, t + d);
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || l.setPosition(a - r, t + b);
        z.setPosition(n + r, t + m);
        y.setPosition(h + r, t + k);
        p.x = f + r;
        w.x = g + r;
        q.x = e + r;
        x.x = e + r
    }
    ;
    this.viewScore = function(a) {
        w.text = a
    }
    ;
    this.viewBallLeft = function(a) {
        q.text = "x " + (BALL_TO_THROW - a);
        x.text = "x " + (BALL_TO_THROW - a)
    }
    ;
    this._onButHelpRelease = function() {
        _oHelpPanel = new CHelpPanel
    }
    ;
    this._onButRestartRelease = function() {
        s_oGame.restartGame()
    }
    ;
    this.onExitFromHelp = function() {
        _oHelpPanel.unload()
    }
    ;
    this._onAudioToggle = function() {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    }
    ;
    this._onExit = function() {
        s_oGame.onExit()
    }
    ;
    s_oInterface = this;
    this._init();
    return this
}
var s_oInterface = null ;
function CGfxButton(a, b, c) {
    var d, e, g, f = [], h;
    this._init = function(a, c, b) {
        d = 1;
        e = [];
        g = [];
        h = createBitmap(b);
        h.x = a;
        h.y = c;
        h.regX = b.width / 2;
        h.regY = b.height / 2;
        s_oStage.addChild(h);
        this._initListener()
    }
    ;
    this.unload = function() {
        h.off("mousedown", this.buttonDown);
        h.off("pressup", this.buttonRelease);
        s_oStage.removeChild(h)
    }
    ;
    this.setVisible = function(a) {
        h.visible = a
    }
    ;
    this._initListener = function() {
        h.on("mousedown", this.buttonDown);
        h.on("pressup", this.buttonRelease)
    }
    ;
    this.addEventListener = function(a, c, d) {
        e[a] = c;
        g[a] = d
    }
    ;
    this.addEventListenerWithParams = function(a, c, d, b) {
        e[a] = c;
        g[a] = d;
        f = b
    }
    ;
    this.buttonRelease = function() {
        h.scaleX = d;
        h.scaleY = d;
        e[ON_MOUSE_UP] && e[ON_MOUSE_UP].call(g[ON_MOUSE_UP], f)
    }
    ;
    this.buttonDown = function() {
        h.scaleX = .9 * d;
        h.scaleY = .9 * d;
        e[ON_MOUSE_DOWN] && e[ON_MOUSE_DOWN].call(g[ON_MOUSE_DOWN], f)
    }
    ;
    this.setScale = function(a) {
        d = a;
        h.scaleX = a;
        h.scaleY = a
    }
    ;
    this.setPosition = function(a, c) {
        h.x = a;
        h.y = c
    }
    ;
    this.setX = function(a) {
        h.x = a
    }
    ;
    this.setY = function(a) {
        h.y = a
    }
    ;
    this.getButtonImage = function() {
        return h
    }
    ;
    this.getX = function() {
        return h.x
    }
    ;
    this.getY = function() {
        return h.y
    }
    ;
    this._init(a, b, c);
    return this
}
function CGame(a) {
    var b = 0, c = 0, d = 0, e = 0, g = 0, f, h = !1, k = !1, n = !1, m = !1, l = !1, v, t = null , u, p, w, q;
    this._init = function() {
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            s_oSoundtrack.volume = .2,
            s_oBgSound.volume = 1;
        var a = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
        s_oStage.addChild(a);
        u = new createjs.Container;
        s_oStage.addChild(u);
        a = new createjs.Container;
        s_oStage.addChild(a);
        s_oStadium = new CStadium(a);
        v = new CInterface;
        w = new CPitcher(u);
        s_oBall = new CBall(u);
        p = new CBatter(u);
        q = new createjs.Shape;
        q.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(0, 75, CANVAS_WIDTH, CANVAS_HEIGHT + 75);
        u.addChild(q);
        q.on("mousedown", s_oGame._strike, this, !1);
        l = !1;
        a = createBitmap(s_oSpriteLibrary.getSprite("3"));
        a.x = CANVAS_WIDTH / 2;
        a.y = CANVAS_HEIGHT / 2;
        a.regX = 40;
        a.regY = 84;
        s_oStage.addChild(a);
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("baseball_countdown1");
        this.launchCountdown(a)
    }
    ;
    this.launchCountdown = function(a) {
        createjs.Tween.get(a).to({
            scaleX: 1.3,
            scaleY: 1.3
        }, 500, createjs.Ease.cubicOut).wait(500).call(function() {
            this.visible = !1;
            var a = createBitmap(s_oSpriteLibrary.getSprite("2"));
            a.x = CANVAS_WIDTH / 2;
            a.y = CANVAS_HEIGHT / 2;
            a.regX = 40;
            a.regY = 84;
            a.scaleX = .7;
            a.scaleY = .7;
            s_oStage.addChild(a);
            !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("baseball_countdown1");
            createjs.Tween.get(a).to({
                scaleX: 1.3,
                scaleY: 1.3
            }, 500, createjs.Ease.cubicOut).wait(500).call(function() {
                this.visible = !1;
                var a = createBitmap(s_oSpriteLibrary.getSprite("1"));
                a.x = CANVAS_WIDTH / 2;
                a.y = CANVAS_HEIGHT / 2;
                a.regX = 40;
                a.regY = 84;
                a.scaleX = .7;
                a.scaleY = .7;
                s_oStage.addChild(a);
                !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("baseball_countdown1");
                createjs.Tween.get(a).to({
                    scaleX: 1.3,
                    scaleY: 1.3
                }, 500, createjs.Ease.cubicOut).wait(500).call(function() {
                    this.visible = !1;
                    var a = createBitmap(s_oSpriteLibrary.getSprite("start_msg"));
                    a.x = CANVAS_WIDTH / 2;
                    a.y = CANVAS_HEIGHT / 2;
                    a.regX = 202.5;
                    a.regY = 135;
                    a.scaleX = .7;
                    a.scaleY = .7;
                    s_oStage.addChild(a);
                    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("baseball_countdown2");
                    createjs.Tween.get(a).to({
                        scaleX: 1.3,
                        scaleY: 1.3
                    }, 500, createjs.Ease.cubicOut).wait(500).call(function() {
                        this.visible = !1;
                        l = f = !0
                    })
                })
            })
        })
    }
    ;
    this._strike = function() {
        !0 === l && (h ? (p.hideBatter(c, h),
        c = 0) : (p.hideBatter(b, h),
        b = 0),
        q.visible = !q.visible,
        h = !h)
    }
    ;
    this._ballMissed = function() {
        f = !1;
        n = !0;
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("baseball_crowd_strike");
        l = !1;
        var a = createBitmap(s_oSpriteLibrary.getSprite("strike_msg"));
        a.x = CANVAS_WIDTH / 2;
        a.y = CANVAS_HEIGHT / 2;
        a.regX = 223.5;
        a.regY = 148.5;
        a.scaleX = .7;
        a.scaleY = .7;
        s_oStage.addChild(a);
        createjs.Tween.get(a).to({
            scaleX: 1,
            scaleY: 1
        }, 500, createjs.Ease.cubicOut).wait(800).call(function() {
            p.hideBatter(b, h);
            b = 0;
            h && s_oGame._strike();
            this.visible = !1;
            l = f = !0
        })
    }
    ;
    this._setScore = function(a) {
        e += a;
        v.viewScore(e)
    }
    ;
    this.unload = function() {
        q.off("mousedown", s_oGame._strike, this, !1);
        v.unload();
        null !== t && t.unload();
        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren()
    }
    ;
    this.onExit = function() {
        this.unload();
        s_oMain.gotoMenu();
        $(s_oMain).trigger("restart")
    }
    ;
    this.gameOver = function() {
        f = !1;
        t = CEndPanel(s_oSpriteLibrary.getSprite("msg_box"));
        t.show(e)
    }
    ;
    this._viewStadium = function(a, c) {
        s_oStadium.setVisible();
        s_oStadium.viewAndGetScore(a, c);
        m = !0
    }
    ;
    this._restart = function() {
        g >= BALL_TO_THROW ? this.gameOver() : (s_oBall.reset(),
        s_bBounce = !0,
        m = n = k = !1,
        s_oStadium.setInvisible(),
        this._strike())
    }
    ;
    this.update = function() {
        if (f) {
            h ? (p.hideBatter(c, h),
            c + 1 < NUM_SPRITE_BATTING ? (p.viewBatter(c + 1, h),
            c++) : p.viewBatter(c, h),
            4 === c && (s_oBall.hittedControl(),
            s_oBall.getValue())) : (p.hideBatter(b, h),
            b + 1 < NUM_SPRITE_PLAYERS ? (p.viewBatter(b + 1, h),
            b++) : (b = 0,
            p.viewBatter(b, h)));
            !0 === n && (g >= BALL_TO_THROW ? this.gameOver() : (s_oBall.reset(),
            k = !1,
            0 < c && this._strike(),
            n = !1,
            l = !0));
            if (!k || d + 1 < NUM_SPRITE_PLAYERS)
                w.hidePitcher(d),
                d + 1 < NUM_SPRITE_PLAYERS ? (w.viewPitcher(d + 1),
                d++) : d = 0,
                16 === d && (g++,
                v.viewBallLeft(g),
                s_oBall.viewBall(),
                k = !0);
            k && s_oBall.update();
            m && s_oStadium.update()
        }
    }
    ;
    s_oGame = this;
    BALL_TO_THROW = a.ball_to_throw;
    OFFSET_FOR_HIT = a.offset_hit;
    OFFSET_FOR_PERFECT_HIT = a.offset_perfect_hit;
    STEP_SPEED_STADIUM = a.step_spd_stadium;
    AREA_VALUE = [a.score_area1, a.score_area2, a.score_area3];
    ALMOST_MINUS = PERFECT_HIT_Y - OFFSET_FOR_HIT;
    ALMOST_PLUS = PERFECT_HIT_Y + OFFSET_FOR_HIT;
    this._init()
}
var s_oGame;
function CEndPanel(a) {
    var b, c, d, e, g, f;
    this._init = function(a) {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("baseball_buzzer");
        b = createBitmap(a);
        b.x = 0;
        b.y = 0;
        d = new createjs.Text(""," 60px " + FONT2,"#ffffff");
        d.x = CANVAS_WIDTH / 2;
        d.y = CANVAS_HEIGHT / 2 - 150;
        d.textAlign = "center";
        d.textBaseline = "alphabetic";
        d.lineWidth = 500;
        d.lineHeight = 60;
        d.outline = 5;
        e = new createjs.Text(""," 60px " + FONT2,"#ff0000");
        e.x = CANVAS_WIDTH / 2;
        e.y = CANVAS_HEIGHT / 2 - 150;
        e.textAlign = "center";
        e.textBaseline = "alphabetic";
        e.lineHeight = 60;
        e.lineWidth = 500;
        g = new createjs.Text(""," 60px " + FONT2,"#ffffff");
        g.x = CANVAS_WIDTH / 2;
        g.y = CANVAS_HEIGHT / 2 + 40;
        g.textAlign = "center";
        g.textBaseline = "alphabetic";
        g.lineWidth = 500;
        g.outline = 5;
        f = new createjs.Text(""," 60px " + FONT2,"#ff0000");
        f.x = CANVAS_WIDTH / 2;
        f.y = CANVAS_HEIGHT / 2 + 40;
        f.textAlign = "center";
        f.textBaseline = "alphabetic";
        f.lineWidth = 500;
        c = new createjs.Container;
        c.alpha = 0;
        c.visible = !1;
        c.addChild(b, g, f, d, e);
        s_oStage.addChild(c)
    }
    ;
    this.unload = function() {
        c.off("mousedown", this._onExit)
    }
    ;
    this._initListener = function() {
        c.on("mousedown", this._onExit)
    }
    ;
    this.show = function(a) {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("game_over");
        d.text = TEXT_GAMEOVER;
        e.text = TEXT_GAMEOVER;
        g.text = TEXT_SCORE + a;
        f.text = TEXT_SCORE + a;
        c.visible = !0;
        var b = this;
        createjs.Tween.get(c).to({
            alpha: 1
        }, 500).call(function() {
            b._initListener()
        });
        $(s_oMain).trigger("save_score", [a])
    }
    ;
    this._onExit = function() {
        c.off("mousedown", this._onExit);
        s_oStage.removeChild(c);
        s_oGame.onExit()
    }
    ;
    this._init(a);
    return this
}
function CBatter(a) {
    var b = []
      , c = [];
    this._init = function(a) {
        for (var e = 0; e < NUM_SPRITE_BATTING; e++)
            b.push(createBitmap(s_oSpriteLibrary.getSprite("batter_batting_" + e))),
            b[e].x = BATTER_X - 180,
            b[e].y = BATTER_Y - 45,
            b[e].rotation = 0,
            b[e].visible = !1,
            a.addChild(b[e]);
        for (e = 0; e < NUM_SPRITE_PLAYERS; e++)
            c.push(createBitmap(s_oSpriteLibrary.getSprite("batter_idle_" + e))),
            c[e].x = BATTER_X,
            c[e].y = BATTER_Y,
            c[e].rotation = 0,
            c[e].visible = !1,
            a.addChild(c[e]);
        c[0].visible = !0
    }
    ;
    this.viewBatter = function(a, e) {
        e ? b[a].visible = !0 : c[a].visible = !0
    }
    ;
    this.hideBatter = function(a, e) {
        e ? b[a].visible = !1 : c[a].visible = !1
    }
    ;
    this.getValue = function() {
        return _bCellOccupied
    }
    ;
    this.unload = function(a) {}
    ;
    s_oBatter = this;
    this._init(a)
}
s_oBatter = null ;
function CBall(a) {
    var b = 0, c, d, e, g, f, h, k = {
        x: 0,
        y: 0
    }, n = {
        x: 0,
        y: 0
    }, m;
    this._init = function(a) {
        var b = s_oSpriteLibrary.getSprite("ball");
        c = b.width;
        d = b.height;
        f = createBitmap(b);
        this.reset(b);
        a.addChild(f)
    }
    ;
    this.reset = function() {
        f.x = BALL_X;
        f.y = BALL_Y;
        f.regX = c / 2;
        f.regY = d / 2;
        f.scaleX = .4;
        f.scaleY = .4;
        f.rotation = 0;
        f.visible = !1;
        k.x = f.x;
        k.y = f.y;
        n.x = END_POINT_X;
        n.y = END_POINT_Y;
        STEP_SPEED_BALL_HITTED = 1.3;
        g = !1
    }
    ;
    this.viewBall = function() {
        f.visible = !0;
        this._calculateMid(k, n);
        e = !0
    }
    ;
    this.hideBall = function() {
        f.visible = !1
    }
    ;
    this._calculateMid = function(a, c) {
        var b;
        b = Math.floor(50 * Math.random()) + 1;
        b = !0 === g ? c.x < CANVAS_WIDTH / 2 ? c.y > CANVAS_HEIGHT / 2 ? new createjs.Point(Math.floor(Math.random() * (CANVAS_WIDTH / 2)) + 100,CANVAS_HEIGHT / 2 - 200 - b) : new createjs.Point(Math.floor(Math.random() * (CANVAS_WIDTH / 2)) + 100,CANVAS_HEIGHT / 2 - 200 + b) : c.x > CANVAS_WIDTH / 2 ? c.y > CANVAS_HEIGHT / 2 ? new createjs.Point(Math.floor(Math.random() * (CANVAS_WIDTH / 2)) + 300,CANVAS_HEIGHT / 2 - 200 - b) : new createjs.Point(Math.floor(Math.random() * (CANVAS_WIDTH / 2)) + 300,CANVAS_HEIGHT / 2 - 200 + b) : c.x > CANVAS_WIDTH / 2 ? new createjs.Point(CANVAS_WIDTH / 2 - 50,Math.floor(Math.random() * (CANVAS_HEIGHT / 2) - 100) + 100) : new createjs.Point(CANVAS_WIDTH / 2 + 50,Math.floor(Math.random() * (CANVAS_HEIGHT / 2) - 100) + 100) : .5 > Math.random() ? new createjs.Point(CANVAS_WIDTH / 2 - 50,Math.floor(Math.random() * (CANVAS_HEIGHT / 2) - 100) + 100) : new createjs.Point(CANVAS_WIDTH / 2 + 50,Math.floor(Math.random() * (CANVAS_HEIGHT / 2) - 100) + 100);
        m = {
            start: a,
            end: c,
            traj: b
        }
    }
    ;
    this._updateBall = function() {
        b += STEP_SPEED_BALL_HITTED;
        40 < b && (b = 0,
        e = f.visible = !1,
        !0 === g ? s_oGame._viewStadium(h, n) : s_oGame._ballMissed(),
        $(s_oMain).trigger("next_launch"));
        var a;
        a = easeLinear(b, 0, 1, 40);
        a = getTrajectoryPoint(a, m);
        f.x = a.x;
        f.y = a.y;
        !0 === g ? 0 <= f.scaleX ? (f.scaleX -= .03,
        f.scaleY -= .03) : STEP_SPEED_BALL_HITTED -= .2 : 1 > f.scaleX ? (f.scaleX += .03,
        f.scaleY += .03) : STEP_SPEED_BALL_HITTED += .2
    }
    ;
    this.getValue = function() {
        return f
    }
    ;
    this.hittedControl = function() {
        STEP_SPEED_BALL_HITTED = 2;
        f.y >= PERFECT_HIT_Y - OFFSET_FOR_PERFECT_HIT && f.y <= PERFECT_HIT_Y + OFFSET_FOR_PERFECT_HIT ? (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("baseball_hit_ball"),
        m.traj.x < CANVAS_WIDTH / 2 ? (b = 0,
        k.x = PERFECT_HIT_X,
        k.y = PERFECT_HIT_Y,
        n.x = END_POINT_X_PERFECT_LEFT) : (b = 0,
        k.x = PERFECT_HIT_X,
        k.y = PERFECT_HIT_Y,
        n.x = END_POINT_X_PERFECT_RIGHT),
        n.y = END_POINT_Y_PERFECT,
        h = f.y - PERFECT_HIT_Y,
        0 > h && (h *= -1),
        g = !0,
        m = {
            start: k,
            end: n,
            traj: n
        }) : f.y >= ALMOST_MINUS && f.y <= PERFECT_HIT_Y ? (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("baseball_hit_ball"),
        m.traj.x < CANVAS_WIDTH / 2 ? (b = 0,
        k.x = PERFECT_HIT_X,
        k.y = PERFECT_HIT_Y,
        n.x = END_POINT_X_ALMOST_MINUS_RIGHT) : (b = 0,
        k.x = PERFECT_HIT_X,
        k.y = PERFECT_HIT_Y,
        n.x = END_POINT_X_ALMOST_MINUS_LEFT),
        n.y = END_POINT_Y_ALMOST_MINUS,
        h = f.y - PERFECT_HIT_Y,
        0 > h && (h *= -1),
        g = !0,
        m = {
            start: k,
            end: n,
            traj: n
        }) : f.y <= ALMOST_PLUS && f.y >= PERFECT_HIT_Y && (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("baseball_hit_ball"),
        m.traj.x < CANVAS_WIDTH / 2 ? (b = 0,
        k.x = PERFECT_HIT_X,
        k.y = PERFECT_HIT_Y,
        n.x = END_POINT_X_ALMOST_PLUS_RIGHT) : (b = 0,
        k.x = PERFECT_HIT_X,
        k.y = PERFECT_HIT_Y,
        n.x = END_POINT_X_ALMOST_PLUS_LEFT),
        n.y = END_POINT_Y_ALMOST_PLUS,
        h = f.y - PERFECT_HIT_Y,
        0 > h && (h *= -1),
        g = !0,
        m = {
            start: k,
            end: n,
            traj: n
        });
        e = !0
    }
    ;
    this.unload = function() {}
    ;
    this.update = function() {
        e && this._updateBall()
    }
    ;
    this._init(a)
}
function CSpriteLibrary() {
    var a, b, c, d, e, g;
    this.init = function(f, h, k) {
        c = b = 0;
        d = f;
        e = h;
        g = k;
        a = {}
    }
    ;
    this.addSprite = function(c, d) {
        a.hasOwnProperty(c) || (a[c] = {
            szPath: d,
            oSprite: new Image
        },
        b++)
    }
    ;
    this.getSprite = function(c) {
        return a.hasOwnProperty(c) ? a[c].oSprite : null
    }
    ;
    this._onSpritesLoaded = function() {
        e.call(g)
    }
    ;
    this._onSpriteLoaded = function() {
        d.call(g);
        ++c == b && this._onSpritesLoaded()
    }
    ;
    this.loadSprites = function() {
        for (var c in a)
            a[c].oSprite.oSpriteLibrary = this,
            a[c].oSprite.onload = function() {
                this.oSpriteLibrary._onSpriteLoaded()
            }
            ,
            a[c].oSprite.src = a[c].szPath
    }
    ;
    this.getNumSprites = function() {
        return b
    }
}
var CANVAS_WIDTH = 790, CANVAS_HEIGHT = 960, FONT = "pixel_lcd7regular", FONT2 = "SportsJersey-Regular", EDGEBOARD_X = 250, EDGEBOARD_Y = 0, FPS_TIME = 1E3 / 24, DISABLE_SOUND_MOBILE = !1, STATE_LOADING = 0, STATE_MENU = 1, STATE_HELP = 1, STATE_GAME = 3, BATTER_X = CANVAS_WIDTH / 2 - 225, BATTER_Y = CANVAS_HEIGHT - 550, PITCHER_X = CANVAS_WIDTH / 2 - 105, PITCHER_Y = CANVAS_HEIGHT / 2 - 433, BALL_X = CANVAS_WIDTH / 2 - 50, BALL_Y = CANVAS_HEIGHT / 2 - 400, BALL_TO_THROW, STEP_SPEED_BALL_HITTED = 1.3, STEP_SPEED_STADIUM, AREA_VALUE = [], OFFSET_FOR_HIT, OFFSET_FOR_PERFECT_HIT, PERFECT_HIT_X = BALL_X + 50, PERFECT_HIT_Y = BALL_Y + 470, ALMOST_MINUS, ALMOST_PLUS, END_POINT_X = PERFECT_HIT_X, END_POINT_Y = CANVAS_HEIGHT, END_POINT_X_ALMOST_MINUS_LEFT = CANVAS_WIDTH / 2 - 200, END_POINT_X_ALMOST_MINUS_RIGHT = CANVAS_WIDTH / 2 + 200, END_POINT_Y_ALMOST_MINUS = 0, END_POINT_X_ALMOST_PLUS_LEFT = CANVAS_WIDTH / 2 - 300, END_POINT_X_ALMOST_PLUS_RIGHT = CANVAS_WIDTH / 2 + 300, END_POINT_Y_ALMOST_PLUS = 0, END_POINT_X_PERFECT_LEFT = CANVAS_WIDTH / 2 - 100, END_POINT_X_PERFECT_RIGHT = CANVAS_WIDTH / 2 + 100, END_POINT_Y_PERFECT = 0, START_POINT_STADIUM_X = CANVAS_WIDTH / 2, START_POINT_STADIUM_Y = CANVAS_HEIGHT / 2 + 250, NUM_SPRITE_PLAYERS = 26, NUM_SPRITE_BATTING = 18, ON_MOUSE_DOWN = 0, ON_MOUSE_UP = 1, ON_MOUSE_OVER = 2, ON_MOUSE_OUT = 3, ON_DRAG_START = 4, ON_DRAG_END = 5;
function CToggle(a, b, c, d) {
    var e, g, f, h = [], k;
    this._init = function(a, c, b, d) {
        g = [];
        f = [];
        var h = new createjs.SpriteSheet({
            images: [b],
            frames: {
                width: b.width / 2,
                height: b.height,
                regX: b.width / 2 / 2,
                regY: b.height / 2
            },
            animations: {
                state_true: [0],
                state_false: [1]
            }
        });
        e = d;
        k = createSprite(h, "state_" + e, b.width / 2 / 2, b.height / 2, b.width / 2, b.height);
        k.x = a;
        k.y = c;
        k.stop();
        s_oStage.addChild(k);
        this._initListener()
    }
    ;
    this.unload = function() {
        k.off("mousedown", this.buttonDown);
        k.off("pressup", this.buttonRelease);
        s_oStage.removeChild(k)
    }
    ;
    this._initListener = function() {
        k.on("mousedown", this.buttonDown);
        k.on("pressup", this.buttonRelease)
    }
    ;
    this.addEventListener = function(a, c, b) {
        g[a] = c;
        f[a] = b
    }
    ;
    this.addEventListenerWithParams = function(a, c, b, d) {
        g[a] = c;
        f[a] = b;
        h = d
    }
    ;
    this.setActive = function(a) {
        e = a;
        k.gotoAndStop("state_" + e)
    }
    ;
    this.buttonRelease = function() {
        k.scaleX = 1;
        k.scaleY = 1;
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("click");
        e = !e;
        k.gotoAndStop("state_" + e);
        g[ON_MOUSE_UP] && g[ON_MOUSE_UP].call(f[ON_MOUSE_UP], h)
    }
    ;
    this.buttonDown = function() {
        k.scaleX = .9;
        k.scaleY = .9;
        g[ON_MOUSE_DOWN] && g[ON_MOUSE_DOWN].call(f[ON_MOUSE_DOWN], h)
    }
    ;
    this.setPosition = function(a, c) {
        k.x = a;
        k.y = c
    }
    ;
    this.setVisible = function(a) {
        k.visible = a
    }
    ;
    this._init(a, b, c, d)
}
(function(a) {
    (jQuery.browser = jQuery.browser || {}).mobile = /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
})(navigator.userAgent || navigator.vendor || window.opera);
$(window).resize(function() {
    sizeHandler()
});
function trace(a) {
    console.log(a)
}
function getSize(a) {
    var b = a.toLowerCase()
      , c = window.document
      , d = c.documentElement;
    if (void 0 === window["inner" + a])
        a = d["client" + a];
    else if (window["inner" + a] != d["client" + a]) {
        var e = c.createElement("body");
        e.id = "vpw-test-b";
        e.style.cssText = "overflow:scroll";
        var g = c.createElement("div");
        g.id = "vpw-test-d";
        g.style.cssText = "position:absolute;top:-1000px";
        g.innerHTML = "<style>@media(" + b + ":" + d["client" + a] + "px){body#vpw-test-b div#vpw-test-d{" + b + ":7px!important}}</style>";
        e.appendChild(g);
        d.insertBefore(e, c.head);
        a = 7 == g["offset" + a] ? d["client" + a] : window["inner" + a];
        d.removeChild(e)
    } else
        a = window["inner" + a];
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
        var b = getSize("Width")
          , c = Math.min(a / CANVAS_HEIGHT, b / CANVAS_WIDTH)
          , d = CANVAS_WIDTH * c
          , c = CANVAS_HEIGHT * c
          , e = 0;
        c < a ? (e = a - c,
        c += e,
        d += CANVAS_WIDTH / CANVAS_HEIGHT * e) : d < b && (e = b - d,
        d += e,
        c += CANVAS_HEIGHT / CANVAS_WIDTH * e);
        var e = a / 2 - c / 2
          , g = b / 2 - d / 2
          , f = CANVAS_WIDTH / d;
        if (g * f < -EDGEBOARD_X || e * f < -EDGEBOARD_Y)
            c = Math.min(a / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y), b / (CANVAS_WIDTH - 2 * EDGEBOARD_X)),
            d = CANVAS_WIDTH * c,
            c *= CANVAS_HEIGHT,
            e = (a - c) / 2,
            g = (b - d) / 2,
            f = CANVAS_WIDTH / d;
        s_iOffsetX = -1 * g * f;
        s_iOffsetY = -1 * e * f;
        0 <= e && (s_iOffsetY = 0);
        0 <= g && (s_iOffsetX = 0);
        null !== s_oInterface && s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        $("#canvas").css("width", d + "px");
        $("#canvas").css("height", c + "px");
        0 > e ? $("#canvas").css("top", e + "px") : $("#canvas").css("top", "0px");
        $("#canvas").css("left", g + "px")
    }
}
function createBitmap(a, b, c) {
    var d = new createjs.Bitmap(a)
      , e = new createjs.Shape;
    b && c ? e.graphics.beginFill("#fff").drawRect(0, 0, b, c) : e.graphics.beginFill("#ff0").drawRect(0, 0, a.width, a.height);
    d.hitArea = e;
    return d
}
function createSprite(a, b, c, d, e, g) {
    a = null !== b ? new createjs.Sprite(a,b) : new createjs.Sprite(a);
    b = new createjs.Shape;
    b.graphics.beginFill("#000000").drawRect(-c, -d, e, g);
    a.hitArea = b;
    return a
}
function randomFloatBetween(a, b, c) {
    "undefined" === typeof c && (c = 2);
    return parseFloat(Math.min(a + Math.random() * (b - a), b).toFixed(c))
}
function rotateVector2D(a, b) {
    var c = b.getX() * Math.cos(a) + b.getY() * Math.sin(a)
      , d = b.getX() * -Math.sin(a) + b.getY() * Math.cos(a);
    b.set(c, d)
}
function tweenVectorsOnX(a, b, c) {
    return a + c * (b - a)
}
function shuffle(a) {
    for (var b = a.length, c, d; 0 !== b; )
        d = Math.floor(Math.random() * b),
        --b,
        c = a[b],
        a[b] = a[d],
        a[d] = c;
    return a
}
function bubbleSort(a) {
    var b;
    do {
        b = !1;
        for (var c = 0; c < a.length - 1; c++)
            a[c] > a[c + 1] && (b = a[c],
            a[c] = a[c + 1],
            a[c + 1] = b,
            b = !0)
    } while (b)
}
function compare(a, b) {
    return a.index > b.index ? -1 : a.index < b.index ? 1 : 0
}
function easeLinear(a, b, c, d) {
    return c * a / d + b
}
function easeInQuad(a, b, c, d) {
    return c * (a /= d) * a + b
}
function easeInSine(a, b, c, d) {
    return -c * Math.cos(a / d * (Math.PI / 2)) + c + b
}
function easeInCubic(a, b, c, d) {
    return c * (a /= d) * a * a + b
}
function getTrajectoryPoint(a, b) {
    var c = new createjs.Point
      , d = (1 - a) * (1 - a)
      , e = a * a;
    c.x = d * b.start.x + 2 * (1 - a) * a * b.traj.x + e * b.end.x;
    c.y = d * b.start.y + 2 * (1 - a) * a * b.traj.y + e * b.end.y;
    return c
}
function formatTime(a) {
    a /= 1E3;
    var b = Math.floor(a / 60);
    a = Math.floor(a - 60 * b);
    var c = ""
      , c = 10 > b ? c + ("0" + b + ":") : c + (b + ":");
    return 10 > a ? c + ("0" + a) : c + a
}
function degreesToRadians(a) {
    return a * Math.PI / 180
}
function checkRectCollision(a, b) {
    var c, d;
    c = getBounds(a, .9);
    d = getBounds(b, .98);
    return calculateIntersection(c, d)
}
function calculateIntersection(a, b) {
    var c, d, e, g, f, h, k, n;
    c = a.x + (e = a.width / 2);
    d = a.y + (g = a.height / 2);
    f = b.x + (h = b.width / 2);
    k = b.y + (n = b.height / 2);
    c = Math.abs(c - f) - (e + h);
    d = Math.abs(d - k) - (g + n);
    return 0 > c && 0 > d ? (c = Math.min(Math.min(a.width, b.width), -c),
    d = Math.min(Math.min(a.height, b.height), -d),
    {
        x: Math.max(a.x, b.x),
        y: Math.max(a.y, b.y),
        width: c,
        height: d,
        rect1: a,
        rect2: b
    }) : null
}
function getBounds(a, b) {
    var c = {
        x: Infinity,
        y: Infinity,
        width: 0,
        height: 0
    };
    if (a instanceof createjs.Container) {
        c.x2 = -Infinity;
        c.y2 = -Infinity;
        var d = a.children, e = d.length, g, f;
        for (f = 0; f < e; f++)
            g = getBounds(d[f], 1),
            g.x < c.x && (c.x = g.x),
            g.y < c.y && (c.y = g.y),
            g.x + g.width > c.x2 && (c.x2 = g.x + g.width),
            g.y + g.height > c.y2 && (c.y2 = g.y + g.height);
        Infinity == c.x && (c.x = 0);
        Infinity == c.y && (c.y = 0);
        Infinity == c.x2 && (c.x2 = 0);
        Infinity == c.y2 && (c.y2 = 0);
        c.width = c.x2 - c.x;
        c.height = c.y2 - c.y;
        delete c.x2;
        delete c.y2
    } else {
        var h, k;
        a instanceof createjs.Bitmap ? (e = a.sourceRect || a.image,
        f = e.width * b,
        h = e.height * b) : a instanceof createjs.Sprite ? a.spriteSheet._frames && a.spriteSheet._frames[a.currentFrame] && a.spriteSheet._frames[a.currentFrame].image ? (e = a.spriteSheet.getFrame(a.currentFrame),
        f = e.rect.width,
        h = e.rect.height,
        d = e.regX,
        k = e.regY) : (c.x = a.x || 0,
        c.y = a.y || 0) : (c.x = a.x || 0,
        c.y = a.y || 0);
        d = d || 0;
        f = f || 0;
        k = k || 0;
        h = h || 0;
        c.regX = d;
        c.regY = k;
        e = a.localToGlobal(0 - d, 0 - k);
        g = a.localToGlobal(f - d, h - k);
        f = a.localToGlobal(f - d, 0 - k);
        d = a.localToGlobal(0 - d, h - k);
        c.x = Math.min(Math.min(Math.min(e.x, g.x), f.x), d.x);
        c.y = Math.min(Math.min(Math.min(e.y, g.y), f.y), d.y);
        c.width = Math.max(Math.max(Math.max(e.x, g.x), f.x), d.x) - c.x;
        c.height = Math.max(Math.max(Math.max(e.y, g.y), f.y), d.y) - c.y
    }
    return c
}
function NoClickDelay(a) {
    this.element = a;
    window.Touch && this.element.addEventListener("touchstart", this, !1)
}
function shuffle(a) {
    for (var b = a.length, c, d; 0 < b; )
        d = Math.floor(Math.random() * b),
        b--,
        c = a[b],
        a[b] = a[d],
        a[d] = c;
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
        this.element.removeEventListener("touchend", this, !1);
        if (!this.moved) {
            a = document.elementFromPoint(a.changedTouches[0].clientX, a.changedTouches[0].clientY);
            3 == a.nodeType && (a = a.parentNode);
            var b = document.createEvent("MouseEvents");
            b.initEvent("click", !0, !0);
            a.dispatchEvent(b)
        }
    }
};
(function() {
    function a(a) {
        var d = {
            focus: "visible",
            focusin: "visible",
            pageshow: "visible",
            blur: "hidden",
            focusout: "hidden",
            pagehide: "hidden"
        };
        a = a || window.event;
        a.type in d ? document.body.className = d[a.type] : (document.body.className = this[b] ? "hidden" : "visible",
        "hidden" === document.body.className ? s_oMain.stopUpdate() : s_oMain.startUpdate())
    }
    var b = "hidden";
    b in document ? document.addEventListener("visibilitychange", a) : (b = "mozHidden")in document ? document.addEventListener("mozvisibilitychange", a) : (b = "webkitHidden")in document ? document.addEventListener("webkitvisibilitychange", a) : (b = "msHidden")in document ? document.addEventListener("msvisibilitychange", a) : "onfocusin"in document ? document.onfocusin = document.onfocusout = a : window.onpageshow = window.onpagehide = window.onfocus = window.onblur = a
})();
function CTextButton(a, b, c, d, e, g, f) {
    var h, k, n, m, l;
    this._init = function(a, c, b, d, e, f, g) {
        h = [];
        k = [];
        var z = createBitmap(b)
          , y = Math.ceil(g / 20);
        l = new createjs.Text(d,"bold " + g + "px " + e,"#000000");
        l.textAlign = "center";
        l.textBaseline = "alphabetic";
        var r = l.getBounds();
        l.x = b.width / 2 + y;
        l.y = Math.floor(b.height / 2) + r.height / 3 + y;
        m = new createjs.Text(d,"bold " + g + "px " + e,f);
        m.textAlign = "center";
        m.textBaseline = "alphabetic";
        r = m.getBounds();
        m.x = b.width / 2;
        m.y = Math.floor(b.height / 2) + r.height / 3;
        n = new createjs.Container;
        n.x = a;
        n.y = c;
        n.regX = b.width / 2;
        n.regY = b.height / 2;
        n.addChild(z, l, m);
        s_oStage.addChild(n);
        this._initListener()
    }
    ;
    this.unload = function() {
        n.off("mousedown");
        n.off("pressup");
        s_oStage.removeChild(n)
    }
    ;
    this.setVisible = function(a) {
        n.visible = a
    }
    ;
    this._initListener = function() {
        oParent = this;
        n.on("mousedown", this.buttonDown);
        n.on("pressup", this.buttonRelease)
    }
    ;
    this.addEventListener = function(a, c, b) {
        h[a] = c;
        k[a] = b
    }
    ;
    this.buttonRelease = function() {
        n.scaleX = 1;
        n.scaleY = 1;
        h[ON_MOUSE_UP] && h[ON_MOUSE_UP].call(k[ON_MOUSE_UP])
    }
    ;
    this.buttonDown = function() {
        n.scaleX = .9;
        n.scaleY = .9;
        h[ON_MOUSE_DOWN] && h[ON_MOUSE_DOWN].call(k[ON_MOUSE_DOWN])
    }
    ;
    this.setTextPosition = function(a) {
        m.y = a;
        l.y = a + 2
    }
    ;
    this.setPosition = function(a, c) {
        n.x = a;
        n.y = c
    }
    ;
    this.setX = function(a) {
        n.x = a
    }
    ;
    this.setY = function(a) {
        n.y = a
    }
    ;
    this.getButtonImage = function() {
        return n
    }
    ;
    this.getX = function() {
        return n.x
    }
    ;
    this.getY = function() {
        return n.y
    }
    ;
    this._init(a, b, c, d, e, g, f);
    return this
}
function CStadiumBall(a, b, c, d, e, g) {
    var f = 0, h = 40, k, n, m, l, v = {
        x: 0,
        y: 0
    }, t = {
        x: 0,
        y: 0
    }, u = {
        x: 0,
        y: 0
    }, p = {
        x: 0,
        y: 0
    }, w, q, x = !1;
    this._init = function(a, c, b, d, e) {
        k = e;
        l = createBitmap(s_oSpriteLibrary.getSprite("ball_shadow"));
        l.x = a.x;
        l.y = a.y;
        l.regX = l.width / 2;
        l.regY = l.height / 2;
        l.scaleX = .2;
        l.scaleY = .2;
        l.alpha = .5;
        l.rotation = 0;
        d.addChild(l);
        m = createBitmap(s_oSpriteLibrary.getSprite("ball"));
        m.x = a.x;
        m.y = a.y;
        m.regX = m.width / 2;
        m.regY = m.height / 2;
        m.scaleX = .3;
        m.scaleY = .3;
        m.rotation = 0;
        d.addChild(m);
        t.x = l.x;
        t.y = l.y;
        v.x = m.x;
        v.y = m.y;
        u.x = c.x;
        u.y = c.y;
        p.x = b.x;
        p.y = b.y;
        n = !0;
        this._calculateMid(v, u)
    }
    ;
    this.viewBall = function() {
        m.visible = !0;
        n = l.visible = !0
    }
    ;
    this.hideBall = function() {
        m.visible = !1;
        l.visible = !1
    }
    ;
    this._calculateMid = function(a, c) {
        var b;
        !1 === x ? (Math.random(),
        b = new createjs.Point(CANVAS_WIDTH / 2,Math.floor(Math.random() * (CANVAS_HEIGHT / 2) - 100) + 100)) : b = a.x < CANVAS_WIDTH / 2 ? new createjs.Point(c.x + 5,a.y - 20) : new createjs.Point(c.x - 5,a.y - 20);
        w = {
            start: a,
            end: c,
            traj: b
        }
    }
    ;
    this._updateBall = function() {
        f += STEP_SPEED_STADIUM;
        if (f > h) {
            f = 0;
            !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("baseball_drop_bounce_grass");
            if (!0 === x || !1 === s_bBounce) {
                n = !1;
                h = 40;
                m.scaleX = .3;
                m.scaleY = .3;
                l.scaleX = .3;
                l.scaleY = .3;
                var a;
                switch (k) {
                case 0:
                    a = Math.floor(AREA_VALUE[0] + g / 10);
                    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("baseball_applauses");
                    break;
                case 1:
                    a = Math.floor(AREA_VALUE[1] + g / 5);
                    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("crowd_ohhh");
                    break;
                case 2:
                    a = Math.floor(AREA_VALUE[2] + g + 10);
                    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("baseball_crowd_homerun");
                    break;
                case 3:
                    a = Math.floor(AREA_VALUE[2] + g + 10),
                    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("baseball_crowd_homerun")
                }
                0 > a && (a = -1 * a - 10);
                2 <= k && (m.visible = !1,
                l.visible = !1);
                s_oStadium.viewAreaEffect(k, a)
            }
            !0 === s_bBounce && !1 === x && (x = !0,
            h /= 2,
            this._calculateMid(u, p))
        } else
            a = easeLinear(f, 0, 1, h),
            !1 === x ? (a = getTrajectoryPoint(a, w),
            m.x = a.x,
            m.y = a.y,
            a = easeInSine(f, 0, 1, h),
            q = {
                start: t,
                end: u,
                traj: u
            },
            a = getTrajectoryPoint(a, q),
            l.x = a.x,
            l.y = a.y,
            .25 < m.scaleX && (m.scaleX -= .005,
            m.scaleY -= .005,
            l.scaleX -= .008,
            l.scaleY -= .008)) : (a = getTrajectoryPoint(a, w),
            m.x = a.x,
            m.y = a.y,
            a = easeInSine(f, 0, 1, h),
            q = {
                start: u,
                end: p,
                traj: p
            },
            a = getTrajectoryPoint(a, q),
            l.x = a.x,
            l.y = a.y)
    }
    ;
    this.getValue = function() {
        return m
    }
    ;
    this.reset = function() {
        m.x = BALL_X;
        m.y = BALL_Y;
        m.regX = m.width / 2;
        m.regY = m.height / 2;
        m.scaleX = .4;
        m.scaleY = .4;
        m.rotation = 0;
        m.visible = !1;
        v.x = m.x;
        v.y = m.y;
        u.x = END_POINT_X;
        u.y = END_POINT_Y;
        STEP_SPEED_STADIUM = .5
    }
    ;
    this.unload = function() {
        s_oStage.removeChild(d)
    }
    ;
    this.update = function() {
        n && this._updateBall()
    }
    ;
    this._init(a, b, c, d, e, g)
}
function CStadium(a) {
    var b, c, d, e, g, f, h, k;
    this._init = function() {
        var b = createBitmap(s_oSpriteLibrary.getSprite("air_view"));
        a.addChild(b);
        e = createBitmap(s_oSpriteLibrary.getSprite("area_bottom"));
        e.y = CANVAS_HEIGHT / 2;
        e.alpha = .5;
        a.addChild(e);
        g = createBitmap(s_oSpriteLibrary.getSprite("area_top"));
        g.y = CANVAS_HEIGHT / 2 - 55;
        g.alpha = .5;
        a.addChild(g);
        f = createBitmap(s_oSpriteLibrary.getSprite("crowd_left"));
        f.x = CANVAS_WIDTH / 2 + 56;
        f.y = CANVAS_HEIGHT / 2 - 150;
        f.alpha = .5;
        a.addChild(f);
        h = createBitmap(s_oSpriteLibrary.getSprite("crowd_right"));
        h.y = CANVAS_HEIGHT / 2 - 150;
        h.alpha = .5;
        a.addChild(h);
        c = a.visible = !1
    }
    ;
    this.viewAndGetScore = function(a, b) {
        var l = {
            x: 0,
            y: 0
        }
          , v = {
            x: START_POINT_STADIUM_X,
            y: START_POINT_STADIUM_Y
        };
        switch (b.x) {
        case END_POINT_X_ALMOST_MINUS_LEFT:
            a < OFFSET_FOR_HIT / 2 ? (d = 1,
            b.y = g.y + 30,
            l.x = b.x - 10,
            l.y = b.y - 10) : a < OFFSET_FOR_HIT && a >= OFFSET_FOR_HIT / 2 && (d = 0,
            b.y = e.y + 30,
            l.x = b.x - 10,
            l.y = b.y - 10);
            break;
        case END_POINT_X_ALMOST_MINUS_RIGHT:
            a < OFFSET_FOR_HIT / 2 ? (d = 1,
            b.y = g.y + 30,
            l.x = b.x + 10,
            l.y = b.y - 10) : a < OFFSET_FOR_HIT && a >= OFFSET_FOR_HIT / 2 && (d = 0,
            b.y = e.y + 30,
            l.x = b.x + 10,
            l.y = b.y - 10);
            break;
        case END_POINT_X_ALMOST_PLUS_LEFT:
            a < OFFSET_FOR_HIT / 2 ? (d = 1,
            b.y = g.y + 30,
            l.x = b.x - 10,
            l.y = b.y - 10) : a < OFFSET_FOR_HIT && a >= OFFSET_FOR_HIT / 2 && (d = 0,
            b.y = e.y + 40,
            l.x = b.x - 10,
            l.y = b.y - 10);
            break;
        case END_POINT_X_ALMOST_PLUS_RIGHT:
            a < OFFSET_FOR_HIT / 2 ? (d = 1,
            b.y = g.y + 30,
            l.x = b.x + 10,
            l.y = b.y - 10) : a < OFFSET_FOR_HIT && a >= OFFSET_FOR_HIT / 2 && (d = 0,
            b.y = e.y + 50,
            l.x = b.x + 10,
            l.y = b.y - 10);
            break;
        case END_POINT_X_PERFECT_LEFT:
            d = 3;
            s_bBounce = !1;
            b.x -= 30;
            b.y = f.y + 30;
            break;
        case END_POINT_X_PERFECT_RIGHT:
            d = 2,
            s_bBounce = !1,
            b.y = h.y + 30
        }
        var t = new createjs.Container;
        s_oStage.addChild(t);
        k = new CStadiumBall(v,b,l,t,d,a);
        c = !0
    }
    ;
    this.update = function() {
        c && k.update()
    }
    ;
    this.viewAreaEffect = function(a, b) {
        switch (a) {
        case 0:
            createjs.Tween.get(e).to({
                alpha: 1
            }, 300).call(function() {
                createjs.Tween.get(e).to({
                    alpha: .5
                }, 300).call(function() {
                    createjs.Tween.get(e).to({
                        alpha: 1
                    }, 300).call(function() {
                        createjs.Tween.get(e).to({
                            alpha: .5
                        }, 300).call(function() {
                            new CPanel(b);
                            s_oGame._setScore(b)
                        })
                    })
                })
            });
            break;
        case 1:
            createjs.Tween.get(g).to({
                alpha: 1
            }, 300).call(function() {
                createjs.Tween.get(g).to({
                    alpha: .5
                }, 300).call(function() {
                    createjs.Tween.get(g).to({
                        alpha: 1
                    }, 300).call(function() {
                        createjs.Tween.get(g).to({
                            alpha: .5
                        }, 300).call(function() {
                            new CPanel(b);
                            s_oGame._setScore(b)
                        })
                    })
                })
            });
            break;
        case 2:
            createjs.Tween.get(f).to({
                alpha: 1
            }, 300).call(function() {
                createjs.Tween.get(f).to({
                    alpha: .5
                }, 300).call(function() {
                    createjs.Tween.get(f).to({
                        alpha: 1
                    }, 300).call(function() {
                        createjs.Tween.get(f).to({
                            alpha: .5
                        }, 300).call(function() {
                            new CPanel(b);
                            s_oGame._setScore(b)
                        })
                    })
                })
            });
            break;
        case 3:
            createjs.Tween.get(h).to({
                alpha: 1
            }, 300).call(function() {
                createjs.Tween.get(h).to({
                    alpha: .5
                }, 300).call(function() {
                    createjs.Tween.get(h).to({
                        alpha: 1
                    }, 300).call(function() {
                        createjs.Tween.get(h).to({
                            alpha: .5
                        }, 300).call(function() {
                            new CPanel(b);
                            s_oGame._setScore(b)
                        })
                    })
                })
            })
        }
    }
    ;
    this.unload = function() {
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            b.unload(),
            b = null ;
        a.removeAllChildren();
        s_oStadium = null
    }
    ;
    this.setVisible = function() {
        a.visible = !0
    }
    ;
    this.setInvisible = function() {
        a.visible = !1;
        k.unload()
    }
    ;
    s_oStadium = this;
    this._init();
    return this
}
s_oStadium = null ;
function CPreloader() {
    var a, b, c, d, e, g, f;
    this._init = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("bg_menu", "/games/beisbol/sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("progress_bar", "/games/beisbol/sprites/progress_bar.png");
        s_oSpriteLibrary.loadSprites();
        f = new createjs.Container;
        s_oStage.addChild(f)
    }
    ;
    this.unload = function() {
        f.removeAllChildren()
    }
    ;
    this.hide = function() {
        var a = this;
        setTimeout(function() {
            createjs.Tween.get(g).to({
                alpha: 1
            }, 500).call(function() {
                a.unload();
                s_oMain.gotoMenu()
            })
        }, 1E3)
    }
    ;
    this._onImagesLoaded = function() {}
    ;
    this._onAllImagesLoaded = function() {
        this.attachSprites();
        s_oMain.preloaderReady()
    }
    ;
    this.attachSprites = function() {
        var h = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        f.addChild(h);
        h = s_oSpriteLibrary.getSprite("progress_bar");
        d = createBitmap(h);
        d.x = CANVAS_WIDTH / 2 - h.width / 2;
        d.y = CANVAS_HEIGHT - 250;
        f.addChild(d);
        a = h.width;
        b = h.height;
        e = new createjs.Shape;
        e.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(d.x, d.y, 1, b);
        f.addChild(e);
        d.mask = e;
        c = new createjs.Text("","30px Arial","#fff");
        c.x = CANVAS_WIDTH / 2;
        c.y = CANVAS_HEIGHT - 250;
        c.shadow = new createjs.Shadow("#000",2,2,2);
        c.textBaseline = "alphabetic";
        c.textAlign = "center";
        f.addChild(c);
        g = new createjs.Shape;
        g.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        g.alpha = 0;
        f.addChild(g)
    }
    ;
    this.refreshLoader = function(f) {
        c.text = f + "%";
        e.graphics.clear();
        f = Math.floor(f * a / 100);
        e.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(d.x, d.y, f, b)
    }
    ;
    this._init()
}
;