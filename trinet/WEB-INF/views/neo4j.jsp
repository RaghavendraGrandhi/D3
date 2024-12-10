
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="description" content="">
<meta name="viewport" content="width=device-width">
<title>neo4jd3.js</title>
<link rel="stylesheet" href="resources/css/neo4j/neo4j.css">

<style>
body, html, .neo4jd3 {
	height: 100%;
	overflow: hidden;
}
</style>
</head>
<body>
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-2 bgblue">
				<%@ include file="menu.jsp"%>
			</div>
			<div class="col-sm-10">
				<div id="neo4jd3"></div>
			</div>
		</div>
	</div>

	<!-- Scripts -->
	<script src="resources/js/neo4j/d3.min.js"></script>
	<script src="resources/js/neo4j/neo4jd3.js"></script>
	<script type="text/javascript">
            function init() {
                var neo4jd3 = new Neo4jd3('#neo4jd3', {
                    highlight: [
                        {
                            class: 'Project',
                            property: 'name',
                            value: 'neo4jd3'
                        }, {
                            class: 'User',
                            property: 'userId',
                            value: 'eisman'
                        }
                    ],
                    icons: {
                        'Address': 'home',
                        'Api': 'gear',
                        'BirthDate': 'birthday-cake',
                        'Cookie': 'paw',
                        'CreditCard': 'credit-card',
                        'Device': 'laptop',
                        'Email': 'at',
                        'Git': 'git',
                        'Github': 'github',
                        'Google': 'google',
                        'icons': 'font-awesome',
                        'Ip': 'map-marker',
                        'Issues': 'exclamation-circle',
                        'Language': 'language',
                        'Options': 'sliders',
                        'Password': 'lock',
                        'Phone': 'phone',
                        'Project': 'folder-open',
                        'SecurityChallengeAnswer': 'commenting',
                        'User': 'user',
                        'zoomFit': 'arrows-alt',
                        'zoomIn': 'search-plus',
                        'zoomOut': 'search-minus'
                    },
                    minCollision: 60,
                    neo4jDataUrl: 'readFile/neo4jData.json',
                    nodeRadius: 25,
                    onNodeDoubleClick: function(node) {
                        switch(node.id) {
                            case '25':
                                window.open(node.properties.url, '_blank');
                                break;
                            default:
                                var maxNodes = 5,
                                    data = neo4jd3.randomD3Data(node, maxNodes);
                                neo4jd3.updateWithD3Data(data);
                                break;
                        }
                    },
                    onRelationshipDoubleClick: function(relationship) {
                        console.log('double click on relationship: ' + JSON.stringify(relationship));
                    },
                    zoomFit: true
                });
            }

            window.onload = init;
        </script>
</body>
</html>
