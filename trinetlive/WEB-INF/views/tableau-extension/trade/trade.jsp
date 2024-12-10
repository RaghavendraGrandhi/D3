
<!DOCTYPE html>


<html>
<head>
    <meta HTTP-EQUIV="X-UA-COMPATIBLE" CONTENT="IE=9" >
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <meta property="og:image" content="http://www.brightpointinc.com/interactive/images/Deficit_202px.png">

    <title>US Trade Deficit Data Visualization D3.js</title>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    
    <link type="text/css" rel="stylesheet" href="../resources/css/trade/style.css">

    <script type="text/javascript" src="http://www.brightpointinc.com/labs/ustrade/scripts/d3/d3.min.js"></script>

    <script type="text/javascript" src="../resources/js/trade/trigonometry.js"></script>

    <script type="text/javascript" src="../resources/js/trade/arc.js"></script>

    <script type="text/javascript" src="../resources/js/trade/functor.js"></script>
    <script type="text/javascript" src="../resources/js/trade/source.js"></script>
    <script type="text/javascript" src="../resources/js/trade/target.js"></script>


    <script type="text/javascript" src="../resources/js/trade/arc-chord.js"></script>
    <script type="text/javascript" src="../resources/js/trade/arc-chord-1.js"></script>

    <script type="text/javascript" src="../resources/js/trade/gradients.js"></script>

</head>
<body>



<div id="bpg">

    <!--[if IE 6]>
    <div id="bpg-error">
        <p>1 This interactive graphic requires a browser with SVG support, such as <a href="http://www.google.com/chrome">Chrome</a>, <a href="http://www.mozilla.org/en-US/firefox/">Firefox</a>, <a href="http://www.apple.com/safari/download/">Safari</a> or the latest <a href="http://windows.microsoft.com/en-US/internet-explorer/products/ie/home">Internet Explorer 9</a>. </p>
        <img src="images/browserCheck.jpg" alt="Error">
        <div id="bpg-chartFrame" style="display:none;">
        </div>
    <![endif]-->

    <!--[if IE 7]>
    <div id="bpg-error">
        <p>2 This interactive graphic requires a browser with SVG support, such as <a href="http://www.google.com/chrome">Chrome</a>, <a href="http://www.mozilla.org/en-US/firefox/">Firefox</a>, <a href="http://www.apple.com/safari/download/">Safari</a> or the latest <a href="http://windows.microsoft.com/en-US/internet-explorer/products/ie/home">Internet Explorer 9</a>. </p>
        <img src="images/browserCheck.jpg" alt="Error">
        <div id="bpg-chartFrame" style="display:none;">

    <![endif]-->

    <!--[if IE 8]>
    <div id="bpg-error">
        <p>3 This interactive graphic requires a browser with SVG support, such as <a href="http://www.google.com/chrome">Chrome</a>, <a href="http://www.mozilla.org/en-US/firefox/">Firefox</a>, <a href="http://www.apple.com/safari/download/">Safari</a> or the latest <a href="http://windows.microsoft.com/en-US/internet-explorer/products/ie/home">Internet Explorer 9</a>. </p>
        <img src="images/browserCheck.jpg" alt="Error">
        <div id="bpg-chartFrame" style="display:none;">

    <![endif]-->

    <!--[if IE 9]>
    <div id="bpg-chartFrame">
    <![endif]-->

    <!--[if !IE]>
    <div id="bpg-chartFrame">
    <![endif]-->



    <div id="mainDiv">
        <div id="imgDiv" style="width:300px; margin:0px auto; margin-top:10px">
            <img id="playPause" src="../resources/images/pause_bw.png" width="24" height="24" style="float:left"/>
            <div style="float:left; margin-top:4px; margin-left:4px">click on a timeline year to skip to that point.</div>
        </div>

        <div id="svgDiv" style="font-size:10px"></div>




    </div>
        <div id="toolTip" class="tooltip" style="opacity:0; width:200px; height:90px; position:absolute;">
            <div id="header1" class="header3"></div>
            <div class="header-rule"></div>
            <div id="head" class="header"></div>
            <div class="header-rule"></div>
            <div  id="header2" class="header2"></div>
            <div  class="tooltipTail"></div>
        </div>

    </div>

    <script type="text/javascript" src="../resources/js/trade/globals.js"></script>
    <script type="text/javascript" src="../resources/js/trade/initialize.js"></script>
    <script type="text/javascript" src="../resources/js/trade/events.js"></script>
    <script type="text/javascript" src="../resources/js/trade/data2.js"></script>
    <script type="text/javascript" src="../resources/js/trade/_buildChords.js"></script>
    <script type="text/javascript" src="../resources/js/trade/update.js"></script>
    <script src="../resources/js/treemap/tableau-extensions-1.latest.js"></script>
<script src="../resources/js/tableau-extension/trade/trade.js"></script>

    <script type="text/javascript">

        initialize();

        fetchData();


        function run() {

            if (month < 11) month++; else {
                month=0;
                if (year < countriesGrouped.length-1) year++;
            }
            if (month==maxMonth && year==maxYear)  {
                month=0;
                year=0;
            }
            else {
                update(year,month);
            }
        }


    </script>

</body>
</html>
