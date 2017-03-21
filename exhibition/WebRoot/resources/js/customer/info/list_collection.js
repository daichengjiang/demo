var dtGridColumns = [
		{
			id : 'tradeCode',
			title : '交易代码',
			type : 'number',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;'
		},{
			id : 'title',
			title : '藏品名称',
			type : 'string',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;'
		}];

// 动态设置jqGrid的rowNum
var pageSize = $("#pageSize").val();
pageSize = pageSize == 0 || pageSize == "" ? sys.pageNum : pageSize;

// 列表属性设置
var dtGridOption = {
	lang : 'zh-cn',
	ajaxLoad : true,
	check : true,
	loadURL : sys.rootPath + '/info/chooseCollectionList',
	columns : dtGridColumns,
	gridContainer : 'dtGridContainer',
	toolbarContainer : 'dtGridToolBarContainer',
	tools : '',
	pageSize : 20,
	pageSizeLimit : [10,20,50]
};
// 初始化列表
var grid = $.fn.DtGrid.init(dtGridOption);

$(function() {
	if (null != $("#orderByColumn").val() && '' != $("#orderByColumn").val()) {
		grid.sortParameter.columnId = $("#orderByColumn").val();
		grid.sortParameter.sortType = $("#orderByType").val();
	}
	
	grid.parameters = new Object();
	grid.parameters['artId'] = $("#artId").val();
	grid.parameters['searchTerm'] = $("#searchTerm").val();
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
	grid.parameters['artId'] = $("#artId").val();
	grid.parameters['searchTerm'] = $("#searchTerm").val();
	grid.refresh(true);
}


//预览文章
function previewArt(artId){
	window.open($("#ctx").val()+"info/preview?aid="+artId);
}	


function setup(){
	var records = grid.getCheckedRecords();
	var collstr = '';
	for(var i=0;i<records.length;i++){
		var record = records[i];
		var id = record.id;
		var title = record.title;
		
		var recordStr = id+"^"+title;
		collstr += recordStr + "_";
		
		//统计选择的藏品
		
	}
	return collstr;
}

function getArtId(){
	
	return $("#artId").val();
}
