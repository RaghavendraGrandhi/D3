<!DOCTYPE html>
<meta charset="utf-8">
	<title>Pie chart using idea of polar clock (though not 100% in total)</title> 
<style>

body {
  background: #222;
  font: 10px sans-serif;
  margin: auto;
  position: relative;
  width: 960px;
}

text {
  text-anchor: middle;

}

#credit {
  position: absolute;
  right: 4px;
  bottom: 4px;
  color: #ddd;
}

#credit a {
  color: #fff;
  font-weight: bold;
}

</style>
<div id="credit"></div>
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>

<script src="../resources/js/d3.v3.min.js"></script>
<script src="../resources/js/treemap/tableau-extensions-1.latest.js"></script>
<script src="../resources/js/tableau-extension/polar-clock/polar-clock.js"></script>
