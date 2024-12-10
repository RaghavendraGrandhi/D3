<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page isELIgnored="false"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Properties</title>
<style type="text/css">
marquee {
    background: #5bb6e8;
    padding: 10px;
    color: #fff;
    font-family: sans-serif;
    font-size: medium;
}
</style>
</head>
<body>
	<div class="container-fluid">
		<marquee>${properties.description}</marquee>
	</div>
</body>
</html>