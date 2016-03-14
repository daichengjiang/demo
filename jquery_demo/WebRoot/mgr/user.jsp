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
	
    <title>用户管理</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">

    <link href="bower_components/bootstrap-table/bootstrap-table.css" rel="stylesheet">

    <script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="bower_components/bootstrap-table/bootstrap-table.js"></script>
    <script src="bower_components/bootstrap-table/bootstrap-table-export.js"></script>
    <script src="bower_components/extends/tableExport/jquery.base64.js"></script>
    <script src="bower_components/extends/tableExport/tableExport.js"></script>
</head>
<script type="text/javascript">
		$(function () {
			
			//分页数据
			$('#userTable').bootstrapTable({
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
				$('#userTable').bootstrapTable('resetView');
			});
		});
		
	</script>
<body>

    <div id="wrapper">
		<div id="content-body" style="width:78%;float:right;">
			<ol class="breadcrumb">
			  <li><a href="#">用户管理</a></li>
			  <li class="active">用户列表</li>
			</ol>
			<div id="reportTableDiv" class="span10">
				<table id="userTable">
				</table>
			</div>
		</div>
    </div>
    <!-- /#wrapper -->


</body>

</html>
