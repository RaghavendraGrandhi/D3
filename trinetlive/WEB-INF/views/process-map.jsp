
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html> <!--<![endif]-->
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        <meta charset="utf-8">
        <title>Database process documentation</title>
        <link rel="stylesheet" href="https://nylen.io/d3-process-map/bootstrap.css">
        <link rel="stylesheet" href="https://nylen.io/d3-process-map/style.css">
        <link rel="stylesheet" href="https://nylen.io/d3-process-map/svg.css">
    </head>
    <body>
        <!--[if lt IE 9]>
        <div class="unsupported-browser">
            This website does not fully support your browser.  Please get a
            better browser (Firefox or <a href="/chrome/">Chrome</a>, or if you
            must use Internet Explorer, make it version 9 or greater).
        </div>
        <![endif]-->
        <div id="split-container">
            <a class="btn btn-default nav-button" id="nav-list" href="/trinet">
                Go Home
            </a>
            <div id="graph-container">
                <div id="graph"></div>
            </div>
            <div id="docs-container">
                <a id="docs-close" href="#">&times;</a>
                <div id="docs" class="docs"></div>
            </div>
        </div>
        <script src="https://nylen.io/d3-process-map/jquery/jquery-1.10.2.min.js"></script>
        <script src="https://nylen.io/d3-process-map/jquery/jquery.browser.min.js"></script>
        <script src="https://nylen.io/d3-process-map/d3/d3.v3.min.js"></script>
        <script src="https://nylen.io/d3-process-map/colorbrewer.js"></script>
        <script src="https://nylen.io/d3-process-map/lib/geometry.js"></script>
        <script>
            var config = {"title":"Database process documentation","graph":{"linkDistance":100,"charge":-400,"height":1500,"numColors":12,"labelPadding":{"left":3,"right":3,"top":2,"bottom":2},"labelMargin":{"left":3,"right":3,"top":2,"bottom":2},"ticksWithoutCollisions":50},"types":{"view":{"short":"View","long":"Database view"},"table":{"short":"Table","long":"Database table"},"query":{"short":"Query","long":"Database query"},"sas":{"short":"SAS project","long":"SAS project"},"extract":{"short":"ETL process","long":"Extract-transform-load process"},"database":{"short":"Access database","long":"Access database"},"report":{"short":"Report","long":"Report"}},"constraints":[{"has":{"name":"SASProject.egp"},"type":"position","x":0.15,"weight":0.7},{"has":{"name":"ETL process 1"},"type":"position","x":0.3,"weight":0.7},{"has":{"name":"ETL process 2"},"type":"position","x":0.45,"weight":0.7},{"has":{"name":"ETL process 4"},"type":"position","x":0.6,"weight":0.7},{"has":{"name":"ETL process 3"},"type":"position","x":0.75,"weight":0.7},{"has":{"name":"ETL process 5"},"type":"position","x":0.9,"weight":0.7},{"has":{"type":"extract"},"type":"position","y":0,"weight":0.8},{"has":{"type":"sas"},"type":"position","y":0,"weight":0.8},{"has":{"type":"table"},"type":"position","y":0.1,"weight":0.8},{"has":{"type":"view"},"type":"position","y":0.2,"weight":0.8},{"has":{"type":"query"},"type":"position","y":0.5,"weight":0.5},{"has":{"type":"database"},"type":"position","y":0.8,"weight":0.8},{"has":{"type":"report"},"type":"position","y":1,"weight":0.8},{"has":{"type":"report","group":"Intermediate"},"type":"position","y":0.8,"weight":0.8},{"has":{"type":"report","group":"Reporting"},"type":"position","x":0.9,"weight":0.8},{"has":{"type":"query","group":"Data1"},"type":"position","x":0.15,"weight":0.7},{"has":{"type":"query","group":"Data3"},"type":"position","x":0.2,"weight":0.7},{"has":{"type":"query","group":"Data4"},"type":"position","x":0.2,"weight":0.7},{"has":{"type":"query","group":"Data2"},"type":"position","x":0.5,"weight":0.4},{"has":{"type":"query","group":"Validation"},"type":"position","x":0.8,"y":0.7,"weight":0.7},{"has":{"type":"query","group":"Miscellaneous"},"type":"position","x":0.9,"y":0.5,"weight":0.7},{"has":{"type":"query","group":"Management"},"type":"position","x":0.95,"weight":0.7},{"has":{"type":"query"},"type":"linkStrength","strength":0.25},{"has":{"type":"database"},"type":"linkStrength","strength":0.5}],"jsonUrl":"json.php"};
        </script>
        <script src="resources/js/script.js"></script>
    </body>
</html>
