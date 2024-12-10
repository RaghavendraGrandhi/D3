
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Arena country view</title>
    <!-- CSS -->
    <link href="resources/css/arena-chart/bootstrap-responsive.min.css" rel="stylesheet">
    <link href="resources/css/arena-chart/slider.css" rel="stylesheet">
    <link href="resources/css/arena-chart/bootstrap-select.min.css" rel="stylesheet">
    <link href="resources/css/arena-chart/bootstrap-glyphicons.css" rel="stylesheet">
    <link href="resources/css/arena-chart/style.css" rel="stylesheet">
    <link href="resources/css/arena-chart/colorbrewer.css" rel="stylesheet">

    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="js/html5shiv.js"></script>
    <![endif]-->

    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-18158765-6', 'palamago.com.ar');
      ga('send', 'pageview');

    </script>


  </head>

  <body>
    <div class="container-fluid">
    <div class="row">
    	<div class="col-sm-2 bgblue">
   	    	<%@ include file="menu.jsp" %>
    	</div>
    	<div class="col-sm-10">
		<div id="main-container" class="row">
        <div class="col-lg-1">
          <div class="slider-thing">
            <a id="arrow-up" class="plus-minus" href="javascript:;"><i class="glyphicon glyphicon-plus"></i></a>
            <input id="slider" type="text">
            <a id="arrow-down"  class="plus-minus" href="javascript:;"><i class="glyphicon glyphicon-minus"></i></a>
          </div>
        </div>
        <div id="map-column" class="col-lg-5">
          <div id="map-container">
          </div>
        </div>
        <div class="col-lg-6">
          <h1>Argentina<small> vivimos juntos, demasiado</small></h1>
          <div class="row-fluid">
            <div class="col-lg-12">
              <ul id="myTab" class="nav nav-tabs">
                <li class="active col-lg-4"><a href="#tab-resumen" data-toggle="tab">Resumen</a></li>
                <li class="col-lg-4"><a class="tab-centro" href="#tab-data" data-toggle="tab">+ Datos</a></li>
                <li class="col-lg-4"><a href="#tab-graph" data-toggle="tab">Gráfico</a></li>
              </ul>

              <!-- filter -->
                <div class="accordion" id="accordionOrder">
                  <div class="accordion-group">
                    <div class="accordion-heading">
                      <a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion2" href="#collapseOrder">
                        Criterio de orden seleccionado: <span data-bind="text: selectedOrder"></span>
                      </a>
                    </div>
                    <div id="collapseOrder" class="accordion-body collapse">
                      <div class="accordion-inner">
                        <div class="row-fluid">
                          <div class="span12">
                            <div class="btn-group">
                              <button data-toggle="tooltip" title="Ordena por Densidad de Población de forma ASCENDENTE" type="button" class="btn btn-default filter-order"><i class="glyphicon glyphicon-sort-by-attributes"></i> ASCENDENTE</button>
                              <button data-toggle="tooltip" title="Ordena por Densidad de Población de forma DESCENDENTE" type="button" class="btn disabled btn-inverse filter-order"><i class="glyphicon glyphicon-sort-by-attributes-alt"></i> DESCENDENTE</button>
                              <button data-toggle="tooltip" title="Ordena por Nombre de la Localidad ALFABÉTICAMENTE" type="button" class="btn btn-default filter-order"><i class="glyphicon glyphicon-sort-by-alphabet"></i> ALFABÉTICAMENTE</button>
                            </div>
                            <p class="text-left" style="margin-top:10px">Se utilizan los campos "Densidad de población por departamento" y "Nombre"</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              <!-- filter -->

              <div id="myTabContent" class="tab-content">
                <div class="tab-pane fade active in" id="tab-resumen">
                  <p class="texto-resumen">El <span class="important1" data-bind="text: percentageTotal"></span> de la población vive en el <span class="important2" data-bind="text: percentageSupSelected"></span> del territorio Argentino.</p>
                  <div class="share-links">
                    <a class="twitter popup" href="http://twitter.com/share">
                      <img class="share-icon" src="img/tw.svg" />
                    </a>
                    <a class="facebook popup" href="http://www.facebook.com/sharer/sharer.php?s=100">
                      <img class="share-icon" src="img/fb.svg" />
                    </a>

                    <a class="gplus popup" href="https://plus.google.com/share">
                      <img class="share-icon" src="img/g.svg" />
                    </a>
                  </div>
                 </div>
                <div class="tab-pane fade" id="tab-data">
                  <h3>Total Argentina</h3>
                  <div class="row-fluid">
                    <div class="span6">
                      <p>Población</p>
                      <h2><span data-bind="text: poblacionTotalStr"></span></h2>      
                    </div>
                    <div class="span6">
                      <p>Superficie</p>
                      <h2 class="superficie"><span data-bind="text: superficieTotalStr"></span> Km²</h2>
                    </div>
                  </div>
                  <hr/>
                  <h3><span data-bind="text: percentageTotal"></span> de Argentina seleccionado</h3>
                  <div class="row-fluid">
                    <div class="span6">
                      <p>Población</p>
                      <h2><span data-bind="text: cantSelectedStr"></span></h2>
                      
                    </div>
                    <div class="span6">
                      <p>Superficie Ocupada</p>
                      <h2 class="superficie"><span data-bind="text: supSelectedStr"></span> Km²</h2>
                    </div>
                  </div> 

                  <div class="row-fluid">
                    <div class="span6">
                      <p>Porcentaje de superficie Ocupada</p>
                      <h2 class="porcentaje"><span data-bind="text: percentageSupSelected"></span></h2>
                    </div>
                    <div class="span6">
                      <p>Habitantes por Km²</p>
                      <h2 class="porcentaje"><span data-bind="text: densidadSelected"></span></h2>
                    </div>
                  </div> 

                  <a data-toggle="modal" href="#ayuda" class="btn btn-primary btn-lg"><i class="glyphicon glyphicon-info-sign"></i> Observaciones</a>

                </div>

                <div class="tab-pane fade" id="tab-graph">
                  <div class="row-fluid">
                    <div class="span12">
                      <p>Población por departamento</p>
                      <div id="graph-container">
                      </div>
                      <p class="text-center label-gran-porcentaje">población seleccionada</p>
                      <p id="gran-porcentaje"><span data-bind="text: percentageTotal"></span></p>
                      <p class="text-center label-total-localidades">departamentos seleccionados</p>
                      <p id="total-localidades"><span data-bind="text: departamentosSelected"></span></p>
                    </div>
                  </div>
                 </div>

              </div>

            </div>
          </div>
        </div>
      </div>    
    </div>
    </div>
    
    
      

    </div> <!-- /container -->


        <a id="full-screen-btn" class="btn btn-default btn-mini"><span class="glyphicon glyphicon-resize-full"></span>
    </a>

    <!-- Modal -->
    <div class="modal fade" id="ayuda">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">Observaciones</h4>
          </div>
          <div class="modal-body">
            <ul>
              <li>Construído con información del <a href="http://www.censo2010.indec.gov.ar/" target="_blank">Censo 2010</a> basado en la <a href="http://interactivos.lanacion.com.ar/censo/" target="_blank">aplicación interactiva</a> creada por el equipo de <a href="http://twitter.com/LNData" target="_blank">@LNData</a></li>
              <li>Se asume distribución de población pareja dentro del mismo departamento.</li>
              <li>No se tiene en cuenta a Islas Malvinas, Islas del Atlántico Sur, ni Antártida para los cálculos, por falta de datos.</li>
              <li>Para la selección, ordenado por ascendente o descendente, se tiene en cuenta la "Densidad de población por departamento". Por otra parte, se tiene en cuenta el "Nombre de Partida" para el orden alfabético del departamento.</li>
              <li>Los valores calculados son aproximados.</li>
            </ul>
          </div>
          <div class="modal-footer">
            <a type="button" class="btn btn-danger pull-left" target="_blank" href="https://github.com/palamago/country-population/issues?state=open">Sugerencias</a>
            <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->

    <script src="resources/js/arena-chart/jquery-2.0.3.min.js"></script>
    <script src='resources/js/arena-chart/knockout-2.3.0.js'></script>
    <script src="resources/js/arena-chart/bootstrap.min.js"></script>
    <script src="resources/js/arena-chart/bootstrap-slider.js"></script>
    <script src="resources/js/arena-chart/bootstrap-select.min.js"></script>
    <script src="resources/js/arena-chart/topojson.v1.min.js"></script>
    <script src="resources/js/arena-chart/d3.min.js"></script>
    <script src="resources/js/arena-chart/d3.populationMap.js"></script>
    <script src="resources/js/arena-chart/d3.bargraph.js"></script>
    <script src="resources/js/arena-chart/main.js"></script>
  </body>
</html>
