<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<?xml version="1.0" encoding="GB2312"?>
<%@ page language="java" contentType="text/html; charset=GB2312" %>
<vxml version="1.0">
<% request.setCharacterEncoding("GB2312"); %>
<% 
	String msg = (String)request.getAttribute("msg");
	String code = (String)request.getAttribute("code");
	out.println("<var name=\"msg\" expr=\"\'"+ msg +"\'\"/>");
	out.println("<var name=\"code\" expr=\"\'"+ code +"\'\"/>");
%>
	<form>	
		<block>
			<log><%=msg %></log>
			<log><%=code %></log>
			<return namelist="code msg"/>
		</block>
	</form>
</vxml>