var dtGridColumns = [{
    id : 'marketId',
    title : '市场代码',
    type : 'string',
    columnClass : 'text-center',
    hideType : 'xs',
    headerStyle : 'background:#438eb9;color:white;'
}, {
    id : 'marketName',
    title : '市场名称',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;',
    resolution : function(value, record, column, grid, dataNo, columnNo) {
    	var html='';
    	html = '<a onclick="option(' + record.marketId + ',2)" style="cursor: pointer;">' + value + '</a>';
    	return html;
    }
}, {
/*	id : 'website',
	title : '官网地址',
	type : 'string',
	columnClass : 'text-center',
	headerStyle : 'background:#438eb9;color:white;'
}, {*/
	id : 'onlineAccount',
	title : '在线开户地址',
	type : 'string',
	columnClass : 'text-center',
	headerStyle : 'background:#438eb9;color:white;'
}, {
	id : 'minLogo',
	title : '小logo图片地址',
	type : 'string',
	columnClass : 'text-center',
	headerStyle : 'background:#438eb9;color:white;',
	hideType : 'sm|xs|md|lg'
}, {
	id : 'maxLogo',
	title : '大logo图片地址',
	type : 'string',
	columnClass : 'text-center',
	headerStyle : 'background:#438eb9;color:white;',
	hideType : 'sm|xs|md|lg'
}, {
	id : 'isShow',
	title : '是否展示',
	type : 'string',
	columnClass : 'text-center',
	headerStyle : 'background:#438eb9;color:white;',
	resolution : function(value, record, column, grid, dataNo, columnNo) {
		if (value == 'Y') {
			return '<span class="label label-sm label-success arrowed arrowed-righ">是</span>';
		} else if (value == 'N') {
			return '<span class="label label-sm label-defalut arrowed arrowed-righ">否</span>';
		}else{
			return '';
		}
	}
},{
	id : 'sortOrder',
	title : '置顶顺序',
	type : 'string',
	columnClass : 'text-center',
	headerStyle : 'background:#438eb9;color:white;',
	resolution : function(value, record, column, grid, dataNo, columnNo) {
		if (online_setTop) {
			return '<a href="javascript:void(0)" onclick="sortOrder('+record.marketId+','+value+')">'+value+'</a>';
		}else{
			return value;
		}
	}
},{
	id : 'inputer',
	title : '录入人',
	type : 'string',
	columnClass : 'text-center',
	headerStyle : 'background:#438eb9;color:white;'
},{
	id : 'edttime',
	title : '录入时间',
	type : 'date',
	format : 'yyyy-MM-dd hh:mm:ss',
	otype : 'string',
	oformat : 'yyyy-MM-dd hh:mm:ss',
	columnClass : 'text-center',
	headerStyle : 'background:#438eb9;color:white;'
},{
	id:'operation', 
	title:'操作', 
	type:'string', 
	columnClass:'text-center', 
	headerStyle : 'background:#438eb9;color:white;', 
	resolution:function(value, record, column, grid, dataNo, columnNo){
	    var content = '';
	    if (online_edit) {
	    	if (record.isShow == "Y") {
	    		content += '<button id="setButton" style="border-radius:5px 5px;"  class="btn btn-xs btn-primary" onclick="setHideOrShow('+record.marketId+',this);"><i class="fa fa-edit"></i>  隐藏</button>';
	    		content += '  ';
	    	}else{
	    		content += '<button id="setButton" style="border-radius:5px 5px;"  class="btn btn-xs btn-primary"  onclick="setHideOrShow('+record.marketId+',this);"><i class="fa fa-edit"></i>  展示</button>';
	    		content += '  ';
	    	}
		}
	    if (online_delete) {
	    	content += '<button id="delButton" style="border-radius:5px 5px;" minLogo="'+record.minLogo+'" maxLogo="'+record.maxLogo+'" class="btn btn-xs btn-danger"  onclick="del('+record.marketId+',this);"><i class="fa fa-trash"></i>  删除</button>';
	    	content += '  ';
		}
	    return content;
    }
}];

//动态设置jqGrid的rowNum
var pageSize = $("#pageSize").val();
pageSize = pageSize == 0 || pageSize == "" ? sys.pageNum : pageSize;

//console.log($("#addButton").attr("attr"));
var dtGridOption = {
    lang : 'zh-cn',
    ajaxLoad : true,
    check : false,
    loadURL : sys.rootPath + '/online/list',
    columns : dtGridColumns,
    gridContainer : 'dtGridContainer',
    toolbarContainer : 'dtGridToolBarContainer',
    tools : '',
    pageSize : pageSize,
    pageSizeLimit : [10, 20, 30]
};

var grid = $.fn.DtGrid.init(dtGridOption);
$(function() {
    if(null != $("#orderByColumn").val() && '' != $("#orderByColumn").val())
    {
        grid.sortParameter.columnId = $("#orderByColumn").val();
        grid.sortParameter.sortType = $("#orderByType").val();
    }
    grid.parameters = new Object();
    grid.load();
    $("#btnSearch").click(customSearch);
    
    //注册回车键事件
    document.onkeypress = function(e){
    var ev = document.all ? window.event : e;
        if(ev.keyCode==13) {
            customSearch();
        }
    };
    
});

/**
 * 自定义查询
 * 这里不传入分页信息，防止禁用记录后重新计算的页码比当前页码小而导致计算异常
 */
function customSearch() {
    grid.parameters = new Object();
    grid.parameters['marketName'] = $("#marketName").val();
    grid.refresh(true);  //列表刷新
}

//添加/编辑
function option(id,op) {
	var url = "";
	var title = "";
	if(op == '1'){
		title = "添加";
		url = sys.rootPath + '/online/add';
	}else if(op == '2'){
		title = "编辑";
		url = sys.rootPath + '/online/edit?marketId='+id;
	}
	layer.open({
	    type: 2,
	    title: title,
	    fix: false, //不固定
	    maxmin: true,
        shadeClose: false, //点击遮罩关闭层
        area : ['1100px' , '500px'],
	    content: url
	  });
}

//展示或隐藏
function setHideOrShow(id,ele){
	layer.confirm("您确定要操作该条记录吗？", {
		icon : 5,
		btn : [ '确定', '取消' ]
	// 按钮
	}, function() {
		var txt = $(ele).text().trim();
		var data;
		if (txt == "展示") {
			data = {"marketId":id,"isShow":"Y"};
		}else{
			data = {"marketId":id,"isShow":"N"};
		}
		update(data);
	});
}

/**
 * 置顶排序操作
 */
function sortOrder(marketId, oldOrder) {
	$("#new_top_order").val(oldOrder);
	// 捕获页
	layer.open({
		type : 1,
		shade : false,
		title : "修改置顶顺序", // 不显示标题
		area : [ "30%", "30%" ],
		btn : [ "修改", "关闭" ],
		btn1 : function() {
			var newOrder = $("#new_top_order").val();
			if(oldOrder==newOrder){
				return;
			}
			var data = {"sortOrder" : newOrder,"marketId" : marketId};
			update(data);
		},
		btn2 : function() {
			layer.close();
		},
		content : $('#sortOrder')
	});
}

function checkNum(ele){
	 var  v = $(ele).val();
	 var reg = new RegExp("^[0-9]{1,3}$");  
	  if(!reg.test(v)){  
		  $(ele).val(1);
		  return;
	  }else if(v<=0){
		  $(ele).val(1);
	  } 
}

//更新属性
function update(data){
	$.ajax({
		url : sys.rootPath  + "/online/updateProperty",
		type : "post",
		data : data ,
		success : function(data) {
			if(data == '1'){
	     		layer.alert("操作成功", function(index){
					//调用父页面刷新方法
					grid.refresh(true);
					layer.closeAll(); 
				});
	   		 }else{
	   			layer.alert("操作失败");
	    	}
		}
	});
}

//删除
function del(id,ele){
	layer.confirm("您确定要删除该条记录吗？", {
		icon : 5,
		btn : [ '确定', '取消' ]
	// 按钮
	}, function() {
		$.ajax({
			url : sys.rootPath + '/online/delete',
			type : "post",
			data : {"marketId" : id,"minLogo" : ele.getAttribute("minLogo"),"maxLogo" : ele.getAttribute("maxLogo")},
			success : function(data) {
				if(data == '1'){
		     		layer.alert("删除成功", function(index){
						//调用父页面刷新方法
						grid.refresh(true);
						layer.closeAll(); 
					});
		   		 }else{
		   			layer.alert("删除失败");
		    	}
			}
		});
	});
}
