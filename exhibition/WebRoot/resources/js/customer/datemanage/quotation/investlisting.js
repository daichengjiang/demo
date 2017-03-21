var dtGridColumns = [
		{
			id : 'commodityId',
			title : '商品代码',
			type : 'string',
			columnClass : 'text-center',
			headerStyle : 'background:#438eb9;color:white;'
		},
		{
			id : 'commodityName',
			title : '商品名称',
			type : 'string',
			columnClass : 'text-center',
			headerStyle : 'background:#438eb9;color:white;',
			resolution : function(value, record, column, grid, dataNo, columnNo) {
				var content = '';
				content += '<a onclick="option('+ record.commodityId + ','+record.marketId+',2)" style="cursor: pointer;">'+ value + '</a>';
				return content;
			}
		},
		{
			id : 'marketId',
			title : '市场代码',
			type : 'string',
			columnClass : 'text-center',
			headerStyle : 'background:#438eb9;color:white;',
			hideType : 'sm|xs'
		},
		{
			id : 'marketName',
			title : '市场名称',
			type : 'string',
			columnClass : 'text-center',
			headerStyle : 'background:#438eb9;color:white;',
			hideType : 'sm|xs'
		},
		{
			id : 'listingPrice',
			title : '挂牌参考价',
			type : 'number',
			format:'###.00',
			columnClass : 'text-center',
			headerStyle : 'background:#438eb9;color:white;'
		},
		{
			id : 'issuePrice',
			title : '发行价',
			type : 'number',
			format:'###.00',
			columnClass : 'text-center',
			headerStyle : 'background:#438eb9;color:white;'
		},
		{
			id : 'status',
			title : '状态',
			type : 'string',
			columnClass : 'text-center',
			headerStyle : 'background:#438eb9;color:white;',
			hideType : 'sm|xs',
			resolution : function(value, record, column, grid, dataNo, columnNo) {
				if (value == 'E') {
					return '<span class="label label-sm label-success arrowed arrowed-righ">启用</span>';
				} else if (value == 'S') {
					return '<span class="label label-sm label-warning arrowed arrowed-righ">停用</span>';
				} else if (value == 'N') {
					return '<span class="label label-sm label-default arrowed arrowed-righ">新增</span>';
				}
			}
		},
		{
			id : 'listingTime',
			title : '上市时间',
			type : 'date',
			format : 'yyyy-MM-dd',
			otype : 'string',
			oformat : 'yyyy-MM-dd',
			columnClass : 'text-center',
			headerStyle : 'background:#438eb9;color:white;',
			hideType : 'sm|xs|md'
		}];

// 动态设置jqGrid的rowNum
var pageSize = $("#pageSize").val();
pageSize = pageSize == 0 || pageSize == "" ? sys.pageNum : pageSize;

// 列表属性设置
var dtGridOption = {
	lang : 'zh-cn',
	ajaxLoad : true,
	check : true,
	loadURL : sys.rootPath + '/quotation/getData',
	columns : dtGridColumns,
	gridContainer : 'dtGridContainer',
	toolbarContainer : 'dtGridToolBarContainer',
	tools : 'refresh',
	pageSize : pageSize,
	pageSizeLimit : [ 10, 30, 60, 100, 150]
};
// 初始化列表
var grid = $.fn.DtGrid.init(dtGridOption);

$(function() {
	if (null != $("#orderByColumn").val() && '' != $("#orderByColumn").val()) {
		grid.sortParameter.columnId = $("#orderByColumn").val();
		grid.sortParameter.sortType = $("#orderByType").val();
	}
	grid.parameters = new Object();
	grid.parameters['entity'] = "investlisting";
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
	grid.parameters['name'] = $("#name").val();
	grid.parameters['entity'] = "investlisting";
	grid.refresh(true);
}

//添加/编辑
function option(cid,mid,op) {
	var url = "";
	var title = "";
	if(op == 1){
		title = "添加";
		url = sys.rootPath + '/quotation/add?entity=investlisting';
	}else if(op == 2){
		title = "编辑";
		url = sys.rootPath + '/quotation/editInvestListing?commodityId='+cid+'&marketId='+mid;
	}
	layer.open({
	    type: 2,
	    title: title,
	    fix: true, //不固定
	    maxmin: true,
        shadeClose: false, //点击遮罩关闭层
        area : ['900px' , '420px'],
	    content: url
	  });
}

//启用或停用
function changeStatus(status){
	//获取选中行数据
	var records = grid.getCheckedRecords();
	//标识文本
	var txt = "";
	if (status == 'E') {
		txt = "启用";
	}else if(status == 'S'){
		txt = "停用";
	}
	if (records.length == 0) {
		layer.alert("请先选择需要"+txt+"的数据行!");
		return;
	}
	var ids = "";
	for ( var i = 0; i < records.length; i++) {
		var record = records[i];
		ids += (record.marketId + " " + record.commodityId);
		if (i + 1 < records.length) {
			ids += ",";
		}
	}
	layer.confirm("您确定要"+txt+"选中的" + records.length + "条数据吗？", {
		icon : 3,
		btn : [ '确定', '取消' ]
	// 按钮
	}, function() {
		$.ajax({
			url : sys.rootPath +"/quotation/changeStatus" ,
			type : "post",
			data : {"ids" : ids,"status" : status, "entity": "investlisting"},
			success : function(data) {
				layer.alert((data > 0 ? txt +"成功" : txt + "失败"), function(index) {
					grid.refresh(true);
					layer.close(index);
				});
			}
		});
	});
}


function del() {
	var records = grid.getCheckedRecords();
	if (records.length == 0) {
		layer.alert("请先选择需要删除的数据行!");
		return;
	}
	var ids = "";
	for ( var i = 0; i < records.length; i++) {
		var record = records[i];
		ids += (record.marketId + " " + record.commodityId);
		if (i + 1 < records.length) {
			ids += ",";
		}
	}
	layer.confirm("您确定要删除选中的" + records.length + "条数据吗？", {
		icon : 3,
		btn : [ '确定', '取消' ]
	// 按钮
	}, function() {
		$.ajax({
			url : sys.rootPath +"/quotation/delete" ,
			type : "post",
			data : {"ids" : ids, "entity": "investlisting"},
			success : function(data) {
				layer.alert((data > 0 ? "删除成功" :  "删除失败"), function(index) {
					grid.refresh(true);
					layer.close(index);
				});
			}
		});
	});
}