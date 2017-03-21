var dtGridColumns = [
		{
			id : 'id',
			title : '编号',
			type : 'number',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;'
		},
		{
			id : 'brokerName',
			title : '经纪商名称',
			type : 'string',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;'
		},
		{
			id : 'marketIds',
			title : '经营市场代码',
			type : 'string',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;'
		},
		{
			id : 'operation',
			title : '操作',
			type : 'string',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;',
			resolution : function(value, record, column, grid, dataNo, columnNo) {
				var str = '';
				str += '<button id="'+record.id+'" class="btn btn-primary btn-sm" style="border-radius:5px 5px;padding:1px 6px;" onclick="updateBroker('+record.id+')">修改</button>';
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
	check : true,
	loadURL : sys.rootPath + '/broker/noninformation/managelist',
	columns : dtGridColumns,
	gridContainer : 'dtGridContainer',
	toolbarContainer : 'dtGridToolBarContainer',
	//tools : 'refresh|export[excel,csv]|print',
	tools : 'refresh',
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
	grid.parameters['pid'] = $("#pid").val();
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
	grid.parameters['searchTerm'] = $("input[name=searchTerm]").val();
	grid.parameters['searchPlate'] = $("#searchPlate").val();
	grid.parameters['pid'] = $("#pid").val();
	grid.refresh(true);
}

//添加
function addBroker(){
	layer.open({
		  type: 2,
		  title:"经纪商添加",
		  shadeClose: false,
		  shade: 0.4,
		   maxmin: true, //开启最大化最小化按钮
		  area: ['50%', '40%'], //宽高
		  content: sys.rootPath + '/broker/noninformation/goAddBroker'
	});
}

//修改
function updateBroker(id){
	layer.open({
		  type: 2,
		  title:"经纪商修改",
		  shadeClose: false,
		  shade: 0.4,
		   maxmin: true, //开启最大化最小化按钮
		  area: ['50%', '40%'], //宽高
		  content: sys.rootPath + '/broker/noninformation/goUpdateBroker?id='+id
	});
}

//删除
function deleteBroker(){
	var records = grid.getCheckedRecords();
	if (records.length == 0) {
		layer.alert("请选择需要删除的行!");
		return;
	}
	var deleteIds = "";
	for ( var i = 0; i < records.length; i++) {
		var record = records[i];
		deleteIds += record.id;
		if (i + 1 < records.length) {
			deleteIds += ",";
		}
	}
	layer.confirm("您确定要删除选中的" + records.length + "条数据吗？", {
		icon : 5,
		btn : [ '确定', '取消' ]
	// 按钮
	}, function() {
		$.ajax({
			url : sys.rootPath + '/broker/noninformation/deleteBroker',
			type : "post",
			data : {
				"brokerIds" : deleteIds
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
