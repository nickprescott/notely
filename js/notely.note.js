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
                + '<div class="notely-note-toolbar">'
                    + '<div id="boldBtn" commandName="bold" class="btn fa fa-bold fa-fw"></div>'
                    + '<div id="unorderedListBtn" commandName="insertunorderedlist" class="btn fa fa-list-ul fa-fw"></div>'
                    + '<div id="strikeThroughBtn" commandName="strikethrough" class="btn fa fa-strikethrough fa-fw"></div>'
                + '</div>'
                + '<iframe class="notely-note-content"></iframe>'
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
            $noteContentContainer : $container.find('.notely-note-content'),
            $toolbar : $container.find('.notely-note-toolbar'),
            $boldBtn : $container.find('#boldBtn'),
            $listBtn : $container.find('#unorderedListBtn'),
            $stikeThroughBtn : $container.find('#strikeThroughBtn')
        };
    };
    
    /*
     * displayNote
     * purpose: fill the note container with the note contents
     */
    displayNote = function (noteData) {
        jqueryMap.$noteContentContainer.contents().find('body').html(noteData);
    };

    // End DOM method /setJqueryMap/
    //---------------------- END DOM METHODS ---------------------

    //------------------- BEGIN EVENT HANDLERS -------------------
    
    /*
     * http://stackoverflow.com/questions/5281438/how-to-create-a-text-editor-in-jquery
     *
     */
    applyEffect = function(event) {
        var target = event.target;
        var command = $(target).attr('commandName');
        var contentWindow = stateMap.editor.contentWindow;

        $(this).toggleClass("selected");
        contentWindow.focus();
        contentWindow.document.execCommand(command, false, "");
        contentWindow.focus();
        return false;
    };
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
        stateMap.$container = $container;
        $container.html(configMap.main_html);
        setJqueryMap();

        //initialize the editor
        stateMap.editor = $(jqueryMap.$noteContentContainer).get(0);
        //opening and closing the editor is a workaround for an issue in Firefox
        stateMap.editor.contentWindow.document.open();
        stateMap.editor.contentWindow.document.close();
        stateMap.editor.contentWindow.document.designMode="on";

        //bind events
        $(jqueryMap.$boldBtn).on("click", applyEffect);
        $(jqueryMap.$listBtn).on("click", applyEffect);
        $(jqueryMap.$stikeThroughBtn).on("click", applyEffect);
            
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
