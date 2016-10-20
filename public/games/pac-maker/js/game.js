var newUrl = "/games/pac-maker/";
var game = {
    data: {},
    onload: function() {
        game.data.centertop = 0;
        game.data.device_portrait_orientated = null;
        game.data.lowres = null;
        game.data.Path_Layer = null;
        game.data.Dots_Layer = null;
        game.data.locale = {};
        game.data.scorePw = "p@cM@k3r";
        game.data.widthGame = 0;
        game.data.heightGame = 0;
        game.data.real_widthGame = 0;
        game.data.real_heightGame = 0;
        setupScreenSize();
        var a = getScreenSize("w"),
            a = getScreenSize("h") / a;
        game.data.real_widthGame = game.data.widthGame;
        game.data.real_heightGame = game.data.heightGame;
        game.data.device_portrait_orientated =
            devicePortraitOriented();
        var b = me.video.CANVAS;
        if (me.device.isMobile)
            if (navigator.isCocoonJS) game.data.device_portrait_orientated ? (me.video.init(game.data.widthGame, parseInt(game.data.widthGame * a, 10), {
                wrapper: "screen",
                renderer: b,
                scale: "auto",
                maintainAspectRatio: !0,
                transparent: !1,
                antiAlias: !0
            }), game.data.real_heightGame = parseInt(game.data.widthGame * a, 10)) : (me.video.init(parseInt(game.data.heightGame / a, 10), game.data.heightGame, {
                wrapper: "screen",
                renderer: b,
                scale: "auto",
                maintainAspectRatio: !0,
                transparent: !1,
                antiAlias: !0
            }), game.data.real_widthGame = parseInt(game.data.heightGame / a, 10)), me.sys.interpolation = !0, me.sys.scalingInterpolation = !1;
            else {
                me.event.subscribe(me.event.WINDOW_ONRESIZE, function(a) {
                    me.device.isFullscreen ? document.getElementById("screen").style.marginTop = "0px" : (game.data.centertop = (window.innerHeight - window.innerWidth / game.data.widthGame * game.data.heightGame) / 2, 0 < game.data.centertop ? document.getElementById("screen").style.marginTop = game.data.centertop.toString() + "px" : document.getElementById("screen").style.marginTop =
                        "0px")
                });
                game.data.centertop = (window.innerHeight - window.innerWidth / game.data.widthGame * game.data.heightGame) / 2;
                0 < game.data.centertop && (document.getElementById("screen").style.marginTop = game.data.centertop.toString() + "px");
                if (!me.video.init(game.data.widthGame, game.data.heightGame, {
                        wrapper: "screen",
                        renderer: b,
                        scale: "auto",
                        maintainAspectRatio: !0,
                        transparent: !1,
                        antiAlias: !0
                    })) {
                    alert("Your browser does not support HTML5 CANVAS.");
                    return
                }
                me.sys.scalingInterpolation = PREFS.SCALE_INTERPOLATION_MOBILE.value;
                me.sys.interpolation = !0;
                setTimeout(checkOrientation(), 1E3)
            } else {
            me.event.subscribe(me.event.WINDOW_ONRESIZE, function(a) {
                me.device.isFullscreen ? document.getElementById("screen").style.marginTop = "0px" : (game.data.centertop = (window.innerHeight - window.innerWidth / game.data.widthGame * game.data.heightGame) / 2, 0 < game.data.centertop ? document.getElementById("screen").style.marginTop = game.data.centertop.toString() + "px" : document.getElementById("screen").style.marginTop = "0px")
            });
            game.data.centertop = (window.innerHeight -
                window.innerWidth / game.data.widthGame * game.data.heightGame) / 2;
            0 < game.data.centertop && (document.getElementById("screen").style.marginTop = game.data.centertop.toString() + "px");
            if (!me.video.init(game.data.widthGame, game.data.heightGame, {
                    wrapper: "screen",
                    renderer: b,
                    scale: "auto",
                    maintainAspectRatio: !0,
                    transparent: !1,
                    antiAlias: !0
                })) {
                alert("Your browser does not support HTML5 CANVAS.");
                return
            }
            me.sys.scalingInterpolation = PREFS.SCALE_INTERPOLATION_DESKTOP.value;
            me.sys.interpolation = !1
        }
        me.game.sortOn = "y";
        me.device.wp ?
            PREFS.AUDIOENABLED.value = !1 : me.audio.init("mp3,ogg");
        if ("#mute" === document.location.hash) window.onReady(function() {
            PREFS.AUDIOENABLED.value = !1
        });
        "undefined" !== typeof amazon && (ANDROID_RATING_URL = AMAZON_RATING_URL);
        me.device.wp || (game.resources = game.resources.concat(game.resourcesSFX));
        game.resources = me.device.isMobile ? game.resources.concat(game.resourcesGFX_mobile) : game.resources.concat(game.resourcesGFX_desktop);
        for (a = 0; a < PREFS.MAP_FILES.value.length; a++) game.resources = SID ? game.resources.concat([{
            name: PREFS.MAP_FILES.value[a].split("/").pop().slice(0, -4),
            type: "image",
            src: "users/" + SID + "/" + PREFS.MAP_FILES.value[a]
        }]) : game.resources.concat([{
            name: PREFS.MAP_FILES.value[a].split("/").pop().slice(0, -4),
            type: "image",
            src: newUrl+"data/img/map/" + PREFS.MAP_FILES.value[a]
        }]);
        for (a = 0; a < PREFS.LEVELS_FILES.value.length; a++) game.resources = SID ? game.resources.concat([{
            name: "level" + (a + 1),
            type: "tmx",
            src: "users/" + SID + "/" + PREFS.LEVELS_FILES.value[a]
        }]) : game.resources.concat([{
            name: "level" + (a + 1),
            type: "tmx",
            src: newUrl+"data/map/" + PREFS.LEVELS_FILES.value[a]
        }]);
        for (a = 0; a < PREFS.SPRITES_FILES.value.length; a++) game.resources =
            SID ? game.resources.concat([{
                name: PREFS.SPRITES_FILES.value[a].split("/").pop().slice(0, -4),
                type: "image",
                src: "users/" + SID + "/" + PREFS.SPRITES_FILES.value[a]
            }]) : game.resources.concat([{
                name: PREFS.SPRITES_FILES.value[a].split("/").pop().slice(0, -4),
                type: "image",
                src: newUrl+"data/img/sprite/" + PREFS.SPRITES_FILES.value[a]
            }]);
        me.state.set(me.state.LOADING, new CustomLoadingScreen);
        me.loader.onload = this.loaded.bind(this);
        me.loader.load({
            name: "loading",
            type: "image",
            src: newUrl+"data/img/gui/loading.png"
        }, function() {
            me.loader.preload(game.resources);
            me.state.change(me.state.LOADING)
        })
    },
    loaded: function() {
        me.state.set(me.state.MENU, new game.MenuScreen);
        me.state.set(me.state.GAMEOVER, new game.GameOverScreen);
        me.state.set(me.state.READY, new game.YouDidItScreen);
        me.state.set(me.state.PLAY, new game.PlayScreen);
        me.state.set(me.state.USER + 1, new game.ChooseScreen);
        me.state.set(me.state.USER + 2, new game.HowToPlayScreen);
        me.state.set(me.state.USER + 3, new game.InfoScreen);
        me.state.set(me.state.USER + 4, new game.NameInputScreen);
        me.state.set(me.state.USER + 6,
            new game.FullAdScreen);
        me.state.set(me.state.SCORE, new game.ScoreScreen);
        me.state.set(me.state.USER + 7, new game.Restart);
        me.pool.register("player", game.PlayerEntity);
        me.pool.register("enemy", game.EnemyEntity);
        me.pool.register("dot", game.dotEntity, !0);
        me.pool.register("pill", game.pillEntity, !0);
        me.pool.register("exit", game.ExitEntity, !0);
        me.pool.register("teleport", game.teleportEntity);
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP,
            "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");
        me.input.bindKey(me.input.KEY.P, "pause");
        if (-1 < navigator.userAgent.toLowerCase().indexOf("chrome") || -1 < navigator.userAgent.toLowerCase().indexOf("firefox")) {
            var a = navigator.getGamepads();
            game.gamepad = "undefined" == typeof a[0] ? {
                axes: [0, 0]
            } : a[0]
        } else game.gamepad = {
            axes: [0, 0]
        };
        me.input.bindGamepad(0, {
            type: "buttons",
            code: me.input.GAMEPAD.BUTTONS.UP
        }, me.input.KEY.UP);
        me.input.bindGamepad(0, {
            type: "buttons",
            code: me.input.GAMEPAD.BUTTONS.DOWN
        }, me.input.KEY.DOWN);
        me.input.bindGamepad(0, {
            type: "buttons",
            code: me.input.GAMEPAD.BUTTONS.LEFT
        }, me.input.KEY.LEFT);
        me.input.bindGamepad(0, {
            type: "buttons",
            code: me.input.GAMEPAD.BUTTONS.RIGHT
        }, me.input.KEY.RIGHT);
        me.input.bindGamepad(0, {
            type: "buttons",
            code: me.input.GAMEPAD.BUTTONS.FACE_1
        }, me.input.KEY.P);
        me.input.bindGamepad(0, {
            type: "buttons",
            code: me.input.GAMEPAD.BUTTONS.FACE_2
        }, me.input.KEY.P);
        me.input.bindGamepad(0, {
            type: "buttons",
            code: me.input.GAMEPAD.BUTTONS.FACE_3
        }, me.input.KEY.P);
        me.input.bindGamepad(0, {
            type: "buttons",
            code: me.input.GAMEPAD.BUTTONS.FACE_4
        }, me.input.KEY.P);
        game.data.tilewidth = PREFS.TILES_WIDTH.value;
        game.data.tileheight = PREFS.TILES_HEIGHT.value;
        a = (navigator.userLanguage ? navigator.userLanguage : navigator.language ? navigator.language : "english").substring(0, 2); - 1 == PREFS.GAME_LANGUAGES.value.indexOf(a) && (a = PREFS.GAME_LANGUAGES.value[0]);
        me.loader.load({
            name: "locale",
            type: "json",
            src: newUrl+"data/locale/" + a + ".json"
        }, function() {
            game.data.locale = me.loader.getJSON("locale");
            me.state.change(me.state.MENU)
        })
    }
};

function checkOrientation() {
    PREFS.GAME_WIDTH.value < PREFS.GAME_HEIGHT.value != window.innerWidth < window.innerHeight ? (game.data.centertop = (window.innerHeight - 320) / 2, 0 < game.data.centertop && (document.getElementById("block_land_" + game.data.device_portrait_orientated).style.paddingTop = game.data.centertop.toString() + "px"), document.getElementById("block_land_" + game.data.device_portrait_orientated).style.display = "block") : document.getElementById("block_land_" + game.data.device_portrait_orientated).style.display =
        "none";
    setTimeout(checkOrientation, 100)
}

function devicePortraitOriented() {
    return PREFS.GAME_WIDTH.value < PREFS.GAME_HEIGHT.value ? !0 : !1
}

function setupScreenSize() {
    game.data.widthGame = PREFS.GAME_WIDTH.value;
    game.data.heightGame = PREFS.GAME_HEIGHT.value;
    game.data.lowres = !0
}

function getScreenSize(a) {
    var b = window.innerWidth,
        d = window.innerHeight;
    if (devicePortraitOriented) {
        if (b > d) var e = b,
            b = d,
            d = e
    } else b < d && (e = b, b = d, d = e);
    return "h" == a ? d : b
}
Array.prototype.compare = function(a) {
    if (!a || this.length != a.length) return !1;
    for (var b = 0, d = this.length; b < d; b++)
        if (this[b] instanceof Array && a[b] instanceof Array) {
            if (!this[b].compare(a[b])) return !1
        } else if (this[b] != a[b]) return !1;
    return !0
};
Date.now || (Date.now = function() {
    return (new Date).getTime()
});

function trace(a) {
    console.info(a)
}

function getLayerByName(a) {
    for (var b = me.levelDirector.getCurrentLevel().getLayers(), d = 0; d < b.length; d++)
        if (b[d].name == a) {
            var e = b[d];
            break
        }
    return e
}
game.resourcesGFX_mobile = [{
    name: "help_img",
    type: "image",
    src: newUrl+"data/img/gui/help_mobile.png"
}];
game.resourcesGFX_desktop = [{
    name: "help_img",
    type: "image",
    src: newUrl+"data/img/gui/help_desktop.png"
}];
game.resources = [{
    name: "gui_bg",
    type: "image",
    src: newUrl+"data/img/gui/gui_bg.jpg"
}, {
    name: "cover",
    type: "image",
    src: newUrl+"data/img/gui/cover.png"
}, {
    name: "title",
    type: "image",
    src: newUrl+"data/img/gui/title.png"
}, {
    name: "bitmap_font",
    type: "image",
    src: newUrl+"data/img/font/16x16_font.png"
}, {
    name: "menu_button",
    type: "image",
    src: newUrl+"data/img/gui/menu_button.png"
}, {
    name: "small_button",
    type: "image",
    src: newUrl+"data/img/gui/small_button.png"
}, {
    name: "level_button_lock",
    type: "image",
    src: newUrl+"data/img/gui/level_button_lock.png"
}, {
    name: "audio_off_button",
    type: "image",
    src: newUrl+"data/img/gui/audio_off_button.png"
}, {
    name: "audio_on_button",
    type: "image",
    src: newUrl+"data/img/gui/audio_on_button.png"
}, {
    name: "fullscreen_off_button",
    type: "image",
    src: newUrl+"data/img/gui/fullscreen_off_button.png"
}, {
    name: "fullscreen_on_button",
    type: "image",
    src: newUrl+"data/img/gui/fullscreen_on_button.png"
}, {
    name: "info_button",
    type: "image",
    src: newUrl+"data/img/gui/info_button.png"
}, {
    name: "hiscore_button",
    type: "image",
    src: newUrl+"data/img/gui/hiscore_button.png"
}, {
    name: "home_button",
    type: "image",
    src: newUrl+"data/img/gui/home_button.png"
}, {
    name: "restart_button",
    type: "image",
    src: newUrl+"data/img/gui/restart_button.png"
}, {
    name: "continue_button",
    type: "image",
    src: newUrl+"data/img/gui/continue_button.png"
}, {
    name: "butt_up",
    type: "image",
    src: newUrl+"data/img/gui/butt_up.png"
}, {
    name: "butt_down",
    type: "image",
    src: newUrl+"data/img/gui/butt_down.png"
}, {
    name: "butt_right",
    type: "image",
    src: newUrl+"data/img/gui/butt_right.png"
}, {
    name: "butt_left",
    type: "image",
    src: newUrl+"data/img/gui/butt_left.png"
}, {
    name: "butt_x",
    type: "image",
    src: newUrl+"data/img/gui/butt_x.png"
}, {
    name: "butt_pause",
    type: "image",
    src: newUrl+"data/img/gui/butt_pause.png"
}, {
    name: "head",
    type: "image",
    src: newUrl+"data/img/gui/head.png"
}, {
    name: "radar",
    type: "image",
    src: newUrl+"data/img/gui/radar.png"
}, {
    name: "arrows",
    type: "image",
    src: newUrl+"data/img/gui/arrows.png"
}];
game.resourcesSFX = [{
    name: "menu",
    type: "audio",
    src: newUrl+"data/bgm/"
}, {
    name: "soundtrack",
    type: "audio",
    src: newUrl+"data/bgm/"
}, {
    name: "click",
    type: "audio",
    src: newUrl+"data/sfx/"
}, {
    name: "victory",
    type: "audio",
    src: newUrl+"data/sfx/"
}, {
    name: "dead",
    type: "audio",
    src: newUrl+"data/sfx/"
}, {
    name: "dot",
    type: "audio",
    src: newUrl+"data/sfx/"
}, {
    name: "growl",
    type: "audio",
    src: newUrl+"data/sfx/"
}, {
    name: "powerup",
    type: "audio",
    src: newUrl+"data/sfx/"
}, {
    name: "powerdown",
    type: "audio",
    src: newUrl+"data/sfx/"
}, {
    name: "killenemy",
    type: "audio",
    src: newUrl+"data/sfx/"
}];

function entityManager(a, b) {
    if (a.direction == a.wantedDirection) switch (a.direction) {
        case 2:
            a.renderable.isCurrentAnimation("down" + a.mode) || a.renderable.setCurrentAnimation("down" + a.mode);
            break;
        case 8:
            a.renderable.isCurrentAnimation("up" + a.mode) || a.renderable.setCurrentAnimation("up" + a.mode);
            break;
        case 1:
            a.renderable.isCurrentAnimation("left" + a.mode) || a.renderable.setCurrentAnimation("left" + a.mode);
            break;
        case 4:
            a.renderable.isCurrentAnimation("right" + a.mode) || a.renderable.setCurrentAnimation("right" +
                a.mode)
    }
    0 != b && (a.wantedDirection = b);
    a.pos.x + a.width > game.data.Path_Layer.cols * game.data.Path_Layer.tilewidth ? (a.body.vel.x = 0, a.pos.x = Math.floor((a.pos.x + game.data.tilewidth / 2) / game.data.tilewidth) * game.data.tilewidth) : 0 > a.pos.x && (a.body.vel.x = 0, a.pos.x = Math.floor((a.pos.x + game.data.tilewidth / 2) / game.data.tilewidth) * game.data.tilewidth);
    a.pos.y + a.height > game.data.Path_Layer.rows * game.data.Path_Layer.tileheight ? (a.body.vel.y = 0, a.pos.y = Math.floor((a.pos.y + game.data.tileheight / 2) / game.data.tileheight) *
        game.data.tileheight) : 0 > a.pos.y && (a.body.vel.y = 0, a.pos.y = Math.floor((a.pos.y + game.data.tileheight / 2) / game.data.tileheight) * game.data.tileheight);
    var d = getTile(a),
        e = Math.abs(Math.floor((a.pos.x + game.data.tilewidth / 2) / game.data.tilewidth) * game.data.tilewidth - a.pos.x),
        f = Math.abs(Math.floor((a.pos.y + game.data.tileheight / 2) / game.data.tileheight) * game.data.tileheight - a.pos.y),
        g = a.velocity;
    8 == (d & a.direction) ? (a.body.vel.y = game.data.playerIsHunter ? -a.powerupVelocity : -a.velocity, a.pos.x = Math.floor((a.pos.x +
        game.data.tilewidth / 2) / game.data.tilewidth) * game.data.tilewidth, a.body.vel.x = 0) : 2 == (d & a.direction) ? (a.body.vel.y = game.data.playerIsHunter ? a.powerupVelocity : a.velocity, a.pos.x = Math.floor((a.pos.x + game.data.tilewidth / 2) / game.data.tilewidth) * game.data.tilewidth, a.body.vel.x = 0) : 4 == (d & a.direction) ? (a.body.vel.x = game.data.playerIsHunter ? a.powerupVelocity : a.velocity, a.pos.y = Math.floor((a.pos.y + game.data.tileheight / 2) / game.data.tileheight) * game.data.tileheight, a.body.vel.y = 0) : 1 == (d & a.direction) ? (a.body.vel.x =
        game.data.playerIsHunter ? -a.powerupVelocity : -a.velocity, a.pos.y = Math.floor((a.pos.y + game.data.tileheight / 2) / game.data.tileheight) * game.data.tileheight, a.body.vel.y = 0) : e < g && f < g && (a.body.vel.x = 0, a.body.vel.y = 0, a.pos.x = Math.floor((a.pos.x + game.data.tilewidth / 2) / game.data.tilewidth) * game.data.tilewidth, a.pos.y = Math.floor((a.pos.y + game.data.tileheight / 2) / game.data.tileheight) * game.data.tileheight);
    var l = getAheadTile(a);
    8 == (d & a.wantedDirection) && e < g ? (a.body.vel.y = game.data.playerIsHunter ? -a.powerupVelocity :
        -a.velocity, a.direction = a.wantedDirection, a.pos.x = Math.floor((a.pos.x + game.data.tilewidth / 2) / game.data.tilewidth) * game.data.tilewidth, a.body.vel.x = 0) : 2 == (d & a.wantedDirection) && e < g ? (a.body.vel.y = game.data.playerIsHunter ? a.powerupVelocity : a.velocity, a.direction = a.wantedDirection, a.pos.x = Math.floor((a.pos.x + game.data.tilewidth / 2) / game.data.tilewidth) * game.data.tilewidth, a.body.vel.x = 0) : 4 == (d & a.wantedDirection) && f < g ? (a.body.vel.x = game.data.playerIsHunter ? a.powerupVelocity : a.velocity, a.direction = a.wantedDirection,
        a.pos.y = Math.floor((a.pos.y + game.data.tileheight / 2) / game.data.tileheight) * game.data.tileheight, a.body.vel.y = 0) : 1 == (d & a.wantedDirection) && f < g && (a.body.vel.x = game.data.playerIsHunter ? -a.powerupVelocity : -a.velocity, a.direction = a.wantedDirection, a.pos.y = Math.floor((a.pos.y + game.data.tileheight / 2) / game.data.tileheight) * game.data.tileheight, a.body.vel.y = 0);
    return [d, l]
}

function getTile(a) {
    a = game.data.Path_Layer.getTile(a.pos.x + a.width / 2, a.pos.y + a.height / 2);
    return null != a ? parseInt(a.tileset.getTileProperties(a.tileId).direction, 2) : 0
}

function getAheadTile(a) {
    var b = 0,
        d = 0;
    switch (a.direction) {
        case 8:
            b = a.width / 2;
            d = -1;
            break;
        case 4:
            b = a.width + 1;
            d = a.height / 2;
            break;
        case 2:
            b = a.width / 2;
            d = a.height + 1;
            break;
        case 1:
            b = -1, d = a.height / 2
    }
    if (a.pos.y + d > game.data.heightGame || a.pos.x + b > game.data.widthGame || 0 > a.pos.y + d || 0 > a.pos.x + b) return 0;
    a = game.data.Path_Layer.getTile(a.pos.x + b, a.pos.y + d);
    return null != a ? (property = a.tileset.getTileProperties(a.tileId), "undefined" != typeof property ? parseInt(property.direction, 2) : 0) : 0
}

function getBacksideTile(a) {
    var b = 0,
        d = 0;
    switch (a.direction) {
        case 8:
            b = a.width / 2;
            d = a.height;
            break;
        case 4:
            b = 0;
            d = a.height / 2;
            break;
        case 2:
            b = a.width / 2;
            d = 0;
            break;
        case 1:
            b = a.width, d = a.height / 2
    }
    a = game.data.Path_Layer.getTileId(a.pos.x + b, a.pos.y + d);
    return null != a ? parseInt(game.data.Path_Layer.tilesets.getTilesetByGid(a).getTileProperties(a).direction, 2) : 0
}

function registerToRadarAndCollisions(a) {
    var b = game.data.Path_Layer.cols,
        d = game.data.Path_Layer.rows;
    if ("undefined" == typeof game.data.collisionArray)
        for (game.data.collisionArray = [], c = 0; c < b; c++)
            for (game.data.collisionArray[c] = [], r = 0; r < d; r++) game.data.collisionArray[c].push(0);
    else if (0 == game.data.radarEntities.length)
        for (c = 0; c < b; c++)
            for (r = 0; r < d; r++) game.data.collisionArray[c][r] = 0;
    game.data.radarEntities.push(a);
    b = Math.floor((a.pos.x + game.data.tilewidth / 2) / game.data.tilewidth);
    d = Math.floor((a.pos.y +
        game.data.tileheight / 2) / game.data.tileheight);
    game.data.collisionArray[b][d] = a.type;
    a.currentTileId = b * d + d;
    a.currentTilePos = [b, d];
    a.previousTileId = a.currentTileId;
    a.previousTilePos = [b, d]
}

function removeFromRadar(a) {
    a = game.data.radarEntities.indexOf(a);
    game.data.radarEntities.splice(a, 1)
}

function updateCollisionArray(a) {
    var b = Math.floor((a.pos.x + game.data.tilewidth / 2) / game.data.tilewidth),
        d = Math.floor((a.pos.y + game.data.tileheight / 2) / game.data.tileheight);
    a.currentTileId = b * d + d;
    a.currentTilePos = [b, d];
    a.previousTileId != a.currentTileId && (game.data.collisionArray[a.previousTilePos[0]][a.previousTilePos[1]] = 0, game.data.collisionArray[b][d] = a.type, a.previousTileId = a.currentTileId, a.previousTilePos = [b, d])
}

function getCurrentCollisionArray(a) {
    return game.data.collisionArray[Math.floor((a.pos.x + game.data.tilewidth / 2) / game.data.tilewidth)][Math.floor((a.pos.y + game.data.tileheight / 2) / game.data.tileheight)]
}

function getAheadCollisionArray(a) {
    var b = Math.floor((a.pos.x + game.data.tilewidth / 2) / game.data.tilewidth),
        d = Math.floor((a.pos.y + game.data.tileheight / 2) / game.data.tileheight),
        e = 0,
        f = 0;
    switch (a.direction) {
        case 8:
            e = 0;
            f = -1;
            break;
        case 4:
            e = 1;
            f = 0;
            break;
        case 2:
            e = 0;
            f = 1;
            break;
        case 1:
            e = -1, f = 0
    }
    return b + e >= game.data.Path_Layer.cols || d + f >= game.data.Path_Layer.rows || 0 > b + e || 0 > d + f ? 0 : game.data.collisionArray[b + e][d + f]
}
1;
game.PlayerEntity = me.Entity.extend({
    init: function(a, b, d) {
        game.data.Path_Layer = getLayerByName("Path");
        this.image = me.loader.getImage("player");
        d.image = this.image;
        d.framewidth = game.data.tilewidth;
        d.frameheight = game.data.tileheight;
        d.width = game.data.tilewidth;
        d.height = game.data.tileheight;
        this._super(me.Entity, "init", [a, b, d]);
        this.renderable.addAnimation("up_stand", PREFS.PLAYER_ANIMATION_NORMAL_UP_STAND.value, 60);
        this.renderable.addAnimation("down_stand", PREFS.PLAYER_ANIMATION_NORMAL_DOWN_STAND.value,
            60);
        this.renderable.addAnimation("right_stand", PREFS.PLAYER_ANIMATION_NORMAL_RIGHT_STAND.value, 60);
        this.renderable.addAnimation("left_stand", PREFS.PLAYER_ANIMATION_NORMAL_LEFT_STAND.value, 60);
        this.renderable.addAnimation("up", PREFS.PLAYER_ANIMATION_NORMAL_UP_WALK.value, 60);
        this.renderable.addAnimation("down", PREFS.PLAYER_ANIMATION_NORMAL_DOWN_WALK.value, 60);
        this.renderable.addAnimation("right", PREFS.PLAYER_ANIMATION_NORMAL_RIGHT_WALK.value, 60);
        this.renderable.addAnimation("left", PREFS.PLAYER_ANIMATION_NORMAL_LEFT_WALK.value,
            60);
        this.renderable.addAnimation("up_stand_hunter", PREFS.PLAYER_ANIMATION_POWER_UP_UP_STAND.value, 60);
        this.renderable.addAnimation("down_stand_hunter", PREFS.PLAYER_ANIMATION_POWER_UP_DOWN_STAND.value, 60);
        this.renderable.addAnimation("right_stand_hunter", PREFS.PLAYER_ANIMATION_POWER_UP_RIGHT_STAND.value, 60);
        this.renderable.addAnimation("left_stand_hunter", PREFS.PLAYER_ANIMATION_POWER_UP_LEFT_STAND.value, 60);
        this.renderable.addAnimation("up_hunter", PREFS.PLAYER_ANIMATION_POWER_UP_UP_WALK.value, 60);
        this.renderable.addAnimation("down_hunter", PREFS.PLAYER_ANIMATION_POWER_UP_DOWN_WALK.value, 60);
        this.renderable.addAnimation("right_hunter", PREFS.PLAYER_ANIMATION_POWER_UP_RIGHT_WALK.value, 60);
        this.renderable.addAnimation("left_hunter", PREFS.PLAYER_ANIMATION_POWER_UP_LEFT_WALK.value, 60);
        this.renderable.addAnimation("up_stand_power_down", PREFS.PLAYER_ANIMATION_POWER_DOWN_UP_STAND.value, 60);
        this.renderable.addAnimation("down_stand_power_down", PREFS.PLAYER_ANIMATION_POWER_DOWN_DOWN_STAND.value, 60);
        this.renderable.addAnimation("right_stand_power_down",
            PREFS.PLAYER_ANIMATION_POWER_DOWN_RIGHT_STAND.value, 60);
        this.renderable.addAnimation("left_stand_power_down", PREFS.PLAYER_ANIMATION_POWER_DOWN_LEFT_STAND.value, 60);
        this.renderable.addAnimation("up_power_down", PREFS.PLAYER_ANIMATION_POWER_DOWN_UP_WALK.value, 60);
        this.renderable.addAnimation("down_power_down", PREFS.PLAYER_ANIMATION_POWER_DOWN_DOWN_WALK.value, 60);
        this.renderable.addAnimation("right_power_down", PREFS.PLAYER_ANIMATION_POWER_DOWN_RIGHT_WALK.value, 60);
        this.renderable.addAnimation("left_power_down",
            PREFS.PLAYER_ANIMATION_POWER_DOWN_LEFT_WALK.value, 60);
        this.renderable.addAnimation("victory", PREFS.PLAYER_ANIMATION_VICTORY.value, 60);
        this.renderable.addAnimation("die", PREFS.PLAYER_ANIMATION_DYING.value, 60);
        game.data.player = this;
        this.name = "player";
        this.state = "ready";
        game.data.running = !1;
        this.type = game.data.PLAYER_OBJECT;
        me.game.viewport.follow(this, me.game.viewport.AXIS.BOTH);
        this.body.gravity = 0;
        this.body.setVelocity(999, 999);
        this.body.vel.x = 0;
        this.body.vel.y = 0;
        this.alwaysUpdate = !0;
        this.directions = [8, 4, 2, 1];
        a = getTile(this);
        do this.direction = this.directions[Math.floor(4 * Math.random())]; while (0 == (this.direction & a) && 0 != a);
        this.wantedDirection = this.direction;
        switch (this.direction) {
            case 8:
                this.renderable.setCurrentAnimation("up_stand");
                break;
            case 4:
                this.renderable.setCurrentAnimation("right_stand");
                break;
            case 2:
                this.renderable.setCurrentAnimation("down_stand");
                break;
            case 1:
                this.renderable.setCurrentAnimation("left_stand")
        }
        registerToRadarAndCollisions(this);
        me.game.world.addChild(new arrows(this),
            999);
        this.velocity = null != d.velocity ? parseInt(d.velocity) / PREFS.MAX_FPS.value : PREFS.PLAYER_VELOCITY.value / PREFS.MAX_FPS.value;
        this.powerupVelocity = null != d.powerup_velocity ? parseInt(d.powerup_velocity) / PREFS.MAX_FPS.value : PREFS.PLAYER_VELOCITY_ON_POWER_UP.value / PREFS.MAX_FPS.value;
        game.data.playerIsHunter = !1;
        game.data.hunterTimer = 0;
        this.mode = "";
        this.teleportTrigger = "allowed"
    },
    update: function(a) {
        if (me.input.isKeyPressed("pause") && game.data.running) {
            me.input.triggerKeyEvent(me.input.KEY.P, !1);
            var b = this,
                d = me.video.renderer.getWidth(),
                e = me.video.renderer.getHeight(),
                f = new butt_continue_pause(d / 2 - 50, e / 2 + 30);
            me.game.world.addChild(f, 999);
            var g = new butt_home_pause(d / 2 + 50, e / 2 + 30);
            me.game.world.addChild(g, 999);
            this.overlay = new me.ColorLayer("overlay", new me.Color(0, 0, 0, 0.3), 0);
            me.game.world.addChild(this.overlay, 10);
            me.sys.resumeOnFocus = !1;
            me.audio.muteAll();
            game.data.text = "pause";
            me.state.pause();
            var l = setInterval(function() {
                me.input.isKeyPressed("pause") && (clearInterval(l), PREFS.AUDIOENABLED.value &&
                    me.audio.unmuteAll(), me.sys.resumeOnFocus = !0, me.state.resume(), game.data.text = "", me.game.world.removeChild(g), me.game.world.removeChild(f), me.input.triggerKeyEvent(me.input.KEY.P, !1), me.game.world.removeChild(b.overlay))
            }, 10)
        }
        switch (this.state) {
            case "ready":
                b = this;
                me.sys.resumeOnFocus = !1;
                this.overlay = new me.ColorLayer("overlay", new me.Color(0, 0, 0, 0.3), 0);
                me.game.world.addChild(this.overlay, 10);
                this.updateWhenPaused = !0;
                this.handler = me.event.subscribe(me.event.KEYDOWN, function(a, d, e) {
                    if ("up" === a || "down" ===
                        a || "left" === a || "right" === a) PREFS.MUSICENABLED.value && PREFS.AUDIOENABLED.value && me.audio.playTrack("soundtrack"), game.data.text = "", b.renderable && (b.renderable.alpha = 1), me.sys.resumeOnFocus = !0, me.state.resume(), b.renderable && (b.state = "play"), me.event.unsubscribe(b.handler), me.game.world.removeChild(b.overlay), b.updateWhenPaused = !1, game.data.running = !0
                });
                game.data.text = "getready";
                game.data.running = !1;
                me.state.pause();
                this.state = "wait";
                break;
            case "wait":
                if (0 != game.gamepad.axes[1] || 0 != game.gamepad.axes[0]) me.input.triggerKeyEvent(me.input.KEY.LEFT, !0), me.input.triggerKeyEvent(me.input.KEY.LEFT, !1);
                break;
            case "done":
                this.renderable.isCurrentAnimation("victory") || (this.body.vel.x = 0, this.body.vel.y = 0, game.data.running = !1, PREFS.AUDIOENABLED.value && me.audio.play("victory"), PREFS.MUSICENABLED.value && PREFS.AUDIOENABLED.value && me.audio.stopTrack("soundtrack"), this.renderable.setCurrentAnimation("victory", function() {
                    me.state.change(me.state.READY)
                }.bind(this)), this.renderable.setAnimationFrame(1));
                break;
            case "play":
                d = me.input.isKeyPressed("up") || 0 >
                    game.gamepad.axes[1] ? 8 : me.input.isKeyPressed("down") || 0 < game.gamepad.axes[1] ? 2 : me.input.isKeyPressed("right") || 0 < game.gamepad.axes[0] ? 4 : me.input.isKeyPressed("left") || 0 > game.gamepad.axes[0] ? 1 : 0;
                entityManager(this, d);
                d = Math.floor((this.pos.x + game.data.tilewidth / 2) / game.data.tilewidth);
                e = Math.floor((this.pos.y + game.data.tileheight / 2) / game.data.tileheight);
                if (PREFS.PLAYER_USES_TELEPORT.value && "undefined" !== typeof game.data.teleportArray) {
                    var h = game.data.teleportArray[d][e];
                    if (0 !== h) {
                        var k = Math.abs(Math.floor((this.pos.x +
                                game.data.tilewidth / 2) / game.data.tilewidth) * game.data.tilewidth - this.pos.x),
                            p = Math.abs(Math.floor((this.pos.y + game.data.tileheight / 2) / game.data.tileheight) * game.data.tileheight - this.pos.y);
                        if (4 > k && 4 > p && "allowed" === this.teleportTrigger) {
                            this.teleportTrigger = "denied";
                            k = game.data.teleportList[h.destination];
                            this.pos.x = k[0];
                            this.pos.y = k[1];
                            k = getTile(this);
                            do this.direction = this.directions[Math.floor(4 * Math.random())]; while (0 == (this.direction & k) && 0 != k);
                            this.wantedDirection = this.direction
                        }
                    } else this.teleportTrigger =
                        "allowed"
                }
                h = game.data.dotArray[d][e];
                0 !== h && ("pill" === h.name ? (game.data.playerIsHunter = !0, game.data.hunterTimer = me.timer.getTime() + PREFS.POWER_UP_DURATION.value, game.data.score += PREFS.PILL_POINTS.value, 0 < PREFS.PILL_ANIMATION_PICKUP.value.length ? h.setCurrentAnimation("pick", function() {
                    me.game.world.removeChild(h);
                    removeFromRadar(h);
                    return !1
                }.bind(this)) : (me.game.world.removeChild(h), removeFromRadar(h)), PREFS.AUDIOENABLED.value && me.audio.play("powerup")) : (game.data.score += PREFS.DOT_POINTS.value, 0 < PREFS.DOT_ANIMATION_PICKUP.value.length ?
                    h.setCurrentAnimation("pick", function() {
                        me.game.world.removeChild(h);
                        removeFromRadar(h);
                        return !1
                    }.bind(this)) : (me.game.world.removeChild(h), removeFromRadar(h)), PREFS.AUDIOENABLED.value && me.audio.play("dot")), game.data.dotArray[d][e] = 0, game.data.dotCounter -= 1, 0 === game.data.dotCounter && (this.state = "done"));
                null != game.data.Dots_Layer && null != game.data.Dots_Layer.getTileId(this.pos.x + game.data.tilewidth / 2, this.pos.y + game.data.tileheight / 2) && (game.data.dotCounter -= 1, game.data.score += PREFS.DOT_POINTS.value,
                    game.data.Dots_Layer.clearTile(Math.floor((this.pos.x + game.data.tilewidth / 2) / game.data.tilewidth), Math.floor((this.pos.y + game.data.tileheight / 2) / game.data.tileheight)), PREFS.AUDIOENABLED.value && me.audio.play("dot"), 0 === game.data.dotCounter && (this.state = "done"));
                game.data.playerIsHunter && (game.data.hunterTimer - me.timer.getTime() < PREFS.ENDING_POWER_UP_ALERT.value ? this.mode = "_power_down" : this.mode = "_hunter", game.data.hunterTimer < me.timer.getTime() && (game.data.playerIsHunter = !1, this.mode = "", PREFS.AUDIOENABLED.value &&
                    me.audio.play("powerdown")));
                if (0 === this.body.vel.x && 0 === this.body.vel.y) switch (this.direction) {
                    case 2:
                        this.renderable.isCurrentAnimation("down_stand" + this.mode) || this.renderable.setCurrentAnimation("down_stand" + this.mode);
                        break;
                    case 8:
                        this.renderable.isCurrentAnimation("up_stand" + this.mode) || this.renderable.setCurrentAnimation("up_stand" + this.mode);
                        break;
                    case 1:
                        this.renderable.isCurrentAnimation("left_stand" + this.mode) || this.renderable.setCurrentAnimation("left_stand" + this.mode);
                        break;
                    case 4:
                        this.renderable.isCurrentAnimation("right_stand" +
                            this.mode) || this.renderable.setCurrentAnimation("right_stand" + this.mode)
                }
                updateCollisionArray(this);
                me.collision.check(this);
                break;
            case "die":
                game.data.running = !1, this.body.vel.x = 0, this.body.vel.y = 0, this.renderable.isCurrentAnimation("die") || this.renderable.setCurrentAnimation("die"), PREFS.MUSICENABLED.value && PREFS.AUDIOENABLED.value && me.audio.stopTrack("soundtrack"), 0 < game.data.lives ? window.setTimeout(function() {
                    PREFS.ADS_ON_DEATH.value ? navigator.isCocoonJS ? (ads.interstitialAlreadyDownloaded && Cocoon.Ad.showInterstitial(),
                        me.state.change(me.state.USER + 7)) : me.state.change(me.state.USER + 6) : me.state.change(me.state.USER + 7)
                }, 3E3) : window.setTimeout(function() {
                    me.state.change(me.state.GAMEOVER)
                }, 3E3), game.data.lives -= 1, this.state = "wait"
        }
        this.body.update();
        this._super(me.Entity, "update", [a]);
        return !0
    },
    onCollision: function(a, b) {
        b.isCollidingWithPlayer = !0;
        return !1
    }
});
game.ExitEntity = me.Entity.extend({
    init: function(a, b, d) {
        this._super(me.Entity, "init", [a, b, d]);
        this.layers = me.levelDirector.getCurrentLevel().getLayers();
        this.alwaysUpdate = !0;
        this.name = "exit";
        this.type = 0;
        this.c = Math.floor((a + 1) / 64);
        this.r = Math.floor((b + 1) / 64);
        this.w = Math.floor((d.width + 1) / 64);
        this.h = Math.floor((d.height + 1) / 64);
        this.Ground_switch = getLayerByName("Grnd_switch");
        this.Collision_switch = getLayerByName("Coll_switch");
        this.Ground = getLayerByName("Ground");
        this.Collision = getLayerByName("Collision")
    },
    update: function(a) {
        if (0 == game.data.surviviorsCounter) {
            game.data.surviviorsCounter = -1;
            registerToRadarAndCollisions(this);
            for (a = this.c; a < this.c + this.w; a++)
                for (var b = this.r; b < this.r + this.h; b++) {
                    var d = this.Ground_switch.getTileId(64 * a + 1, 64 * b + 1);
                    null != d && (this.Ground.clearTile(a, b), this.Ground.setTile(a, b, d));
                    d = this.Collision_switch.getTileId(64 * a + 1, 64 * b + 1);
                    null != d && (this.Collision.clearTile(a, b), this.Collision.setTile(a, b, d))
                }
            me.game.repaint()
        }
    }
});
var debug = me.Renderable.extend({
        init: function(a) {
            this.self = a;
            this.image = me.loader.getImage("head");
            this._super(me.Renderable, "init", [0, 0, 10, 10]);
            this.floating = !0;
            this.sprite_size = 16
        },
        draw: function(a) {
            var b = 0,
                d = 0,
                e = game.data.Path_Layer.cols,
                f = game.data.Path_Layer.rows;
            for (c = 0; c < e; c++)
                for (r = 0; r < f; r++) game.data.collisionArray[c][r] === game.data.PLAYER_OBJECT && (b = c * game.data.tilewidth, d = r * game.data.tileheight);
            a.drawImage(this.image, 0, 0, this.sprite_size, this.sprite_size, b, d, this.sprite_size, this.sprite_size)
        }
    }),
    arrows = me.Renderable.extend({
        init: function(a) {
            this.self = a;
            this.image = me.loader.getImage("arrows");
            this._super(me.Renderable, "init", [0, 0, 10, 10]);
            this.floating = !0;
            this.sprite_size = 128;
            this.sinistra = game.data.real_widthGame / 2 - game.data.widthGame / 2;
            this.destra = game.data.real_widthGame / 2 + game.data.widthGame / 2 - this.sprite_size;
            this.alto = game.data.real_heightGame / 2 - game.data.heightGame / 2;
            this.basso = game.data.real_heightGame / 2 + game.data.heightGame / 2 - this.sprite_size;
            this.centerH = game.data.real_widthGame /
                2 - this.sprite_size / 2;
            this.centerV = game.data.real_heightGame / 2 - this.sprite_size / 2
        },
        draw: function(a) {
            if (this.self.direction != this.self.wantedDirection) switch (this.self.wantedDirection) {
                case 8:
                    a.drawImage(this.image, 0, 0, this.sprite_size, this.sprite_size, this.centerH, this.alto, this.sprite_size, this.sprite_size);
                    break;
                case 4:
                    a.drawImage(this.image, this.sprite_size, 0, this.sprite_size, this.sprite_size, this.destra, this.centerV, this.sprite_size, this.sprite_size);
                    break;
                case 2:
                    a.drawImage(this.image, 2 * this.sprite_size,
                        0, this.sprite_size, this.sprite_size, this.centerH, this.basso, this.sprite_size, this.sprite_size);
                    break;
                case 1:
                    a.drawImage(this.image, 3 * this.sprite_size, 0, this.sprite_size, this.sprite_size, this.sinistra, this.centerV, this.sprite_size, this.sprite_size)
            }
        }
    }),
    butt_home_pause = me.GUI_Object.extend({
        init: function(a, b, d) {
            d = {};
            this.image = me.loader.getImage("home_button");
            d.image = this.image;
            d.framewidth = this.image.width;
            d.frameheight = this.image.height;
            this.x = a - d.framewidth / 2;
            this.y = b - d.frameheight / 2;
            this._super(me.GUI_Object,
                "init", [a - d.framewidth / 2, b - d.frameheight / 2, d]);
            this.pos.z = 4
        },
        draw: function(a) {
            a.drawImage(this.image, this.x, this.y)
        },
        onClick: function() {
            PREFS.AUDIOENABLED.value && me.audio.play("click");
            me.input.triggerKeyEvent(me.input.KEY.P, !0);
            PREFS.AUDIOENABLED.value && PREFS.AUDIOENABLED.value && me.audio.stopTrack("soundtrack");
            me.state.change(me.state.MENU);
            return !0
        }
    }),
    butt_continue_pause = me.GUI_Object.extend({
        init: function(a, b, d) {
            d = {};
            this.image = me.loader.getImage("continue_button");
            d.image = this.image;
            d.framewidth =
                this.image.width;
            d.frameheight = this.image.height;
            this.x = a - d.framewidth / 2;
            this.y = b - d.frameheight / 2;
            this._super(me.GUI_Object, "init", [a - d.framewidth / 2, b - d.frameheight / 2, d]);
            this.pos.z = 4
        },
        draw: function(a) {
            a.drawImage(this.image, this.x, this.y)
        },
        onClick: function() {
            me.input.triggerKeyEvent(me.input.KEY.P, !0);
            PREFS.AUDIOENABLED.value && me.audio.play("click");
            return !0
        }
    }),
    butt_submit_score_pause = me.GUI_Object.extend({
        init: function(a, b, d) {
            d = {};
            this.image = me.loader.getImage("butt_submit_score");
            d.image = this.image;
            d.framewidth = this.image.width;
            d.frameheight = this.image.height;
            this.x = a - d.framewidth / 2;
            this.y = b - d.frameheight / 2;
            this._super(me.GUI_Object, "init", [a - d.framewidth / 2, b - d.frameheight / 2, d]);
            this.pos.z = 4
        },
        draw: function(a) {
            a.drawImage(this.image, this.x, this.y)
        },
        onClick: function() {
            PREFS.AUDIOENABLED.value && me.audio.play("click");
            me.input.triggerKeyEvent(me.input.KEY.P, !0);
            PREFS.AUDIOENABLED.value && PREFS.AUDIOENABLED.value && me.audio.stopTrack("soundtrack");
            me.state.change(me.state.USER + 4);
            return !0
        }
    });
game.HUD = game.HUD || {};
game.HUD.Container = me.Container.extend({
    init: function() {
        this._super(me.Container, "init");
        this.isPersistent = !0;
        this.collidable = !1;
        this.z = Infinity;
        this.floating = !0;
        this.name = "HUD";
        this.w = me.video.renderer.getWidth();
        this.h = me.video.renderer.getHeight();
        "upper" === PREFS.HUD_POSITION.value ? (this.addChild(new game.HUD.ScoreItem(this.w - 10, 10), Infinity), this.addChild(new game.HUD.LivesItem_graphic(10, 10), Infinity), PREFS.PAUSE_BUTTON.value && this.addChild(new game.HUD.butt_pause(this.w / 2, 16), Infinity), this.addChild(new game.HUD.TextItem,
            Infinity)) : (this.addChild(new game.HUD.ScoreItem(this.w - 10, this.h - 20)), this.addChild(new game.HUD.LivesItem_graphic(10, this.h - 20)), PREFS.PAUSE_BUTTON.value && this.addChild(new game.HUD.butt_pause(this.w / 2 - 40, this.h - 16)), this.addChild(new game.HUD.TextItem));
        PREFS.RADAR.value && this.addChild(new game.HUD.RadarItem);
        me.device.isMobile && (PREFS.MOBILE_CONTROLS.value = "swipe", me.game.world.addChild(new swipe, 999))
    }
});
game.HUD.RadarItem = me.Renderable.extend({
    init: function() {
        var a = PREFS.RADAR_WIDTH.value / game.data.Path_Layer.cols,
            b = game.data.Path_Layer.cols * a,
            d = game.data.Path_Layer.rows * a;
        this.x = (me.video.renderer.getWidth() - b) * PREFS.RADAR_POS_X.value;
        this.y = (me.video.renderer.getHeight() - d) * PREFS.RADAR_POS_Y.value;
        this._super(me.Renderable, "init", [this.x, this.y, b, d]);
        this.floating = !0;
        this.image = me.loader.getImage("radar");
        this.block_size = this.image.height;
        this.radarUnitSize = a;
        this.blink = 0;
        this.radar_sizeW = b;
        this.radar_sizeH =
            d;
        this.floating = !0;
        me.input.registerPointerEvent("pointerdown", this, this.onStartEvent.bind(this), !0);
        me.input.registerPointerEvent("pointerup", this, this.onEndEvent.bind(this), !0)
    },
    onStartEvent: function(a) {
        game.data.running && me.input.triggerKeyEvent(me.input.KEY.P, !0)
    },
    onEndEvent: function(a) {
        game.data.running && me.input.triggerKeyEvent(me.input.KEY.P, !1)
    },
    destroy: function() {
        me.input.releasePointerEvent("pointerdown", this, this.onStartEvent.bind(this));
        me.input.releasePointerEvent("pointerup", this, this.onEndEvent.bind(this))
    },
    draw: function(a) {
        a.drawImage(this.image, this.block_size, 0, this.block_size - 1, this.block_size, this.x, this.y, this.radar_sizeW, this.radar_sizeH);
        this.blink += 1;
        9 < this.blink && (this.blink = 0);
        for (var b = 0; b < game.data.radarEntities.length; b++) {
            var d = this.x + Math.floor(game.data.radarEntities[b].pos.x / (game.data.tilewidth / this.radarUnitSize)),
                e = this.y + Math.floor(game.data.radarEntities[b].pos.y / (game.data.tileheight / this.radarUnitSize));
            if ("player" == game.data.radarEntities[b].name) var f = 2 * this.block_size,
                g = 0;
            "dot" == game.data.radarEntities[b].name && (f = 3 * this.block_size, g = 0);
            "enemy" == game.data.radarEntities[b].name && (f = 4 * this.block_size, g = 0);
            "pill" == game.data.radarEntities[b].name && (f = 5 * this.block_size, g = 6);
            this.blink >= g && a.drawImage(this.image, f, 0, this.block_size, this.block_size, d, e, this.block_size, this.block_size)
        }
    }
});
game.HUD.ScoreItem = me.Renderable.extend({
    init: function(a, b) {
        this._super(me.Renderable, "init", [a, b, 10, 10]);
        this.font = new me.BitmapFont("bitmap_font", game.data.lowres ? 16 : 32);
        this.font.set("right");
        this.score = -1;
        this.floating = !0
    },
    update: function() {
        return this.score !== game.data.score ? (this.score = game.data.score, !0) : !1
    },
    draw: function(a) {
        this.font.draw(a, game.data.score, this.pos.x, this.pos.y)
    }
});
game.HUD.LivesItem_textual = me.Renderable.extend({
    init: function(a, b) {
        this._super(me.Renderable, "init", [a, b, 10, 10]);
        this.font = new me.BitmapFont("bitmap_font", game.data.lowres ? 16 : 32);
        this.font.set("left");
        this.score = -1;
        this.floating = !0
    },
    update: function() {
        return this.lives !== game.data.lives ? (this.lives = game.data.lives, !0) : !1
    },
    draw: function(a) {
        this.font.draw(a, "P:" + (0 <= game.data.lives ? game.data.lives : 0), this.pos.x, this.pos.y)
    }
});
game.HUD.LivesItem_graphic = me.Renderable.extend({
    init: function(a, b) {
        this._super(me.Renderable, "init", [a, b, 10, 10]);
        this.lives = -1;
        this.floating = !0;
        this.image = me.loader.getImage("head")
    },
    update: function() {
        return this.lives !== game.data.lives ? (this.lives = game.data.lives, !0) : !1
    },
    draw: function(a) {
        for (var b = 0; b < game.data.lives; b++) a.drawImage(this.image, 5 + b * this.image.width, 5)
    }
});
game.HUD.TextItem = me.Renderable.extend({
    init: function() {
        this._super(me.Renderable, "init", [0, 0, 10, 10]);
        this.font = prepareFont(parseInt(game.data.widthGame / 24));
        this.font2 = prepareFont(parseInt(game.data.widthGame / 16));
        this.floating = !0
    },
    update: function() {
        return !0
    },
    draw: function(a) {
        "getready" == game.data.text && (b = me.device.isMobile ? game.data.locale.start_mobile : game.data.locale.start_desktop, drawText(a, b, me.game.viewport.width / 2, me.game.viewport.height / 2, 460, this.font2.font, this.font2.shadow));
        if ("pause" ==
            game.data.text) {
            var b = game.data.locale.pause;
            drawText(a, b, me.game.viewport.width / 2, me.game.viewport.height / 2 - 50, 460, this.font2.font, this.font2.shadow)
        }
    }
});
game.HUD.butt_pause = me.GUI_Object.extend({
    init: function(a, b) {
        settings = {};
        this.image = me.loader.getImage("butt_pause");
        settings.image = this.image;
        settings.framewidth = this.image.width;
        settings.frameheight = this.image.height;
        this._super(me.GUI_Object, "init", [a - settings.framewidth / 2, b - settings.frameheight / 2, settings]);
        this.x = a - settings.framewidth / 2;
        this.y = b - settings.frameheight / 2
    },
    draw: function(a) {
        "" == game.data.text && a.drawImage(this.image, this.x, this.y)
    },
    onClick: function() {
        "" == game.data.text && game.data.running &&
            me.input.triggerKeyEvent(me.input.KEY.P, !0)
    }
});
var swipe = me.Renderable.extend({
        init: function() {
            this._super(me.Renderable, "init", [0, 0, game.data.widthGame, game.data.heightGame]);
            this.floating = !0;
            me.input.registerPointerEvent("pointerdown", this, this.onStartEvent.bind(this));
            me.input.registerPointerEvent("pointerup", this, this.onEndEvent.bind(this));
            me.input.registerPointerEvent("pointermove", this, this.onMoveEvent.bind(this));
            this.startPos = new me.Vector2d
        },
        onStartEvent: function(a) {
            "undefined" != typeof a.changedTouches ? (a = a.changedTouches[0], a = me.input.globalToLocal(a.pageX,
                a.pageY)) : a = me.input.globalToLocal(a.gameX, a.gameY);
            this.startPos = a;
            me.input.triggerKeyEvent(me.input.KEY.RIGHT, !1);
            me.input.triggerKeyEvent(me.input.KEY.LEFT, !1);
            me.input.triggerKeyEvent(me.input.KEY.UP, !1);
            me.input.triggerKeyEvent(me.input.KEY.DOWN, !1)
        },
        onEndEvent: function(a) {
            if ("undefined" != typeof a.changedTouches) {
                a = a.changedTouches[0];
                var b = me.input.globalToLocal(a.pageX, a.pageY)
            } else b = me.input.globalToLocal(a.gameX, a.gameY);
            a = this.startPos.x - b.x;
            b = this.startPos.y - b.y;
            if (10 < Math.abs(a) || 10 <
                Math.abs(b)) Math.abs(a) > Math.abs(b) ? 0 < a ? me.input.triggerKeyEvent(me.input.KEY.LEFT, !0) : me.input.triggerKeyEvent(me.input.KEY.RIGHT, !0) : 0 < b ? me.input.triggerKeyEvent(me.input.KEY.UP, !0) : me.input.triggerKeyEvent(me.input.KEY.DOWN, !0)
        },
        onMoveEvent: function(a) {
            "undefined" != typeof a.changedTouches ? (a = a.changedTouches[0], a = me.input.globalToLocal(a.pageX, a.pageY)) : a = me.input.globalToLocal(a.gameX, a.gameY);
            var b = this.startPos.x - a.x,
                d = this.startPos.y - a.y;
            if (10 < Math.abs(b) || 10 < Math.abs(d)) me.input.triggerKeyEvent(me.input.KEY.RIGHT, !1), me.input.triggerKeyEvent(me.input.KEY.LEFT, !1), me.input.triggerKeyEvent(me.input.KEY.UP, !1), me.input.triggerKeyEvent(me.input.KEY.DOWN, !1), Math.abs(b) > Math.abs(d) ? 0 < b ? me.input.triggerKeyEvent(me.input.KEY.LEFT, !0) : me.input.triggerKeyEvent(me.input.KEY.RIGHT, !0) : 0 < d ? me.input.triggerKeyEvent(me.input.KEY.UP, !0) : me.input.triggerKeyEvent(me.input.KEY.DOWN, !0), this.startPos = a
        },
        destroy: function() {
            me.input.releasePointerEvent("pointerdown", this, this.onStartEvent.bind(this));
            me.input.releasePointerEvent("pointerup",
                this, this.onEndEvent.bind(this));
            me.input.releasePointerEvent("pointermove", this, this.onMoveEvent.bind(this))
        }
    }),
    tap = me.Renderable.extend({
        init: function() {
            this.image = me.loader.getImage("arrows");
            this._super(me.Renderable, "init", [0, 0, game.data.widthGame, game.data.heightGame]);
            this.floating = !0;
            this.sprite_size = 128;
            this.region = new me.Rect(0, 0, game.data.widthGame, game.data.heightGame);
            this.region.floating = !0;
            me.input.registerPointerEvent("pointerdown", this, this.onStartEvent.bind(this), !0);
            me.input.registerPointerEvent("pointerup",
                this, this.onEndEvent.bind(this), !0)
        },
        onStartEvent: function(a) {
            a = a.changedTouches[0];
            var b = me.input.globalToLocal(a.pageX, a.pageY);
            a = game.data.widthGame / 2 - b.x;
            b = game.data.heightGame / 2 - b.y;
            Math.abs(a) > Math.abs(b) ? 0 < a ? me.input.triggerKeyEvent(me.input.KEY.LEFT, !0) : me.input.triggerKeyEvent(me.input.KEY.RIGHT, !0) : 0 < b ? me.input.triggerKeyEvent(me.input.KEY.UP, !0) : me.input.triggerKeyEvent(me.input.KEY.DOWN, !0)
        },
        onEndEvent: function(a) {
            me.input.triggerKeyEvent(me.input.KEY.RIGHT, !1);
            me.input.triggerKeyEvent(me.input.KEY.LEFT, !1);
            me.input.triggerKeyEvent(me.input.KEY.UP, !1);
            me.input.triggerKeyEvent(me.input.KEY.DOWN, !1)
        },
        draw: function(a) {
            me.input.isKeyPressed("up") ? a.drawImage(this.image, 0, 0, this.sprite_size, this.sprite_size, game.data.widthGame / 2 - this.sprite_size / 2, 0, this.sprite_size, this.sprite_size) : me.input.isKeyPressed("down") ? a.drawImage(this.image, 2 * this.sprite_size, 0, this.sprite_size, this.sprite_size, game.data.widthGame / 2 - this.sprite_size / 2, game.data.heightGame - this.sprite_size, this.sprite_size, this.sprite_size) :
                me.input.isKeyPressed("right") ? a.drawImage(this.image, this.sprite_size, 0, this.sprite_size, this.sprite_size, game.data.widthGame - this.sprite_size, game.data.heightGame / 2 - this.sprite_size / 2, this.sprite_size, this.sprite_size) : me.input.isKeyPressed("left") && a.drawImage(this.image, 3 * this.sprite_size, 0, this.sprite_size, this.sprite_size, 0, game.data.heightGame / 2 - this.sprite_size / 2, this.sprite_size, this.sprite_size)
        },
        destroy: function() {
            me.input.releasePointerEvent("pointerdown", this, this.onStartEvent.bind(this));
            me.input.releasePointerEvent("pointerup", this, this.onEndEvent.bind(this))
        }
    });
game.EnemyEntity = me.Entity.extend({
    init: function(a, b, d) {
        game.data.Path_Layer = getLayerByName("Path");
        this.enemyType = d.type;
        this.image = me.loader.getImage(this.enemyType);
        d.image = this.image;
        d.framewidth = game.data.tilewidth;
        d.frameheight = game.data.tileheight;
        d.width = game.data.tilewidth;
        d.height = game.data.tileheight;
        this.initialX = a;
        this.initialY = b;
        this._super(me.Entity, "init", [a, b, d]);
        this.behavior = null != d.behavior ? d.behavior : "random";
        this.respawnTimer = null != d.delay ? me.timer.getTime() + parseInt(d.delay) :
            0;
        this.renderable.addAnimation("up", PREFS.ENEMY_ANIMATION_NORMAL_UP_WALK.value, 60);
        this.renderable.addAnimation("down", PREFS.ENEMY_ANIMATION_NORMAL_DOWN_WALK.value, 60);
        this.renderable.addAnimation("right", PREFS.ENEMY_ANIMATION_NORMAL_RIGHT_WALK.value, 60);
        this.renderable.addAnimation("left", PREFS.ENEMY_ANIMATION_NORMAL_LEFT_WALK.value, 60);
        this.renderable.addAnimation("up_attack", PREFS.ENEMY_ANIMATION_ATTACK_UP_WALK.value, 60);
        this.renderable.addAnimation("down_attack", PREFS.ENEMY_ANIMATION_ATTACK_DOWN_WALK.value,
            60);
        this.renderable.addAnimation("right_attack", PREFS.ENEMY_ANIMATION_ATTACK_RIGHT_WALK.value, 60);
        this.renderable.addAnimation("left_attack", PREFS.ENEMY_ANIMATION_ATTACK_LEFT_WALK.value, 60);
        this.renderable.addAnimation("up_bite", PREFS.ENEMY_ANIMATION_BITE_UP_WALK.value, 60);
        this.renderable.addAnimation("down_bite", PREFS.ENEMY_ANIMATION_BITE_DOWN_WALK.value, 60);
        this.renderable.addAnimation("right_bite", PREFS.ENEMY_ANIMATION_BITE_RIGHT_WALK.value, 60);
        this.renderable.addAnimation("left_bite", PREFS.ENEMY_ANIMATION_BITE_LEFT_WALK.value,
            60);
        this.renderable.addAnimation("up_scared", PREFS.ENEMY_ANIMATION_SCARED_UP_WALK.value, 60);
        this.renderable.addAnimation("down_scared", PREFS.ENEMY_ANIMATION_SCARED_DOWN_WALK.value, 60);
        this.renderable.addAnimation("right_scared", PREFS.ENEMY_ANIMATION_SCARED_RIGHT_WALK.value, 60);
        this.renderable.addAnimation("left_scared", PREFS.ENEMY_ANIMATION_SCARED_LEFT_WALK.value, 60);
        this.renderable.addAnimation("up_transition", PREFS.ENEMY_ANIMATION_ENDING_UP_WALK.value, 60);
        this.renderable.addAnimation("down_transition",
            PREFS.ENEMY_ANIMATION_ENDING_DOWN_WALK.value, 60);
        this.renderable.addAnimation("right_transition", PREFS.ENEMY_ANIMATION_ENDING_RIGHT_WALK.value, 60);
        this.renderable.addAnimation("left_transition", PREFS.ENEMY_ANIMATION_ENDING_LEFT_WALK.value, 60);
        this.renderable.addAnimation("die", PREFS.ENEMY_ANIMATION_DYING.value, 60);
        this.renderable.addAnimation("respawn", PREFS.ENEMY_ANIMATION_RESPAWN.value, 60);
        this.name = "enemy";
        this.type = game.data.ENEMY_OBJECT;
        this.body.gravity = 0;
        this.body.setVelocity(999, 999);
        this.alwaysUpdate =
            null != d.keepAlive ? d.keepAlive : !1;
        this.directions = [8, 4, 2, 1];
        this.wantedDirection = 0;
        a = getTile(this);
        do this.direction = this.directions[Math.floor(4 * Math.random())]; while (0 == (this.direction & a) && 0 != a);
        switch (this.direction) {
            case 8:
                this.renderable.setCurrentAnimation("up");
                break;
            case 4:
                this.renderable.setCurrentAnimation("right");
                break;
            case 2:
                this.renderable.setCurrentAnimation("down");
                break;
            case 1:
                this.renderable.setCurrentAnimation("left")
        }
        this.initialDirection = this.direction;
        this.state = "idle";
        this.aiTimer =
            0;
        this.aiMinTime = 500;
        this.aiMaxTime = 1E3;
        registerToRadarAndCollisions(this);
        this.nextTileType = this.currentTileType = 0;
        this.attack = !1;
        this.velocity = null != d.velocity ? parseInt(d.velocity) : PREFS.ENEMY_VELOCITY.value / PREFS.MAX_FPS.value;
        this.powerupVelocity = null != d.powerup_velocity ? parseInt(d.powerup_velocity) : PREFS.ENEMY_VELOCITY_ON__POWER_UP.value / PREFS.MAX_FPS.value;
        0 < PREFS.ENEMY_ANIMATION_RESPAWN.value.length && (this.renderable.alpha = 0);
        this.mode = "";
        this.isCollidingWithPlayer = "false"
    },
    update: function(a) {
        switch (this.state) {
            case "idle":
                this.respawnTimer <
                    me.timer.getTime() && (0 < PREFS.ENEMY_ANIMATION_RESPAWN.value.length ? (this.renderable.setCurrentAnimation("respawn", function() {
                        this.state = "running";
                        return !1
                    }.bind(this)), this.renderable.setAnimationFrame(0), this.renderable.alpha = 1, this.state = "donothing") : (this.renderable.alpha = 1, this.state = "running"));
                break;
            case "running":
                if (game.data.running) {
                    game.data.playerIsHunter ? game.data.hunterTimer - me.timer.getTime() < PREFS.ENDING_POWER_UP_ALERT.value ? this.mode = "_transition" : this.mode = "_scared" : this.mode = "";
                    var b =
                        0,
                        d = getTile(this);
                    if (this.aiTimer < me.timer.getTime() || 0 == this.body.vel.x && 0 == this.body.vel.y)
                        if (this.aiTimer = me.timer.getTime() + this.aiMinTime + Math.random() * (this.aiMaxTime - this.aiMinTime), "random" == this.behavior)
                            for (b = this.directions[Math.floor(4 * Math.random())]; 0 == (b & d) && 0 != d;) b = this.directions[Math.floor(4 * Math.random())];
                        else if (0.5 < Math.random() ? ((this.pos.y + game.data.tilewidth / 2) / game.data.tilewidth > (game.data.player.pos.y + game.data.tilewidth / 2) / game.data.tilewidth && (b = 8), (this.pos.y + game.data.tileheight /
                            2) / game.data.tileheight < (game.data.player.pos.y + game.data.tileheight / 2) / game.data.tileheight && (b = 2)) : ((this.pos.x + game.data.tilewidth / 2) / game.data.tilewidth > (game.data.player.pos.x + game.data.tilewidth / 2) / game.data.tilewidth && (b = 1), (this.pos.x + game.data.tileheight / 2) / game.data.tileheight < (game.data.player.pos.x + game.data.tileheight / 2) / game.data.tileheight && (b = 4)), 0 == (b & d) && 0 == this.body.vel.x && 0 == this.body.vel.y)
                        for (b = this.directions[Math.floor(4 * Math.random())]; 0 == (b & d) && 0 != d;) b = this.directions[Math.floor(4 *
                            Math.random())];
                    if (PREFS.ENEMIES_USE_TELEPORT.value) {
                        var d = Math.floor((this.pos.x + game.data.tilewidth / 2) / game.data.tilewidth),
                            e = Math.floor((this.pos.y + game.data.tileheight / 2) / game.data.tileheight);
                        if ("undefined" !== typeof game.data.teleportArray)
                            if (d = game.data.teleportArray[d][e], 0 !== d) {
                                var e = Math.abs(Math.floor((this.pos.x + game.data.tilewidth / 2) / game.data.tilewidth) * game.data.tilewidth - this.pos.x),
                                    f = Math.abs(Math.floor((this.pos.y + game.data.tileheight / 2) / game.data.tileheight) * game.data.tileheight -
                                        this.pos.y);
                                if (4 > e && 4 > f && "allowed" === this.teleportTrigger) {
                                    this.teleportTrigger = "denied";
                                    d = game.data.teleportList[d.destination];
                                    this.pos.x = d[0];
                                    this.pos.y = d[1];
                                    d = getTile(this);
                                    do this.direction = this.directions[Math.floor(4 * Math.random())]; while (0 == (this.direction & d) && 0 != d);
                                    this.wantedDirection = this.direction
                                }
                            } else this.teleportTrigger = "allowed"
                    }
                    getAheadCollisionArray(this) == game.data.PLAYER_OBJECT ? this.attack || game.data.playerIsHunter || (this.attack = !0, PREFS.AUDIOENABLED.value && me.audio.play("growl"),
                        this.mode = "_attack", this.renderable.isCurrentAnimation("up") && this.renderable.setCurrentAnimation("up_attack"), this.renderable.isCurrentAnimation("down") && this.renderable.setCurrentAnimation("down_attack"), this.renderable.isCurrentAnimation("left") && this.renderable.setCurrentAnimation("left_attack"), this.renderable.isCurrentAnimation("right") && this.renderable.setCurrentAnimation("right_attack")) : this.attack = !1;
                    entityManager(this, b);
                    if (this.isCollidingWithPlayer && 20 > this.pos.distance(game.data.player.pos))
                        if (game.data.playerIsHunter &&
                            PREFS.POWER_UP_INVULNERABILITY.value) {
                            if (PREFS.POWER_UP_KILLS_ENEMIES.value) {
                                game.data.score += PREFS.ENEMY_POINTS.value;
                                me.game.world.addChild(new game.EnemyPointsEntity(this.pos.x, this.pos.y, PREFS.ENEMY_POINTS.value), 999);
                                if (0 < PREFS.ENEMY_ANIMATION_DYING.value.length) this.renderable.setCurrentAnimation("die", function() {
                                        if ("respawn" === PREFS.ON_DEAD_ENEMY_ACTION.value) {
                                            this.pos.x = this.initialX;
                                            this.pos.y = this.initialY;
                                            this.respawnTimer = me.timer.getTime() + PREFS.ENEMY_RESPAWN_TIME.value;
                                            this.body.vel.x =
                                                0;
                                            this.body.vel.y = 0;
                                            this.state = "idle";
                                            this.mode = "";
                                            this.direction = this.initialDirection;
                                            switch (this.direction) {
                                                case 8:
                                                    this.renderable.setCurrentAnimation("up");
                                                    break;
                                                case 4:
                                                    this.renderable.setCurrentAnimation("right");
                                                    break;
                                                case 2:
                                                    this.renderable.setCurrentAnimation("down");
                                                    break;
                                                case 1:
                                                    this.renderable.setCurrentAnimation("left")
                                            }
                                            this.renderable.alpha = !0 == PREFS.ENEMIES_HIDDEN_ON_DEAD.value ? 0 : 1;
                                            this.body.update()
                                        } else me.game.world.removeChild(this), removeFromRadar(this);
                                        return !1
                                    }.bind(this)), this.renderable.setAnimationFrame(0),
                                    this.state = "donothing";
                                else if ("respawn" === PREFS.ON_DEAD_ENEMY_ACTION.value) switch (this.pos.x = this.initialX, this.pos.y = this.initialY, this.respawnTimer = me.timer.getTime() + PREFS.ENEMY_RESPAWN_TIME.value, this.body.vel.x = 0, this.body.vel.y = 0, this.state = "idle", this.mode = "", this.renderable.alpha = 1, this.direction = this.initialDirection, this.direction) {
                                    case 8:
                                        this.renderable.setCurrentAnimation("up");
                                        break;
                                    case 4:
                                        this.renderable.setCurrentAnimation("right");
                                        break;
                                    case 2:
                                        this.renderable.setCurrentAnimation("down");
                                        break;
                                    case 1:
                                        this.renderable.setCurrentAnimation("left")
                                } else me.game.world.removeChild(this), removeFromRadar(this);
                                PREFS.AUDIOENABLED.value && me.audio.play("killenemy")
                            }
                        } else(this.renderable.isCurrentAnimation("up") || this.renderable.isCurrentAnimation("up_attack")) && this.renderable.setCurrentAnimation("up_bite"), (this.renderable.isCurrentAnimation("down") || this.renderable.isCurrentAnimation("down_attack")) && this.renderable.setCurrentAnimation("down_bite"), (this.renderable.isCurrentAnimation("left") ||
                            this.renderable.isCurrentAnimation("left_attack")) && this.renderable.setCurrentAnimation("left_bite"), (this.renderable.isCurrentAnimation("right") || this.renderable.isCurrentAnimation("right_attack")) && this.renderable.setCurrentAnimation("right_bite"), PREFS.AUDIOENABLED.value && me.audio.play("dead"), game.data.player.state = "die", me.game.world.moveToTop(game.data.player);
                    this.body.update();
                    this.isCollidingWithPlayer = "false"
                } else this.body.vel.x = 0, this.body.vel.y = 0
        }
        this._super(me.Entity, "update", [a]);
        return !0
    },
    onCollision: function(a, b) {
        return !1
    }
});
game.EnemyPointsEntity = me.Renderable.extend({
    init: function(a, b, d) {
        this._super(me.Renderable, "init", [a, b, 10, 10]);
        this.font = new me.BitmapFont("bitmap_font", 16);
        this.font.set("center");
        this.value = d;
        this.life = 0
    },
    update: function() {
        20 > this.life ? (this.pos.y -= 1, this.life++) : me.game.world.removeChild(this);
        return !0
    },
    draw: function(a) {
        this.font.draw(a, this.value, this.pos.x, this.pos.y)
    }
});
game.dotEntity = me.AnimationSheet.extend({
    init: function(a, b, d) {
        game.data.Path_Layer = getLayerByName("Path");
        this.image = me.loader.getImage("dots");
        this._super(me.AnimationSheet, "init", [a, b, {
            image: this.image,
            framewidth: game.data.tilewidth,
            frameheight: game.data.tileheight,
            anchorPoint: new me.Vector2d(0, 0)
        }]);
        this.addAnimation("idle", PREFS.DOT_ANIMATION_LOOP.value, 80);
        this.addAnimation("pick", PREFS.DOT_ANIMATION_PICKUP.value, 80);
        this.setCurrentAnimation("idle");
        this.setAnimationFrame(Math.floor(Math.random() *
            PREFS.DOT_ANIMATION_LOOP.value.length));
        this.state = "idle";
        this.name = "dot";
        this.alwaysUpdate = !0;
        addToDotsArray(this);
        registerToRadarAndCollisions(this);
        this.collidable = !1
    }
});
game.pillEntity = me.AnimationSheet.extend({
    init: function(a, b, d) {
        game.data.Path_Layer = getLayerByName("Path");
        this.image = me.loader.getImage("pills");
        this._super(me.AnimationSheet, "init", [a, b, {
            image: this.image,
            framewidth: game.data.tilewidth,
            frameheight: game.data.tileheight,
            anchorPoint: new me.Vector2d(0, 0)
        }]);
        this.addAnimation("idle", PREFS.PILL_ANIMATION_LOOP.value, 80);
        this.addAnimation("pick", PREFS.PILL_ANIMATION_PICKUP.value, 80);
        this.setCurrentAnimation("idle");
        this.setAnimationFrame(Math.floor(Math.random() *
            PREFS.PILL_ANIMATION_LOOP.value.length));
        this.state = "idle";
        this.name = "pill";
        this.alwaysUpdate = !1;
        addToDotsArray(this);
        registerToRadarAndCollisions(this);
        this.collidable = !1
    }
});

function addToDotsArray(a) {
    var b = game.data.Path_Layer.cols,
        d = game.data.Path_Layer.rows;
    if (0 === game.data.dotCounter)
        for ("undefined" == typeof game.data.dotArray ? game.data.dotArray = [] : game.data.dotArray.length = 0, c = 0; c < b; c++)
            for (game.data.dotArray[c] = [], r = 0; r < d; r++) game.data.dotArray[c].push(0);
    game.data.dotArray[Math.floor((a.pos.x + game.data.tilewidth / 2) / game.data.tilewidth)][Math.floor((a.pos.y + game.data.tileheight / 2) / game.data.tileheight)] = a;
    game.data.dotCounter += 1
}
game.teleportEntity = me.Renderable.extend({
    init: function(a, b, d) {
        game.data.Path_Layer = getLayerByName("Path");
        this._super(me.Renderable, "init", [a, b, game.data.tilewidth, game.data.tileheight]);
        this.name = "teleport";
        null != d.id ? this.id = parseInt(d.id) : alert("You must assign 'id' property to teleport entity");
        null != d.destination ? this.destination = parseInt(d.destination) : alert("You must assign 'send_to' property to teleport entity");
        addToTeleportArray(this)
    }
});

function addToTeleportArray(a) {
    var b = game.data.Path_Layer.cols,
        d = game.data.Path_Layer.rows;
    if (0 == game.data.teleportCounter) {
        "undefined" == typeof game.data.teleportArray ? game.data.teleportArray = [] : game.data.teleportArray.length = 0;
        for (c = 0; c < b; c++)
            for (game.data.teleportArray[c] = [], r = 0; r < d; r++) game.data.teleportArray[c].push(0);
        "undefined" == typeof game.data.teleportList ? game.data.teleportList = [] : game.data.teleportList.length = 0
    }
    game.data.teleportArray[Math.floor((a.pos.x + game.data.tilewidth / 2) / game.data.tilewidth)][Math.floor((a.pos.y +
        game.data.tileheight / 2) / game.data.tileheight)] = a;
    game.data.teleportList[a.id] = [a.pos.x, a.pos.y];
    game.data.teleportCounter += 1
}
var ProgressBar = me.Renderable.extend({
        init: function(a, b, d) {
            me.Renderable.prototype.init.apply(this, [a.x, a.y, b, d]);
            this.invalidate = !1;
            this.barHeight = 4;
            this.progress = 0
        },
        onProgressUpdate: function(a) {
            this.progress = ~~(a * this.width);
            this.invalidate = !0
        },
        update: function() {
            return !0 === this.invalidate ? (this.invalidate = !1, !0) : !1
        },
        draw: function(a) {
            a.setColor("black");
            a.fillRect(0, this.height / 2 - this.barHeight / 2 + PREFS.GAME_NAME_1_SIZE.value + PREFS.GAME_NAME_2_SIZE.value + 10, this.width, this.barHeight);
            a.setColor(PREFS.LOADING_BAR_COLOR.value);
            a.fillRect(2, this.height / 2 - this.barHeight / 2 + PREFS.GAME_NAME_1_SIZE.value + PREFS.GAME_NAME_2_SIZE.value + 10, this.progress, this.barHeight);
            a.setColor("white")
        }
    }),
    TextLogo = me.Renderable.extend({
        init: function(a, b) {
            this._super(me.Renderable, "init", [0, 0, a, b]);
            this.logo1 = new me.Font("arial, helvetica, sans-serif", parseInt(PREFS.GAME_NAME_1_SIZE.value), PREFS.GAME_NAME_1_COLOR.value, "middle");
            this.logo2 = new me.Font("arial, helvetica, sans-serif", parseInt(PREFS.GAME_NAME_2_SIZE.value), PREFS.GAME_NAME_2_COLOR.value,
                "middle");
            this.logo2.bold();
            navigator.isCocoonJS || (this.image = me.loader.getImage("loading"));
            this.imageH = 20
        },
        draw: function(a) {
            var b = this.logo1.measureText(a, PREFS.GAME_NAME_1.value).width,
                d = this.logo2.measureText(a, PREFS.GAME_NAME_2.value).width,
                b = (this.width - b) / 2,
                d = (this.width - d) / 2,
                e = this.height / 2,
                f = this.height / 2 + this.logo1.measureText(a, PREFS.GAME_NAME_1.value).height;
            this.logo1.draw(a, PREFS.GAME_NAME_1.value, b, e);
            this.logo2.draw(a, PREFS.GAME_NAME_2.value, d, f);
            navigator.isCocoonJS || a.drawImage(this.image, (this.width - this.image.width) / 2, this.height / 2 - this.image.height - this.imageH)
        }
    }),
    CustomLoadingScreen = me.ScreenObject.extend({
        onResetEvent: function() {
            me.game.world.addChild(new me.ColorLayer("background", PREFS.LOADING_BG_COLOR.value, 0), 0);
            var a = new ProgressBar(new me.Vector2d, me.video.renderer.getWidth(), me.video.renderer.getHeight());
            this.loaderHdlr = me.event.subscribe(me.event.LOADER_PROGRESS, a.onProgressUpdate.bind(a));
            this.resizeHdlr = me.event.subscribe(me.event.VIEWPORT_ONRESIZE, a.resize.bind(a));
            me.game.world.addChild(a, 1);
            this.iconCanvas = me.video.createCanvas(me.game.viewport.width, me.game.viewport.height, !1);
            me.game.world.addChild(new TextLogo(me.video.renderer.getWidth(), me.video.renderer.getHeight()), 1)
        },
        onDestroyEvent: function() {
            me.event.unsubscribe(this.loaderHdlr);
            me.event.unsubscribe(this.resizeHdlr);
            this.loaderHdlr = this.resizeHdlr = null
        }
    });
game.MenuScreen = me.ScreenObject.extend({
    onResetEvent: function() {
        me.video.renderer.clearSurface(me.video.renderer.getContext(), "#ffffff", !0);
        this.w = me.video.renderer.getWidth();
        this.h = me.video.renderer.getHeight();
        var a = me.loader.getImage("gui_bg");
        this.background = new me.Sprite(this.w / 2, this.h / 2, {
            image: a
        });
        me.game.world.addChild(this.background, 1);
        this.background.draw(me.video.renderer);
        this.maintitle_instance = new maintitle(0.5 * this.w, 0.18 * this.h);
        me.game.world.addChild(this.maintitle_instance, 30);
        this.maintitle_instance.draw(me.video.renderer);
        this.cover_instance = new cover(0.5 * this.w, 0.5 * this.h - 20);
        me.game.world.addChild(this.cover_instance, 30);
        this.cover_instance.draw(me.video.renderer);
        a = 40;
        PREFS.MORE_GAMES_BUTTON.value && (me.game.world.addChild(new menu_playmoregames(0.5 * this.w, this.h - a), 40), a += 60);
        PREFS.HOW_TO_PLAY_BUTTON.value && (me.game.world.addChild(new menu_howtoplay(0.5 * this.w, this.h - a, 20), 40), a += 60);
        me.game.world.addChild(new menu_play(0.5 * this.w, this.h - a, 40), 40);
        var a = [
                [26, 26],
                [this.w -
                    26, 26
                ],
                [26, 76],
                [this.w - 26, 76],
                [26, 126],
                [this.w - 26, 126]
            ],
            b = 0;
        PREFS.TOGGLE_AUDIO_BUTTON.value && (me.game.world.addChild(new menu_audio(a[b][0], a[b][1]), 40), b++);
        PREFS.INFORMATION_BUTTON.value && (me.game.world.addChild(new menu_info(a[b][0], a[b][1], "info_button"), 40), b++);
        PREFS.FULLSCREEN_BUTTON.value && me.device.hasFullscreenSupport && !me.device.isMobile && (me.game.world.addChild(new menu_fullscreen(a[b][0], a[b][1]), 40), b++);
        PREFS.HISCORE_BUTTON.value && me.game.world.addChild(new menu_hiscore(a[b][0], a[b][1],
            "hiscore_button"), 40);
        PREFS.AUDIOENABLED.value && PREFS.MUSICENABLED.value && null == me.audio.getCurrentTrack() && me.audio.playTrack("menu", 0.5)
    }
});
var generic_big_button = me.GUI_Object.extend({
        init: function(a, b, d) {
            var e = {};
            this.image = me.loader.getImage("menu_button");
            e.image = this.image;
            e.framewidth = this.image.width;
            e.frameheight = this.image.height;
            this.x = a - e.framewidth / 2;
            this.y = b - e.frameheight / 2;
            this.textx = a;
            this.texty = b;
            this.font = prepareFont(d);
            this._super(me.GUI_Object, "init", [a - e.framewidth / 2, b - e.frameheight / 2, e])
        }
    }),
    generic_small_button = me.GUI_Object.extend({
        init: function(a, b, d) {
            var e = {};
            this.image = "" != d ? me.loader.getImage(d) : me.loader.getImage("small_button");
            e.image = this.image;
            e.framewidth = this.image.width;
            e.frameheight = this.image.height;
            this.x = a - e.framewidth / 2;
            this.y = b - e.frameheight / 2;
            this._super(me.GUI_Object, "init", [a - e.framewidth / 2, b - e.frameheight / 2, e]);
            this.pos.z = 4
        },
        draw: function(a) {
            a.drawImage(this.image, this.x, this.y)
        }
    }),
    menu_play = generic_big_button.extend({
        init: function(a, b, d) {
            this._super(generic_big_button, "init", [a, b, d])
        },
        draw: function(a) {
            a.drawImage(this.image, this.x, this.y);
            text = game.data.locale.play;
            drawText(a, text, this.textx, this.texty,
                200, this.font.font, this.font.shadow)
        },
        onClick: function() {
            resetGame();
            PREFS.USE_SELECT_LEVEL_SCREEN.value ? me.state.change(me.state.USER + 1) : (me.state.change(me.state.PLAY), PREFS.AUDIOENABLED.value && me.audio.stopTrack("menu"));
            PREFS.AUDIOENABLED.value && me.audio.play("click");
            return !0
        }
    }),
    menu_howtoplay = generic_big_button.extend({
        init: function(a, b, d) {
            this._super(generic_big_button, "init", [a, b, d])
        },
        draw: function(a) {
            a.drawImage(this.image, this.x, this.y);
            text = game.data.locale.how_to_play;
            drawText(a, text,
                this.textx, this.texty, 200, this.font.font, this.font.shadow)
        },
        onClick: function() {
            me.state.change(me.state.USER + 2);
            PREFS.AUDIOENABLED.value && me.audio.play("click");
            return !0
        }
    }),
    menu_playmoregames = me.GUI_Object.extend({
        init: function(a, b) {
            var d = {};
            this.image = me.loader.getImage("menu_button");
            d.image = this.image;
            d.framewidth = this.image.width;
            d.frameheight = this.image.height;
            this.x = a - d.framewidth / 2;
            this.y = b - d.frameheight / 2;
            this.textx = a;
            this.texty = b;
            this.font = prepareFont(20);
            d.width = d.framewidth;
            d.height = d.frameheight;
            this._super(me.GUI_Object, "init", [a - d.framewidth / 2, b - d.frameheight / 2, d]);
            navigator.isCocoonJS ? (this.role = "rate", 0.5 < Math.random() && (this.role = "moregames")) : this.role = "moregames"
        },
        draw: function(a) {
            a.drawImage(this.image, this.x, this.y);
            drawText(a, "moregames" == this.role ? game.data.locale.play_more_games : game.data.locale.rate_this_game, this.textx, this.texty, 250, this.font.font, this.font.shadow)
        },
        onClick: function() {
            PREFS.AUDIOENABLED.value && me.audio.play("click");
            "moregames" == this.role ? navigator.isCocoonJS ?
                Cocoon.App.openURL(PREFS.MORE_GAMES_URL.value) : window.open(PREFS.MORE_GAMES_URL.value) : /ios/.test(navigator.userAgent) ? Cocoon.App.openURL(PREFS.IOS_RATING_URL.value) : /android/.test(navigator.userAgent) && Cocoon.App.openURL(PREFS.ANDROID_RATING_URL.value);
            return !0
        }
    }),
    menu_info = generic_small_button.extend({
        onClick: function() {
            PREFS.AUDIOENABLED.value && me.audio.play("click");
            me.state.change(me.state.USER + 3);
            return !0
        }
    }),
    menu_prefs = generic_small_button.extend({
        onClick: function() {
            PREFS.AUDIOENABLED.value &&
                me.audio.play("click");
            me.state.change(me.state.USER + 7);
            return !0
        }
    }),
    menu_hiscore = generic_small_button.extend({
        onClick: function() {
            PREFS.AUDIOENABLED.value && me.audio.play("click");
            me.state.change(me.state.SCORE);
            return !0
        }
    }),
    menu_audio = me.GUI_Object.extend({
        init: function(a, b) {
            settings = {};
            settings.image = PREFS.AUDIOENABLED.value ? me.loader.getImage("audio_on_button") : me.loader.getImage("audio_off_button");
            settings.framewidth = 48;
            settings.frameheight = 48;
            this.x = a - settings.framewidth / 2;
            this.y = b - settings.frameheight /
                2;
            settings.width = settings.framewidth;
            settings.height = settings.frameheight;
            this._super(me.GUI_Object, "init", [a - settings.framewidth / 2, b - settings.frameheight / 2, settings]);
            this.image_on = me.loader.getImage("audio_on_button");
            this.image_off = me.loader.getImage("audio_off_button")
        },
        draw: function(a) {
            a.drawImage(this.image, this.x, this.y)
        },
        onClick: function() {
            me.device.wp || (PREFS.AUDIOENABLED.value ? (this.image = this.image_off, me.audio.muteAll(), PREFS.AUDIOENABLED.value = !1) : (this.image = this.image_on, me.audio.unmuteAll(),
                me.audio.play("click"), PREFS.AUDIOENABLED.value = !0));
            return !0
        }
    }),
    menu_fullscreen = me.GUI_Object.extend({
        init: function(a, b) {
            settings = {};
            settings.image = PREFS.AUDIOENABLED.value ? me.loader.getImage("fullscreen_on_button") : me.loader.getImage("fullscreen_off_button");
            settings.framewidth = 48;
            settings.frameheight = 48;
            this.x = a - settings.framewidth / 2;
            this.y = b - settings.frameheight / 2;
            settings.width = settings.framewidth;
            settings.height = settings.frameheight;
            this._super(me.GUI_Object, "init", [a - settings.framewidth / 2,
                b - settings.frameheight / 2, settings
            ]);
            this.image_on = me.loader.getImage("fullscreen_on_button");
            this.image_off = me.loader.getImage("fullscreen_off_button");
            this.image = this.image_on
        },
        draw: function(a) {
            a.drawImage(this.image, this.x, this.y)
        },
        onClick: function() {
            me.device.isFullscreen ? (PREFS.AUDIOENABLED.value && me.audio.play("click"), this.image = this.image_on, me.device.exitFullscreen()) : (PREFS.AUDIOENABLED.value && me.audio.play("click"), this.image = this.image_off, me.device.requestFullscreen());
            return !0
        }
    }),
    menu_back =
    generic_big_button.extend({
        init: function(a, b, d) {
            this._super(generic_big_button, "init", [a, b, d])
        },
        draw: function(a) {
            a.drawImage(this.image, this.x, this.y);
            text = game.data.locale.back;
            drawText(a, text, this.textx, this.texty, 200, this.font.font, this.font.shadow)
        },
        onClick: function() {
            me.state.change(me.state.MENU);
            PREFS.AUDIOENABLED.value && me.audio.play("click");
            return !0
        }
    }),
    maintitle = me.Renderable.extend({
        init: function(a, b) {
            this.image = me.loader.getImage("title");
            this.x = a - this.image.width / 2;
            this.y = b - this.image.height /
                2;
            this._super(me.Renderable, "init", [0, 0, 1, 1])
        },
        draw: function(a) {
            a.drawImage(this.image, this.x, this.y)
        }
    }),
    cover = me.Renderable.extend({
        init: function(a, b) {
            this.image = me.loader.getImage("cover");
            this.x = a - this.image.width / 2;
            this.y = b - this.image.height / 2;
            this._super(me.Renderable, "init", [0, 0, 1, 1])
        },
        draw: function(a) {
            a.drawImage(this.image, this.x, this.y)
        }
    }),
    Alert = function(a) {
        setTimeout(function() {
            me.game.world.addChild(new CustomAlert(a), 999)
        }, 1E3)
    },
    CustomAlert = me.GUI_Object.extend({
        init: function(a) {
            settings = {};
            this.text = a;
            this.w = me.video.renderer.getWidth();
            this.h = me.video.renderer.getHeight();
            this.image = me.loader.getImage("alert");
            settings.image = this.image;
            this.x = this.w / 2 - this.image.width / 2;
            this.y = this.h / 2 - this.image.height / 2;
            this.font = new me.Font("arial, helvetica, sans-serif", 18, "black", "center");
            settings.framewidth = this.image.width;
            settings.frameheight = this.image.height;
            settings.width = settings.framewidth;
            settings.height = settings.frameheight;
            this._super(me.GUI_Object, "init", [this.x, this.y, settings])
        },
        onClick: function() {
            me.game.world.removeChild(this, !0);
            me.game.repaint()
        },
        draw: function(a) {
            a.drawImage(this.image, this.x, this.y);
            drawText(a, this.text, this.x + this.image.width / 2, this.y + this.image.height / 2 - 40, 250, this.font)
        }
    });

function prepareFont(a, b) {
    "undefined" == typeof b && (b = "#ffffff");
    var d = new me.Font("arial, helvetica, sans-serif", a, b, "center"),
        e = new me.Font("arial, helvetica, sans-serif", a, "black", "center");
    d.textBaseline = "middle";
    e.textBaseline = "middle";
    d.bold();
    e.bold();
    return {
        font: d,
        shadow: e
    }
}

function drawText(a, b, d, e, f, g, l) {
    b = b.split("\n");
    var h = "";
    for (index = 0; index < b.length; ++index) {
        var k = b[index],
            p = g.measureText(a, k).width,
            p = Math.ceil(p / f);
        chWidth = k.length / p;
        for (var m = 0, q = 1; q < p; q++) {
            for (var n = 0;
                " " != k.charAt(parseInt(m + chWidth - n));) n++;
            m = parseInt(m + chWidth - n);
            k = k.replaceAt(m, "\n");
            if (q == p - 1 && (n = k.substr(m + 1, k.length), g.measureText(a, n).width > f)) {
                for (n = 0;
                    " " != k.charAt(m + chWidth - n);) n++;
                m = m + chWidth - n;
                k = k.replaceAt(m, "\n")
            }
        }
        h = h + k + "\n"
    }
    l && (l.draw(a, h, d - 1, e - 1), l.draw(a, h, d + 1, e - 1), l.draw(a,
        h, d - 1, e + 1), l.draw(a, h, d + 1, e + 1));
    g.draw(a, h, d, e)
}
String.prototype.replaceAt = function(a, b) {
    return this.substr(0, a) + b + this.substr(a + b.length)
};
var helpPage = 1;
game.HowToPlayScreen = me.ScreenObject.extend({
    onResetEvent: function() {
        this.w = me.video.renderer.getWidth();
        this.h = me.video.renderer.getHeight();
        var a = me.loader.getImage("gui_bg");
        this.background = new me.Sprite(this.w / 2, this.h / 2, {
            image: a
        });
        me.game.world.addChild(this.background, 1);
        a = me.loader.getImage("butt_left").width;
        me.game.world.addChild(new menu_left(a / 2 + 20, this.h - 40, "butt_left"), 4);
        me.game.world.addChild(new menu_right(this.w - a / 2 - 20, this.h - 40, "butt_right"), 4);
        game.data.lowres ? me.game.world.addChild(new helpImage(this.w,
            0), 10) : me.game.world.addChild(new helpImage(this.w, 60), 10);
        me.game.world.addChild(new helpText(this.w / 2, this.h / 2), 10);
        helpPage = 1
    }
});
var helpImage = me.Entity.extend({
        init: function(a, b) {
            settings = {};
            settings.image = me.loader.getImage("help_img");
            settings.spritewidth = 400;
            settings.spriteheight = 180;
            game.data.helpPages = settings.image.height / 180;
            settings.width = settings.spritewidth;
            settings.height = settings.spriteheight;
            this._super(me.Entity, "init", [a / 2 - settings.width / 2, b, settings]);
            this.renderable.addAnimation("1", [0]);
            this.renderable.addAnimation("2", [1]);
            this.renderable.addAnimation("3", [2]);
            this.renderable.addAnimation("4", [3]);
            this.renderable.addAnimation("5", [4])
        },
        update: function(a) {
            switch (helpPage) {
                case 1:
                    this.renderable.setCurrentAnimation("1");
                    break;
                case 2:
                    this.renderable.setCurrentAnimation("2");
                    break;
                case 3:
                    this.renderable.setCurrentAnimation("3");
                    break;
                case 4:
                    this.renderable.setCurrentAnimation("4");
                    break;
                case 5:
                    this.renderable.setCurrentAnimation("5")
            }
            this._super(me.Entity, "update", [a]);
            return !0
        }
    }),
    helpText = me.Renderable.extend({
        init: function(a, b) {
            this._super(me.Renderable, "init", [a, b, 10, 10]);
            this.font = game.data.lowres ? prepareFont(16, "white") :
                prepareFont(20, "white");
            this.font.font.lineHeight = 1.2;
            this.font.shadow.lineHeight = 1.2
        },
        draw: function(a) {
            switch (helpPage) {
                case 1:
                    var b = me.device.isMobile ? game.data.locale.howToPlay_mobile.p1 : game.data.locale.howToPlay_desktop.p1;
                    break;
                case 2:
                    b = me.device.isMobile ? game.data.locale.howToPlay_mobile.p2 : game.data.locale.howToPlay_desktop.p2;
                    break;
                case 3:
                    b = me.device.isMobile ? game.data.locale.howToPlay_mobile.p3 : game.data.locale.howToPlay_desktop.p3;
                    break;
                case 4:
                    b = me.device.isMobile ? game.data.locale.howToPlay_mobile.p4 :
                        game.data.locale.howToPlay_desktop.p4;
                    break;
                case 5:
                    b = me.device.isMobile ? game.data.locale.howToPlay_mobile.p5 : game.data.locale.howToPlay_desktop.p5
            }
            drawText(a, b, this.pos.x, this.pos.y, game.data.widthGame - 20, this.font.font, this.font.shadow)
        }
    }),
    menu_left = generic_small_button.extend({
        onClick: function() {
            1 < helpPage ? helpPage -= 1 : me.state.change(me.state.MENU);
            PREFS.AUDIOENABLED.value && me.audio.play("click");
            return !0
        }
    }),
    menu_right = generic_small_button.extend({
        onClick: function() {
            helpPage < game.data.helpPages ?
                helpPage += 1 : me.state.change(me.state.MENU);
            PREFS.AUDIOENABLED.value && me.audio.play("click");
            return !0
        }
    });
game.InfoScreen = me.ScreenObject.extend({
    onResetEvent: function() {
        this.w = me.video.renderer.getWidth();
        this.h = me.video.renderer.getHeight();
        var a = me.loader.getImage("gui_bg");
        this.background = new me.Sprite(this.w / 2, this.h / 2, {
            image: a
        });
        me.game.world.addChild(this.background, 1);
        this.background.draw(me.video.renderer);
        me.game.world.addChild(new menu_back(this.w / 2, this.h - 40, 20), 4);
        this.text = new infoText(this.w / 2, 20);
        me.game.world.addChild(this.text, 10);
        this.text.draw(me.video.renderer);
        helpPage = 1
    }
});
var infoText = me.Renderable.extend({
    init: function(a, b) {
        this._super(me.Renderable, "init", [a, b, 10, 10]);
        game.data.lowres ? (this.fontA = prepareFont(12, "white"), this.fontB = prepareFont(18, "white")) : (this.fontA = prepareFont(16, "white"), this.fontB = prepareFont(22, "white"));
        this.fontA.font.lineHeight = 1.2;
        this.fontA.shadow.lineHeight = 1.2;
        this.h = me.video.renderer.getHeight() - 60
    },
    draw: function(a) {
        var b = 0.05;
        text = game.data.locale.info.title1;
        drawText(a, text, this.pos.x, this.h * b, game.data.widthGame - 20, this.fontB.font,
            this.fontB.shadow);
        text = game.data.locale.info.text1;
        drawText(a, text, this.pos.x, this.h * b + 25, game.data.widthGame - 20, this.fontA.font, this.fontA.shadow);
        b = 0.2;
        text = game.data.locale.info.title2;
        drawText(a, text, this.pos.x, this.h * b, game.data.widthGame - 20, this.fontB.font, this.fontB.shadow);
        text = game.data.locale.info.text2;
        drawText(a, text, this.pos.x, this.h * b + 25, game.data.widthGame - 20, this.fontA.font, this.fontA.shadow);
        b = 0.35;
        text = game.data.locale.info.title3;
        drawText(a, text, this.pos.x, this.h * b, game.data.widthGame -
            20, this.fontB.font, this.fontB.shadow);
        text = game.data.locale.info.text3;
        drawText(a, text, this.pos.x, this.h * b + 25, game.data.widthGame - 20, this.fontA.font, this.fontA.shadow);
        b = 0.55;
        text = game.data.locale.info.title4;
        drawText(a, text, this.pos.x, this.h * b, game.data.widthGame - 20, this.fontB.font, this.fontB.shadow);
        text = game.data.locale.info.text4;
        drawText(a, text, this.pos.x, this.h * b + 25, game.data.widthGame - 20, this.fontA.font, this.fontA.shadow);
        b = 0.7;
        text = game.data.locale.info.title5;
        drawText(a, text, this.pos.x, this.h *
            b, game.data.widthGame - 20, this.fontB.font, this.fontB.shadow);
        text = game.data.locale.info.text5;
        drawText(a, text, this.pos.x, this.h * b + 25, game.data.widthGame - 20, this.fontA.font, this.fontA.shadow);
        b = 0.85;
        text = game.data.locale.info.title6;
        drawText(a, text, this.pos.x, this.h * b, game.data.widthGame - 20, this.fontB.font, this.fontB.shadow);
        text = game.data.locale.info.text6;
        drawText(a, text, this.pos.x, this.h * b + 25, game.data.widthGame - 20, this.fontA.font, this.fontA.shadow)
    }
});
game.NameInputScreen = me.ScreenObject.extend({
    onResetEvent: function() {
        this.w = me.video.renderer.getWidth();
        this.h = me.video.renderer.getHeight();
        var a = me.loader.getImage("gui_bg");
        this.background = new me.Sprite(this.w / 2, this.h / 2, {
            image: a
        });
        me.game.world.addChild(this.background, 1);
        me.game.world.addChild(new nameInputTitle(this.w / 2, 20), 10);
        if (PREFS.KEYBOARD_NUMBERS.value)
            if (game.data.device_portrait_orientated) var a = 6,
                b = this.h / 4,
                d = "A;B;C;D;E;F;G;H;I;J;K;L;M;N;O;P;Q;R;S;T;U;V;W;X;Y;Z; ;.;,;!;1;2;3;4;5;6;7;8;9;0;&;OK".split(";");
            else a = 8, b = this.h / 3, d = "A;B;C;D;E;F;G;H;I;J;K;L;M;N;O;P;Q;R;S;T;U;V;W;X;Y;Z; ;.;1;2;3;4;5;6;7;8;9;0;&;OK".split(";");
        else game.data.device_portrait_orientated ? (a = 5, b = this.h / 4, d = "A;B;C;D;E;F;G;H;I;J;K;L;M;N;O;P;Q;R;S;T;U;V;W;X;Y;Z; ;.;&;OK".split(";")) : (a = 8, b = this.h / 2.8, d = "A;B;C;D;E;F;G;H;I;J;K;L;M;N;O;P;Q;R;S;T;U;V;W;X;Y;Z; ;.;,;!;&;OK".split(";"));
        var e = 0,
            f = Math.ceil(d.length / a);
        this.h2 = this.h - b;
        for (var g = 0; g < f; g++)
            for (var l = 0; l < a && !(e >= d.length); l++) me.game.world.addChild(new key(this.w / a * l + 26, b +
                this.h2 / f * g, d[e]), 99), e++;
        game.data.nickname_max_lenght = 14;
        game.data.keyboard_key = "";
        document.addEventListener("keydown", keyboard, !0)
    },
    onDestroyEvent: function() {
        document.removeEventListener("keydown", keyboard, !0)
    }
});

function keyboard(a) {
    keys = {
        48: "0",
        49: "1",
        50: "2",
        51: "3",
        52: "4",
        53: "5",
        54: "6",
        55: "7",
        56: "8",
        57: "9",
        65: "A",
        66: "B",
        67: "C",
        68: "D",
        69: "E",
        70: "F",
        71: "G",
        72: "H",
        73: "I",
        74: "J",
        75: "K",
        76: "L",
        77: "M",
        78: "N",
        79: "O",
        80: "P",
        81: "Q",
        82: "R",
        83: "S",
        84: "T",
        85: "U",
        86: "V",
        87: "W",
        88: "X",
        89: "Y",
        90: "Z",
        8: "backspace",
        46: "delete",
        13: "enter"
    };
    void 0 != keys[a.keyCode] && (game.data.keyboard_key = keys[a.keyCode])
}
var nameInputTitle = me.Renderable.extend({
        init: function(a, b) {
            this._super(me.Renderable, "init", [a, b, 10, 10]);
            this.h = me.video.renderer.getHeight();
            game.data.lowres ? (this.playerNameY = 60, this.font = prepareFont(20), this.font2 = prepareFont(14)) : (this.playerNameY = this.h / 4, this.font = prepareFont(30), this.font2 = prepareFont(20))
        },
        update: function(a) {
            "" != game.data.keyboard_key && ("backspace" == game.data.keyboard_key ? (game.data.playerName = game.data.playerName.substring(0, game.data.playerName.length - 1), PREFS.AUDIOENABLED.value &&
                me.audio.play("click")) : game.data.playerName.length < game.data.nickname_max_lenght && (game.data.playerName += game.data.keyboard_key, PREFS.AUDIOENABLED.value && me.audio.play("click")), game.data.keyboard_key = "", me.video.renderer.blitSurface(), me.video.renderer.blitSurface());
            return !0
        },
        draw: function(a) {
            drawText(a, game.data.locale.input_nickname, this.pos.x, this.pos.y, 460, this.font2.font, this.font2.shadow);
            drawText(a, game.data.playerName, this.pos.x, this.playerNameY, game.data.widthGame - 20, this.font.font, this.font.shadow)
        }
    }),
    key = me.GUI_Object.extend({
        init: function(a, b, d) {
            settings = {};
            settings.image = me.loader.getImage("small_button");
            settings.spritewidth = 48;
            settings.spriteheight = 48;
            this.x = a - settings.spritewidth / 2;
            this.y = b - settings.spriteheight / 2;
            this.textx = a;
            this.texty = b;
            this.key = d;
            this.font = new me.BitmapFont("bitmap_font", 16);
            this.font.textBaseline = "middle";
            this.font.textAlign = "center";
            this._super(me.GUI_Object, "init", [a - settings.spritewidth / 2, b - settings.spriteheight / 2, settings]);
            this.submitted = !1
        },
        draw: function(a) {
            a.drawImage(this.image,
                this.x, this.y);
            this.font.draw(a, this.key, this.textx, this.texty)
        },
        onClick: function() {
            PREFS.AUDIOENABLED.value && me.audio.play("click");
            if ("&" == this.key) game.data.playerName = game.data.playerName.substring(0, game.data.playerName.length - 1);
            else if ("OK" != this.key || this.submitted) game.data.playerName.length < game.data.nickname_max_lenght && (game.data.playerName += this.key);
            else if ("" != game.data.playerName) {
                this.submitted = !0;
                var a = game.data.playerName,
                    b = game.data.score,
                    d = hex_md5(b + a + game.data.scorePw),
                    a = "playerName=" +
                    a + "&playerScore=" + b + "&magic=" + d,
                    e = makeHttpObject();
                e.open("GET", PREFS.SCORE_URL.value + "?" + a, !0);
                e.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                e.onreadystatechange = function() {
                    4 == e.readyState && 200 == e.status && (clearTimeout(f), me.state.change(me.state.SCORE))
                };
                var f = setTimeout(function() {
                    e.abort();
                    me.state.change(me.state.MENU)
                }, 5E3);
                e.send()
            }
            return !0
        }
    });

function makeHttpObject() {
    try {
        return new XMLHttpRequest
    } catch (a) {}
    try {
        return new ActiveXObject("Msxml2.XMLHTTP")
    } catch (b) {}
    try {
        return new ActiveXObject("Microsoft.XMLHTTP")
    } catch (d) {}
    throw Error("Could not create HTTP request object.");
}
var scoretable = "",
    scroll = 0;
game.ScoreScreen = me.ScreenObject.extend({
    onResetEvent: function() {
        this.w = me.video.renderer.getWidth();
        this.h = me.video.renderer.getHeight();
        var a = me.loader.getImage("gui_bg");
        this.background = new me.Sprite(this.w / 2, this.h / 2, {
            image: a
        });
        me.game.world.addChild(this.background, 1);
        me.game.world.addChild(new menu_done(this.w / 2, this.h - 40, 20), 4);
        me.game.world.addChild(new button_score_up(this.w - 26, 26), 4);
        me.game.world.addChild(new button_score_down(this.w - 26, this.h - 100), 4);
        var a = "magic=getScore&t=" + (new Date).getTime(),
            b = makeHttpObject();
        b.open("GET", PREFS.SCORE_URL.value + "?" + a, !0);
        b.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        var d = this;
        b.onreadystatechange = function() {
            4 == b.readyState && 200 == b.status && (clearTimeout(e), scoretable = JSON.parse(b.responseText), me.game.world.addChild(new scoreText(d.w / 2, 30), 10))
        };
        var e = setTimeout(function() {
            console.info(b.responseText);
            b.abort();
            me.state.change(me.state.MENU)
        }, 5E3);
        b.send()
    }
});
var scoreText = me.Renderable.extend({
        init: function(a, b) {
            this._super(me.Renderable, "init", [a, b, 10, 10]);
            this.w = me.video.renderer.getWidth();
            this.h = me.video.renderer.getHeight();
            game.data.lowres ? (this.font = prepareFont(24), this.fontB = prepareFont(18)) : (this.font = prepareFont(30), this.fontB = prepareFont(20));
            this.fontB.font.textAlign = "left";
            this.fontB.shadow.textAlign = "left";
            this.numbOfLines = parseInt((me.video.renderer.getHeight() - 120) / 25)
        },
        draw: function(a) {
            var b = game.data.locale.score.hi_score;
            drawText(a,
                b, this.pos.x, this.pos.y, this.w - 20, this.font.font, this.font.shadow);
            var d = 1.5;
            for (i = scroll; i < scroll + this.numbOfLines && i != scoretable.length; i++) b = scoretable[i].score + " : " + scoretable[i].name, drawText(a, b, 10, this.pos.y + 25 * d, this.w - 20, this.fontB.font, this.fontB.shadow), d++;
            0 == scoretable.length && (this.fontB.font.textAlign = "center", this.fontB.shadow.textAlign = "center", drawText(a, game.data.locale.score.no_score_yet, this.w / 2, this.h / 2, this.w - 20, this.fontB.font, this.fontB.shadow))
        }
    }),
    button_score_up = me.GUI_Object.extend({
        init: function(a,
            b) {
            settings = {};
            settings.image = me.loader.getImage("butt_up");
            settings.spritewidth = 48;
            settings.spriteheight = 48;
            this.x = a - settings.spritewidth / 2;
            this.y = b - settings.spriteheight / 2;
            this._super(me.GUI_Object, "init", [a - settings.spritewidth / 2, b - settings.spriteheight / 2, settings])
        },
        draw: function(a) {
            a = a.getContext();
            a.save();
            0 == scroll && (a.globalAlpha = 0.4);
            a.drawImage(this.image, this.x, this.y);
            a.restore()
        },
        onClick: function() {
            0 < scroll && (PREFS.AUDIOENABLED.value && me.audio.play("click"), scroll--);
            return !0
        }
    }),
    button_score_down =
    me.GUI_Object.extend({
        init: function(a, b) {
            settings = {};
            settings.image = me.loader.getImage("butt_down");
            settings.spritewidth = 48;
            settings.spriteheight = 48;
            this.x = a - settings.spritewidth / 2;
            this.y = b - settings.spriteheight / 2;
            this._super(me.GUI_Object, "init", [a - settings.spritewidth / 2, b - settings.spriteheight / 2, settings]);
            this.numbOfLines = parseInt((me.video.renderer.getHeight() - 120) / 25)
        },
        draw: function(a) {
            a = a.getContext();
            a.save();
            if (scoretable.length < this.numbOfLines || scroll >= scoretable.length - this.numbOfLines) a.globalAlpha =
                0.4;
            a.drawImage(this.image, this.x, this.y);
            a.restore()
        },
        onClick: function() {
            scroll < scoretable.length - this.numbOfLines && (PREFS.AUDIOENABLED.value && me.audio.play("click"), scroll++);
            return !0
        }
    }),
    menu_done = generic_big_button.extend({
        draw: function(a) {
            a.drawImage(this.image, this.x, this.y);
            drawText(a, game.data.locale.score.done, this.textx, this.texty, 460, this.font.font, this.font.shadow)
        },
        onClick: function() {
            PREFS.AUDIOENABLED.value && me.audio.play("click");
            me.state.change(me.state.MENU);
            return !0
        }
    });
game.ChooseScreen = me.ScreenObject.extend({
    onResetEvent: function() {
        this.w = me.video.renderer.getWidth();
        this.h = me.video.renderer.getHeight();
        var a = me.loader.getImage("gui_bg");
        this.background = new me.Sprite(this.w / 2, this.h / 2, {
            image: a
        });
        me.game.world.addChild(this.background, 1);
        this.background.draw(me.video.renderer);
        me.game.world.addChild(new choose_title(this.w / 2, 40), 99);
        a = me.levelDirector.levelCount();
        try {
            me.save.add({
                level: 1
            });
            var b = parseInt(me.save.level)
        } catch (d) {
            b = game.data.level
        }
        me.game.world.addChild(new button_levels_up(this.w -
            26, 70), 4);
        me.game.world.addChild(new button_levels_down(this.w - 26, this.h - 100), 4);
        me.game.world.addChild(new menu_back(this.w / 2, this.h - 40, 20), 4);
        game.data.lowres ? (game.data.spazioTop = 95, game.data.spazioBottom = 75) : (game.data.spazioTop = 140, game.data.spazioBottom = 100);
        game.data.spaziov = me.video.renderer.getHeight() - (game.data.spazioTop + game.data.spazioBottom + 48);
        game.data.maxPerPage = 4;
        game.data.scroll = 0;
        game.data.spacing = parseInt(game.data.spaziov / (game.data.maxPerPage - 1));
        var e = game.data.lowres ? 4 : navigator.isCocoonJS ?
            5 : 4,
            f = Math.ceil(a / e);
        game.data.row = f;
        for (var g = 1, l = 0; l < f; l++)
            for (var h = 1; h <= e && !(g <= b ? me.game.world.addChild(new button_level(-20 + this.w / (e + 1) * h, game.data.spazioTop + game.data.spacing * l, g, !1), 99) : me.game.world.addChild(new button_level(-20 + this.w / (e + 1) * h, game.data.spazioTop + game.data.spacing * l, g, !0), 99), g++, g > a); h++);
    }
});
var button_level = me.GUI_Object.extend({
        init: function(a, b, d, e) {
            settings = {};
            settings.image = me.loader.getImage("small_button");
            this.imageLocked = me.loader.getImage("level_button_lock");
            settings.spritewidth = 48;
            settings.spriteheight = 48;
            this.spritewidth = settings.spritewidth;
            this.spriteheight = settings.spriteheight;
            this.x = a - settings.spritewidth / 2;
            this.y = b - settings.spriteheight / 2;
            this.textx = a;
            this.texty = b;
            this.level = d;
            this.locked = e;
            this.texty = b + 2;
            this.font = prepareFont(26, "white");
            this._super(me.GUI_Object,
                "init", [a - settings.spritewidth / 2, b - settings.spriteheight / 2, settings])
        },
        draw: function(a) {
            a.getContext();
            this.pos.y = this.y + game.data.scroll * game.data.spacing;
            this.y + game.data.scroll * game.data.spacing >= game.data.spazioTop - this.spriteheight / 2 && this.y + game.data.scroll * game.data.spacing <= me.video.renderer.getHeight() - game.data.spazioBottom && (a.drawImage(this.image, this.x, this.y + game.data.scroll * game.data.spacing), drawText(a, this.level.toString(), this.textx, this.texty + game.data.scroll * game.data.spacing,
                200, this.font.font, this.font.shadow), this.locked && a.drawImage(this.imageLocked, this.x, this.y + game.data.scroll * game.data.spacing))
        },
        onClick: function() {
            this.locked || (PREFS.AUDIOENABLED.value && me.audio.play("click"), PREFS.AUDIOENABLED.value && me.audio.stopTrack("menu"), game.data.level = this.level, me.state.change(me.state.PLAY));
            return !0
        }
    }),
    choose_title = me.Renderable.extend({
        init: function(a, b) {
            this.x = a;
            this.y = b;
            this.font = game.data.lowres ? prepareFont(20) : prepareFont(30);
            this.font.textBaseline = "middle";
            this.font.textAlign =
                "center";
            this._super(me.Renderable, "init", [this.x, this.y, 10, 10])
        },
        draw: function(a) {
            text = game.data.locale.choose_level;
            drawText(a, text, this.x, this.y, 460, this.font.font, this.font.shadow)
        }
    }),
    button_levels_up = me.GUI_Object.extend({
        init: function(a, b) {
            settings = {};
            settings.image = me.loader.getImage("butt_up");
            settings.spritewidth = 48;
            settings.spriteheight = 48;
            this.x = a - settings.spritewidth / 2;
            this.y = b - settings.spriteheight / 2;
            this._super(me.GUI_Object, "init", [a - settings.spritewidth / 2, b - settings.spriteheight / 2,
                settings
            ])
        },
        draw: function(a) {
            a.save();
            0 == +game.data.scroll && a.setGlobalAlpha(0.4);
            a.drawImage(this.image, this.x, this.y);
            a.restore()
        },
        onClick: function() {
            0 > game.data.scroll && (PREFS.AUDIOENABLED.value && me.audio.play("click"), game.data.scroll += 1);
            return !0
        }
    }),
    button_levels_down = me.GUI_Object.extend({
        init: function(a, b) {
            settings = {};
            settings.image = me.loader.getImage("butt_down");
            settings.spritewidth = 48;
            settings.spriteheight = 48;
            this.spritewidth = settings.spritewidth;
            this.spriteheight = settings.spriteheight;
            this.x = a - settings.spritewidth / 2;
            this.y = b - settings.spriteheight / 2;
            this._super(me.GUI_Object, "init", [a - settings.spritewidth / 2, b - settings.spriteheight / 2, settings]);
            this.numbOfLines = parseInt((me.video.renderer.getHeight() - 90) / 20)
        },
        draw: function(a) {
            a.save();
            game.data.spazioTop + (game.data.row + game.data.scroll - 1) * game.data.spacing + this.spriteheight / 2 <= me.video.renderer.getHeight() - game.data.spazioBottom && a.setGlobalAlpha(0.4);
            a.drawImage(this.image, this.x, this.y);
            a.restore()
        },
        onClick: function() {
            game.data.spazioTop +
                (game.data.row + game.data.scroll - 1) * game.data.spacing + this.spriteheight / 2 <= me.video.renderer.getHeight() - game.data.spazioBottom || (PREFS.AUDIOENABLED.value && me.audio.play("click"), game.data.scroll -= 1);
            return !0
        }
    }),
    menu_back = generic_big_button.extend({
        draw: function(a) {
            a.drawImage(this.image, this.x, this.y);
            text = game.data.locale.back;
            drawText(a, text, this.textx, this.texty, 200, this.font.font, this.font.shadow)
        },
        onClick: function() {
            me.state.change(me.state.MENU);
            me.audio.play("click");
            return !0
        }
    });

function line(a, b, d) {
    a.beginPath();
    a.moveTo(0, b);
    a.lineTo(480, b);
    a.strokeStyle = d;
    a.stroke()
}
game.GameOverScreen = me.ScreenObject.extend({
    onResetEvent: function() {
        this.w = me.video.renderer.getWidth();
        this.h = me.video.renderer.getHeight();
        this.overlay = new me.ColorLayer("overlay", new me.Color(0, 0, 0, 0.3), 1);
        me.game.world.addChild(this.overlay);
        me.game.world.addChild(new(me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, "init", [0, 0, 10, 10]);
                this.font = prepareFont(30);
                this.font2 = prepareFont(20);
                this.upd = !0
            },
            update: function(a) {
                return this.upd ? (this.upd = !1, !0) : !1
            },
            draw: function(a) {
                var d =
                    game.data.locale.game_over;
                drawText(a, d, me.game.viewport.width / 2, me.game.viewport.height / 4, game.data.widthGame, this.font.font, this.font.shadow);
                d = game.data.locale.final_score;
                drawText(a, d, me.game.viewport.width / 2, me.game.viewport.height / 2.5, game.data.widthGame, this.font2.font, this.font2.shadow);
                drawText(a, game.data.score.toString(), me.game.viewport.width / 2, me.game.viewport.height / 2.5 + 40, game.data.widthGame, this.font.font, this.font.shadow)
            }
        })), 20);
        var a = 120;
        PREFS.SUBMIT_SCORE_BUTTON.value && (me.game.world.addChild(new butt_submit_score(0.5 *
            this.w, this.h - a, 20), 40), a += 60);
        me.game.world.addChild(new butt_main_menu(0.5 * this.w, this.h - 40, 20), 40)
    }
});
var butt_main_menu = generic_big_button.extend({
        draw: function(a) {
            a.drawImage(this.image, this.x, this.y);
            text = game.data.locale.main_menu;
            drawText(a, text, this.textx, this.texty, 200, this.font.font, this.font.shadow)
        },
        onClick: function() {
            me.state.change(me.state.MENU);
            PREFS.AUDIOENABLED.value && me.audio.play("click");
            return !0
        }
    }),
    butt_submit_score = generic_big_button.extend({
        draw: function(a) {
            a.drawImage(this.image, this.x, this.y);
            text = game.data.locale.submit_score;
            drawText(a, text, this.textx, this.texty, 200, this.font.font,
                this.font.shadow)
        },
        onClick: function() {
            me.state.change(me.state.USER + 4);
            PREFS.AUDIOENABLED.value && me.audio.play("click");
            return !0
        }
    });
game.YouDidItScreen = me.ScreenObject.extend({
    onResetEvent: function() {
        this.w = me.game.viewport.width;
        this.h = me.game.viewport.height;
        var a = this;
        navigator.isCocoonJS && ads.interstitialAlreadyDownloaded && (Cocoon.Ad.showInterstitial(), console.info("mostra fullscreen"));
        this.overlay = new me.ColorLayer("overlay", new me.Color(0, 0, 0, 0.3), 0);
        me.game.world.addChild(this.overlay, -999);
        me.game.world.addChild(new menu_home(this.w / 2 - 70, this.h / 2 - 20), 40);
        me.game.world.addChild(new menu_restart(this.w / 2, this.h / 2 - 20), 40);
        me.game.world.addChild(new menu_continue(this.w / 2 + 70, this.h / 2 - 20), 40);
        this.youdidit = new(me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, "init", [0, 0, 100, 100]);
                this.font = prepareFont(30);
                this.upd = !0
            },
            update: function(a) {
                if (0 != game.gamepad.axes[1] || 0 != game.gamepad.axes[0]) {
                    PREFS.AUDIOENABLED.value && me.audio.play("click");
                    game.data.level++;
                    try {
                        game.data.level > me.save.level && (me.save.level = game.data.level)
                    } catch (d) {
                        console.info("Error on local storage: " + d.message + "\n\n")
                    }!navigator.isCocoonJS &&
                        PREFS.ADS_ON_NEW_LEVEL.value ? me.state.change(me.state.USER + 6) : me.state.change(me.state.PLAY)
                }
                return this.upd ? (this.upd = !1, !0) : !1
            },
            draw: function(b) {
                drawText(b, game.data.locale.you_did_it, a.w / 2, a.h / 2 - 100, 460, this.font.font, this.font.shadow)
            }
        }));
        me.game.world.addChild(this.youdidit, 999);
        this.youdidit.pos.z = 999;
        this.youdidit.draw(me.video.renderer)
    }
});
var menu_home = me.GUI_Object.extend({
        init: function(a, b, d) {
            d = {};
            this.image = me.loader.getImage("home_button");
            d.image = this.image;
            d.framewidth = this.image.width;
            d.frameheight = this.image.height;
            this.x = a - d.framewidth / 2;
            this.y = b - d.frameheight / 2;
            this._super(me.GUI_Object, "init", [a - d.framewidth / 2, b - d.frameheight / 2, d]);
            this.pos.z = 4
        },
        draw: function(a) {
            a.drawImage(this.image, this.x, this.y)
        },
        onClick: function() {
            PREFS.AUDIOENABLED.value && me.audio.play("click");
            me.state.change(me.state.MENU);
            return !0
        }
    }),
    menu_restart =
    me.GUI_Object.extend({
        init: function(a, b, d) {
            d = {};
            this.image = me.loader.getImage("restart_button");
            d.image = this.image;
            d.framewidth = this.image.width;
            d.frameheight = this.image.height;
            this.x = a - d.framewidth / 2;
            this.y = b - d.frameheight / 2;
            this._super(me.GUI_Object, "init", [a - d.framewidth / 2, b - d.frameheight / 2, d]);
            this.pos.z = 4
        },
        draw: function(a) {
            a.drawImage(this.image, this.x, this.y)
        },
        onClick: function() {
            PREFS.AUDIOENABLED.value && me.audio.play("click");
            navigator.isCocoonJS ? me.state.change(me.state.PLAY) : me.state.change(me.state.USER +
                6);
            return !0
        }
    }),
    menu_continue = me.GUI_Object.extend({
        init: function(a, b, d) {
            d = {};
            this.image = me.loader.getImage("continue_button");
            d.image = this.image;
            d.framewidth = this.image.width;
            d.frameheight = this.image.height;
            this.x = a - d.framewidth / 2;
            this.y = b - d.frameheight / 2;
            this._super(me.GUI_Object, "init", [a - d.framewidth / 2, b - d.frameheight / 2, d]);
            this.pos.z = 4
        },
        draw: function(a) {
            a.drawImage(this.image, this.x, this.y)
        },
        onClick: function() {
            PREFS.AUDIOENABLED.value && me.audio.play("click");
            game.data.level++;
            try {
                game.data.level >
                    me.save.level && (me.save.level = game.data.level)
            } catch (a) {
                console.info("Error on local storage: " + a.message + "\n\n")
            }!navigator.isCocoonJS && PREFS.ADS_ON_NEW_LEVEL.value ? me.state.change(me.state.USER + 6) : me.state.change(me.state.PLAY);
            return !0
        }
    });
game.FullAdScreen = me.ScreenObject.extend({
    onResetEvent: function() {
        this.w = me.game.viewport.width;
        this.h = me.game.viewport.height;
        var a = me.video.renderer.getHeight() / window.innerHeight,
            b = me.video.renderer.getWidth() / window.innerWidth,
            a = a < b ? b : a,
            b = (window.innerHeight - me.video.renderer.getHeight() / a) / 2,
            d = document.createElement("div");
        d.innerHTML = me.device.isMobile ? '<iframe src="' + PREFS.BETWEEN_LEVELS_ADS_MOBILE.value + '" width="100%" height="100%" frameborder="0" ></iframe>' : '<iframe src="' + PREFS.BETWEEN_LEVELS_ADS_DESKTOP.value +
            '" width="100%" height="100%" frameborder="0" ></iframe>';
        d.style.position = "absolute";
        d.style.zIndex = "999";
        d.style.top = b + 30 / a + "px";
        d.style.margin = "0";
        d.style.padding = "0";
        d.style.width = window.innerWidth + "px";
        d.style.height = window.innerHeight + "px";
        d.style.background = "white";
        d.id = "fullads";
        document.body.appendChild(d);
        me.game.world.addChild(new x_button(this.w - 15, 15), 40)
    },
    onDestroyEvent: function() {
        var a = document.getElementById("fullads");
        document.body.removeChild(a)
    }
});
var x_button = me.GUI_Object.extend({
    init: function(a, b) {
        settings = {};
        settings.image = me.loader.getImage("butt_x");
        settings.framewidth = settings.image.width;
        settings.frameheight = settings.image.height;
        this.x = a;
        this.y = b;
        settings.width = settings.spritewidth;
        settings.height = settings.spriteheight;
        this._super(me.GUI_Object, "init", [a - settings.spritewidth / 2, b - settings.spriteheight / 2, settings]);
        me.sys.pauseOnBlur = !1
    },
    onClick: function() {
        setTimeout(function() {
            me.state.change(me.state.PLAY);
            me.sys.pauseOnBlur = !0
        }, 300);
        return !0
    }
});
game.PlayScreen = me.ScreenObject.extend({
    onResetEvent: function() {
        game.data.radarEntities.length = 0;
        delete game.data.collisionArray;
        game.data.dotCounter = 0;
        game.data.teleportCounter = 0;
        delete game.data.teleportArray;
        delete game.data.teleportList;
        me.sys.fps = PREFS.MAX_FPS.value;
        game.data.level > me.levelDirector.levelCount() && (game.data.level = 1, game.data.levelNumberShift++);
        me.levelDirector.loadLevel("level" + game.data.level.toString());
        this.HUD = new game.HUD.Container;
        me.game.world.addChild(this.HUD);
        game.data.Path_Layer.alpha =
            0;
        if (PREFS.IN_GAME_ADS.value)
            if (navigator.isCocoonJS) Cocoon.Ad.showBanner();
            else {
                var a = document.getElementById("ads");
                a.style.zIndex = "999";
                a.style.display = "block"
            }
        game.data.Dots_Layer = getLayerByName("dots");
        if (null != game.data.Dots_Layer)
            for (var a = game.data.Path_Layer.cols, b = game.data.Path_Layer.rows, d = 0; d < a; d++)
                for (var e = 0; e < b; e++) null != game.data.Dots_Layer.getTileId(d * game.data.tilewidth + game.data.tilewidth / 2, e * game.data.tileheight + game.data.tileheight / 2) && (game.data.dotCounter += 1)
    },
    onDestroyEvent: function() {
        me.sys.fps =
            60;
        me.game.world.hasChild(this.HUD) && me.game.world.removeChild(this.HUD);
        if (PREFS.IN_GAME_ADS.value)
            if (navigator.isCocoonJS) Cocoon.Ad.hideBanner();
            else {
                var a = document.getElementById("ads");
                a.style.zIndex = "-999";
                a.style.display = "none"
            }
    }
});
game.Restart = me.ScreenObject.extend({
    onResetEvent: function() {
        me.state.change(me.state.PLAY)
    }
});

function resetGame() {
    game.data.PLAYER_OBJECT = 1;
    game.data.ENEMY_OBJECT = 2;
    game.data.score = 0;
    game.data.lives = 2;
    game.data.text = "";
    game.data.title = "";
    game.data.level = 1;
    game.data.running = !0;
    game.data.levelNumberShift = 0;
    game.data.playerName = "";
    game.data.radarEntities = []
};