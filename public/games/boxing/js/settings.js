var CANVAS_WIDTH = 690;
var CANVAS_HEIGHT = 960;

var EDGEBOARD_X = 75;
var EDGEBOARD_Y = 75;

var FPS           = 30;
var DISABLE_SOUND_MOBILE = false;

var STATE_LOADING = 0;
var STATE_MENU    = 1;
var STATE_HELP    = 1;
var STATE_GAME    = 3;

var ON_MOUSE_DOWN  = 0;
var ON_MOUSE_UP    = 1;
var ON_MOUSE_OVER  = 2;
var ON_MOUSE_OUT   = 3;
var ON_DRAG_START  = 4;
var ON_DRAG_END    = 5;



var IDLE_DELAY = 1;


////Boxer Parameters///
var ENEMY_ATTACK_OCCURR;
var ENEMY_MIN_ACTION_TIME;
var ENEMY_MAX_ACTION_TIME;
var ENEMY_MIN_GUARD_TIME;
var ENEMY_MAX_GUARD_TIME;
var ENEMY_HP;
var PLAYER_HP;
var PLAYER_STAMINA;
var STAMINA_PUNCH_LIMIT;


var ENEMY_KO=30;
var PLAYER_KO=30;
var PLAYER_MIN_HP_KO=15;
var STAMINA_REGEN_TIME=120;
var KO_REGEN_TIME=2000;
var ENEMY_MIN_HP_KO=15;

var IDLE="idle";
var GUARD="guard";
var JAB="jab";
var HOOK_R="hook_r";
var HOOK_L="hook_l";
var UPPERCUT="uppercut";
var GETPUNCHED="get_punched";
var KO="ko";


var s_aBw_Frame=[];
s_aBw_Frame[IDLE]=9;
s_aBw_Frame[GUARD]=10;
s_aBw_Frame[JAB]=10;       
s_aBw_Frame[HOOK_R]=9;
s_aBw_Frame[HOOK_L]=9;
s_aBw_Frame[UPPERCUT]=10;
s_aBw_Frame[GETPUNCHED]=5;
s_aBw_Frame[KO]=13;

var s_aBb_En_Frame=[];
s_aBb_En_Frame[IDLE]=9;
s_aBb_En_Frame[GUARD]=10;
s_aBb_En_Frame[JAB]=10;       
s_aBb_En_Frame[HOOK_R]=9;
s_aBb_En_Frame[HOOK_L]=10;
s_aBb_En_Frame[UPPERCUT]=11;
s_aBb_En_Frame[GETPUNCHED]=5;
s_aBb_En_Frame[KO]=24;

var s_aBb_Frame=[];
s_aBb_Frame[IDLE]=9;
s_aBb_Frame[GUARD]=10;
s_aBb_Frame[JAB]=10;       
s_aBb_Frame[HOOK_R]=9;
s_aBb_Frame[HOOK_L]=9;
s_aBb_Frame[UPPERCUT]=10;
s_aBb_Frame[GETPUNCHED]=5;
s_aBb_Frame[KO]=13;

var s_aBw_En_Frame=[];
s_aBw_En_Frame[IDLE]=9;
s_aBw_En_Frame[GUARD]=10;
s_aBw_En_Frame[JAB]=10;       
s_aBw_En_Frame[HOOK_R]=9;
s_aBw_En_Frame[HOOK_L]=10;
s_aBw_En_Frame[UPPERCUT]=11;
s_aBw_En_Frame[GETPUNCHED]=5;
s_aBw_En_Frame[KO]=24;


var s_aSt_Decrese=[];
s_aSt_Decrese[JAB]=15;       
s_aSt_Decrese[HOOK_R]=17;
s_aSt_Decrese[HOOK_L]=20;
s_aSt_Decrese[UPPERCUT]=30;


var s_aFrameHit=[];
s_aFrameHit[JAB]=4;
s_aFrameHit[HOOK_R]=4;
s_aFrameHit[HOOK_L]=5;
s_aFrameHit[UPPERCUT]=6;

var s_aDamage=[];
s_aDamage[JAB]=4;
s_aDamage[HOOK_R]=5;
s_aDamage[HOOK_L]=6;
s_aDamage[UPPERCUT]=8;

var ANIMATION_OFFSET_ENEMY = new Array();
ANIMATION_OFFSET_ENEMY[IDLE]={xb:0,yb:0,xw:0,yw:0};
ANIMATION_OFFSET_ENEMY[GUARD]={xb:0,yb:0,xw:0,yw:0};
ANIMATION_OFFSET_ENEMY[JAB]={xb:5,yb:0,xw:0,yw:0};
ANIMATION_OFFSET_ENEMY[HOOK_R]={xb:-20,yb:0,xw:0,yw:0};
ANIMATION_OFFSET_ENEMY[HOOK_L]={xb:-20,yb:0,xw:0,yw:0};
ANIMATION_OFFSET_ENEMY[UPPERCUT]={xb:-30,yb:0,xw:0,yw:0};
ANIMATION_OFFSET_ENEMY[GETPUNCHED]={xb:+20,yb:0,xw:0,yw:0};

var PARTICLE_OFFSET_PLAYER = new Array();
PARTICLE_OFFSET_PLAYER[JAB]={xp:-50,yp:-70};
PARTICLE_OFFSET_PLAYER[HOOK_R]={xp:-5,yp:-70};
PARTICLE_OFFSET_PLAYER[HOOK_L]={xp:-35,yp:-70};
PARTICLE_OFFSET_PLAYER[UPPERCUT]={xp:-15,yp:-70};
