<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>WebUploader</title>
    <meta http-equiv="X-UA-Compatible" content="IE=8">
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	
	<link rel="stylesheet" href="css/style.css" />
	<link rel="stylesheet" href="css/index.css" />
	
	<script type="text/javascript" src="webuploader/test/jquery-1.10.1.min.js"></script>
	<script type="text/javascript" src="js/index.js" ></script>
  </head>
  <script type="text/javascript">
  </script>
  <body>
	<center>
		<div class="lest">
			<c:forEach var="item" items="${pics}" varStatus="i" > 
			     <div class="box${i.index-1}">
					<a href="http://sc.chinaz.com/"><img src="upload/${item}" alt="${item}" /></a>
				</div>          
			</c:forEach>
			<!-- <div class="box1">
				<a href="http://sc.chinaz.com/"><img src="img/1.jpg" alt="" /></a>
			</div>
			<div class="box2">
				<a href="http://sc.chinaz.com/"><img src="img/2.jpg" alt="" /></a>
			</div>
			<div class="box3">
				<a href="http://sc.chinaz.com/"><img src="img/3.jpg" alt="" /></a>
			</div>
			<div class="box4">
				<a href="http://sc.chinaz.com/"><img src="img/4.jpg" alt="" /></a>
			</div>
			<div class="box5">
				<a href="http://sc.chinaz.com/"><img src="img/5.jpg" alt="" /></a>
			</div>
			<div class="box6">
				<a href="http://sc.chinaz.com/"><img src="img/6.jpg" alt="" /></a>
			</div>
			<div class="box7">
				<a href="http://sc.chinaz.com/"><img src="img/1.jpg" alt="" /></a>
			</div>
			<div class="box8">
				<a href="http://sc.chinaz.com/"><img src="img/2.jpg" alt="" /></a>
			</div>
			<div class="box9">
				<a href="http://sc.chinaz.com/"><img src="img/3.jpg" alt="" /></a>
			</div> -->
		</div>
	</center>
  </body>
</html>
