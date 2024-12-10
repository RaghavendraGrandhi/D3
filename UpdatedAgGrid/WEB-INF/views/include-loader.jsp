<link href="resources/css/loadmask/jquery.loadmask.css" rel="stylesheet" type="text/css" />
 <script src="resources/js/multiselect/jquery-3.1.1.min.js"></script>
 <script  src="resources/js/loadmask/jquery.loadmask.js" type="text/javascript"></script>
 <script type="text/javascript">
 function loadMask(){
$('body').mask('Loading');
}
function unloadMask(){
setTimeout(function(){ $('body').unmask(); }, 300);
}
 </script>
