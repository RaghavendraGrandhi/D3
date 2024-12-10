var dashboard,datasource;
	var data = [];
	var fields = [];
	var rooted = [];
$(document).ready(function () {
	
    // When initializing an extension, an optional object is passed that maps a
	// special ID (which
    // must be 'configure') to a function. This, in conjuction with adding the
	// correct context menu
    // item to the manifest, will add a new "Configure..." context menu item to
	// the zone of extension
    // inside a dashboard. When that context menu item is clicked by the user,
	// the function passed
    // here will be executed.
	
    tableau.extensions.initializeAsync({'configure': configure}).then(function() { 
    	
    	tableau.extensions.settings.set("depth", level);
          tableau.extensions.settings.saveAsync().then(function(){
        	  dashboard = tableau.extensions.dashboardContent.dashboard;
    	  dashboard.worksheets.forEach(function (worksheet) {
    		  
    	   	   worksheet.getDataSourcesAsync().then(datasources=>{
    	   		datasource = datasources;
    	   		console.log(datasources)
    	   		  datasources.forEach(function (dataT) {
    	   			  var i=0;
    	   			  dataT.fields.forEach(function(column){
    	   				  if(i++ <8)
    	   				  fields.push(column.name)
    	   			  })
    	   			dataT.getUnderlyingDataAsync().then(function(t){
    	   				t._data.forEach(function(row){
    	   					var row_array =[];
    	   					row.forEach(function(value){
    	   						row_array.push(value.value);
    	   					})
    	   					data.push(row_array);
    	   				})
    	   				//console.log(t)
    	   			})
    	   			  
    	   			 
    	   		  })
    	   		  
    	   		  
    	   	  }) 
    	     });
    	  setTimeout(function() {
    		  console.log(data)
    		  for(var j=0; j < data.length ; j++){
        		  
        		  var r = [];
        		  for(var k=0; k < fields.length ; k++){
        			  r[fields[k]] = data[j][k];
        		  };
        		  rooted.push(r);
        	  };
        	  console.log(rooted);
    		}, 5000);

    	  
    	  console.log(rooted);

    	//configure();
    	
    	
      // This event allows for the parent extension and popup extension to
		// keep their
      // settings in sync. This event will be triggered any time a setting is
      // changed for this extension, in the parent or popup (i.e. when
		// settings.saveAsync is called).
          });
    	var selctedData = daraArray;
    	var levelSelected = tableau.extensions.settings.get("level")
    	console.log(levelSelected)
    	switch (levelSelected) {
		case 1:
			 selctedData.children = []
			 down(selctedData, 0);
			break;
		case 2:
			var a = selctedData.children;
			for(var i =0 ;i<a.length ;i++){
				a[i].children= [];
			}
			down(selctedData,0)
			break;
		case 3:
			var a = selctedData.children;
			for(var i =0 ;i<a.length ;i++){
				var b =a[i].children;
				for(var i =0 ;i<b.length ;i++){
					b[i].children= [];
				}
			}
			down(selctedData,0)
			break;
		case 4:
			var a = selctedData.children;
			for(var i =0 ;i<a.length ;i++){
				var b =a[i].children;
				for(var i =0 ;i<b.length ;i++){
					var c = b[i].children;
					for(var i =0 ;i<c.length ;i++){
						c[i].children= [];
					}
				}
			}
			down(selctedData,0)
			break;

		default:
			break;
		}
      tableau.extensions.settings.addEventListener(tableau.TableauEventType.SettingsChanged, (settingsEvent) => {
        updateExtensionBasedOnSettings(settingsEvent.newSettings)
      });
    });
    
});

function configure() {
	
    // This uses the window.location.origin property to retrieve the scheme,
	// hostname, and
    // port where the parent extension is currently running, so this string
	// doesn't have
    // to be updated if the extension is deployed to a new location.
    const popupUrl = `https://peoples.io/trinetlive/trex/bar-hierarchy/configure`;
    //const popupUrl = `http://localhost:9999/trinet/configure`;

    /**
	 * This is the API call that actually displays the popup extension to the
	 * user. The popup is always a modal dialog. The only required parameter is
	 * the URL of the popup, which must be the same domain, port, and scheme as
	 * the parent extension.
	 * 
	 * The developer can optionally control the initial size of the extension by
	 * passing in an object with height and width properties. The developer can
	 * also pass a string as the 'initial' payload to the popup extension. This
	 * payload is made available immediately to the popup extension. In this
	 * example, the value '5' is passed, which will serve as the default
	 * interval of refresh.
	 */
    tableau.extensions.ui.displayDialogAsync(popupUrl, 0, { height: 500, width: 500 }).then((closePayload) => {
    	//loadChart(tableau.extensions.settings.get("level"))
         }).catch((error) => {
      // One expected error condition is when the popup is closed by the user
		// (meaning the user
      // clicks the 'X' in the top right of the dialog). This can be checked
		// for like so:
      switch(error.errorCode) {
        case tableau.ErrorCodes.DialogClosedByUser:
          console.log("Dialog was closed by user");
          break;
        default:
          console.error(error.message);
      }
    });
  }
