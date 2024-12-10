<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page isELIgnored="false"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Properties</title>
<link rel="stylesheet" href="https://cdn.datatables.net/1.10.16/css/jquery.dataTables.min.css">
<style type="text/css">
input.form-control, input.btn, a.btn, textarea.form-control{
	border-radius: 0;
}
table.dataTable tbody td {
    padding: 1px;
}
</style>
</head>
<body>
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-2 bgblue">
				<%@ include file="menu.jsp"%>
			</div>
			<div class="col-sm-10" style="margin-top: 2em;">
				<div class="text-right" style="margin: 2em;">
					<c:choose>
						<c:when test="${param.type eq 'updated'}">
							<a href="?type=all" class="btn btn-outline-primary">All</a>
							<a href="?type=updated" class="btn btn-primary">Updated</a>
						</c:when>
						<c:otherwise>
							<a href="?type=all" class="btn btn-primary">All</a>
							<a href="?type=updated" class="btn btn-outline-primary">Updated</a>
						</c:otherwise>
					</c:choose>
					
				</div>
				<table class="table table-striped table-sm">
					<thead>
						<tr>
							<th scope="col">Site Name</th>
							<th scope="col">Project</th>
							<th scope="col">Data Source</th>
							<th scope="col">Dashboard</th>
							<th scope="col">Description</th>
						</tr>
					</thead>
			        <tfoot>
            			<tr>
							<th scope="col">Site Name</th>
							<th scope="col">Project</th>
							<th scope="col">Data Source</th>
							<th scope="col">Dashboard</th>
							<th scope="col">Description</th>
			            </tr>
			        </tfoot>
					<tbody>
						<c:forEach items="${properties}" var="property">
							<tr>
								<td>${property.site}</td>
								<td>${property.project}</td>
								<td>${property.dataSource}</td>
								<td>${property.dashboard}</td>
								<td>
									<form method="post" name="properties" action="write-back" class="form-inline">
									    <div style="display: inline-flex;">
										<c:choose>
											<c:when test="${param.type eq 'updated'}">
												${property.description}
											</c:when>
											<c:otherwise>
										    	<input name="rowNumber" value="${property.rowNumber}" hidden/>
										    	<input name="description" value="${property.description}" class="form-control form-control-sm">
										    	<input type="submit" class="btn btn-outline-primary btn-sm" value="update" style="margin-left: 5px;"/>
											</c:otherwise>
										</c:choose>	
									    </div>
									</form>
									</td>
							</tr>
						</c:forEach>

					</tbody>
				</table>
			</div>
		</div>
	</div>
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
<script type="text/javascript">
$(document).ready(function() {
    // Setup - add a text input to each footer cell
    $('.table tfoot th').each( function () {
        var title = $(this).text();
        $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
    } );
 
    // DataTable
    var table = $('.table').DataTable();
 
    // Apply the search
    table.columns().every( function () {
        var that = this;
 
        $( 'input', this.footer() ).on( 'keyup change', function () {
            if ( that.search() !== this.value ) {
                that
                    .search( this.value )
                    .draw();
            }
        } );
    } );
	$("input").addClass("form-control");
	$("select").addClass("custom-select custom-select-sm");
} );
</script>
</body>
</html>