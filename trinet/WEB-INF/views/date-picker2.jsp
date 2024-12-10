<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>jQuery UI Datepicker - Display month &amp; year menus</title>
<link rel="stylesheet"	href="resources/css/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet"	href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<style type="text/css">
.ui-datepicker {font-size:10px;}
</style>
</head>
<body>
	<div class="container-fluid">
		<div class="row">
			<p>Date: 
			<input type="text" id="datepicker" class="form-control form-control-sm" style="width: 100%;border-radius: 0;box-shadow: 0px 0px 1px #cccccc94;"></p>
		</div>
	</div>
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script>
    $( "#datepicker" ).datepicker({
        changeMonth: true,
        changeYear: true
      });
    $("#datepicker").datepicker("setDate", new Date());
</script>
</body>
</html>