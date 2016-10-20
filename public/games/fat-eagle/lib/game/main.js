var _TIME_STRING;
getTimeString = function() {
    var _TIME,
        _DATE = new Date();
    var _HOURS = _DATE.getHours(); //(0-23)
    if (_HOURS < 12) {
        _TIME = 'morning/'
    } else if (_HOURS < 16) {
        _TIME = 'afternoon/'
    } else if (_HOURS < 19) {
        _TIME = 'evening/'
    } else {
        _TIME = 'night/'
    }
    _TIME_STRING = _TIME;
}
getTimeString();

ig.module(
    'game.main'
).requires(
    //'impact.debug.debug',
    'impact.game',
    'impact.font',
    'plugins.parallax',
    'plugins.impact-storage',
    'game.screens.game-over',
    'game.screens.screen-start'
).defines(function() {
    //main
    ig.main('#canvas', ScreenStart, 60, 480, 320, 1);

});