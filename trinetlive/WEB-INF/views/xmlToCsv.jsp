<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet"
	href="resources/css/bootstrap/css/bootstrap.min.css">
<head>
<title>XmlToCsv</title>
</head>
<body class="container">

<a href="/trinet">Go Home</a><br><hr>
	<div>
		<label for="input-file">Browse a file:</label><br> <input
			type="file" id="input-file" class="btn btn-success" name="myfile">
	</div>
	<div>
		<h4>XML:</h4>
		<textarea id="xmlArea" cols="55" rows="8"></textarea>
	</div>


	<div style="display: none">
		<h4>CSV:</h4>
		<textarea id="csvArea" cols="55" rows="15"></textarea>
	</div>

	<input type="button" id="dwn-btn" value="Download CSV"
		class="btn btn-primary" />

	<p id="demo"></p>


	<script type='text/javascript'
		src='https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js'></script>
	<script type='text/javascript'
		src="https://cdn.rawgit.com/abdmob/x2js/master/xml2json.js"></script>
	<script type="text/javascript">
		function xmlTocsv() {

			var data = $("#xmlArea").val();

			var xml = "";

			if (data !== null && data.trim().length !== 0) {

				try {
					xml = $.parseXML(data);
				} catch (e) {
					alert("INVALID XML")
					throw e;
				}

				var x2js = new X2JS();

				data = x2js.xml2json(xml);
				jsonTocsvbyjson(data);
				

			}
		}

		function jsonTocsvbyjson(data, returnFlag) {

			arr = [];
			flag = true;

			var header = "";
			var content = "";
			var headFlag = true;

			try {

				var type1 = typeof data;

				if (type1 != "object") {
					data = processJSON($.parseJSON(data));
				} else {
					data = processJSON(data);
				}

			} catch (e) {
				if (returnFlag === undefined || !returnFlag) {
					console.error("Error in Convert to CSV");
				} else {
					console.error("Error in Convert :" + e);
				}
				return false;
			}

			$.each(data, function(k, value) {
				if (k % 2 === 0) {
					if (headFlag) {
						if (value != "end") {
							header += value + ",";
						} else {
							// remove last colon from string
							header = header.substring(0, header.length - 1);
							headFlag = false;
						}
					}
				} else {
					if (value != "end") {
						var temp = data[k - 1];
						if (header.search(temp) != -1) {
							content += value + ",";
						}
					} else {
						// remove last colon from string
						content = content.substring(0, content.length - 1);
						content += "\n";
					}
				}

			});

			if (returnFlag === undefined || !returnFlag) {
				$("#csvArea").val(header + "\n" + content);
			} else {
				return (header + "\n" + content);
			}
		}

		function processJSON(data) {

			$.each(data, function(k, data1) {

				var type1 = typeof data1;

				if (type1 == "object") {

					flag = false;
					processJSON(data1);
					arr.push("end");
					arr.push("end");

				} else {
					arr.push(k, data1);
				}

			});
			return arr;
		}
		function download(filename, text) {
		    var element = document.createElement('a');
		    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
		    console.log(filename)
		   
		    element.setAttribute('download', filename);

		    element.style.display = 'none';
		    document.body.appendChild(element);

		    element.click();

		    document.body.removeChild(element);
		}

		// Start file download.
		document.getElementById("dwn-btn").addEventListener("click", function(){
			xmlTocsv();
		    // Generate download of hello.txt file with some content
		    var text = document.getElementById("csvArea").value;
		    
		    var data = $("#xmlArea").val();
		    var doc = parseXml(data);

		 // Extract the name of the root element
		 var rootName = doc.documentElement.nodeName;
		    var filename = document.getElementById("input-file").value.split('\\');
		   // alert(text)
		   if(filename[filename.length -1].split('.')[0] === "")
			 var  tag = "workbook";
		   else
			   var  tag  = filename[filename.length -1].split('.')[0];
		  // alert(filename[filename.length -1].split('.')[0])
		    download(tag+".csv", getDatasource());
		}, false);
		
		function parseXml(xmlString) {
		    var doc;
		    if (window.ActiveXObject) {
		        // Internet Explorer
		        doc = new ActiveXObject("MSXML.DOMDocument");
		        doc.async = false;
		        doc.loadXML(xmlString);
		    } else {
		        // Other browsers
		        var parser = new DOMParser();
		        doc = parser.parseFromString(xmlString, "text/xml");
		    }
		    return doc;
		}
		
		
		
		document.getElementById('input-file')
		  .addEventListener('change', getFile)

		function getFile(event) {
			const input = event.target
		  if ('files' in input && input.files.length > 0) {
			  placeFileContent(
		      document.getElementById('xmlArea'),
		      input.files[0])
		  }
		}

		function placeFileContent(target, file) {
			readFileContent(file).then(content => {
		  	target.value = content
		  }).catch(error => console.log(error))
		}

		function readFileContent(file) {
			const reader = new FileReader()
		  return new Promise((resolve, reject) => {
		    reader.onload = event => resolve(event.target.result)
		    reader.onerror = error => reject(error)
		    reader.readAsText(file)
		  })
		}
		
		function getDatasource1() {
			xml = $("#xmlArea").val()
		    var x, i, xmlDoc, txt;
			parser = new DOMParser();
			xmlDoc = parser.parseFromString(xml,"text/xml");
		    txt = "";
		    x = xmlDoc.getElementsByTagName('columns')[0].getElementsByTagName('column');
		    for (i = 0; i < x.length; i++) { 
		    	if(x[i].getAttribute('name')){
		        	
		        	if(i != x.length-1)
		        		txt += x[i].getAttribute('name')+ ",";
		        	else
		        		txt += x[i].getAttribute('name');
		        		
		    	}
		    }
		    return txt;
		   // document.getElementById("demo").innerHTML = txt; 
		}
		function getDatasource() {
			xml = $("#xmlArea").val()
		    var x, i, xmlDoc, txt;
			parser = new DOMParser();
			xmlDoc = parser.parseFromString(xml,"text/xml");
		    txt = "";
		    x = xmlDoc.getElementsByTagName('metadata-records')[0].getElementsByTagName('metadata-record');
		    for (i = 0; i < x.length; i++) { 
		    	//console.log(x[i].getElementsByTagName('remote-name')[0].childNodes[0])
		    	if(x[i].getElementsByTagName('remote-name')[0].childNodes[0]){
				    

		        	if(i != x.length-1)
		        		txt += x[i].getElementsByTagName('remote-name')[0].childNodes[0].nodeValue+ ",";
		        	else
		        		txt += x[i].getElementsByTagName('remote-name')[0].childNodes[0].nodeValue;
		        		
		    	}
		    }
		    //document.getElementById("demo").innerHTML = txt; 
		    return txt;
		   
		}
	</script>
</body>
</html>
