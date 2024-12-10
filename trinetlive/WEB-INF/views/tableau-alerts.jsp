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
<link rel="stylesheet"	href="resources/css/bootstrap/css/bootstrap.min.css">

<style type="text/css">
input.form-control, 
input.btn, a.btn, 
textarea.form-control, 
.custom-select {
	border-radius: 0 !important;
}

table.dataTable tbody td {
	padding: 1px;
	font-size: 0.75rem;
    vertical-align: middle;
}

table.dataTable thead th {
    color: #444;
    font-weight: 600;
    font-size: 0.875rem;
}

.form-control:focus, .custom-select:focus {
	box-shadow: 0 0 0 0 rgba(0, 123, 255, .25) !important;
}

table.dataTable thead th, table.dataTable thead td {
	padding: 6px 3px;
	border-bottom: 1px solid #eee;
}
.badge{
position: relative !important;
    top: -1px !important;
    background: #fff;
    color: #4b8fff;
    padding: 8px 0 !important;
    border-radius: 50% !important;
    margin-left: 10px;
    width: 30px;
    height: 30px;
    vertical-align: middle !important;
}
input#Description {
    pointer-events:none;
    cursor: not-allowed;
     background: #dddddd;
     background-image: url("https://i.stack.imgur.com/GIHQn.jpg");
}
</style>
</head>
<body>
	<div class="container-fluid">
		<div class="row">
			<%-- <div class="col-sm-2 bgblue">
				<%@ include file="menu.jsp"%>
			</div> --%>
			<div class="col-sm-12" style="margin: 2em 0 1em 0;">
				<div class="row">
					<div class="col-sm-6">
						<c:if test="${param.type ne 'updated'}">
						<c:forEach items="${tags}" var="tag">
							<a type="button" class="btn btn-primary" href="?tag=${tag.key}">${tag.key}<span
								class="badge">${tag.value}</span></a>
						</c:forEach>
						</c:if>
					</div>
					<div class="col-sm-6 text-right">
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
				</div>
				<div style="border-bottom: 1px solid #1111;margin: 20px 0;"></div>
				<table class="table table-striped table-sm" id="example">
					<thead>
						<tr>
							<th scope="col">Site Name</th>
							<th scope="col">Project</th>
							<th scope="col">Data Source</th>
							<th scope="col">Workbook</th>
							<th scope="col">Dashboard</th>
							<th scope="col">Description</th>
						</tr>
						<tr id="filterrow">
							<th scope="col">Site Name</th>
							<th scope="col">Project</th>
							<th scope="col">Data Source</th>
							<th scope="col">Workbook</th>
							<th scope="col">Dashboard</th>
							<th scope="col">Description</th>
						</tr>
					</thead>

					<tbody>
						<c:forEach items="${properties}" var="property">
							<tr>
								<td>${property.site}</td>
								<td>${property.project}</td>
								<td>${property.dataSource}</td>
								<td>${property.workbook}</th>
								<td>${property.dashboard}</td>
								<td>
									<form method="post" name="properties" action="tableau-alerts"
										class="form-inline">
										<div>
											<c:choose>
												<c:when test="${param.type eq 'updated'}">
												${property.description}
											</c:when>
												<c:otherwise>
													<input name="rowNumber" value="${property.rowNumber}" hidden />
													<input name="site" value="${property.site}" hidden />
													<input name="project" value="${property.project}" hidden />
													<input name="dataSource" value="${property.dataSource}"	hidden />
													<input name="workbook" value="${property.workbook}"	hidden />
													<input name="dashboard" value="${property.dashboard}" hidden />
													<input name="description" value="${property.description}" class="form-control form-control-sm">
													<input type="submit" class="btn btn-outline-primary btn-sm"	value="update" style="margin-left: 5px;" />
													<a href="tableau-alerts/${property.project}/${property.dataSource}/${property.dashboard}" style="    margin: 7px 15px;" >
														<img src="https://cdn4.iconfinder.com/data/icons/fugue/icon/external.png">
													</a>
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
	<script src="resources/js/data-tables/jquery-1.12.4.js"></script>
	<script	src="resources/js/data-tables/jquery.dataTables.js"></script>
	<script type="text/javascript">
		$(document).ready(
				function() {
					// Setup - add a text input to each footer cell
					$('.table thead tr#filterrow th').each(
							function() {
								var title = $('#example thead th').eq(
										$(this).index()).text();
								$(this).html('<input type="text" onclick="stopPropagation(event);" placeholder="Search '+ title + '" id = "'+title+'" />');
							});

					// DataTable
					var table = $('#example').DataTable({
						orderCellsTop : true,
						"pageLength": 25,
						columnDefs: [
							   { orderable: false, targets: -1 }
							]
					});

					// Apply the filter
					$("#example thead input").on(
							'keyup change',
							function() {
								table.column(
										$(this).parent().index() + ':visible')
										.search(this.value).draw();
							});

					function stopPropagation(evt) {
						if (evt.stopPropagation !== undefined) {
							evt.stopPropagation();
						} else {
							evt.cancelBubble = true;
						}
					}
					$("input").addClass("form-control");
					$("select").addClass("custom-select custom-select-sm");
				});
	</script>
</body>
</html>