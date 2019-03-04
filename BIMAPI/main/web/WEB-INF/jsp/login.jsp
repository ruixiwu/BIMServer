<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
    System.out.println("the basePath is:"+basePath);
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <base href="<%=basePath%>">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>登录</title>
    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="<%=basePath%>bootstrap/css/bootstrap.min.css">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>
<div class="container">
    <h1>登录页面</h1>
    <hr/>
    <form action="<%=basePath%>user/login" method="post">
        <div class="form-group">
            <label for="userName">UserName:</label> <input type="text"
                                                           class="form-control" id="userName" name="userName"
                                                           placeholder="请输入用户名"/>
        </div>
        <div class="form-group">
            <label for="password">Password:</label> <input type="text"
                                                           class="form-control" id="passWord" name="passWord"
                                                           placeholder="请输入密码"/>
        </div>

        <div class="form-group">
            <button type="submit" class="btn btn-sm btn-success">Sign
                in
            </button>
        </div>
    </form>
</div>
</body>
<!-- Bootstrap core JavaScript Placed at the end of the document so the pages load faster -->
<script src="<%=basePath%>js/jquery.min.js"></script>
<script src="<%=basePath%>bootstrap/js/bootstrap.min.js"></script>
</html>
