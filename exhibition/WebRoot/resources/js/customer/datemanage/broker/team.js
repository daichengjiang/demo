var dtGridColumns = [
		{
			id : 'sectionNo',
			title : '号段',
			type : 'string',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;',
			hideType : 'sm|xs|md|lg'
		},{
			id : 'teamName',
			title : '团队名称',
			type : 'string',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;',
			resolution : function(value, record, column, grid, dataNo, columnNo) {
				if(team_update){
					return '<a href="javascript:void(0)"  onclick="updateTeam('+record.teamId+')">'+value+'</span>';
				}
				
				return value;
			}
		},
		{
			id : 'officialSite',
			title : '官方网址',
			type : 'string',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;'
		},{
			id : 'marketCert',
			title : '是否认证',
			type : 'String',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;',
			resolution : function(value, record, column, grid, dataNo, columnNo) {
				if(value=='Y'){
					return '<span class="label label-sm label-info arrowed arrowed-righ">已认证</span>';
				}
				return '<span class="label label-sm label-warning arrowed arrowed-righ">未认证</span>';
			}
		},
		{
			id : 'qq',
			title : 'qq号码',
			type : 'string',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;',
			hideType : 'sm|xs'

		},{
			id : 'hotLine',
			title : '热线电话',
			type : 'String',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;'
		},{
			id : 'servicePhone',
			title : '客服电话',
			type : 'String',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;'
		},{
			id : 'isShow',
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
					if(team_top){//置顶权限
						return '<a href="javascript:void(0)" onclick="topOrder('+record.teamId+','+record.topOrder+')">'+value+'</a>';
					}else{
						return value;
					}
				}else{
					return '';
				}
			}
		},
		{
			id : 'banks',
			title : '合作银行',
			type : 'string',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;',
			hideType : 'sm|xs'
		},
		{
			id : 'userRating',
			title : '用户评分',
			type : 'number',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;',
			resolution : function(value, record, column, grid, dataNo, columnNo) {
				var html='';
				for(var i=0;i<value;i++){
					html+='<img src="'+sys.rootPath +'/static/images/tea_10.png" style="margin:0px 2px 1px 2px;"></img>';
				}
				for(var i=0;i<5-value;i++){
					html+='<img src="'+sys.rootPath +'/static/images/tea_11.png"></img>';
				}
				return html;
			}
		},
		{
			id : 'overallRating',
			title : '综合评分',
			type : 'number',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;',
			resolution : function(value, record, column, grid, dataNo, columnNo) {
				var html='';
				for(var i=0;i<value;i++){
					html+='<img src="'+sys.rootPath +'/static/images/tea_10.png" style="margin:0px 2px 1px 2px;"></img>';
				}
				for(var i=0;i<5-value;i++){
					html+='<img src="'+sys.rootPath +'/static/images/tea_11.png"></img>';
				}
				return html;
			}
		},{
			id : 'status',
			title : '操作',
			type : 'string',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;',
			resolution : function(value, record, column, grid, dataNo, columnNo) {
				var str = '';
				if(team_update){//更新权限
					if(record.isShow==1){
						//隐藏
						str += '<button id="'+record.teamId+'" class="btn btn-primary btn-sm" style="border-radius:5px 5px;padding:1px 6px;" onclick="showTeam('+record.teamId+')">展示</button>';
					}else if(record.isShow==2){
						//展示
						str += '<button id="'+record.teamId+'" class="btn btn-warning btn-sm" style="border-radius:5px 5px;padding:1px 6px;" onclick="hideTeam('+record.teamId+')">隐藏</button>';
					}
				}	
				if(team_top){//置顶权限
					if(record.isTop==2){
						//置顶
						str += ' <button id="'+record.teamId+'" class="btn btn-danger btn-sm" style="border-radius:5px 5px;padding:1px 6px;" onclick="unTopTeam('+record.teamId+')">取消</button>';
					}else if(record.isTop==1){
						//未置顶
						str += ' <button id="'+record.teamId+'" class="btn btn-success btn-sm" style="border-radius:5px 5px;padding:1px 6px;" onclick="topTeam('+record.teamId+')">置顶</button>';
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
	loadURL : sys.rootPath + '/broker/noninformation/teamlist',
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

function deleteTeam(){
	var records = grid.getCheckedRecords();
	if (records.length == 0) {
		layer.alert("请选择需要删除的行!");
		return;
	}
	var deleteIds = "";
	for ( var i = 0; i < records.length; i++) {
		var record = records[i];
		deleteIds += record.teamId;
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
			url : sys.rootPath + '/broker/noninformation/deleteTeam',
			type : "post",
			data : {
				"teamIds" : deleteIds
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
function addTeam(){
	layer.open({
		  type: 2,
		  title:"经纪商团队添加",
		  shadeClose: false,
		  shade: 0.4,
		   maxmin: true, //开启最大化最小化按钮
		  area: ['75%', '70%'], //宽高
		  content: sys.rootPath + '/broker/noninformation/goAddTeam'
	});
}
function updateTeam(teamId){
	layer.open({
		type: 2,
		title:"经纪商活动更新",
		shadeClose: false,
		shade: 0.4,
		maxmin: true, //开启最大化最小化按钮
		area: ['75%', '70%'], //宽高
		content: sys.rootPath + '/broker/noninformation/goUpdateTeam?teamId='+teamId
	});
}

/**
 * 展示活动
 * @param activeId
 */
function showTeam(teamId){
	showOrhideTeam(teamId,2);
}
/**
 * 隐藏活动
 * @param activeId
 */
function hideTeam(teamId){
	showOrhideTeam(teamId,1);
}

function showOrhideTeam(teamId,status){
	$("#"+teamId).attr("disabled","disabled");
	$.ajax({
		url : sys.rootPath + '/broker/noninformation/showOrHideTeam',
		type : "post",
		data : {
			"teamId" : teamId,
			"isShow" : status
		},
		success : function(data) {
			data = JSON.parse(data);
			layer.alert(data, function(index) {
				$("#"+teamId).removeAttr("disabled");
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
function topTeam(teamId){
	topTeamOrNot(teamId,2);
}
/**
 * 取消置顶
 * @param activeId
 */
function unTopTeam(teamId){
	topTeamOrNot(teamId,1);
}

function topTeamOrNot(teamId,isTop){
	$("#"+teamId).attr("disabled","disabled");
	$.ajax({
		url : sys.rootPath + '/broker/noninformation/topTeamOrNot',
		type : "post",
		data : {
			"teamId" : teamId,
			"isTop" : isTop
		},
		success : function(data) {
			data = JSON.parse(data);
			layer.alert(data, function(index) {
				$("#"+teamId).removeAttr("disabled");
				grid.refresh(true);
				layer.close(index);
			});
		}
	});
}

/**
 * 置顶排序操作
 */
function topOrder(teamId, oldOrder) {
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
				url : sys.rootPath  + "/broker/noninformation/updateTeamTopOrder",
				type : "post",
				data : {
					"topOrder" : newOrder,
					"teamId" : teamId
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
