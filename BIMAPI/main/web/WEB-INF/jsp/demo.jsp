<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"  %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="path" value="${pageContext.request.contextPath}" />
<html>
	<head>
		<script src="${path}/static/js/jquery-2.1.4.js" type="text/javascript" charset="utf-8"></script>
	</head>
	<body>
		<form action="${path}/users"  method="post">
			用户名:<br> 
			<input type="text" name="userName" value=""> <br> 
			密码:<br> 
			<input type="text" name="password" value=""> <br>
				<br> 
			<input type="submit" value="保存">
		</form>
	</body>
</html>