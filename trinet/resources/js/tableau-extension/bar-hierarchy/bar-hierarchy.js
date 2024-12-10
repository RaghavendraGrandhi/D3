var dashboard,consolidateData = [],config,fieldNames = [],worksheetName,worksheet;
$(document).ready(function () {
	
	tableau.extensions.initializeAsync({ 'configure': configure }).then(function () {

		dashboard = tableau.extensions.dashboardContent.dashboard;
		configure();
		
	
		
	});

});
function constructData() {
	var columns =[];
	var index = []
	
	
	var data1 = [];
	for(var x=1;x<=5;x++){
		data1.push(tableau.extensions.settings.get("level"+x))
	}
	console.log(data1)
	 var worksheets = dashboard.worksheets;
    worksheetName = tableau.extensions.settings.get("worksheet");

    worksheet = worksheets.find(function (sheet) {
     return sheet.name === worksheetName;
   });
    columns.push("");
    index.push(0);
   worksheet.getSummaryDataAsync().then(function (sumdata) {
   	
   	 //for(var i=0;i<data1.length;i++){
   	sumdata.columns.forEach(function(c){
       				  if(c.fieldName != "Name"){
       					  columns.push(c.fieldName);
       					  index.push(c.index)
       				 }else{
       					columns[0] = c.fieldName ;
     					  index[0] = c.index
       				 }
   			  })
   	// }
   			  
   			   let list = [];
   	list.push(columns)
   	sumdata.data.forEach(function(d){

			  var r=[];
			  for(p=0;p<index.length ; p++){
				  if(d[index[p]].value!=null && d[index[p]].value!= "%null%")
				  r.push(d[index[p]].value);
				  else
					  r.push("");
			  }
		        list.push(r);
		    
   	})
		console.log(list)
	   processData(list);
 
   })
	
}
function processData(list) {
	var columns =list[0] ;
	var setObj= {};
	var obj = {};
	$.each(columns,function(i,d){
		if(d!="Size")
		setObj[d] = new Set();
	})
	var listArr =[];
	$.each(list,function(i,d){
		if(i!=0){
			listArr.push(d)
			$.each(columns,function(n,j){
				if(j!="Size"){
					setObj[j].add(d[n]);
					
					$.each(columns,function(p,r){
						if(p<=n){
							obj[n]
						}
					})
				}
			})
		}
	})
	
	
	$.post( "../parseJson",{"mydata":JSON.stringify(listArr)})
	  .done(function( data ) {
		  console.log(data)
	  });
	//list.toString()
//	var nest = d3.nest()
//    .key(function(d) {  return d[0]})
//    .key(function(d) {  return d[1]})
//    .key(function(d) {  return d[2]})
//    .key(function(d) {  return d[3]})
//    .key(function(d) {  return d[4]})
//    .key(function(d) {  return d[5]})
//    .key(function(d) {  return d[6]})
//    .rollup(function(d) {  return d[6]})
//    .entries(listArr).map(function(group) {
//        return {
//            name: group.key,
//            children: group.values
//          }
//        });
//	chart(nest)

//	console.log(list.flat())
}


function configure() {


	const popupUrl =  window.location.href+`/configure`;
	
	tableau.extensions.ui.displayDialogAsync(popupUrl, 0, { height: 500, width: 500 }).then((closePayload) => {
		constructData();
		const filterEvent = tableau.TableauEventType.FilterChanged;
		worksheet.addEventListener(filterEvent, function (selectionEvent) {
			console.log(selectionEvent)
			constructData();
		});
		
	}).catch((error) => {
		
		switch (error.errorCode) {
			case tableau.ErrorCodes.DialogClosedByUser:
				
				console.log("Dialog was closed by user");
				break;
			default:
				console.error(error.message);
		}
	});
}

