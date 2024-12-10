<html>
<head>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
</head>
<body>
<div class="container" style="text-align: center;">
<h2 style="font-size: 30px">TREX FILES</h2>
    
    <br />
        <c:forEach var="file" items="${fileNames}">
          
                <a href="download/${file}" style="background-color: #d6cece;border-radius: 10px;display: inline-block;
                width: 300px;
           font-size: 20;margin: 20px;padding-top: 40px;padding-bottom: 40px"> ${file}</a>
         
        </c:forEach>
   
</div>
</body>
</html>