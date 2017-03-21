var dtGridColumns = [
{
	id : 'id',
	title : '序号',
	type : 'number',
	columnClass : 'text-center',
	hideType : 'xs',
	headerStyle : 'background:#00a2ca;color:white;'
},
{
	id : 'title',
	title : '标题',
	type : 'string',
	columnClass : 'text-center',
	headerStyle : 'background:#00a2ca;color:white;',
	resolution : function(value, record, column, grid, dataNo, columnNo) {
		var content ='';
		content+='<a onclick="option(' + record.id + ',2)" style="cursor: pointer;">' + value + '</a>';
		return content;
	}
},
{
	id : 'author',
	title : '作者',
	type : 'string',
	columnClass : 'text-center',
	headerStyle : 'background:#00a2ca;color:white;',
	hideType : 'sm|xs|md|lg'
},
{
	id : 'source',
	title : '来源',
	type : 'string',
	columnClass : 'text-center',
	headerStyle : 'background:#00a2ca;color:white;',
	hideType : 'sm|xs|md|lg'
},
{
	id : 'simpleIntroduce',
	title : '简述',
	type : 'string',
	columnClass : 'text-center',
	headerStyle : 'background:#00a2ca;color:white;width:15%;',
	hideType : 'sm|xs|md|lg'
},
{
	id : 'simpleImageUrl',
	title : '图片路径',
	type : 'string',
	columnClass : 'text-center',
	headerStyle : 'background:#00a2ca;color:white;width:15%;',
	hideType : 'sm|xs|md|lg'
},
{
	id : 'link',
	title : '跳转链接',
	type : 'string',
	columnClass : 'text-center',
	headerStyle : 'background:#00a2ca;color:white;width:15%;',
	hideType : 'sm|xs|md|lg'
},
{
	id : 'menuId',
	title : '所属板块',
	type : 'number',
	codeTable : {100000:'首页',200000:'邮币卡',300000:'投资品',400000:'大宗商品',500000:'经纪商',600000:'财经',700000:'交易所',800000:'独家',110000:'行情',120000:'新品',500300:'圈子'},
	columnClass : 'text-center',
	headerStyle : 'background:#00a2ca;color:white;width:15%;',
	hideType : 'sm|xs'
},
{
	id : 'seq',
	title : '是否展示',
	type : 'number',
	columnClass : 'text-center',
	headerStyle : 'background:#00a2ca;color:white;',
	hideType : 'sm|xs|md',
	resolution : function(value, record, column, grid, dataNo, columnNo) {
		if (value == 0) {
			return '<span class="label label-sm label-success arrowed arrowed-righ">是</span>';
		} else if (value == 1) {
			return '<span class="label label-sm label-danger arrowed arrowed-righ">否</span>';
		}
	}
},
{
	id : 'disabled',
	title : '是否启用链接',
	type : 'number',
	columnClass : 'text-center',
	headerStyle : 'background:#00a2ca;color:white;',
	hideType : 'sm|xs|md',
	resolution : function(value, record, column, grid, dataNo, columnNo) {
		if (value == 2) {
			return '<span class="label label-sm label-danger arrowed arrowed-righ">否</span>';
		} else if (value == 1) {
			return '<span class="label label-sm label-success arrowed arrowed-righ">是</span>';
		}
	}
},
/*{
	id : 'status',
	title : '状态',
	type : 'number',
	columnClass : 'text-center',
	headerStyle : 'background:#00a2ca;color:white;',
	hideType : 'sm|xs|md',
	resolution : function(value, record, column, grid, dataNo, columnNo) {
		if (value == 0) {
			return '<span class="label label-sm label-success arrowed arrowed-righ">正常</span>';
		} else if (value == 1) {
			return '<span class="label label-sm label-danger arrowed arrowed-righ">删除</span>';
		}
	}
},*/
{
	id : 'poster',
	title : '发布人',
	type : 'string',
	columnClass : 'text-center',
	headerStyle : 'background:#00a2ca;color:white;',
	hideType : 'sm|xs|md'
},
{
	id : 'createTime',
	title : '创建时间',
	type : 'date',
	format : 'yyyy-MM-dd hh:mm:ss',
	otype : 'string',
	oformat : 'yyyy-MM-dd hh:mm:ss',
	columnClass : 'text-center',
	headerStyle : 'background:#00a2ca;color:white;',
	hideType : 'sm|xs|md'
},
{
	id : 'modifyTime',
	title : '修改时间',
	type : 'date',
	format : 'yyyy-MM-dd hh:mm:ss',
	otype : 'string',
	oformat : 'yyyy-MM-dd hh:mm:ss',
	columnClass : 'text-center',
	headerStyle : 'background:#00a2ca;color:white;',
	hideType : 'sm|xs|md',
	resolution : function(value, record, column, grid, dataNo, columnNo) {
		if (value == null) {
			return '';
		} else {
			return value;
		}
	}
},
{
	id : 'operation',
	title : '操作',
	type : 'string',
	columnClass : 'text-center',
	headerStyle : 'background:#00a2ca;color:white;min-width:50px',
	resolution : function(value, record, column, grid, dataNo, columnNo) {
		var content = '';
		if (banner_delete) {
			content += '<button id="delButton" class="btn btn-xs btn-danger" imgurl = "'
				+record.simpleImageUrl 
				+ '" onclick="del('
				+ record.id
				+ ',this'
				
				+')"><i class="fa fa-trash"></i>  删除</button>';
			content += '  ';
		}else{
			content +="--";
		}
		return content;
	}
}];

// 动态设置jqGrid的rowNum
var pageSize = $("#pageSize").val();
pageSize = pageSize == 0 || pageSize == "" ? sys.pageNum : pageSize;

// 列表属性设置
var dtGridOption = {
	lang : 'zh-cn',
    ajaxLoad : true,
    check : false,
	loadURL : sys.rootPath + '/banner/list.html',
	columns : dtGridColumns,
	gridContainer : 'dtGridContainer',
	toolbarContainer : 'dtGridToolBarContainer',
	tools : 'refresh|export[excel,csv]|print',
	pageSize : pageSize,
	pageSizeLimit : [ 10, 20, 30 ]
};
// 初始化列表
var grid = $.fn.DtGrid.init(dtGridOption);

$(function() {
	if (null != $("#orderByColumn").val() && '' != $("#orderByColumn").val()) {
		grid.sortParameter.columnId = $("#orderByColumn").val();
		grid.sortParameter.sortType = $("#orderByType").val();
	}
	grid.parameters = new Object();
	grid.load();

	$("#btnSearch").click(customSearch);

	// 注册回车键事件
	document.onkeypress = function(e) {
		var ev = document.all ? window.event : e;
		if (ev.keyCode == 13) {
			customSearch();
		}
	};

});

/**
 * 自定义查询 这里不传入分页信息，防止删除记录后重新计算的页码比当前页码小而导致计算异常
 */
function customSearch() {
	grid.parameters = new Object();
	grid.parameters['keyword'] = $("#keyword").val();
	grid.parameters['menuId'] = $("#menuId").val();
	grid.refresh(true);
}

//添加/编辑
function option(id,op) {
	var url = "";
	var title = "";
	if(op == '1'){
		title = "添加";
		url = sys.rootPath + '/banner/add';
	}else if(op == '2'){
		title = "编辑";
		url = sys.rootPath + '/banner/edit?id='+id;
	}
	layer.open({
	    type: 2,
	    title: title,
	    fix: false, //不固定
	    maxmin: true,
        shadeClose: false, //点击遮罩关闭层
        area : ['1200px' , '800px'],
	    content: url
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
			url : sys.rootPath + '/banner/delete',
			type : "post",
			data : {"id" : id,"simpleImageUrl" : ele.getAttribute("imgurl")},
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

