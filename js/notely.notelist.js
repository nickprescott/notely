/*
 * notely.notelist.js
 * responsible for the area of the application where the list of notes
 * in from a notebook are displayed and can be selected.
*/
/*jslint browser : true, continue : true,
 devel : true, indent : 2, maxerr : 50,
 newcap : true, nomen : true, plusplus : true,
 regexp : true, sloppy : true, vars : false,
 white : true
*/
/*global $, notely */

notely.notelist = (function () {
    //---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
            main_html:
                '<div class="notely-notelist">'
                + '<div class="notely-notelist-table"></div>'
                + '</div>',
            settable_map : {},
        },
        stateMap = { $container : null },
        jqueryMap = {},
        setJqueryMap, configModule, displayListOfNotes, initModule;

    //----------------- END MODULE SCOPE VARIABLES ---------------

    //------------------- BEGIN UTILITY METHODS ------------------
    //-------------------- END UTILITY METHODS -------------------

    //--------------------- BEGIN DOM METHODS --------------------
    // Begin DOM method /setJqueryMap/
    setJqueryMap = function () {
        var $container = stateMap.$container;

        jqueryMap = { 
            $container : $container,
            $notelist : $container.find('.notely-notelist')
        };
    };
    // End DOM method /setJqueryMap/
    
    displayListOfNotes = function(notelist) {
        var i, size, list_html;

        size = notelist.length;
        list_html = '<ul class="fa-ul">';

        if (size > 0) {
            for (i = 0; i < size; i++) {
                list_html += '<li id='+i+'><span class="fa-li fa fa-file-text-o"></span>'+ notelist[i] + '</li>';
            };
            $(jqueryMap.$notelist).html(list_html);
        }
        return true;
    };
    //---------------------- END DOM METHODS ---------------------

    //------------------- BEGIN EVENT HANDLERS -------------------
    onNoteSelect = function (e) {
        var selectedNoteId = e.target.id;
        $(jqueryMap.$container).trigger("getNote", selectedNoteId);
        return false;
    };
    //-------------------- END EVENT HANDLERS --------------------

    //------------------- BEGIN PUBLIC METHODS -------------------
    // Begin public method /configModule/
    // Purpose : Adjust configuration of allowed keys
    // Arguments : A map of settable keys and values
    // Settings :
    // * configMap.settable_map declares allowed keys
    // Returns : true
    // Throws : none
    //
    configModule = function ( input_map ) {
        notely.util.setConfigMap({
            input_map : input_map,
            settable_map : configMap.settable_map,
            config_map : configMap
            });
        return true;
        };

    // End public method /configModule/
    // Begin public method /initModule/
    // Purpose : Initializes module
    // Arguments :
    // * $container the jquery element used by this feature
    // Returns : true
    // Throws : nonaccidental
    //
    initModule = function ( $container ) {
        stateMap.$container = $container;
        $container.html(configMap.main_html);
        setJqueryMap();

        //bind events
        jqueryMap.$container.on('click', 'li', onNoteSelect);
        return true;
    };

    // End public method /initModule/
    // return public methods
    return {
        configModule : configModule,
        initModule : initModule,
        displayListOfNotes : displayListOfNotes
    };
    //------------------- END PUBLIC METHODS ---------------------

}());
