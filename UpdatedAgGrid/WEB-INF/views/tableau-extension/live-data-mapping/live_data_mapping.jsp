<!DOCTYPE html>
<html>
<head>
 <link rel="stylesheet"
	href="../resources/css/bootstrap/css/bootstrap.min.css">
	  <script src="../resources/js/ag-grid/ag-grid-enterprise.min.noStyle.js"></script>
  <link rel="stylesheet" href="../resources/css/ag-grid/ag-grid.css">
  <link rel="stylesheet" href="../resources/css/ag-grid/ag-theme-balham.css">
  <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
  <script src="../resources/js/d3.v3.min.js"></script>
    <script src="../resources/js/treemap/tableau-extensions-1.latest.js"></script>
  
  
  <script type="text/javascript" src="../resources/js/tableau-extension/live-data-mapping/live-data-mapping.js"></script>
  
</head>
<body>

  <!-- <button onclick="getSelectedRows()">Get Selected Rows</button> -->
    
  
<div class="container" style="margin-top: 5%">
${file_unique_name}
<form   method="post"  enctype="multipart/form-data" id="data">
   <div class="form-group ">
    <label for="filename">Secondary data source</label>
    <input type="file" name="filename" class="form-control-file" id="filename" />
  </div>
  <button type="submit" class="btn btn-primary" onclick="">Submit</button>
</form>
<div id="myGrid" style="min-height: 300px;margin-top: 20px" class="ag-theme-balham"></div>
</div>
	
	
<script src="../resources/js/multiselect/bootstrap.min.js"></script>
</body>
<script type="text/javascript">
var columns=[];
$("form#data").submit(function(e) {
    e.preventDefault();    
    var formData = new FormData(this);

    $.ajax({
        //url: "https://peoples.io/trinetlive3/upload/live-data-mapping",
        url: "http://localhost:9999/trinetlive/upload/live-data-mapping",
        type: 'POST',
        data: formData,
        success: function (data) {
        	columns = data;
            console.log(data)
            configure();
        },
        cache: false,
        contentType: false,
        processData: false
    });
});


</script>
</html>
