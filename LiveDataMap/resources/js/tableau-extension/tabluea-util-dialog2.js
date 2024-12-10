'use strict';
var columns,dashboard;

// Wrap everything in an anonymous function to avoid polluting the global namespace
(function () {
	
  /**
   * This extension collects the IDs of each datasource the user is interested in
   * and stores this information in settings when the popup is closed.
   */
  const datasourcesSettingsKey = 'selectedDatasources';
  let selectedDatasources = [];

  $(document).ready(function () {
    
    tableau.extensions.initializeDialogAsync().then(function (openPayload) {
     
    
    	openPayload = "PAYLOAD";
      $('#closeButton').click(function(){
    	  tableau.extensions.settings.set("level", $("#level").val());
          tableau.extensions.settings.saveAsync().then(function(){
        	  console.log(tableau.extensions.settings.get("level"))
        	 
          	
          	 closeDialog()
        	  })
          })

       dashboard = tableau.extensions.dashboardContent.dashboard;
      let visibleDatasources = [];
      selectedDatasources = parseSettingsForActiveDataSources();

      dashboard.worksheets.forEach(function (worksheet) {
        worksheet.getDataSourcesAsync().then(function (datasources) {
          datasources.forEach(function (datasource) {
        	  datasource.getUnderlyingDataAsync().then(function(datatable){
        		  let field = datatable.columns;
        		  field.forEach(function (f) {
        			  if(f.dataType == "string"){
            		  $('#level')
                      .append($("<option></option>")
                                 .attr("value",function(){
                                	 if(f.fieldName == "Name"){
                                		 return 0;
                                	 }else
                                	return f.fieldName.split(" ")[1];
                                 })
                                 .text(f.fieldName)); 
        			  }
            	  });
        		    console.log(datatable.columns)
        	  })
        	 // console.log(datasource.fields)
        	 
          });
        });
      });
    });
  });


  /**
   * Helper that parses the settings from the settings namesapce and 
   * returns a list of IDs of the datasources that were previously
   * selected by the user.
   */
  function parseSettingsForActiveDataSources() {
    let activeDatasourceIdList = [];
    let settings = tableau.extensions.settings.getAll();
    if (settings.selectedDatasources) {
      activeDatasourceIdList = JSON.parse(settings.selectedDatasources);
    }

    return activeDatasourceIdList;
  }

  /**
   * Helper that updates the internal storage of datasource IDs
   * any time a datasource checkbox item is toggled.
   */
  function updateDatasourceList(id) {
    let idIndex = selectedDatasources.indexOf(id);
    if (idIndex < 0) {
      selectedDatasources.push(id);
    } else {
      selectedDatasources.splice(idIndex, 1);
    }
  }

  /**
   * UI helper that adds a checkbox item to the UI for a datasource.
   */
  function addDataSourceItemToUI(datasource, isActive) {
    let containerDiv = $('<div />');

    $('<input />', {
      type: 'checkbox',
      id: datasource.id,
      value: datasource.name,
      checked: isActive,
      click: function() { updateDatasourceList(datasource.id) }
    }).appendTo(containerDiv);

    $('<label />', {
      'for': datasource.id,
      text: datasource.name,
    }).appendTo(containerDiv);

    $('#datasources').append(containerDiv);
  }

  /**
   * Stores the selected datasource IDs in the extension settings,
   * closes the dialog, and sends a payload back to the parent. 
   */
  function closeDialog() {
    let currentSettings = tableau.extensions.settings.getAll();
    tableau.extensions.settings.set(datasourcesSettingsKey, JSON.stringify(selectedDatasources));

    tableau.extensions.settings.saveAsync().then((newSavedSettings) => {
      tableau.extensions.ui.closeDialog($('#interval').val());
     
    });
  }
  function filterDate(){
	  dashboard.worksheets.forEach(function (worksheet) {
    		  
    	  worksheet.clearFilterAsync(tableau.extensions.settings.get("level"))
	          worksheet.applyFilterAsync(tableau.extensions.settings.get("level"), [new Date()],
	            tableau.FilterUpdateType.Replace);
    	  
    	 
 });
  }
})();
