var dtGridColumns = [
		{
			id : 'brokerName',
			title : '经纪商',
			type : 'string',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;'
		},
		{
			id : 'collectionId',
			title : '藏品代码',
			type : 'string',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;'
		},
		{
			id : 'collectionName',
			title : '藏品名称',
			type : 'string',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;'
		},
		{
			id : 'runMarkets',
			title : '经营市场',
			type : 'string',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;',
			hideType : 'sm|xs'

		},{
			id : 'status',
			title : '是否展示',
			type : 'number',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;',
			resolution : function(value, record, column, grid, dataNo, columnNo) {
				if(value==1){
					return '<span class="label label-sm label-warning arrowed arrowed-righ">隐藏</span>';
				}
				return '<span class="label label-sm label-info arrowed arrowed-righ">展示</span>';
			}
		},{
			id : 'isTop',
			title : '是否置顶',
			type : 'number',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;',
			resolution : function(value, record, column, grid, dataNo, columnNo) {
				if(value==2){
					return '<span class="label label-sm label-success arrowed arrowed-righ">已置顶</span>';
				}
				return '<span class="label label-sm label-default arrowed arrowed-righ">未置顶</span>';
			}
		},{
			id : 'topOrder',
			title : '置顶排序',
			type : 'number',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;',
			resolution : function(value, record, column, grid, dataNo, columnNo) {
				if(value!=null && value > 0 ){
					if(active_top){//置顶权限
						return '<a href="javascript:void(0)" onclick="topOrder('+record.activeId+','+record.topOrder+')">'+value+'</a>';
					}else{
						return value;
					}
				}else{
					return '';
				}
			}
		},
		{
			id : 'activeDate',
			title : '活动时间',
			type : 'date',
			format : 'yyyy-MM-dd',
			otype : 'string',
			oformat : 'yyyy-MM-dd',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;',
			hideType : 'sm|xs'
		},
		{
			id : 'activeName',
			title : '活动名称',
			type : 'string',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;'
		},
		{
			id : 'activeDetail',
			title : '活动详情',
			type : 'string',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;',
			resolution : function(value, record, column, grid, dataNo, columnNo) {
				return '<a href="javascript:void(0)" onclick="updateActive('+record.activeId+')">详情</a>';
			}
		},{
			id : 'status',
			title : '操作',
			type : 'string',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;',
			resolution : function(value, record, column, grid, dataNo, columnNo) {
				var str = '';
				if(active_update){//更新权限
					if(record.status==1){
						//隐藏
						str += '<button id="'+record.activeId+'" class="btn btn-primary btn-sm" style="border-radius:5px 5px;padding:1px 6px;" onclick="showActive('+record.activeId+')">展示</button>';
					}else if(record.status==2){
						//展示
						str += '<button id="'+record.activeId+'" class="btn btn-warning btn-sm" style="border-radius:5px 5px;padding:1px 6px;" onclick="hideActive('+record.activeId+')">隐藏</button>';
					}
				}	
				if(active_top){//置顶权限
					if(record.isTop==2){
						//置顶
						str += ' <button id="'+record.activeId+'" class="btn btn-danger btn-sm" style="border-radius:5px 5px;padding:1px 6px;" onclick="unTopActive('+record.activeId+')">取消</button>';
					}else if(record.isTop==1){
						//未置顶
						str += ' <button id="'+record.activeId+'" class="btn btn-success btn-sm" style="border-radius:5px 5px;padding:1px 6px;" onclick="topActive('+record.activeId+')">置顶</button>';
					}
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
	check : true,
	loadURL : sys.rootPath + '/broker/noninformation/activelist',
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

function deleteActive(){
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
			url : sys.rootPath + '/broker/noninformation/deleteActive',
			type : "post",
			data : {
				"activeIds" : deleteIds
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
function addActive(){
	layer.open({
		  type: 2,
		  title:"经纪商活动添加",
		  shadeClose: false,
		  shade: 0.4,
		   maxmin: true, //开启最大化最小化按钮
		  area: ['85%', '85%'], //宽高
		  content: sys.rootPath + '/broker/noninformation/goAddActive'
	});
}
function updateActive(activeId){
	layer.open({
		type: 2,
		title:"经纪商活动更新",
		shadeClose: false,
		shade: 0.4,
		maxmin: true, //开启最大化最小化按钮
		area: ['85%', '85%'], //宽高
		content: sys.rootPath + '/broker/noninformation/goUpdateActive?activeId='+activeId
	});
}

/**
 * 展示活动
 * @param activeId
 */
function showActive(activeId){
	showOrhideActive(activeId,2);
}
/**
 * 隐藏活动
 * @param activeId
 */
function hideActive(activeId){
	showOrhideActive(activeId,1);
}

function showOrhideActive(activeId,status){
	$("#"+activeId).attr("disabled","disabled");
	$.ajax({
		url : sys.rootPath + '/broker/noninformation/showOrHideActive',
		type : "post",
		data : {
			"activeId" : activeId,
			"status" : status
		},
		success : function(data) {
			data = JSON.parse(data);
			layer.alert(data, function(index) {
				$("#"+activeId).removeAttr("disabled");
				grid.refresh(true);
				layer.close(index);
			});
		}
	});
}

/**
 * 置顶
 * @param activeId
 */
function topActive(activeId){
	topActiveOrNot(activeId,2);
}
/**
 * 取消置顶
 * @param activeId
 */
function unTopActive(activeId){
	topActiveOrNot(activeId,1);
}

function topActiveOrNot(activeId,isTop){
	$("#"+activeId).attr("disabled","disabled");
	$.ajax({
		url : sys.rootPath + '/broker/noninformation/topActiveOrNot',
		type : "post",
		data : {
			"activeId" : activeId,
			"isTop" : isTop
		},
		success : function(data) {
			data = JSON.parse(data);
			layer.alert(data, function(index) {
				$("#"+activeId).removeAttr("disabled");
				grid.refresh(true);
				layer.close(index);
			});
		}
	});
}

/**
 * 置顶排序操作
 */
function topOrder(activeId, oldOrder) {
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
			$.ajax({
				url : sys.rootPath  + "/broker/noninformation/updateTopOrder",
				type : "post",
				data : {
					"topOrder" : newOrder,
					"activeId" : activeId
				},
				success : function(data) {
					data = JSON.parse(data);
					parent.layer.alert(data, function(index) {
						parent.grid.refresh(true);
						parent.layer.closeAll();
					});
				}
			});
			
		},
		btn2 : function() {
			layer.close();
		},
		content : $('#topOrder')
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
