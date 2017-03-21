var dtGridColumns = [
		{
			id : 'title',
			title : '标题',
			type : 'string',
			columnClass : 'text-center',
			hideType : 'xs',
			headerStyle : 'background:#00a2ca;color:white;'
		},
		{
			id : 'author',
			title : '作者',
			type : 'string',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;'
		},
		{
			id : 'isSelection',
			title : '是否精选圈子',
			type : 'number',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;width:200px',
			resolution : function(value, record, column, grid, dataNo, columnNo) {
				if (value == 1) {
					return '<span class="label label-sm label-primary arrowed arrowed-righ">精选圈子</span>';
				}else{
					return '';
				}
			}
		},
		{
			id : 'operation',
			title : '操作',
			type : 'string',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;width:200px',
			resolution : function(value, record, column, grid, dataNo, columnNo) {
				var str = '';
				if(record.isSelection == 1){
					str += '<button id="'+record.id+'" class="btn btn-primary btn-sm" style="border-radius:5px 5px;padding:1px 6px;" onclick="addSelectionCircle('+record.id+')" disabled>添加</button>';
				}else{
					str += '<button id="'+record.id+'" class="btn btn-primary btn-sm" style="border-radius:5px 5px;padding:1px 6px;" onclick="addSelectionCircle('+record.id+')">添加</button>';
				}
				if(record.isSelection == 1){
					str += '<button id="'+record.id+'" class="btn btn-danger btn-sm" style="border-radius:5px 5px;padding:1px 6px;" onclick="deleteSelectionCircle('+record.id+')">删除</button>';
				}else{
					str += '<button id="'+record.id+'" class="btn btn-danger btn-sm" style="border-radius:5px 5px;padding:1px 6px;" onclick="deleteSelectionCircle('+record.id+')" disabled>删除</button>';
				}
				return str;
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
	loadURL : sys.rootPath + '/broker/noninformation/selectionCircleList',
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
	grid.parameters['pid'] = $("#pid").val();
	grid.load();

	// $("#btnSearch").click(customSearch);

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

function addSelectionCircle(articleId) {
	layer.confirm("您确定要加入精选圈子吗？", {
		icon : 1,
		btn : [ '确定', '取消' ]
	// 按钮
	}, function() {
		$.ajax({
			url : sys.rootPath + '/broker/noninformation/addSelectionCircle',
			type : "post",
			data : {
				"articleId" : articleId
			},
			success : function(data) {
				if (data) {
					layer.alert("添加成功!", function(index) {
						grid.refresh(true);
						layer.close(index);
					});
				} else {
					layer.alert("添加失败!");
				}
			}
		});

	});
}

function deleteSelectionCircle(articleId) {
	layer.confirm("您确定要删除该精选圈子吗？", {
		icon : 5,
		btn : [ '确定', '取消' ]
	// 按钮
	}, function() {
		$.ajax({
			url : sys.rootPath + '/broker/noninformation/deleteSelectionCircle',
			type : "post",
			data : {
				"articleId" : articleId
			},
			success : function(data) {
				if (data) {
					layer.alert("删除成功!", function(index) {
						grid.refresh(true);
						layer.close(index);
					});
				} else {
					layer.alert("删除失败!");
				}
			}
		});

	});
}