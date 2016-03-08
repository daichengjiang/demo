<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>Register</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	
	<link href="css/style.css" rel='stylesheet' type='text/css' />
	<link href="css/validationEngine.css" rel='stylesheet' type='text/css' />
  	<style type="text/css">
  		body{
  			margin:0;
  			padding:0;
  			height:100%;
  			overflow: hidden;
  		}
  		
  		#username{
  			background: url("images/user1.png") no-repeat 97% ;
  		}
  		
  		#password{
  			background: url("images/lock.png") no-repeat 97% ;
  		}
  		
  		#phone{
  			background: url("images/phone.png") no-repeat 97% ;
  		}
  		
  		#email{
  			background: url("images/message.png") no-repeat 97% ;
  		}
  		
  	</style>
  </head>
<body>
	 <!-----start-main---->
	 <div class="main">
		<div class="login-form">
			<h1>会员注册</h1>
					<div class="head">
						<img src="${basePath}images/user.png" alt=""/>
					</div>
					<form action="${basePath}user/register.htm" method="post" id="form_id" >
						 <div style="height:44px;margin-bottom: 20px;">
						 	<input id="username" name="user.username" type="text" class="validate[required,custom[onlyLetterNumber],ajax[checkIsExist]]" placeholder="用户名" />
						 </div>
						 <div  style="height:44px;margin-bottom: 20px;">
						 	<input id="password" name="user.password" type="password" class="validate[required,minSize[6],custom[onlyLetterNumber]]" placeholder="密码" />
						 </div>
						 <div  style="height:44px;margin-bottom: 20px;">
						 	<input id="phone" name="user.phone" type="text" class="validate[required,custom[phone],ajax[checkIsExist]]" placeholder="电话" />
						 </div>
						 <div  style="height:44px;margin-bottom: 20px;">
						 	<input id="email" name="user.email" type="text" class="validate[required,custom[email],ajax[checkIsExist]]" placeholder="邮箱" />
						 </div>
						<div class="submit">
							<input type="submit" value="注册" id="submit">
							<p><a href="${basePath}user/forwardLogin.htm" >已有账号，现在登录</a></p>
					</div>	
				</form>
			</div>
			<!--//End-login-form-->
			 <!-----start-copyright---->
   					<div class="copy-right">
						<p>Copyright &copy; 2014.Company name All rights reserved.</p> 
					</div>
				<!-----//end-copyright---->
		</div>
			 <!-----//end-main---->
	
	<script type="text/javascript" src="js/jquery-1.7.1.min.js"></script>
	<script src="js/jquery.placeholder.js"></script>
  	<script type="text/javascript" src="js/validateEngine/jquery.validationEngine-zh_CN.js"></script>
  	<script type="text/javascript" src="js/validateEngine/jquery.validationEngine.js"></script>
 	<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>		 
	<script type="text/javascript">
	jQuery(function(){
			// Invoke the plugin
	        $('input, textarea').placeholder();
			
			  $('#form_id').validationEngine({
			    relative : true,
				ajaxFormValidation : true,
				ajaxFormValidationMethod : 'post',
				ajaxFormValidationURL : "ajaxcheck/checkForm.htm",
				onAjaxFormComplete : ajaxValidationCallback,
				onBeforeAjaxFormValidation : beforeCall
			  });
			// This method is called right before the ajax form validation request
				// it is typically used to setup some visuals ("Please wait...");
				// you may return a false to stop the request 
				function beforeCall(form, options){
					 console.log('--------------------------------------');
				  if(window.console){
				    console.log('Right before the AJAX form validation call');
				  };
				  return true;
				};
				  
				// Called once the server replies to the ajax form validation request
				function ajaxValidationCallback(status, form, json, options){
				  if(window.console){
				    console.log(status);
				  };
				  console.log('-----------------'+status+'---------------------');  
				  if(status === true){
					  form.validationEngine('detach');
					  $('#form_id').submit();
				    // uncomment these lines to submit the form to form.action
				    // form.validationEngine('detach');
				    // form.submit();
				    // or you may use AJAX again to submit the data
				  }
				};
		});
	</script>
</body>
</html>