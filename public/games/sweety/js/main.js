function CSpriteLibrary() {
    var g,
    h,
    b,
    a,
    c,
    e;
    this.init=function(f, d, n) {
        b=h=0;
        a=f;
        c=d;
        e=n;
        g= {}
    }
    ;
    this.addSprite=function(a, b) {
        g.hasOwnProperty(a)||(g[a]= {
            szPath: b, oSprite: new Image
        }
        , h++)
    }
    ;
    this.getSprite=function(a) {
        return g.hasOwnProperty(a)?g[a].oSprite: null
    }
    ;
    this.getSpritePath=function(a) {
        return g.hasOwnProperty(a)?g[a].szPath: null
    }
    ;
    this._onSpritesLoaded=function() {
        c.call(e)
    }
    ;
    this._onSpriteLoaded=function() {
        a.call(e);
        ++b===h&&this._onSpritesLoaded()
    }
    ;
    this.loadSprites=function() {
        for(var a in g)g[a].oSprite.oSpriteLibrary=this,
        g[a].oSprite.onload=function() {
            this.oSpriteLibrary._onSpriteLoaded()
        }
        ,
        g[a].oSprite.src=g[a].szPath
    }
    ;
    this.getNumSprites=function() {
        return h
    }
}

function CWinPanel(g) {
    var h;
    this.init=function(b) {
        h=b;
        var a;
        a="<div id='win_title' class='text_class'></div> <div id='win_final_score' class='text_class'></div> ";
        a+="<div id='win_but_exit' class='button_class panel_button'>"+TEXT_EXIT+"</div> ";
        a+="<div id='win_but_shuffle' class='button_class panel_button'>"+TEXT_SHUFFLE+"</div> ";
        $("#"+b).html(a);
        !1===s_bMobile&&($("#win_but_shuffle").on("mouseover", function(a) {
            $(this).css("color", "#FFCC00")
        }
        ), $("#win_but_shuffle").on("mouseout", function(a) {
            $(this).css("color", "#b7e0e5")
        }
        ), $("#win_but_exit").on("mouseover", function(a) {
            $(this).css("color", "#FFCC00")
        }
        ), $("#win_but_exit").on("mouseout", function(a) {
            $(this).css("color", "#b7e0e5")
        }
        ));
        $("#win_but_shuffle").on("mouseup", this, function(a) {
            a.data._onShuffle()
        }
        );
        $("#win_but_exit").on("mouseup", this, function(a) {
            a.data._onExit()
        }
        )
    }
    ;
    this.unload=function() {
        $("#win_but_shuffle").off("mouseup", this, function(b) {
            b.data._onShuffle()
        }
        );
        $("#win_but_exit").off("mouseup", this, function(b) {
            b.data._onExit()
        }
        );
        !1===s_bMobile&&($("#win_but_shuffle").off("mouseover", function(b) {
            $(this).css("color", "#FFCC00")
        }
        ), $("#win_but_shuffle").off("mouseout", function(b) {
            $(this).css("color", "#b7e0e5")
        }
        ), $("#win_but_exit").off("mouseover", function(b) {
            $(this).css("color", "#FFCC00")
        }
        ), $("#win_but_exit").off("mouseout", function(b) {
            $(this).css("color", "#b7e0e5")
        }
        ))
    }
    ;
    this.show=function(b) {
        $("#win_title").text(TEXT_CONGRATULATIONS);
        $("#win_final_score").text(TEXT_FINAL_SCORE+"\n"+b);
        $("#"+h).css("display", "block");
        $("#"+h).animate( {
            top: "+=400px"
        }
        , 500, "easein")
    }
    ;
    this.refreshLanguage=function() {
        $("#win_but_exit").text(TEXT_EXIT);
        $("#win_but_shuffle").text(TEXT_SHUFFLE)
    }
    ;
    this._onShuffle=function() {
        $("#"+h).css("display", "none");
        $("#"+h).css("top", "-=400");
        s_oGame.onShuffleBoard()
    }
    ;
    this._onExit=function() {
        $("#"+h).css("display", "none");
        $("#"+h).css("top", "-=400");
        s_oApp.gotoMenu()
    }
    ;
    this.init(g);
    return this
}

var s_iMultiplier;
(function(g) {
    (jQuery.browser=jQuery.browser|| {}
    ).mobile=/android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(g)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s)|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v)|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v)|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-|)|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(g.substr(0, 4))
}

)(navigator.userAgent||navigator.vendor||window.opera);
$(window).resize(function() {
    sizeHandler()
}

);
function trace(g) {
    console.log(g)
}

$(window).ready(function() {
    sizeHandler()
}

);
window.addEventListener("orientationchange", onOrientationChange);
function onOrientationChange() {
    window.matchMedia("(orientation: portrait)").matches&&sizeHandler();
    window.matchMedia("(orientation: landscape)").matches&&(sizeHandler(), alert("Please rotate the device"))
}

function sizeHandler() {
    window.scrollTo(0, 1);
    var g=window.innerWidth;
    s_iMultiplier=Math.min(window.innerHeight/600, g/800);
    var h=800*s_iMultiplier,
    b=600*s_iMultiplier;
    $("#main_game_container").css("transform-origin", "0% 0%");
    $("#main_game_container").css("transform", "scale("+h/800+","+b/600+")");
    $("#main_game_container").css("left", g/2-h/2+"px")
}

function randomFloatBetween(g, h, b) {
    "undefined"===typeof b&&(b=2);
    return parseFloat(Math.min(g+Math.random()*(h-g), h).toFixed(b))
}

function shuffle(g) {
    for(var h=g.length, b, a;
    0!==h;
    )a=Math.floor(Math.random()*h),
    h-=1,
    b=g[h],
    g[h]=g[a],
    g[a]=b;
    return g
}

function handleBrandingClick() {
    window.open("http://www.codethislab.com")
}

function NoClickDelay(g) {
    this.element=g;
    window.Touch&&this.element.addEventListener("touchstart", this, !1)
}

NoClickDelay.prototype= {
    handleEvent:function(g) {
        switch(g.type) {
            case "touchstart": this.onTouchStart(g);
            break;
            case "touchmove": this.onTouchMove(g);
            break;
            case "touchend": this.onTouchEnd(g)
        }
    }
    ,
    onTouchStart:function(g) {
        g.preventDefault();
        this.moved=!1;
        this.element.addEventListener("touchmove", this, !1);
        this.element.addEventListener("touchend", this, !1)
    }
    ,
    onTouchMove:function(g) {
        this.moved=!0
    }
    ,
    onTouchEnd:function(g) {
        this.element.removeEventListener("touchmove", this, !1);
        this.element.removeEventListener("touchend", this, !1);
        if(!this.moved) {
            g=document.elementFromPoint(g.changedTouches[0].clientX, g.changedTouches[0].clientY);
            3===g.nodeType&&(g=g.parentNode);
            var h=document.createEvent("MouseEvents");
            h.initEvent("click", !0, !0);
            g.dispatchEvent(h)
        }
    }
}

;
function CTile(g, h, b, a, c, e, f, d) {
    var n,
    s,
    p,
    m,
    k,
    r,
    l,
    q,
    x,
    u,
    v,
    t,
    w;
    this.setInfo=function(a, b, c, e, d, f, g, h) {
        k=a;
        r=b;
        l=c;
        x=h;
        this._initBlocksArray(e, d, f, g);
        this.assignLabel();
        this._checkIfTileIsFree()
    }
    ;
    this._initBlocksArray=function(a, b, c, e) {
        u=[];
        v=[];
        t=[];
        w=[];
        var d;
        for(d=0;
        d<a.length;
        d++)u.push(a[d]);
        for(d=0;
        d<b.length;
        d++)v.push(b[d]);
        for(d=0;
        d<c.length;
        d++)t.push(c[d]);
        for(d=0;
        d<e.length;
        d++)w.push(e[d])
    }
    ;
    this.init=function(a) {
        var b=s_oSpriteLibrary.getSpritePath(l);
        $("<img/>").attr("src", b).load(function() {
            $(this).remove();
            $("#tile_"+k).css("background-image", "url("+b+")")
        }
        );
        $("#tile_"+k).css("top", a.y+1.5*r.y);
        $("#tile_"+k).css("left", a.x+1.5*r.x);
        !1===s_bMobile&&($("#tile_"+g).on("mouseenter", this, function(a) {
            a.data._onTileOver()
        }
        ), $("#tile_"+g).on("mouseleave", this, function(a) {
            a.data._onTileOut()
        }
        ));
        $("#tile_"+g).on("mouseup", this, function(a) {
            a.data._onTileSelected()
        }
        );
        p=!1;
        n=!0;
        m=!1
    }
    ;
    this.unload=function() {
        !1===s_bMobile&&($("#tile_"+g).off("mouseenter", this, function(a) {
            a.data._onTileOver()
        }
        ), $("#tile_"+g).off("mouseleave", this, function(a) {
            a.data._onTileOut()
        }
        ));
        $("#tile_"+g).off("mouseup", this, function(a) {
            a.data._onTileSelected()
        }
        )
    }
    ;
    this.assignLabel=function() {
        q=-1!==l.indexOf("season")?"season": -1!==l.indexOf("flower")?"flower": l
    }
    ;
    this.deselect=function() {
        $("#selection_"+k).css("display", "none");
        m=p=!1;
        $("#tile_"+k).stop();
        $("#tile_"+k).css("opacity", "1")
    }
    ;
    this.activate=function(a, b, c, d, e) {
        $("#selection_"+k).css("display", "none");
        p=!1;
        n=!0;
        this._initBlocksArray(b, c, d, a);
        this._checkIfTileIsFree();
        if(""!==e) {
            l=e;
            this.assignLabel();
            var f=s_oSpriteLibrary.getSpritePath(l);
            $("<img/>").attr("src", f).load(function() {
                $(this).remove();
                $("#tile_"+k).css("background-image", "url("+f+")")
            }
            )
        }
        $("#tile_"+k).css("transform", "scale(1,1)");
        $("#tile_"+k).css("-ms-transform", "scale(1,1)");
        $("#tile_"+k).css("-webkit-transform", "scale(1,1)");
        $("#tile_"+k).css("display", "block")
    }
    ;
    this.disable=function() {
        m&&(m=!1, $("#tile_"+k).stop(!0, !0).fadeIn(1, function() {}
        ));
        $("#selection_"+k).css("display", "none");
        p=!1;
        $("#tile_"+k).css("display", "none");
        n=!1;
        if(null===s_oGame)s_oHelp.onTileRemoved(w);
        else s_oGame.onTileRemoved(w)
    }
    ;
    this.remove=function() {
        var a=this;
        m&&(m=!1, $("#tile_"+k).stop(!0, !0).fadeIn(1, function() {}
        ));
        $("#tile_"+k).transition( {
            scale: 0.1, duration: 300
        }
        , function() {
            a.disable()
        }
        )
    }
    ;
    this.showHint=function() {
        var a=this;
        $("#tile_"+k).fadeOut(500, function() {
            $("#tile_"+k).fadeIn(500, function() {
                a.showHint()
            }
            )
        }
        );
        m=!0
    }
    ;
    this.decreaseBlockCounter=function(a) {}
    ;
    this._checkIfTileIsFree=function() {
        s=!1;
        0===u.length&&0===t.length?s=!0: 0===v.length&& 0===t.length&&(s=!0)
    }
    ;
    this.removeBlock=function(a) {
        var b;
        for(b=0;
        b<v.length;
        b++)if(v[b]===a) {
            v.splice(b, 1);
            this._checkIfTileIsFree();
            return
        }
        for(b=0;
        b<u.length;
        b++)if(u[b]===a) {
            u.splice(b, 1);
            this._checkIfTileIsFree();
            return
        }
        for(b=0;
        b<t.length;
        b++)if(t[b]===a) {
            t.splice(b, 1);
            this._checkIfTileIsFree();
            break
        }
    }
    ;
    this._onTileSelected=function() {
        if(m)null===s_oGame?s_oHelp.removeHint(): s_oGame.removeHint();
        else if(this.isSelectable())if(p)if(this.deselect(), null===s_oGame)s_oHelp.onTileDeselected();
        else s_oGame.onTileDeselected();
        else if(p=!0, $("#selection_"+k).css("display", "block"), null===s_oGame)s_oHelp.onTileSelected(k);
        else s_oGame.onTileSelected(k)
    }
    ;
    this._onTileOver=function() {
        this.isSelectable()&&$("#selection_"+k).css("display", "block")
    }
    ;
    this._onTileOut=function() {
        !1===p&&$("#selection_"+k).css("display", "none")
    }
    ;
    this.getValue=function() {
        return q
    }
    ;
    this.getIndex=function() {
        return k
    }
    ;
    this.getPos=function() {
        return r
    }
    ;
    this.isSelectable=function() {
        return s&&n?!0: !1
    }
    ;
    this.getBlockList=function() {
        return w
    }
    ;
    this.getHeight=function() {
        return x
    }
    ;
    this.setInfo(g, h, b, a, c, e, f, d);
    return this
}

var FPS_TIME=1E3/24,
BONUS_TIME=12E3,
HINT_PENALTY=10,
LANGUAGE="en_UK",
SCORE_BONUS_LAYOUT_EASY=1,
SCORE_BONUS_LAYOUT_MEDIUM=2,
SCORE_BONUS_LAYOUT_HARD=3,
MSG_BOX_MODE_OK=1,
MSG_BOX_MODE_YES_NO=2,
ON_MSGBOX_EXIT_FROM_GAME="ON_MSGBOX_EXIT_FROM_GAME",
ON_MSGBOX_NOT_EXIT_FROM_GAME="ON_MSGBOX_NOT_EXIT_FROM_GAME";
function CMsgBox() {
    var g,
    h,
    b;
    this.init=function() {
        !1===s_bMobile&&($("#msg_box_button1").on("mouseover", function(a) {
            $(this).css("color", "#FFCC00")
        }
        ), $("#msg_box_button1").on("mouseout", function(a) {
            $(this).css("color", "#b7e0e5")
        }
        ), $("#msg_box_button2").on("mouseover", function(a) {
            $(this).css("color", "#FFCC00")
        }
        ), $("#msg_box_button2").on("mouseout", function(a) {
            $(this).css("color", "#b7e0e5")
        }
        ), $("#msg_box_button3").on("mouseover", function(a) {
            $(this).css("color", "#FFCC00")
        }
        ), $("#msg_box_button3").on("mouseout", function(a) {
            $(this).css("color", "#b7e0e5")
        }
        ));
        $("#msg_box_button1").on("mouseup", this, function(a) {
            a.data._onReleaseBut1()
        }
        );
        $("#msg_box_button2").on("mouseup", this, function(a) {
            a.data._onReleaseBut2()
        }
        );
        $("#msg_box_button3").on("mouseup", this, function(a) {
            a.data._onReleaseBut3()
        }
        )
    }
    ;
    this.setTextButton=function(a, b) {
        switch(a) {
            case 1: $("#msg_box_button1").text(b);
            break;
            case 2: $("#msg_box_button2").text(b);
            break;
            case 3: $("#msg_box_button3").text(b)
        }
    }
    ;
    this.showMessageBox=function(a, c, e, f, d, n) {
        $("#msg_box_title").text(a);
        $("#msg_box_text").text(c);
        g=f;
        h=d;
        b=n;
        switch(e) {
            case MSG_BOX_MODE_OK: $("#msg_box_button1").css("display", "none");
            $("#msg_box_button2").css("display", "block");
            $("#msg_box_button3").css("display", "none");
            $("#msg_box").css("display", "block");
            break;
            case MSG_BOX_MODE_YES_NO: $("#msg_box_button1").css("display", "block");
            $("#msg_box_button2").css("display", "none");
            $("#msg_box_button3").css("display", "block");
            $("#msg_box").css("display", "block");
            break;
            default: alert("CMessageBox: modalit\u00e0 settata no prevista #"+ e)
        }
    }
    ;
    this.hide=function() {
        $("#msg_box").css("display", "none")
    }
    ;
    this._onReleaseBut1=function() {
        s_oApp.onClickMessageBox(g)
    }
    ;
    this._onReleaseBut2=function() {
        s_oApp.onClickMessageBox(h)
    }
    ;
    this._onReleaseBut3=function() {
        s_oApp.onClickMessageBox(b)
    }
    ;
    this.init();
    return this
}

function CMenuLayout() {
    var g,
    h=[],
    b=[];
    this.initMenuLayout=function() {
        var a;
        a=""+("<div id='text_choose_layout' class='game_text text_class' style=\"position:absolute;top:300px;text-align:center;width:800px;font-size:50px\">"+TEXT_CHOOSE_LAYOUT+"</div>");
        a+="<div id='mahjong_layout_0' class='mahjong_layout' style=\"background-image:url("+s_oSpriteLibrary.getSpritePath("layout_bg")+')"></div>';
        a+="<div id='mahjong_layout_1' class='mahjong_layout' style=\"background-image:url("+s_oSpriteLibrary.getSpritePath("layout_bg")+ ')"></div>';
        a+="<div id='mahjong_layout_2' class='mahjong_layout' style=\"background-image:url("+s_oSpriteLibrary.getSpritePath("layout_bg")+')"></div>';
        a+="<div id='arrow_button_left' class='arrow_button' style=\"background-image:url("+s_oSpriteLibrary.getSpritePath("arrow_left")+')"></div>';
        a+="<div id='arrow_button_right' class='arrow_button' style=\"background-image:url("+s_oSpriteLibrary.getSpritePath("arrow_right")+')"></div>';
        $("#menu_layout").html(a);
        g=0;
        this.showLayout();
        $("#arrow_button_left").on("mouseup", this, function(a) {
            a.data._onArrowLeft()
        }
        );
        $("#arrow_button_right").on("mouseup", this, function(a) {
            a.data._onArrowRight()
        }
        );
        $("#menu_layout").css("background-image", "url("+s_oSpriteLibrary.getSpritePath("menu_bg")+")");
        $("#menu_layout").css("display", "block")
    }
    ;
    this.unload=function() {
        $("#arrow_button_left").off("mouseup", this, function(a) {
            a.data._onArrowLeft()
        }
        );
        $("#arrow_button_right").off("mouseup", this, function(a) {
            a.data._onArrowRight()
        }
        )
    }
    ;
    this.showLayout=function() {
        for(var a=0, c=g;
        c<g+3;
        c++)$("#mahjong_layout_"+ a).off("mouseup"),
        h.push(new CLayoutButton("mahjong_layout_"+a, b[c].name, window["TEXT_LAYOUT_"+b[c].name.toUpperCase()], window["TEXT_DIFF_"+b[c].diff], b[c].locked)),
        $("#mahjong_layout_"+a).on("mouseup", {
            parent: this, layout: b[c].name
        }
        , function(a) {
            a.data.parent._onLayoutSelected(a.data.layout)
        }
        ),
        a++
    }
    ;
    this.refreshLanguage=function() {
        for(var a=0, c=g;
        c<g+3;
        c++) {
            var e=""+b[c].diff;
            h[a].refreshLanguage(window["TEXT_LAYOUT_"+b[c].name.toUpperCase()], window["TEXT_DIFF_"+e.toUpperCase()]);
            a++
        }
        $("#text_choose_layout").text(TEXT_CHOOSE_LAYOUT)
    }
    ;
    this._onArrowLeft=function() {
        g-=3;
        0>g&&(g=0);
        this.showLayout()
    }
    ;
    this._onArrowRight=function() {
        g+=3;
        g+3>=b.length&&(g=b.length-3);
        this.showLayout()
    }
    ;
    this._onLayoutSelected=function(a) {
        s_szLayoutSelected=a;
        this.unload();
        s_oApp.gotoGame()
    }
    ;
    b.push( {
        name: "classic", diff: 1, locked: !1
    }
    );
    b.push( {
        name: "monument", diff: 0, locked: !1
    }
    );
    b.push( {
        name: "pyramids", diff: 2, locked: !1
    }
    );
    b.push( {
        name: "arena", diff: 0, locked: !1
    }
    );
    b.push( {
        name: "four", diff: 1, locked: !1
    }
    );
    b.push( {
        name: "the_wall", diff: 1, locked: !1
    }
    );
    this.initMenuLayout()
}

var s_szLayoutSelected;
function CMenu() {
    this.initMenu=function() {
        var g;
        g=""+("<div id='button_menu_play' class='menu_button button_class' >"+TEXT_PLAY+"</div>");
        g+="<div id='button_menu_help' class='menu_button button_class' >"+TEXT_HELP+"</div>";
        $("#menu_container").html(g);
        !1===s_bMobile&&($("#button_menu_play").on("mouseover", function(g) {
            $(this).css("color", "#FFCC00")
        }
        ), $("#button_menu_play").on("mouseout", function(g) {
            $(this).css("color", "#b7e0e5")
        }
        ), $("#button_menu_help").on("mouseover", function(g) {
            $(this).css("color", "#FFCC00")
        }
        ), $("#button_menu_help").on("mouseout", function(g) {
            $(this).css("color", "#b7e0e5")
        }
        ));
        $("#button_menu_play").on("mouseup", this, function(g) {
            g.data._onPlay()
        }
        );
        $("#button_menu_help").on("mouseup", this, function(g) {
            g.data._onHelp()
        }
        );
        $("#menu_container").css("background-image", "url("+s_oSpriteLibrary.getSpritePath("menu_bg")+")");
        $("#menu_container").css("display", "block")
    }
    ;
    this.unload=function() {
        $("#button_menu_play").off("mouseup", this, function(g) {
            g.data._onPlay()
        }
        );
        $("#button_menu_help").off("mouseup", this, function(g) {
            g.data._onHelp()
        }
        );
        !1===s_bMobile&&($("#button_menu_play").off("mouseover", function(g) {
            $(this).css("color", "#FFCC00")
        }
        ), $("#button_menu_play").off("mouseout", function(g) {
            $(this).css("color", "#b7e0e5")
        }
        ), $("#button_menu_help").off("mouseover", function(g) {
            $(this).css("color", "#FFCC00")
        }
        ), $("#button_menu_help").off("mouseout", function(g) {
            $(this).css("color", "#b7e0e5")
        }
        ))
    }
    ;
    this.refreshLanguage=function() {
        $("#button_menu_play").text(TEXT_PLAY);
        $("#button_menu_help").text(TEXT_HELP)
    }
    ;
    this._onPlay=function() {
        this.unload();
        s_oApp.gotoMenuLayout()
    }
    ;
    this._onHelp=function() {
        this.unload();
        s_oApp.gotoHelp()
    }
    ;
    this.initMenu()
}

function CLayoutSettings() {
    var g,
    h,
    b=[],
    a=[],
    c=[],
    e=[],
    f=[],
    d=[];
    this.initLayoutClassic=function() {
        h= {
            x: 80, y: 80
        }
        ;
        g=SCORE_BONUS_LAYOUT_MEDIUM;
        b[0]= {
            x: 29, y: 0
        }
        ;
        b[1]= {
            x: 58, y: 0.05
        }
        ;
        b[2]= {
            x: 87, y: 0.05
        }
        ;
        b[3]= {
            x: 116, y: 0.05
        }
        ;
        b[4]= {
            x: 145, y: 0.05
        }
        ;
        b[5]= {
            x: 175, y: 0.05
        }
        ;
        b[6]= {
            x: 204, y: 0.05
        }
        ;
        b[7]= {
            x: 233, y: 0.05
        }
        ;
        b[8]= {
            x: 262, y: 0.05
        }
        ;
        b[9]= {
            x: 291, y: 0.05
        }
        ;
        b[10]= {
            x: 320, y: 0.05
        }
        ;
        b[11]= {
            x: 349, y: 0.05
        }
        ;
        b[12]= {
            x: 87, y: 39.55
        }
        ;
        b[13]= {
            x: 116, y: 39.55
        }
        ;
        b[14]= {
            x: 145, y: 39.55
        }
        ;
        b[15]= {
            x: 175, y: 39.55
        }
        ;
        b[16]= {
            x: 204, y: 39.55
        }
        ;
        b[17]= {
            x: 233, y: 39.55
        }
        ;
        b[18]= {
            x: 262, y: 39.55
        }
        ;
        b[19]= {
            x: 291, y: 39.55
        }
        ;
        b[20]= {
            x: 58, y: 79.05
        }
        ;
        b[21]= {
            x: 87, y: 79.05
        }
        ;
        b[22]= {
            x: 116, y: 79.05
        }
        ;
        b[23]= {
            x: 145, y: 79.05
        }
        ;
        b[24]= {
            x: 175, y: 79.05
        }
        ;
        b[25]= {
            x: 204, y: 79.05
        }
        ;
        b[26]= {
            x: 233, y: 79.05
        }
        ;
        b[27]= {
            x: 262, y: 79.05
        }
        ;
        b[28]= {
            x: 291, y: 79.05
        }
        ;
        b[29]= {
            x: 320, y: 79.05
        }
        ;
        b[30]= {
            x: 0, y: 136.95
        }
        ;
        b[31]= {
            x: 29, y: 118.55
        }
        ;
        b[32]= {
            x: 58, y: 118.55
        }
        ;
        b[33]= {
            x: 87, y: 118.55
        }
        ;
        b[34]= {
            x: 116, y: 118.55
        }
        ;
        b[35]= {
            x: 145, y: 118.55
        }
        ;
        b[36]= {
            x: 175, y: 118.55
        }
        ;
        b[37]= {
            x: 204, y: 118.55
        }
        ;
        b[38]= {
            x: 233, y: 118.55
        }
        ;
        b[39]= {
            x: 262, y: 118.55
        }
        ;
        b[40]= {
            x: 291, y: 118.55
        }
        ;
        b[41]= {
            x: 320, y: 118.55
        }
        ;
        b[42]= {
            x: 349, y: 118.55
        }
        ;
        b[43]= {
            x: 29, y: 158.05
        }
        ;
        b[44]= {
            x: 58, y: 158.05
        }
        ;
        b[45]= {
            x: 87, y: 158.05
        }
        ;
        b[46]= {
            x: 116, y: 158.05
        }
        ;
        b[47]= {
            x: 145, y: 158.05
        }
        ;
        b[48]= {
            x: 175, y: 158.05
        }
        ;
        b[49]= {
            x: 204, y: 158.05
        }
        ;
        b[50]= {
            x: 233, y: 158.05
        }
        ;
        b[51]= {
            x: 262, y: 158.05
        }
        ;
        b[52]= {
            x: 291, y: 158.05
        }
        ;
        b[53]= {
            x: 320, y: 158.05
        }
        ;
        b[54]= {
            x: 349, y: 158.05
        }
        ;
        b[55]= {
            x: 378, y: 136.95
        }
        ;
        b[56]= {
            x: 407, y: 136.95
        }
        ;
        b[57]= {
            x: 58, y: 197.55
        }
        ;
        b[58]= {
            x: 87, y: 197.55
        }
        ;
        b[59]= {
            x: 116, y: 197.55
        }
        ;
        b[60]= {
            x: 145, y: 197.55
        }
        ;
        b[61]= {
            x: 175, y: 197.55
        }
        ;
        b[62]= {
            x: 204, y: 197.55
        }
        ;
        b[63]= {
            x: 233, y: 197.55
        }
        ;
        b[64]= {
            x: 262, y: 197.55
        }
        ;
        b[65]= {
            x: 291, y: 197.55
        }
        ;
        b[66]= {
            x: 320, y: 197.55
        }
        ;
        b[67]= {
            x: 87, y: 237.05
        }
        ;
        b[68]= {
            x: 116, y: 237.05
        }
        ;
        b[69]= {
            x: 145, y: 237.05
        }
        ;
        b[70]= {
            x: 175, y: 237.05
        }
        ;
        b[71]= {
            x: 204, y: 237.05
        }
        ;
        b[72]= {
            x: 233, y: 237.05
        }
        ;
        b[73]= {
            x: 262, y: 237.05
        }
        ;
        b[74]= {
            x: 291, y: 237.05
        }
        ;
        b[75]= {
            x: 29, y: 276.55
        }
        ;
        b[76]= {
            x: 58, y: 276.55
        }
        ;
        b[77]= {
            x: 87, y: 276.55
        }
        ;
        b[78]= {
            x: 116, y: 276.55
        }
        ;
        b[79]= {
            x: 145, y: 276.55
        }
        ;
        b[80]= {
            x: 175, y: 276.55
        }
        ;
        b[81]= {
            x: 204, y: 276.55
        }
        ;
        b[82]= {
            x: 233, y: 276.55
        }
        ;
        b[83]= {
            x: 262, y: 276.55
        }
        ;
        b[84]= {
            x: 291, y: 276.55
        }
        ;
        b[85]= {
            x: 320, y: 276.55
        }
        ;
        b[86]= {
            x: 349, y: 276.55
        }
        ;
        b[87]= {
            x: 112.25, y: 35.7
        }
        ;
        b[88]= {
            x: 141.25, y: 35.7
        }
        ;
        b[89]= {
            x: 170.25, y: 35.7
        }
        ;
        b[90]= {
            x: 199.25, y: 35.7
        }
        ;
        b[91]= {
            x: 228.25, y: 35.7
        }
        ;
        b[92]= {
            x: 257.25, y: 35.7
        }
        ;
        b[93]= {
            x: 111.2, y: 75.15
        }
        ;
        b[94]= {
            x: 140.2, y: 75.15
        }
        ;
        b[95]= {
            x: 169.2, y: 75.15
        }
        ;
        b[96]= {
            x: 198.2, y: 75.15
        }
        ;
        b[97]= {
            x: 227.2, y: 75.15
        }
        ;
        b[98]= {
            x: 256.2, y: 75.15
        }
        ;
        b[99]= {
            x: 111.2, y: 114.65
        }
        ;
        b[100]= {
            x: 140.2, y: 114.65
        }
        ;
        b[101]= {
            x: 169.2, y: 114.65
        }
        ;
        b[102]= {
            x: 198.2, y: 114.65
        }
        ;
        b[103]= {
            x: 227.2, y: 114.65
        }
        ;
        b[104]= {
            x: 256.2, y: 114.65
        }
        ;
        b[105]= {
            x: 111.2, y: 154.15
        }
        ;
        b[106]= {
            x: 140.2, y: 154.15
        }
        ;
        b[107]= {
            x: 169.2, y: 154.15
        }
        ;
        b[108]= {
            x: 198.2, y: 154.15
        }
        ;
        b[109]= {
            x: 227.2, y: 154.15
        }
        ;
        b[110]= {
            x: 256.2, y: 154.15
        }
        ;
        b[111]= {
            x: 111.2, y: 193.65
        }
        ;
        b[112]= {
            x: 140.2, y: 193.65
        }
        ;
        b[113]= {
            x: 169.2, y: 193.65
        }
        ;
        b[114]= {
            x: 198.2, y: 193.65
        }
        ;
        b[115]= {
            x: 227.2, y: 193.65
        }
        ;
        b[116]= {
            x: 256.2, y: 193.65
        }
        ;
        b[117]= {
            x: 111.2, y: 233.15
        }
        ;
        b[118]= {
            x: 140.2, y: 233.15
        }
        ;
        b[119]= {
            x: 169.2, y: 233.15
        }
        ;
        b[120]= {
            x: 198.2, y: 233.15
        }
        ;
        b[121]= {
            x: 227.2, y: 233.15
        }
        ;
        b[122]= {
            x: 256.2, y: 233.15
        }
        ;
        b[123]= {
            x: 135.5, y: 70.7
        }
        ;
        b[124]= {
            x: 164.5, y: 70.7
        }
        ;
        b[125]= {
            x: 193.5, y: 70.7
        }
        ;
        b[126]= {
            x: 222.5, y: 70.7
        }
        ;
        b[127]= {
            x: 135.5, y: 110.15
        }
        ;
        b[128]= {
            x: 164.5, y: 110.15
        }
        ;
        b[129]= {
            x: 193.5, y: 110.15
        }
        ;
        b[130]= {
            x: 222.5, y: 110.15
        }
        ;
        b[131]= {
            x: 135.5, y: 149.65
        }
        ;
        b[132]= {
            x: 164.5, y: 149.65
        }
        ;
        b[133]= {
            x: 193.5, y: 149.65
        }
        ;
        b[134]= {
            x: 222.5, y: 149.65
        }
        ;
        b[135]= {
            x: 135.5, y: 189.15
        }
        ;
        b[136]= {
            x: 164.5, y: 189.15
        }
        ;
        b[137]= {
            x: 193.5, y: 189.15
        }
        ;
        b[138]= {
            x: 222.5, y: 189.15
        }
        ;
        b[139]= {
            x: 160.25, y: 106.4
        }
        ;
        b[140]= {
            x: 189.25, y: 106.4
        }
        ;
        b[141]= {
            x: 160.2, y: 145.95
        }
        ;
        b[142]= {
            x: 189.2, y: 145.95
        }
        ;
        b[143]= {
            x: 170.25, y: 122.95
        }
        ;
        a[0]=[];
        c[0]=[];
        e[0]=[];
        a[1]=[];
        c[1]=[0];
        e[1]=[2];
        a[2]=[];
        c[2]=[1];
        e[2]=[3];
        a[3]=[];
        c[3]=[2];
        e[3]=[4];
        a[4]=[];
        c[4]=[3];
        e[4]=[5];
        a[5]=[];
        c[5]=[4];
        e[5]=[6];
        a[6]=[];
        c[6]=[5];
        e[6]=[7];
        a[7]=[];
        c[7]=[6];
        e[7]=[8];
        a[8]=[];
        c[8]=[7];
        e[8]=[9];
        a[9]=[];
        c[9]=[8];
        e[9]=[10];
        a[10]=[];
        c[10]=[9];
        e[10]=[11];
        a[11]=[];
        c[11]=[];
        e[11]=[];
        a[12]=[];
        c[12]=[];
        e[12]=[];
        a[13]=[87];
        c[13]=[12];
        e[13]=[14];
        a[14]=[88];
        c[14]=[13];
        e[14]=[15];
        a[15]=[89];
        c[15]=[14];
        e[15]=[16];
        a[16]=[90];
        c[16]=[15];
        e[16]=[17];
        a[17]=[91];
        c[17]=[16];
        e[17]=[18];
        a[18]=[92];
        c[18]=[17];
        e[18]=[19];
        a[19]=[];
        c[19]=[];
        e[19]=[];
        a[20]=[];
        c[20]=[];
        e[20]=[];
        a[21]=[];
        c[21]=[20];
        e[21]=[22];
        a[22]=[93];
        c[22]=[21];
        e[22]=[23];
        a[23]=[94,
        123];
        c[23]=[22];
        e[23]=[24];
        a[24]=[95,
        124];
        c[24]=[23];
        e[24]=[25];
        a[25]=[96,
        125];
        c[25]=[24];
        e[25]=[26];
        a[26]=[97,
        126];
        c[26]=[25];
        e[26]=[27];
        a[27]=[98];
        c[27]=[26];
        e[27]=[28];
        a[28]=[];
        c[28]=[27];
        e[28]=[29];
        a[29]=[];
        c[29]=[];
        e[29]=[];
        a[30]=[];
        c[30]=[];
        e[30]=[];
        a[31]=[];
        c[31]=[30];
        e[31]=[32];
        a[32]=[];
        c[32]=[31];
        e[32]=[33];
        a[33]=[];
        c[33]=[32];
        e[33]=[34];
        a[34]=[99];
        c[34]=[33];
        e[34]=[35];
        a[35]=[100,
        127];
        c[35]=[34];
        e[35]=[36];
        a[36]=[101,
        128,
        139,
        143];
        c[36]=[35];
        e[36]=[37];
        a[37]=[102,
        129,
        140,
        143];
        c[37]=[36];
        e[37]=[38];
        a[38]=[103,
        130];
        c[38]=[37];
        e[38]=[39];
        a[39]=[104];
        c[39]=[38];
        e[39]=[40];
        a[40]=[];
        c[40]=[39];
        e[40]=[41];
        a[41]=[];
        c[41]=[40];
        e[41]=[42];
        a[42]=[];
        c[42]=[41];
        e[42]=[55];
        a[43]=[];
        c[43]=[30];
        e[43]=[44];
        a[44]=[];
        c[44]=[43];
        e[44]=[45];
        a[45]=[];
        c[45]=[44];
        e[45]=[46];
        a[46]=[105];
        c[46]=[45];
        e[46]=[47];
        a[47]=[106,
        131];
        c[47]=[46];
        e[47]=[48];
        a[48]=[107,
        132,
        141,
        143];
        c[48]=[47];
        e[48]=[49];
        a[49]=[108,
        133,
        142,
        143];
        c[49]=[48];
        e[49]=[50];
        a[50]=[109,
        134];
        c[50]=[49];
        e[50]=[51];
        a[51]=[110];
        c[51]=[50];
        e[51]=[52];
        a[52]=[];
        c[52]=[51];
        e[52]=[53];
        a[53]=[];
        c[53]=[52];
        e[53]=[54];
        a[54]=[];
        c[54]=[53];
        e[54]=[55];
        a[55]=[];
        c[55]=[42,
        54];
        e[55]=[56];
        a[56]=[];
        c[56]=[];
        e[56]=[];
        a[57]=[];
        c[57]=[];
        e[57]=[];
        a[58]=[];
        c[58]=[57];
        e[58]=[59];
        a[59]=[111];
        c[59]=[58];
        e[59]=[60];
        a[60]=[112,
        135];
        c[60]=[59];
        e[60]=[61];
        a[61]=[113,
        136];
        c[61]=[60];
        e[61]=[62];
        a[62]=[114,
        137];
        c[62]=[61];
        e[62]=[63];
        a[63]=[115,
        138];
        c[63]=[62];
        e[63]=[64];
        a[64]=[116];
        c[64]=[63];
        e[64]=[65];
        a[65]=[];
        c[65]=[64];
        e[65]=[66];
        a[66]=[];
        c[66]=[];
        e[66]=[];
        a[67]=[];
        c[67]=[];
        e[67]=[];
        a[68]=[117];
        c[68]=[67];
        e[68]=[69];
        a[69]=[118];
        c[69]=[68];
        e[69]=[70];
        a[70]=[119];
        c[70]=[69];
        e[70]=[71];
        a[71]=[120];
        c[71]=[70];
        e[71]=[72];
        a[72]=[121];
        c[72]=[71];
        e[72]=[73];
        a[73]=[122];
        c[73]=[72];
        e[73]=[74];
        a[74]=[];
        c[74]=[];
        e[74]=[];
        a[75]=[];
        c[75]=[];
        e[75]=[];
        a[76]=[];
        c[76]=[75];
        e[76]=[77];
        a[77]=[];
        c[77]=[76];
        e[77]=[78];
        a[78]=[];
        c[78]=[77];
        e[78]=[79];
        a[79]=[];
        c[79]=[78];
        e[79]=[80];
        a[80]=[];
        c[80]=[79];
        e[80]=[81];
        a[81]=[];
        c[81]=[80];
        e[81]=[82];
        a[82]=[];
        c[82]=[81];
        e[82]=[83];
        a[83]=[];
        c[83]=[82];
        e[83]=[84];
        a[84]=[];
        c[84]=[83];
        e[84]=[85];
        a[85]=[];
        c[85]=[84];
        e[85]=[86];
        a[86]=[];
        c[86]=[];
        e[86]=[];
        a[87]=[];
        c[87]=[];
        e[87]=[];
        a[88]=[];
        c[88]=[87];
        e[88]=[89];
        a[89]=[];
        c[89]=[88];
        e[89]=[90];
        a[90]=[];
        c[90]=[89];
        e[90]=[91];
        a[91]=[];
        c[91]=[90];
        e[91]=[92];
        a[92]=[];
        c[92]=[];
        e[92]=[];
        a[93]=[];
        c[93]=[];
        e[93]=[];
        a[94]=[123];
        c[94]=[93];
        e[94]=[95];
        a[95]=[124];
        c[95]=[94];
        e[95]=[96];
        a[96]=[125];
        c[96]=[95];
        e[96]=[97];
        a[97]=[126];
        c[97]=[96];
        e[97]=[98];
        a[98]=[];
        c[98]=[];
        e[98]=[];
        a[99]=[];
        c[99]=[];
        e[99]=[];
        a[100]=[127];
        c[100]=[99];
        e[100]=[101];
        a[101]=[128,
        139,
        143];
        c[101]=[100];
        e[101]=[102];
        a[102]=[129,
        140,
        143];
        c[102]=[101];
        e[102]=[103];
        a[103]=[130];
        c[103]=[102];
        e[103]=[104];
        a[104]=[];
        c[104]=[];
        e[104]=[];
        a[105]=[];
        c[105]=[];
        e[105]=[];
        a[106]=[131];
        c[106]=[105];
        e[106]=[107];
        a[107]=[132,
        141,
        143];
        c[107]=[106];
        e[107]=[108];
        a[108]=[133,
        142,
        143];
        c[108]=[107];
        e[108]=[109];
        a[109]=[134];
        c[109]=[108];
        e[109]=[110];
        a[110]=[];
        c[110]=[];
        e[110]=[];
        a[111]=[];
        c[111]=[];
        e[111]=[];
        a[112]=[135];
        c[112]=[111];
        e[112]=[113];
        a[113]=[136];
        c[113]=[112];
        e[113]=[114];
        a[114]=[137];
        c[114]=[113];
        e[114]=[115];
        a[115]=[138];
        c[115]=[114];
        e[115]=[116];
        a[116]=[];
        c[116]=[];
        e[116]=[];
        a[117]=[];
        c[117]=[];
        e[117]=[];
        a[118]=[];
        c[118]=[117];
        e[118]=[119];
        a[119]=[];
        c[119]=[118];
        e[119]=[120];
        a[120]=[];
        c[120]=[119];
        e[120]=[121];
        a[121]=[];
        c[121]=[120];
        e[121]=[122];
        a[122]=[];
        c[122]=[];
        e[122]=[];
        a[123]=[];
        c[123]=[];
        e[123]=[];
        a[124]=[];
        c[124]=[123];
        e[124]=[125];
        a[125]=[];
        c[125]=[124];
        e[125]=[126];
        a[126]=[];
        c[126]=[];
        e[126]=[];
        a[127]=[];
        c[127]=[];
        e[127]=[];
        a[128]=[139,
        143];
        c[128]=[127];
        e[128]=[129];
        a[129]=[140,
        143];
        c[129]=[128];
        e[129]=[130];
        a[130]=[];
        c[130]=[];
        e[130]=[];
        a[131]=[];
        c[131]=[];
        e[131]=[];
        a[132]=[141,
        143];
        c[132]=[131];
        e[132]=[133];
        a[133]=[142,
        143];
        c[133]=[132];
        e[133]=[134];
        a[134]=[];
        c[134]=[];
        e[134]=[];
        a[135]=[];
        c[135]=[];
        e[135]=[];
        a[136]=[];
        c[136]=[135];
        e[136]=[137];
        a[137]=[];
        c[137]=[136];
        e[137]=[138];
        a[138]=[];
        c[138]=[];
        e[138]=[];
        a[139]=[143];
        c[139]=[];
        e[139]=[];
        a[140]=[143];
        c[140]=[];
        e[140]=[];
        a[141]=[143];
        c[141]=[];
        e[141]=[];
        a[142]=[143];
        c[142]=[];
        e[142]=[];
        a[143]=[];
        c[143]=[];
        e[143]=[];
        f[0]=[ {
            index: 1, decrease: 1
        }
        ];
        f[1]=[ {
            index: 2, decrease: 1
        }
        ];
        f[2]=[ {
            index: 1, decrease: 1
        }
        ,
        {
            index: 3, decrease: 1
        }
        ];
        f[3]=[ {
            index: 4, decrease: 1
        }
        ,
        {
            index: 2, decrease: 1
        }
        ];
        f[4]=[ {
            index: 5, decrease: 1
        }
        ,
        {
            index: 3, decrease: 1
        }
        ];
        f[5]=[ {
            index: 6, decrease: 1
        }
        ,
        {
            index: 4, decrease: 1
        }
        ];
        f[6]=[ {
            index: 7, decrease: 1
        }
        ,
        {
            index: 5, decrease: 1
        }
        ];
        f[7]=[ {
            index: 8, decrease: 1
        }
        ,
        {
            index: 6, decrease: 1
        }
        ];
        f[8]=[ {
            index: 7, decrease: 1
        }
        ,
        {
            index: 9, decrease: 1
        }
        ];
        f[9]=[ {
            index: 8, decrease: 1
        }
        ,
        {
            index: 10, decrease: 1
        }
        ];
        f[10]=[ {
            index: 9, decrease: 1
        }
        ];
        f[11]=[ {
            index: 10, decrease: 1
        }
        ];
        f[12]=[ {
            index: 13, decrease: 1
        }
        ];
        f[13]=[ {
            index: 14, decrease: 1
        }
        ];
        f[14]=[ {
            index: 13, decrease: 1
        }
        ,
        {
            index: 15, decrease: 1
        }
        ];
        f[15]=[ {
            index: 14, decrease: 1
        }
        ,
        {
            index: 16, decrease: 1
        }
        ];
        f[16]=[ {
            index: 15, decrease: 1
        }
        ,
        {
            index: 17, decrease: 1
        }
        ];
        f[17]=[ {
            index: 16, decrease: 1
        }
        ,
        {
            index: 18, decrease: 1
        }
        ];
        f[18]=[ {
            index: 17, decrease: 1
        }
        ];
        f[19]=[ {
            index: 18, decrease: 1
        }
        ];
        f[20]=[ {
            index: 21, decrease: 1
        }
        ];
        f[21]=[ {
            index: 22, decrease: 1
        }
        ];
        f[22]=[ {
            index: 21, decrease: 1
        }
        ,
        {
            index: 23, decrease: 1
        }
        ];
        f[23]=[ {
            index: 22, decrease: 1
        }
        ,
        {
            index: 24, decrease: 1
        }
        ];
        f[24]=[ {
            index: 23, decrease: 1
        }
        ,
        {
            index: 25, decrease: 1
        }
        ];
        f[25]=[ {
            index: 24, decrease: 1
        }
        ,
        {
            index: 26, decrease: 1
        }
        ];
        f[26]=[ {
            index: 25, decrease: 1
        }
        ,
        {
            index: 27, decrease: 1
        }
        ];
        f[27]=[ {
            index: 26, decrease: 1
        }
        ,
        {
            index: 28, decrease: 1
        }
        ];
        f[28]=[ {
            index: 27, decrease: 1
        }
        ];
        f[29]=[ {
            index: 28, decrease: 1
        }
        ];
        f[30]=[ {
            index: 31, decrease: 1
        }
        ,
        {
            index: 43, decrease: 1
        }
        ];
        f[31]=[ {
            index: 32, decrease: 1
        }
        ];
        f[32]=[ {
            index: 31, decrease: 1
        }
        ,
        {
            index: 33, decrease: 1
        }
        ];
        f[33]=[ {
            index: 32, decrease: 1
        }
        ,
        {
            index: 34, decrease: 1
        }
        ];
        f[34]=[ {
            index: 33, decrease: 1
        }
        ,
        {
            index: 35, decrease: 1
        }
        ];
        f[35]=[ {
            index: 34, decrease: 1
        }
        ,
        {
            index: 36, decrease: 1
        }
        ];
        f[36]=[ {
            index: 35, decrease: 1
        }
        ,
        {
            index: 37, decrease: 1
        }
        ];
        f[37]=[ {
            index: 36, decrease: 1
        }
        ,
        {
            index: 38, decrease: 1
        }
        ];
        f[38]=[ {
            index: 37, decrease: 1
        }
        ,
        {
            index: 39, decrease: 1
        }
        ];
        f[39]=[ {
            index: 38, decrease: 1
        }
        ,
        {
            index: 40, decrease: 1
        }
        ];
        f[40]=[ {
            index: 39, decrease: 1
        }
        ,
        {
            index: 41, decrease: 1
        }
        ];
        f[41]=[ {
            index: 40, decrease: 1
        }
        ,
        {
            index: 42, decrease: 1
        }
        ];
        f[42]=[ {
            index: 41, decrease: 1
        }
        ,
        {
            index: 55, decrease: 0.5
        }
        ];
        f[43]=[ {
            index: 44, decrease: 1
        }
        ];
        f[44]=[ {
            index: 43, decrease: 1
        }
        ,
        {
            index: 45, decrease: 1
        }
        ];
        f[45]=[ {
            index: 44, decrease: 1
        }
        ,
        {
            index: 46, decrease: 1
        }
        ];
        f[46]=[ {
            index: 45, decrease: 1
        }
        ,
        {
            index: 47, decrease: 1
        }
        ];
        f[47]=[ {
            index: 46, decrease: 1
        }
        ,
        {
            index: 48, decrease: 1
        }
        ];
        f[48]=[ {
            index: 47, decrease: 1
        }
        ,
        {
            index: 49, decrease: 1
        }
        ];
        f[49]=[ {
            index: 48, decrease: 1
        }
        ,
        {
            index: 50, decrease: 1
        }
        ];
        f[50]=[ {
            index: 49, decrease: 1
        }
        ,
        {
            index: 51, decrease: 1
        }
        ];
        f[51]=[ {
            index: 50, decrease: 1
        }
        ,
        {
            index: 52, decrease: 1
        }
        ];
        f[52]=[ {
            index: 51, decrease: 1
        }
        ,
        {
            index: 53, decrease: 1
        }
        ];
        f[53]=[ {
            index: 52, decrease: 1
        }
        ,
        {
            index: 54, decrease: 1
        }
        ];
        f[54]=[ {
            index: 53, decrease: 1
        }
        ,
        {
            index: 55, decrease: 0.5
        }
        ];
        f[55]=[ {
            index: 42, decrease: 1
        }
        ,
        {
            index: 54, decrease: 1
        }
        ];
        f[56]=[ {
            index: 55, decrease: 1
        }
        ];
        f[57]=[ {
            index: 58, decrease: 1
        }
        ];
        f[58]=[ {
            index: 59, decrease: 1
        }
        ];
        f[59]=[ {
            index: 58, decrease: 1
        }
        ,
        {
            index: 60, decrease: 1
        }
        ];
        f[60]=[ {
            index: 59, decrease: 1
        }
        ,
        {
            index: 61, decrease: 1
        }
        ];
        f[61]=[ {
            index: 60, decrease: 1
        }
        ,
        {
            index: 62, decrease: 1
        }
        ];
        f[62]=[ {
            index: 61, decrease: 1
        }
        ,
        {
            index: 63, decrease: 1
        }
        ];
        f[63]=[ {
            index: 62, decrease: 1
        }
        ,
        {
            index: 64, decrease: 1
        }
        ];
        f[64]=[ {
            index: 63, decrease: 1
        }
        ,
        {
            index: 65, decrease: 1
        }
        ];
        f[65]=[ {
            index: 64, decrease: 1
        }
        ];
        f[66]=[ {
            index: 65, decrease: 1
        }
        ];
        f[67]=[ {
            index: 68, decrease: 1
        }
        ];
        f[68]=[ {
            index: 69, decrease: 1
        }
        ];
        f[69]=[ {
            index: 68, decrease: 1
        }
        ,
        {
            index: 70, decrease: 1
        }
        ];
        f[70]=[ {
            index: 69, decrease: 1
        }
        ,
        {
            index: 71, decrease: 1
        }
        ];
        f[71]=[ {
            index: 70, decrease: 1
        }
        ,
        {
            index: 72, decrease: 1
        }
        ];
        f[72]=[ {
            index: 71, decrease: 1
        }
        ,
        {
            index: 73, decrease: 1
        }
        ];
        f[73]=[ {
            index: 72, decrease: 1
        }
        ];
        f[74]=[ {
            index: 73, decrease: 1
        }
        ];
        f[75]=[ {
            index: 76, decrease: 1
        }
        ];
        f[76]=[ {
            index: 77, decrease: 1
        }
        ];
        f[77]=[ {
            index: 76, decrease: 1
        }
        ,
        {
            index: 78, decrease: 1
        }
        ];
        f[78]=[ {
            index: 77, decrease: 1
        }
        ,
        {
            index: 79, decrease: 1
        }
        ];
        f[79]=[ {
            index: 78, decrease: 1
        }
        ,
        {
            index: 80, decrease: 1
        }
        ];
        f[80]=[ {
            index: 79, decrease: 1
        }
        ,
        {
            index: 81, decrease: 1
        }
        ];
        f[81]=[ {
            index: 80, decrease: 1
        }
        ,
        {
            index: 82, decrease: 1
        }
        ];
        f[82]=[ {
            index: 81, decrease: 1
        }
        ,
        {
            index: 83, decrease: 1
        }
        ];
        f[83]=[ {
            index: 82, decrease: 1
        }
        ,
        {
            index: 84, decrease: 1
        }
        ];
        f[84]=[ {
            index: 83, decrease: 1
        }
        ,
        {
            index: 85, decrease: 1
        }
        ];
        f[85]=[ {
            index: 84, decrease: 1
        }
        ];
        f[86]=[ {
            index: 85, decrease: 1
        }
        ];
        f[87]=[ {
            index: 13, decrease: 1
        }
        ,
        {
            index: 88, decrease: 1
        }
        ];
        f[88]=[ {
            index: 14, decrease: 1
        }
        ,
        {
            index: 89, decrease: 1
        }
        ];
        f[89]=[ {
            index: 90, decrease: 1
        }
        ,
        {
            index: 15, decrease: 1
        }
        ,
        {
            index: 88, decrease: 1
        }
        ];
        f[90]=[ {
            index: 91, decrease: 1
        }
        ,
        {
            index: 16, decrease: 1
        }
        ,
        {
            index: 89, decrease: 1
        }
        ];
        f[91]=[ {
            index: 90, decrease: 1
        }
        ,
        {
            index: 17, decrease: 1
        }
        ];
        f[92]=[ {
            index: 91, decrease: 1
        }
        ,
        {
            index: 18, decrease: 1
        }
        ];
        f[93]=[ {
            index: 94, decrease: 1
        }
        ,
        {
            index: 22, decrease: 1
        }
        ];
        f[94]=[ {
            index: 95, decrease: 1
        }
        ,
        {
            index: 23, decrease: 1
        }
        ];
        f[95]=[ {
            index: 94, decrease: 1
        }
        ,
        {
            index: 96, decrease: 1
        }
        ,
        {
            index: 24, decrease: 1
        }
        ];
        f[96]=[ {
            index: 95, decrease: 1
        }
        ,
        {
            index: 97, decrease: 1
        }
        ,
        {
            index: 25, decrease: 1
        }
        ];
        f[97]=[ {
            index: 96, decrease: 1
        }
        ,
        {
            index: 26, decrease: 1
        }
        ];
        f[98]=[ {
            index: 97, decrease: 1
        }
        ,
        {
            index: 27, decrease: 1
        }
        ];
        f[99]=[ {
            index: 100, decrease: 1
        }
        ,
        {
            index: 34, decrease: 1
        }
        ];
        f[100]=[ {
            index: 101, decrease: 1
        }
        ,
        {
            index: 35, decrease: 1
        }
        ];
        f[101]=[ {
            index: 100, decrease: 1
        }
        ,
        {
            index: 102, decrease: 1
        }
        ,
        {
            index: 36, decrease: 1
        }
        ];
        f[102]=[ {
            index: 101, decrease: 1
        }
        ,
        {
            index: 103, decrease: 1
        }
        ,
        {
            index: 37, decrease: 1
        }
        ];
        f[103]=[ {
            index: 102, decrease: 1
        }
        ,
        {
            index: 38, decrease: 1
        }
        ];
        f[104]=[ {
            index: 103, decrease: 1
        }
        ,
        {
            index: 39, decrease: 1
        }
        ];
        f[105]=[ {
            index: 106, decrease: 1
        }
        ,
        {
            index: 46, decrease: 1
        }
        ];
        f[106]=[ {
            index: 107, decrease: 1
        }
        ,
        {
            index: 47, decrease: 1
        }
        ];
        f[107]=[ {
            index: 106, decrease: 1
        }
        ,
        {
            index: 108, decrease: 1
        }
        ,
        {
            index: 48, decrease: 1
        }
        ];
        f[108]=[ {
            index: 107, decrease: 1
        }
        ,
        {
            index: 109, decrease: 1
        }
        ,
        {
            index: 49, decrease: 1
        }
        ];
        f[109]=[ {
            index: 108, decrease: 1
        }
        ,
        {
            index: 50, decrease: 1
        }
        ];
        f[110]=[ {
            index: 109, decrease: 1
        }
        ,
        {
            index: 51, decrease: 1
        }
        ];
        f[111]=[ {
            index: 112, decrease: 1
        }
        ,
        {
            index: 59, decrease: 1
        }
        ];
        f[112]=[ {
            index: 113, decrease: 1
        }
        ,
        {
            index: 60, decrease: 1
        }
        ];
        f[113]=[ {
            index: 112, decrease: 1
        }
        ,
        {
            index: 114, decrease: 1
        }
        ,
        {
            index: 61, decrease: 1
        }
        ];
        f[114]=[ {
            index: 113, decrease: 1
        }
        ,
        {
            index: 115, decrease: 1
        }
        ,
        {
            index: 62, decrease: 1
        }
        ];
        f[115]=[ {
            index: 114, decrease: 1
        }
        ,
        {
            index: 63, decrease: 1
        }
        ];
        f[116]=[ {
            index: 115, decrease: 1
        }
        ,
        {
            index: 64, decrease: 1
        }
        ];
        f[117]=[ {
            index: 118, decrease: 1
        }
        ,
        {
            index: 68, decrease: 1
        }
        ];
        f[118]=[ {
            index: 119, decrease: 1
        }
        ,
        {
            index: 69, decrease: 1
        }
        ];
        f[119]=[ {
            index: 118, decrease: 1
        }
        ,
        {
            index: 120, decrease: 1
        }
        ,
        {
            index: 70, decrease: 1
        }
        ];
        f[120]=[ {
            index: 119, decrease: 1
        }
        ,
        {
            index: 121, decrease: 1
        }
        ,
        {
            index: 71, decrease: 1
        }
        ];
        f[121]=[ {
            index: 120, decrease: 1
        }
        ,
        {
            index: 72, decrease: 1
        }
        ];
        f[122]=[ {
            index: 121, decrease: 1
        }
        ,
        {
            index: 73, decrease: 1
        }
        ];
        f[123]=[ {
            index: 94, decrease: 1
        }
        ,
        {
            index: 23, decrease: 1
        }
        ,
        {
            index: 124, decrease: 1
        }
        ];
        f[124]=[ {
            index: 95, decrease: 1
        }
        ,
        {
            index: 24, decrease: 1
        }
        ,
        {
            index: 125, decrease: 1
        }
        ];
        f[125]=[ {
            index: 96, decrease: 1
        }
        ,
        {
            index: 25, decrease: 1
        }
        ,
        {
            index: 124, decrease: 1
        }
        ];
        f[126]=[ {
            index: 97, decrease: 1
        }
        ,
        {
            index: 26, decrease: 1
        }
        ,
        {
            index: 125, decrease: 1
        }
        ];
        f[127]=[ {
            index: 100, decrease: 1
        }
        ,
        {
            index: 35, decrease: 1
        }
        ,
        {
            index: 128, decrease: 1
        }
        ];
        f[128]=[ {
            index: 129, decrease: 1
        }
        ,
        {
            index: 101, decrease: 1
        }
        ,
        {
            index: 36, decrease: 1
        }
        ];
        f[129]=[ {
            index: 102, decrease: 1
        }
        ,
        {
            index: 37, decrease: 1
        }
        ,
        {
            index: 128, decrease: 1
        }
        ];
        f[130]=[ {
            index: 129, decrease: 1
        }
        ,
        {
            index: 103, decrease: 1
        }
        ,
        {
            index: 38, decrease: 1
        }
        ];
        f[131]=[ {
            index: 106, decrease: 1
        }
        ,
        {
            index: 47, decrease: 1
        }
        ,
        {
            index: 132, decrease: 1
        }
        ];
        f[132]=[ {
            index: 107, decrease: 1
        }
        ,
        {
            index: 48, decrease: 1
        }
        ,
        {
            index: 133, decrease: 1
        }
        ];
        f[133]=[ {
            index: 108, decrease: 1
        }
        ,
        {
            index: 49, decrease: 1
        }
        ,
        {
            index: 132, decrease: 1
        }
        ];
        f[134]=[ {
            index: 109, decrease: 1
        }
        ,
        {
            index: 50, decrease: 1
        }
        ,
        {
            index: 133, decrease: 1
        }
        ];
        f[135]=[ {
            index: 112, decrease: 1
        }
        ,
        {
            index: 60, decrease: 1
        }
        ,
        {
            index: 136, decrease: 1
        }
        ];
        f[136]=[ {
            index: 113, decrease: 1
        }
        ,
        {
            index: 61, decrease: 1
        }
        ,
        {
            index: 137, decrease: 1
        }
        ];
        f[137]=[ {
            index: 114, decrease: 1
        }
        ,
        {
            index: 62, decrease: 1
        }
        ,
        {
            index: 136, decrease: 1
        }
        ];
        f[138]=[ {
            index: 115, decrease: 1
        }
        ,
        {
            index: 63, decrease: 1
        }
        ,
        {
            index: 137, decrease: 1
        }
        ];
        f[139]=[ {
            index: 101, decrease: 1
        }
        ,
        {
            index: 36, decrease: 1
        }
        ,
        {
            index: 128, decrease: 1
        }
        ];
        f[140]=[ {
            index: 129, decrease: 1
        }
        ,
        {
            index: 102, decrease: 1
        }
        ,
        {
            index: 37, decrease: 1
        }
        ];
        f[141]=[ {
            index: 107, decrease: 1
        }
        ,
        {
            index: 48, decrease: 1
        }
        ,
        {
            index: 132, decrease: 1
        }
        ];
        f[142]=[ {
            index: 108, decrease: 1
        }
        ,
        {
            index: 49, decrease: 1
        }
        ,
        {
            index: 133, decrease: 1
        }
        ];
        f[143]=[ {
            index: 129, decrease: 1
        }
        ,
        {
            index: 101, decrease: 1
        }
        ,
        {
            index: 102, decrease: 1
        }
        ,
        {
            index: 107, decrease: 1
        }
        ,
        {
            index: 108, decrease: 1
        }
        ,
        {
            index: 36, decrease: 1
        }
        ,
        {
            index: 37, decrease: 1
        }
        ,
        {
            index: 128, decrease: 1
        }
        ,
        {
            index: 48, decrease: 1
        }
        ,
        {
            index: 49, decrease: 1
        }
        ,
        {
            index: 142, decrease: 1
        }
        ,
        {
            index: 141, decrease: 1
        }
        ,
        {
            index: 140, decrease: 1
        }
        ,
        {
            index: 139, decrease: 1
        }
        ,
        {
            index: 133, decrease: 1
        }
        ,
        {
            index: 132, decrease: 1
        }
        ];
        d[0]=0;
        d[1]=0;
        d[2]=0;
        d[3]=0;
        d[4]=0;
        d[5]=0;
        d[6]=0;
        d[7]=0;
        d[8]=0;
        d[9]=0;
        d[10]=0;
        d[11]=0;
        d[12]=0;
        d[13]=0;
        d[14]=0;
        d[15]=0;
        d[16]=0;
        d[17]=0;
        d[18]=0;
        d[19]=0;
        d[20]=0;
        d[21]=0;
        d[22]=0;
        d[23]=0;
        d[24]=0;
        d[25]=0;
        d[26]=0;
        d[27]=0;
        d[28]=0;
        d[29]=0;
        d[30]=0;
        d[31]=0;
        d[32]=0;
        d[33]=0;
        d[34]=0;
        d[35]=0;
        d[36]=0;
        d[37]=0;
        d[38]=0;
        d[39]=0;
        d[40]=0;
        d[41]=0;
        d[42]=0;
        d[43]=0;
        d[44]=0;
        d[45]=0;
        d[46]=0;
        d[47]=0;
        d[48]=0;
        d[49]=0;
        d[50]=0;
        d[51]=0;
        d[52]=0;
        d[53]=0;
        d[54]=0;
        d[55]=0;
        d[56]=0;
        d[57]=0;
        d[58]=0;
        d[59]=0;
        d[60]=0;
        d[61]=0;
        d[62]=0;
        d[63]=0;
        d[64]=0;
        d[65]=0;
        d[66]=0;
        d[67]=0;
        d[68]=0;
        d[69]=0;
        d[70]=0;
        d[71]=0;
        d[72]=0;
        d[73]=0;
        d[74]=0;
        d[75]=0;
        d[76]=0;
        d[77]=0;
        d[78]=0;
        d[79]=0;
        d[80]=0;
        d[81]=0;
        d[82]=0;
        d[83]=0;
        d[84]=0;
        d[85]=0;
        d[86]=0;
        d[87]=1;
        d[88]=1;
        d[89]=1;
        d[90]=1;
        d[91]=1;
        d[92]=1;
        d[93]=1;
        d[94]=1;
        d[95]=1;
        d[96]=1;
        d[97]=1;
        d[98]=1;
        d[99]=1;
        d[100]=1;
        d[101]=1;
        d[102]=1;
        d[103]=1;
        d[104]=1;
        d[105]=1;
        d[106]=1;
        d[107]=1;
        d[108]=1;
        d[109]=1;
        d[110]=1;
        d[111]=1;
        d[112]=1;
        d[113]=1;
        d[114]=1;
        d[115]=1;
        d[116]=1;
        d[117]=1;
        d[118]=1;
        d[119]=1;
        d[120]=1;
        d[121]=1;
        d[122]=1;
        d[123]=2;
        d[124]=2;
        d[125]=2;
        d[126]=2;
        d[127]=2;
        d[128]=2;
        d[129]=2;
        d[130]=2;
        d[131]=2;
        d[132]=2;
        d[133]=2;
        d[134]=2;
        d[135]=2;
        d[136]=2;
        d[137]=2;
        d[138]=2;
        d[139]=3;
        d[140]=3;
        d[141]=3;
        d[142]=3;
        d[143]=4
    }
    ;
    this.initLayoutMonument=function() {
        h= {
            x: 150, y: 80
        }
        ;
        g=SCORE_BONUS_LAYOUT_EASY;
        b[0]= {
            x: 15.15, y: 10.55
        }
        ;
        b[1]= {
            x: 44.15, y: 10.55
        }
        ;
        b[2]= {
            x: 73.15, y: 10.55
        }
        ;
        b[3]= {
            x: 131.15, y: 10.55
        }
        ;
        b[4]= {
            x: 160.15, y: 10.55
        }
        ;
        b[5]= {
            x: 189.15, y: 10.55
        }
        ;
        b[6]= {
            x: 247.15, y: 10.55
        }
        ;
        b[7]= {
            x: 276.15, y: 10.55
        }
        ;
        b[8]= {
            x: 305.15, y: 10.55
        }
        ;
        b[9]= {
            x: 15.15, y: 50.05
        }
        ;
        b[10]= {
            x: 44.15, y: 50.05
        }
        ;
        b[11]= {
            x: 102.15, y: 50.05
        }
        ;
        b[12]= {
            x: 131.15, y: 50.05
        }
        ;
        b[13]= {
            x: 160.15, y: 50.05
        }
        ;
        b[14]= {
            x: 189.15, y: 50.05
        }
        ;
        b[15]= {
            x: 218.15, y: 50.05
        }
        ;
        b[16]= {
            x: 276.15, y: 50.05
        }
        ;
        b[17]= {
            x: 305.15, y: 50.05
        }
        ;
        b[18]= {
            x: 15.15, y: 89.55
        }
        ;
        b[19]= {
            x: 73.15, y: 89.55
        }
        ;
        b[20]= {
            x: 102.15, y: 89.55
        }
        ;
        b[21]= {
            x: 131.15, y: 89.55
        }
        ;
        b[22]= {
            x: 160.15, y: 89.55
        }
        ;
        b[23]= {
            x: 189.15, y: 89.55
        }
        ;
        b[24]= {
            x: 218.15, y: 89.55
        }
        ;
        b[25]= {
            x: 247.15, y: 89.55
        }
        ;
        b[26]= {
            x: 305.15, y: 89.55
        }
        ;
        b[27]= {
            x: 44.15, y: 129.05
        }
        ;
        b[28]= {
            x: 73.15, y: 129.05
        }
        ;
        b[29]= {
            x: 102.15, y: 129.05
        }
        ;
        b[30]= {
            x: 131.15, y: 129.05
        }
        ;
        b[31]= {
            x: 160.15, y: 129.05
        }
        ;
        b[32]= {
            x: 189.15, y: 129.05
        }
        ;
        b[33]= {
            x: 218.15, y: 129.05
        }
        ;
        b[34]= {
            x: 247.15, y: 129.05
        }
        ;
        b[35]= {
            x: 276.15, y: 129.05
        }
        ;
        b[36]= {
            x: 15.15, y: 168.55
        }
        ;
        b[37]= {
            x: 73.15, y: 168.55
        }
        ;
        b[38]= {
            x: 102.15, y: 168.55
        }
        ;
        b[39]= {
            x: 131.15, y: 168.55
        }
        ;
        b[40]= {
            x: 160.15, y: 168.55
        }
        ;
        b[41]= {
            x: 189.15, y: 168.55
        }
        ;
        b[42]= {
            x: 218.15, y: 168.55
        }
        ;
        b[43]= {
            x: 247.15, y: 168.55
        }
        ;
        b[44]= {
            x: 305.15, y: 168.55
        }
        ;
        b[45]= {
            x: 15.15, y: 208.05
        }
        ;
        b[46]= {
            x: 44.15, y: 208.05
        }
        ;
        b[47]= {
            x: 102.15, y: 208.05
        }
        ;
        b[48]= {
            x: 131.15, y: 208.05
        }
        ;
        b[49]= {
            x: 160.15, y: 208.05
        }
        ;
        b[50]= {
            x: 189.15, y: 208.05
        }
        ;
        b[51]= {
            x: 218.15, y: 208.05
        }
        ;
        b[52]= {
            x: 276.15, y: 208.05
        }
        ;
        b[53]= {
            x: 305.15, y: 208.05
        }
        ;
        b[54]= {
            x: 15.15, y: 247.55
        }
        ;
        b[55]= {
            x: 44.15, y: 247.55
        }
        ;
        b[56]= {
            x: 73.15, y: 247.55
        }
        ;
        b[57]= {
            x: 131.15, y: 247.55
        }
        ;
        b[58]= {
            x: 160.15, y: 247.55
        }
        ;
        b[59]= {
            x: 189.15, y: 247.55
        }
        ;
        b[60]= {
            x: 247.15, y: 247.55
        }
        ;
        b[61]= {
            x: 276.15, y: 247.55
        }
        ;
        b[62]= {
            x: 305.15, y: 247.55
        }
        ;
        b[63]= {
            x: 15.15, y: 287.05
        }
        ;
        b[64]= {
            x: 44.15, y: 287.05
        }
        ;
        b[65]= {
            x: 73.15, y: 287.05
        }
        ;
        b[66]= {
            x: 102.15, y: 287.05
        }
        ;
        b[67]= {
            x: 160.15, y: 287.05
        }
        ;
        b[68]= {
            x: 218.15, y: 287.05
        }
        ;
        b[69]= {
            x: 247.15, y: 287.05
        }
        ;
        b[70]= {
            x: 276.15, y: 287.05
        }
        ;
        b[71]= {
            x: 305.15, y: 287.05
        }
        ;
        b[72]= {
            x: 9.65, y: 5
        }
        ;
        b[73]= {
            x: 38.65, y: 5.05
        }
        ;
        b[74]= {
            x: 154.65, y: 5.05
        }
        ;
        b[75]= {
            x: 271.65, y: 5
        }
        ;
        b[76]= {
            x: 300.65, y: 5
        }
        ;
        b[77]= {
            x: 9.65, y: 44.55
        }
        ;
        b[78]= {
            x: 125.65, y: 44.55
        }
        ;
        b[79]= {
            x: 154.65, y: 44.55
        }
        ;
        b[80]= {
            x: 183.65, y: 44.55
        }
        ;
        b[81]= {
            x: 300.65, y: 44.55
        }
        ;
        b[82]= {
            x: 96.65, y: 84.05
        }
        ;
        b[83]= {
            x: 125.15, y: 84.05
        }
        ;
        b[84]= {
            x: 154.15, y: 84.05
        }
        ;
        b[85]= {
            x: 183.15, y: 84.05
        }
        ;
        b[86]= {
            x: 212.15, y: 84.05
        }
        ;
        b[87]= {
            x: 67.65, y: 123.55
        }
        ;
        b[88]= {
            x: 96.15, y: 123.55
        }
        ;
        b[89]= {
            x: 125.15, y: 123.55
        }
        ;
        b[90]= {
            x: 154.15, y: 123.55
        }
        ;
        b[91]= {
            x: 183.15, y: 123.55
        }
        ;
        b[92]= {
            x: 212.15, y: 123.55
        }
        ;
        b[93]= {
            x: 241.15, y: 123.55
        }
        ;
        b[94]= {
            x: 96.65, y: 163.05
        }
        ;
        b[95]= {
            x: 125.15, y: 163.05
        }
        ;
        b[96]= {
            x: 154.15, y: 163.05
        }
        ;
        b[97]= {
            x: 183.15, y: 163.05
        }
        ;
        b[98]= {
            x: 212.15, y: 163.05
        }
        ;
        b[99]= {
            x: 9.65, y: 202.55
        }
        ;
        b[100]= {
            x: 125.65, y: 202.55
        }
        ;
        b[101]= {
            x: 154.65, y: 202.55
        }
        ;
        b[102]= {
            x: 183.65, y: 202.55
        }
        ;
        b[103]= {
            x: 300.65, y: 202.55
        }
        ;
        b[104]= {
            x: 9.65, y: 242.05
        }
        ;
        b[105]= {
            x: 38.65, y: 242.05
        }
        ;
        b[106]= {
            x: 154.65, y: 242.05
        }
        ;
        b[107]= {
            x: 271.65, y: 242.05
        }
        ;
        b[108]= {
            x: 300.65, y: 242.05
        }
        ;
        b[109]= {
            x: 9.65, y: 281.55
        }
        ;
        b[110]= {
            x: 38.65, y: 281.55
        }
        ;
        b[111]= {
            x: 67.65, y: 281.55
        }
        ;
        b[112]= {
            x: 241.65, y: 281.55
        }
        ;
        b[113]= {
            x: 271.65, y: 281.55
        }
        ;
        b[114]= {
            x: 300.65, y: 281.55
        }
        ;
        b[115]= {
            x: 5.15, y: 0
        }
        ;
        b[116]= {
            x: 295.65, y: 0
        }
        ;
        b[117]= {
            x: 149.9, y: 39.55
        }
        ;
        b[118]= {
            x: 120.95, y: 79.05
        }
        ;
        b[119]= {
            x: 149.95, y: 79.05
        }
        ;
        b[120]= {
            x: 178.95, y: 79.05
        }
        ;
        b[121]= {
            x: 91.95, y: 118.55
        }
        ;
        b[122]= {
            x: 120.95, y: 118.55
        }
        ;
        b[123]= {
            x: 149.95, y: 118.55
        }
        ;
        b[124]= {
            x: 178.95, y: 118.55
        }
        ;
        b[125]= {
            x: 207.95, y: 118.55
        }
        ;
        b[126]= {
            x: 120.95, y: 158.05
        }
        ;
        b[127]= {
            x: 149.95, y: 158.05
        }
        ;
        b[128]= {
            x: 178.95, y: 158.05
        }
        ;
        b[129]= {
            x: 149.95, y: 197.55
        }
        ;
        b[130]= {
            x: 5.15, y: 237.05
        }
        ;
        b[131]= {
            x: 295.65, y: 237.05
        }
        ;
        b[132]= {
            x: 5.15, y: 276.55
        }
        ;
        b[133]= {
            x: 34.15, y: 276.55
        }
        ;
        b[134]= {
            x: 266.15, y: 276.55
        }
        ;
        b[135]= {
            x: 296.15, y: 276.55
        }
        ;
        b[136]= {
            x: 145.2, y: 74.05
        }
        ;
        b[137]= {
            x: 116.25, y: 113.55
        }
        ;
        b[138]= {
            x: 145.25, y: 113.55
        }
        ;
        b[139]= {
            x: 174.25, y: 113.55
        }
        ;
        b[140]= {
            x: 145.25, y: 153.05
        }
        ;
        b[141]= {
            x: 0, y: 271.55
        }
        ;
        b[142]= {
            x: 289.95, y: 271.55
        }
        ;
        b[143]= {
            x: 140.5, y: 108.55
        }
        ;
        a[0]=[72,
        115];
        c[0]=[];
        e[0]=[];
        a[1]=[73];
        c[1]=[0];
        e[1]=[2];
        a[2]=[];
        c[2]=[];
        e[2]=[];
        a[3]=[];
        c[3]=[];
        e[3]=[];
        a[4]=[74];
        c[4]=[3];
        e[4]=[5];
        a[5]=[];
        c[5]=[];
        e[5]=[];
        a[6]=[];
        c[6]=[];
        e[6]=[];
        a[7]=[75];
        c[7]=[6];
        e[7]=[8];
        a[8]=[76,
        116];
        c[8]=[];
        e[8]=[];
        a[9]=[77];
        c[9]=[];
        e[9]=[];
        a[10]=[];
        c[10]=[];
        e[10]=[];
        a[11]=[];
        c[11]=[];
        e[11]=[];
        a[12]=[78];
        c[12]=[11];
        e[12]=[13];
        a[13]=[79,
        117];
        c[13]=[12];
        e[13]=[14];
        a[14]=[80];
        c[14]=[13];
        e[14]=[15];
        a[15]=[];
        c[15]=[];
        e[15]=[];
        a[16]=[];
        c[16]=[];
        e[16]=[];
        a[17]=[81];
        c[17]=[];
        e[17]=[];
        a[18]=[];
        c[18]=[];
        e[18]=[];
        a[19]=[];
        c[19]=[];
        e[19]=[];
        a[20]=[82];
        c[20]=[19];
        e[20]=[21];
        a[21]=[83,
        118];
        c[21]=[20];
        e[21]=[22];
        a[22]=[84,
        119,
        136];
        c[22]=[21];
        e[22]=[23];
        a[23]=[85,
        120];
        c[23]=[22];
        e[23]=[24];
        a[24]=[86];
        c[24]=[23];
        e[24]=[25];
        a[25]=[];
        c[25]=[];
        e[25]=[];
        a[26]=[];
        c[26]=[];
        e[26]=[];
        a[27]=[];
        c[27]=[];
        e[27]=[];
        a[28]=[87];
        c[28]=[27];
        e[28]=[29];
        a[29]=[88,
        121];
        c[29]=[28];
        e[29]=[30];
        a[30]=[89,
        122,
        137];
        c[30]=[29];
        e[30]=[31];
        a[31]=[90,
        123,
        138,
        143];
        c[31]=[30];
        e[31]=[32];
        a[32]=[91,
        124,
        139];
        c[32]=[31];
        e[32]=[33];
        a[33]=[92,
        125];
        c[33]=[32];
        e[33]=[34];
        a[34]=[93];
        c[34]=[33];
        e[34]=[35];
        a[35]=[];
        c[35]=[];
        e[35]=[];
        a[36]=[];
        c[36]=[];
        e[36]=[];
        a[37]=[];
        c[37]=[];
        e[37]=[];
        a[38]=[94];
        c[38]=[37];
        e[38]=[39];
        a[39]=[95,
        126];
        c[39]=[38];
        e[39]=[40];
        a[40]=[96,
        127,
        140];
        c[40]=[39];
        e[40]=[41];
        a[41]=[97,
        128];
        c[41]=[40];
        e[41]=[42];
        a[42]=[98];
        c[42]=[41];
        e[42]=[43];
        a[43]=[];
        c[43]=[];
        e[43]=[];
        a[44]=[];
        c[44]=[];
        e[44]=[];
        a[45]=[99];
        c[45]=[];
        e[45]=[];
        a[46]=[];
        c[46]=[];
        e[46]=[];
        a[47]=[];
        c[47]=[];
        e[47]=[];
        a[48]=[100];
        c[48]=[47];
        e[48]=[49];
        a[49]=[101,
        129];
        c[49]=[48];
        e[49]=[50];
        a[50]=[102];
        c[50]=[49];
        e[50]=[51];
        a[51]=[];
        c[51]=[];
        e[51]=[];
        a[52]=[];
        c[52]=[];
        e[52]=[];
        a[53]=[103];
        c[53]=[];
        e[53]=[];
        a[54]=[104,
        130];
        c[54]=[];
        e[54]=[];
        a[55]=[105];
        c[55]=[54];
        e[55]=[56];
        a[56]=[];
        c[56]=[];
        e[56]=[];
        a[57]=[];
        c[57]=[];
        e[57]=[];
        a[58]=[106];
        c[58]=[57];
        e[58]=[59];
        a[59]=[];
        c[59]=[];
        e[59]=[];
        a[60]=[];
        c[60]=[];
        e[60]=[];
        a[61]=[107];
        c[61]=[60];
        e[61]=[62];
        a[62]=[108,
        131];
        c[62]=[];
        e[62]=[];
        a[63]=[109,
        132,
        141];
        c[63]=[];
        e[63]=[];
        a[64]=[110,
        133];
        c[64]=[63];
        e[64]=[65];
        a[65]=[111];
        c[65]=[64];
        e[65]=[66];
        a[66]=[];
        c[66]=[];
        e[66]=[];
        a[67]=[];
        c[67]=[];
        e[67]=[];
        a[68]=[];
        c[68]=[];
        e[68]=[];
        a[69]=[112];
        c[69]=[68];
        e[69]=[70];
        a[70]=[113,
        134];
        c[70]=[69];
        e[70]=[71];
        a[71]=[114,
        135,
        142];
        c[71]=[];
        e[71]=[];
        a[72]=[115];
        c[72]=[];
        e[72]=[];
        a[73]=[];
        c[73]=[];
        e[73]=[];
        a[74]=[];
        c[74]=[];
        e[74]=[];
        a[75]=[];
        c[75]=[];
        e[75]=[];
        a[76]=[116];
        c[76]=[];
        e[76]=[];
        a[77]=[];
        c[77]=[];
        e[77]=[];
        a[78]=[];
        c[78]=[];
        e[78]=[];
        a[79]=[117];
        c[79]=[78];
        e[79]=[80];
        a[80]=[];
        c[80]=[];
        e[80]=[];
        a[81]=[];
        c[81]=[];
        e[81]=[];
        a[82]=[];
        c[82]=[];
        e[82]=[];
        a[83]=[118];
        c[83]=[82];
        e[83]=[84];
        a[84]=[119,
        136];
        c[84]=[83];
        e[84]=[85];
        a[85]=[120];
        c[85]=[84];
        e[85]=[86];
        a[86]=[];
        c[86]=[];
        e[86]=[];
        a[87]=[];
        c[87]=[];
        e[87]=[];
        a[88]=[121];
        c[88]=[87];
        e[88]=[89];
        a[89]=[122,
        137];
        c[89]=[88];
        e[89]=[90];
        a[90]=[123,
        138,
        143];
        c[90]=[89];
        e[90]=[91];
        a[91]=[124,
        139];
        c[91]=[90];
        e[91]=[92];
        a[92]=[125];
        c[92]=[91];
        e[92]=[93];
        a[93]=[];
        c[93]=[];
        e[93]=[];
        a[94]=[];
        c[94]=[];
        e[94]=[];
        a[95]=[126];
        c[95]=[94];
        e[95]=[96];
        a[96]=[127,
        140];
        c[96]=[95];
        e[96]=[97];
        a[97]=[128];
        c[97]=[96];
        e[97]=[98];
        a[98]=[];
        c[98]=[];
        e[98]=[];
        a[99]=[];
        c[99]=[];
        e[99]=[];
        a[100]=[];
        c[100]=[];
        e[100]=[];
        a[101]=[129];
        c[101]=[100];
        e[101]=[102];
        a[102]=[];
        c[102]=[];
        e[102]=[];
        a[103]=[];
        c[103]=[];
        e[103]=[];
        a[104]=[130];
        c[104]=[];
        e[104]=[];
        a[105]=[];
        c[105]=[];
        e[105]=[];
        a[106]=[];
        c[106]=[];
        e[106]=[];
        a[107]=[];
        c[107]=[];
        e[107]=[];
        a[108]=[131];
        c[108]=[];
        e[108]=[];
        a[109]=[132,
        141];
        c[109]=[];
        e[109]=[];
        a[110]=[133];
        c[110]=[109];
        e[110]=[111];
        a[111]=[];
        c[111]=[];
        e[111]=[];
        a[112]=[];
        c[112]=[];
        e[112]=[];
        a[113]=[134];
        c[113]=[112];
        e[113]=[114];
        a[114]=[135,
        142];
        c[114]=[];
        e[114]=[];
        a[115]=[];
        c[115]=[];
        e[115]=[];
        a[116]=[];
        c[116]=[];
        e[116]=[];
        a[117]=[];
        c[117]=[];
        e[117]=[];
        a[118]=[];
        c[118]=[];
        e[118]=[];
        a[119]=[136];
        c[119]=[118];
        e[119]=[120];
        a[120]=[];
        c[120]=[];
        e[120]=[];
        a[121]=[];
        c[121]=[];
        e[121]=[];
        a[122]=[137];
        c[122]=[121];
        e[122]=[123];
        a[123]=[138,
        143];
        c[123]=[122];
        e[123]=[124];
        a[124]=[139];
        c[124]=[123];
        e[124]=[125];
        a[125]=[];
        c[125]=[];
        e[125]=[];
        a[126]=[];
        c[126]=[];
        e[126]=[];
        a[127]=[140];
        c[127]=[126];
        e[127]=[128];
        a[128]=[];
        c[128]=[];
        e[128]=[];
        a[129]=[];
        c[129]=[];
        e[129]=[];
        a[130]=[];
        c[130]=[];
        e[130]=[];
        a[131]=[];
        c[131]=[];
        e[131]=[];
        a[132]=[141];
        c[132]=[];
        e[132]=[];
        a[133]=[];
        c[133]=[];
        e[133]=[];
        a[134]=[];
        c[134]=[];
        e[134]=[];
        a[135]=[142];
        c[135]=[];
        e[135]=[];
        a[136]=[];
        c[136]=[];
        e[136]=[];
        a[137]=[];
        c[137]=[];
        e[137]=[];
        a[138]=[143];
        c[138]=[137];
        e[138]=[139];
        a[139]=[];
        c[139]=[];
        e[139]=[];
        a[140]=[];
        c[140]=[];
        e[140]=[];
        a[141]=[];
        c[141]=[];
        e[141]=[];
        a[142]=[];
        c[142]=[];
        e[142]=[];
        a[143]=[];
        c[143]=[];
        e[143]=[];
        f[0]=[ {
            index: 1, decrease: 1
        }
        ];
        f[1]=[];
        f[2]=[ {
            index: 1, decrease: 1
        }
        ];
        f[3]=[ {
            index: 4, decrease: 1
        }
        ];
        f[4]=[];
        f[5]=[ {
            index: 4, decrease: 1
        }
        ];
        f[6]=[ {
            index: 7, decrease: 1
        }
        ];
        f[7]=[];
        f[8]=[ {
            index: 7, decrease: 1
        }
        ];
        f[9]=[];
        f[10]=[];
        f[11]=[ {
            index: 12, decrease: 1
        }
        ];
        f[12]=[ {
            index: 13, decrease: 1
        }
        ];
        f[13]=[ {
            index: 12, decrease: 1
        }
        ,
        {
            index: 14, decrease: 1
        }
        ];
        f[14]=[ {
            index: 13, decrease: 1
        }
        ];
        f[15]=[ {
            index: 14, decrease: 1
        }
        ];
        f[16]=[];
        f[17]=[];
        f[18]=[];
        f[19]=[ {
            index: 20, decrease: 1
        }
        ];
        f[20]=[ {
            index: 21, decrease: 1
        }
        ];
        f[21]=[ {
            index: 20, decrease: 1
        }
        ,
        {
            index: 22, decrease: 1
        }
        ];
        f[22]=[ {
            index: 21, decrease: 1
        }
        ,
        {
            index: 23, decrease: 1
        }
        ];
        f[23]=[ {
            index: 22, decrease: 1
        }
        ,
        {
            index: 24, decrease: 1
        }
        ];
        f[24]=[ {
            index: 23, decrease: 1
        }
        ];
        f[25]=[ {
            index: 24, decrease: 1
        }
        ];
        f[26]=[];
        f[27]=[ {
            index: 28, decrease: 1
        }
        ];
        f[28]=[ {
            index: 29, decrease: 1
        }
        ];
        f[29]=[ {
            index: 28, decrease: 1
        }
        ,
        {
            index: 30, decrease: 1
        }
        ];
        f[30]=[ {
            index: 29, decrease: 1
        }
        ,
        {
            index: 31, decrease: 1
        }
        ];
        f[31]=[ {
            index: 30, decrease: 1
        }
        ,
        {
            index: 32, decrease: 1
        }
        ];
        f[32]=[ {
            index: 31, decrease: 1
        }
        ,
        {
            index: 33, decrease: 1
        }
        ];
        f[33]=[ {
            index: 32, decrease: 1
        }
        ,
        {
            index: 34, decrease: 1
        }
        ];
        f[34]=[ {
            index: 33, decrease: 1
        }
        ];
        f[35]=[ {
            index: 34, decrease: 1
        }
        ];
        f[36]=[];
        f[37]=[ {
            index: 38, decrease: 1
        }
        ];
        f[38]=[ {
            index: 39, decrease: 1
        }
        ];
        f[39]=[ {
            index: 38, decrease: 1
        }
        ,
        {
            index: 40, decrease: 1
        }
        ];
        f[40]=[ {
            index: 39, decrease: 1
        }
        ,
        {
            index: 41, decrease: 1
        }
        ];
        f[41]=[ {
            index: 40, decrease: 1
        }
        ,
        {
            index: 42, decrease: 1
        }
        ];
        f[42]=[ {
            index: 41, decrease: 1
        }
        ];
        f[43]=[ {
            index: 42, decrease: 1
        }
        ];
        f[44]=[];
        f[45]=[];
        f[46]=[];
        f[47]=[ {
            index: 48, decrease: 1
        }
        ];
        f[48]=[ {
            index: 49, decrease: 1
        }
        ];
        f[49]=[ {
            index: 48, decrease: 1
        }
        ,
        {
            index: 50, decrease: 1
        }
        ];
        f[50]=[ {
            index: 49, decrease: 1
        }
        ];
        f[51]=[ {
            index: 50, decrease: 1
        }
        ];
        f[52]=[];
        f[53]=[];
        f[54]=[ {
            index: 55, decrease: 1
        }
        ];
        f[55]=[];
        f[56]=[ {
            index: 55, decrease: 1
        }
        ];
        f[57]=[ {
            index: 58, decrease: 1
        }
        ];
        f[58]=[];
        f[59]=[ {
            index: 58, decrease: 1
        }
        ];
        f[60]=[ {
            index: 61, decrease: 1
        }
        ];
        f[61]=[];
        f[62]=[ {
            index: 61, decrease: 1
        }
        ];
        f[63]=[ {
            index: 64, decrease: 1
        }
        ];
        f[64]=[ {
            index: 65, decrease: 1
        }
        ];
        f[65]=[ {
            index: 64, decrease: 1
        }
        ];
        f[66]=[ {
            index: 65, decrease: 1
        }
        ];
        f[67]=[];
        f[68]=[ {
            index: 69, decrease: 1
        }
        ];
        f[69]=[ {
            index: 70, decrease: 1
        }
        ];
        f[70]=[ {
            index: 69, decrease: 1
        }
        ];
        f[71]=[ {
            index: 70, decrease: 1
        }
        ];
        f[72]=[ {
            index: 0, decrease: 1
        }
        ];
        f[73]=[ {
            index: 1, decrease: 1
        }
        ];
        f[74]=[ {
            index: 4, decrease: 1
        }
        ];
        f[75]=[ {
            index: 7, decrease: 1
        }
        ];
        f[76]=[ {
            index: 8, decrease: 1
        }
        ];
        f[77]=[ {
            index: 9, decrease: 1
        }
        ];
        f[78]=[ {
            index: 12, decrease: 1
        }
        ,
        {
            index: 79, decrease: 1
        }
        ];
        f[79]=[ {
            index: 13, decrease: 1
        }
        ];
        f[80]=[ {
            index: 14, decrease: 1
        }
        ,
        {
            index: 79, decrease: 1
        }
        ];
        f[81]=[ {
            index: 17, decrease: 1
        }
        ];
        f[82]=[ {
            index: 20, decrease: 1
        }
        ,
        {
            index: 83, decrease: 1
        }
        ];
        f[83]=[ {
            index: 21, decrease: 1
        }
        ,
        {
            index: 84, decrease: 1
        }
        ];
        f[84]=[ {
            index: 22, decrease: 1
        }
        ,
        {
            index: 83, decrease: 1
        }
        ,
        {
            index: 85, decrease: 1
        }
        ];
        f[85]=[ {
            index: 23, decrease: 1
        }
        ,
        {
            index: 84, decrease: 1
        }
        ];
        f[86]=[ {
            index: 24, decrease: 1
        }
        ,
        {
            index: 85, decrease: 1
        }
        ];
        f[87]=[ {
            index: 88, decrease: 1
        }
        ,
        {
            index: 28, decrease: 1
        }
        ];
        f[88]=[ {
            index: 89, decrease: 1
        }
        ,
        {
            index: 29, decrease: 1
        }
        ];
        f[89]=[ {
            index: 88, decrease: 1
        }
        ,
        {
            index: 90, decrease: 1
        }
        ,
        {
            index: 30, decrease: 1
        }
        ];
        f[90]=[ {
            index: 89, decrease: 1
        }
        ,
        {
            index: 91, decrease: 1
        }
        ,
        {
            index: 31, decrease: 1
        }
        ];
        f[91]=[ {
            index: 92, decrease: 1
        }
        ,
        {
            index: 90, decrease: 1
        }
        ,
        {
            index: 32, decrease: 1
        }
        ];
        f[92]=[ {
            index: 91, decrease: 1
        }
        ,
        {
            index: 33, decrease: 1
        }
        ];
        f[93]=[ {
            index: 92, decrease: 1
        }
        ,
        {
            index: 34, decrease: 1
        }
        ];
        f[94]=[ {
            index: 95, decrease: 1
        }
        ,
        {
            index: 38, decrease: 1
        }
        ];
        f[95]=[ {
            index: 96, decrease: 1
        }
        ,
        {
            index: 39, decrease: 1
        }
        ];
        f[96]=[ {
            index: 95, decrease: 1
        }
        ,
        {
            index: 97, decrease: 1
        }
        ,
        {
            index: 40, decrease: 1
        }
        ];
        f[97]=[ {
            index: 96, decrease: 1
        }
        ,
        {
            index: 41, decrease: 1
        }
        ];
        f[98]=[ {
            index: 97, decrease: 1
        }
        ,
        {
            index: 42, decrease: 1
        }
        ];
        f[99]=[ {
            index: 45, decrease: 1
        }
        ];
        f[100]=[ {
            index: 101, decrease: 1
        }
        ,
        {
            index: 48, decrease: 1
        }
        ];
        f[101]=[ {
            index: 49, decrease: 1
        }
        ];
        f[102]=[ {
            index: 101, decrease: 1
        }
        ,
        {
            index: 50, decrease: 1
        }
        ];
        f[103]=[ {
            index: 53, decrease: 1
        }
        ];
        f[104]=[ {
            index: 54, decrease: 1
        }
        ];
        f[105]=[ {
            index: 55, decrease: 1
        }
        ];
        f[106]=[ {
            index: 58, decrease: 1
        }
        ];
        f[107]=[ {
            index: 61, decrease: 1
        }
        ];
        f[108]=[ {
            index: 62, decrease: 1
        }
        ];
        f[109]=[ {
            index: 110, decrease: 1
        }
        ,
        {
            index: 63, decrease: 1
        }
        ];
        f[110]=[ {
            index: 64, decrease: 1
        }
        ];
        f[111]=[ {
            index: 110, decrease: 1
        }
        ,
        {
            index: 65, decrease: 1
        }
        ];
        f[112]=[ {
            index: 113, decrease: 1
        }
        ,
        {
            index: 69, decrease: 1
        }
        ];
        f[113]=[ {
            index: 70, decrease: 1
        }
        ];
        f[114]=[ {
            index: 113, decrease: 1
        }
        ,
        {
            index: 71, decrease: 1
        }
        ];
        f[115]=[ {
            index: 72, decrease: 1
        }
        ,
        {
            index: 0, decrease: 1
        }
        ];
        f[116]=[ {
            index: 8, decrease: 1
        }
        ,
        {
            index: 76, decrease: 1
        }
        ];
        f[117]=[ {
            index: 13, decrease: 1
        }
        ,
        {
            index: 79, decrease: 1
        }
        ];
        f[118]=[ {
            index: 21, decrease: 1
        }
        ,
        {
            index: 119, decrease: 1
        }
        ,
        {
            index: 83, decrease: 1
        }
        ];
        f[119]=[ {
            index: 22, decrease: 1
        }
        ,
        {
            index: 84, decrease: 1
        }
        ];
        f[120]=[ {
            index: 23, decrease: 1
        }
        ,
        {
            index: 119, decrease: 1
        }
        ,
        {
            index: 85, decrease: 1
        }
        ];
        f[121]=[ {
            index: 88, decrease: 1
        }
        ,
        {
            index: 29, decrease: 1
        }
        ,
        {
            index: 122, decrease: 1
        }
        ];
        f[122]=[ {
            index: 89, decrease: 1
        }
        ,
        {
            index: 30, decrease: 1
        }
        ,
        {
            index: 123, decrease: 1
        }
        ];
        f[123]=[ {
            index: 90, decrease: 1
        }
        ,
        {
            index: 31, decrease: 1
        }
        ,
        {
            index: 122, decrease: 1
        }
        ,
        {
            index: 124, decrease: 1
        }
        ];
        f[124]=[ {
            index: 91, decrease: 1
        }
        ,
        {
            index: 32, decrease: 1
        }
        ,
        {
            index: 123, decrease: 1
        }
        ];
        f[125]=[ {
            index: 92, decrease: 1
        }
        ,
        {
            index: 33, decrease: 1
        }
        ,
        {
            index: 124, decrease: 1
        }
        ];
        f[126]=[ {
            index: 95, decrease: 1
        }
        ,
        {
            index: 39, decrease: 1
        }
        ,
        {
            index: 127, decrease: 1
        }
        ];
        f[127]=[ {
            index: 96, decrease: 1
        }
        ,
        {
            index: 40, decrease: 1
        }
        ];
        f[128]=[ {
            index: 97, decrease: 1
        }
        ,
        {
            index: 41, decrease: 1
        }
        ,
        {
            index: 127, decrease: 1
        }
        ];
        f[129]=[ {
            index: 101, decrease: 1
        }
        ,
        {
            index: 49, decrease: 1
        }
        ];
        f[130]=[ {
            index: 104, decrease: 1
        }
        ,
        {
            index: 54, decrease: 1
        }
        ];
        f[131]=[ {
            index: 108, decrease: 1
        }
        ,
        {
            index: 62, decrease: 1
        }
        ];
        f[132]=[ {
            index: 109, decrease: 1
        }
        ,
        {
            index: 63, decrease: 1
        }
        ];
        f[133]=[ {
            index: 110, decrease: 1
        }
        ,
        {
            index: 64, decrease: 1
        }
        ];
        f[134]=[ {
            index: 113, decrease: 1
        }
        ,
        {
            index: 70, decrease: 1
        }
        ];
        f[135]=[ {
            index: 114, decrease: 1
        }
        ,
        {
            index: 71, decrease: 1
        }
        ];
        f[136]=[ {
            index: 22, decrease: 1
        }
        ,
        {
            index: 119, decrease: 1
        }
        ,
        {
            index: 84, decrease: 1
        }
        ];
        f[137]=[ {
            index: 89, decrease: 1
        }
        ,
        {
            index: 30, decrease: 1
        }
        ,
        {
            index: 122, decrease: 1
        }
        ,
        {
            index: 138, decrease: 1
        }
        ];
        f[138]=[ {
            index: 90, decrease: 1
        }
        ,
        {
            index: 31, decrease: 1
        }
        ,
        {
            index: 123, decrease: 1
        }
        ];
        f[139]=[ {
            index: 91, decrease: 1
        }
        ,
        {
            index: 32, decrease: 1
        }
        ,
        {
            index: 124, decrease: 1
        }
        ,
        {
            index: 138, decrease: 1
        }
        ];
        f[140]=[ {
            index: 96, decrease: 1
        }
        ,
        {
            index: 40, decrease: 1
        }
        ,
        {
            index: 127, decrease: 1
        }
        ];
        f[141]=[ {
            index: 109, decrease: 1
        }
        ,
        {
            index: 63, decrease: 1
        }
        ,
        {
            index: 132, decrease: 1
        }
        ];
        f[142]=[ {
            index: 114, decrease: 1
        }
        ,
        {
            index: 71, decrease: 1
        }
        ,
        {
            index: 135, decrease: 1
        }
        ];
        f[143]=[ {
            index: 90, decrease: 1
        }
        ,
        {
            index: 31, decrease: 1
        }
        ,
        {
            index: 123, decrease: 1
        }
        ,
        {
            index: 138, decrease: 1
        }
        ];
        d[0]=0;
        d[1]=0;
        d[2]=0;
        d[3]=0;
        d[4]=0;
        d[5]=0;
        d[6]=0;
        d[7]=0;
        d[8]=0;
        d[9]=0;
        d[10]=0;
        d[11]=0;
        d[12]=0;
        d[13]=0;
        d[14]=0;
        d[15]=0;
        d[16]=0;
        d[17]=0;
        d[18]=0;
        d[19]=0;
        d[20]=0;
        d[21]=0;
        d[22]=0;
        d[23]=0;
        d[24]=0;
        d[25]=0;
        d[26]=0;
        d[27]=0;
        d[28]=0;
        d[29]=0;
        d[30]=0;
        d[31]=0;
        d[32]=0;
        d[33]=0;
        d[34]=0;
        d[35]=0;
        d[36]=0;
        d[37]=0;
        d[38]=0;
        d[39]=0;
        d[40]=0;
        d[41]=0;
        d[42]=0;
        d[43]=0;
        d[44]=0;
        d[45]=0;
        d[46]=0;
        d[47]=0;
        d[48]=0;
        d[49]=0;
        d[50]=0;
        d[51]=0;
        d[52]=0;
        d[53]=0;
        d[54]=0;
        d[55]=0;
        d[56]=0;
        d[57]=0;
        d[58]=0;
        d[59]=0;
        d[60]=0;
        d[61]=0;
        d[62]=0;
        d[63]=0;
        d[64]=0;
        d[65]=0;
        d[66]=0;
        d[67]=0;
        d[68]=0;
        d[69]=0;
        d[70]=0;
        d[71]=0;
        d[72]=1;
        d[73]=1;
        d[74]=1;
        d[75]=1;
        d[76]=1;
        d[77]=1;
        d[78]=1;
        d[79]=1;
        d[80]=1;
        d[81]=1;
        d[82]=1;
        d[83]=1;
        d[84]=1;
        d[85]=1;
        d[86]=1;
        d[87]=1;
        d[88]=1;
        d[89]=1;
        d[90]=1;
        d[91]=1;
        d[92]=1;
        d[93]=1;
        d[94]=1;
        d[95]=1;
        d[96]=1;
        d[97]=1;
        d[98]=1;
        d[99]=1;
        d[100]=1;
        d[101]=1;
        d[102]=1;
        d[103]=1;
        d[104]=1;
        d[105]=1;
        d[106]=1;
        d[107]=1;
        d[108]=1;
        d[109]=1;
        d[110]=1;
        d[111]=1;
        d[112]=1;
        d[113]=1;
        d[114]=1;
        d[115]=2;
        d[116]=2;
        d[117]=2;
        d[118]=2;
        d[119]=2;
        d[120]=2;
        d[121]=2;
        d[122]=2;
        d[123]=2;
        d[124]=2;
        d[125]=2;
        d[126]=2;
        d[127]=2;
        d[128]=2;
        d[129]=2;
        d[130]=2;
        d[131]=2;
        d[132]=2;
        d[133]=2;
        d[134]=2;
        d[135]=2;
        d[136]=3;
        d[137]=3;
        d[138]=3;
        d[139]=3;
        d[140]=3;
        d[141]=3;
        d[142]=3;
        d[143]=4
    }
    ;
    this.initLayoutPyramids=function() {
        h= {
            x: 125, y: 50
        }
        ;
        g=SCORE_BONUS_LAYOUT_HARD;
        b[0]= {
            x: 29.5, y: 0
        }
        ;
        b[1]= {
            x: 116.5, y: 0
        }
        ;
        b[2]= {
            x: 203.5, y: 0
        }
        ;
        b[3]= {
            x: 290.5, y: 0
        }
        ;
        b[4]= {
            x: 15, y: 63
        }
        ;
        b[5]= {
            x: 44, y: 63
        }
        ;
        b[6]= {
            x: 102, y: 63
        }
        ;
        b[7]= {
            x: 131, y: 63
        }
        ;
        b[8]= {
            x: 189, y: 63
        }
        ;
        b[9]= {
            x: 218, y: 63
        }
        ;
        b[10]= {
            x: 276, y: 63
        }
        ;
        b[11]= {
            x: 305, y: 63
        }
        ;
        b[12]= {
            x: 15, y: 102.5
        }
        ;
        b[13]= {
            x: 44, y: 102.5
        }
        ;
        b[14]= {
            x: 102, y: 102.5
        }
        ;
        b[15]= {
            x: 131, y: 102.5
        }
        ;
        b[16]= {
            x: 189, y: 102.5
        }
        ;
        b[17]= {
            x: 218, y: 102.5
        }
        ;
        b[18]= {
            x: 276, y: 102.5
        }
        ;
        b[19]= {
            x: 305, y: 102.5
        }
        ;
        b[20]= {
            x: 15, y: 181.5
        }
        ;
        b[21]= {
            x: 44, y: 181.5
        }
        ;
        b[22]= {
            x: 102, y: 181.5
        }
        ;
        b[23]= {
            x: 131, y: 181.5
        }
        ;
        b[24]= {
            x: 189, y: 181.5
        }
        ;
        b[25]= {
            x: 218, y: 181.5
        }
        ;
        b[26]= {
            x: 276, y: 181.5
        }
        ;
        b[27]= {
            x: 305, y: 181.5
        }
        ;
        b[28]= {
            x: 15, y: 221
        }
        ;
        b[29]= {
            x: 44, y: 221
        }
        ;
        b[30]= {
            x: 102, y: 221
        }
        ;
        b[31]= {
            x: 131, y: 221
        }
        ;
        b[32]= {
            x: 189, y: 221
        }
        ;
        b[33]= {
            x: 218, y: 221
        }
        ;
        b[34]= {
            x: 276, y: 221
        }
        ;
        b[35]= {
            x: 305, y: 221
        }
        ;
        b[36]= {
            x: 29.5, y: 284
        }
        ;
        b[37]= {
            x: 116.5, y: 284
        }
        ;
        b[38]= {
            x: 203.5, y: 284
        }
        ;
        b[39]= {
            x: 290.5, y: 284
        }
        ;
        b[40]= {
            x: 9.5, y: 57.45
        }
        ;
        b[41]= {
            x: 38.5, y: 57.4
        }
        ;
        b[42]= {
            x: 96.5, y: 57.4
        }
        ;
        b[43]= {
            x: 125.5, y: 57.4
        }
        ;
        b[44]= {
            x: 183.5, y: 57.4
        }
        ;
        b[45]= {
            x: 212.5, y: 57.4
        }
        ;
        b[46]= {
            x: 270.5, y: 57.4
        }
        ;
        b[47]= {
            x: 299.5, y: 57.4
        }
        ;
        b[48]= {
            x: 9.5, y: 96.9
        }
        ;
        b[49]= {
            x: 38.5, y: 96.9
        }
        ;
        b[50]= {
            x: 96.5, y: 96.9
        }
        ;
        b[51]= {
            x: 125.5, y: 96.9
        }
        ;
        b[52]= {
            x: 183.5, y: 96.9
        }
        ;
        b[53]= {
            x: 212.5, y: 96.9
        }
        ;
        b[54]= {
            x: 270.5, y: 96.9
        }
        ;
        b[55]= {
            x: 299.5, y: 96.9
        }
        ;
        b[56]= {
            x: 9.5, y: 175.9
        }
        ;
        b[57]= {
            x: 38.5, y: 175.9
        }
        ;
        b[58]= {
            x: 96.5, y: 175.9
        }
        ;
        b[59]= {
            x: 125.5, y: 175.9
        }
        ;
        b[60]= {
            x: 183.5, y: 175.9
        }
        ;
        b[61]= {
            x: 212.5, y: 175.9
        }
        ;
        b[62]= {
            x: 270.5, y: 175.9
        }
        ;
        b[63]= {
            x: 299.5, y: 175.9
        }
        ;
        b[64]= {
            x: 9.5, y: 215.4
        }
        ;
        b[65]= {
            x: 38.5, y: 215.4
        }
        ;
        b[66]= {
            x: 96.5, y: 215.4
        }
        ;
        b[67]= {
            x: 125.5, y: 215.4
        }
        ;
        b[68]= {
            x: 183.5, y: 215.4
        }
        ;
        b[69]= {
            x: 212.5, y: 215.4
        }
        ;
        b[70]= {
            x: 270.5, y: 215.4
        }
        ;
        b[71]= {
            x: 299.5, y: 215.4
        }
        ;
        b[72]= {
            x: 5, y: 52.45
        }
        ;
        b[73]= {
            x: 34, y: 52.45
        }
        ;
        b[74]= {
            x: 92, y: 52.4
        }
        ;
        b[75]= {
            x: 121, y: 52.4
        }
        ;
        b[76]= {
            x: 179, y: 52.4
        }
        ;
        b[77]= {
            x: 208, y: 52.4
        }
        ;
        b[78]= {
            x: 266, y: 52.4
        }
        ;
        b[79]= {
            x: 295, y: 52.4
        }
        ;
        b[80]= {
            x: 5, y: 91.9
        }
        ;
        b[81]= {
            x: 34, y: 91.9
        }
        ;
        b[82]= {
            x: 92, y: 91.9
        }
        ;
        b[83]= {
            x: 121, y: 91.9
        }
        ;
        b[84]= {
            x: 179, y: 91.9
        }
        ;
        b[85]= {
            x: 208, y: 91.9
        }
        ;
        b[86]= {
            x: 266, y: 91.9
        }
        ;
        b[87]= {
            x: 295, y: 91.9
        }
        ;
        b[88]= {
            x: 5, y: 170.9
        }
        ;
        b[89]= {
            x: 34, y: 170.9
        }
        ;
        b[90]= {
            x: 92, y: 170.9
        }
        ;
        b[91]= {
            x: 121, y: 170.9
        }
        ;
        b[92]= {
            x: 179, y: 170.9
        }
        ;
        b[93]= {
            x: 208, y: 170.9
        }
        ;
        b[94]= {
            x: 266, y: 170.9
        }
        ;
        b[95]= {
            x: 295, y: 170.9
        }
        ;
        b[96]= {
            x: 5, y: 210.4
        }
        ;
        b[97]= {
            x: 34, y: 210.4
        }
        ;
        b[98]= {
            x: 92, y: 210.4
        }
        ;
        b[99]= {
            x: 121, y: 210.4
        }
        ;
        b[100]= {
            x: 179, y: 210.4
        }
        ;
        b[101]= {
            x: 208, y: 210.4
        }
        ;
        b[102]= {
            x: 266, y: 210.4
        }
        ;
        b[103]= {
            x: 295, y: 210.4
        }
        ;
        b[104]= {
            x: 0, y: 47.4
        }
        ;
        b[105]= {
            x: 29, y: 47.4
        }
        ;
        b[106]= {
            x: 87, y: 47.4
        }
        ;
        b[107]= {
            x: 116, y: 47.4
        }
        ;
        b[108]= {
            x: 174, y: 47.4
        }
        ;
        b[109]= {
            x: 203, y: 47.4
        }
        ;
        b[110]= {
            x: 261, y: 47.4
        }
        ;
        b[111]= {
            x: 290, y: 47.4
        }
        ;
        b[112]= {
            x: 0, y: 86.9
        }
        ;
        b[113]= {
            x: 29, y: 86.9
        }
        ;
        b[114]= {
            x: 87, y: 86.9
        }
        ;
        b[115]= {
            x: 116, y: 86.9
        }
        ;
        b[116]= {
            x: 174, y: 86.9
        }
        ;
        b[117]= {
            x: 203, y: 86.9
        }
        ;
        b[118]= {
            x: 261, y: 86.9
        }
        ;
        b[119]= {
            x: 290, y: 86.9
        }
        ;
        b[120]= {
            x: 0, y: 165.9
        }
        ;
        b[121]= {
            x: 29, y: 165.9
        }
        ;
        b[122]= {
            x: 87, y: 165.9
        }
        ;
        b[123]= {
            x: 116, y: 165.9
        }
        ;
        b[124]= {
            x: 174, y: 165.9
        }
        ;
        b[125]= {
            x: 203, y: 165.9
        }
        ;
        b[126]= {
            x: 261, y: 165.9
        }
        ;
        b[127]= {
            x: 290, y: 165.9
        }
        ;
        b[128]= {
            x: 0, y: 205.4
        }
        ;
        b[129]= {
            x: 29, y: 205.4
        }
        ;
        b[130]= {
            x: 87, y: 205.4
        }
        ;
        b[131]= {
            x: 116, y: 205.4
        }
        ;
        b[132]= {
            x: 174, y: 205.4
        }
        ;
        b[133]= {
            x: 203, y: 205.4
        }
        ;
        b[134]= {
            x: 261, y: 205.4
        }
        ;
        b[135]= {
            x: 290, y: 205.4
        }
        ;
        b[136]= {
            x: 14.5, y: 66.6
        }
        ;
        b[137]= {
            x: 101.5, y: 66.6
        }
        ;
        b[138]= {
            x: 188.5, y: 66.6
        }
        ;
        b[139]= {
            x: 275.5, y: 66.6
        }
        ;
        b[140]= {
            x: 14.5, y: 185.1
        }
        ;
        b[141]= {
            x: 101.5, y: 185.1
        }
        ;
        b[142]= {
            x: 188.5, y: 185.1
        }
        ;
        b[143]= {
            x: 275.5, y: 185.1
        }
        ;
        a[0]=[];
        c[0]=[];
        e[0]=[];
        a[1]=[];
        c[1]=[];
        e[1]=[];
        a[2]=[];
        c[2]=[];
        e[2]=[];
        a[3]=[];
        c[3]=[];
        e[3]=[];
        a[4]=[40,
        72,
        104,
        136];
        c[4]=[];
        e[4]=[];
        a[5]=[41,
        73,
        105,
        136];
        c[5]=[];
        e[5]=[];
        a[6]=[42,
        74,
        106,
        137];
        c[6]=[];
        e[6]=[];
        a[7]=[43,
        75,
        107,
        137];
        c[7]=[];
        e[7]=[];
        a[8]=[44,
        76,
        108,
        138];
        c[8]=[];
        e[8]=[];
        a[9]=[45,
        77,
        109,
        138];
        c[9]=[];
        e[9]=[];
        a[10]=[46,
        78,
        110,
        139];
        c[10]=[];
        e[10]=[];
        a[11]=[47,
        79,
        111,
        139];
        c[11]=[];
        e[11]=[];
        a[12]=[48,
        80,
        112,
        136];
        c[12]=[];
        e[12]=[];
        a[13]=[49,
        81,
        113,
        136];
        c[13]=[];
        e[13]=[];
        a[14]=[50,
        82,
        114,
        137];
        c[14]=[];
        e[14]=[];
        a[15]=[51,
        83,
        115,
        137];
        c[15]=[];
        e[15]=[];
        a[16]=[52,
        84,
        116,
        138];
        c[16]=[];
        e[16]=[];
        a[17]=[53,
        85,
        117,
        138];
        c[17]=[];
        e[17]=[];
        a[18]=[54,
        86,
        118,
        139];
        c[18]=[];
        e[18]=[];
        a[19]=[55,
        87,
        119,
        139];
        c[19]=[];
        e[19]=[];
        a[20]=[56,
        88,
        120,
        140];
        c[20]=[];
        e[20]=[];
        a[21]=[57,
        89,
        121,
        140];
        c[21]=[];
        e[21]=[];
        a[22]=[58,
        90,
        122,
        141];
        c[22]=[];
        e[22]=[];
        a[23]=[59,
        91,
        123,
        141];
        c[23]=[];
        e[23]=[];
        a[24]=[60,
        92,
        124,
        142];
        c[24]=[];
        e[24]=[];
        a[25]=[61,
        93,
        125,
        142];
        c[25]=[];
        e[25]=[];
        a[26]=[62,
        94,
        126,
        143];
        c[26]=[];
        e[26]=[];
        a[27]=[63,
        95,
        127,
        143];
        c[27]=[];
        e[27]=[];
        a[28]=[64,
        96,
        128,
        140];
        c[28]=[];
        e[28]=[];
        a[29]=[65,
        97,
        129,
        140];
        c[29]=[];
        e[29]=[];
        a[30]=[66,
        98,
        130,
        141];
        c[30]=[];
        e[30]=[];
        a[31]=[67,
        99,
        131,
        141];
        c[31]=[];
        e[31]=[];
        a[32]=[68,
        100,
        132,
        142];
        c[32]=[];
        e[32]=[];
        a[33]=[69,
        101,
        133,
        142];
        c[33]=[];
        e[33]=[];
        a[34]=[70,
        102,
        134,
        143];
        c[34]=[];
        e[34]=[];
        a[35]=[71,
        103,
        135,
        143];
        c[35]=[];
        e[35]=[];
        a[36]=[];
        c[36]=[];
        e[36]=[];
        a[37]=[];
        c[37]=[];
        e[37]=[];
        a[38]=[];
        c[38]=[];
        e[38]=[];
        a[39]=[];
        c[39]=[];
        e[39]=[];
        a[40]=[72,
        104,
        136];
        c[40]=[];
        e[40]=[];
        a[41]=[73,
        105,
        136];
        c[41]=[];
        e[41]=[];
        a[42]=[74,
        106,
        137];
        c[42]=[];
        e[42]=[];
        a[43]=[75,
        107,
        137];
        c[43]=[];
        e[43]=[];
        a[44]=[76,
        108,
        138];
        c[44]=[];
        e[44]=[];
        a[45]=[77,
        109,
        138];
        c[45]=[];
        e[45]=[];
        a[46]=[78,
        110,
        139];
        c[46]=[];
        e[46]=[];
        a[47]=[79,
        111,
        139];
        c[47]=[];
        e[47]=[];
        a[48]=[80,
        112,
        136];
        c[48]=[];
        e[48]=[];
        a[49]=[81,
        113,
        136];
        c[49]=[];
        e[49]=[];
        a[50]=[82,
        114,
        137];
        c[50]=[];
        e[50]=[];
        a[51]=[83,
        115,
        137];
        c[51]=[];
        e[51]=[];
        a[52]=[84,
        116,
        138];
        c[52]=[];
        e[52]=[];
        a[53]=[85,
        117,
        138];
        c[53]=[];
        e[53]=[];
        a[54]=[86,
        118,
        139];
        c[54]=[];
        e[54]=[];
        a[55]=[87,
        119,
        139];
        c[55]=[];
        e[55]=[];
        a[56]=[88,
        120,
        140];
        c[56]=[];
        e[56]=[];
        a[57]=[89,
        121,
        140];
        c[57]=[];
        e[57]=[];
        a[58]=[90,
        122,
        141];
        c[58]=[];
        e[58]=[];
        a[59]=[91,
        123,
        141];
        c[59]=[];
        e[59]=[];
        a[60]=[92,
        124,
        142];
        c[60]=[];
        e[60]=[];
        a[61]=[93,
        125,
        142];
        c[61]=[];
        e[61]=[];
        a[62]=[94,
        126,
        143];
        c[62]=[];
        e[62]=[];
        a[63]=[95,
        127,
        143];
        c[63]=[];
        e[63]=[];
        a[64]=[96,
        128,
        140];
        c[64]=[];
        e[64]=[];
        a[65]=[97,
        129,
        140];
        c[65]=[];
        e[65]=[];
        a[66]=[98,
        130,
        141];
        c[66]=[];
        e[66]=[];
        a[67]=[99,
        131,
        141];
        c[67]=[];
        e[67]=[];
        a[68]=[100,
        132,
        142];
        c[68]=[];
        e[68]=[];
        a[69]=[101,
        133,
        142];
        c[69]=[];
        e[69]=[];
        a[70]=[102,
        134,
        143];
        c[70]=[];
        e[70]=[];
        a[71]=[103,
        135,
        143];
        c[71]=[];
        e[71]=[];
        a[72]=[104,
        136];
        c[72]=[];
        e[72]=[];
        a[73]=[105,
        136];
        c[73]=[];
        e[73]=[];
        a[74]=[106,
        137];
        c[74]=[];
        e[74]=[];
        a[75]=[107,
        137];
        c[75]=[];
        e[75]=[];
        a[76]=[108,
        138];
        c[76]=[];
        e[76]=[];
        a[77]=[109,
        138];
        c[77]=[];
        e[77]=[];
        a[78]=[110,
        139];
        c[78]=[];
        e[78]=[];
        a[79]=[111,
        139];
        c[79]=[];
        e[79]=[];
        a[80]=[112,
        136];
        c[80]=[];
        e[80]=[];
        a[81]=[113,
        136];
        c[81]=[];
        e[81]=[];
        a[82]=[114,
        137];
        c[82]=[];
        e[82]=[];
        a[83]=[115,
        137];
        c[83]=[];
        e[83]=[];
        a[84]=[116,
        138];
        c[84]=[];
        e[84]=[];
        a[85]=[117,
        138];
        c[85]=[];
        e[85]=[];
        a[86]=[118,
        139];
        c[86]=[];
        e[86]=[];
        a[87]=[119,
        139];
        c[87]=[];
        e[87]=[];
        a[88]=[120,
        140];
        c[88]=[];
        e[88]=[];
        a[89]=[121,
        140];
        c[89]=[];
        e[89]=[];
        a[90]=[122,
        141];
        c[90]=[];
        e[90]=[];
        a[91]=[123,
        141];
        c[91]=[];
        e[91]=[];
        a[92]=[124,
        142];
        c[92]=[];
        e[92]=[];
        a[93]=[125,
        142];
        c[93]=[];
        e[93]=[];
        a[94]=[126,
        143];
        c[94]=[];
        e[94]=[];
        a[95]=[127,
        143];
        c[95]=[];
        e[95]=[];
        a[96]=[128,
        140];
        c[96]=[];
        e[96]=[];
        a[97]=[129,
        140];
        c[97]=[];
        e[97]=[];
        a[98]=[130,
        141];
        c[98]=[];
        e[98]=[];
        a[99]=[131,
        141];
        c[99]=[];
        e[99]=[];
        a[100]=[132,
        142];
        c[100]=[];
        e[100]=[];
        a[101]=[133,
        142];
        c[101]=[];
        e[101]=[];
        a[102]=[134,
        143];
        c[102]=[];
        e[102]=[];
        a[103]=[135,
        143];
        c[103]=[];
        e[103]=[];
        a[104]=[136];
        c[104]=[];
        e[104]=[];
        a[105]=[136];
        c[105]=[];
        e[105]=[];
        a[106]=[137];
        c[106]=[];
        e[106]=[];
        a[107]=[137];
        c[107]=[];
        e[107]=[];
        a[108]=[138];
        c[108]=[];
        e[108]=[];
        a[109]=[138];
        c[109]=[];
        e[109]=[];
        a[110]=[139];
        c[110]=[];
        e[110]=[];
        a[111]=[139];
        c[111]=[];
        e[111]=[];
        a[112]=[136];
        c[112]=[];
        e[112]=[];
        a[113]=[136];
        c[113]=[];
        e[113]=[];
        a[114]=[137];
        c[114]=[];
        e[114]=[];
        a[115]=[137];
        c[115]=[];
        e[115]=[];
        a[116]=[138];
        c[116]=[];
        e[116]=[];
        a[117]=[138];
        c[117]=[];
        e[117]=[];
        a[118]=[139];
        c[118]=[];
        e[118]=[];
        a[119]=[139];
        c[119]=[];
        e[119]=[];
        a[120]=[140];
        c[120]=[];
        e[120]=[];
        a[121]=[140];
        c[121]=[];
        e[121]=[];
        a[122]=[141];
        c[122]=[];
        e[122]=[];
        a[123]=[141];
        c[123]=[];
        e[123]=[];
        a[124]=[142];
        c[124]=[];
        e[124]=[];
        a[125]=[142];
        c[125]=[];
        e[125]=[];
        a[126]=[143];
        c[126]=[];
        e[126]=[];
        a[127]=[143];
        c[127]=[];
        e[127]=[];
        a[128]=[140];
        c[128]=[];
        e[128]=[];
        a[129]=[140];
        c[129]=[];
        e[129]=[];
        a[130]=[141];
        c[130]=[];
        e[130]=[];
        a[131]=[141];
        c[131]=[];
        e[131]=[];
        a[132]=[142];
        c[132]=[];
        e[132]=[];
        a[133]=[142];
        c[133]=[];
        e[133]=[];
        a[134]=[143];
        c[134]=[];
        e[134]=[];
        a[135]=[143];
        c[135]=[];
        e[135]=[];
        a[136]=[];
        c[136]=[];
        e[136]=[];
        a[137]=[];
        c[137]=[];
        e[137]=[];
        a[138]=[];
        c[138]=[];
        e[138]=[];
        a[139]=[];
        c[139]=[];
        e[139]=[];
        a[140]=[];
        c[140]=[];
        e[140]=[];
        a[141]=[];
        c[141]=[];
        e[141]=[];
        a[142]=[];
        c[142]=[];
        e[142]=[];
        a[143]=[];
        c[143]=[];
        e[143]=[];
        f[0]=[];
        f[1]=[];
        f[2]=[];
        f[3]=[];
        f[4]=[];
        f[5]=[];
        f[6]=[];
        f[7]=[];
        f[8]=[];
        f[9]=[];
        f[10]=[];
        f[11]=[];
        f[12]=[];
        f[13]=[];
        f[14]=[];
        f[15]=[];
        f[16]=[];
        f[17]=[];
        f[18]=[];
        f[19]=[];
        f[20]=[];
        f[21]=[];
        f[22]=[];
        f[23]=[];
        f[24]=[];
        f[25]=[];
        f[26]=[];
        f[27]=[];
        f[28]=[];
        f[29]=[];
        f[30]=[];
        f[31]=[];
        f[32]=[];
        f[33]=[];
        f[34]=[];
        f[35]=[];
        f[36]=[];
        f[37]=[];
        f[38]=[];
        f[39]=[];
        f[40]=[ {
            index: 4, decrease: 1
        }
        ];
        f[41]=[ {
            index: 5, decrease: 1
        }
        ];
        f[42]=[ {
            index: 6, decrease: 1
        }
        ];
        f[43]=[ {
            index: 7, decrease: 1
        }
        ];
        f[44]=[ {
            index: 8, decrease: 1
        }
        ];
        f[45]=[ {
            index: 9, decrease: 1
        }
        ];
        f[46]=[ {
            index: 10, decrease: 1
        }
        ];
        f[47]=[ {
            index: 11, decrease: 1
        }
        ];
        f[48]=[ {
            index: 12, decrease: 1
        }
        ];
        f[49]=[ {
            index: 13, decrease: 1
        }
        ];
        f[50]=[ {
            index: 14, decrease: 1
        }
        ];
        f[51]=[ {
            index: 15, decrease: 1
        }
        ];
        f[52]=[ {
            index: 16, decrease: 1
        }
        ];
        f[53]=[ {
            index: 17, decrease: 1
        }
        ];
        f[54]=[ {
            index: 18, decrease: 1
        }
        ];
        f[55]=[ {
            index: 19, decrease: 1
        }
        ];
        f[56]=[ {
            index: 20, decrease: 1
        }
        ];
        f[57]=[ {
            index: 21, decrease: 1
        }
        ];
        f[58]=[ {
            index: 22, decrease: 1
        }
        ];
        f[59]=[ {
            index: 23, decrease: 1
        }
        ];
        f[60]=[ {
            index: 24, decrease: 1
        }
        ];
        f[61]=[ {
            index: 25, decrease: 1
        }
        ];
        f[62]=[ {
            index: 26, decrease: 1
        }
        ];
        f[63]=[ {
            index: 27, decrease: 1
        }
        ];
        f[64]=[ {
            index: 28, decrease: 1
        }
        ];
        f[65]=[ {
            index: 29, decrease: 1
        }
        ];
        f[66]=[ {
            index: 30, decrease: 1
        }
        ];
        f[67]=[ {
            index: 31, decrease: 1
        }
        ];
        f[68]=[ {
            index: 32, decrease: 1
        }
        ];
        f[69]=[ {
            index: 33, decrease: 1
        }
        ];
        f[70]=[ {
            index: 34, decrease: 1
        }
        ];
        f[71]=[ {
            index: 35, decrease: 1
        }
        ];
        f[72]=[ {
            index: 40, decrease: 1
        }
        ,
        {
            index: 4, decrease: 1
        }
        ];
        f[73]=[ {
            index: 41, decrease: 1
        }
        ,
        {
            index: 5, decrease: 1
        }
        ];
        f[74]=[ {
            index: 42, decrease: 1
        }
        ,
        {
            index: 6, decrease: 1
        }
        ];
        f[75]=[ {
            index: 43, decrease: 1
        }
        ,
        {
            index: 7, decrease: 1
        }
        ];
        f[76]=[ {
            index: 44, decrease: 1
        }
        ,
        {
            index: 8, decrease: 1
        }
        ];
        f[77]=[ {
            index: 45, decrease: 1
        }
        ,
        {
            index: 9, decrease: 1
        }
        ];
        f[78]=[ {
            index: 46, decrease: 1
        }
        ,
        {
            index: 10, decrease: 1
        }
        ];
        f[79]=[ {
            index: 47, decrease: 1
        }
        ,
        {
            index: 11, decrease: 1
        }
        ];
        f[80]=[ {
            index: 48, decrease: 1
        }
        ,
        {
            index: 12, decrease: 1
        }
        ];
        f[81]=[ {
            index: 49, decrease: 1
        }
        ,
        {
            index: 13, decrease: 1
        }
        ];
        f[82]=[ {
            index: 50, decrease: 1
        }
        ,
        {
            index: 14, decrease: 1
        }
        ];
        f[83]=[ {
            index: 51, decrease: 1
        }
        ,
        {
            index: 15, decrease: 1
        }
        ];
        f[84]=[ {
            index: 52, decrease: 1
        }
        ,
        {
            index: 16, decrease: 1
        }
        ];
        f[85]=[ {
            index: 53, decrease: 1
        }
        ,
        {
            index: 17, decrease: 1
        }
        ];
        f[86]=[ {
            index: 54, decrease: 1
        }
        ,
        {
            index: 18, decrease: 1
        }
        ];
        f[87]=[ {
            index: 55, decrease: 1
        }
        ,
        {
            index: 19, decrease: 1
        }
        ];
        f[88]=[ {
            index: 56, decrease: 1
        }
        ,
        {
            index: 20, decrease: 1
        }
        ];
        f[89]=[ {
            index: 57, decrease: 1
        }
        ,
        {
            index: 21, decrease: 1
        }
        ];
        f[90]=[ {
            index: 58, decrease: 1
        }
        ,
        {
            index: 22, decrease: 1
        }
        ];
        f[91]=[ {
            index: 59, decrease: 1
        }
        ,
        {
            index: 23, decrease: 1
        }
        ];
        f[92]=[ {
            index: 60, decrease: 1
        }
        ,
        {
            index: 24, decrease: 1
        }
        ];
        f[93]=[ {
            index: 61, decrease: 1
        }
        ,
        {
            index: 25, decrease: 1
        }
        ];
        f[94]=[ {
            index: 62, decrease: 1
        }
        ,
        {
            index: 26, decrease: 1
        }
        ];
        f[95]=[ {
            index: 63, decrease: 1
        }
        ,
        {
            index: 27, decrease: 1
        }
        ];
        f[96]=[ {
            index: 64, decrease: 1
        }
        ,
        {
            index: 28, decrease: 1
        }
        ];
        f[97]=[ {
            index: 65, decrease: 1
        }
        ,
        {
            index: 29, decrease: 1
        }
        ];
        f[98]=[ {
            index: 66, decrease: 1
        }
        ,
        {
            index: 30, decrease: 1
        }
        ];
        f[99]=[ {
            index: 31, decrease: 1
        }
        ,
        {
            index: 67, decrease: 1
        }
        ];
        f[100]=[ {
            index: 32, decrease: 1
        }
        ,
        {
            index: 68, decrease: 1
        }
        ];
        f[101]=[ {
            index: 33, decrease: 1
        }
        ,
        {
            index: 69, decrease: 1
        }
        ];
        f[102]=[ {
            index: 34, decrease: 1
        }
        ,
        {
            index: 70, decrease: 1
        }
        ];
        f[103]=[ {
            index: 35, decrease: 1
        }
        ,
        {
            index: 71, decrease: 1
        }
        ];
        f[104]=[ {
            index: 40, decrease: 1
        }
        ,
        {
            index: 4, decrease: 1
        }
        ,
        {
            index: 72, decrease: 1
        }
        ];
        f[105]=[ {
            index: 41, decrease: 1
        }
        ,
        {
            index: 5, decrease: 1
        }
        ,
        {
            index: 73, decrease: 1
        }
        ];
        f[106]=[ {
            index: 42, decrease: 1
        }
        ,
        {
            index: 6, decrease: 1
        }
        ,
        {
            index: 74, decrease: 1
        }
        ];
        f[107]=[ {
            index: 43, decrease: 1
        }
        ,
        {
            index: 7, decrease: 1
        }
        ,
        {
            index: 75, decrease: 1
        }
        ];
        f[108]=[ {
            index: 44, decrease: 1
        }
        ,
        {
            index: 8, decrease: 1
        }
        ,
        {
            index: 76, decrease: 1
        }
        ];
        f[109]=[ {
            index: 45, decrease: 1
        }
        ,
        {
            index: 9, decrease: 1
        }
        ,
        {
            index: 77, decrease: 1
        }
        ];
        f[110]=[ {
            index: 46, decrease: 1
        }
        ,
        {
            index: 10, decrease: 1
        }
        ,
        {
            index: 78, decrease: 1
        }
        ];
        f[111]=[ {
            index: 47, decrease: 1
        }
        ,
        {
            index: 11, decrease: 1
        }
        ,
        {
            index: 79, decrease: 1
        }
        ];
        f[112]=[ {
            index: 48, decrease: 1
        }
        ,
        {
            index: 12, decrease: 1
        }
        ,
        {
            index: 80, decrease: 1
        }
        ];
        f[113]=[ {
            index: 49, decrease: 1
        }
        ,
        {
            index: 13, decrease: 1
        }
        ,
        {
            index: 81, decrease: 1
        }
        ];
        f[114]=[ {
            index: 50, decrease: 1
        }
        ,
        {
            index: 14, decrease: 1
        }
        ,
        {
            index: 82, decrease: 1
        }
        ];
        f[115]=[ {
            index: 51, decrease: 1
        }
        ,
        {
            index: 15, decrease: 1
        }
        ,
        {
            index: 83, decrease: 1
        }
        ];
        f[116]=[ {
            index: 52, decrease: 1
        }
        ,
        {
            index: 16, decrease: 1
        }
        ,
        {
            index: 84, decrease: 1
        }
        ];
        f[117]=[ {
            index: 53, decrease: 1
        }
        ,
        {
            index: 17, decrease: 1
        }
        ,
        {
            index: 85, decrease: 1
        }
        ];
        f[118]=[ {
            index: 54, decrease: 1
        }
        ,
        {
            index: 18, decrease: 1
        }
        ,
        {
            index: 86, decrease: 1
        }
        ];
        f[119]=[ {
            index: 55, decrease: 1
        }
        ,
        {
            index: 19, decrease: 1
        }
        ,
        {
            index: 87, decrease: 1
        }
        ];
        f[120]=[ {
            index: 56, decrease: 1
        }
        ,
        {
            index: 20, decrease: 1
        }
        ,
        {
            index: 88, decrease: 1
        }
        ];
        f[121]=[ {
            index: 57, decrease: 1
        }
        ,
        {
            index: 21, decrease: 1
        }
        ,
        {
            index: 89, decrease: 1
        }
        ];
        f[122]=[ {
            index: 58, decrease: 1
        }
        ,
        {
            index: 22, decrease: 1
        }
        ,
        {
            index: 90, decrease: 1
        }
        ];
        f[123]=[ {
            index: 59, decrease: 1
        }
        ,
        {
            index: 23, decrease: 1
        }
        ,
        {
            index: 91, decrease: 1
        }
        ];
        f[124]=[ {
            index: 60, decrease: 1
        }
        ,
        {
            index: 24, decrease: 1
        }
        ,
        {
            index: 92, decrease: 1
        }
        ];
        f[125]=[ {
            index: 61, decrease: 1
        }
        ,
        {
            index: 25, decrease: 1
        }
        ,
        {
            index: 93, decrease: 1
        }
        ];
        f[126]=[ {
            index: 62, decrease: 1
        }
        ,
        {
            index: 26, decrease: 1
        }
        ,
        {
            index: 94, decrease: 1
        }
        ];
        f[127]=[ {
            index: 63, decrease: 1
        }
        ,
        {
            index: 27, decrease: 1
        }
        ,
        {
            index: 95, decrease: 1
        }
        ];
        f[128]=[ {
            index: 64, decrease: 1
        }
        ,
        {
            index: 28, decrease: 1
        }
        ,
        {
            index: 96, decrease: 1
        }
        ];
        f[129]=[ {
            index: 65, decrease: 1
        }
        ,
        {
            index: 29, decrease: 1
        }
        ,
        {
            index: 97, decrease: 1
        }
        ];
        f[130]=[ {
            index: 66, decrease: 1
        }
        ,
        {
            index: 30, decrease: 1
        }
        ,
        {
            index: 98, decrease: 1
        }
        ];
        f[131]=[ {
            index: 31, decrease: 1
        }
        ,
        {
            index: 99, decrease: 1
        }
        ,
        {
            index: 67, decrease: 1
        }
        ];
        f[132]=[ {
            index: 32, decrease: 1
        }
        ,
        {
            index: 100, decrease: 1
        }
        ,
        {
            index: 68, decrease: 1
        }
        ];
        f[133]=[ {
            index: 33, decrease: 1
        }
        ,
        {
            index: 101, decrease: 1
        }
        ,
        {
            index: 69, decrease: 1
        }
        ];
        f[134]=[ {
            index: 34, decrease: 1
        }
        ,
        {
            index: 102, decrease: 1
        }
        ,
        {
            index: 70, decrease: 1
        }
        ];
        f[135]=[ {
            index: 35, decrease: 1
        }
        ,
        {
            index: 103, decrease: 1
        }
        ,
        {
            index: 71, decrease: 1
        }
        ];
        f[136]=[ {
            index: 49, decrease: 1
        }
        ,
        {
            index: 48, decrease: 1
        }
        ,
        {
            index: 41, decrease: 1
        }
        ,
        {
            index: 40, decrease: 1
        }
        ,
        {
            index: 113, decrease: 1
        }
        ,
        {
            index: 112, decrease: 1
        }
        ,
        {
            index: 105, decrease: 1
        }
        ,
        {
            index: 104, decrease: 1
        }
        ,
        {
            index: 13, decrease: 1
        }
        ,
        {
            index: 12, decrease: 1
        }
        ,
        {
            index: 5, decrease: 1
        }
        ,
        {
            index: 4, decrease: 1
        }
        ,
        {
            index: 81, decrease: 1
        }
        ,
        {
            index: 80, decrease: 1
        }
        ,
        {
            index: 73, decrease: 1
        }
        ,
        {
            index: 72, decrease: 1
        }
        ];
        f[137]=[ {
            index: 51, decrease: 1
        }
        ,
        {
            index: 50, decrease: 1
        }
        ,
        {
            index: 43, decrease: 1
        }
        ,
        {
            index: 42, decrease: 1
        }
        ,
        {
            index: 115, decrease: 1
        }
        ,
        {
            index: 114, decrease: 1
        }
        ,
        {
            index: 107, decrease: 1
        }
        ,
        {
            index: 106, decrease: 1
        }
        ,
        {
            index: 15, decrease: 1
        }
        ,
        {
            index: 14, decrease: 1
        }
        ,
        {
            index: 7, decrease: 1
        }
        ,
        {
            index: 6, decrease: 1
        }
        ,
        {
            index: 83, decrease: 1
        }
        ,
        {
            index: 82, decrease: 1
        }
        ,
        {
            index: 75, decrease: 1
        }
        ,
        {
            index: 74, decrease: 1
        }
        ];
        f[138]=[ {
            index: 53, decrease: 1
        }
        ,
        {
            index: 52, decrease: 1
        }
        ,
        {
            index: 45, decrease: 1
        }
        ,
        {
            index: 44, decrease: 1
        }
        ,
        {
            index: 117, decrease: 1
        }
        ,
        {
            index: 116, decrease: 1
        }
        ,
        {
            index: 109, decrease: 1
        }
        ,
        {
            index: 108, decrease: 1
        }
        ,
        {
            index: 17, decrease: 1
        }
        ,
        {
            index: 16, decrease: 1
        }
        ,
        {
            index: 9, decrease: 1
        }
        ,
        {
            index: 8, decrease: 1
        }
        ,
        {
            index: 85, decrease: 1
        }
        ,
        {
            index: 84, decrease: 1
        }
        ,
        {
            index: 77, decrease: 1
        }
        ,
        {
            index: 76, decrease: 1
        }
        ];
        f[139]=[ {
            index: 55, decrease: 1
        }
        ,
        {
            index: 54, decrease: 1
        }
        ,
        {
            index: 47, decrease: 1
        }
        ,
        {
            index: 46, decrease: 1
        }
        ,
        {
            index: 119, decrease: 1
        }
        ,
        {
            index: 118, decrease: 1
        }
        ,
        {
            index: 111, decrease: 1
        }
        ,
        {
            index: 110, decrease: 1
        }
        ,
        {
            index: 19, decrease: 1
        }
        ,
        {
            index: 18, decrease: 1
        }
        ,
        {
            index: 11, decrease: 1
        }
        ,
        {
            index: 10, decrease: 1
        }
        ,
        {
            index: 87, decrease: 1
        }
        ,
        {
            index: 86, decrease: 1
        }
        ,
        {
            index: 79, decrease: 1
        }
        ,
        {
            index: 78, decrease: 1
        }
        ];
        f[140]=[ {
            index: 65, decrease: 1
        }
        ,
        {
            index: 64, decrease: 1
        }
        ,
        {
            index: 129, decrease: 1
        }
        ,
        {
            index: 128, decrease: 1
        }
        ,
        {
            index: 57, decrease: 1
        }
        ,
        {
            index: 56, decrease: 1
        }
        ,
        {
            index: 121, decrease: 1
        }
        ,
        {
            index: 120, decrease: 1
        }
        ,
        {
            index: 29, decrease: 1
        }
        ,
        {
            index: 28, decrease: 1
        }
        ,
        {
            index: 21, decrease: 1
        }
        ,
        {
            index: 20, decrease: 1
        }
        ,
        {
            index: 97, decrease: 1
        }
        ,
        {
            index: 96, decrease: 1
        }
        ,
        {
            index: 89, decrease: 1
        }
        ,
        {
            index: 88, decrease: 1
        }
        ];
        f[141]=[ {
            index: 66, decrease: 1
        }
        ,
        {
            index: 131, decrease: 1
        }
        ,
        {
            index: 130, decrease: 1
        }
        ,
        {
            index: 59, decrease: 1
        }
        ,
        {
            index: 58, decrease: 1
        }
        ,
        {
            index: 123, decrease: 1
        }
        ,
        {
            index: 122, decrease: 1
        }
        ,
        {
            index: 31, decrease: 1
        }
        ,
        {
            index: 30, decrease: 1
        }
        ,
        {
            index: 23, decrease: 1
        }
        ,
        {
            index: 22, decrease: 1
        }
        ,
        {
            index: 99, decrease: 1
        }
        ,
        {
            index: 98, decrease: 1
        }
        ,
        {
            index: 91, decrease: 1
        }
        ,
        {
            index: 90, decrease: 1
        }
        ,
        {
            index: 67, decrease: 1
        }
        ];
        f[142]=[ {
            index: 61, decrease: 1
        }
        ,
        {
            index: 60, decrease: 1
        }
        ,
        {
            index: 125, decrease: 1
        }
        ,
        {
            index: 124, decrease: 1
        }
        ,
        {
            index: 33, decrease: 1
        }
        ,
        {
            index: 32, decrease: 1
        }
        ,
        {
            index: 25, decrease: 1
        }
        ,
        {
            index: 24, decrease: 1
        }
        ,
        {
            index: 101, decrease: 1
        }
        ,
        {
            index: 100, decrease: 1
        }
        ,
        {
            index: 93, decrease: 1
        }
        ,
        {
            index: 92, decrease: 1
        }
        ,
        {
            index: 133, decrease: 1
        }
        ,
        {
            index: 69, decrease: 1
        }
        ,
        {
            index: 132, decrease: 1
        }
        ,
        {
            index: 68, decrease: 1
        }
        ];
        f[143]=[ {
            index: 63, decrease: 1
        }
        ,
        {
            index: 62, decrease: 1
        }
        ,
        {
            index: 127, decrease: 1
        }
        ,
        {
            index: 126, decrease: 1
        }
        ,
        {
            index: 35, decrease: 1
        }
        ,
        {
            index: 34, decrease: 1
        }
        ,
        {
            index: 27, decrease: 1
        }
        ,
        {
            index: 26, decrease: 1
        }
        ,
        {
            index: 103, decrease: 1
        }
        ,
        {
            index: 102, decrease: 1
        }
        ,
        {
            index: 95, decrease: 1
        }
        ,
        {
            index: 94, decrease: 1
        }
        ,
        {
            index: 135, decrease: 1
        }
        ,
        {
            index: 71, decrease: 1
        }
        ,
        {
            index: 134, decrease: 1
        }
        ,
        {
            index: 70, decrease: 1
        }
        ];
        d[0]=0;
        d[1]=0;
        d[2]=0;
        d[3]=0;
        d[4]=0;
        d[5]=0;
        d[6]=0;
        d[7]=0;
        d[8]=0;
        d[9]=0;
        d[10]=0;
        d[11]=0;
        d[12]=0;
        d[13]=0;
        d[14]=0;
        d[15]=0;
        d[16]=0;
        d[17]=0;
        d[18]=0;
        d[19]=0;
        d[20]=0;
        d[21]=0;
        d[22]=0;
        d[23]=0;
        d[24]=0;
        d[25]=0;
        d[26]=0;
        d[27]=0;
        d[28]=0;
        d[29]=0;
        d[30]=0;
        d[31]=0;
        d[32]=0;
        d[33]=0;
        d[34]=0;
        d[35]=0;
        d[36]=0;
        d[37]=0;
        d[38]=0;
        d[39]=0;
        d[40]=1;
        d[41]=1;
        d[42]=1;
        d[43]=1;
        d[44]=1;
        d[45]=1;
        d[46]=1;
        d[47]=1;
        d[48]=1;
        d[49]=1;
        d[50]=1;
        d[51]=1;
        d[52]=1;
        d[53]=1;
        d[54]=1;
        d[55]=1;
        d[56]=1;
        d[57]=1;
        d[58]=1;
        d[59]=1;
        d[60]=1;
        d[61]=1;
        d[62]=1;
        d[63]=1;
        d[64]=1;
        d[65]=1;
        d[66]=1;
        d[67]=1;
        d[68]=1;
        d[69]=1;
        d[70]=1;
        d[71]=1;
        d[72]=2;
        d[73]=2;
        d[74]=2;
        d[75]=2;
        d[76]=2;
        d[77]=2;
        d[78]=2;
        d[79]=2;
        d[80]=2;
        d[81]=2;
        d[82]=2;
        d[83]=2;
        d[84]=2;
        d[85]=2;
        d[86]=2;
        d[87]=2;
        d[88]=2;
        d[89]=2;
        d[90]=2;
        d[91]=2;
        d[92]=2;
        d[93]=2;
        d[94]=2;
        d[95]=2;
        d[96]=2;
        d[97]=2;
        d[98]=2;
        d[99]=2;
        d[100]=2;
        d[101]=2;
        d[102]=2;
        d[103]=2;
        d[104]=3;
        d[105]=3;
        d[106]=3;
        d[107]=3;
        d[108]=3;
        d[109]=3;
        d[110]=3;
        d[111]=3;
        d[112]=3;
        d[113]=3;
        d[114]=3;
        d[115]=3;
        d[116]=3;
        d[117]=3;
        d[118]=3;
        d[119]=3;
        d[120]=3;
        d[121]=3;
        d[122]=3;
        d[123]=3;
        d[124]=3;
        d[125]=3;
        d[126]=3;
        d[127]=3;
        d[128]=3;
        d[129]=3;
        d[130]=3;
        d[131]=3;
        d[132]=3;
        d[133]=3;
        d[134]=3;
        d[135]=3;
        d[136]=4;
        d[137]=4;
        d[138]=4;
        d[139]=4;
        d[140]=4;
        d[141]=4;
        d[142]=4;
        d[143]=4
    }
    ;
    this.initLayoutArena=function() {
        h= {
            x: 97, y: 90
        }
        ;
        g=SCORE_BONUS_LAYOUT_EASY;
        b[0]= {
            x: 20, y: 20.6
        }
        ;
        b[1]= {
            x: 49, y: 20.6
        }
        ;
        b[2]= {
            x: 78, y: 20.6
        }
        ;
        b[3]= {
            x: 107, y: 20.6
        }
        ;
        b[4]= {
            x: 136, y: 20.6
        }
        ;
        b[5]= {
            x: 252, y: 20.6
        }
        ;
        b[6]= {
            x: 281, y: 20.6
        }
        ;
        b[7]= {
            x: 310, y: 20.6
        }
        ;
        b[8]= {
            x: 339, y: 20.6
        }
        ;
        b[9]= {
            x: 368, y: 20.65
        }
        ;
        b[10]= {
            x: 20, y: 60.1
        }
        ;
        b[11]= {
            x: 49, y: 60.1
        }
        ;
        b[12]= {
            x: 78, y: 60.1
        }
        ;
        b[13]= {
            x: 107, y: 60.1
        }
        ;
        b[14]= {
            x: 165, y: 60.1
        }
        ;
        b[15]= {
            x: 194, y: 60.1
        }
        ;
        b[16]= {
            x: 223, y: 60.1
        }
        ;
        b[17]= {
            x: 281, y: 60.1
        }
        ;
        b[18]= {
            x: 310, y: 60.1
        }
        ;
        b[19]= {
            x: 339, y: 60.1
        }
        ;
        b[20]= {
            x: 368, y: 60.15
        }
        ;
        b[21]= {
            x: 20, y: 99.6
        }
        ;
        b[22]= {
            x: 49, y: 99.6
        }
        ;
        b[23]= {
            x: 78, y: 99.6
        }
        ;
        b[24]= {
            x: 194, y: 99.6
        }
        ;
        b[25]= {
            x: 310, y: 99.6
        }
        ;
        b[26]= {
            x: 339, y: 99.6
        }
        ;
        b[27]= {
            x: 368, y: 99.6
        }
        ;
        b[28]= {
            x: 20, y: 139.1
        }
        ;
        b[29]= {
            x: 49, y: 139.1
        }
        ;
        b[30]= {
            x: 165, y: 139.1
        }
        ;
        b[31]= {
            x: 194, y: 139.1
        }
        ;
        b[32]= {
            x: 223, y: 139.1
        }
        ;
        b[33]= {
            x: 339, y: 139.1
        }
        ;
        b[34]= {
            x: 368, y: 139.1
        }
        ;
        b[35]= {
            x: 20, y: 178.6
        }
        ;
        b[36]= {
            x: 49, y: 178.6
        }
        ;
        b[37]= {
            x: 78, y: 178.6
        }
        ;
        b[38]= {
            x: 194, y: 178.6
        }
        ;
        b[39]= {
            x: 310, y: 178.6
        }
        ;
        b[40]= {
            x: 339, y: 178.6
        }
        ;
        b[41]= {
            x: 368, y: 178.6
        }
        ;
        b[42]= {
            x: 20, y: 218.1
        }
        ;
        b[43]= {
            x: 49, y: 218.1
        }
        ;
        b[44]= {
            x: 78, y: 218.1
        }
        ;
        b[45]= {
            x: 107, y: 218.1
        }
        ;
        b[46]= {
            x: 165, y: 218.1
        }
        ;
        b[47]= {
            x: 194, y: 218.1
        }
        ;
        b[48]= {
            x: 223, y: 218.1
        }
        ;
        b[49]= {
            x: 281, y: 218.1
        }
        ;
        b[50]= {
            x: 310, y: 218.1
        }
        ;
        b[51]= {
            x: 339, y: 218.1
        }
        ;
        b[52]= {
            x: 368, y: 218.1
        }
        ;
        b[53]= {
            x: 20, y: 257.6
        }
        ;
        b[54]= {
            x: 49, y: 257.6
        }
        ;
        b[55]= {
            x: 78, y: 257.6
        }
        ;
        b[56]= {
            x: 107, y: 257.6
        }
        ;
        b[57]= {
            x: 136, y: 257.6
        }
        ;
        b[58]= {
            x: 252, y: 257.6
        }
        ;
        b[59]= {
            x: 281, y: 257.6
        }
        ;
        b[60]= {
            x: 310, y: 257.6
        }
        ;
        b[61]= {
            x: 339, y: 257.6
        }
        ;
        b[62]= {
            x: 368, y: 257.65
        }
        ;
        b[63]= {
            x: 14.5, y: 15.05
        }
        ;
        b[64]= {
            x: 43.5, y: 15.1
        }
        ;
        b[65]= {
            x: 72.5, y: 15.05
        }
        ;
        b[66]= {
            x: 101.5, y: 15.05
        }
        ;
        b[67]= {
            x: 276.5, y: 15.05
        }
        ;
        b[68]= {
            x: 305.5, y: 15.05
        }
        ;
        b[69]= {
            x: 334.5, y: 15.05
        }
        ;
        b[70]= {
            x: 363.5, y: 15.05
        }
        ;
        b[71]= {
            x: 14.5, y: 54.6
        }
        ;
        b[72]= {
            x: 43.5, y: 54.6
        }
        ;
        b[73]= {
            x: 72.5, y: 54.6
        }
        ;
        b[74]= {
            x: 188.5, y: 54.6
        }
        ;
        b[75]= {
            x: 305.5, y: 54.6
        }
        ;
        b[76]= {
            x: 334.5, y: 54.6
        }
        ;
        b[77]= {
            x: 363.5, y: 54.6
        }
        ;
        b[78]= {
            x: 14.5, y: 94.1
        }
        ;
        b[79]= {
            x: 43.5, y: 94.1
        }
        ;
        b[80]= {
            x: 335.5, y: 94.1
        }
        ;
        b[81]= {
            x: 364.5, y: 94.1
        }
        ;
        b[82]= {
            x: 14.5, y: 133.6
        }
        ;
        b[83]= {
            x: 188.5, y: 133.6
        }
        ;
        b[84]= {
            x: 364.5, y: 133.6
        }
        ;
        b[85]= {
            x: 14.5, y: 173.1
        }
        ;
        b[86]= {
            x: 43.5, y: 173.1
        }
        ;
        b[87]= {
            x: 335.5, y: 173.1
        }
        ;
        b[88]= {
            x: 364.5, y: 173.1
        }
        ;
        b[89]= {
            x: 14.5, y: 212.6
        }
        ;
        b[90]= {
            x: 43.5, y: 212.6
        }
        ;
        b[91]= {
            x: 72.5, y: 212.6
        }
        ;
        b[92]= {
            x: 188.5, y: 212.6
        }
        ;
        b[93]= {
            x: 305.5, y: 212.6
        }
        ;
        b[94]= {
            x: 334.5, y: 212.6
        }
        ;
        b[95]= {
            x: 363.5, y: 212.6
        }
        ;
        b[96]= {
            x: 14.5, y: 252.1
        }
        ;
        b[97]= {
            x: 43.5, y: 252.1
        }
        ;
        b[98]= {
            x: 72.5, y: 252.1
        }
        ;
        b[99]= {
            x: 101.5, y: 252.1
        }
        ;
        b[100]= {
            x: 276.5, y: 252.1
        }
        ;
        b[101]= {
            x: 305.5, y: 252.1
        }
        ;
        b[102]= {
            x: 334.5, y: 252.1
        }
        ;
        b[103]= {
            x: 363.5, y: 252.1
        }
        ;
        b[104]= {
            x: 10, y: 10.05
        }
        ;
        b[105]= {
            x: 39, y: 10.05
        }
        ;
        b[106]= {
            x: 69, y: 10.05
        }
        ;
        b[107]= {
            x: 301, y: 10.05
        }
        ;
        b[108]= {
            x: 330, y: 10.05
        }
        ;
        b[109]= {
            x: 360, y: 10.05
        }
        ;
        b[110]= {
            x: 10, y: 49.6
        }
        ;
        b[111]= {
            x: 39, y: 49.6
        }
        ;
        b[112]= {
            x: 331, y: 49.6
        }
        ;
        b[113]= {
            x: 360, y: 49.6
        }
        ;
        b[114]= {
            x: 10, y: 89.1
        }
        ;
        b[115]= {
            x: 360, y: 89.1
        }
        ;
        b[116]= {
            x: 10, y: 168.1
        }
        ;
        b[117]= {
            x: 360, y: 168.1
        }
        ;
        b[118]= {
            x: 10, y: 207.6
        }
        ;
        b[119]= {
            x: 40, y: 207.6
        }
        ;
        b[120]= {
            x: 331, y: 207.6
        }
        ;
        b[121]= {
            x: 360, y: 207.6
        }
        ;
        b[122]= {
            x: 10, y: 247.1
        }
        ;
        b[123]= {
            x: 40, y: 247.1
        }
        ;
        b[124]= {
            x: 70, y: 247.1
        }
        ;
        b[125]= {
            x: 301, y: 247.1
        }
        ;
        b[126]= {
            x: 331, y: 247.1
        }
        ;
        b[127]= {
            x: 360, y: 247.1
        }
        ;
        b[128]= {
            x: 5, y: 5
        }
        ;
        b[129]= {
            x: 34, y: 5
        }
        ;
        b[130]= {
            x: 326, y: 5
        }
        ;
        b[131]= {
            x: 355, y: 5
        }
        ;
        b[132]= {
            x: 5, y: 44.5
        }
        ;
        b[133]= {
            x: 355, y: 44.5
        }
        ;
        b[134]= {
            x: 5, y: 202.5
        }
        ;
        b[135]= {
            x: 355, y: 202.5
        }
        ;
        b[136]= {
            x: 5, y: 242
        }
        ;
        b[137]= {
            x: 35, y: 242
        }
        ;
        b[138]= {
            x: 326, y: 242
        }
        ;
        b[139]= {
            x: 356, y: 242
        }
        ;
        b[140]= {
            x: 0, y: 0
        }
        ;
        b[141]= {
            x: 350.5, y: 0
        }
        ;
        b[142]= {
            x: 0, y: 236.6
        }
        ;
        b[143]= {
            x: 350.5, y: 236.6
        }
        ;
        a[0]=[63,
        104,
        128,
        140];
        c[0]=[];
        e[0]=[];
        a[1]=[64,
        105,
        129];
        c[1]=[0];
        e[1]=[2];
        a[2]=[65,
        106];
        c[2]=[1];
        e[2]=[3];
        a[3]=[66];
        c[3]=[2];
        e[3]=[4];
        a[4]=[];
        c[4]=[];
        e[4]=[];
        a[5]=[];
        c[5]=[];
        e[5]=[];
        a[6]=[67];
        c[6]=[5];
        e[6]=[7];
        a[7]=[68,
        107];
        c[7]=[6];
        e[7]=[8];
        a[8]=[69,
        108,
        130];
        c[8]=[7];
        e[8]=[9];
        a[9]=[70,
        109,
        131,
        141];
        c[9]=[];
        e[9]=[];
        a[10]=[71,
        110,
        132];
        c[10]=[];
        e[10]=[];
        a[11]=[72,
        111];
        c[11]=[10];
        e[11]=[12];
        a[12]=[73];
        c[12]=[11];
        e[12]=[13];
        a[13]=[];
        c[13]=[];
        e[13]=[];
        a[14]=[];
        c[14]=[];
        e[14]=[];
        a[15]=[74];
        c[15]=[14];
        e[15]=[16];
        a[16]=[];
        c[16]=[];
        e[16]=[];
        a[17]=[];
        c[17]=[];
        e[17]=[];
        a[18]=[75];
        c[18]=[17];
        e[18]=[19];
        a[19]=[76,
        112];
        c[19]=[18];
        e[19]=[20];
        a[20]=[77,
        113,
        133];
        c[20]=[];
        e[20]=[];
        a[21]=[78,
        114];
        c[21]=[];
        e[21]=[];
        a[22]=[79];
        c[22]=[21];
        e[22]=[23];
        a[23]=[];
        c[23]=[];
        e[23]=[];
        a[24]=[];
        c[24]=[];
        e[24]=[];
        a[25]=[];
        c[25]=[];
        e[25]=[];
        a[26]=[80];
        c[26]=[25];
        e[26]=[27];
        a[27]=[81,
        115];
        c[27]=[];
        e[27]=[];
        a[28]=[82];
        c[28]=[];
        e[28]=[];
        a[29]=[];
        c[29]=[];
        e[29]=[];
        a[30]=[];
        c[30]=[];
        e[30]=[];
        a[31]=[83];
        c[31]=[30];
        e[31]=[32];
        a[32]=[];
        c[32]=[];
        e[32]=[];
        a[33]=[];
        c[33]=[];
        e[33]=[];
        a[34]=[84];
        c[34]=[];
        e[34]=[];
        a[35]=[85,
        116];
        c[35]=[];
        e[35]=[];
        a[36]=[86];
        c[36]=[35];
        e[36]=[37];
        a[37]=[];
        c[37]=[];
        e[37]=[];
        a[38]=[];
        c[38]=[];
        e[38]=[];
        a[39]=[];
        c[39]=[];
        e[39]=[];
        a[40]=[87];
        c[40]=[39];
        e[40]=[41];
        a[41]=[88,
        117];
        c[41]=[];
        e[41]=[];
        a[42]=[89,
        118,
        134];
        c[42]=[];
        e[42]=[];
        a[43]=[90,
        119];
        c[43]=[42];
        e[43]=[44];
        a[44]=[91];
        c[44]=[43];
        e[44]=[45];
        a[45]=[];
        c[45]=[];
        e[45]=[];
        a[46]=[];
        c[46]=[];
        e[46]=[];
        a[47]=[92];
        c[47]=[46];
        e[47]=[48];
        a[48]=[];
        c[48]=[];
        e[48]=[];
        a[49]=[];
        c[49]=[];
        e[49]=[];
        a[50]=[93];
        c[50]=[49];
        e[50]=[51];
        a[51]=[94,
        120];
        c[51]=[50];
        e[51]=[52];
        a[52]=[95,
        121,
        135];
        c[52]=[];
        e[52]=[];
        a[53]=[96,
        122,
        136,
        142];
        c[53]=[];
        e[53]=[];
        a[54]=[97,
        123,
        137];
        c[54]=[53];
        e[54]=[55];
        a[55]=[98,
        124];
        c[55]=[54];
        e[55]=[56];
        a[56]=[99];
        c[56]=[55];
        e[56]=[57];
        a[57]=[];
        c[57]=[];
        e[57]=[];
        a[58]=[];
        c[58]=[];
        e[58]=[];
        a[59]=[100];
        c[59]=[58];
        e[59]=[60];
        a[60]=[101,
        125];
        c[60]=[59];
        e[60]=[61];
        a[61]=[102,
        126,
        138];
        c[61]=[60];
        e[61]=[62];
        a[62]=[103,
        127,
        139,
        143];
        c[62]=[];
        e[62]=[];
        a[63]=[104,
        128,
        140];
        c[63]=[];
        e[63]=[];
        a[64]=[105,
        129];
        c[64]=[63];
        e[64]=[65];
        a[65]=[106];
        c[65]=[64];
        e[65]=[66];
        a[66]=[];
        c[66]=[];
        e[66]=[];
        a[67]=[];
        c[67]=[];
        e[67]=[];
        a[68]=[107];
        c[68]=[67];
        e[68]=[69];
        a[69]=[108,
        130];
        c[69]=[68];
        e[69]=[70];
        a[70]=[109,
        131,
        141];
        c[70]=[];
        e[70]=[];
        a[71]=[110,
        132];
        c[71]=[];
        e[71]=[];
        a[72]=[111];
        c[72]=[71];
        e[72]=[73];
        a[73]=[];
        c[73]=[];
        e[73]=[];
        a[74]=[];
        c[74]=[];
        e[74]=[];
        a[75]=[];
        c[75]=[];
        e[75]=[];
        a[76]=[112];
        c[76]=[75];
        e[76]=[77];
        a[77]=[113,
        133];
        c[77]=[];
        e[77]=[];
        a[78]=[114];
        c[78]=[];
        e[78]=[];
        a[79]=[];
        c[79]=[];
        e[79]=[];
        a[80]=[];
        c[80]=[];
        e[80]=[];
        a[81]=[115];
        c[81]=[];
        e[81]=[];
        a[82]=[];
        c[82]=[];
        e[82]=[];
        a[83]=[];
        c[83]=[];
        e[83]=[];
        a[84]=[];
        c[84]=[];
        e[84]=[];
        a[85]=[116];
        c[85]=[];
        e[85]=[];
        a[86]=[];
        c[86]=[];
        e[86]=[];
        a[87]=[];
        c[87]=[];
        e[87]=[];
        a[88]=[117];
        c[88]=[];
        e[88]=[];
        a[89]=[118,
        134];
        c[89]=[];
        e[89]=[];
        a[90]=[119];
        c[90]=[89];
        e[90]=[91];
        a[91]=[];
        c[91]=[];
        e[91]=[];
        a[92]=[];
        c[92]=[];
        e[92]=[];
        a[93]=[];
        c[93]=[];
        e[93]=[];
        a[94]=[120];
        c[94]=[93];
        e[94]=[95];
        a[95]=[121,
        135];
        c[95]=[];
        e[95]=[];
        a[96]=[122,
        136,
        142];
        c[96]=[];
        e[96]=[];
        a[97]=[123,
        137];
        c[97]=[96];
        e[97]=[98];
        a[98]=[124];
        c[98]=[97];
        e[98]=[99];
        a[99]=[];
        c[99]=[];
        e[99]=[];
        a[100]=[];
        c[100]=[];
        e[100]=[];
        a[101]=[125];
        c[101]=[100];
        e[101]=[102];
        a[102]=[126,
        138];
        c[102]=[101];
        e[102]=[103];
        a[103]=[127,
        139,
        143];
        c[103]=[];
        e[103]=[];
        a[104]=[128,
        140];
        c[104]=[];
        e[104]=[];
        a[105]=[129];
        c[105]=[104];
        e[105]=[106];
        a[106]=[];
        c[106]=[];
        e[106]=[];
        a[107]=[];
        c[107]=[];
        e[107]=[];
        a[108]=[130];
        c[108]=[107];
        e[108]=[109];
        a[109]=[131,
        141];
        c[109]=[];
        e[109]=[];
        a[110]=[132];
        c[110]=[];
        e[110]=[];
        a[111]=[];
        c[111]=[];
        e[111]=[];
        a[112]=[];
        c[112]=[];
        e[112]=[];
        a[113]=[133];
        c[113]=[];
        e[113]=[];
        a[114]=[];
        c[114]=[];
        e[114]=[];
        a[115]=[];
        c[115]=[];
        e[115]=[];
        a[116]=[];
        c[116]=[];
        e[116]=[];
        a[117]=[];
        c[117]=[];
        e[117]=[];
        a[118]=[134];
        c[118]=[];
        e[118]=[];
        a[119]=[];
        c[119]=[];
        e[119]=[];
        a[120]=[];
        c[120]=[];
        e[120]=[];
        a[121]=[135];
        c[121]=[];
        e[121]=[];
        a[122]=[136,
        142];
        c[122]=[];
        e[122]=[];
        a[123]=[137];
        c[123]=[122];
        e[123]=[124];
        a[124]=[];
        c[124]=[];
        e[124]=[];
        a[125]=[];
        c[125]=[];
        e[125]=[];
        a[126]=[138];
        c[126]=[125];
        e[126]=[127];
        a[127]=[139,
        143];
        c[127]=[];
        e[127]=[];
        a[128]=[140];
        c[128]=[];
        e[128]=[];
        a[129]=[];
        c[129]=[];
        e[129]=[];
        a[130]=[];
        c[130]=[];
        e[130]=[];
        a[131]=[141];
        c[131]=[];
        e[131]=[];
        a[132]=[];
        c[132]=[];
        e[132]=[];
        a[133]=[];
        c[133]=[];
        e[133]=[];
        a[134]=[];
        c[134]=[];
        e[134]=[];
        a[135]=[];
        c[135]=[];
        e[135]=[];
        a[136]=[142];
        c[136]=[];
        e[136]=[];
        a[137]=[];
        c[137]=[];
        e[137]=[];
        a[138]=[];
        c[138]=[];
        e[138]=[];
        a[139]=[143];
        c[139]=[];
        e[139]=[];
        a[140]=[];
        c[140]=[];
        e[140]=[];
        a[141]=[];
        c[141]=[];
        e[141]=[];
        a[142]=[];
        c[142]=[];
        e[142]=[];
        a[143]=[];
        c[143]=[];
        e[143]=[];
        f[0]=[ {
            index: 1, decrease: 1
        }
        ];
        f[1]=[ {
            index: 2, decrease: 1
        }
        ];
        f[2]=[ {
            index: 1, decrease: 1
        }
        ,
        {
            index: 3, decrease: 1
        }
        ];
        f[3]=[ {
            index: 2, decrease: 1
        }
        ];
        f[4]=[ {
            index: 3, decrease: 1
        }
        ];
        f[5]=[ {
            index: 6, decrease: 1
        }
        ];
        f[6]=[ {
            index: 7, decrease: 1
        }
        ];
        f[7]=[ {
            index: 6, decrease: 1
        }
        ,
        {
            index: 8, decrease: 1
        }
        ];
        f[8]=[ {
            index: 7, decrease: 1
        }
        ];
        f[9]=[ {
            index: 8, decrease: 1
        }
        ];
        f[10]=[ {
            index: 11, decrease: 1
        }
        ];
        f[11]=[ {
            index: 12, decrease: 1
        }
        ];
        f[12]=[ {
            index: 11, decrease: 1
        }
        ];
        f[13]=[ {
            index: 12, decrease: 1
        }
        ];
        f[14]=[ {
            index: 15, decrease: 1
        }
        ];
        f[15]=[];
        f[16]=[ {
            index: 15, decrease: 1
        }
        ];
        f[17]=[ {
            index: 18, decrease: 1
        }
        ];
        f[18]=[ {
            index: 19, decrease: 1
        }
        ];
        f[19]=[ {
            index: 18, decrease: 1
        }
        ];
        f[20]=[ {
            index: 19, decrease: 1
        }
        ];
        f[21]=[ {
            index: 22, decrease: 1
        }
        ];
        f[22]=[];
        f[23]=[ {
            index: 22, decrease: 1
        }
        ];
        f[24]=[];
        f[25]=[ {
            index: 26, decrease: 1
        }
        ];
        f[26]=[];
        f[27]=[ {
            index: 26, decrease: 1
        }
        ];
        f[28]=[];
        f[29]=[];
        f[30]=[ {
            index: 31, decrease: 1
        }
        ];
        f[31]=[];
        f[32]=[ {
            index: 31, decrease: 1
        }
        ];
        f[33]=[];
        f[34]=[];
        f[35]=[ {
            index: 36, decrease: 1
        }
        ];
        f[36]=[];
        f[37]=[ {
            index: 36, decrease: 1
        }
        ];
        f[38]=[];
        f[39]=[ {
            index: 40, decrease: 1
        }
        ];
        f[40]=[];
        f[41]=[ {
            index: 40, decrease: 1
        }
        ];
        f[42]=[ {
            index: 43, decrease: 1
        }
        ];
        f[43]=[ {
            index: 44, decrease: 1
        }
        ];
        f[44]=[ {
            index: 43, decrease: 1
        }
        ];
        f[45]=[ {
            index: 44, decrease: 1
        }
        ];
        f[46]=[ {
            index: 47, decrease: 1
        }
        ];
        f[47]=[];
        f[48]=[ {
            index: 47, decrease: 1
        }
        ];
        f[49]=[ {
            index: 50, decrease: 1
        }
        ];
        f[50]=[ {
            index: 51, decrease: 1
        }
        ];
        f[51]=[ {
            index: 50, decrease: 1
        }
        ];
        f[52]=[ {
            index: 51, decrease: 1
        }
        ];
        f[53]=[ {
            index: 54, decrease: 1
        }
        ];
        f[54]=[ {
            index: 55, decrease: 1
        }
        ];
        f[55]=[ {
            index: 56, decrease: 1
        }
        ,
        {
            index: 54, decrease: 1
        }
        ];
        f[56]=[ {
            index: 55, decrease: 1
        }
        ];
        f[57]=[ {
            index: 56, decrease: 1
        }
        ];
        f[58]=[ {
            index: 59, decrease: 1
        }
        ];
        f[59]=[ {
            index: 60, decrease: 1
        }
        ];
        f[60]=[ {
            index: 61, decrease: 1
        }
        ,
        {
            index: 59, decrease: 1
        }
        ];
        f[61]=[ {
            index: 60, decrease: 1
        }
        ];
        f[62]=[ {
            index: 61, decrease: 1
        }
        ];
        f[63]=[ {
            index: 0, decrease: 1
        }
        ,
        {
            index: 64, decrease: 1
        }
        ];
        f[64]=[ {
            index: 1, decrease: 1
        }
        ,
        {
            index: 65, decrease: 1
        }
        ];
        f[65]=[ {
            index: 2, decrease: 1
        }
        ,
        {
            index: 64, decrease: 1
        }
        ];
        f[66]=[ {
            index: 3, decrease: 1
        }
        ,
        {
            index: 65, decrease: 1
        }
        ];
        f[67]=[ {
            index: 6, decrease: 1
        }
        ,
        {
            index: 68, decrease: 1
        }
        ];
        f[68]=[ {
            index: 7, decrease: 1
        }
        ,
        {
            index: 69, decrease: 1
        }
        ];
        f[69]=[ {
            index: 8, decrease: 1
        }
        ,
        {
            index: 68, decrease: 1
        }
        ];
        f[70]=[ {
            index: 9, decrease: 1
        }
        ,
        {
            index: 69, decrease: 1
        }
        ];
        f[71]=[ {
            index: 10, decrease: 1
        }
        ,
        {
            index: 72, decrease: 1
        }
        ];
        f[72]=[ {
            index: 11, decrease: 1
        }
        ];
        f[73]=[ {
            index: 12, decrease: 1
        }
        ,
        {
            index: 72, decrease: 1
        }
        ];
        f[74]=[ {
            index: 15, decrease: 1
        }
        ];
        f[75]=[ {
            index: 18, decrease: 1
        }
        ,
        {
            index: 76, decrease: 1
        }
        ];
        f[76]=[ {
            index: 19, decrease: 1
        }
        ];
        f[77]=[ {
            index: 20, decrease: 1
        }
        ,
        {
            index: 76, decrease: 1
        }
        ];
        f[78]=[ {
            index: 21, decrease: 1
        }
        ];
        f[79]=[ {
            index: 22, decrease: 1
        }
        ];
        f[80]=[ {
            index: 26, decrease: 1
        }
        ];
        f[81]=[ {
            index: 27, decrease: 1
        }
        ];
        f[82]=[ {
            index: 28, decrease: 1
        }
        ];
        f[83]=[ {
            index: 31, decrease: 1
        }
        ];
        f[84]=[ {
            index: 34, decrease: 1
        }
        ];
        f[85]=[ {
            index: 35, decrease: 1
        }
        ];
        f[86]=[ {
            index: 36, decrease: 1
        }
        ];
        f[87]=[ {
            index: 40, decrease: 1
        }
        ];
        f[88]=[ {
            index: 41, decrease: 1
        }
        ];
        f[89]=[ {
            index: 42, decrease: 1
        }
        ,
        {
            index: 90, decrease: 1
        }
        ];
        f[90]=[ {
            index: 43, decrease: 1
        }
        ];
        f[91]=[ {
            index: 44, decrease: 1
        }
        ,
        {
            index: 90, decrease: 1
        }
        ];
        f[92]=[ {
            index: 47, decrease: 1
        }
        ];
        f[93]=[ {
            index: 50, decrease: 1
        }
        ,
        {
            index: 94, decrease: 1
        }
        ];
        f[94]=[ {
            index: 51, decrease: 1
        }
        ];
        f[95]=[ {
            index: 52, decrease: 1
        }
        ,
        {
            index: 94, decrease: 1
        }
        ];
        f[96]=[ {
            index: 53, decrease: 1
        }
        ,
        {
            index: 97, decrease: 1
        }
        ];
        f[97]=[ {
            index: 54, decrease: 1
        }
        ,
        {
            index: 98, decrease: 1
        }
        ];
        f[98]=[ {
            index: 55, decrease: 1
        }
        ,
        {
            index: 97, decrease: 1
        }
        ];
        f[99]=[ {
            index: 56, decrease: 1
        }
        ,
        {
            index: 98, decrease: 1
        }
        ];
        f[100]=[ {
            index: 101, decrease: 1
        }
        ,
        {
            index: 59, decrease: 1
        }
        ];
        f[101]=[ {
            index: 102, decrease: 1
        }
        ,
        {
            index: 60, decrease: 1
        }
        ];
        f[102]=[ {
            index: 101, decrease: 1
        }
        ,
        {
            index: 61, decrease: 1
        }
        ];
        f[103]=[ {
            index: 102, decrease: 1
        }
        ,
        {
            index: 62, decrease: 1
        }
        ];
        f[104]=[ {
            index: 105, decrease: 1
        }
        ,
        {
            index: 0, decrease: 1
        }
        ,
        {
            index: 63, decrease: 1
        }
        ];
        f[105]=[ {
            index: 1, decrease: 1
        }
        ,
        {
            index: 64, decrease: 1
        }
        ];
        f[106]=[ {
            index: 105, decrease: 1
        }
        ,
        {
            index: 2, decrease: 1
        }
        ,
        {
            index: 65, decrease: 1
        }
        ];
        f[107]=[ {
            index: 108, decrease: 1
        }
        ,
        {
            index: 7, decrease: 1
        }
        ,
        {
            index: 68, decrease: 1
        }
        ];
        f[108]=[ {
            index: 8, decrease: 1
        }
        ,
        {
            index: 69, decrease: 1
        }
        ];
        f[109]=[ {
            index: 108, decrease: 1
        }
        ,
        {
            index: 9, decrease: 1
        }
        ,
        {
            index: 70, decrease: 1
        }
        ];
        f[110]=[ {
            index: 10, decrease: 1
        }
        ,
        {
            index: 71, decrease: 1
        }
        ];
        f[111]=[ {
            index: 11, decrease: 1
        }
        ,
        {
            index: 72, decrease: 1
        }
        ];
        f[112]=[ {
            index: 19, decrease: 1
        }
        ,
        {
            index: 76, decrease: 1
        }
        ];
        f[113]=[ {
            index: 77, decrease: 1
        }
        ,
        {
            index: 20, decrease: 1
        }
        ];
        f[114]=[ {
            index: 78, decrease: 1
        }
        ,
        {
            index: 21, decrease: 1
        }
        ];
        f[115]=[ {
            index: 81, decrease: 1
        }
        ,
        {
            index: 27, decrease: 1
        }
        ];
        f[116]=[ {
            index: 35, decrease: 1
        }
        ,
        {
            index: 85, decrease: 1
        }
        ];
        f[117]=[ {
            index: 41, decrease: 1
        }
        ,
        {
            index: 88, decrease: 1
        }
        ];
        f[118]=[ {
            index: 42, decrease: 1
        }
        ,
        {
            index: 89, decrease: 1
        }
        ];
        f[119]=[ {
            index: 43, decrease: 1
        }
        ,
        {
            index: 90, decrease: 1
        }
        ];
        f[120]=[ {
            index: 51, decrease: 1
        }
        ,
        {
            index: 94, decrease: 1
        }
        ];
        f[121]=[ {
            index: 52, decrease: 1
        }
        ,
        {
            index: 95, decrease: 1
        }
        ];
        f[122]=[ {
            index: 53, decrease: 1
        }
        ,
        {
            index: 123, decrease: 1
        }
        ,
        {
            index: 96, decrease: 1
        }
        ];
        f[123]=[ {
            index: 54, decrease: 1
        }
        ,
        {
            index: 97, decrease: 1
        }
        ];
        f[124]=[ {
            index: 55, decrease: 1
        }
        ,
        {
            index: 123, decrease: 1
        }
        ,
        {
            index: 98, decrease: 1
        }
        ];
        f[125]=[ {
            index: 126, decrease: 1
        }
        ,
        {
            index: 101, decrease: 1
        }
        ,
        {
            index: 60, decrease: 1
        }
        ];
        f[126]=[ {
            index: 102, decrease: 1
        }
        ,
        {
            index: 61, decrease: 1
        }
        ];
        f[127]=[ {
            index: 126, decrease: 1
        }
        ,
        {
            index: 103, decrease: 1
        }
        ,
        {
            index: 62, decrease: 1
        }
        ];
        f[128]=[ {
            index: 104, decrease: 1
        }
        ,
        {
            index: 0, decrease: 1
        }
        ,
        {
            index: 63, decrease: 1
        }
        ];
        f[129]=[ {
            index: 105, decrease: 1
        }
        ,
        {
            index: 1, decrease: 1
        }
        ,
        {
            index: 64, decrease: 1
        }
        ];
        f[130]=[ {
            index: 108, decrease: 1
        }
        ,
        {
            index: 8, decrease: 1
        }
        ,
        {
            index: 69, decrease: 1
        }
        ];
        f[131]=[ {
            index: 109, decrease: 1
        }
        ,
        {
            index: 9, decrease: 1
        }
        ,
        {
            index: 70, decrease: 1
        }
        ];
        f[132]=[ {
            index: 110, decrease: 1
        }
        ,
        {
            index: 10, decrease: 1
        }
        ,
        {
            index: 71, decrease: 1
        }
        ];
        f[133]=[ {
            index: 113, decrease: 1
        }
        ,
        {
            index: 77, decrease: 1
        }
        ,
        {
            index: 20, decrease: 1
        }
        ];
        f[134]=[ {
            index: 118, decrease: 1
        }
        ,
        {
            index: 42, decrease: 1
        }
        ,
        {
            index: 89, decrease: 1
        }
        ];
        f[135]=[ {
            index: 52, decrease: 1
        }
        ,
        {
            index: 121, decrease: 1
        }
        ,
        {
            index: 95, decrease: 1
        }
        ];
        f[136]=[ {
            index: 53, decrease: 1
        }
        ,
        {
            index: 122, decrease: 1
        }
        ,
        {
            index: 96, decrease: 1
        }
        ];
        f[137]=[ {
            index: 54, decrease: 1
        }
        ,
        {
            index: 123, decrease: 1
        }
        ,
        {
            index: 97, decrease: 1
        }
        ];
        f[138]=[ {
            index: 126, decrease: 1
        }
        ,
        {
            index: 102, decrease: 1
        }
        ,
        {
            index: 61, decrease: 1
        }
        ];
        f[139]=[ {
            index: 127, decrease: 1
        }
        ,
        {
            index: 103, decrease: 1
        }
        ,
        {
            index: 62, decrease: 1
        }
        ];
        f[140]=[ {
            index: 128, decrease: 1
        }
        ,
        {
            index: 104, decrease: 1
        }
        ,
        {
            index: 0, decrease: 1
        }
        ,
        {
            index: 63, decrease: 1
        }
        ];
        f[141]=[ {
            index: 131, decrease: 1
        }
        ,
        {
            index: 109, decrease: 1
        }
        ,
        {
            index: 9, decrease: 1
        }
        ,
        {
            index: 70, decrease: 1
        }
        ];
        f[142]=[ {
            index: 136, decrease: 1
        }
        ,
        {
            index: 53, decrease: 1
        }
        ,
        {
            index: 122, decrease: 1
        }
        ,
        {
            index: 96, decrease: 1
        }
        ];
        f[143]=[ {
            index: 139, decrease: 1
        }
        ,
        {
            index: 127, decrease: 1
        }
        ,
        {
            index: 103, decrease: 1
        }
        ,
        {
            index: 62, decrease: 1
        }
        ];
        d[0]=0;
        d[1]=0;
        d[2]=0;
        d[3]=0;
        d[4]=0;
        d[5]=0;
        d[6]=0;
        d[7]=0;
        d[8]=0;
        d[9]=0;
        d[10]=0;
        d[11]=0;
        d[12]=0;
        d[13]=0;
        d[14]=0;
        d[15]=0;
        d[16]=0;
        d[17]=0;
        d[18]=0;
        d[19]=0;
        d[20]=0;
        d[21]=0;
        d[22]=0;
        d[23]=0;
        d[24]=0;
        d[25]=0;
        d[26]=0;
        d[27]=0;
        d[28]=0;
        d[29]=0;
        d[30]=0;
        d[31]=0;
        d[32]=0;
        d[33]=0;
        d[34]=0;
        d[35]=0;
        d[36]=0;
        d[37]=0;
        d[38]=0;
        d[39]=0;
        d[40]=0;
        d[41]=0;
        d[42]=0;
        d[43]=0;
        d[44]=0;
        d[45]=0;
        d[46]=0;
        d[47]=0;
        d[48]=0;
        d[49]=0;
        d[50]=0;
        d[51]=0;
        d[52]=0;
        d[53]=0;
        d[54]=0;
        d[55]=0;
        d[56]=0;
        d[57]=0;
        d[58]=0;
        d[59]=0;
        d[60]=0;
        d[61]=0;
        d[62]=0;
        d[63]=1;
        d[64]=1;
        d[65]=1;
        d[66]=1;
        d[67]=1;
        d[68]=1;
        d[69]=1;
        d[70]=1;
        d[71]=1;
        d[72]=1;
        d[73]=1;
        d[74]=1;
        d[75]=1;
        d[76]=1;
        d[77]=1;
        d[78]=1;
        d[79]=1;
        d[80]=1;
        d[81]=1;
        d[82]=1;
        d[83]=1;
        d[84]=1;
        d[85]=1;
        d[86]=1;
        d[87]=1;
        d[88]=1;
        d[89]=1;
        d[90]=1;
        d[91]=1;
        d[92]=1;
        d[93]=1;
        d[94]=1;
        d[95]=1;
        d[96]=1;
        d[97]=1;
        d[98]=1;
        d[99]=1;
        d[100]=1;
        d[101]=1;
        d[102]=1;
        d[103]=1;
        d[104]=2;
        d[105]=2;
        d[106]=2;
        d[107]=2;
        d[108]=2;
        d[109]=2;
        d[110]=2;
        d[111]=2;
        d[112]=2;
        d[113]=2;
        d[114]=2;
        d[115]=2;
        d[116]=2;
        d[117]=2;
        d[118]=2;
        d[119]=2;
        d[120]=2;
        d[121]=2;
        d[122]=2;
        d[123]=2;
        d[124]=2;
        d[125]=2;
        d[126]=2;
        d[127]=2;
        d[128]=3;
        d[129]=3;
        d[130]=3;
        d[131]=3;
        d[132]=3;
        d[133]=3;
        d[134]=3;
        d[135]=3;
        d[136]=3;
        d[137]=3;
        d[138]=3;
        d[139]=3;
        d[140]=4;
        d[141]=4;
        d[142]=4;
        d[143]=4
    }
    ;
    this.initLayoutFour=function() {
        h= {
            x: 192, y: 40
        }
        ;
        g=SCORE_BONUS_LAYOUT_MEDIUM;
        b[0]= {
            x: 10.5, y: 10
        }
        ;
        b[1]= {
            x: 39.5, y: 10
        }
        ;
        b[2]= {
            x: 68.5, y: 10
        }
        ;
        b[3]= {
            x: 97.5, y: 10
        }
        ;
        b[4]= {
            x: 126.5, y: 10
        }
        ;
        b[5]= {
            x: 155.5, y: 10
        }
        ;
        b[6]= {
            x: 184.5, y: 10
        }
        ;
        b[7]= {
            x: 213.5, y: 10
        }
        ;
        b[8]= {
            x: 242.5, y: 10
        }
        ;
        b[9]= {
            x: 10.5, y: 49.5
        }
        ;
        b[10]= {
            x: 39.5, y: 49.5
        }
        ;
        b[11]= {
            x: 68.5, y: 49.5
        }
        ;
        b[12]= {
            x: 97.5, y: 49.5
        }
        ;
        b[13]= {
            x: 126.5, y: 49.6
        }
        ;
        b[14]= {
            x: 155.5, y: 49.6
        }
        ;
        b[15]= {
            x: 184.5, y: 49.5
        }
        ;
        b[16]= {
            x: 213.5, y: 49.5
        }
        ;
        b[17]= {
            x: 242.5, y: 49.5
        }
        ;
        b[18]= {
            x: 10.5, y: 89
        }
        ;
        b[19]= {
            x: 39.5, y: 89
        }
        ;
        b[20]= {
            x: 68.5, y: 89
        }
        ;
        b[21]= {
            x: 97.5, y: 89
        }
        ;
        b[22]= {
            x: 184.5, y: 89
        }
        ;
        b[23]= {
            x: 213.5, y: 89
        }
        ;
        b[24]= {
            x: 242.5, y: 89
        }
        ;
        b[25]= {
            x: 10.5, y: 128.5
        }
        ;
        b[26]= {
            x: 39.5, y: 128.5
        }
        ;
        b[27]= {
            x: 68.5, y: 128.5
        }
        ;
        b[28]= {
            x: 184.5, y: 128.5
        }
        ;
        b[29]= {
            x: 213.5, y: 128.5
        }
        ;
        b[30]= {
            x: 242.5, y: 128.5
        }
        ;
        b[31]= {
            x: 10.5, y: 168
        }
        ;
        b[32]= {
            x: 39.5, y: 168
        }
        ;
        b[33]= {
            x: 126.5, y: 168
        }
        ;
        b[34]= {
            x: 184.5, y: 168
        }
        ;
        b[35]= {
            x: 213.5, y: 168
        }
        ;
        b[36]= {
            x: 242.5, y: 168
        }
        ;
        b[37]= {
            x: 10.5, y: 207.5
        }
        ;
        b[38]= {
            x: 39.5, y: 207.5
        }
        ;
        b[39]= {
            x: 213.5, y: 207.5
        }
        ;
        b[40]= {
            x: 242.5, y: 207.5
        }
        ;
        b[41]= {
            x: 10.5, y: 247
        }
        ;
        b[42]= {
            x: 39.5, y: 247
        }
        ;
        b[43]= {
            x: 68.5, y: 247
        }
        ;
        b[44]= {
            x: 97.5, y: 247
        }
        ;
        b[45]= {
            x: 126.5, y: 247
        }
        ;
        b[46]= {
            x: 184.5, y: 247
        }
        ;
        b[47]= {
            x: 213.5, y: 247
        }
        ;
        b[48]= {
            x: 242.5, y: 247
        }
        ;
        b[49]= {
            x: 10.5, y: 286.5
        }
        ;
        b[50]= {
            x: 39.5, y: 286.5
        }
        ;
        b[51]= {
            x: 68.5, y: 286.5
        }
        ;
        b[52]= {
            x: 97.5, y: 286.5
        }
        ;
        b[53]= {
            x: 126.5, y: 286.5
        }
        ;
        b[54]= {
            x: 155.5, y: 286.5
        }
        ;
        b[55]= {
            x: 184.5, y: 286.5
        }
        ;
        b[56]= {
            x: 213.5, y: 286.5
        }
        ;
        b[57]= {
            x: 242.5, y: 286.5
        }
        ;
        b[58]= {
            x: 10.5, y: 326
        }
        ;
        b[59]= {
            x: 39.5, y: 326
        }
        ;
        b[60]= {
            x: 68.5, y: 326
        }
        ;
        b[61]= {
            x: 97.5, y: 326
        }
        ;
        b[62]= {
            x: 126.5, y: 326
        }
        ;
        b[63]= {
            x: 155.5, y: 326
        }
        ;
        b[64]= {
            x: 184.5, y: 326
        }
        ;
        b[65]= {
            x: 213.5, y: 326
        }
        ;
        b[66]= {
            x: 242.5, y: 326
        }
        ;
        b[67]= {
            x: 5.5, y: 5.3
        }
        ;
        b[68]= {
            x: 237.5, y: 5.3
        }
        ;
        b[69]= {
            x: 92.5, y: 44.8
        }
        ;
        b[70]= {
            x: 121.5, y: 44.75
        }
        ;
        b[71]= {
            x: 150.5, y: 44.8
        }
        ;
        b[72]= {
            x: 179.5, y: 44.8
        }
        ;
        b[73]= {
            x: 92.5, y: 84.3
        }
        ;
        b[74]= {
            x: 179.5, y: 84.3
        }
        ;
        b[75]= {
            x: 63.5, y: 123.8
        }
        ;
        b[76]= {
            x: 179.5, y: 123.8
        }
        ;
        b[77]= {
            x: 34.5, y: 163.3
        }
        ;
        b[78]= {
            x: 121.5, y: 163.3
        }
        ;
        b[79]= {
            x: 179.5, y: 163.3
        }
        ;
        b[80]= {
            x: 208.5, y: 163.3
        }
        ;
        b[81]= {
            x: 34.5, y: 202.8
        }
        ;
        b[82]= {
            x: 208.5, y: 202.8
        }
        ;
        b[83]= {
            x: 34.5, y: 242.3
        }
        ;
        b[84]= {
            x: 63.5, y: 242.3
        }
        ;
        b[85]= {
            x: 92.5, y: 242.3
        }
        ;
        b[86]= {
            x: 121.5, y: 242.3
        }
        ;
        b[87]= {
            x: 179.5, y: 242.3
        }
        ;
        b[88]= {
            x: 208.5, y: 242.3
        }
        ;
        b[89]= {
            x: 121.5, y: 281.8
        }
        ;
        b[90]= {
            x: 150.5, y: 281.8
        }
        ;
        b[91]= {
            x: 179.5, y: 281.8
        }
        ;
        b[92]= {
            x: 5.5, y: 321.3
        }
        ;
        b[93]= {
            x: 237.5, y: 321.3
        }
        ;
        b[94]= {
            x: 0, y: 0
        }
        ;
        b[95]= {
            x: 232, y: 0
        }
        ;
        b[96]= {
            x: 87, y: 39.55
        }
        ;
        b[97]= {
            x: 116, y: 39.5
        }
        ;
        b[98]= {
            x: 145, y: 39.55
        }
        ;
        b[99]= {
            x: 174, y: 39.55
        }
        ;
        b[100]= {
            x: 87, y: 79
        }
        ;
        b[101]= {
            x: 174, y: 79
        }
        ;
        b[102]= {
            x: 58, y: 118.4
        }
        ;
        b[103]= {
            x: 174, y: 118.4
        }
        ;
        b[104]= {
            x: 29, y: 157.9
        }
        ;
        b[105]= {
            x: 116, y: 157.9
        }
        ;
        b[106]= {
            x: 174, y: 157.9
        }
        ;
        b[107]= {
            x: 203, y: 157.9
        }
        ;
        b[108]= {
            x: 29, y: 197.4
        }
        ;
        b[109]= {
            x: 203, y: 197.4
        }
        ;
        b[110]= {
            x: 29, y: 236.9
        }
        ;
        b[111]= {
            x: 58, y: 236.9
        }
        ;
        b[112]= {
            x: 87, y: 236.9
        }
        ;
        b[113]= {
            x: 116, y: 236.9
        }
        ;
        b[114]= {
            x: 174, y: 236.9
        }
        ;
        b[115]= {
            x: 203, y: 236.9
        }
        ;
        b[116]= {
            x: 116, y: 276.4
        }
        ;
        b[117]= {
            x: 145, y: 276.4
        }
        ;
        b[118]= {
            x: 174, y: 276.4
        }
        ;
        b[119]= {
            x: 0, y: 315.9
        }
        ;
        b[120]= {
            x: 232, y: 315.9
        }
        ;
        b[121]= {
            x: 82.5, y: 34.8
        }
        ;
        b[122]= {
            x: 111.5, y: 34.75
        }
        ;
        b[123]= {
            x: 140.5, y: 34.8
        }
        ;
        b[124]= {
            x: 169.5, y: 34.8
        }
        ;
        b[125]= {
            x: 82.5, y: 74.3
        }
        ;
        b[126]= {
            x: 169.5, y: 74.3
        }
        ;
        b[127]= {
            x: 53.5, y: 113.8
        }
        ;
        b[128]= {
            x: 169.5, y: 113.8
        }
        ;
        b[129]= {
            x: 24.5, y: 153.3
        }
        ;
        b[130]= {
            x: 111.5, y: 153.3
        }
        ;
        b[131]= {
            x: 169.5, y: 153.3
        }
        ;
        b[132]= {
            x: 198.5, y: 153.3
        }
        ;
        b[133]= {
            x: 24.5, y: 192.8
        }
        ;
        b[134]= {
            x: 198.5, y: 192.8
        }
        ;
        b[135]= {
            x: 24.5, y: 232.3
        }
        ;
        b[136]= {
            x: 53.5, y: 232.3
        }
        ;
        b[137]= {
            x: 82.5, y: 232.3
        }
        ;
        b[138]= {
            x: 111.5, y: 232.3
        }
        ;
        b[139]= {
            x: 169.5, y: 232.3
        }
        ;
        b[140]= {
            x: 198.5, y: 232.3
        }
        ;
        b[141]= {
            x: 111.5, y: 271.8
        }
        ;
        b[142]= {
            x: 140.5, y: 271.8
        }
        ;
        b[143]= {
            x: 169.5, y: 271.8
        }
        ;
        a[0]=[67,
        94];
        c[0]=[];
        e[0]=[];
        a[1]=[];
        c[1]=[0];
        e[1]=[2];
        a[2]=[];
        c[2]=[1];
        e[2]=[3];
        a[3]=[];
        c[3]=[2];
        e[3]=[4];
        a[4]=[];
        c[4]=[3];
        e[4]=[5];
        a[5]=[];
        c[5]=[4];
        e[5]=[6];
        a[6]=[];
        c[6]=[5];
        e[6]=[7];
        a[7]=[];
        c[7]=[6];
        e[7]=[8];
        a[8]=[68,
        95];
        c[8]=[];
        e[8]=[];
        a[9]=[];
        c[9]=[];
        e[9]=[];
        a[10]=[];
        c[10]=[9];
        e[10]=[11];
        a[11]=[];
        c[11]=[10];
        e[11]=[12];
        a[12]=[69,
        96,
        121];
        c[12]=[11];
        e[12]=[13];
        a[13]=[70,
        97,
        122];
        c[13]=[12];
        e[13]=[14];
        a[14]=[71,
        98,
        123];
        c[14]=[13];
        e[14]=[15];
        a[15]=[72,
        99,
        124];
        c[15]=[14];
        e[15]=[16];
        a[16]=[];
        c[16]=[15];
        e[16]=[17];
        a[17]=[];
        c[17]=[];
        e[17]=[];
        a[18]=[];
        c[18]=[];
        e[18]=[];
        a[19]=[];
        c[19]=[18];
        e[19]=[20];
        a[20]=[];
        c[20]=[19];
        e[20]=[21];
        a[21]=[73,
        100,
        125];
        c[21]=[];
        e[21]=[];
        a[22]=[74,
        101,
        126];
        c[22]=[];
        e[22]=[];
        a[23]=[];
        c[23]=[22];
        e[23]=[24];
        a[24]=[];
        c[24]=[];
        e[24]=[];
        a[25]=[];
        c[25]=[];
        e[25]=[];
        a[26]=[];
        c[26]=[25];
        e[26]=[27];
        a[27]=[75,
        102,
        127];
        c[27]=[];
        e[27]=[];
        a[28]=[76,
        103,
        128];
        c[28]=[];
        e[28]=[];
        a[29]=[];
        c[29]=[28];
        e[29]=[30];
        a[30]=[];
        c[30]=[];
        e[30]=[];
        a[31]=[];
        c[31]=[];
        e[31]=[];
        a[32]=[77,
        104,
        129];
        c[32]=[];
        e[32]=[];
        a[33]=[78,
        105,
        130];
        c[33]=[];
        e[33]=[];
        a[34]=[79,
        106,
        131];
        c[34]=[];
        e[34]=[];
        a[35]=[80,
        107,
        132];
        c[35]=[34];
        e[35]=[36];
        a[36]=[];
        c[36]=[];
        e[36]=[];
        a[37]=[];
        c[37]=[];
        e[37]=[];
        a[38]=[81,
        108,
        133];
        c[38]=[];
        e[38]=[];
        a[39]=[82,
        109,
        134];
        c[39]=[];
        e[39]=[];
        a[40]=[];
        c[40]=[];
        e[40]=[];
        a[41]=[];
        c[41]=[];
        e[41]=[];
        a[42]=[83,
        110,
        135];
        c[42]=[41];
        e[42]=[43];
        a[43]=[84,
        111,
        136];
        c[43]=[42];
        e[43]=[44];
        a[44]=[85,
        112,
        137];
        c[44]=[43];
        e[44]=[45];
        a[45]=[86,
        113,
        138];
        c[45]=[];
        e[45]=[];
        a[46]=[87,
        114,
        139];
        c[46]=[];
        e[46]=[];
        a[47]=[88,
        115,
        140];
        c[47]=[46];
        e[47]=[48];
        a[48]=[];
        c[48]=[];
        e[48]=[];
        a[49]=[];
        c[49]=[];
        e[49]=[];
        a[50]=[];
        c[50]=[49];
        e[50]=[51];
        a[51]=[];
        c[51]=[50];
        e[51]=[52];
        a[52]=[];
        c[52]=[51];
        e[52]=[53];
        a[53]=[89,
        116,
        141];
        c[53]=[52];
        e[53]=[54];
        a[54]=[90,
        117,
        142];
        c[54]=[53];
        e[54]=[55];
        a[55]=[91,
        118,
        143];
        c[55]=[54];
        e[55]=[56];
        a[56]=[];
        c[56]=[55];
        e[56]=[57];
        a[57]=[];
        c[57]=[];
        e[57]=[];
        a[58]=[92,
        119];
        c[58]=[];
        e[58]=[];
        a[59]=[];
        c[59]=[58];
        e[59]=[60];
        a[60]=[];
        c[60]=[59];
        e[60]=[61];
        a[61]=[];
        c[61]=[60];
        e[61]=[62];
        a[62]=[];
        c[62]=[61];
        e[62]=[63];
        a[63]=[];
        c[63]=[62];
        e[63]=[64];
        a[64]=[];
        c[64]=[63];
        e[64]=[65];
        a[65]=[];
        c[65]=[64];
        e[65]=[66];
        a[66]=[93,
        120];
        c[66]=[];
        e[66]=[];
        a[67]=[94];
        c[67]=[];
        e[67]=[];
        a[68]=[95];
        c[68]=[];
        e[68]=[];
        a[69]=[96,
        121];
        c[69]=[];
        e[69]=[];
        a[70]=[97,
        122];
        c[70]=[69];
        e[70]=[71];
        a[71]=[98,
        123];
        c[71]=[70];
        e[71]=[72];
        a[72]=[99,
        124];
        c[72]=[];
        e[72]=[];
        a[73]=[100,
        125];
        c[73]=[];
        e[73]=[];
        a[74]=[101,
        126];
        c[74]=[];
        e[74]=[];
        a[75]=[102,
        127];
        c[75]=[];
        e[75]=[];
        a[76]=[103,
        128];
        c[76]=[];
        e[76]=[];
        a[77]=[104,
        129];
        c[77]=[];
        e[77]=[];
        a[78]=[105,
        130];
        c[78]=[];
        e[78]=[];
        a[79]=[106,
        131];
        c[79]=[];
        e[79]=[];
        a[80]=[107,
        132];
        c[80]=[];
        e[80]=[];
        a[81]=[108,
        133];
        c[81]=[];
        e[81]=[];
        a[82]=[109,
        134];
        c[82]=[];
        e[82]=[];
        a[83]=[110,
        135];
        c[83]=[];
        e[83]=[];
        a[84]=[111,
        136];
        c[84]=[83];
        e[84]=[85];
        a[85]=[112,
        137];
        c[85]=[84];
        e[85]=[86];
        a[86]=[113,
        138];
        c[86]=[];
        e[86]=[];
        a[87]=[114,
        139];
        c[87]=[];
        e[87]=[];
        a[88]=[115,
        140];
        c[88]=[];
        e[88]=[];
        a[89]=[116,
        141];
        c[89]=[];
        e[89]=[];
        a[90]=[117,
        142];
        c[90]=[89];
        e[90]=[91];
        a[91]=[118,
        143];
        c[91]=[];
        e[91]=[];
        a[92]=[119];
        c[92]=[];
        e[92]=[];
        a[93]=[120];
        c[93]=[];
        e[93]=[];
        a[94]=[];
        c[94]=[];
        e[94]=[];
        a[95]=[];
        c[95]=[];
        e[95]=[];
        a[96]=[121];
        c[96]=[];
        e[96]=[];
        a[97]=[122];
        c[97]=[96];
        e[97]=[98];
        a[98]=[123];
        c[98]=[97];
        e[98]=[99];
        a[99]=[124];
        c[99]=[];
        e[99]=[];
        a[100]=[125];
        c[100]=[];
        e[100]=[];
        a[101]=[126];
        c[101]=[];
        e[101]=[];
        a[102]=[127];
        c[102]=[];
        e[102]=[];
        a[103]=[128];
        c[103]=[];
        e[103]=[];
        a[104]=[129];
        c[104]=[];
        e[104]=[];
        a[105]=[130];
        c[105]=[];
        e[105]=[];
        a[106]=[131];
        c[106]=[];
        e[106]=[];
        a[107]=[132];
        c[107]=[];
        e[107]=[];
        a[108]=[133];
        c[108]=[];
        e[108]=[];
        a[109]=[134];
        c[109]=[];
        e[109]=[];
        a[110]=[135];
        c[110]=[];
        e[110]=[];
        a[111]=[136];
        c[111]=[110];
        e[111]=[112];
        a[112]=[137];
        c[112]=[111];
        e[112]=[113];
        a[113]=[138];
        c[113]=[];
        e[113]=[];
        a[114]=[139];
        c[114]=[];
        e[114]=[];
        a[115]=[140];
        c[115]=[];
        e[115]=[];
        a[116]=[141];
        c[116]=[];
        e[116]=[];
        a[117]=[142];
        c[117]=[116];
        e[117]=[118];
        a[118]=[143];
        c[118]=[];
        e[118]=[];
        a[119]=[];
        c[119]=[];
        e[119]=[];
        a[120]=[];
        c[120]=[];
        e[120]=[];
        a[121]=[];
        c[121]=[];
        e[121]=[];
        a[122]=[];
        c[122]=[121];
        e[122]=[123];
        a[123]=[];
        c[123]=[122];
        e[123]=[124];
        a[124]=[];
        c[124]=[];
        e[124]=[];
        a[125]=[];
        c[125]=[];
        e[125]=[];
        a[126]=[];
        c[126]=[];
        e[126]=[];
        a[127]=[];
        c[127]=[];
        e[127]=[];
        a[128]=[];
        c[128]=[];
        e[128]=[];
        a[129]=[];
        c[129]=[];
        e[129]=[];
        a[130]=[];
        c[130]=[];
        e[130]=[];
        a[131]=[];
        c[131]=[];
        e[131]=[];
        a[132]=[];
        c[132]=[];
        e[132]=[];
        a[133]=[];
        c[133]=[];
        e[133]=[];
        a[134]=[];
        c[134]=[];
        e[134]=[];
        a[135]=[];
        c[135]=[];
        e[135]=[];
        a[136]=[];
        c[136]=[135];
        e[136]=[137];
        a[137]=[];
        c[137]=[136];
        e[137]=[138];
        a[138]=[];
        c[138]=[];
        e[138]=[];
        a[139]=[];
        c[139]=[];
        e[139]=[];
        a[140]=[];
        c[140]=[];
        e[140]=[];
        a[141]=[];
        c[141]=[];
        e[141]=[];
        a[142]=[];
        c[142]=[141];
        e[142]=[143];
        a[143]=[];
        c[143]=[];
        e[143]=[];
        f[0]=[ {
            index: 1, decrease: 1
        }
        ];
        f[1]=[ {
            index: 2, decrease: 1
        }
        ];
        f[2]=[ {
            index: 3, decrease: 1
        }
        ,
        {
            index: 1, decrease: 1
        }
        ];
        f[3]=[ {
            index: 2, decrease: 1
        }
        ,
        {
            index: 4, decrease: 1
        }
        ];
        f[4]=[ {
            index: 3, decrease: 1
        }
        ,
        {
            index: 5, decrease: 1
        }
        ];
        f[5]=[ {
            index: 6, decrease: 1
        }
        ,
        {
            index: 4, decrease: 1
        }
        ];
        f[6]=[ {
            index: 7, decrease: 1
        }
        ,
        {
            index: 5, decrease: 1
        }
        ];
        f[7]=[ {
            index: 6, decrease: 1
        }
        ];
        f[8]=[ {
            index: 7, decrease: 1
        }
        ];
        f[9]=[ {
            index: 10, decrease: 1
        }
        ];
        f[10]=[ {
            index: 11, decrease: 1
        }
        ];
        f[11]=[ {
            index: 12, decrease: 1
        }
        ,
        {
            index: 10, decrease: 1
        }
        ];
        f[12]=[ {
            index: 13, decrease: 1
        }
        ,
        {
            index: 11, decrease: 1
        }
        ];
        f[13]=[ {
            index: 14, decrease: 1
        }
        ,
        {
            index: 12, decrease: 1
        }
        ];
        f[14]=[ {
            index: 15, decrease: 1
        }
        ,
        {
            index: 13, decrease: 1
        }
        ];
        f[15]=[ {
            index: 16, decrease: 1
        }
        ,
        {
            index: 14, decrease: 1
        }
        ];
        f[16]=[ {
            index: 15, decrease: 1
        }
        ];
        f[17]=[ {
            index: 16, decrease: 1
        }
        ];
        f[18]=[ {
            index: 19, decrease: 1
        }
        ];
        f[19]=[ {
            index: 20, decrease: 1
        }
        ];
        f[20]=[ {
            index: 19, decrease: 1
        }
        ];
        f[21]=[ {
            index: 20, decrease: 1
        }
        ];
        f[22]=[ {
            index: 23, decrease: 1
        }
        ];
        f[23]=[];
        f[24]=[ {
            index: 23, decrease: 1
        }
        ];
        f[25]=[ {
            index: 26, decrease: 1
        }
        ];
        f[26]=[];
        f[27]=[ {
            index: 26, decrease: 1
        }
        ];
        f[28]=[ {
            index: 29, decrease: 1
        }
        ];
        f[29]=[];
        f[30]=[ {
            index: 29, decrease: 1
        }
        ];
        f[31]=[];
        f[32]=[];
        f[33]=[];
        f[34]=[ {
            index: 35, decrease: 1
        }
        ];
        f[35]=[];
        f[36]=[ {
            index: 35, decrease: 1
        }
        ];
        f[37]=[];
        f[38]=[];
        f[39]=[];
        f[40]=[];
        f[41]=[ {
            index: 42, decrease: 1
        }
        ];
        f[42]=[ {
            index: 43, decrease: 1
        }
        ];
        f[43]=[ {
            index: 44, decrease: 1
        }
        ,
        {
            index: 42, decrease: 1
        }
        ];
        f[44]=[ {
            index: 43, decrease: 1
        }
        ];
        f[45]=[ {
            index: 44, decrease: 1
        }
        ];
        f[46]=[ {
            index: 47, decrease: 1
        }
        ];
        f[47]=[];
        f[48]=[ {
            index: 47, decrease: 1
        }
        ];
        f[49]=[ {
            index: 50, decrease: 1
        }
        ];
        f[50]=[ {
            index: 51, decrease: 1
        }
        ];
        f[51]=[ {
            index: 52, decrease: 1
        }
        ,
        {
            index: 50, decrease: 1
        }
        ];
        f[52]=[ {
            index: 53, decrease: 1
        }
        ,
        {
            index: 51, decrease: 1
        }
        ];
        f[53]=[ {
            index: 54, decrease: 1
        }
        ,
        {
            index: 52, decrease: 1
        }
        ];
        f[54]=[ {
            index: 55, decrease: 1
        }
        ,
        {
            index: 53, decrease: 1
        }
        ];
        f[55]=[ {
            index: 56, decrease: 1
        }
        ,
        {
            index: 54, decrease: 1
        }
        ];
        f[56]=[ {
            index: 55, decrease: 1
        }
        ];
        f[57]=[ {
            index: 56, decrease: 1
        }
        ];
        f[58]=[ {
            index: 59, decrease: 1
        }
        ];
        f[59]=[ {
            index: 60, decrease: 1
        }
        ];
        f[60]=[ {
            index: 61, decrease: 1
        }
        ,
        {
            index: 59, decrease: 1
        }
        ];
        f[61]=[ {
            index: 62, decrease: 1
        }
        ,
        {
            index: 60, decrease: 1
        }
        ];
        f[62]=[ {
            index: 63, decrease: 1
        }
        ,
        {
            index: 61, decrease: 1
        }
        ];
        f[63]=[ {
            index: 64, decrease: 1
        }
        ,
        {
            index: 62, decrease: 1
        }
        ];
        f[64]=[ {
            index: 65, decrease: 1
        }
        ,
        {
            index: 63, decrease: 1
        }
        ];
        f[65]=[ {
            index: 64, decrease: 1
        }
        ];
        f[66]=[ {
            index: 65, decrease: 1
        }
        ];
        f[67]=[ {
            index: 0, decrease: 1
        }
        ];
        f[68]=[ {
            index: 8, decrease: 1
        }
        ];
        f[69]=[ {
            index: 70, decrease: 1
        }
        ,
        {
            index: 12, decrease: 1
        }
        ];
        f[70]=[ {
            index: 71, decrease: 1
        }
        ,
        {
            index: 13, decrease: 1
        }
        ];
        f[71]=[ {
            index: 70, decrease: 1
        }
        ,
        {
            index: 14, decrease: 1
        }
        ];
        f[72]=[ {
            index: 71, decrease: 1
        }
        ,
        {
            index: 15, decrease: 1
        }
        ];
        f[73]=[ {
            index: 21, decrease: 1
        }
        ];
        f[74]=[ {
            index: 22, decrease: 1
        }
        ];
        f[75]=[ {
            index: 27, decrease: 1
        }
        ];
        f[76]=[ {
            index: 28, decrease: 1
        }
        ];
        f[77]=[ {
            index: 32, decrease: 1
        }
        ];
        f[78]=[ {
            index: 33, decrease: 1
        }
        ];
        f[79]=[ {
            index: 34, decrease: 1
        }
        ];
        f[80]=[ {
            index: 35, decrease: 1
        }
        ];
        f[81]=[ {
            index: 38, decrease: 1
        }
        ];
        f[82]=[ {
            index: 39, decrease: 1
        }
        ];
        f[83]=[ {
            index: 84, decrease: 1
        }
        ,
        {
            index: 42, decrease: 1
        }
        ];
        f[84]=[ {
            index: 85, decrease: 1
        }
        ,
        {
            index: 43, decrease: 1
        }
        ];
        f[85]=[ {
            index: 84, decrease: 1
        }
        ,
        {
            index: 44, decrease: 1
        }
        ];
        f[86]=[ {
            index: 85, decrease: 1
        }
        ,
        {
            index: 45, decrease: 1
        }
        ];
        f[87]=[ {
            index: 46, decrease: 1
        }
        ];
        f[88]=[ {
            index: 47, decrease: 1
        }
        ];
        f[89]=[ {
            index: 53, decrease: 1
        }
        ,
        {
            index: 90, decrease: 1
        }
        ];
        f[90]=[ {
            index: 54, decrease: 1
        }
        ];
        f[91]=[ {
            index: 55, decrease: 1
        }
        ,
        {
            index: 90, decrease: 1
        }
        ];
        f[92]=[ {
            index: 58, decrease: 1
        }
        ];
        f[93]=[ {
            index: 66, decrease: 1
        }
        ];
        f[94]=[ {
            index: 0, decrease: 1
        }
        ,
        {
            index: 67, decrease: 1
        }
        ];
        f[95]=[ {
            index: 68, decrease: 1
        }
        ,
        {
            index: 8, decrease: 1
        }
        ];
        f[96]=[ {
            index: 69, decrease: 1
        }
        ,
        {
            index: 12, decrease: 1
        }
        ,
        {
            index: 97, decrease: 1
        }
        ];
        f[97]=[ {
            index: 70, decrease: 1
        }
        ,
        {
            index: 13, decrease: 1
        }
        ,
        {
            index: 98, decrease: 1
        }
        ];
        f[98]=[ {
            index: 71, decrease: 1
        }
        ,
        {
            index: 14, decrease: 1
        }
        ,
        {
            index: 97, decrease: 1
        }
        ];
        f[99]=[ {
            index: 72, decrease: 1
        }
        ,
        {
            index: 15, decrease: 1
        }
        ,
        {
            index: 98, decrease: 1
        }
        ];
        f[100]=[ {
            index: 73, decrease: 1
        }
        ,
        {
            index: 21, decrease: 1
        }
        ];
        f[101]=[ {
            index: 74, decrease: 1
        }
        ,
        {
            index: 22, decrease: 1
        }
        ];
        f[102]=[ {
            index: 75, decrease: 1
        }
        ,
        {
            index: 27, decrease: 1
        }
        ];
        f[103]=[ {
            index: 76, decrease: 1
        }
        ,
        {
            index: 28, decrease: 1
        }
        ];
        f[104]=[ {
            index: 77, decrease: 1
        }
        ,
        {
            index: 32, decrease: 1
        }
        ];
        f[105]=[ {
            index: 78, decrease: 1
        }
        ,
        {
            index: 33, decrease: 1
        }
        ];
        f[106]=[ {
            index: 79, decrease: 1
        }
        ,
        {
            index: 34, decrease: 1
        }
        ];
        f[107]=[ {
            index: 80, decrease: 1
        }
        ,
        {
            index: 35, decrease: 1
        }
        ];
        f[108]=[ {
            index: 81, decrease: 1
        }
        ,
        {
            index: 38, decrease: 1
        }
        ];
        f[109]=[ {
            index: 82, decrease: 1
        }
        ,
        {
            index: 39, decrease: 1
        }
        ];
        f[110]=[ {
            index: 83, decrease: 1
        }
        ,
        {
            index: 42, decrease: 1
        }
        ,
        {
            index: 111, decrease: 1
        }
        ];
        f[111]=[ {
            index: 84, decrease: 1
        }
        ,
        {
            index: 43, decrease: 1
        }
        ,
        {
            index: 112, decrease: 1
        }
        ];
        f[112]=[ {
            index: 85, decrease: 1
        }
        ,
        {
            index: 44, decrease: 1
        }
        ,
        {
            index: 111, decrease: 1
        }
        ];
        f[113]=[ {
            index: 86, decrease: 1
        }
        ,
        {
            index: 45, decrease: 1
        }
        ,
        {
            index: 112, decrease: 1
        }
        ];
        f[114]=[ {
            index: 87, decrease: 1
        }
        ,
        {
            index: 46, decrease: 1
        }
        ];
        f[115]=[ {
            index: 88, decrease: 1
        }
        ,
        {
            index: 47, decrease: 1
        }
        ];
        f[116]=[ {
            index: 53, decrease: 1
        }
        ,
        {
            index: 117, decrease: 1
        }
        ,
        {
            index: 89, decrease: 1
        }
        ];
        f[117]=[ {
            index: 54, decrease: 1
        }
        ,
        {
            index: 90, decrease: 1
        }
        ];
        f[118]=[ {
            index: 55, decrease: 1
        }
        ,
        {
            index: 117, decrease: 1
        }
        ,
        {
            index: 91, decrease: 1
        }
        ];
        f[119]=[ {
            index: 58, decrease: 1
        }
        ,
        {
            index: 92, decrease: 1
        }
        ];
        f[120]=[ {
            index: 66, decrease: 1
        }
        ,
        {
            index: 93, decrease: 1
        }
        ];
        f[121]=[ {
            index: 69, decrease: 1
        }
        ,
        {
            index: 122, decrease: 1
        }
        ,
        {
            index: 12, decrease: 1
        }
        ,
        {
            index: 96, decrease: 1
        }
        ];
        f[122]=[ {
            index: 70, decrease: 1
        }
        ,
        {
            index: 123, decrease: 1
        }
        ,
        {
            index: 13, decrease: 1
        }
        ,
        {
            index: 97, decrease: 1
        }
        ];
        f[123]=[ {
            index: 71, decrease: 1
        }
        ,
        {
            index: 122, decrease: 1
        }
        ,
        {
            index: 14, decrease: 1
        }
        ,
        {
            index: 98, decrease: 1
        }
        ];
        f[124]=[ {
            index: 72, decrease: 1
        }
        ,
        {
            index: 123, decrease: 1
        }
        ,
        {
            index: 15, decrease: 1
        }
        ,
        {
            index: 99, decrease: 1
        }
        ];
        f[125]=[ {
            index: 73, decrease: 1
        }
        ,
        {
            index: 21, decrease: 1
        }
        ,
        {
            index: 100, decrease: 1
        }
        ];
        f[126]=[ {
            index: 74, decrease: 1
        }
        ,
        {
            index: 22, decrease: 1
        }
        ,
        {
            index: 101, decrease: 1
        }
        ];
        f[127]=[ {
            index: 75, decrease: 1
        }
        ,
        {
            index: 27, decrease: 1
        }
        ,
        {
            index: 102, decrease: 1
        }
        ];
        f[128]=[ {
            index: 76, decrease: 1
        }
        ,
        {
            index: 28, decrease: 1
        }
        ,
        {
            index: 103, decrease: 1
        }
        ];
        f[129]=[ {
            index: 77, decrease: 1
        }
        ,
        {
            index: 32, decrease: 1
        }
        ,
        {
            index: 104, decrease: 1
        }
        ];
        f[130]=[ {
            index: 78, decrease: 1
        }
        ,
        {
            index: 33, decrease: 1
        }
        ,
        {
            index: 105, decrease: 1
        }
        ];
        f[131]=[ {
            index: 79, decrease: 1
        }
        ,
        {
            index: 34, decrease: 1
        }
        ,
        {
            index: 106, decrease: 1
        }
        ];
        f[132]=[ {
            index: 80, decrease: 1
        }
        ,
        {
            index: 35, decrease: 1
        }
        ,
        {
            index: 107, decrease: 1
        }
        ];
        f[133]=[ {
            index: 81, decrease: 1
        }
        ,
        {
            index: 38, decrease: 1
        }
        ,
        {
            index: 108, decrease: 1
        }
        ];
        f[134]=[ {
            index: 82, decrease: 1
        }
        ,
        {
            index: 39, decrease: 1
        }
        ,
        {
            index: 109, decrease: 1
        }
        ];
        f[135]=[ {
            index: 83, decrease: 1
        }
        ,
        {
            index: 42, decrease: 1
        }
        ,
        {
            index: 136, decrease: 1
        }
        ,
        {
            index: 110, decrease: 1
        }
        ];
        f[136]=[ {
            index: 84, decrease: 1
        }
        ,
        {
            index: 43, decrease: 1
        }
        ,
        {
            index: 137, decrease: 1
        }
        ,
        {
            index: 111, decrease: 1
        }
        ];
        f[137]=[ {
            index: 85, decrease: 1
        }
        ,
        {
            index: 44, decrease: 1
        }
        ,
        {
            index: 136, decrease: 1
        }
        ,
        {
            index: 112, decrease: 1
        }
        ];
        f[138]=[ {
            index: 86, decrease: 1
        }
        ,
        {
            index: 45, decrease: 1
        }
        ,
        {
            index: 137, decrease: 1
        }
        ,
        {
            index: 113, decrease: 1
        }
        ];
        f[139]=[ {
            index: 87, decrease: 1
        }
        ,
        {
            index: 46, decrease: 1
        }
        ,
        {
            index: 114, decrease: 1
        }
        ];
        f[140]=[ {
            index: 88, decrease: 1
        }
        ,
        {
            index: 47, decrease: 1
        }
        ,
        {
            index: 115, decrease: 1
        }
        ];
        f[141]=[ {
            index: 53, decrease: 1
        }
        ,
        {
            index: 142, decrease: 1
        }
        ,
        {
            index: 116, decrease: 1
        }
        ,
        {
            index: 89, decrease: 1
        }
        ];
        f[142]=[ {
            index: 54, decrease: 1
        }
        ,
        {
            index: 117, decrease: 1
        }
        ,
        {
            index: 90, decrease: 1
        }
        ];
        f[143]=[ {
            index: 55, decrease: 1
        }
        ,
        {
            index: 142, decrease: 1
        }
        ,
        {
            index: 118, decrease: 1
        }
        ,
        {
            index: 91, decrease: 1
        }
        ];
        d[0]=0;
        d[1]=0;
        d[2]=0;
        d[3]=0;
        d[4]=0;
        d[5]=0;
        d[6]=0;
        d[7]=0;
        d[8]=0;
        d[9]=0;
        d[10]=0;
        d[11]=0;
        d[12]=0;
        d[13]=0;
        d[14]=0;
        d[15]=0;
        d[16]=0;
        d[17]=0;
        d[18]=0;
        d[19]=0;
        d[20]=0;
        d[21]=0;
        d[22]=0;
        d[23]=0;
        d[24]=0;
        d[25]=0;
        d[26]=0;
        d[27]=0;
        d[28]=0;
        d[29]=0;
        d[30]=0;
        d[31]=0;
        d[32]=0;
        d[33]=0;
        d[34]=0;
        d[35]=0;
        d[36]=0;
        d[37]=0;
        d[38]=0;
        d[39]=0;
        d[40]=0;
        d[41]=0;
        d[42]=0;
        d[43]=0;
        d[44]=0;
        d[45]=0;
        d[46]=0;
        d[47]=0;
        d[48]=0;
        d[49]=0;
        d[50]=0;
        d[51]=0;
        d[52]=0;
        d[53]=0;
        d[54]=0;
        d[55]=0;
        d[56]=0;
        d[57]=0;
        d[58]=0;
        d[59]=0;
        d[60]=0;
        d[61]=0;
        d[62]=0;
        d[63]=0;
        d[64]=0;
        d[65]=0;
        d[66]=0;
        d[67]=1;
        d[68]=1;
        d[69]=1;
        d[70]=1;
        d[71]=1;
        d[72]=1;
        d[73]=1;
        d[74]=1;
        d[75]=1;
        d[76]=1;
        d[77]=1;
        d[78]=1;
        d[79]=1;
        d[80]=1;
        d[81]=1;
        d[82]=1;
        d[83]=1;
        d[84]=1;
        d[85]=1;
        d[86]=1;
        d[87]=1;
        d[88]=1;
        d[89]=1;
        d[90]=1;
        d[91]=1;
        d[92]=1;
        d[93]=1;
        d[94]=2;
        d[95]=2;
        d[96]=2;
        d[97]=2;
        d[98]=2;
        d[99]=2;
        d[100]=2;
        d[101]=2;
        d[102]=2;
        d[103]=2;
        d[104]=2;
        d[105]=2;
        d[106]=2;
        d[107]=2;
        d[108]=2;
        d[109]=2;
        d[110]=2;
        d[111]=2;
        d[112]=2;
        d[113]=2;
        d[114]=2;
        d[115]=2;
        d[116]=2;
        d[117]=2;
        d[118]=2;
        d[119]=2;
        d[120]=2;
        d[121]=3;
        d[122]=3;
        d[123]=3;
        d[124]=3;
        d[125]=3;
        d[126]=3;
        d[127]=3;
        d[128]=3;
        d[129]=3;
        d[130]=3;
        d[131]=3;
        d[132]=3;
        d[133]=3;
        d[134]=3;
        d[135]=3;
        d[136]=3;
        d[137]=3;
        d[138]=3;
        d[139]=3;
        d[140]=3;
        d[141]=3;
        d[142]=3;
        d[143]=3
    }
    ;
    this.initLayoutTheWall=function() {
        h= {
            x: 180, y: 80
        }
        ;
        g=SCORE_BONUS_LAYOUT_MEDIUM;
        b[0]= {
            x: 32, y: 38.1
        }
        ;
        b[1]= {
            x: 61, y: 38.1
        }
        ;
        b[2]= {
            x: 90, y: 38.1
        }
        ;
        b[3]= {
            x: 119, y: 38.1
        }
        ;
        b[4]= {
            x: 148, y: 38.1
        }
        ;
        b[5]= {
            x: 177, y: 38.1
        }
        ;
        b[6]= {
            x: 206, y: 38.1
        }
        ;
        b[7]= {
            x: 235, y: 38.1
        }
        ;
        b[8]= {
            x: 32, y: 77.6
        }
        ;
        b[9]= {
            x: 61, y: 77.6
        }
        ;
        b[10]= {
            x: 90, y: 77.6
        }
        ;
        b[11]= {
            x: 119, y: 77.6
        }
        ;
        b[12]= {
            x: 148, y: 77.6
        }
        ;
        b[13]= {
            x: 177, y: 77.6
        }
        ;
        b[14]= {
            x: 206, y: 77.6
        }
        ;
        b[15]= {
            x: 235, y: 77.6
        }
        ;
        b[16]= {
            x: 32, y: 117.1
        }
        ;
        b[17]= {
            x: 61, y: 117.1
        }
        ;
        b[18]= {
            x: 90, y: 117.1
        }
        ;
        b[19]= {
            x: 177, y: 117.1
        }
        ;
        b[20]= {
            x: 206, y: 117.1
        }
        ;
        b[21]= {
            x: 235, y: 117.1
        }
        ;
        b[22]= {
            x: 32, y: 156.6
        }
        ;
        b[23]= {
            x: 61, y: 156.6
        }
        ;
        b[24]= {
            x: 90, y: 156.6
        }
        ;
        b[25]= {
            x: 177, y: 156.6
        }
        ;
        b[26]= {
            x: 206, y: 156.6
        }
        ;
        b[27]= {
            x: 235, y: 156.6
        }
        ;
        b[28]= {
            x: 32, y: 196.1
        }
        ;
        b[29]= {
            x: 61, y: 196.1
        }
        ;
        b[30]= {
            x: 90, y: 196.1
        }
        ;
        b[31]= {
            x: 119, y: 196.1
        }
        ;
        b[32]= {
            x: 148, y: 196.1
        }
        ;
        b[33]= {
            x: 177, y: 196.1
        }
        ;
        b[34]= {
            x: 206, y: 196.1
        }
        ;
        b[35]= {
            x: 235, y: 196.1
        }
        ;
        b[36]= {
            x: 32, y: 235.6
        }
        ;
        b[37]= {
            x: 61, y: 235.6
        }
        ;
        b[38]= {
            x: 90, y: 235.6
        }
        ;
        b[39]= {
            x: 119, y: 235.6
        }
        ;
        b[40]= {
            x: 148, y: 235.6
        }
        ;
        b[41]= {
            x: 177, y: 235.6
        }
        ;
        b[42]= {
            x: 206, y: 235.6
        }
        ;
        b[43]= {
            x: 235, y: 235.6
        }
        ;
        b[44]= {
            x: 26.5, y: 32.55
        }
        ;
        b[45]= {
            x: 55.5, y: 32.6
        }
        ;
        b[46]= {
            x: 84.5, y: 32.55
        }
        ;
        b[47]= {
            x: 113.5, y: 32.55
        }
        ;
        b[48]= {
            x: 142.5, y: 32.6
        }
        ;
        b[49]= {
            x: 171.5, y: 32.6
        }
        ;
        b[50]= {
            x: 200.5, y: 32.6
        }
        ;
        b[51]= {
            x: 229.5, y: 32.6
        }
        ;
        b[52]= {
            x: 55.5, y: 72.1
        }
        ;
        b[53]= {
            x: 84.5, y: 72.1
        }
        ;
        b[54]= {
            x: 113.5, y: 72.1
        }
        ;
        b[55]= {
            x: 142.5, y: 72.1
        }
        ;
        b[56]= {
            x: 171.5, y: 72.1
        }
        ;
        b[57]= {
            x: 200.5, y: 72.1
        }
        ;
        b[58]= {
            x: 55.5, y: 111.6
        }
        ;
        b[59]= {
            x: 84.5, y: 111.6
        }
        ;
        b[60]= {
            x: 171.5, y: 111.6
        }
        ;
        b[61]= {
            x: 200.5, y: 111.6
        }
        ;
        b[62]= {
            x: 55.5, y: 151.1
        }
        ;
        b[63]= {
            x: 84.5, y: 151.1
        }
        ;
        b[64]= {
            x: 171.5, y: 151.1
        }
        ;
        b[65]= {
            x: 200.5, y: 151.1
        }
        ;
        b[66]= {
            x: 55.5, y: 190.6
        }
        ;
        b[67]= {
            x: 84.5, y: 190.6
        }
        ;
        b[68]= {
            x: 113.5, y: 190.6
        }
        ;
        b[69]= {
            x: 142.5, y: 190.6
        }
        ;
        b[70]= {
            x: 171.5, y: 190.6
        }
        ;
        b[71]= {
            x: 200.5, y: 190.6
        }
        ;
        b[72]= {
            x: 26.5, y: 230.1
        }
        ;
        b[73]= {
            x: 55.5, y: 230.1
        }
        ;
        b[74]= {
            x: 84.5, y: 230.1
        }
        ;
        b[75]= {
            x: 113.5, y: 230.1
        }
        ;
        b[76]= {
            x: 142.5, y: 230.1
        }
        ;
        b[77]= {
            x: 171.5, y: 230.1
        }
        ;
        b[78]= {
            x: 200.5, y: 230.1
        }
        ;
        b[79]= {
            x: 229.5, y: 230.1
        }
        ;
        b[80]= {
            x: 22, y: 27.55
        }
        ;
        b[81]= {
            x: 51, y: 27.55
        }
        ;
        b[82]= {
            x: 80, y: 27.6
        }
        ;
        b[83]= {
            x: 109, y: 27.65
        }
        ;
        b[84]= {
            x: 138, y: 27.65
        }
        ;
        b[85]= {
            x: 167, y: 27.7
        }
        ;
        b[86]= {
            x: 196, y: 27.7
        }
        ;
        b[87]= {
            x: 225, y: 27.7
        }
        ;
        b[88]= {
            x: 51, y: 67.1
        }
        ;
        b[89]= {
            x: 80, y: 67.1
        }
        ;
        b[90]= {
            x: 109, y: 67.1
        }
        ;
        b[91]= {
            x: 138, y: 67.1
        }
        ;
        b[92]= {
            x: 167, y: 67.1
        }
        ;
        b[93]= {
            x: 196, y: 67.1
        }
        ;
        b[94]= {
            x: 51, y: 106.6
        }
        ;
        b[95]= {
            x: 80, y: 106.6
        }
        ;
        b[96]= {
            x: 167, y: 106.6
        }
        ;
        b[97]= {
            x: 196, y: 106.6
        }
        ;
        b[98]= {
            x: 51, y: 146.1
        }
        ;
        b[99]= {
            x: 80, y: 146.1
        }
        ;
        b[100]= {
            x: 167, y: 146.1
        }
        ;
        b[101]= {
            x: 196, y: 146.1
        }
        ;
        b[102]= {
            x: 51, y: 185.6
        }
        ;
        b[103]= {
            x: 80, y: 185.6
        }
        ;
        b[104]= {
            x: 109, y: 185.6
        }
        ;
        b[105]= {
            x: 138, y: 185.6
        }
        ;
        b[106]= {
            x: 167, y: 185.6
        }
        ;
        b[107]= {
            x: 196, y: 185.6
        }
        ;
        b[108]= {
            x: 22, y: 225.1
        }
        ;
        b[109]= {
            x: 51, y: 225.1
        }
        ;
        b[110]= {
            x: 80, y: 225.1
        }
        ;
        b[111]= {
            x: 109, y: 225.15
        }
        ;
        b[112]= {
            x: 138, y: 225.15
        }
        ;
        b[113]= {
            x: 167, y: 225.2
        }
        ;
        b[114]= {
            x: 196, y: 225.2
        }
        ;
        b[115]= {
            x: 225, y: 225.2
        }
        ;
        b[116]= {
            x: 17, y: 22.5
        }
        ;
        b[117]= {
            x: 46, y: 22.5
        }
        ;
        b[118]= {
            x: 75, y: 22.5
        }
        ;
        b[119]= {
            x: 104, y: 22.5
        }
        ;
        b[120]= {
            x: 133, y: 22.5
        }
        ;
        b[121]= {
            x: 162, y: 22.5
        }
        ;
        b[122]= {
            x: 191, y: 22.5
        }
        ;
        b[123]= {
            x: 220, y: 22.5
        }
        ;
        b[124]= {
            x: 75, y: 62
        }
        ;
        b[125]= {
            x: 104, y: 62
        }
        ;
        b[126]= {
            x: 133, y: 62
        }
        ;
        b[127]= {
            x: 162, y: 62
        }
        ;
        b[128]= {
            x: 75, y: 101.5
        }
        ;
        b[129]= {
            x: 162, y: 101.5
        }
        ;
        b[130]= {
            x: 75, y: 141
        }
        ;
        b[131]= {
            x: 162, y: 141
        }
        ;
        b[132]= {
            x: 75, y: 180.5
        }
        ;
        b[133]= {
            x: 104, y: 180.5
        }
        ;
        b[134]= {
            x: 133, y: 180.5
        }
        ;
        b[135]= {
            x: 162, y: 180.5
        }
        ;
        b[136]= {
            x: 17, y: 220
        }
        ;
        b[137]= {
            x: 46, y: 220
        }
        ;
        b[138]= {
            x: 75, y: 220
        }
        ;
        b[139]= {
            x: 104, y: 220
        }
        ;
        b[140]= {
            x: 133, y: 220
        }
        ;
        b[141]= {
            x: 162, y: 220
        }
        ;
        b[142]= {
            x: 191, y: 220
        }
        ;
        b[143]= {
            x: 220, y: 220
        }
        ;
        a[0]=[44,
        80,
        116];
        c[0]=[];
        e[0]=[];
        a[1]=[45,
        81,
        117];
        c[1]=[0];
        e[1]=[2];
        a[2]=[46,
        82,
        118];
        c[2]=[1];
        e[2]=[3];
        a[3]=[47,
        83,
        119];
        c[3]=[2];
        e[3]=[4];
        a[4]=[48,
        84,
        120];
        c[4]=[3];
        e[4]=[5];
        a[5]=[49,
        85,
        121];
        c[5]=[4];
        e[5]=[6];
        a[6]=[50,
        86,
        122];
        c[6]=[5];
        e[6]=[7];
        a[7]=[51,
        87,
        123];
        c[7]=[];
        e[7]=[];
        a[8]=[];
        c[8]=[];
        e[8]=[];
        a[9]=[52,
        88];
        c[9]=[8];
        e[9]=[10];
        a[10]=[53,
        89,
        124];
        c[10]=[9];
        e[10]=[11];
        a[11]=[54,
        90,
        125];
        c[11]=[10];
        e[11]=[12];
        a[12]=[55,
        91,
        126];
        c[12]=[11];
        e[12]=[13];
        a[13]=[56,
        92,
        127];
        c[13]=[12];
        e[13]=[14];
        a[14]=[57,
        93];
        c[14]=[13];
        e[14]=[15];
        a[15]=[];
        c[15]=[];
        e[15]=[];
        a[16]=[];
        c[16]=[];
        e[16]=[];
        a[17]=[58,
        94];
        c[17]=[16];
        e[17]=[18];
        a[18]=[59,
        95,
        128];
        c[18]=[];
        e[18]=[];
        a[19]=[60,
        96,
        129];
        c[19]=[];
        e[19]=[];
        a[20]=[61,
        97];
        c[20]=[19];
        e[20]=[21];
        a[21]=[];
        c[21]=[];
        e[21]=[];
        a[22]=[];
        c[22]=[];
        e[22]=[];
        a[23]=[62,
        98];
        c[23]=[22];
        e[23]=[24];
        a[24]=[63,
        99,
        130];
        c[24]=[];
        e[24]=[];
        a[25]=[64,
        100,
        131];
        c[25]=[];
        e[25]=[];
        a[26]=[65,
        101];
        c[26]=[25];
        e[26]=[27];
        a[27]=[];
        c[27]=[];
        e[27]=[];
        a[28]=[];
        c[28]=[];
        e[28]=[];
        a[29]=[66,
        102];
        c[29]=[28];
        e[29]=[30];
        a[30]=[67,
        103,
        132];
        c[30]=[29];
        e[30]=[31];
        a[31]=[68,
        104,
        133];
        c[31]=[30];
        e[31]=[32];
        a[32]=[69,
        105,
        134];
        c[32]=[31];
        e[32]=[33];
        a[33]=[70,
        106,
        135];
        c[33]=[32];
        e[33]=[34];
        a[34]=[71,
        107];
        c[34]=[33];
        e[34]=[35];
        a[35]=[];
        c[35]=[];
        e[35]=[];
        a[36]=[72,
        108,
        136];
        c[36]=[];
        e[36]=[];
        a[37]=[73,
        109,
        137];
        c[37]=[36];
        e[37]=[38];
        a[38]=[74,
        110,
        138];
        c[38]=[37];
        e[38]=[39];
        a[39]=[75,
        111,
        139];
        c[39]=[38];
        e[39]=[40];
        a[40]=[76,
        112,
        140];
        c[40]=[39];
        e[40]=[41];
        a[41]=[77,
        113,
        141];
        c[41]=[40];
        e[41]=[42];
        a[42]=[78,
        114,
        142];
        c[42]=[41];
        e[42]=[43];
        a[43]=[79,
        115,
        143];
        c[43]=[];
        e[43]=[];
        a[44]=[80,
        116];
        c[44]=[];
        e[44]=[];
        a[45]=[81,
        117];
        c[45]=[44];
        e[45]=[46];
        a[46]=[82,
        118];
        c[46]=[45];
        e[46]=[47];
        a[47]=[83,
        119];
        c[47]=[46];
        e[47]=[48];
        a[48]=[84,
        120];
        c[48]=[47];
        e[48]=[49];
        a[49]=[85,
        121];
        c[49]=[48];
        e[49]=[50];
        a[50]=[86,
        122];
        c[50]=[49];
        e[50]=[51];
        a[51]=[87,
        123];
        c[51]=[];
        e[51]=[];
        a[52]=[88];
        c[52]=[];
        e[52]=[];
        a[53]=[89,
        124];
        c[53]=[52];
        e[53]=[54];
        a[54]=[90,
        125];
        c[54]=[53];
        e[54]=[55];
        a[55]=[91,
        126];
        c[55]=[54];
        e[55]=[56];
        a[56]=[92,
        127];
        c[56]=[55];
        e[56]=[57];
        a[57]=[93];
        c[57]=[];
        e[57]=[];
        a[58]=[94];
        c[58]=[];
        e[58]=[];
        a[59]=[95,
        128];
        c[59]=[];
        e[59]=[];
        a[60]=[96,
        129];
        c[60]=[];
        e[60]=[];
        a[61]=[97];
        c[61]=[];
        e[61]=[];
        a[62]=[98];
        c[62]=[];
        e[62]=[];
        a[63]=[99,
        130];
        c[63]=[];
        e[63]=[];
        a[64]=[100,
        131];
        c[64]=[];
        e[64]=[];
        a[65]=[101];
        c[65]=[];
        e[65]=[];
        a[66]=[102];
        c[66]=[];
        e[66]=[];
        a[67]=[103,
        132];
        c[67]=[66];
        e[67]=[68];
        a[68]=[104,
        133];
        c[68]=[67];
        e[68]=[69];
        a[69]=[105,
        134];
        c[69]=[68];
        e[69]=[70];
        a[70]=[106,
        135];
        c[70]=[69];
        e[70]=[71];
        a[71]=[107];
        c[71]=[];
        e[71]=[];
        a[72]=[108,
        136];
        c[72]=[];
        e[72]=[];
        a[73]=[109,
        137];
        c[73]=[72];
        e[73]=[74];
        a[74]=[110,
        138];
        c[74]=[73];
        e[74]=[75];
        a[75]=[111,
        139];
        c[75]=[74];
        e[75]=[76];
        a[76]=[112,
        140];
        c[76]=[75];
        e[76]=[77];
        a[77]=[113,
        141];
        c[77]=[76];
        e[77]=[78];
        a[78]=[114,
        142];
        c[78]=[77];
        e[78]=[79];
        a[79]=[115,
        143];
        c[79]=[];
        e[79]=[];
        a[80]=[116];
        c[80]=[];
        e[80]=[];
        a[81]=[117];
        c[81]=[80];
        e[81]=[82];
        a[82]=[118];
        c[82]=[81];
        e[82]=[83];
        a[83]=[119];
        c[83]=[82];
        e[83]=[84];
        a[84]=[120];
        c[84]=[83];
        e[84]=[85];
        a[85]=[121];
        c[85]=[84];
        e[85]=[86];
        a[86]=[122];
        c[86]=[85];
        e[86]=[87];
        a[87]=[123];
        c[87]=[];
        e[87]=[];
        a[88]=[];
        c[88]=[];
        e[88]=[];
        a[89]=[124];
        c[89]=[88];
        e[89]=[90];
        a[90]=[125];
        c[90]=[89];
        e[90]=[91];
        a[91]=[126];
        c[91]=[90];
        e[91]=[92];
        a[92]=[127];
        c[92]=[91];
        e[92]=[93];
        a[93]=[];
        c[93]=[];
        e[93]=[];
        a[94]=[];
        c[94]=[];
        e[94]=[];
        a[95]=[128];
        c[95]=[];
        e[95]=[];
        a[96]=[129];
        c[96]=[];
        e[96]=[];
        a[97]=[];
        c[97]=[];
        e[97]=[];
        a[98]=[];
        c[98]=[];
        e[98]=[];
        a[99]=[130];
        c[99]=[];
        e[99]=[];
        a[100]=[131];
        c[100]=[];
        e[100]=[];
        a[101]=[];
        c[101]=[];
        e[101]=[];
        a[102]=[];
        c[102]=[];
        e[102]=[];
        a[103]=[132];
        c[103]=[102];
        e[103]=[104];
        a[104]=[133];
        c[104]=[103];
        e[104]=[105];
        a[105]=[134];
        c[105]=[104];
        e[105]=[106];
        a[106]=[135];
        c[106]=[105];
        e[106]=[107];
        a[107]=[];
        c[107]=[];
        e[107]=[];
        a[108]=[136];
        c[108]=[];
        e[108]=[];
        a[109]=[137];
        c[109]=[108];
        e[109]=[110];
        a[110]=[138];
        c[110]=[109];
        e[110]=[111];
        a[111]=[139];
        c[111]=[110];
        e[111]=[112];
        a[112]=[140];
        c[112]=[111];
        e[112]=[113];
        a[113]=[141];
        c[113]=[112];
        e[113]=[114];
        a[114]=[142];
        c[114]=[113];
        e[114]=[115];
        a[115]=[143];
        c[115]=[];
        e[115]=[];
        a[116]=[];
        c[116]=[];
        e[116]=[];
        a[117]=[];
        c[117]=[116];
        e[117]=[118];
        a[118]=[];
        c[118]=[117];
        e[118]=[119];
        a[119]=[];
        c[119]=[118];
        e[119]=[120];
        a[120]=[];
        c[120]=[119];
        e[120]=[121];
        a[121]=[];
        c[121]=[120];
        e[121]=[122];
        a[122]=[];
        c[122]=[121];
        e[122]=[123];
        a[123]=[];
        c[123]=[];
        e[123]=[];
        a[124]=[];
        c[124]=[];
        e[124]=[];
        a[125]=[];
        c[125]=[124];
        e[125]=[126];
        a[126]=[];
        c[126]=[125];
        e[126]=[127];
        a[127]=[];
        c[127]=[];
        e[127]=[];
        a[128]=[];
        c[128]=[];
        e[128]=[];
        a[129]=[];
        c[129]=[];
        e[129]=[];
        a[130]=[];
        c[130]=[];
        e[130]=[];
        a[131]=[];
        c[131]=[];
        e[131]=[];
        a[132]=[];
        c[132]=[];
        e[132]=[];
        a[133]=[];
        c[133]=[132];
        e[133]=[134];
        a[134]=[];
        c[134]=[133];
        e[134]=[135];
        a[135]=[];
        c[135]=[];
        e[135]=[];
        a[136]=[];
        c[136]=[];
        e[136]=[];
        a[137]=[];
        c[137]=[136];
        e[137]=[138];
        a[138]=[];
        c[138]=[137];
        e[138]=[139];
        a[139]=[];
        c[139]=[138];
        e[139]=[140];
        a[140]=[];
        c[140]=[139];
        e[140]=[141];
        a[141]=[];
        c[141]=[140];
        e[141]=[142];
        a[142]=[];
        c[142]=[141];
        e[142]=[143];
        a[143]=[];
        c[143]=[];
        e[143]=[];
        f[0]=[ {
            index: 1, decrease: 1
        }
        ];
        f[1]=[ {
            index: 2, decrease: 1
        }
        ];
        f[2]=[ {
            index: 1, decrease: 1
        }
        ,
        {
            index: 3, decrease: 1
        }
        ];
        f[3]=[ {
            index: 2, decrease: 1
        }
        ,
        {
            index: 4, decrease: 1
        }
        ];
        f[4]=[ {
            index: 3, decrease: 1
        }
        ,
        {
            index: 5, decrease: 1
        }
        ];
        f[5]=[ {
            index: 4, decrease: 1
        }
        ,
        {
            index: 6, decrease: 1
        }
        ];
        f[6]=[ {
            index: 5, decrease: 1
        }
        ];
        f[7]=[ {
            index: 6, decrease: 1
        }
        ];
        f[8]=[ {
            index: 9, decrease: 1
        }
        ];
        f[9]=[ {
            index: 10, decrease: 1
        }
        ];
        f[10]=[ {
            index: 9, decrease: 1
        }
        ,
        {
            index: 11, decrease: 1
        }
        ];
        f[11]=[ {
            index: 10, decrease: 1
        }
        ,
        {
            index: 12, decrease: 1
        }
        ];
        f[12]=[ {
            index: 11, decrease: 1
        }
        ,
        {
            index: 13, decrease: 1
        }
        ];
        f[13]=[ {
            index: 12, decrease: 1
        }
        ,
        {
            index: 14, decrease: 1
        }
        ];
        f[14]=[ {
            index: 13, decrease: 1
        }
        ];
        f[15]=[ {
            index: 14, decrease: 1
        }
        ];
        f[16]=[ {
            index: 17, decrease: 1
        }
        ];
        f[17]=[];
        f[18]=[ {
            index: 17, decrease: 1
        }
        ];
        f[19]=[ {
            index: 20, decrease: 1
        }
        ];
        f[20]=[];
        f[21]=[ {
            index: 20, decrease: 1
        }
        ];
        f[22]=[ {
            index: 23, decrease: 1
        }
        ];
        f[23]=[];
        f[24]=[ {
            index: 23, decrease: 1
        }
        ];
        f[25]=[ {
            index: 26, decrease: 1
        }
        ];
        f[26]=[];
        f[27]=[ {
            index: 26, decrease: 1
        }
        ];
        f[28]=[ {
            index: 29, decrease: 1
        }
        ];
        f[29]=[ {
            index: 30, decrease: 1
        }
        ];
        f[30]=[ {
            index: 29, decrease: 1
        }
        ,
        {
            index: 31, decrease: 1
        }
        ];
        f[31]=[ {
            index: 30, decrease: 1
        }
        ,
        {
            index: 32, decrease: 1
        }
        ];
        f[32]=[ {
            index: 31, decrease: 1
        }
        ,
        {
            index: 33, decrease: 1
        }
        ];
        f[33]=[ {
            index: 32, decrease: 1
        }
        ,
        {
            index: 34, decrease: 1
        }
        ];
        f[34]=[ {
            index: 33, decrease: 1
        }
        ];
        f[35]=[ {
            index: 34, decrease: 1
        }
        ];
        f[36]=[ {
            index: 37, decrease: 1
        }
        ];
        f[37]=[ {
            index: 38, decrease: 1
        }
        ];
        f[38]=[ {
            index: 39, decrease: 1
        }
        ,
        {
            index: 37, decrease: 1
        }
        ];
        f[39]=[ {
            index: 40, decrease: 1
        }
        ,
        {
            index: 38, decrease: 1
        }
        ];
        f[40]=[ {
            index: 39, decrease: 1
        }
        ,
        {
            index: 41, decrease: 1
        }
        ];
        f[41]=[ {
            index: 40, decrease: 1
        }
        ,
        {
            index: 42, decrease: 1
        }
        ];
        f[42]=[ {
            index: 41, decrease: 1
        }
        ];
        f[43]=[ {
            index: 42, decrease: 1
        }
        ];
        f[44]=[ {
            index: 45, decrease: 1
        }
        ,
        {
            index: 0, decrease: 1
        }
        ];
        f[45]=[ {
            index: 46, decrease: 1
        }
        ,
        {
            index: 1, decrease: 1
        }
        ];
        f[46]=[ {
            index: 45, decrease: 1
        }
        ,
        {
            index: 47, decrease: 1
        }
        ,
        {
            index: 2, decrease: 1
        }
        ];
        f[47]=[ {
            index: 46, decrease: 1
        }
        ,
        {
            index: 48, decrease: 1
        }
        ,
        {
            index: 3, decrease: 1
        }
        ];
        f[48]=[ {
            index: 47, decrease: 1
        }
        ,
        {
            index: 49, decrease: 1
        }
        ,
        {
            index: 4, decrease: 1
        }
        ];
        f[49]=[ {
            index: 48, decrease: 1
        }
        ,
        {
            index: 50, decrease: 1
        }
        ,
        {
            index: 5, decrease: 1
        }
        ];
        f[50]=[ {
            index: 49, decrease: 1
        }
        ,
        {
            index: 6, decrease: 1
        }
        ];
        f[51]=[ {
            index: 50, decrease: 1
        }
        ,
        {
            index: 7, decrease: 1
        }
        ];
        f[52]=[ {
            index: 53, decrease: 1
        }
        ,
        {
            index: 9, decrease: 1
        }
        ];
        f[53]=[ {
            index: 54, decrease: 1
        }
        ,
        {
            index: 10, decrease: 1
        }
        ];
        f[54]=[ {
            index: 53, decrease: 1
        }
        ,
        {
            index: 55, decrease: 1
        }
        ,
        {
            index: 11, decrease: 1
        }
        ];
        f[55]=[ {
            index: 54, decrease: 1
        }
        ,
        {
            index: 56, decrease: 1
        }
        ,
        {
            index: 12, decrease: 1
        }
        ];
        f[56]=[ {
            index: 55, decrease: 1
        }
        ,
        {
            index: 13, decrease: 1
        }
        ];
        f[57]=[ {
            index: 56, decrease: 1
        }
        ,
        {
            index: 14, decrease: 1
        }
        ];
        f[58]=[ {
            index: 17, decrease: 1
        }
        ];
        f[59]=[ {
            index: 18, decrease: 1
        }
        ];
        f[60]=[ {
            index: 19, decrease: 1
        }
        ];
        f[61]=[ {
            index: 20, decrease: 1
        }
        ];
        f[62]=[ {
            index: 23, decrease: 1
        }
        ];
        f[63]=[ {
            index: 24, decrease: 1
        }
        ];
        f[64]=[ {
            index: 25, decrease: 1
        }
        ];
        f[65]=[ {
            index: 26, decrease: 1
        }
        ];
        f[66]=[ {
            index: 67, decrease: 1
        }
        ,
        {
            index: 29, decrease: 1
        }
        ];
        f[67]=[ {
            index: 68, decrease: 1
        }
        ,
        {
            index: 30, decrease: 1
        }
        ];
        f[68]=[ {
            index: 69, decrease: 1
        }
        ,
        {
            index: 67, decrease: 1
        }
        ,
        {
            index: 31, decrease: 1
        }
        ];
        f[69]=[ {
            index: 70, decrease: 1
        }
        ,
        {
            index: 68, decrease: 1
        }
        ,
        {
            index: 32, decrease: 1
        }
        ];
        f[70]=[ {
            index: 69, decrease: 1
        }
        ,
        {
            index: 33, decrease: 1
        }
        ];
        f[71]=[ {
            index: 70, decrease: 1
        }
        ,
        {
            index: 34, decrease: 1
        }
        ];
        f[72]=[ {
            index: 73, decrease: 1
        }
        ,
        {
            index: 36, decrease: 1
        }
        ];
        f[73]=[ {
            index: 74, decrease: 1
        }
        ,
        {
            index: 37, decrease: 1
        }
        ];
        f[74]=[ {
            index: 75, decrease: 1
        }
        ,
        {
            index: 73, decrease: 1
        }
        ,
        {
            index: 38, decrease: 1
        }
        ];
        f[75]=[ {
            index: 39, decrease: 1
        }
        ,
        {
            index: 76, decrease: 1
        }
        ,
        {
            index: 74, decrease: 1
        }
        ];
        f[76]=[ {
            index: 40, decrease: 1
        }
        ,
        {
            index: 77, decrease: 1
        }
        ,
        {
            index: 75, decrease: 1
        }
        ];
        f[77]=[ {
            index: 41, decrease: 1
        }
        ,
        {
            index: 78, decrease: 1
        }
        ,
        {
            index: 76, decrease: 1
        }
        ];
        f[78]=[ {
            index: 42, decrease: 1
        }
        ,
        {
            index: 77, decrease: 1
        }
        ];
        f[79]=[ {
            index: 43, decrease: 1
        }
        ,
        {
            index: 78, decrease: 1
        }
        ];
        f[80]=[ {
            index: 44, decrease: 1
        }
        ,
        {
            index: 81, decrease: 1
        }
        ,
        {
            index: 0, decrease: 1
        }
        ];
        f[81]=[ {
            index: 82, decrease: 1
        }
        ,
        {
            index: 45, decrease: 1
        }
        ,
        {
            index: 1, decrease: 1
        }
        ];
        f[82]=[ {
            index: 83, decrease: 1
        }
        ,
        {
            index: 81, decrease: 1
        }
        ,
        {
            index: 46, decrease: 1
        }
        ,
        {
            index: 2, decrease: 1
        }
        ];
        f[83]=[ {
            index: 82, decrease: 1
        }
        ,
        {
            index: 47, decrease: 1
        }
        ,
        {
            index: 3, decrease: 1
        }
        ,
        {
            index: 84, decrease: 1
        }
        ];
        f[84]=[ {
            index: 83, decrease: 1
        }
        ,
        {
            index: 48, decrease: 1
        }
        ,
        {
            index: 4, decrease: 1
        }
        ,
        {
            index: 85, decrease: 1
        }
        ];
        f[85]=[ {
            index: 49, decrease: 1
        }
        ,
        {
            index: 5, decrease: 1
        }
        ,
        {
            index: 86, decrease: 1
        }
        ,
        {
            index: 84, decrease: 1
        }
        ];
        f[86]=[ {
            index: 50, decrease: 1
        }
        ,
        {
            index: 6, decrease: 1
        }
        ,
        {
            index: 85, decrease: 1
        }
        ];
        f[87]=[ {
            index: 51, decrease: 1
        }
        ,
        {
            index: 7, decrease: 1
        }
        ,
        {
            index: 86, decrease: 1
        }
        ];
        f[88]=[ {
            index: 52, decrease: 1
        }
        ,
        {
            index: 9, decrease: 1
        }
        ,
        {
            index: 89, decrease: 1
        }
        ];
        f[89]=[ {
            index: 53, decrease: 1
        }
        ,
        {
            index: 10, decrease: 1
        }
        ,
        {
            index: 90, decrease: 1
        }
        ];
        f[90]=[ {
            index: 54, decrease: 1
        }
        ,
        {
            index: 11, decrease: 1
        }
        ,
        {
            index: 91, decrease: 1
        }
        ,
        {
            index: 89, decrease: 1
        }
        ];
        f[91]=[ {
            index: 55, decrease: 1
        }
        ,
        {
            index: 12, decrease: 1
        }
        ,
        {
            index: 92, decrease: 1
        }
        ,
        {
            index: 90, decrease: 1
        }
        ];
        f[92]=[ {
            index: 56, decrease: 1
        }
        ,
        {
            index: 13, decrease: 1
        }
        ,
        {
            index: 91, decrease: 1
        }
        ];
        f[93]=[ {
            index: 57, decrease: 1
        }
        ,
        {
            index: 14, decrease: 1
        }
        ,
        {
            index: 92, decrease: 1
        }
        ];
        f[94]=[ {
            index: 58, decrease: 1
        }
        ,
        {
            index: 17, decrease: 1
        }
        ];
        f[95]=[ {
            index: 59, decrease: 1
        }
        ,
        {
            index: 18, decrease: 1
        }
        ];
        f[96]=[ {
            index: 60, decrease: 1
        }
        ,
        {
            index: 19, decrease: 1
        }
        ];
        f[97]=[ {
            index: 61, decrease: 1
        }
        ,
        {
            index: 20, decrease: 1
        }
        ];
        f[98]=[ {
            index: 62, decrease: 1
        }
        ,
        {
            index: 23, decrease: 1
        }
        ];
        f[99]=[ {
            index: 63, decrease: 1
        }
        ,
        {
            index: 24, decrease: 1
        }
        ];
        f[100]=[ {
            index: 64, decrease: 1
        }
        ,
        {
            index: 25, decrease: 1
        }
        ];
        f[101]=[ {
            index: 65, decrease: 1
        }
        ,
        {
            index: 26, decrease: 1
        }
        ];
        f[102]=[ {
            index: 66, decrease: 1
        }
        ,
        {
            index: 103, decrease: 1
        }
        ,
        {
            index: 29, decrease: 1
        }
        ];
        f[103]=[ {
            index: 67, decrease: 1
        }
        ,
        {
            index: 104, decrease: 1
        }
        ,
        {
            index: 30, decrease: 1
        }
        ];
        f[104]=[ {
            index: 68, decrease: 1
        }
        ,
        {
            index: 105, decrease: 1
        }
        ,
        {
            index: 103, decrease: 1
        }
        ,
        {
            index: 31, decrease: 1
        }
        ];
        f[105]=[ {
            index: 69, decrease: 1
        }
        ,
        {
            index: 106, decrease: 1
        }
        ,
        {
            index: 104, decrease: 1
        }
        ,
        {
            index: 32, decrease: 1
        }
        ];
        f[106]=[ {
            index: 70, decrease: 1
        }
        ,
        {
            index: 105, decrease: 1
        }
        ,
        {
            index: 33, decrease: 1
        }
        ];
        f[107]=[ {
            index: 71, decrease: 1
        }
        ,
        {
            index: 106, decrease: 1
        }
        ,
        {
            index: 34, decrease: 1
        }
        ];
        f[108]=[ {
            index: 72, decrease: 1
        }
        ,
        {
            index: 109, decrease: 1
        }
        ,
        {
            index: 36, decrease: 1
        }
        ];
        f[109]=[ {
            index: 73, decrease: 1
        }
        ,
        {
            index: 110, decrease: 1
        }
        ,
        {
            index: 37, decrease: 1
        }
        ];
        f[110]=[ {
            index: 74, decrease: 1
        }
        ,
        {
            index: 111, decrease: 1
        }
        ,
        {
            index: 109, decrease: 1
        }
        ,
        {
            index: 38, decrease: 1
        }
        ];
        f[111]=[ {
            index: 39, decrease: 1
        }
        ,
        {
            index: 75, decrease: 1
        }
        ,
        {
            index: 112, decrease: 1
        }
        ,
        {
            index: 110, decrease: 1
        }
        ];
        f[112]=[ {
            index: 40, decrease: 1
        }
        ,
        {
            index: 76, decrease: 1
        }
        ,
        {
            index: 113, decrease: 1
        }
        ,
        {
            index: 111, decrease: 1
        }
        ];
        f[113]=[ {
            index: 41, decrease: 1
        }
        ,
        {
            index: 77, decrease: 1
        }
        ,
        {
            index: 114, decrease: 1
        }
        ,
        {
            index: 112, decrease: 1
        }
        ];
        f[114]=[ {
            index: 42, decrease: 1
        }
        ,
        {
            index: 78, decrease: 1
        }
        ,
        {
            index: 113, decrease: 1
        }
        ];
        f[115]=[ {
            index: 43, decrease: 1
        }
        ,
        {
            index: 79, decrease: 1
        }
        ,
        {
            index: 114, decrease: 1
        }
        ];
        f[116]=[ {
            index: 44, decrease: 1
        }
        ,
        {
            index: 80, decrease: 1
        }
        ,
        {
            index: 0, decrease: 1
        }
        ,
        {
            index: 117, decrease: 1
        }
        ];
        f[117]=[ {
            index: 81, decrease: 1
        }
        ,
        {
            index: 45, decrease: 1
        }
        ,
        {
            index: 1, decrease: 1
        }
        ,
        {
            index: 118, decrease: 1
        }
        ];
        f[118]=[ {
            index: 82, decrease: 1
        }
        ,
        {
            index: 46, decrease: 1
        }
        ,
        {
            index: 2, decrease: 1
        }
        ,
        {
            index: 119, decrease: 1
        }
        ,
        {
            index: 117, decrease: 1
        }
        ];
        f[119]=[ {
            index: 83, decrease: 1
        }
        ,
        {
            index: 47, decrease: 1
        }
        ,
        {
            index: 120, decrease: 1
        }
        ,
        {
            index: 3, decrease: 1
        }
        ,
        {
            index: 118, decrease: 1
        }
        ];
        f[120]=[ {
            index: 48, decrease: 1
        }
        ,
        {
            index: 121, decrease: 1
        }
        ,
        {
            index: 119, decrease: 1
        }
        ,
        {
            index: 4, decrease: 1
        }
        ,
        {
            index: 84, decrease: 1
        }
        ];
        f[121]=[ {
            index: 49, decrease: 1
        }
        ,
        {
            index: 122, decrease: 1
        }
        ,
        {
            index: 120, decrease: 1
        }
        ,
        {
            index: 5, decrease: 1
        }
        ,
        {
            index: 85, decrease: 1
        }
        ];
        f[122]=[ {
            index: 50, decrease: 1
        }
        ,
        {
            index: 121, decrease: 1
        }
        ,
        {
            index: 6, decrease: 1
        }
        ,
        {
            index: 86, decrease: 1
        }
        ];
        f[123]=[ {
            index: 51, decrease: 1
        }
        ,
        {
            index: 122, decrease: 1
        }
        ,
        {
            index: 7, decrease: 1
        }
        ,
        {
            index: 87, decrease: 1
        }
        ];
        f[124]=[ {
            index: 53, decrease: 1
        }
        ,
        {
            index: 125, decrease: 1
        }
        ,
        {
            index: 10, decrease: 1
        }
        ,
        {
            index: 89, decrease: 1
        }
        ];
        f[125]=[ {
            index: 54, decrease: 1
        }
        ,
        {
            index: 126, decrease: 1
        }
        ,
        {
            index: 11, decrease: 1
        }
        ,
        {
            index: 90, decrease: 1
        }
        ];
        f[126]=[ {
            index: 55, decrease: 1
        }
        ,
        {
            index: 125, decrease: 1
        }
        ,
        {
            index: 12, decrease: 1
        }
        ,
        {
            index: 91, decrease: 1
        }
        ];
        f[127]=[ {
            index: 56, decrease: 1
        }
        ,
        {
            index: 126, decrease: 1
        }
        ,
        {
            index: 13, decrease: 1
        }
        ,
        {
            index: 92, decrease: 1
        }
        ];
        f[128]=[ {
            index: 59, decrease: 1
        }
        ,
        {
            index: 18, decrease: 1
        }
        ,
        {
            index: 95, decrease: 1
        }
        ];
        f[129]=[ {
            index: 60, decrease: 1
        }
        ,
        {
            index: 19, decrease: 1
        }
        ,
        {
            index: 96, decrease: 1
        }
        ];
        f[130]=[ {
            index: 63, decrease: 1
        }
        ,
        {
            index: 99, decrease: 1
        }
        ,
        {
            index: 24, decrease: 1
        }
        ];
        f[131]=[ {
            index: 64, decrease: 1
        }
        ,
        {
            index: 100, decrease: 1
        }
        ,
        {
            index: 25, decrease: 1
        }
        ];
        f[132]=[ {
            index: 67, decrease: 1
        }
        ,
        {
            index: 133, decrease: 1
        }
        ,
        {
            index: 103, decrease: 1
        }
        ,
        {
            index: 30, decrease: 1
        }
        ];
        f[133]=[ {
            index: 68, decrease: 1
        }
        ,
        {
            index: 134, decrease: 1
        }
        ,
        {
            index: 104, decrease: 1
        }
        ,
        {
            index: 31, decrease: 1
        }
        ];
        f[134]=[ {
            index: 69, decrease: 1
        }
        ,
        {
            index: 133, decrease: 1
        }
        ,
        {
            index: 105, decrease: 1
        }
        ,
        {
            index: 32, decrease: 1
        }
        ];
        f[135]=[ {
            index: 70, decrease: 1
        }
        ,
        {
            index: 134, decrease: 1
        }
        ,
        {
            index: 106, decrease: 1
        }
        ,
        {
            index: 33, decrease: 1
        }
        ];
        f[136]=[ {
            index: 72, decrease: 1
        }
        ,
        {
            index: 137, decrease: 1
        }
        ,
        {
            index: 108, decrease: 1
        }
        ,
        {
            index: 36, decrease: 1
        }
        ];
        f[137]=[ {
            index: 73, decrease: 1
        }
        ,
        {
            index: 138, decrease: 1
        }
        ,
        {
            index: 109, decrease: 1
        }
        ,
        {
            index: 37, decrease: 1
        }
        ];
        f[138]=[ {
            index: 74, decrease: 1
        }
        ,
        {
            index: 139, decrease: 1
        }
        ,
        {
            index: 137, decrease: 1
        }
        ,
        {
            index: 110, decrease: 1
        }
        ,
        {
            index: 38, decrease: 1
        }
        ];
        f[139]=[ {
            index: 39, decrease: 1
        }
        ,
        {
            index: 75, decrease: 1
        }
        ,
        {
            index: 140, decrease: 1
        }
        ,
        {
            index: 138, decrease: 1
        }
        ,
        {
            index: 111, decrease: 1
        }
        ];
        f[140]=[ {
            index: 40, decrease: 1
        }
        ,
        {
            index: 76, decrease: 1
        }
        ,
        {
            index: 141, decrease: 1
        }
        ,
        {
            index: 139, decrease: 1
        }
        ,
        {
            index: 112, decrease: 1
        }
        ];
        f[141]=[ {
            index: 41, decrease: 1
        }
        ,
        {
            index: 77, decrease: 1
        }
        ,
        {
            index: 142, decrease: 1
        }
        ,
        {
            index: 140, decrease: 1
        }
        ,
        {
            index: 113, decrease: 1
        }
        ];
        f[142]=[ {
            index: 42, decrease: 1
        }
        ,
        {
            index: 78, decrease: 1
        }
        ,
        {
            index: 141, decrease: 1
        }
        ,
        {
            index: 114, decrease: 1
        }
        ];
        f[143]=[ {
            index: 43, decrease: 1
        }
        ,
        {
            index: 79, decrease: 1
        }
        ,
        {
            index: 142, decrease: 1
        }
        ,
        {
            index: 115, decrease: 1
        }
        ];
        d[0]=0;
        d[1]=0;
        d[2]=0;
        d[3]=0;
        d[4]=0;
        d[5]=0;
        d[6]=0;
        d[7]=0;
        d[8]=0;
        d[9]=0;
        d[10]=0;
        d[11]=0;
        d[12]=0;
        d[13]=0;
        d[14]=0;
        d[15]=0;
        d[16]=0;
        d[17]=0;
        d[18]=0;
        d[19]=0;
        d[20]=0;
        d[21]=0;
        d[22]=0;
        d[23]=0;
        d[24]=0;
        d[25]=0;
        d[26]=0;
        d[27]=0;
        d[28]=0;
        d[29]=0;
        d[30]=0;
        d[31]=0;
        d[32]=0;
        d[33]=0;
        d[34]=0;
        d[35]=0;
        d[36]=0;
        d[37]=0;
        d[38]=0;
        d[39]=0;
        d[40]=0;
        d[41]=0;
        d[42]=0;
        d[43]=0;
        d[44]=1;
        d[45]=1;
        d[46]=1;
        d[47]=1;
        d[48]=1;
        d[49]=1;
        d[50]=1;
        d[51]=1;
        d[52]=1;
        d[53]=1;
        d[54]=1;
        d[55]=1;
        d[56]=1;
        d[57]=1;
        d[58]=1;
        d[59]=1;
        d[60]=1;
        d[61]=1;
        d[62]=1;
        d[63]=1;
        d[64]=1;
        d[65]=1;
        d[66]=1;
        d[67]=1;
        d[68]=1;
        d[69]=1;
        d[70]=1;
        d[71]=1;
        d[72]=1;
        d[73]=1;
        d[74]=1;
        d[75]=1;
        d[76]=1;
        d[77]=1;
        d[78]=1;
        d[79]=1;
        d[80]=2;
        d[81]=2;
        d[82]=2;
        d[83]=2;
        d[84]=2;
        d[85]=2;
        d[86]=2;
        d[87]=2;
        d[88]=2;
        d[89]=2;
        d[90]=2;
        d[91]=2;
        d[92]=2;
        d[93]=2;
        d[94]=2;
        d[95]=2;
        d[96]=2;
        d[97]=2;
        d[98]=2;
        d[99]=2;
        d[100]=2;
        d[101]=2;
        d[102]=2;
        d[103]=2;
        d[104]=2;
        d[105]=2;
        d[106]=2;
        d[107]=2;
        d[108]=2;
        d[109]=2;
        d[110]=2;
        d[111]=2;
        d[112]=2;
        d[113]=2;
        d[114]=2;
        d[115]=2;
        d[116]=3;
        d[117]=3;
        d[118]=3;
        d[119]=3;
        d[120]=3;
        d[121]=3;
        d[122]=3;
        d[123]=3;
        d[124]=3;
        d[125]=3;
        d[126]=3;
        d[127]=3;
        d[128]=3;
        d[129]=3;
        d[130]=3;
        d[131]=3;
        d[132]=3;
        d[133]=3;
        d[134]=3;
        d[135]=3;
        d[136]=3;
        d[137]=3;
        d[138]=3;
        d[139]=3;
        d[140]=3;
        d[141]=3;
        d[142]=3;
        d[143]=3
    }
    ;
    this.getTilePos=function() {
        return b
    }
    ;
    this.getRightBlocks=function() {
        return e
    }
    ;
    this.getLeftBlocks=function() {
        return c
    }
    ;
    this.getUpBlocks=function() {
        return a
    }
    ;
    this.getBlockList=function() {
        return f
    }
    ;
    this.getHeight=function() {
        return d
    }
    ;
    this.getPos=function() {
        return h
    }
    ;
    this.getDifficulty=function() {
        return g
    }
    ;
    return this
}

function CLayoutButton(g, h, b, a, c) {
    var e=!1;
    this.init=function(a, b, c, e, g) {
        b=""+("<div class='layout_preview'><img src='/games/sweety/assets/"+b+".png' /></div>")+("<h2>"+c+"</h2>");
        b+="<h3>"+e+"</h3>";
        $("#"+a).html(b);
        !1===s_bMobile&&($("#"+a).on("mouseover", this, function(a) {
            a.data._onLayoutOver()
        }
        ), $("#"+a).on("mouseout", this, function(a) {
            a.data._onLayoutOut()
        }
        ));
        !0===g?this.lock():this.unlock()
    }
    ;
    this.unload=function() {
        !1===s_bMobile&&($("#"+g).off("mouseover", this, function(a) {
            a.data._onLayoutOver()
        }
        ), $("#"+g).off("mouseout", this, function(a) {
            a.data._onLayoutOut()
        }
        ))
    }
    ;
    this.lock=function() {
        e=!0;
        $("#"+g).css("filter", "saturate(10%)");
        $("#"+g).css("-webkit-filter", "saturate(10%)");
        $("#"+g).css("-moz-filter", "saturate(10%)");
        $("#"+g).css("-o-filter", "saturate(10%)");
        $("#"+g).css("-ms-filter", "saturate(10%)")
    }
    ;
    this.unlock=function() {
        e=!1;
        $("#"+g).css("filter", "saturate(100%)");
        $("#"+g).css("-webkit-filter", "saturate(100%)");
        $("#"+g).css("-moz-filter", "saturate(100%)");
        $("#"+g).css("-o-filter", "saturate(100%)");
        $("#"+g).css("-ms-filter", "saturate(100%)")
    }
    ;
    this.refreshLanguage=function(a, b) {
        $("#"+g+" h2").text(a);
        $("#"+g+" h3").text(b)
    }
    ;
    this._onLayoutOver=function() {
        !1===e&&$("#"+g+" h2").css("color", "#FFCC00")
    }
    ;
    this._onLayoutOut=function() {
        !1===e&&$("#"+g+" h2").css("color", "#b7e0e5")
    }
    ;
    this.init(g, h, b, a, c)
}

var TEXT_PLAY,
TEXT_EXIT,
TEXT_HINT,
TEXT_SCORE,
TEXT_TIME,
TEXT_BONUS_TIME,
TEXT_BONUS,
TEXT_BONUS_SCORE,
TEXT_SKIP,
TEXT_RETRY,
TEXT_HELP,
TEXT_MORE_GAMES,
TEXT_AVAILABLE_COUPLES,
TEXT_SHUFFLE,
TEXT_RESTART,
TEXT_FINAL_SCORE,
TEXT_HELP_1,
TEXT_HELP_2,
TEXT_YES,
TEXT_NO,
TEXT_TITLE_EXIT_FROM_GAME,
TEXT_MSG_EXIT_FROM_GAME,
TEXT_LOADING,
TEXT_CHOOSE_LAYOUT,
TEXT_DIFF_0,
TEXT_DIFF_1,
TEXT_DIFF_2,
TEXT_CONGRATULATIONS,
TEXT_NO_MORE_TILES,
TEXT_ERR_CALL_TITLE,
TEXT_ERR_CALL_MSG,
TEXT_LAYOUT_CLASSIC,
TEXT_LAYOUT_MONUMENT,
TEXT_LAYOUT_PYRAMIDS,
TEXT_LAYOUT_ARENA,
TEXT_LAYOUT_ARROW,
TEXT_LAYOUT_CIRCLE,
TEXT_LAYOUT_COLOSSUS,
TEXT_LAYOUT_FIGHTER,
TEXT_LAYOUT_FIR_TREE,
TEXT_LAYOUT_FORTRESS,
TEXT_LAYOUT_FOUR,
TEXT_LAYOUT_HANGING_GARDENS,
TEXT_LAYOUT_HOT_CHOCOLATE,
TEXT_LAYOUT_HOURGLASS,
TEXT_LAYOUT_ICE_SKATE,
TEXT_LAYOUT_LETTERS,
TEXT_LAYOUT_LIGHTHOUSE,
TEXT_LAYOUT_MAC,
TEXT_LAYOUT_MAUSOLEUM,
TEXT_LAYOUT_TEMPLE,
TEXT_LAYOUT_ARTEMIS_TEMPLE,
TEXT_LAYOUT_GREAT_PYRAMID,
TEXT_LAYOUT_SHIP,
TEXT_LAYOUT_SNOWFLAKE,
TEXT_LAYOUT_SNOWMAN,
TEXT_LAYOUT_SPIDER,
TEXT_LAYOUT_UMBRELLA,
TEXT_LAYOUT_THE_WALL,
TEXT_LAYOUT_WEST,
TEXT_LAYOUT_ZEUS;
function CLang(g) {
    this.initLangDE=function() {
        TEXT_PLAY="SPIELEN";
        TEXT_EXIT="VERLASSEN";
        TEXT_HINT="TIPP";
        TEXT_SCORE="PARTITUR";
        TEXT_HELP="BEISTAND";
        TEXT_MORE_GAMES="MORE GAMES";
        TEXT_AVAILABLE_COUPLES="VERF\u00dcGBARE PAARE";
        TEXT_SHUFFLE="MISCHEN";
        TEXT_RESTART="NEU STARTEN";
        TEXT_RETRY="WIEDERHOLEN";
        TEXT_FINAL_SCORE="ENDSTAND";
        TEXT_TIME="ZEIT";
        TEXT_BONUS_TIME="BONUS-ZEIT";
        TEXT_BONUS="BONUS";
        TEXT_BONUS_SCORE="BONUSPUNKTE";
        TEXT_HELP_1="W\u00c4HLEN SIE GRUPPEN IDENTISCHER SPIELSTEINE ZU ENTFERNEN SIE SIE AUS DER EBENE.";
        TEXT_HELP_2="ENTFERNEN SIE DIE KARTEN IN ZEIT BONUS ZU BEKOMMEN EINE H\u00d6HERE PUNKTZAHL!";
        TEXT_YES="JA";
        TEXT_NO="NEIN";
        TEXT_TITLE_EXIT_FROM_GAME="ACHTUNG";
        TEXT_MSG_EXIT_FROM_GAME="WOLLEN SIE DAS SPIEL VERLASSEN?";
        TEXT_SKIP="\u00dcBERGEHEN";
        TEXT_LOADING="BITTE WARTEN...";
        TEXT_CHOOSE_LAYOUT="W\u00c4HLEN SIE EIN LAYOUT";
        TEXT_DIFF_0="LEICHT";
        TEXT_DIFF_1="MITTEL";
        TEXT_DIFF_2="HART";
        TEXT_CONGRATULATIONS="GL\u00dcCKW\u00dcNSCHE!!!";
        TEXT_NO_MORE_TILES="KEINE WEITEREN FLIESEN W\u00c4HLBAR";
        TEXT_ERR_CALL_TITLE="VERBINDUNGSFEHLER";
        TEXT_ERR_CALL_MSG="KEINE VERBINDUNG ZUM SERVER HERSTELLEN, UM DIE GEW\u00dcNSCHTE OPERATION AUSF\u00dcHREN KANN!";
        TEXT_LAYOUT_CLASSIC="KLASSIKER";
        TEXT_LAYOUT_MONUMENT="DENKMAL";
        TEXT_LAYOUT_PYRAMIDS="PYRAMIDE";
        TEXT_LAYOUT_ARENA="ARENA";
        TEXT_LAYOUT_ARROW="PFEIL";
        TEXT_LAYOUT_CIRCLE="KREIS";
        TEXT_LAYOUT_COLOSSUS="KOLOSS";
        TEXT_LAYOUT_FIGHTER="TILE FIGHTER";
        TEXT_LAYOUT_FIR_TREE="TANNE";
        TEXT_LAYOUT_FORTRESS="FESTUNG";
        TEXT_LAYOUT_FOUR="VIER";
        TEXT_LAYOUT_HANGING_GARDENS="H\u00e4NGENDE G\u00c4RTEN";
        TEXT_LAYOUT_HOT_CHOCOLATE="SCHOKOLADEN-BECHER";
        TEXT_LAYOUT_HOURGLASS="SANDUHR";
        TEXT_LAYOUT_ICE_SKATE="SCHLITTSCHUH";
        TEXT_LAYOUT_LETTERS="D M";
        TEXT_LAYOUT_LIGHTHOUSE="Pharos";
        TEXT_LAYOUT_MAC="MAC";
        TEXT_LAYOUT_MAUSOLEUM="MAUSOLEUM";
        TEXT_LAYOUT_TEMPLE="TEMPEL";
        TEXT_LAYOUT_ARTEMIS_TEMPLE="TEMPEL DER ARTEMIS";
        TEXT_LAYOUT_GREAT_PYRAMID="PYRAMIDE";
        TEXT_LAYOUT_SHIP="SEGELBOOT";
        TEXT_LAYOUT_SNOWFLAKE="SCHNEEFLOCKE";
        TEXT_LAYOUT_SNOWMAN="SCHNEEMANN";
        TEXT_LAYOUT_SPIDER="SPINNE";
        TEXT_LAYOUT_UMBRELLA="REGENSCHIRM";
        TEXT_LAYOUT_THE_WALL="DIE WAND";
        TEXT_LAYOUT_WEST="WESTEN";
        TEXT_LAYOUT_ZEUS="ZEUS-STATUE"
    }
    ;
    this.initLangENG=function() {
        TEXT_PLAY="PLAY";
        TEXT_EXIT="EXIT";
        TEXT_HINT="HINT";
        TEXT_SCORE="SCORE";
        TEXT_HELP="HELP";
        TEXT_MORE_GAMES="MORE GAMES";
        TEXT_AVAILABLE_COUPLES="AVAILABLE COUPLES";
        TEXT_SHUFFLE="SHUFFLE";
        TEXT_RESTART="RESTART";
        TEXT_RETRY="RETRY";
        TEXT_FINAL_SCORE="FINAL SCORE";
        TEXT_TIME="TIME";
        TEXT_BONUS_TIME="BONUS TIME";
        TEXT_BONUS="BONUS";
        TEXT_BONUS_SCORE="BONUS SCORE";
        TEXT_HELP_1="MATCH NOT-BLOCKED PAIRS OF EQUAL TILES AND REMOVE THEM FROM THE BOARD.";
        TEXT_HELP_2="TRY TO MATCH TILES WITHIN BONUS TIME TO GAIN MORE POINTS!";
        TEXT_YES="YES";
        TEXT_NO="NO";
        TEXT_TITLE_EXIT_FROM_GAME="WARNING";
        TEXT_MSG_EXIT_FROM_GAME="DO YOU REALLY WANT TO LEAVE THE GAME?";
        TEXT_SKIP="SKIP";
        TEXT_LOADING="PLEASE WAIT...";
        TEXT_CHOOSE_LAYOUT="CHOOSE A LAYOUT";
        TEXT_DIFF_0="EASY";
        TEXT_DIFF_1="MEDIUM";
        TEXT_DIFF_2="HARD";
        TEXT_CONGRATULATIONS="CONGRATULATIONS!!!";
        TEXT_NO_MORE_TILES="NO MORE TILES SELECTABLE";
        TEXT_ERR_CALL_TITLE="CONNECTION ERROR";
        TEXT_ERR_CALL_MSG="UNABLE TO CONNECT TO THE SERVER TO EXECUTE THE REQUIRED OPERATION!";
        TEXT_LAYOUT_CLASSIC="CLASSIC";
        TEXT_LAYOUT_MONUMENT="MONUMENT";
        TEXT_LAYOUT_PYRAMIDS="PYRAMIDS";
        TEXT_LAYOUT_ARENA="ARENA";
        TEXT_LAYOUT_ARROW="ARROW";
        TEXT_LAYOUT_CIRCLE="CIRCLE";
        TEXT_LAYOUT_COLOSSUS="COLOSSUS";
        TEXT_LAYOUT_FIGHTER="TILE FIGHTER";
        TEXT_LAYOUT_FIR_TREE="FIR TREE";
        TEXT_LAYOUT_FORTRESS="FORTRESS";
        TEXT_LAYOUT_FOUR="FOUR";
        TEXT_LAYOUT_HANGING_GARDENS="HANGING GARDENS";
        TEXT_LAYOUT_HOT_CHOCOLATE="HOT CHOCOLATE MUG";
        TEXT_LAYOUT_HOURGLASS="HOURGLASS";
        TEXT_LAYOUT_ICE_SKATE="ICE SKATE";
        TEXT_LAYOUT_LETTERS="D M";
        TEXT_LAYOUT_LIGHTHOUSE="LIGHTHOUSE";
        TEXT_LAYOUT_MAC="MAC";
        TEXT_LAYOUT_MAUSOLEUM="MAUSOLEUM";
        TEXT_LAYOUT_TEMPLE="TEMPLE";
        TEXT_LAYOUT_ARTEMIS_TEMPLE="ARTEMIS TEMPLE";
        TEXT_LAYOUT_GREAT_PYRAMID="GREAT PYRAMID";
        TEXT_LAYOUT_SHIP="SHIP";
        TEXT_LAYOUT_SNOWFLAKE="SNOWFLAKE";
        TEXT_LAYOUT_SNOWMAN="SNOWMAN";
        TEXT_LAYOUT_SPIDER="SPIDER";
        TEXT_LAYOUT_UMBRELLA="UMBRELLA";
        TEXT_LAYOUT_THE_WALL="THE WALL";
        TEXT_LAYOUT_WEST="WEST";
        TEXT_LAYOUT_ZEUS="STATUE OF ZEUS"
    }
    ;
    this.initLangES=function() {
        TEXT_PLAY="JUEGAS";
        TEXT_EXIT="SALES";
        TEXT_MORE_GAMES="MORE GAMES";
        TEXT_HINT="SUGERENCIA";
        TEXT_SCORE="MARCADOR";
        TEXT_HELP="AYUDA";
        TEXT_AVAILABLE_COUPLES="PAREJAS DISPONIBLES";
        TEXT_SHUFFLE="MEZCLA";
        TEXT_RESTART="RECOMIENZAS";
        TEXT_RETRY="REINTENTA";
        TEXT_FINAL_SCORE="PUNTUACI\u00d3N FINAL";
        TEXT_TIME="TIEMPO";
        TEXT_BONUS_TIME="TIEMPO BONUS";
        TEXT_BONUS="BONUS";
        TEXT_BONUS_SCORE="MARCADOR BONUS";
        TEXT_HELP_1="SELECCIONAR\u00c1 PAREJAS ID\u00c9NTICAS DE TEJAS LIBRES PARA ELIMINARLAS DE LEVEL.";
        TEXT_HELP_2="INTENTAS QUITAR LAS TEJAS  EN EL TIEMPO BONUS PARA OBTENER UNA PUNTUACI\u00d3N MAS ALTO!";
        TEXT_YES="S\u00cd";
        TEXT_NO="NO";
        TEXT_TITLE_EXIT_FROM_GAME="ADVERTENCIA";
        TEXT_MSG_EXIT_FROM_GAME="\u00bfSEGURO QUE DEJA EL JUEGO?";
        TEXT_SKIP="SALTARSE";
        TEXT_LOADING="ESPERE POR FAVOR ...";
        TEXT_CHOOSE_LAYOUT="ELIGE UN ESQUEMA";
        TEXT_DIFF_0="F\u00c1CIL";
        TEXT_DIFF_1="MEDIANO";
        TEXT_DIFF_2="DIF\u00cdCIL";
        TEXT_CONGRATULATIONS="CONGRATULACIONES!!!";
        TEXT_NO_MORE_TILES="NO HAY M\u00c1S FICHAS SELECCIONABLES";
        TEXT_ERR_CALL_TITLE="ERROR DE CONEXI\u00d3N";
        TEXT_ERR_CALL_MSG="\u00a1 NO ES POSIBLE CONECTARSE AL SERVIDOR PARA EJECUTAR LA OPERACI\u00d3N SOLICITADA !";
        TEXT_LAYOUT_CLASSIC="CL\u00c1SICO";
        TEXT_LAYOUT_MONUMENT="MONUMENTO";
        TEXT_LAYOUT_PYRAMIDS="PIR\u00c1MIDE";
        TEXT_LAYOUT_ARENA="ARENA";
        TEXT_LAYOUT_ARROW="FLECHA";
        TEXT_LAYOUT_CIRCLE="C\u00cdRCULO";
        TEXT_LAYOUT_COLOSSUS="COLOSO";
        TEXT_LAYOUT_FIGHTER="TILE FIGHTER";
        TEXT_LAYOUT_FIR_TREE="ABETO";
        TEXT_LAYOUT_FORTRESS="FORTALEZA";
        TEXT_LAYOUT_FOUR="CUATRO";
        TEXT_LAYOUT_HANGING_GARDENS="JARDINES COLGANTES";
        TEXT_LAYOUT_HOT_CHOCOLATE="TAZA DE CHOCOLATE";
        TEXT_LAYOUT_HOURGLASS="RELOJ DE ARENA";
        TEXT_LAYOUT_ICE_SKATE="PATIN DE HIELO";
        TEXT_LAYOUT_LETTERS="D M";
        TEXT_LAYOUT_LIGHTHOUSE="FARO";
        TEXT_LAYOUT_MAC="MAC";
        TEXT_LAYOUT_MAUSOLEUM="MAUSOLEO";
        TEXT_LAYOUT_TEMPLE="TEMPLO";
        TEXT_LAYOUT_ARTEMIS_TEMPLE="TEMPLO DE ARTEMISA";
        TEXT_LAYOUT_GREAT_PYRAMID="PIR\u00c1MIDE";
        TEXT_LAYOUT_SHIP="VELERO";
        TEXT_LAYOUT_SNOWFLAKE="COPO DE NIEVE";
        TEXT_LAYOUT_SNOWMAN="MU\u00d1ECO DE NIEVE";
        TEXT_LAYOUT_SPIDER="ARA\u00d1A";
        TEXT_LAYOUT_UMBRELLA="PARAGUAS";
        TEXT_LAYOUT_THE_WALL="LA PARED";
        TEXT_LAYOUT_WEST="OESTE";
        TEXT_LAYOUT_ZEUS="ESTATUA DE ZEUS"
    }
    ;
    this.initLangFR=function() {
        TEXT_PLAY="JOUES";
        TEXT_EXIT="SORTIE";
        TEXT_MORE_GAMES="MORE GAMES";
        TEXT_HINT="AIDE";
        TEXT_SCORE="SCORE";
        TEXT_HELP="AIDER";
        TEXT_AVAILABLE_COUPLES="COUPLES DISPONIBLES";
        TEXT_SHUFFLE="BATS";
        TEXT_RESTART="RECOMMENCES";
        TEXT_RETRY="R\u00c9ESSAIE";
        TEXT_FINAL_SCORE="SCORE FINAL";
        TEXT_TIME="TEMPS";
        TEXT_BONUS_TIME="TEMPS PRIME";
        TEXT_BONUS="PRIME";
        TEXT_BONUS_SCORE="SCORE BONUS";
        TEXT_HELP_1="S\u00c9LECTIONNEZ PAIRES IDENTIQUES DE TUILES LIBRES ET RETIREZ-LES DE NIVEAU.";
        TEXT_HELP_2="ESSAYEZ DE FAIRE CORRESPONDRE LES TUILES DANS BONUS DE TEMPS POUR GAGNER PLUS DE POINTS!";
        TEXT_YES="OUI";
        TEXT_NO="NON";
        TEXT_TITLE_EXIT_FROM_GAME="ATTENTION";
        TEXT_MSG_EXIT_FROM_GAME="VOULEZ-VOUS LAISSER LE JEU?";
        TEXT_SKIP="PASSER";
        TEXT_LOADING="VEUILLEZ PATIENTER...";
        TEXT_CHOOSE_LAYOUT="CHOISISSEZ UNE LAYOUT ";
        TEXT_DIFF_0="FACILE";
        TEXT_DIFF_1="MOYENNE";
        TEXT_DIFF_2="DIFFICILE";
        TEXT_CONGRATULATIONS="F\u00c9LICITATIONS!!!";
        TEXT_NO_MORE_TILES="IL N'Y A PAS PLUS DE TUILES PEUVENT \u00caTRE S\u00c9LECTIONN\u00c9S";
        TEXT_ERR_CALL_TITLE="ERREUR DE CONNEXION";
        TEXT_ERR_CALL_MSG="IMPOSSIBLE DE SE CONNECTER AU SERVEUR POUR EX\u00c9CUTER L'OP\u00c9RATION REQUISE!";
        TEXT_LAYOUT_CLASSIC="CLASSIQUE";
        TEXT_LAYOUT_MONUMENT="MONUMENT";
        TEXT_LAYOUT_PYRAMIDS="PIRAMIDE";
        TEXT_LAYOUT_ARENA="AR\u00c9NE";
        TEXT_LAYOUT_ARROW="FL\u00c9CHE";
        TEXT_LAYOUT_CIRCLE="CERCLE";
        TEXT_LAYOUT_COLOSSUS="COLOSSE";
        TEXT_LAYOUT_FIGHTER="CHASSEUR TIE";
        TEXT_LAYOUT_FIR_TREE="SAPIN";
        TEXT_LAYOUT_FORTRESS="FORTERESSE";
        TEXT_LAYOUT_FOUR="QUATRE";
        TEXT_LAYOUT_HANGING_GARDENS="JARDINS SUSPENDUS";
        TEXT_LAYOUT_HOT_CHOCOLATE="TASSE DE CHOCOLAT";
        TEXT_LAYOUT_HOURGLASS="SABLIER";
        TEXT_LAYOUT_ICE_SKATE="PATIN";
        TEXT_LAYOUT_LETTERS="D M";
        TEXT_LAYOUT_LIGHTHOUSE="PHARE";
        TEXT_LAYOUT_MAC="MAC";
        TEXT_LAYOUT_MAUSOLEUM="MAUSOL\u00c9E";
        TEXT_LAYOUT_TEMPLE="TEMPLE";
        TEXT_LAYOUT_ARTEMIS_TEMPLE="TEMPLE D'ART\u00c9MIS";
        TEXT_LAYOUT_GREAT_PYRAMID="PIRAMIDE";
        TEXT_LAYOUT_SHIP="BATEAU \u00c0 VOILE";
        TEXT_LAYOUT_SNOWFLAKE="FLOCON DE NEIGE";
        TEXT_LAYOUT_SNOWMAN="BONHOMME DE NEIGE";
        TEXT_LAYOUT_SPIDER="ARAIGN\u00c9E";
        TEXT_LAYOUT_UMBRELLA="PARAPLUIE";
        TEXT_LAYOUT_THE_WALL="LE MUR";
        TEXT_LAYOUT_WEST="OUEST";
        TEXT_LAYOUT_ZEUS="STATUE DE ZEUS"
    }
    ;
    this.initLangITA=function() {
        TEXT_PLAY="GIOCA";
        TEXT_EXIT="ESCI";
        TEXT_MORE_GAMES="MORE GAMES";
        TEXT_HINT="AIUTO";
        TEXT_SCORE="PUNTEGGIO";
        TEXT_HELP="AIUTO";
        TEXT_AVAILABLE_COUPLES="COPPIE DISPONIBILI";
        TEXT_SHUFFLE="MISCHIA";
        TEXT_RESTART="RIPETI";
        TEXT_RETRY="RIPROVA";
        TEXT_FINAL_SCORE="PUNTEGGIO FINALE";
        TEXT_TIME="TEMPO";
        TEXT_BONUS_TIME="TEMPO BONUS";
        TEXT_BONUS="BONUS";
        TEXT_BONUS_SCORE="PUNTEGGIO BONUS";
        TEXT_HELP_1="SELEZIONA COPPIE IDENTICHE DI TESSERE LIBERE PER RIMUOVERLE DAL LIVELLO.";
        TEXT_HELP_2="CERCA DI RIMUOVERE LE TESSERE ENTRO IL TEMPO BONUS PER OTTENERE UN PUNTEGGIO PIU' ALTO!";
        TEXT_YES="SI";
        TEXT_NO="NO";
        TEXT_TITLE_EXIT_FROM_GAME="ATTENZIONE";
        TEXT_MSG_EXIT_FROM_GAME="SEI SICURO DI USCIRE DAL GIOCO?";
        TEXT_SKIP="SALTA";
        TEXT_LOADING="CARICAMENTO...";
        TEXT_CHOOSE_LAYOUT="SCEGLI UN LIVELLO";
        TEXT_DIFF_0="FACILE";
        TEXT_DIFF_1="MEDIO";
        TEXT_DIFF_2="DIFFICILE";
        TEXT_CONGRATULATIONS="CONGRATULAZIONI!!!";
        TEXT_NO_MORE_TILES="NON CI SONO PI\u00da TESSERE SELEZIONABILI";
        TEXT_ERR_CALL_TITLE="ERRORE DI CONNESSIONE";
        TEXT_ERR_CALL_MSG="IMPOSSIBILE CONTATTARE IL SERVER PER EFFETTUARE L'OPERAZIONE DESIDERATA!";
        TEXT_LAYOUT_CLASSIC="CLASSICO";
        TEXT_LAYOUT_MONUMENT="MONUMENTO";
        TEXT_LAYOUT_PYRAMIDS="PIRAMIDI";
        TEXT_LAYOUT_ARENA="ARENA";
        TEXT_LAYOUT_ARROW="FRECCIA";
        TEXT_LAYOUT_CIRCLE="CERCHIO";
        TEXT_LAYOUT_COLOSSUS="COLOSSO";
        TEXT_LAYOUT_FIGHTER="TILE FIGHTER";
        TEXT_LAYOUT_FIR_TREE="ABETE";
        TEXT_LAYOUT_FORTRESS="FORTEZZA";
        TEXT_LAYOUT_FOUR="QUATTRO";
        TEXT_LAYOUT_HANGING_GARDENS="GIARDINI PENSILI";
        TEXT_LAYOUT_HOT_CHOCOLATE="TAZZA DI CIOCCOLATO";
        TEXT_LAYOUT_HOURGLASS="CLESSIDRA";
        TEXT_LAYOUT_ICE_SKATE="PATTINO";
        TEXT_LAYOUT_LETTERS="D M";
        TEXT_LAYOUT_LIGHTHOUSE="FARO";
        TEXT_LAYOUT_MAC="MAC";
        TEXT_LAYOUT_MAUSOLEUM="MAUSOLEO";
        TEXT_LAYOUT_TEMPLE="TEMPIO";
        TEXT_LAYOUT_ARTEMIS_TEMPLE="TEMPIO DI ARTEMIDE";
        TEXT_LAYOUT_GREAT_PYRAMID="PIRAMIDE";
        TEXT_LAYOUT_SHIP="BARCA A VELA";
        TEXT_LAYOUT_SNOWFLAKE="FIOCCO DI NEVE";
        TEXT_LAYOUT_SNOWMAN="PUPAZZO DI NEVE";
        TEXT_LAYOUT_SPIDER="RAGNO";
        TEXT_LAYOUT_UMBRELLA="OMBRELLO";
        TEXT_LAYOUT_THE_WALL="IL MURO";
        TEXT_LAYOUT_WEST="OVEST";
        TEXT_LAYOUT_ZEUS="STATUA DI ZEUS"
    }
    ;
    this.initLangNL=function() {
        TEXT_PLAY="SPELEN";
        TEXT_EXIT="UITGANG";
        TEXT_MORE_GAMES="MORE GAMES";
        TEXT_HINT="TIP";
        TEXT_SCORE="PARTITUUR";
        TEXT_HELP="HULP";
        TEXT_AVAILABLE_COUPLES="BESCHIKBAAR PAREN";
        TEXT_SHUFFLE="SCHUIFELEN";
        TEXT_RESTART="OPNIEUW BEGINNEN";
        TEXT_RETRY="OPNIEUW PROBEREN";
        TEXT_FINAL_SCORE="EINDSCORE";
        TEXT_TIME="TIJD";
        TEXT_BONUS_TIME="BONUS TIJD";
        TEXT_BONUS="BONUS";
        TEXT_BONUS_SCORE="BONUS SCORE";
        TEXT_HELP_1="SELECTEER PAREN VAN IDENTIEKE STENEN ON ZE TE VERWIJDEREN VAN HET NIVEAU.";
        TEXT_HELP_2="PROBEER TEGELS PASSEN BINNEN BONUS TIME TO MEER PUNTEN TE VERDIENEN!";
        TEXT_YES="JA";
        TEXT_NO="NEE";
        TEXT_TITLE_EXIT_FROM_GAME="ATTENTIE";
        TEXT_MSG_EXIT_FROM_GAME="WIL JE HET SPEL TE VERLATEN?";
        TEXT_SKIP="OVERSLAAN";
        TEXT_LOADING="EVEN GEDULD AUB...";
        TEXT_CHOOSE_LAYOUT="KIES EEN LAYOUT";
        TEXT_DIFF_0="EENVOUDIG";
        TEXT_DIFF_1="GEMIDDELD";
        TEXT_DIFF_2="HARDE";
        TEXT_CONGRATULATIONS="GEFELICITEERD!!!";
        TEXT_NO_MORE_TILES="NIET MEER TEGELS SELECTEERBAAR";
        TEXT_ERR_CALL_TITLE="VERBINDINGSFOUT";
        TEXT_ERR_CALL_MSG="GEEN VERBINDING MET DE SERVER OM DE GEWENSTE HANDELING UIT TE VOEREN!";
        TEXT_LAYOUT_CLASSIC="KLASSIEK";
        TEXT_LAYOUT_MONUMENT="MONUMENT";
        TEXT_LAYOUT_PYRAMIDS="PIRAMIDE";
        TEXT_LAYOUT_ARENA="ARENA";
        TEXT_LAYOUT_ARROW="PIJL";
        TEXT_LAYOUT_CIRCLE="CIRKEL";
        TEXT_LAYOUT_COLOSSUS="KOLOSSUS";
        TEXT_LAYOUT_FIGHTER="TILE FIGHTER";
        TEXT_LAYOUT_FIR_TREE="SPARRENBOOM";
        TEXT_LAYOUT_FORTRESS="VESTING";
        TEXT_LAYOUT_FOUR="VIER";
        TEXT_LAYOUT_HANGING_GARDENS="HANGENDE TUINEN";
        TEXT_LAYOUT_HOT_CHOCOLATE="CHOCOLADE MOK";
        TEXT_LAYOUT_HOURGLASS="ZANDLOPER";
        TEXT_LAYOUT_ICE_SKATE="SCHAATSEN";
        TEXT_LAYOUT_LETTERS="D M";
        TEXT_LAYOUT_LIGHTHOUSE="PHAROS";
        TEXT_LAYOUT_MAC="MAC";
        TEXT_LAYOUT_MAUSOLEUM="MAUSOLEUM";
        TEXT_LAYOUT_TEMPLE="TEMPEL";
        TEXT_LAYOUT_ARTEMIS_TEMPLE="TEMPEL VAN ARTEMIS";
        TEXT_LAYOUT_GREAT_PYRAMID="PIRAMIDE";
        TEXT_LAYOUT_SHIP="ZEILBOOT";
        TEXT_LAYOUT_SNOWFLAKE="SNEEUWVLOK";
        TEXT_LAYOUT_SNOWMAN="SNEEUWMAN";
        TEXT_LAYOUT_SPIDER="SPIN";
        TEXT_LAYOUT_UMBRELLA="PARAPLU";
        TEXT_LAYOUT_THE_WALL="DE MUUR";
        TEXT_LAYOUT_WEST="WEST";
        TEXT_LAYOUT_ZEUS="BEELD VAN ZEUS"
    }
    ;
    this.initLangPOR=function() {
        TEXT_PLAY="JOGA";
        TEXT_EXIT="SAIR";
        TEXT_MORE_GAMES="MORE GAMES";
        TEXT_HINT="SUGEST\u00c3O";
        TEXT_SCORE="ESCORE";
        TEXT_HELP="AJUDA";
        TEXT_AVAILABLE_COUPLES="CASAIS DISPON\u00cdVEIS";
        TEXT_SHUFFLE="EMBARALHAR";
        TEXT_RESTART="RECOMEN\u00c7AR";
        TEXT_RETRY="TENTA NOVAMENTE";
        TEXT_FINAL_SCORE="PONTUA\u00c7\u00c3O FINAL";
        TEXT_TIME="TEMPO";
        TEXT_BONUS_TIME="TEMO B\u00d4NUS";
        TEXT_BONUS="B\u00d4NUS";
        TEXT_BONUS_SCORE="ESCORE B\u00d4NUS";
        TEXT_HELP_1="SELECIONE PARES ID\u00caNTICOS DE PE\u00c7AS LIVRES PARA REMOV\u00ca-LOS DO LEVEL.";
        TEXT_HELP_2="TENTE REMOVER OS CART\u00d5ES DENTRO B\u00d4NUS DE TEMPO PARA OBTER A PONTUA\u00c7\u00c3O MAIS ALTA!";
        TEXT_YES="SIM";
        TEXT_NO="N\u00c3O";
        TEXT_TITLE_EXIT_FROM_GAME="CUIDADO";
        TEXT_MSG_EXIT_FROM_GAME="VOC\u00ca QUER SAIR DO JOGO?";
        TEXT_SKIP="SALTAR";
        TEXT_LOADING="AGUARDE POR FAVOR ...";
        TEXT_CHOOSE_LAYOUT="ESCOLHA UM LAYOUT";
        TEXT_DIFF_0="F\u00c1CIL";
        TEXT_DIFF_1="M\u00c9DIO";
        TEXT_DIFF_2="DIF\u00cdCIL ";
        TEXT_CONGRATULATIONS="PARAB\u00c9NS!!!";
        TEXT_NO_MORE_TILES="N\u00c3O MAIS PE\u00c7AS SELECION\u00c1VEL";
        TEXT_ERR_CALL_TITLE="ERRO DE CONEX\u00c3O";
        TEXT_ERR_CALL_MSG="IMPOSS\u00cdVEL SE CONECTAR AO SERVER PARA EXECUTAR A OPERA\u00c7\u00c3O NECESS\u00c1RIA!";
        TEXT_LAYOUT_CLASSIC="CL\u00c1SSICO";
        TEXT_LAYOUT_MONUMENT="MONUMENTO";
        TEXT_LAYOUT_PYRAMIDS="PIR\u00c2MIDE";
        TEXT_LAYOUT_ARENA="ARENA";
        TEXT_LAYOUT_ARROW="FLECHA";
        TEXT_LAYOUT_CIRCLE="C\u00cdRCULO";
        TEXT_LAYOUT_COLOSSUS="COLOSSO";
        TEXT_LAYOUT_FIGHTER="TILE FIGHTER";
        TEXT_LAYOUT_FIR_TREE="ABETO";
        TEXT_LAYOUT_FORTRESS="FORTALEZA";
        TEXT_LAYOUT_FOUR="QUATRO";
        TEXT_LAYOUT_HANGING_GARDENS="JARDINS SUSPENSOS";
        TEXT_LAYOUT_HOT_CHOCOLATE="CANECA DO CHOCOLATE";
        TEXT_LAYOUT_HOURGLASS="AMPULHETA";
        TEXT_LAYOUT_ICE_SKATE="PATIM";
        TEXT_LAYOUT_LETTERS="D M";
        TEXT_LAYOUT_LIGHTHOUSE="FAROL";
        TEXT_LAYOUT_MAC="MAC";
        TEXT_LAYOUT_MAUSOLEUM="MAUSOL\u00c9U";
        TEXT_LAYOUT_TEMPLE="TEMPLO";
        TEXT_LAYOUT_ARTEMIS_TEMPLE="TEMPLO DE \u00c1RTEMIS";
        TEXT_LAYOUT_GREAT_PYRAMID="PIR\u00c2MIDE";
        TEXT_LAYOUT_SHIP="BARCO \u00c0 VELA";
        TEXT_LAYOUT_SNOWFLAKE="FLOCO DE NEVE";
        TEXT_LAYOUT_SNOWMAN="BONECO DE NEVE";
        TEXT_LAYOUT_SPIDER="ARANHA";
        TEXT_LAYOUT_UMBRELLA="GUARDA-CHUVA";
        TEXT_LAYOUT_THE_WALL="A PAREDE";
        TEXT_LAYOUT_WEST="OESTE";
        TEXT_LAYOUT_ZEUS="EST\u00c1TUA DE ZEUS"
    }
    ;
    this.refreshLanguage=function(g) {
        switch(g) {
            case "de_DE": this.initLangDE();
            break;
            case "es_ES": case "es_LA": this.initLangES();
            break;
            case "fr_CA": case "fr_FR": this.initLangFR();
            break;
            case "it_IT": this.initLangITA();
            break;
            case "nl_NL": this.initLangNL();
            break;
            case "pt_BR": case "pt_PT": this.initLangPOR();
            break;
            default: this.initLangENG()
        }
    }
    ;
    this.refreshLanguage(g);
    return this
}

function CInterface() {
    var g=!1,
    h,
    b;
    this.init=function() {
        var a;
        a="<div id='hint_text'  class='text_class'></div>"+("<div id='text_score' class='text_class'>"+TEXT_SCORE+": 0000</div>");
        a+="<div id='bonus_time' class='text_class'></div>";
        a+="<div id='button_game_hint' class='game_button button_class'>"+TEXT_HINT+"</div>";
        a+="<div id='button_game_restart' class='game_button button_class'>"+TEXT_RESTART+"</div>";
        a+="<div id='button_game_shuffle' class='game_button button_class'>"+TEXT_SHUFFLE+"</div>";
        a+="<div id='button_exit' style=\"background-image:url("+s_oSpriteLibrary.getSpritePath("exit_but")+')"></div>';
        a+="<div id='bonus_score' class='bonus_score_anim text_class'></div>";
        a+="<div id='block_panel'></div>";
        a+="<div id='win_panel' style=\"background-image:url("+s_oSpriteLibrary.getSpritePath("panel_bg")+')"></div>';
        a+="<div id='game_over_panel' style=\"background-image:url("+s_oSpriteLibrary.getSpritePath("panel_bg")+')"></div>';
        $("#match_game_container").append(a);
        !1===s_bMobile&&($("#button_game_hint").on("mouseover", function(a) {
            $(this).css("color", "#FFCC00")
        }
        ), $("#button_game_hint").on("mouseout", function(a) {
            $(this).css("color", "#b7e0e5")
        }
        ), $("#button_game_restart").on("mouseover", function(a) {
            $(this).css("color", "#FFCC00")
        }
        ), $("#button_game_restart").on("mouseout", function(a) {
            $(this).css("color", "#b7e0e5")
        }
        ), $("#button_game_shuffle").on("mouseover", function(a) {
            $(this).css("color", "#FFCC00")
        }
        ), $("#button_game_shuffle").on("mouseout", function(a) {
            $(this).css("color", "#b7e0e5")
        }
        ), $("#button_exit").on("mouseover", function(a) {
            $(this).css("color", "#FFCC00")
        }
        ), $("#button_exit").on("mouseout", function(a) {
            $(this).css("color", "#b7e0e5")
        }
        ));
        $("#button_game_hint").on("mouseup", this, function(a) {
            a.data._onHint()
        }
        );
        $("#button_game_restart").on("mouseup", this, function(a) {
            a.data._onRestart()
        }
        );
        $("#button_game_shuffle").on("mouseup", this, function(a) {
            a.data._onShuffle()
        }
        );
        $("#button_exit").on("mouseup", this, function(a) {
            a.data._onExit()
        }
        );
        h=new CWinPanel("win_panel");
        b=new CGameOverPanel("game_over_panel")
    }
    ;
    this.unload=function() {
        $("#button_game_hint").off("mouseup", this, function(a) {
            a.data._onHint()
        }
        );
        $("#button_game_restart").off("mouseup", this, function(a) {
            a.data._onRestart()
        }
        );
        $("#button_game_shuffle").off("mouseup", this, function(a) {
            a.data._onShuffle()
        }
        );
        $("#button_exit").off("mouseup", this, function(a) {
            a.data._onExit()
        }
        );
        !1===s_bMobile&&($("#button_game_hint").off("mouseover", function(a) {
            $(this).css("color", "#FFCC00")
        }
        ), $("#button_game_hint").off("mouseout", function(a) {
            $(this).css("color", "#b7e0e5")
        }
        ), $("#button_game_restart").off("mouseover", function(a) {
            $(this).css("color", "#FFCC00")
        }
        ), $("#button_game_restart").off("mouseout", function(a) {
            $(this).css("color", "#b7e0e5")
        }
        ), $("#button_game_shuffle").off("mouseover", function(a) {
            $(this).css("color", "#FFCC00")
        }
        ), $("#button_game_shuffle").off("mouseout", function(a) {
            $(this).css("color", "#b7e0e5")
        }
        ), $("#button_exit").off("mouseover", function(a) {
            $(this).css("color", "#FFCC00")
        }
        ), $("#button_exit").off("mouseout", function(a) {
            $(this).css("color", "#b7e0e5")
        }
        ));
        h.unload();
        b.unload()
    }
    ;
    this.refreshLanguage=function() {
        $("#button_game_hint").text(TEXT_HINT);
        $("#button_game_restart").text(TEXT_RESTART);
        $("#button_game_shuffle").text(TEXT_SHUFFLE);
        h.refreshLanguage();
        b.refreshLanguage()
    }
    ;
    this.setScore=function(a) {
        $("#text_score").text(TEXT_SCORE+": "+a)
    }
    ;
    this.setHintNum=function(a) {
        $("#hint_text").text(TEXT_AVAILABLE_COUPLES+": "+a)
    }
    ;
    this.showBonusScore=function(a) {
        if(!g) {
            g=!0;
            $("#bonus_score").text(TEXT_BONUS_SCORE+": "+a);
            var b=$("#bonus_score");
            $("#bonus_score").animate( {
                top: "+=56px"
            }
            , 300, "easein", function() {
                setTimeout(function() {
                    b.animate( {
                        top: "-=56px"
                    }
                    , 300, "easeout");
                    g=!1
                }
                , 1E3)
            }
            )
        }
    }
    ;
    this.refreshTime=function(a) {
        $("#bonus_time").text(TEXT_BONUS_TIME+": "+this.formatTime(Math.floor(a)))
    }
    ;
    this.gameOver=function(a) {
        this.showBlock();
        b.show(a);
        $(s_oApp).trigger("save_score", [a, !1])
    }
    ;
    this.win=function(a) {
        this.showBlock();
        h.show(a);
        $(s_oApp).trigger("save_score", [a, !0])
    }
    ;
    this.showBlock=function() {
        $("#block_panel").css("display", "block")
    }
    ;
    this.hideBlock=function() {
        $("#block_panel").css("display", "none")
    }
    ;
    this._onRestart=function() {
        s_oGame.onRestartBoard()
    }
    ;
    this._onHint=function() {
        s_oGame.onHintReleased()
    }
    ;
    this._onShuffle=function() {
        s_oGame.onShuffleBoard()
    }
    ;
    this._onExit=function() {
        _oMsgBox.setTextButton(1, TEXT_NO);
        _oMsgBox.setTextButton(3, TEXT_YES);
        _oMsgBox.showMessageBox(TEXT_TITLE_EXIT_FROM_GAME, TEXT_MSG_EXIT_FROM_GAME, MSG_BOX_MODE_YES_NO, ON_MSGBOX_NOT_EXIT_FROM_GAME, null, ON_MSGBOX_EXIT_FROM_GAME)
    }
    ;
    this.formatTime=function(a) {
        a/=1E3;
        a=Math.floor(a-60*Math.floor(a/60));
        var b="";
        return 10>a?b+("0"+a): b+a
    }
    ;
    this.init()
}

function CHelp() {
    var g,
    h=null,
    b=null;
    this._init=function() {
        var a;
        a=""+("<div id='help_text1' class='text_class' >"+TEXT_HELP_1+"</div>");
        a+="<div id='help_text2' class='text_class' >"+TEXT_HELP_2+"</div>";
        a+="<div id='help_button_exit' class='button_class' >"+TEXT_EXIT+"</div>";
        $("#help_container").html(a);
        this._initHelpExample1();
        $("#help_container").css("background-image", "url("+s_oSpriteLibrary.getSpritePath("help_bg")+")");
        $("#help_container").css("display", "block");
        !1===s_bMobile&&($("#help_button_exit").on("mouseover", function(a) {
            $(this).css("color", "#FFCC00")
        }
        ), $("#help_button_exit").on("mouseout", function(a) {
            $(this).css("color", "#b7e0e5")
        }
        ));
        $("#help_button_exit").on("mouseup", this, function(a) {
            a.data._onExit()
        }
        )
    }
    ;
    this.unload=function() {
        $("#help_button_exit").off("mouseup", this, function(a) {
            a.data._onExit()
        }
        );
        !1===s_bMobile&&($("#help_button_exit").off("mouseover", function(a) {
            $(this).css("color", "#FFCC00")
        }
        ), $("#help_button_exit").off("mouseout", function(a) {
            $(this).css("color", "#b7e0e5")
        }
        ))
    }
    ;
    this.refreshLanguage=function() {
        $("#help_button_exit").text(TEXT_EXIT);
        $("#help_text1").text(TEXT_HELP_1);
        $("#help_text2").text(TEXT_HELP_2)
    }
    ;
    this._initHelpExample1=function() {
        var a="circle1 circle1 season3 characters4 circle8 bamboo4 characters1 circle1 characters5 wind1 wind3 dragon1".split(" "),
        b=[[ {
            index: 1, decrease: 1
        }
        ],
        [ {
            index: 2, decrease: 1
        }
        ],
        [ {
            index: 1, decrease: 1
        }
        ,
        {
            index: 3, decrease: 1
        }
        ],
        [ {
            index: 2, decrease: 1
        }
        ],
        [ {
            index: 5, decrease: 1
        }
        ],
        [ {
            index: 6, decrease: 1
        }
        ],
        [ {
            index: 5, decrease: 1
        }
        ,
        {
            index: 7, decrease: 1
        }
        ],
        [ {
            index: 6, decrease: 1
        }
        ],
        [ {
            index: 9, decrease: 1
        }
        ],
        [ {
            index: 10, decrease: 1
        }
        ],
        [ {
            index: 9, decrease: 1
        }
        ,
        {
            index: 11, decrease: 1
        }
        ],
        [ {
            index: 10, decrease: 1
        }
        ]],
        e=[[],
        [0],
        [1],
        [],
        [],
        [4],
        [5],
        [],
        [],
        [8],
        [9],
        []],
        f=[[],
        [2],
        [3],
        [],
        [],
        [6],
        [7],
        [],
        [],
        [10],
        [11],
        []],
        d=[[],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []],
        h=0,
        s=0;
        g=[];
        var p;
        p="<div id='help_tile_container'>";
        for(var m=0;
        12>m;
        m++)p+="<div id='tile_"+m+"' class='mahjong_tile'>",
        p+="<div id='selection_"+m+"' class='selection_tile' style=\"background-image:url("+s_oSpriteLibrary.getSpritePath("selection")+ ')"></div></div>',
        g.push(new CTile(m, {
            x: h, y: s
        }
        , a[m], e[m], f[m], d[m], b[m], 1)),
        3===m%4?(h=0, s+=41):h+=30;
        p+="</div>";
        $("#help_container").append(p);
        for(a=0;
        a<g.length;
        a++)g[a].init( {
            x: 0, y: 0
        }
        )
    }
    ;
    this.onTileSelected=function(a) {
        null===h?h=g[a]: (b=g[a], this._checkTileMatching())
    }
    ;
    this.onTileDeselected=function() {
        h=null
    }
    ;
    this.onTileRemoved=function(a) {
        if(a)for(var b=0;
        b<a.length;
        b++) {
            var e=a[b];
            g[e.index].decreaseBlockCounter(e.decrease)
        }
    }
    ;
    this._checkTileMatching=function() {
        h.getValue()===b.getValue()?(h.remove(), b.remove()): (h.deselect(), b.deselect());
        b=h=null
    }
    ;
    this._onExit=function() {
        this.unload();
        s_oApp.gotoMenu()
    }
    ;
    this._init();
    s_oHelp=this
}

var s_oHelp=null;
function CGameOverPanel(g) {
    var h;
    this.init=function(b) {
        h=b;
        var a;
        a="<div id='game_over_title' class='text_class'></div> <div id='game_over_final_score' class='text_class'></div> ";
        a+="<div id='game_over_but_exit' class='button_class panel_button'>"+TEXT_EXIT+"</div> ";
        a+="<div id='game_over_but_restart' class='button_class panel_button'>"+TEXT_RESTART+"</div> ";
        a+="<div id='game_over_but_shuffle' class='button_class panel_button'>"+TEXT_SHUFFLE+"</div> ";
        $("#"+b).html(a);
        !1===s_bMobile&&($("#game_over_but_shuffle").on("mouseover", function(a) {
            $(this).css("color", "#FFCC00")
        }
        ), $("#game_over_but_shuffle").on("mouseout", function(a) {
            $(this).css("color", "#b7e0e5")
        }
        ), $("#game_over_but_exit").on("mouseover", function(a) {
            $(this).css("color", "#FFCC00")
        }
        ), $("#game_over_but_exit").on("mouseout", function(a) {
            $(this).css("color", "#b7e0e5")
        }
        ), $("#game_over_but_restart").on("mouseover", function(a) {
            $(this).css("color", "#FFCC00")
        }
        ), $("#game_over_but_restart").on("mouseout", function(a) {
            $(this).css("color", "#b7e0e5")
        }
        ));
        $("#game_over_but_shuffle").on("mouseup", this, function(a) {
            a.data._onShuffle()
        }
        );
        $("#game_over_but_exit").on("mouseup", this, function(a) {
            a.data._onExit()
        }
        );
        $("#game_over_but_restart").on("mouseup", this, function(a) {
            a.data._onRestart()
        }
        )
    }
    ;
    this.unload=function() {
        $("#game_over_but_shuffle").off("mouseup", this, function(b) {
            b.data._onShuffle()
        }
        );
        $("#game_over_but_exit").off("mouseup", this, function(b) {
            b.data._onExit()
        }
        );
        $("#game_over_but_restart").off("mouseup", this, function(b) {
            b.data._onRestart()
        }
        );
        !1===s_bMobile&&($("#game_over_but_shuffle").off("mouseover", function(b) {
            $(this).css("color", "#FFCC00")
        }
        ), $("#game_over_but_shuffle").off("mouseout", function(b) {
            $(this).css("color", "#b7e0e5")
        }
        ), $("#game_over_but_exit").off("mouseover", function(b) {
            $(this).css("color", "#FFCC00")
        }
        ), $("#game_over_but_exit").off("mouseout", function(b) {
            $(this).css("color", "#b7e0e5")
        }
        ), $("#game_over_but_restart").off("mouseover", function(b) {
            $(this).css("color", "#FFCC00")
        }
        ), $("#game_over_but_restart").off("mouseout", function(b) {
            $(this).css("color", "#b7e0e5")
        }
        ))
    }
    ;
    this.show=function(b) {
        $("#game_over_title").text(TEXT_NO_MORE_TILES);
        $("#game_over_final_score").text(TEXT_FINAL_SCORE+"\n"+b);
        $("#"+h).css("display", "block");
        $("#"+h).animate( {
            top: "+=400px"
        }
        , 500, "easein")
    }
    ;
    this.refreshLanguage=function() {
        $("#game_over_but_exit").text(TEXT_EXIT);
        $("#game_over_but_shuffle").text(TEXT_SHUFFLE);
        $("#game_over_but_restart").text(TEXT_RESTART)
    }
    ;
    this._onShuffle=function() {
        $("#"+h).css("display", "none");
        $("#"+h).css("top", "-=400");
        s_oGame.onShuffleBoard()
    }
    ;
    this._onRestart=function() {
        $("#"+h).css("display", "none");
        $("#"+h).css("top", "-=400");
        s_oGame.onRestartBoard()
    }
    ;
    this._onExit=function() {
        $("#"+h).css("display", "none");
        $("#"+h).css("top", "-=400");
        s_oApp.gotoMenu()
    }
    ;
    this.init(g);
    return this
}

function CGame() {
    var g=!1,
    h,
    b,
    a,
    c,
    e,
    f,
    d=[],
    n=[],
    s,
    p,
    m,
    k,
    r,
    l,
    q=new CLayoutSettings;
    this.init=function() {
        this._setLayout();
        do this._initTilesOnBoard(),
        this._reset();
        while(0===d.length);
        l=new CInterface;
        l.setScore(a);
        l.setHintNum(d.length);
        f=setInterval(this._update, FPS_TIME);
        $("#match_game_container").css("display", "block")
    }
    ;
    this.unload=function() {
        l.unload();
        clearInterval(f);
        for(var a=0;
        a<n.length;
        a++)n[a].unload()
    }
    ;
    this._setLayout=function() {
        switch(s_szLayoutSelected) {
            case "classic": q.initLayoutClassic();
            break;
            case "monument": q.initLayoutMonument();
            break;
            case "pyramids": q.initLayoutPyramids();
            break;
            case "arena": q.initLayoutArena();
            break;
            case "four": q.initLayoutFour();
            break;
            case "the_wall": q.initLayoutTheWall()
        }
    }
    ;
    this._initTilesOnBoard=function() {
        var a="circle1 circle1 circle1 circle1 circle2 circle2 circle2 circle2 circle3 circle3 circle3 circle3 circle4 circle4 circle4 circle4 circle5 circle5 circle5 circle5 circle6 circle6 circle6 circle6 circle7 circle7 circle7 circle7 circle8 circle8 circle8 circle8 circle9 circle9 circle9 circle9 bamboo1 bamboo1 bamboo1 bamboo1 bamboo2 bamboo2 bamboo2 bamboo2 bamboo3 bamboo3 bamboo3 bamboo3 bamboo4 bamboo4 bamboo4 bamboo4 bamboo5 bamboo5 bamboo5 bamboo5 bamboo6 bamboo6 bamboo6 bamboo6 bamboo7 bamboo7 bamboo7 bamboo7 bamboo8 bamboo8 bamboo8 bamboo8 bamboo9 bamboo9 bamboo9 bamboo9 characters1 characters1 characters1 characters1 characters2 characters2 characters2 characters2 characters3 characters3 characters3 characters3 characters4 characters4 characters4 characters4 characters5 characters5 characters5 characters5 characters6 characters6 characters6 characters6 characters7 characters7 characters7 characters7 characters8 characters8 characters8 characters8 characters9 characters9 characters9 characters9 wind1 wind1 wind1 wind1 wind2 wind2 wind2 wind2 wind3 wind3 wind3 wind3 wind4 wind4 wind4 wind4 dragon1 dragon1 dragon1 dragon1 dragon2 dragon2 dragon2 dragon2 dragon3 dragon3 dragon3 dragon3 flower1 flower2 flower3 flower4 season1 season2 season3 season4".split(" "),
        a=shuffle(a),
        b=q.getTilePos(),
        c=q.getLeftBlocks(),
        d=q.getRightBlocks(),
        e=q.getUpBlocks(),
        f=q.getBlockList(),
        g=q.getHeight(),
        h=q.getPos(),
        k;
        k="<div id='tile_container'>";
        for(var l=0;
        l<b.length;
        l++) {
            var m=a[l];
            k+="<div id='tile_"+l+"' class='mahjong_tile'>";
            k+="<div id='selection_"+l+"' class='selection_tile' style=\"background-image:url("+s_oSpriteLibrary.getSpritePath("selection")+')"></div></div>';
            n.push(new CTile(l, b[l], m, c[l], d[l], e[l], f[l], g[l]))
        }
        k+="</div>";
        $("#match_game_container").html(k);
        for(l=0;
        l<n.length;
        l++)n[l].init(h)
    }
    ;
    this._reset=function() {
        h=a=0;
        b=2;
        c=BONUS_TIME;
        e=n.length;
        r=k=m=p=null;
        var d=Math.floor(6*Math.random());
        $("#match_game_container").css("background-image", "url("+s_oSpriteLibrary.getSpritePath("game_bg_"+d)+")");
        this._storeSelectableTiles();
        g=!0
    }
    ;
    this.refreshLanguage=function() {
        l.refreshLanguage();
        l.setScore(a);
        l.setHintNum(d.length)
    }
    ;
    this._calculateScore=function() {
        var b=q.getDifficulty(),
        d=Math.floor(c/100);
        0<d&&l.showBonusScore(d);
        a+=b*d;
        l.setScore(a);
        c=BONUS_TIME
    }
    ;
    this._gameOver=function() {
        l.gameOver(a)
    }
    ;
    this._win=function() {
        l.win(a)
    }
    ;
    this._storeSelectableTiles=function() {
        s=[];
        for(var a=0;
        a<n.length;
        a++)n[a].isSelectable()&&s.push(n[a]);
        d=[];
        for(a=0;
        a<s.length;
        ) {
            for(var b=s[a], c=a+1;
            c<s.length;
            c++)b.getValue()===s[c].getValue()&&d.push( {
                first: b, second: s[c]
            }
            );
            a++
        }
        l&&l.setHintNum(d.length)
    }
    ;
    this.removeHint=function() {
        null!==k&&null!==r&&(l.showBlock(), this._checkForSimilarBlock(k), k.disable(), this._checkForSimilarBlock(r), r.disable(), r=k=null, h=0)
    }
    ;
    this._checkForSimilarBlock=function(a) {
        for(var b=a.getBlockList(), c=0;
        c<b.length;
        c++)n[b[c].index].removeBlock(a.getIndex())
    }
    ;
    this._checkTileMatching=function() {
        p.getValue()===m.getValue()?(l.showBlock(), this._checkForSimilarBlock(p), p.remove(), this._checkForSimilarBlock(m), m.remove(), this._calculateScore()): (p.deselect(), m.deselect());
        m=p=null
    }
    ;
    this.onTileRemoved=function(a) {
        if(a)for(var c=0;
        c<a.length;
        c++) {
            var f=a[c];
            n[f.index].decreaseBlockCounter(f.decrease)
        }
        e--;
        b--;
        0===b&&(this._storeSelectableTiles(), l.hideBlock(), 0===e?this._win():0===d.length&&this._gameOver(), b=2)
    }
    ;
    this.onRestartBoard=function() {
        for(var a=q.getLeftBlocks(), b=q.getRightBlocks(), c=q.getUpBlocks(), d=q.getBlockList(), e=0;
        e<n.length;
        e++)n[e].activate(d[e], a[e], b[e], c[e], "");
        this._reset();
        l.hideBlock()
    }
    ;
    this.onHintReleased=function() {
        0!==d.length&&(k&&k.deselect(), r&&r.deselect(), k=d[h].first, r=d[h].second, k.showHint(), r.showHint(), h++, h===d.length&&(h=0), c=0, a-=HINT_PENALTY, 0>a&&(a=0), l.setScore(a))
    }
    ;
    this.onShuffleBoard=function() {
        $("#match_game_container").css("display", "none");
        do {
            for(var a="circle1 circle1 circle1 circle1 circle2 circle2 circle2 circle2 circle3 circle3 circle3 circle3 circle4 circle4 circle4 circle4 circle5 circle5 circle5 circle5 circle6 circle6 circle6 circle6 circle7 circle7 circle7 circle7 circle8 circle8 circle8 circle8 circle9 circle9 circle9 circle9 bamboo1 bamboo1 bamboo1 bamboo1 bamboo2 bamboo2 bamboo2 bamboo2 bamboo3 bamboo3 bamboo3 bamboo3 bamboo4 bamboo4 bamboo4 bamboo4 bamboo5 bamboo5 bamboo5 bamboo5 bamboo6 bamboo6 bamboo6 bamboo6 bamboo7 bamboo7 bamboo7 bamboo7 bamboo8 bamboo8 bamboo8 bamboo8 bamboo9 bamboo9 bamboo9 bamboo9 characters1 characters1 characters1 characters1 characters2 characters2 characters2 characters2 characters3 characters3 characters3 characters3 characters4 characters4 characters4 characters4 characters5 characters5 characters5 characters5 characters6 characters6 characters6 characters6 characters7 characters7 characters7 characters7 characters8 characters8 characters8 characters8 characters9 characters9 characters9 characters9 wind1 wind1 wind1 wind1 wind2 wind2 wind2 wind2 wind3 wind3 wind3 wind3 wind4 wind4 wind4 wind4 dragon1 dragon1 dragon1 dragon1 dragon2 dragon2 dragon2 dragon2 dragon3 dragon3 dragon3 dragon3 flower1 flower2 flower3 flower4 season1 season2 season3 season4".split(" "), b=q.getLeftBlocks(), c=q.getRightBlocks(), e=q.getUpBlocks(), f=q.getBlockList(), g=0;
            g<n.length;
            g++) {
                var h=Math.floor(Math.random()*a.length);
                n[g].activate(f[g], b[g], c[g], e[g], a[h]);
                a.splice(h, 1)
            }
            this._reset()
        }
        while(0===d.length);
        l.hideBlock();
        $("#match_game_container").css("display", "block")
    }
    ;
    this.onTileSelected=function(a) {
        l.hideBlock();
        k&&(k.deselect(), k=null);
        r&&(r.deselect(), r=null);
        null===p?p=n[a]: (m=n[a], this._checkTileMatching())
    }
    ;
    this.onTileDeselected=function() {
        p=null
    }
    ;
    this._update=function() {
        !1!==g&&(c-=FPS_TIME, 0>c&&(c=0), l.refreshTime(c))
    }
    ;
    s_oGame=this;
    this.init()
}

var s_oGame=null;
function CApp() {
    var g,
    h=0,
    b="",
    a,
    c;
    this.init=function() {
        s_bMobile=jQuery.browser.mobile;
        c=new CLang(LANGUAGE);
        _oMsgBox=new CMsgBox;
        $("#main_game_container").append("<div id='preloader_text'>0%</div>");
        s_oSpriteLibrary=new CSpriteLibrary;
        this._loadImages()
    }
    ;
    this._loadImages=function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("arrow_left", "/games/sweety/css/skins/"+s_szFolder+"/arrow_left.png");
        s_oSpriteLibrary.addSprite("arrow_right", "/games/sweety/css/skins/"+s_szFolder+ "/arrow_right.png");
        s_oSpriteLibrary.addSprite("bamboo1", "/games/sweety/css/skins/"+s_szFolder+"/bamboo1.png");
        s_oSpriteLibrary.addSprite("bamboo2", "/games/sweety/css/skins/"+s_szFolder+"/bamboo2.png");
        s_oSpriteLibrary.addSprite("bamboo3", "/games/sweety/css/skins/"+s_szFolder+"/bamboo3.png");
        s_oSpriteLibrary.addSprite("bamboo4", "/games/sweety/css/skins/"+s_szFolder+"/bamboo4.png");
        s_oSpriteLibrary.addSprite("bamboo5", "/games/sweety/css/skins/"+s_szFolder+"/bamboo5.png");
        s_oSpriteLibrary.addSprite("bamboo6", "/games/sweety/css/skins/"+s_szFolder+"/bamboo6.png");
        s_oSpriteLibrary.addSprite("bamboo7", "/games/sweety/css/skins/"+s_szFolder+"/bamboo7.png");
        s_oSpriteLibrary.addSprite("bamboo8", "/games/sweety/css/skins/"+s_szFolder+"/bamboo8.png");
        s_oSpriteLibrary.addSprite("bamboo9", "/games/sweety/css/skins/"+s_szFolder+"/bamboo9.png");
        s_oSpriteLibrary.addSprite("characters1", "/games/sweety/css/skins/"+s_szFolder+"/characters1.png");
        s_oSpriteLibrary.addSprite("characters2", "/games/sweety/css/skins/"+s_szFolder+"/characters2.png");
        s_oSpriteLibrary.addSprite("characters3", "/games/sweety/css/skins/"+s_szFolder+"/characters3.png");
        s_oSpriteLibrary.addSprite("characters4", "/games/sweety/css/skins/"+s_szFolder+"/characters4.png");
        s_oSpriteLibrary.addSprite("characters5", "/games/sweety/css/skins/"+s_szFolder+"/characters5.png");
        s_oSpriteLibrary.addSprite("characters6", "/games/sweety/css/skins/"+s_szFolder+"/characters6.png");
        s_oSpriteLibrary.addSprite("characters7", "/games/sweety/css/skins/"+s_szFolder+"/characters7.png");
        s_oSpriteLibrary.addSprite("characters8", "/games/sweety/css/skins/"+s_szFolder+"/characters8.png");
        s_oSpriteLibrary.addSprite("characters9", "/games/sweety/css/skins/"+s_szFolder+"/characters9.png");
        s_oSpriteLibrary.addSprite("circle1", "/games/sweety/css/skins/"+s_szFolder+"/circle1.png");
        s_oSpriteLibrary.addSprite("circle2", "/games/sweety/css/skins/"+s_szFolder+"/circle2.png");
        s_oSpriteLibrary.addSprite("circle3", "/games/sweety/css/skins/"+s_szFolder+"/circle3.png");
        s_oSpriteLibrary.addSprite("circle4", "/games/sweety/css/skins/"+s_szFolder+"/circle4.png");
        s_oSpriteLibrary.addSprite("circle5", "/games/sweety/css/skins/"+s_szFolder+"/circle5.png");
        s_oSpriteLibrary.addSprite("circle6", "/games/sweety/css/skins/"+s_szFolder+"/circle6.png");
        s_oSpriteLibrary.addSprite("circle7", "/games/sweety/css/skins/"+s_szFolder+"/circle7.png");
        s_oSpriteLibrary.addSprite("circle8", "/games/sweety/css/skins/"+s_szFolder+"/circle8.png");
        s_oSpriteLibrary.addSprite("circle9", "/games/sweety/css/skins/"+s_szFolder+"/circle9.png");
        s_oSpriteLibrary.addSprite("dragon1", "/games/sweety/css/skins/"+s_szFolder+"/dragon1.png");
        s_oSpriteLibrary.addSprite("dragon2", "/games/sweety/css/skins/"+s_szFolder+"/dragon2.png");
        s_oSpriteLibrary.addSprite("dragon3", "/games/sweety/css/skins/"+s_szFolder+"/dragon3.png");
        s_oSpriteLibrary.addSprite("flower1", "/games/sweety/css/skins/"+s_szFolder+"/flower1.png");
        s_oSpriteLibrary.addSprite("flower2", "/games/sweety/css/skins/"+s_szFolder+"/flower2.png");
        s_oSpriteLibrary.addSprite("flower3", "/games/sweety/css/skins/"+s_szFolder+"/flower3.png");
        s_oSpriteLibrary.addSprite("flower4", "/games/sweety/css/skins/"+s_szFolder+"/flower4.png");
        s_oSpriteLibrary.addSprite("season1", "/games/sweety/css/skins/"+s_szFolder+"/season1.png");
        s_oSpriteLibrary.addSprite("season2", "/games/sweety/css/skins/"+s_szFolder+"/season2.png");
        s_oSpriteLibrary.addSprite("season3", "/games/sweety/css/skins/"+s_szFolder+"/season3.png");
        s_oSpriteLibrary.addSprite("season4", "/games/sweety/css/skins/"+s_szFolder+"/season4.png");
        s_oSpriteLibrary.addSprite("wind1", "/games/sweety/css/skins/"+s_szFolder+"/wind1.png");
        s_oSpriteLibrary.addSprite("wind2", "/games/sweety/css/skins/"+s_szFolder+"/wind2.png");
        s_oSpriteLibrary.addSprite("wind3", "/games/sweety/css/skins/"+s_szFolder+"/wind3.png");
        s_oSpriteLibrary.addSprite("wind4", "/games/sweety/css/skins/"+s_szFolder+"/wind4.png");
        s_oSpriteLibrary.addSprite("selection", "/games/sweety/css/skins/"+s_szFolder+"/selection.png");
        s_oSpriteLibrary.addSprite("credits_text", "/games/sweety/css/skins/"+s_szFolder+"/credits_text.png");
        s_oSpriteLibrary.addSprite("exit_but", "/games/sweety/css/skins/"+s_szFolder+"/exit_but.png");
        s_oSpriteLibrary.addSprite("game_bg_0", "/games/sweety/css/skins/"+s_szFolder+"/game_bg_0.jpg");
        s_oSpriteLibrary.addSprite("game_bg_1", "/games/sweety/css/skins/"+s_szFolder+"/game_bg_1.jpg");
        s_oSpriteLibrary.addSprite("game_bg_2", "/games/sweety/css/skins/"+s_szFolder+"/game_bg_2.jpg");
        s_oSpriteLibrary.addSprite("game_bg_3", "/games/sweety/css/skins/"+s_szFolder+"/game_bg_3.jpg");
        s_oSpriteLibrary.addSprite("game_bg_4", "/games/sweety/css/skins/"+s_szFolder+"/game_bg_4.jpg");
        s_oSpriteLibrary.addSprite("game_bg_5", "/games/sweety/css/skins/"+ s_szFolder+"/game_bg_5.jpg");
        s_oSpriteLibrary.addSprite("help_bg", "/games/sweety/css/skins/"+s_szFolder+"/help_bg.jpg");
        s_oSpriteLibrary.addSprite("layout_bg", "/games/sweety/css/skins/"+s_szFolder+"/layout_bg.png");
        s_oSpriteLibrary.addSprite("locker", "/games/sweety/css/skins/"+s_szFolder+"/locker.png");
        s_oSpriteLibrary.addSprite("menu_bg", "/games/sweety/css/skins/"+s_szFolder+"/menu_bg.jpg");
        s_oSpriteLibrary.addSprite("msg_box_bg", "/games/sweety/css/skins/"+s_szFolder+"/msg_box_bg.png");
        s_oSpriteLibrary.addSprite("panel_bg", "/games/sweety/css/skins/"+s_szFolder+"/panel_bg.png");
        g=s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites()
    }
    ;
    this._onImagesLoaded=function() {
        h++;
        var a=Math.floor(h/g*100);
        $("#preloader_text").text(a+"%");
        h===g&&($("#preloader_text").remove(), this.gotoMenu(), $("#msg_box").css("background-image", "url("+s_oSpriteLibrary.getSpritePath("msg_box_bg")+")"))
    }
    ;
    this._onAllImagesLoaded=function() {}
    ;
    this.refreshLanguage=function(b) {
        switch(b) {
            case "de_DE": c.initLangDE();
            break;
            case "es_ES": case "es_LA": c.initLangES();
            break;
            case "fr_CA": case "fr_FR": c.initLangFR();
            break;
            case "it_IT": c.initLangITA();
            break;
            case "nl_NL": c.initLangNL();
            break;
            case "pt_BR": case "pt_PT": c.initLangPOR();
            break;
            default: c.initLangENG()
        }
        a.refreshLanguage()
    }
    ;
    this.onClickMessageBox=function(a) {
        switch(a) {
            case ON_MSGBOX_EXIT_FROM_GAME: _oMsgBox.hide();
            this.gotoMenu();
            $(s_oApp).trigger("restart");
            break;
            case ON_MSGBOX_NOT_EXIT_FROM_GAME: _oMsgBox.hide()
        }
    }
    ;
    this.gotoMenu=function() {
        ""!==b&&(a.unload(), $("#"+b).html(""), $("#"+b).css("display", "none"));
        a=new CMenu;
        b="menu_container"
    }
    ;
    this.gotoMenuLayout=function() {
        ""!==b&&($("#"+b).html(""), $("#"+b).css("display", "none"));
        a=new CMenuLayout;
        b="menu_layout";
        $(s_oApp).trigger("game_start")
    }
    ;
    this.gotoHelp=function() {
        ""!==b&&($("#"+b).html(""), $("#"+b).css("display", "none"));
        a=new CHelp;
        b="help_container"
    }
    ;
    this.gotoCredits=function() {
        ""!==b&&($("#"+b).html(""), $("#"+b).css("display", "none"));
        a=new CCredits;
        b="credits_container"
    }
    ;
    this.gotoGame=function() {
        ""!==b&&($("#"+b).html(""), $("#"+b).css("display", "none"));
        a=new CGame;
        b="match_game_container"
    }
    ;
    this.init();
    s_oApp=this
}

var s_bMobile,
s_oApp,
s_szFolder="sweety",
_oMsgBox,
s_oSpriteLibrary;