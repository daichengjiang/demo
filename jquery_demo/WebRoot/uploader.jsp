<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>This WebUploader</title>
    <meta http-equiv="X-UA-Compatible" content="IE=8">
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" href="webuploader/css/webuploader.css"/>
	<link rel="stylesheet" href="webuploader/examples/image-upload/style.css"/>
	<script type="text/javascript" src="webuploader/test/jquery-1.10.1.min.js"></script>
	<script type="text/javascript" src="webuploader/dist/webuploader.js"></script>
	<script type="text/javascript" src="webuploader/examples/image-upload/upload.js"></script>
  </head>
  <script type="text/javascript">
  </script>
  <body>
  	<form action="${basePath}/mgr/upload.htm">
  		<div>
  			<span>类型：</span> 
  			<select name="type">
  				<option value="0">请选择</option>
  				<option value="1">随拍</option>
  				<option value="2">人物</option>
  				<option value="3">风光</option>
  			</select>
  		</div>
  		<div>
  			<span>标题：</span> 
  			<textarea rows="" cols="" name="title"></textarea>
  		</div>
  		<div id="wrapper" >
	        <div id="container">
	            <div id="uploader">
	                <div class="queueList">
	                    <div id="dndArea" class="placeholder">
	                        <div id="filePicker" ></div>
	                    </div>
	                </div>
	                <div class="statusBar" style="display:none;">
	                    <div class="progress">
	                        <span class="text">0%</span>
	                        <span class="percentage"></span>
	                    </div><div class="info"></div>
	                    <div class="btns">
	                        <div id="filePicker2"></div><div class="uploadBtn">开始上传</div>
	                    </div>
	                </div>
	            </div>
	        </div>
    	</div>
  	</form>
  </body>
</html>
