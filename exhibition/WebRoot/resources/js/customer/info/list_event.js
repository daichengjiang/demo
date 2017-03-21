var dtGridColumns = [
		{
			id : 'title',
			title : '标题',
			type : 'string',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;'
		},/*
		{
			id : 'author',
			title : '作者',
			type : 'string',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;min-width:70px;'
		},
		{
			id : 'source',
			title : '来源',
			type : 'string',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;',
			hideType : 'sm|xs'

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
			hideType : 'sm|xs'
		},
		{
			id : 'poster',
			title : '发布人',
			type : 'string',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;min-width:70px;'
		},
		{
			id : 'publishTime',
			title : '发布时间',
			type : 'date',
			format : 'yyyy-MM-dd hh:mm:ss',
			otype : 'string',
			oformat : 'yyyy-MM-dd hh:mm:ss',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;',
			hideType : 'sm|xs'
		},
		{
			id : 'simpleIntroduce',
			title : '简介',
			type : 'string',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;width:15%;',
			hideType : 'sm|xs|lg'
		},*//*{
			id : 'remark',
			title : '备注内容',
			type : 'string',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;width:100px;',
			hideType : 'sm|xs',
			resolution : function(value, record, column, grid, dataNo, columnNo) {
				return '<span style="width:100px;word-break: break-all; word-wrap:break-word;">'+value+'</span>';
			}
		},*/{
			id : 'preview',
			title : '文章预览',
			type : 'string',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;width:100px;',
			hideType : 'sm|xs',
			resolution : function(value, record, column, grid, dataNo, columnNo) {
				return '<a href="javascript:void(0)"  target="_blank" onclick="previewArt('+record.id+')">预览</a>';
			}
		} ,{
			id : 'importantLevel',
			title : '重要性',
			type : 'number',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;width:100px;',
			hideType : 'sm|xs',
			resolution : function(value, record, column, grid, dataNo, columnNo) {
				var choose  ='<input type="radio" name="importance'+record.id+'" value="1"> 1';
				choose +='<input type="radio" name="importance'+record.id+'" value="2"> 2';
				choose +='<input type="radio" name="importance'+record.id+'" value="3"> 3';
				
				
				var cc =  '<div id="'+record.id+'"  contenteditable="true" style="min-width: 80px;line-height: 20px;"></div>'
				return choose;
			}
		}, {
			id : 'choosed',
			title : '已选藏品',
			type : 'string',
			columnClass : 'text-left',
			headerStyle : 'background:#00a2ca;color:white;width:100px;',
			hideType : 'sm|xs',
			resolution : function(value, record, column, grid, dataNo, columnNo) {
				return '<div id="choosed'+record.id+'"><div>';
			}
		},{
			id : 'relateCollection',
			title : '藏品推荐',
			type : 'number',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;width:100px;',
			hideType : 'sm|xs',
			resolution : function(value, record, column, grid, dataNo, columnNo) {
				return '<button class="btn btn-primary btn-sm" style="border-radius:10px 10px;" onclick="chooseCollection('+record.id+')">选择</button>';
			}
		} ];

// 动态设置jqGrid的rowNum
var pageSize = $("#pageSize").val();
pageSize = pageSize == 0 || pageSize == "" ? sys.pageNum : pageSize;

// 列表属性设置
var dtGridOption = {
	lang : 'zh-cn',
	ajaxLoad : true,
	check : true,
	loadURL : sys.rootPath + '/info/calendareventlist',
	columns : dtGridColumns,
	gridContainer : 'dtGridContainer',
	toolbarContainer : 'dtGridToolBarContainer',
	tools : '',
	pageSize : 20,
	pageSizeLimit : [ 10,20,50]
};
// 初始化列表
var grid = $.fn.DtGrid.init(dtGridOption);

$(function() {
	if (null != $("#orderByColumn").val() && '' != $("#orderByColumn").val()) {
		grid.sortParameter.columnId = $("#orderByColumn").val();
		grid.sortParameter.sortType = $("#orderByType").val();
	}
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
	grid.parameters['searchTerm'] = $("#searchTerm").val();
	grid.refresh(true);
}


var collections ={};
var events ={};

// 选择藏品
function chooseCollection(artId) {
	// 操作框标题
	var title;
	var content;
	var op = $("#opButton");
	title = '选择藏品';
	op.innerText = '查看';
	content = $("#ctx").val()+"info/gotoChooseCollection?year=1&month=1&day=3&artId="+artId ;
	layer.open({
		type : 2,
		title : title,
		fix : false, // 不固定
		btn:["确认","关闭"],
		btn1:function(index,layero){
			  //var body = layer.getChildFrame('body', index);
			  var iframeWin = window[layero.find('iframe')[0]['name']];
			  var  ret = iframeWin.setup();
			 // layer.alert(ret);
			  if(ret.trim()!=""){
				  var id = iframeWin.getArtId();
				  collections[id]=ret;
				  
				  var tt = ret.split("_");
				  var str = "";
				  for(var i in tt){
					 var  coll =  tt[i].split("^")[1];
					 if(coll !=undefined){
						 str +=coll+"<br/>";
					 }
				  }
				  
				  $("#choosed"+id).html(str);
			  }
		},
		btn2:function(index,layero){
			layer.close(index);
		},
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '60%', '60%' ],
		offset:'50px',
		content : content
	});
}


//预览文章
function previewArt(artId){
	window.open($("#ctx").val()+"info/preview?aid="+artId);
}	


function setup(){
	var records = grid.getCheckedRecords();
	if (records.length == 0) {
		//layer.alert("请选择事件!",{offset:'230px'});
		//return;
	}
	for(var i=0;i<records.length;i++){
		var record = records[i];
		var id = record.id;
		var importance = $("input[name=importance"+id+"]:checked").val();//重要性
		var title = record.title;
		if(importance==undefined){
			importance = 0;
		}
		
		var recordStr = id+"^"+title+"^"+importance;
		events[id] = recordStr;
	}
	console.log(events);
	console.log(collections);
	
	$.ajax({
		url:$("#ctx").val() + "info/addInvestCalendar",
		type:"POST",
		data:{"events":events,"collections":collections,"cdate":$("#cdate").val()},
		success:function(data){
			if(data=="true"){
				parent.layer.alert("设置成功!",function(index){
					parent.today();
					parent.layer.closeAll();
				});
			}else{
				parent.layer.alert("设置失败!");
			}
			
		}
	});
	
}




function closeAll(){
	parent.layer.closeAll();
}
