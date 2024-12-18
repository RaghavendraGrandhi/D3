
<!DOCTYPE html>
<html>

<head>
    <title>Popoto Search</title>

    <!-- Add Popoto default CSS styles -->
    <link rel="stylesheet" href="https://www.popotojs.com/css/popoto.min.css">
	<script src="https://www.popotojs.com/js/analytics.js"></script>
    <style>
        #popoto-graph:fullscreen {
            width: 100%;
            height: 100%;
        }

        #popoto-graph:-webkit-full-screen {
            width: 100%;
            height: 100%;
        }

        #popoto-graph:-moz-full-screen {
            width: 100%;
            height: 100%;
        }

        #popoto-graph:-ms-fullscreen {
            width: 100%;
            height: 100%;
        }
    </style>
</head>
<body class="ppt-body">

<a href="/trinet">Go Home </a>
<section class="ppt-section-main" style="height: 900px">
    <div class="ppt-section-header">
        <span class="ppt-header-span">Neo4j movie graph -</span> simple graph example
    </div>

    <!-- By default the graph is generated on the HTML element with ID "popoto-graph"
     If needed this id can be modified with property "popoto.graph.containerId" -->

    <div id="popoto-graph" class="ppt-div-graph">
        <!-- Graph is generated here -->
    </div>

</section>

<!-- Required scripts -->
<script src="https://www.popotojs.com/js/jquery-2.1.0.min.js" charset="utf-8"></script>
<script src="https://www.popotojs.com/js/d3.v3.min.js" charset="utf-8"></script>
<script src="https://www.popotojs.com/js/popoto.min.js" charset="utf-8"></script>
<script>

    popoto.rest.CYPHER_URL = "https://www.popotojs.com/proxy.php";

    // Define the list of label provider to customize the graph behavior:
    // Only two labels are used in Neo4j movie graph example: "Movie" and "Person"
    popoto.provider.nodeProviders = {
        "Movie": {
            "returnAttributes": ["title", "released", "tagline"],
            "constraintAttribute": "title"
        },
        "Person": {
            "returnAttributes": ["name", "born"],
            "constraintAttribute": "name"
        }
    };

    // Start the generation using parameter as root label of the query.
    popoto.start("Person");

</script>
</body>
</html>
