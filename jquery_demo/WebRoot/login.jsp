<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>Login</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	
	<link href="css/style.css" rel='stylesheet' type='text/css' />
	<link href="css/validationEngine.css" rel='stylesheet' type='text/css' />
	
	<!-- Jquery 2.0以上就不再支持IE 6/7/8 -->
  	<script type="text/javascript" src="js/jquery-1.7.1.min.js"></script>
  	<script src="js/jquery.placeholder.js"></script>
  	<script type="text/javascript" src="js/validateEngine/jquery.validationEngine-zh_CN.js"></script>
  	<script type="text/javascript" src="js/validateEngine/jquery.validationEngine.js"></script>
 	<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>
  	<style type="text/css">
  		body{
  			margin:0;
  			padding:0;
  			height:100%;
  			overflow: hidden;
  		}
  		
  		.mask{
  			position:absolute;
	        left:0;
	        top:0;
	        width:100%;
	        height:100%;
	        z-index:20000;
	        opacity:0.5;
	        background-color:gray;
	        display:none;
  		}
  		
  		.message{
  			width:500px;
  			height:300px;
  			display:none;
  			text-align:center;
  			background-color: #eee;
  			z-index:20001;
  			position: absolute;
  			top:50%;
  			left:50%;
  			margin-top:-150px;
  			margin-left:-250px;
  			border-radius:8px 8px 8px 8px;
  		}
  		
  		.close{
  			cursor: pointer;
  		}
  		
  		#username{
  			background: url("images/user1.png") no-repeat 97% ;
  		}
  		
  		#password{
  			background: url("images/lock.png") no-repeat 97% ;
  		}
  		
  	</style>
  </head>
  <script type="text/javascript">
  $(function(){
  		// Invoke the plugin
        $('input, textarea').placeholder();
  		
  		$('#form_id').validationEngine();
  		
  		var message = '${message}';
  		var username = '${username}';
  		if(username != "" && username != null){
  			$("#username").val(username);
  		}
  		
  	  	if(message != ""){
  	  		$(".mask").show();
  	  		$(".message").show();
  	  	}
  	  	$(".close").click(function(){
  	  		message = "";
  	  		$(".mask").hide();
	  		$(".message").hide();
  	  	});
  	  	
  	});
  </script>
<body>
	<div class="mask"></div>
	<div class="message">
		<div style="width:500px;height:30px;color:#21A957;">
			<p style="font-weight: bold;font-size: 20px;text-align:right;line-heigh:30px;margin-top:3px;margin-right:10px;">
				<span class="close">x</span>
			</p>
		</div>
		<div style="height:220px;width:500px;text-algin:center;">
			<p style="height:220px;line-height:220px;">${message }</p>
		</div>
		<div class="submit">
			<input class="close" type="submit" value="取消"  style="width:130px;height:35px;padding:0;"/>
		</div>
	</div> 		
	 <!-----start-main---->
	 <div class="main">
		<div class="login-form">
			<h1>会员登录</h1>
					<div class="head">
						<img src="${basePath}images/user.png" alt=""/>
					</div>
					<form action="${basePath}user/login.htm" method="post" id="form_id">
					<!-- <div id = form_id> -->
						 <div style="height:44px;margin-bottom: 20px;">
						 	<input id="username" name="username" type="text" class="validate[required]" placeholder="用户名" />
						 </div>
						 <div  style="height:44px;margin-bottom: 20px;">
						 	<input id="password" name="password" type="password" class="validate[required]" placeholder="密码"/>
						 </div>
						<div class="submit">
							<input type="submit" value="登录" >
					</div>	
					<p><a href="#">忘记密码</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="${basePath}user/forwardRegister.htm" >注册</a></p>
				</form>
				<!-- </div> -->
			</div>
			<!--//End-login-form-->
			 <!-----start-copyright---->
   					<div class="copy-right">
						<p>Copyright &copy; 2014.Company name All rights reserved.</p> 
					</div>
				<!-----//end-copyright---->
		</div>
			 <!-----//end-main---->
</body>
</html>