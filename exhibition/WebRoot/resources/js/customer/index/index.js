$(function() {
    $("[nav-menu]").each(function() {
        $(this).bind("click", function() {
            var nav = $(this).attr("nav-menu");
            var sn = nav.split(",");
            if(sn[sn.length-1] == '/sirona' || sn[sn.length-1] == '/druid')
            {
                window.open(sys.rootPath + sn[sn.length - 1]);
                
                //处理目录类型的点击事件
                $(this).parent("li").siblings().find("ul.nav-show").removeClass('nav-show').addClass('nav-hide').attr('style','display:none');
                //处理菜单类型的点击事件
                $(this).parent().parent().parent("li").siblings().find("ul.nav-show").removeClass('nav-show').addClass('nav-hide').attr('style','display:none');
                $("ul.nav-list").find("li.active").removeClass("active").removeClass('open');
                $(this).parent().addClass("active").parent().parent("li").addClass('active open');
                
                //清除用户信息菜单样式
                $(".user-menu").find('li').each(function() {
                    $(this).removeClass('active');
                });
                
            }else
            {
            
            var breadcrumb = '<li><i class="ace-icon fa fa-home home-icon"></i><a href="javascript:init();">首页</a></li>';
            for (var i = 0; i < sn.length - 1; i++) {
                breadcrumb += '<li class="active">' + sn[i] + '</li>';
            }
            
           /* //设置面包屑内容
            $(".breadcrumb").html(breadcrumb);
            //加载页面
            $(".page-content").load(sys.rootPath + sn[sn.length - 1]);
            //处理目录类型的点击事件
            $(this).parent("li").siblings().find("ul.nav-show").removeClass('nav-show').addClass('nav-hide').attr('style','display:none');
            //处理菜单类型的点击事件
            $(this).parent().parent().parent("li").siblings().find("ul.nav-show").removeClass('nav-show').addClass('nav-hide').attr('style','display:none');
            $("ul.nav-list").find("li.active").removeClass("active");
            $(this).parent().addClass("active").parent().parent("li").addClass('active open');*/
            
            if(sn[sn.length-1] != ""){
                //设置面包屑内容
               $(".breadcrumb").html(breadcrumb);
               //加载页面
               $(".page-content").load(sys.rootPath + sn[sn.length - 1]);
           }
          
           //处理目录类型的点击事件
          // $(this).parent("li").siblings().find("ul.nav-show").removeClass('nav-show').addClass('nav-hide').attr('style','display:none');
           //处理菜单类型的点击事件
          // if($(this).parent().parent().parent("li").find("ul.nav-show").find("ul.submenu").css("display")=="block"){
    	   if($(this).parent().next("ul.submenu").css("display")=="block"){
        	   
        	   //$(this).parent().parent().parent("li").find("ul.nav-show").removeClass('nav-show').addClass('nav-hide');//.find("ul.submenu").attr('style','display:none');
               
               $(this).parent().next("ul.submenu").attr("style",'display:none');
               $(this).parent("li.active").removeClass("active");
               //$("ul.nav-list").find("li.active").removeClass("active");
           }else{
               //$(this).parent().parent().parent("li").find("ul.nav-hide").removeClass('nav-hide').addClass('nav-show');//.find("ul.submenu").attr('style','display:block');
        	   $(this).parent().next("ul.submenu").attr("style",'display:block');
               
           }
           
           $("ul.nav-list").find("ul.nav-show").find("li.active").removeClass("active");
           $(this).parent().addClass("active");//.parent().parent("li").addClass('active open');
            
            //清除用户信息菜单样式
            $(".user-menu").find('li').each(function() {
                $(this).removeClass('active');
            }); 
            
            }
            
        });
    });

    $("#ace-settings-navbar").click();
    $("#ace-settings-sidebar").click();
    //$("#ace-settings-breadcrumbs").click();
    /*$("html").niceScroll({
        cursorborderradius : "5px",
        cursorwidth:10
    });*/
    
    $(".user-menu").find('li').each(function() {
      $(this).bind('click', function() {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
      });
    });
    
});

function init() {
    $(".page-content").load(sys.rootPath + "/welcome.jsp");
    $(".breadcrumb").html('<li><i class="ace-icon fa fa-home home-icon"></i><a href="javascript:init();">首页</a></li>');
}

//监听浏览器窗口大小变化
/*$(window).resize(function() {
    $("html").getNiceScroll().resize();
});*/



/**
 *加载非菜单展示页面
 * @param nav 待加载的资源URL
 */
function loadPage(nav) {
    //加载页面
    $(".page-content").load(sys.rootPath + nav);
}


/**
 * 页面内操作 调用此方法
 * @param url
 */
function gopages(url){
	  $(".page-content").load(url);
}

