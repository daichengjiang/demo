var dtGridColumns = [
{
	id : 'menuId',
	title : '菜单代码',
	type : 'number',
	columnClass : 'text-center',
	headerStyle : 'background:#00a2ca;color:white;'
},
{
	id : 'menuName',
	title : '菜单名称',
	type : 'string',
	columnClass : 'text-center',
	headerStyle : 'background:#00a2ca;color:white;'
},
{
	id : 'type',
	title : '类型',
	type : 'number',
	columnClass : 'text-center',
	headerStyle : 'background:#00a2ca;color:white;',
	resolution : function(value, record, column, grid, dataNo, columnNo) {
		if (value == 1) {
			return '<span class="label label-sm label-success arrowed arrowed-righ">快捷入口</span>';
		} else if (value == 2) {
			return '<span class="label label-sm label-info arrowed arrowed-righ">精品推荐</span>';
		}
	}
},
{
	id : 'operation',
	title : '操作',
	type : 'string',
	columnClass : 'text-center',
	headerStyle : 'background:#00a2ca;color:white;',
	resolution : function(value, record, column, grid, dataNo, columnNo) {
		var str = '';
		str += '<button id="'+record.menuId+'" class="btn btn-danger btn-sm" style="border-radius:5px 5px;padding:1px 6px;" onclick="deleteWebMap('+record.menuId+')">删除</button>';
		return str;
	}
}
];

// 动态设置jqGrid的rowNum
var pageSize = $("#pageSize").val();
pageSize = pageSize == 0 || pageSize == "" ? sys.pageNum : pageSize;

// 列表属性设置
var dtGridOption = {
	lang : 'zh-cn',
    ajaxLoad : true,
    check : false,
	loadURL : sys.rootPath + '/otherinfo/webmaplist',
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

//添加
function addWebMap(){
	layer.open({
		  type: 2,
		  title:"网站地图添加",
		  shadeClose: false,
		  shade: 0.4,
		   maxmin: true, //开启最大化最小化按钮
		  area: ['60%', '40%'], //宽高
		  content: sys.rootPath + '/otherinfo/goaddwebmap'
	});
}

//修改
function updateAboutUs(id){
	layer.open({
		  type: 2,
		  title:"关于我们修改",
		  shadeClose: false,
		  shade: 0.4,
		   maxmin: true, //开启最大化最小化按钮
		  area: ['70%', '80%'], //宽高
		  content: sys.rootPath + '/otherinfo/goupdateaboutus?id='+id
	});
}

//删除
function deleteWebMap(id){
	layer.confirm("您确定要执行操作吗？", {
		icon : 5,
		btn : [ '确定', '取消' ]
	// 按钮
	}, function() {
		$.ajax({
			url : sys.rootPath + '/otherinfo/deleteWebMap',
			type : "post",
			data : {
				"id" : id
			},
			success : function(data) {
				data = JSON.parse(data);
				layer.alert(data, function(index) {
					grid.refresh(true);
					layer.close(index);
				});
			}
		});
	});
}

