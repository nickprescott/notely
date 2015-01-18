/*
 * notely.js
 * Root namespace module
 */

/*globals $, notely */

var notely = (function() {
    var initModule = function($container) {
        notely.shell.initModule($container);
    };

    return {initModule: initModule};
}()); //export initModule
