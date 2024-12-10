var dashboard, level1, level = 0,consolidateData = [],url,map_name,home_url,config,worksheetName,worksheet;
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
	url = window.location.href ;
	url_array = url.split("/");
	map_name = url_array[5];
	home_url=url_array[0]+"/"+url_array[1]+"/"+url_array[2]+"/"+url_array[3]+"/"+url_array[4]+"/"+url_array[5]+"/";
    tableau.extensions.initializeAsync({'configure': configure}).then(function() { 
    	
    	dashboard = tableau.extensions.dashboardContent.dashboard;
    	configure();
    	
    	
      // This event allows for the parent extension and popup extension to
		// keep their
      // settings in sync. This event will be triggered any time a setting is
      // changed for this extension, in the parent or popup (i.e. when
		// settings.saveAsync is called).
    	
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
    const popupUrl = `https://peoples.io/trinet/trex/date-picker/configure`;
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
