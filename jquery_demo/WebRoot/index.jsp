<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>  
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>  
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html lang="en">

<head>
	<base href="<%=basePath%>">
	<title>Home</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	
	<link href="css/style1.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" href="css/index.css" />
	<!-- start js -->
	<script type="text/javascript" src="js/jquery-2.2.0.min.js"></script>
	<script type="text/javascript" src="js/index.js" ></script>
</head>
<body>
<!-- start header -->
<div class="header_bg">
<div class="wrap">
	<div class="header">
		<div class="logo">
			<h1><a href="${basePath}index.jsp"><img src="images/logo.png" alt=""/></a></h1>
		</div>
		<div class="menu">
			<ul>
				<li><a href="${basePath}index.jsp" class="scroll">首页</a></li>
				<li><a href="${basePath}index.jsp" class="scroll">关于</a></li>
				<li><a href="${basePath}index.jsp" class="scroll">产品</a></li>
				<li><a href="#service" class="scroll">服务</a></li>
				<li><a href="${basePath}user/forwardLogin.htm" class="scroll">登录</a></li>
			</ul>
		</div>
		<div class="clear"></div>
	</div>
</div>
</div>
<!-- start slider -->
<div class="slider_bg">
	<div class="wrap">
		<div class="slider" id="home">
			<div class="slider_text">
				<h2>we are bloom</h2>
				<h3>We do digital & we do it with a difference</h3>
			</div>
		</div>
	</div>
</div>
<!-- start main -->
<div class="main_bg">
<div class="wrap">
	<center>
		<div class="lest">
			<div class="box1">
				<a href="http://sc.chinaz.com/"><img src="images/1.jpg" alt="" /></a>
			</div>
			<div class="box2">
				<a href="http://sc.chinaz.com/"><img src="images/2.jpg" alt="" /></a>
			</div>
			<div class="box3">
				<a href="http://sc.chinaz.com/"><img src="images/3.jpg" alt="" /></a>
			</div>
			<div class="box4">
				<a href="http://sc.chinaz.com/"><img src="images/4.jpg" alt="" /></a>
			</div>
			<div class="box5">
				<a href="http://sc.chinaz.com/"><img src="images/5.jpg" alt="" /></a>
			</div>
			<div class="box6">
				<a href="http://sc.chinaz.com/"><img src="images/6.jpg" alt="" /></a>
			</div>
			<div class="box7">
				<a href="http://sc.chinaz.com/"><img src="images/1.jpg" alt="" /></a>
			</div>
			<div class="box8">
				<a href="http://sc.chinaz.com/"><img src="images/2.jpg" alt="" /></a>
			</div>
			<div class="box9">
				<a href="http://sc.chinaz.com/"><img src="images/3.jpg" alt="" /></a>
			</div>
		</div>
	</center>
</div>
</div>
<!-- start work-page -->
<div class="work_bg">

</div>
<div class="footer_bg">
<div class="wrap">
<div class="wrapper">
	<div class="footer">
		 <a href="#" id="toTop" style="display: block;"><span id="toTopHover" style="opacity: 1;"></span></a>
		<!--end scroll_top_btn -->
		<div class="footer_nav">
		<ul>
				<li><a href="#me">Home</a></li>
				<li><a href="#">About</a></li>
				<li><a href="#">Work</a></li>
				<li><a href="#">Services</a></li>
				<li><a href="#">Contact</a></li>
		</ul>
		</div>
		<div class="logo1">
			<h1><a href="index.html"><img src="images/logo1.png" alt=""/></a></h1>
		</div>
		<div class="copy">
			<p class="link"><span> <img src="images/copy.png" alt="" />Copyright &copy; 2016.Company name All rights reserved.</span></p>
		</div>
		<div class="clear"></div>
	</div>
</div>
</div>
</div>
</body>
</html>