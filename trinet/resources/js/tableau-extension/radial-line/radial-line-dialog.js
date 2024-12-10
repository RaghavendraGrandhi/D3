'use strict';

(function () {
	var columns,dashboard;
 
  const datasourcesSettingsKey = 'selectedDatasources';
  let selectedDatasources = [];

  $(document).ready(function () {
    
    tableau.extensions.initializeDialogAsync().then(function (openPayload) {
    	dashboard = tableau.extensions.dashboardContent.dashboard;
    	 $("#selectWorksheet").append("<option value=''>--CHOOSE WORKSHEET--</option>");
   	  	dashboard.worksheets.forEach(function (worksheet) {
   	    $("#selectWorksheet").append("<option value='" + worksheet.name + "'>" + worksheet.name + "</option>");
   	  	});
    	openPayload = "PAYLOAD";
    	
    	
    	$('#selectWorksheet').on('change', '', function (e) {
  	      columnsUpdate();
  	    });
    	
      $('#closeButton').click(function(){
    	  tableau.extensions.settings.set("worksheet",  $("#selectWorksheet").val());
    	  tableau.extensions.settings.set("level1", $("#level1").val());
    	  tableau.extensions.settings.set("level2", $("#level2").val());
    	 
          tableau.extensions.settings.saveAsync().then(function(){

              	 closeDialog()
            	 
              })
          })
          
    	 
    	  
    	  
  
     



       dashboard = tableau.extensions.dashboardContent.dashboard;
   
      dashboard.worksheets.forEach(function (worksheet) {
    	  worksheet.getSummaryDataAsync().then(function (sumdata) {

    		  console.log(sumdata)

    		 });       
    	 
      });
    });
  });

  
  function columnsUpdate() {
	    var worksheets = tableau.extensions.dashboardContent.dashboard.worksheets;
	    var worksheetName = $("#selectWorksheet").val();
	   

	    
	    var worksheet = worksheets.find(function (sheet) {
	      return sheet.name === worksheetName;
	    });

	    
	      worksheet.getSummaryDataAsync().then(function (sumdata) {
	        var worksheetColumns = sumdata.columns;
	        
	        worksheetColumns.forEach(function (f) {
	        	console.log(f)
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
	      });
	   
	  }


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
    

    tableau.extensions.settings.saveAsync().then((newSavedSettings) => {
      tableau.extensions.ui.closeDialog();
     
    });
  }
 
})();
