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
                + '<div class="notely-shell-main-sidebar"></div>'
                + '<div class="notely-shell-main-body">'
                    + '<div class="notely-shell-main-body-search"></div>'
                    + '<div class="notely-shell-main-body-note-list"></div>'
                    + '<div class="notely-shell-main-body-note-content"></div>'
                + '</div>'
              + '</div>',
        },
        stateMap = {//dynamic info goes in stateMap
        },
        jqueryMap = {
        },

        //module scope vars
        setJqueryMap, initModule;

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
                $shellSidebar: $container.find('.notely-shell-main-sidebar')
            };
        };
        //end DOM methods
        
        //begin event handlers
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
            //create an event listener to respond to selecting a notebook
            //not sure if this is where event registration should go...
        };
        //end public methods

        return {initModule: initModule};
}());
