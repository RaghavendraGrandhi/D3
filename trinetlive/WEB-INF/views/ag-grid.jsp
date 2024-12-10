<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/ag-grid-enterprise/dist/ag-grid-enterprise.min.noStyle.js"></script>
  <link rel="stylesheet" href="https://unpkg.com/ag-grid-community/dist/styles/ag-grid.css">
  <link rel="stylesheet" href="https://unpkg.com/ag-grid-community/dist/styles/ag-theme-balham.css">
</head>
<body>

  <!-- <button onclick="getSelectedRows()">Get Selected Rows</button> -->
  <div id="myGrid" style="height: 700px;width:100%;" class="ag-theme-balham"></div>

  <script type="text/javascript" charset="utf-8">
    // specify the columns
    var columnDefs = [
      {headerName: "ID", field: "ID" },
      {headerName: "Day", field: "Day"},
      {headerName: "Department", field: "Department"},
      {headerName: "Company CD", field: "Company CD"},
      {headerName: "Company Name", field: "Company Name"},
      {headerName: "Account Manager Name", field: "Account Manager Name"},
      {headerName: "Colleague Nam", field: "Colleague Nam"},
      {headerName: "Survey", field: "Survey"},
      {headerName: "Caller EMPLID", field: "Caller EMPLID"},
      {headerName: "Caller Phone Number", field: "Caller Phone Number"},
      {headerName: "Message", field: "Message"},
      {headerName: "Message Count", field: "Message Count"},
      {headerName: "Message", field: "Message"},
      {headerName: "Question 1", field: "Question 1"},
      {headerName: "Question 2", field: "Question 2"},
      {headerName: "Question 3", field: "Question 3"},
      {headerName: "Question 4", field: "Question 4"},
      {headerName: "Question 5", field: "Question 5"},
      {headerName: "Question 6", field: "Question 6"},
      {headerName: "Question 7", field: "Question 7"},
      {headerName: "Question 8", field: "Question 8"},
    ];

    var autoGroupColumnDef = {
        headerName: "Model", 
        field: "model", 
        cellRenderer:'agGroupCellRenderer',
        cellRendererParams: {
            checkbox: true
        }
    }

    // let the grid know which columns and what data to use
    var gridOptions = {
      columnDefs: columnDefs,
      enableSorting: true,
      enableFilter: true,
      autoGroupColumnDef: autoGroupColumnDef,
      groupSelectsChildren: true,
      rowSelection: 'multiple'
    };

  // lookup the container we want the Grid to use
  var eGridDiv = document.querySelector('#myGrid');

  // create the grid passing in the div to use together with the columns & data we want to use
  new agGrid.Grid(eGridDiv, gridOptions);
  
  fetch('resources/json/ag-grid.json').then(function(response) {
    return response.json();
  }).then(function(data) {
	 
   gridOptions.api.setRowData(data);
  })
  
  function getSelectedRows() {
    const selectedNodes = gridOptions.api.getSelectedNodes()  
    const selectedData = selectedNodes.map( function(node) { return node.data })
    const selectedDataStringPresentation = selectedData.map( function(node) { return node.make + ' ' + node.model }).join(', ')
    }
  </script>
</body>
</html>