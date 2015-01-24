/*
 * notely.shell.js
 * shell module for notely. responsible for setting up the application
 * containers and coordinating browser level actions and responsibilities
 */

/*globals $, notely */

notely.shell = (function() {
    var
        configMap = {
            main_html:
                '<div class="notely-shell-head">'
                + '<div class="notely-shell-head-logo"></div>'
              + '</div>'
              + '<div class="notely-shell-main">'
                + '<div class="notely-shell-sidebar"></div>'
                + '<div class="notely-shell-body">'
                    + '<div class="notely-shell-search"></div>'
                    + '<div class="notely-shell-note-list"></div>'
                    + '<div class="notely-shell-note-content"></div>'
                + '</div>'
              + '</div>',
        },
        stateMap = {//dynamic info goes in stateMap
        },
        jqueryMap = {
        },

        //module scope vars
        setJqueryMap, getListOfNotes, initModule;

    //begin util methods

    //end util methods
    
    //begin DOM methods
    /*
     * Caches jquery collections for improved performance
     */
    setJqueryMap = function() {
        var $container = stateMap.$container;
        jqueryMap = {
            $container: $container,
            $shellSidebar: $container.find('.notely-shell-sidebar'),
            $notelist: $container.find('.notely-shell-note-list')
        };
    };
    //end DOM methods
    
    //begin event handlers
    getListOfNotes = function(event, notebookId) {
        var temp_map = {
                '0': ['Scotch eggs', 'vegetarian lasagna'],
                '1': ['Bloom filters', 'Black and red trees', 'hash maps'],
                '2': ['getting printers to work correctly']
            };

        //TODO:
        //using the id and/or name, lookup the notebook and get the list of associated notes
        //pass the list of notes back to the noteList to display
        notely.notelist.displayListOfNotes(jqueryMap.$notelist, temp_map[notebookId]);
        });

    };
    //end event handlers

    //begin callbacks
    //end callbacks

    //begin public methods

    /*purpose: initialize the shell and application containers
     * args:
     *  - $container - a jquery collection that should represent a single DOM container
     * action:
     *  Populates $container with the shell of the UI and then
     *  configures and initializes the feature modules. The shell is
     *  also responsible for browser-wide issues such as URI and
     *  cookie management.
     * returns: none
     * throws: none
     */
    initModule = function($container) {
        //load HTML and jQuery collections
        stateMap.$container = $container;
        $container.html(configMap.main_html);
        setJqueryMap();

        //configure and initialize feature modules
        notely.sidebar.initModule(jqueryMap.$shellSidebar);
        notely.notelist.initModule(jqueryMap.$notelist);

        //bind events
        $(jqueryMap.$shellSidebar).on("getNotes", getListOfNotes);
    //end public methods

    return {initModule: initModule};
}());
