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
	
    <title>Admin</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">

    <link href="bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="bower_components/bootstrap-table/bootstrap-table.css" rel="stylesheet">
    <link href="bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="css/jquery.autocomplete.css" rel="stylesheet" type="text/css">

	<script src="js/jquery-1.6.min.js"></script>
	<script src="js/jquery.placeholder.js"></script>
    <script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="bower_components/bootstrap-table/bootstrap-table.js"></script>
    <script src="bower_components/bootstrap-table/bootstrap-table-export.js"></script>
    <script src="bower_components/extends/tableExport/jquery.base64.js"></script>
    <script src="bower_components/extends/tableExport/tableExport.js"></script>
    
    <script src="js/jquery.autocomplete.js"></script>
    
</head>
<script type="text/javascript">
		$(function () {
	        // Invoke the plugin
	        $('input, textarea').placeholder();
			
			//分页数据
			$('#reportTable').bootstrapTable({
				method: 'post',//请求方式
				url: '${basePath}user/userList.htm',//请求URL地址
				cache: false,//不缓存				
				height: 540,//设置高度，会启用固定表头的特性
				striped: true,//隔行加亮
				pagination: true,//开启分页功能
				pageSize: 10,//设置默认分页为 5
				pageNumber:1,//设置默认页码为1
				pageList: [10, 20, 50, 100, 200, 500],//自定义分页列表
				search: true,//开启搜索功能
				showColumns: true,//开启自定义列显示功能
				showRefresh: true,//开启刷新功能
				clickToSelect: true,//单击行即可以选中
				sortName: 'username', // 设置默认排序为 username
			    sortOrder: 'desc', // 设置排序为反序 desc
			    smartDisplay: true, // 智能显示 pagination 和 cardview 等
				columns: [{ // 列设置
			        field: 'state',
			        checkbox: true // 使用复选框
			    },{
					field:"username",
					title:"用户名",
					align:"center",
					valign:"middle",
					sortable:"true"
				}, {
					field:"password",
					title:"密码",
					align:"center",
					valign:"middle",
					sortable:"false"
				},{
					field:"phone",
					title:"手机号",
					align:"center",
					valign:"middle",
					sortable:"true"
				},{
					field:"email",
					title:"邮箱",
					align:"center",
					valign:"middle",
					sortable:"true"
				},{
					field:"status",
					title:"状态",
					align:"center",
					valign:"middle",
					sortable:"true"
				},{
					field:"create_time",
					title:"创建时间",
					align:"center",
					valign:"middle",
					sortable:"true"
				}],
				onPageChange: function (size, number) {
					//$("#pageSizeInput").val(size);
					//$("#pageNumberInput").val(number);
					
					//var form = $('#tableForm');
					//form.action= '${base}/showReport';
					//form.submit();
                },
				//onSort: function (name, order) {
               // },
				//formatShowingRows: function (pageFrom, pageTo, totalRows) {
				//	return '';
               // },
				//formatRecordsPerPage: function () {
				//	return '';
              //  },
                formatNoMatches: function(){
                	return '无符合条件的记录';
                }
			});
								
			$(window).resize(function () {
				$('#reportTable').bootstrapTable('resetView');
			});
			
			//自动完成插件使用
			$("#keyword").autocomplete("user/seach.htm", {
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
                    <a class="dropdown-toggle" href="#">
                        <i class="fa fa-envelope fa-fw"></i><i class="fa fa-caret-down"></i>
                    </a>
                </li>
                <li class="dropdown">
                    <a class="dropdown-toggle" href="#">
                        <i class="fa fa-tasks fa-fw"></i>  <i class="fa fa-caret-down"></i>
                    </a>
                </li>
                <li class="dropdown">
                    <a class="dropdown-toggle" href="#">
                        <i class="fa fa-bell fa-fw"></i>  <i class="fa fa-caret-down"></i>
                    </a>
                </li>
                <li class="dropdown">
                    <a class="dropdown-toggle" href="#">
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
                        <a href="${basePath}pages/autocomplete.jsp"><i class="fa fa-dashboard fa-fw"></i> AutoComplete</a>
                    </li>
                </ul>
                 <ul class="nav" id="side-menu">
                    <li>
                        <a href="${basePath}pages/autocomplete.jsp"><i class="fa fa-dashboard fa-fw"></i> WebUploader</a>
                    </li>
                </ul>
            </div>
        </div>
		<div id="content-body" style="width:78%;float:right;">
			<span>用户管理   > 用户列表</span>
			<div id="reportTableDiv" class="span10">
				<table id="reportTable">
				</table>
			</div>
		</div>
		<form  id="seach_form">
	        <div class="input-group" style="width:20%;">
	            <input type="text" id="keyword" name="keyword" class="form-control" placeholder="关键字">
	            <span class="input-group-btn" style="padding:0;">
	                <button class="btn btn-info" type="button"><span class="glyphicon glyphicon-search"></span></button>
	            </span>
	        </div>
        </form>
    </div>
    <!-- /#wrapper -->


</body>

</html>
