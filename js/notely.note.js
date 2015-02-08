/*
 * notely.note.js
 * Note module is responsible for allowing the user to edit a note
*/
/*jslint browser : true, continue : true,
 devel : true, indent : 2, maxerr : 50,
 newcap : true, nomen : true, plusplus : true,
 regexp : true, sloppy : true, vars : false,
 white : true
*/
/*global $, notely */

notely.note = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
            main_html :
                '<div class="notely-note-container">'
                + '<div id="toolbar">'
                    + '<div data-wysihtml5-command="bold" class="btn fa fa-bold fa-fw"></div>'
                    + '<div data-wysihtml5-command="insertUnorderedList" class="btn fa fa-list-ul fa-fw"></div>'
                + '</div>'
                + '<div id="editor" data-placeholder="Add a note."></div>'
                +'</div>',
            settable_map : {},
        },
        stateMap = { 
            $container : null,
            editor : null
        },
        jqueryMap = {},
        setJqueryMap, configModule, initModule, displayNote;
    //----------------- END MODULE SCOPE VARIABLES ---------------
    //------------------- BEGIN UTILITY METHODS ------------------
    //-------------------- END UTILITY METHODS -------------------
    //--------------------- BEGIN DOM METHODS --------------------
    // Begin DOM method /setJqueryMap/
    setJqueryMap = function () {
        var $container = stateMap.$container;

        jqueryMap = { 
            $container : $container,
            $noteContentContainer : $container.find('#editor'),
            $toolbar : $container.find('#toolbar'),
        };
    };
    
    /*
     * displayNote
     * purpose: fill the note container with the note contents
     */
    displayNote = function (noteData) {
        jqueryMap.$noteContentContainer.text(noteData);
    };

    // End DOM method /setJqueryMap/
    //---------------------- END DOM METHODS ---------------------

    //------------------- BEGIN EVENT HANDLERS -------------------

    //-------------------- END EVENT HANDLERS --------------------

    //------------------- BEGIN PUBLIC METHODS -------------------
    // Begin public method /configModule/
    // Purpose : Adjust configuration of allowed keys
    // Arguments : A map of settable keys and values
    // Settings :
    //  configMap.settable_map declares allowed keys
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
    //  $container the jquery element used by this feature
    // Returns : true
    // Throws : nonaccidental
    //
    initModule = function ( $container ) {
        var editor;
        stateMap.$container = $container;
        $container.html(configMap.main_html);
        setJqueryMap();

        //initialize the editor
        editor = new wysihtml5.Editor('editor', {
            toolbar: 'toolbar',
            parserRules: wysihtml5ParserRules
        });

        return true;
        };

    // End public method /initModule/
    // return public methods
    return {
        configModule : configModule,
        initModule : initModule,
        displayNote : displayNote
    };
    //------------------- END PUBLIC METHODS ---------------------

}());
