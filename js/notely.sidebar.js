/*
 * notely.sidebar.js
 * responsible for the sidebar which displays the list of notebooks
 * and which can add or delete notebooks
 */
/*globals $, notely*/

notely.sidebar = (function() {
    var
        configMap = {
            main_html:
                '<div class="notely-sidebar">'
                + '<div class="notely-sidebar-controls"></div>'
                + '<div class="notely-sidebar-nav"></div>'
                + '</div>',
            settable_map: {
                note_model: true,
                notebook_model: true
            },
        },
        stateMap = {
            $appendTarget: null
        },
        jqueryMap = {},
        notebooks = {},
        setJqueryMap, getNotebookList, onNotebookSelect, displayNotebookList, 
        initModule;

    //begin util methods

    /* getNotebookList
     * Purpose: query db for list of all notebooks
     * Args:
     *  none
     * Action:
     *  Query the database for a list of notebooks. Create a map of
     *  the notebook name associated with a list of the notes inside
     *  of it.
     * Returns: a list of notebooks
     * Throws: none
     */
    getNotebookList = function() {
        return ['Recipes', 'Data Structures', 'Install notes'];
    };
    //end util methods
    
    //begin DOM methods
    setJqueryMap = function() {
        var 
            $appendTarget = stateMap.$appendTarget;

        jqueryMap = {
            $sidebarNav : $appendTarget.find('.notely-sidebar-nav'),
            $sidebarControls : $appendTarget.find('.notely-sidebar-controls')
            };
        };

    /*displayNotebookList
     * Purpose: Display the list of Notebooks that are available
     * Args:
     *  $appendTarget - a jquery container that will hold the list
     *  notebookList - a list of Notebooks to display
     * Action:
     *  take the list of notebooks and display them as well as
     *  initializing the event handlers.
     * Returns: true on success, false on failure
     * Throws: none
     */
    displayNotebookList = function($appendTarget, notebookList) {
        //Should probably check that notebookList is not empty
        var i, size, list_html;
        size = notebookList.length;
        list_html = '<ul class="fa-ul">';
        for(i = 0; i < size ; i++) {
            list_html += '<li id='+i+'><span class="fa-li fa fa-columns"></span>'+ notebookList[i] + '</li>';
        };
        list_html += "</ul>";
        $appendTarget.html(list_html);
    };

    //end DOM methods

    //begin event handlers
    /*onNotebookSelect
     * Purpose: Notify the shell when a notebook has been selected
     * Args:
     *  event - the triggering event
     * Action:
     *  Detect which notebook has been selected and send that notebook's
     *  id to the shell.
     * Returns: false (to prevent bubbling/propagation)
     * Throws: none
     */
    onNotebookSelect = function (e) {
       var selectedNotebookId = e.target.id;
       //send notebook id to shell 
       $(".notely-shell-sidebar").trigger("getNotes", selectedNotebookId);
       return false;
    };
    //end event handlers

    //begin public methods
    
    /*configModule
     * Purpose: configure the module prior to initialization
     * Args:
     *  input_map - map of configurations to set
     * Action:
     *  The internal configuration (configMap) is updated with the
     *  provided args.
     * Returns: true
     * Throws: js error object and strack trace on unacceptable or
     *  missing arguments
     */
    configModule = function(input_map) {
        notely.util.setConfigMap({
            input_map: input_map,
            settable_map: configMap.settable_map,
            config_map: configMap
        });
        return true;
    };

    /*initModule
     * Purpose: 
     * Args:
     *  - $appendTarget - a jQuery collection that should represent
     *      a single DOM container that will hold the sidebar
     * Action:
     *   Appends the sidebar to the provided container and fills it
     *   with HTML content. Then initialize elements, events and
     *   handlers to provide the user with a sidebar navigation
     *   interface.
     * Returns: true on success, false on failure
     * Throws: none
     */
    initModule = function($appendTarget) {
        var notebookList;
        $appendTarget.html(configMap.main_html);
        stateMap.$appendTarget = $appendTarget;
        
        setJqueryMap();

        notebookList = getNotebookList();
        displayNotebookList(jqueryMap.$sidebarNav, notebookList);

        //bind events
        jqueryMap.$sidebarNav.on('click', 'li',  onNotebookSelect);

        return true;
    };

    //end public methods
    
    //return public methods
    return {
        initModule: initModule,
        configModule: configModule
    };
    
}());
