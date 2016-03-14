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
	
    <title>后台管理</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">

    <link href="bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="bower_components/metisMenu/dist/metisMenu.min.css" rel="stylesheet">
   <!--  <link href="dist/css/timeline.css" rel="stylesheet"> -->
    <link href="dist/css/sb-admin-2.css" rel="stylesheet">
    <link href="bower_components/morrisjs/morris.css" rel="stylesheet">
    <link href="bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

	<script src="js/jquery-2.2.0.min.js"></script>
    <script src="bower_components/metisMenu/dist/metisMenu.min.js"></script>
    <script src="bower_components/raphael/raphael-min.js"></script>
    <script src="bower_components/morrisjs/morris.min.js"></script>
    <script src="dist/js/sb-admin-2.js"></script>
    
</head>
<script type="text/javascript">
		$(function () {
			//自动完成插件使用
			/* $("#keyword").autocomplete("user/seach.htm", {
				minChars: 1,
				width: 200,
				max: 50,
				matchContains: true,
				autoFill: true,
				parse: function(data){
					var rows = [];
					var d = data;
					for(var i=0; i<d.length; i++){
						rows[rows.length] = {
							data:d[i],
							value:d[i],
							result:d[i]
						};
					}
						return rows;
					},
					formatItem: function(row,i,n) {
						return row;
					}
				}).result(function(event, data, formatted) {
					alert(data);
				}); */
				//显示用户列表
				$(".usermg").click(function(){
					$("#classifyList").hide();
					$("#userList").show();
				});
				
				//显示分类列表
				$(".classifymg").click(function(){
					$("#userList").hide();
					$("#classifyList").show();
				});
				
		});
		
	</script>
<body>

    <div id="wrapper">

          <!-- Navigation -->
        <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="index.html">欢迎您，${username}。</a>
            </div>

          <ul class="nav navbar-top-links navbar-right">
                <li class="dropdown">
                    <a class="dropdown-toggle" href="javascript:void(0);">
                        <i class="fa fa-envelope fa-fw"></i><i class="fa fa-caret-down"></i>
                    </a>
                </li>
                <li class="dropdown">
                    <a class="dropdown-toggle" href="javascript:void(0);">
                        <i class="fa fa-tasks fa-fw"></i>  <i class="fa fa-caret-down"></i>
                    </a>
                </li>
                <li class="dropdown">
                    <a class="dropdown-toggle" href="javascript:void(0);">
                        <i class="fa fa-bell fa-fw"></i>  <i class="fa fa-caret-down"></i>
                    </a>
                </li>
                <li class="dropdown">
                    <a class="dropdown-toggle" href="javascript:void(0);">
                        <i class="fa fa-user fa-fw"></i>  <i class="fa fa-caret-down"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-user">
                        <li>
                        	<a class="nickname" href="#"><i class="fa fa-user fa-fw"></i> 
                        		<c:if test="${empty nickname }">
	                        		<c:if test="${fn:length(username)>5 }">  
				                         ${fn:substring(username, 0, 5)}...  
				                   </c:if>  
				                  <c:if test="${fn:length(username)<=5 }">  
				                         ${username}  
				                   </c:if>  
			                   </c:if>
			                   	<c:if test="${!empty nickname }">
	                        		<c:if test="${fn:length(nickname)>5 }">  
				                         ${fn:substring(nickname, 0, 5)}...  
				                   </c:if>  
				                  <c:if test="${fn:length(nickname)<=5 }">  
				                         ${nickname}  
				                   </c:if>  
			                   </c:if>
                        	</a>
                        </li>
                        <li>
                        	<a href="#"><i class="fa fa-gear fa-fw"></i> 帐号设置</a>
                        </li>
                        <li class="divider"></li>
                        <li>
                        	<a href="${basePath}user/logout.htm"><i class="fa fa-sign-out fa-fw"></i> 注销</a>
                        </li>
                    </ul>
                    <!-- /.dropdown-user -->
                </li>
                <!-- /.dropdown -->
            </ul>
            <!-- /.navbar-top-links -->
        </nav>
        
      <div class="navbar-default sidebar" role="navigation" style="width:20%;float:left;">
            <div class="sidebar-nav navbar-collapse">
                <ul class="nav" id="side-menu">
                    <li>
                        <a class="usermg" href="javascript:void(0);"><i class="fa fa-dashboard fa-fw"></i> 用户管理</a>
                    </li>
                </ul>
                 <ul class="nav" id="side-menu">
                    <li>
                        <a class="classifymg" href="javascript:void(0);"><i class="fa fa-dashboard fa-fw"></i> 分类管理</a>
                    </li>
                </ul>
            </div>
        </div>
        <div id="userList" style="display:none;">
        	<jsp:include page="user.jsp"></jsp:include>
        </div>
        
        <div id="classifyList" style="display:none;">
        	<jsp:include page="classify.jsp"></jsp:include>
        </div>
		<!-- <form  id="seach_form">
	        <div class="input-group" style="width:20%;">
	            <input type="text" id="keyword" name="keyword" class="form-control" placeholder="关键字">
	            <span class="input-group-btn" style="padding:0;">
	                <button class="btn btn-info" type="button"><span class="glyphicon glyphicon-search"></span></button>
	            </span>
	        </div>
        </form> -->
    </div>
    <!-- /#wrapper -->


</body>

</html>
