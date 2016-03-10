<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>AutoComplete</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">

    <link href="bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
	<link href="css/jquery.autocomplete.css" rel="stylesheet" type="text/css">
	<%-- <script src="js/jquery-1.6.min.js"></script> --%>
	<script src="js/jquery-1.8.3.min.js"></script>
	<!-- jquery2.0以上版本，已经不支持ie 6、7、8 -->
	<%-- <script src="js/jquery-2.2.0.min.js"></script> --%>
	<script src="js/jquery.autocomplete.js"></script>
  </head>
  <script type="text/javascript">
  	$(function(){
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
						data:d[i],		//每条数据对象
						value:d[i],		//与输入的值比较的数据  
						result:d[i]		//选中的实际数据 
					};
				}
					return rows;
				},
				formatItem: function(row,i,n) {
					return row;
				}
			}).result(function(event, data, formatted) {
				
			});
  		});
  </script>
  <body>
  <div style="width:100%;">
  	<div style="margin:10px auto;width:660px;">
  		<h3>AutoComplete自动完成插件</h3>
  		<h5>AutoComplete依赖JQuery版本：1.2.6 ~ 1.8.3（目前该插件已停止更新，后续版本已整合到jQuery UI）</h5>
  	</div>
	  <div style="margin:30px auto;width:660px;">
	   	<form  id="seach_form">
	        <div class="input-group" style="width:20%;">
	            <input type="text" id="keyword" name="keyword" class="form-control" placeholder="搜索关键字" style="width:200px;">
	            <span class="input-group-btn" style="padding:0;">
	                <button class="btn btn-info" type="button"><span class="glyphicon glyphicon-search"></span></button>
	            </span>
	        </div>
        </form>
	    </div>
	    
	    <div>
	    	<pre>
	    		使用方法：
	    				引入所需js及css文件
						1.&lt;link rel="stylesheet" href="jquery.autocomplete.css" type="text/css" /&gt; 
						2.&lt;script type="text/javascript" src="jquery.js"&gt; &lt;/script&gt;   
						3.&lt;script type="text/javascript" src="jquery.autocomplete.js"&gt; &lt;/script&gt; 
	    			
			  		autocomplete( url or data, [options] )
			  		   第一个参数可以是数组或者url。options参数比较复杂：
			  		   
			  		具体options参数列表：
			  		* minChars (Number):
			  		    在触发autoComplete前用户至少需要输入的字符数.Default: 1，如果设为0，在输入框内双击或者删除输入框内内容时显示列表
			  		    
			  		* width (Number):
			  		    指定下拉框的宽度. Default: input元素的宽度
			  		    
			  		* max (Number):
			  		    autoComplete下拉显示项目的个数.Default: 10
			  		    
			  		* delay (Number):
			  		    击键后激活autoComplete的延迟时间(单位毫秒).Default: 远程为400 本地10
			  		    
			  		* autoFill (Boolean):
			  		    要不要在用户选择时自动将用户当前鼠标所在的值填入到input框. Default: false
			  		    
			  		* mustMatch (Booolean):
			  		    如果设置为true,autoComplete只会允许匹配的结果出现在输入框,所有当用户输入的是非法字符时将会得不到下拉框.Default: false
			  		    
			  		* matchContains (Boolean):
			  		    决定比较时是否要在字符串内部查看匹配,如ba是否与foo bar中的ba匹配.使用缓存时比较重要.不要和autofill混用.Default: false
			  		    
			  		* selectFirst (Boolean):
			  		    如果设置成true,在用户键入tab或return键时autoComplete下拉列表的第一个值将被自动选择,尽管它没被手工选中(用键盘或鼠标).
			  		    当然如果用户选中某个项目,那么就用用户选中的值. Default: true
			  		    
			  		* cacheLength (Number):
			  		    缓存的长度.即对从数据库中取到的结果集要缓存多少条记录.设成1为不缓存.Default: 10
			  		    
			  		* matchSubset (Boolean):
			  		    autoComplete可不可以使用对服务器查询的缓存,如果缓存对foo的查询结果,那么如果用户输入foo就不需要再进行检索了,直接使用缓存.
			  		    通常是打开这个选项以减轻服务器的负担以提高性能.只会在缓存长度大于1时有效.Default: true
			  		    
			  		* matchCase (Boolean):
			  		    比较是否开启大小写敏感开关.使用缓存时比较重要.如果你理解上一个选项,这个也就不难理解,就好比foot要不要到FOO的缓存中去找.Default: false
			  		    
			  		* multiple (Boolean):
			  		    是否允许输入多个值即多次使用autoComplete以输入多个值. Default: false
			  		    
			  		* multipleSeparator (String):
			  		    如果是多选时,用来分开各个选择的字符. Default: ","
			  		    
			  		* scroll (Boolean):
			  		    当结果集大于默认高度时是否使用卷轴显示 Default: true
			  		    
			  		* scrollHeight (Number):
			  		    自动完成提示的卷轴高度用像素大小表示 Default: 180 
			  		    
			  		* formatItem (Function):
			  		    为每个要显示的项目使用高级标签.即对结果中的每一行都会调用这个函数,返回值将用LI元素包含显示在下拉列表中. 
			  		    Autocompleter会提供三个参数(row, i, max): 返回的结果数组, 当前处理的行数(即第几个项目,是从1开始的自然数), 当前结果数组元素的个数即项目的个数. 
			  		    Default: none, 表示不指定自定义的处理函数,这样下拉列表中的每一行只包含一个值.
			
			  		* formatResult (Function):
			  		    和formatItem类似,但可以将将要输入到input文本框内的值进行格式化.
			  		    同样有三个参数,和formatItem一样.Default: none,表示要么是只有数据,要么是使用formatItem提供的值.
			
			  		* formatMatch (Function):
			  		    对每一行数据使用此函数格式化需要查询的数据格式. 返回值是给内部搜索算法使用的. 参数值row
			
			  		* extraParams (Object):
			  		    为后台(一般是服务端的脚本)提供更多的参数.和通常的作法一样是使用一个键值对对象.
			  		    如果传过去的值是{ bar:4 },将会被autocompleter解析成my_autocomplete_backend.php?q=foo&bar=4 (假设当前用户输入了foo). Default: {}
			
			  		* result (handler) Returns: jQuery
			  		    此事件会在用户选中某一项后触发，参数为：
			  		    event: 事件对象. event.type为result.
			  		    data: 选中的数据行.
			  		    formatted:formatResult函数返回的值
			  		    例如：
			  		    $(“#singleBirdRemote”).result(function(event, data, formatted) {
			  				//如选择后给其他控件赋值，触发别的事件等等
			  			}); 
			  			
 			注意事项：
				1.依赖jQuery最高只能到1.8.3版本，原因：新版本的jQuery去掉了$.browser方法，导致该插件不能正常使用。
				如需使用高版本jQuery，可以在jquery.autocomplete.js源码的最上方添加$.browser =navigator.userAgent;这行代码
										
				2.IE7、8下内容超出设定高度不显示滚动条问题，解决方法：
				修改jQuery.autocomplete.js第738行代码if($.browser.msie && typeof document.body.style.maxHeight === "undefined") {
				中typeof document.body.style.maxHeight === "undefined"
				为((typeof document.body.style.maxHeight === "undefined") || (document.body.style.maxHeight == '')) 
											
				3.在使用远程地址时，它默认传入的参数是：q（输入值），limit（返回结果的最大值），可以使用extraParams传入其他的参数。
				所以后台获取输入框的值时可以使用request.getParameter("q");
											
				4.autocomplete在使用ajax传递参数时，默认使用了get方式传递，而get提交中文会默认以ISO8859-1编码传递到后台，后台直接获取时会出现乱码问题。
				解决办法：后台获取时使用new String(request.getParameter(“q”).getBytes(“iso8859-1”),“utf-8”)方式解码。
				
				5.必须自己重写parse方法，原因：看源码可以发现默认是以\n和|处理json数据，所以会导致解析不了。
				重写示例：
				parse: function(data){
					var rows = [];
					var d = data;
					for(var i=0; i&lt;d.length; i++){
						rows[rows.length] = {
							data:d[i],		//每条数据对象
							value:d[i],		//与输入的值比较的数据  
							result:d[i]		//选中的实际数据 
						};
					}
					return rows;
				}
			  			
	    	</pre>
	    
	    </div>
	    
    </div>
  </body>
</html>
