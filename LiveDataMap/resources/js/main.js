var gridOptions ;
function processData(list,properties){
	
	var arr = [];
	var columns = list[0];
	console.log(properties)
	$.each(list,function(i,d){
		if(i!=0){
			var obj ={};
			$.each(columns,function(n,r){
				obj[r] = d[n]
			})
			
			arr.push(obj)
		}
		
	})
	var columnDefs1 = [{
	    headerName: 'Group1',
	    children: [
	      
	       
	    ]
	}]
	$.each(columns,function(n,r){
		if(properties[n] != "NONE" && properties[n] == "GROUP-BY"){
			var obj ={
					headerName : r,
					field : r,
					rowGroup:true
			}
			columnDefs1[0].children.push(obj)
		}else if(properties[n] != "NONE" && properties[n] == "GRAND-TOTAL"){
			var obj ={
					headerName : r,
					field : r,
					aggFunc: 'sum'
			}
			columnDefs1[0].children.push(obj)
		}else{
			var obj ={
					headerName : r,
					field : r
			}
			columnDefs1[0].children.push(obj)
		}
		
	})
		console.log(columnDefs1)
		


 gridOptions = {
    defaultColDef: {
        sortable: true,
        filter: true
    },
    columnDefs: columnDefs1,
    rowSelection: 'multiple'
};

	
    var autoGroupColumnDef1 = {
       
        cellRenderer:'agGroupCellRenderer',
        cellRendererParams: {
            footerValueGetter: function(params) { return 'Total (' + params.value + ')'},
        }
        
       
    }
	
   

//setup the grid after the page has finished loading
  document.addEventListener('DOMContentLoaded', function() {
      var gridDiv = document.querySelector('#myGrid');
      new agGrid.Grid(gridDiv, gridOptions);

              gridOptions.api.setRowData(arr);
         
  });
	

}

function getBooleanValue(cssSelector) {
    return document.querySelector(cssSelector).checked === true;
}

function onBtExport() {
    var params = {
        skipHeader: getBooleanValue('#skipHeader'),
        columnGroups: getBooleanValue('#columnGroups'),
        skipFooters: getBooleanValue('#skipFooters'),
        skipGroups: getBooleanValue('#skipGroups'),
        skipPinnedTop: getBooleanValue('#skipPinnedTop'),
        skipPinnedBottom: getBooleanValue('#skipPinnedBottom'),
        allColumns: getBooleanValue('#allColumns'),
        onlySelected: getBooleanValue('#onlySelected'),
        fileName: document.querySelector('#fileName').value,
        sheetName: document.querySelector('#sheetName').value,
        exportMode: document.querySelector('input[name="mode"]:checked').value
    };

    if (getBooleanValue('#skipGroupR')) {
        params.shouldRowBeSkipped = function(params) {
            return params.node.data.country.charAt(0) === 'R';
        };
    }

    if (getBooleanValue('#useCellCallback')) {
        params.processCellCallback = function(params) {
            if (params.value && params.value.toUpperCase) {
                return params.value.toUpperCase();
            } else {
                return params.value;
            }
        };
    }

    if (getBooleanValue('#useSpecificColumns')) {
        params.columnKeys = ['country','bronze'];
    }

    if (getBooleanValue('#processHeaders')) {
        params.processHeaderCallback  = function(params) {
            return params.column.getColDef().headerName.toUpperCase();
        };
    }

    if (getBooleanValue('#appendHeader')) {
        params.customHeader  = [
            [],
            [{data:{type:'String', value:'Summary'}}],
            [
                {data:{type:'String', value:'Sales'}, mergeAcross:2},
                {data:{type:'Number', value:'3695.36'}}
            ],
            []
        ];
    }

    if (getBooleanValue('#appendFooter')) {
        params.customFooter  = [
            [],
            [{data:{type:'String', value:'Footer'}}],
            [
                {data:{type:'String', value:'Purchases'}, mergeAcross:2},
                {data:{type:'Number', value:'7896.35'}}
            ],
            []
        ];
    }

    gridOptions.api.exportDataAsExcel(params);
}


