var dtGridColumns = [
		{
			id : 'seq',
			title : '序号',
			type : 'number',
			columnClass : 'text-center',
			hideType : 'xs',
			headerStyle : 'background:#00a2ca;color:white;',
			resolution : function(value, record, column, grid, dataNo, columnNo) {
				return dataNo + 1;
			}
		},
		{
			id : 'commentUserName',
			title : '评论用户名',
			type : 'string',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;'
		},
		{
			id : 'title',
			title : '公告标题',
			type : 'string',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;width:200px'
		},
		{
			id : 'commentTime',
			title : '评论时间',
			type : 'date',
			format : 'yyyy-MM-dd hh:mm:ss',
			otype : 'string',
			oformat : 'yyyy-MM-dd hh:mm:ss',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;width:200px',
			hideType : 'sm|xs'
		},
		{
			id : 'status',
			title : '状态',
			type : 'number',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;',
			hideType : 'sm|xs',
			resolution : function(value, record, column, grid, dataNo, columnNo) {
				if (value == 2) {
					return '<span class="label label-sm label-success arrowed arrowed-righ">已审核通过</span>';
				} else if (value == 3) {
					return '<span class="label label-sm label-warning arrowed arrowed-righ">已审核驳回</span>';
				} else if (value == 1) {
					return '<span class="label label-sm label-info arrowed arrowed-righ">未审核</span>';
				}
			}
		},
		{
			id : 'commentContent',
			title : '评论详情',
			type : 'String',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;',
			hideType : 'sm|xs|lg'
		}
			 
			 ,
		{
			id : 'operation',
			title : '操作',
			type : 'string',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;width:180px',
			resolution : function(value, record, column, grid, dataNo, columnNo) {
				var content = '';
				if (commentAudit && record.status == 1) {
					content += '<button id="auditButton" class="btn btn-xs btn-info" attr="'
							+ record.commentId
							+ '" onclick="auditComment('
							+ record.commentId
							+ ')"><i class="fa fa-edit"></i> 审核</button>';
					content += ' ';
				}
				if (commentAudit && record.status != 1) {
					content += '<button id="auditButton" disabled class="btn btn-xs btn-info" attr='
							+ record.commentId
							+ '"><i class="fa fa-edit"></i> 已审</button>';
					content += ' ';
				}
				if (commentDelete) {
					content += '<button id="deleteButton" class="btn btn-xs btn-danger" onclick="deleteComment('+ record.commentId+')"><i class="fa fa-trash"></i> 删除</button>';
					content += '  ';
				}
				return content;
			}
		} ];

// 动态设置jqGrid的rowNum
var pageSize = $("#pageSize").val();
pageSize = pageSize == 0 || pageSize == "" ? sys.pageNum : pageSize;

// 列表属性设置
var dtGridOption = {
	lang : 'zh-cn',
	ajaxLoad : true,
	check : false,
	loadURL : sys.rootPath + '/comment/annlist',
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

function auditComment(commentId) {
	console.log("==");
	var op = $("#opButton");
	op.innerText = '查看';
	layer.open({
		type : 2,
		title : "评论审核",
		fix : false, // 不固定
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '600px', '430px' ],
		content : sys.rootPath + '/comment/commentDetailAnn?commentId='
				+ commentId,
	});
}
function deleteComment(commentId) {
	layer.confirm("您确定要删除此条评论吗？", {
		icon : 5,
		btn : [ '确定', '取消' ]
	// 按钮
	}, function() {
		$.ajax({
			url : sys.rootPath + '/comment/deleteCommentAnn',
			type : "post",
			data : {
				"cid" : commentId
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
