'use strict';

// Wrap everything in an anonymous function to avoid polluting the global namespace
(function () {
	var columns,dashboard;
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
    	  tableau.extensions.settings.set("level1", $("#level1").val());
    	  tableau.extensions.settings.set("level2", $("#level2").val());
    	 
          tableau.extensions.settings.saveAsync().then(function(){

            	  
            	 
              	
              	 closeDialog()
            	 
              })
          })
          
    	 
    	  
    	  
  
     



       dashboard = tableau.extensions.dashboardContent.dashboard;
     
      dashboard.worksheets.forEach(function (worksheet) {
        worksheet.getDataSourcesAsync().then(function (datasources) {
          datasources.forEach(function (datasource) {
        	  datasource.getUnderlyingDataAsync().then(function(datatable){
        		  let field = datatable.columns;
        		  field.forEach(function (f) {
        			  if(!f.isGenerated && f.fieldName != "Number of Records"){
            		  $('#level1')
                      .append($("<option></option>")
                                 .attr("value",function(){
                                	 
                                	return f.fieldName;
                                 })
                                 .text(f.fieldName)); 
            		  $('#level2')
            		  .append($("<option></option>")
            				  .attr("value",function(){
            					  
            					  return f.fieldName;
            				  })
            				  .text(f.fieldName)); 
            		 
        			  }
            	  });
        		   
        	  })
        	
        	 
          });
        });
      });
    });
  });


  
  function parseSettingsForActiveDataSources() {
    let activeDatasourceIdList = [];
    let settings = tableau.extensions.settings.getAll();
    if (settings.selectedDatasources) {
      activeDatasourceIdList = JSON.parse(settings.selectedDatasources);
    }

    return activeDatasourceIdList;
  }

 
  function updateDatasourceList(id) {
    let idIndex = selectedDatasources.indexOf(id);
    if (idIndex < 0) {
      selectedDatasources.push(id);
    } else {
      selectedDatasources.splice(idIndex, 1);
    }
  }

  
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

  
  function closeDialog() {
   
    tableau.extensions.settings.saveAsync().then((newSavedSettings) => {
      tableau.extensions.ui.closeDialog();
     
    });
  }
  
})();
