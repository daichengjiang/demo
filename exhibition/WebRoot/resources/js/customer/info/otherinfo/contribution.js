var dtGridColumns = [
{
	id : 'contributionId',
	title : '稿件编号',
	type : 'number',
	columnClass : 'text-center',
	headerStyle : 'background:#00a2ca;color:white;'
},
{
	id : 'author',
	title : ' 撰写作者',
	type : 'string',
	columnClass : 'text-center',
	headerStyle : 'background:#00a2ca;color:white;'
},
{
	id : 'corporation',
	title : '所属公司',
	type : 'string',
	columnClass : 'text-center',
	headerStyle : 'background:#00a2ca;color:white;',
},
{
	id : 'phone',
	title : '联系电话',
	type : 'string',
	columnClass : 'text-center',
	headerStyle : 'background:#00a2ca;color:white;',
},
{
	id : 'intro',
	title : '稿件内容简介',
	type : 'string',
	columnClass : 'text-center',
	headerStyle : 'background:#00a2ca;color:white;',
	hideType : 'sm|xs|md'
},
{
	id : 'attachment',
	title : '稿件附件',
	type : 'string',
	columnClass : 'text-left',
	headerStyle : 'background:#00a2ca;color:white;',
	hideType : 'sm|xs|md',
	resolution : function(value, record, column, grid, dataNo, columnNo) {
		if(contribution_download){
			if (value.lastIndexOf(".txt") > 0) {
				return '<p style="cursor: pointer;color:#438eb9;" title="点击下载稿件附件" onclick="download(this,\'' + record.attachment + '\')"><span><img src="' + sys.rootPath + '/static/images/txt.png"> ' + value.substring(value.lastIndexOf("/") + 1) +'<span><p>';
			} else if (value.lastIndexOf(".doc") > 0 || value.lastIndexOf(".docx") > 0) {
				return '<p style="cursor: pointer;color:#438eb9;" title="点击下载稿件附件" onclick="download(this,\'' + record.attachment + '\')"><span><img src="' + sys.rootPath + '/static/images/doc.png"> ' + value.substring(value.lastIndexOf("/") + 1) +'<span><p>';
			} 
		}else{
			if (value.lastIndexOf(".txt") > 0) {
				return '<p><span><img src="' + sys.rootPath + '/static/images/txt.png"> ' + value.substring(value.lastIndexOf("/") + 1) +'<span><p>';
			} else if (value.lastIndexOf(".doc") > 0 || value.lastIndexOf(".docx") > 0) {
				return '<p><span><img src="' + sys.rootPath + '/static/images/doc.png"> ' + value.substring(value.lastIndexOf("/") + 1) +'<span><p>';
			} 
		}
	}
},
{
	id : 'submitTime',
	title : '提交时间',
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
	headerStyle : 'background:#00a2ca;color:white;',
	resolution : function(value, record, column, grid, dataNo, columnNo) {
		var str = '';
		if(contribution_delete){
			str += '<button id="delButton" style="border-radius:5px 5px;"  class="btn btn-xs btn-danger"  onclick="del(this,' + record.contributionId + ',\'' + record.attachment + '\');"> <i class="fa fa-trash"></i>  删除 </button>';
		}
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
	loadURL : sys.rootPath + '/otherinfo/contribution/list.html',
	columns : dtGridColumns,
	gridContainer : 'dtGridContainer',
	toolbarContainer : 'dtGridToolBarContainer',
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
	grid.refresh(true);
}

/**
 * 稿件附件下载
 * @param ele 当前元素
 * @param attachment 附件存储地址
 */
function download(ele,attachment){
	window.location.href = sys.rootPath + '/otherinfo/contribution/download.html?attachment=' + encodeURI(attachment);
}

//删除
function del(ele,contributionId,attachment){
	layer.confirm("删除后不可恢复，您确定还要删除这条数据吗？", {
		icon : 5,
		btn : [ '确定', '取消' ]
	// 按钮
	}, function() {
		$.ajax({
			url : sys.rootPath + '/otherinfo/contribution/delete.html',
			type : "post",
			data : {
				"contributionId" : contributionId,
				"attachment" : attachment
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

