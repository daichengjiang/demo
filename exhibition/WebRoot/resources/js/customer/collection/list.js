var dtGridColumns = [{
	id : 'collectionId',
	title : '藏品代码',
	type : 'number',
	columnClass : 'text-center',
	hideType : 'xs',
	headerStyle : 'background:#438eb9;color:white;'
}, {
	id : 'collectionName',
	title : '藏品名称',
	type : 'string',
	columnClass : 'text-center',
	hideType : 'xs',
	headerStyle : 'background:#438eb9;color:white;',
    resolution : function(value, record, column, grid, dataNo, columnNo) {
    	var html='';
    	html = '<a onclick="option(' + record.collectionId + ',2)" style="cursor: pointer;">' + value + '</a>';
    	return html;
    }
}, {
	id : 'tradeCode',
	title : '交易代码',
	type : 'number',
	columnClass : 'text-center',
	hideType : 'xs',
	headerStyle : 'background:#438eb9;color:white;'
}, {
    id : 'marketId',
    title : '所属市场代码',
    type : 'string',
    columnClass : 'text-center',
    hideType : 'xs',
    headerStyle : 'background:#438eb9;color:white;'
}, {
    id : 'marketName',
    title : '所属市场名称',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;'
}, {
	id : 'thumbnailUrl',
	title : '藏品图片地址',
	type : 'string',
	columnClass : 'text-center',
	headerStyle : 'background:#438eb9;color:white;',
	hideType : 'sm|xs|md|lg'
}, {
	id : 'status',
	title : '状态',
	type : 'number',
	columnClass : 'text-center',
	headerStyle : 'background:#438eb9;color:white;',
	resolution : function(value, record, column, grid, dataNo, columnNo) {
		if (value == 1) {
			return '<span class="label label-sm label-success arrowed arrowed-righ">审核通过</span>';
		} else if (value == 0) {
			return '<span class="label label-sm label-defalut arrowed arrowed-righ">待审核</span>';
		}else if (value == 2) {
			return '<span class="label label-sm label-danger arrowed arrowed-righ">审核驳回</span>';
		}
	}
},{
	id : 'poster',
	title : '发布者',
	type : 'string',
	columnClass : 'text-center',
	headerStyle : 'background:#438eb9;color:white;'
},{
	id : 'createTime',
	title : '发布时间',
	type : 'date',
	format : 'yyyy-MM-dd hh:mm:ss',
	otype : 'string',
	oformat : 'yyyy-MM-dd hh:mm:ss',
	columnClass : 'text-center',
	headerStyle : 'background:#438eb9;color:white;'
},{
	id : 'modifyTime',
	title : '修改时间',
	type : 'date',
	format : 'yyyy-MM-dd hh:mm:ss',
	otype : 'string',
	oformat : 'yyyy-MM-dd hh:mm:ss',
	columnClass : 'text-center',
	headerStyle : 'background:#438eb9;color:white;',
	resolution : function(value, record, column, grid, dataNo, columnNo) {
		if (value == null) {
			return '';
		}else{
			return value;
		}
	}
},{
	id : 'remark',
	title : '备注',
	type : 'string',
	columnClass : 'text-center',
	headerStyle : 'background:#438eb9;color:white;'
},{
	id:'operation', 
	title:'操作', 
	type:'string', 
	columnClass:'text-center', 
	headerStyle : 'background:#438eb9;color:white;', 
	resolution:function(value, record, column, grid, dataNo, columnNo){
	    var content = '';
	    if (collection_audit) {
	    	if (record.status == 0) {
	    		content += '<button id="setButton" style="border-radius:5px 5px;"  class="btn btn-xs btn-primary" onclick="audit('+record.collectionId+',\''+record.remark+'\');"><i class="fa fa-edit"></i>  审核</button>';
	    		content += '  ';
	    	}else{
	    		content += '<button id="setButton" style="border-radius:5px 5px;"  class="btn btn-xs btn-primary" onclick="audit('+record.collectionId+',\''+record.remark+'\');" disabled="disabled"><i class="fa fa-edit"></i>  已审核</button>';
	    		content += '  ';
	    		content += '<button id="setButton" style="border-radius:5px 5px;"  class="btn btn-xs btn-primary" onclick="revoke('+record.collectionId+');" ><i class="fa fa-edit"></i>  撤销</button>';
	    		content += '  ';
	    	}
		}
	    if (collection_delete) {
	    	content += '<button id="delButton" style="border-radius:5px 5px;" thumbnail="'+record.thumbnailUrl+'" class="btn btn-xs btn-danger"  onclick="del('+record.collectionId+',this);"><i class="fa fa-trash"></i>  删除</button>';
	    	content += '  ';
		}
	    return content;
    }
}];

//动态设置jqGrid的rowNum
var pageSize = $("#pageSize").val();
pageSize = pageSize == 0 || pageSize == "" ? sys.pageNum : pageSize;

//console.log($("#addButton").attr("attr"));
var dtGridOption = {
    lang : 'zh-cn',
    ajaxLoad : true,
    check : false,
    loadURL : sys.rootPath + '/collection/list',
    columns : dtGridColumns,
    gridContainer : 'dtGridContainer',
    toolbarContainer : 'dtGridToolBarContainer',
    tools : '',
    pageSize : pageSize,
    pageSizeLimit : [10, 20, 30]
};

var grid = $.fn.DtGrid.init(dtGridOption);
$(function() {
    if(null != $("#orderByColumn").val() && '' != $("#orderByColumn").val())
    {
        grid.sortParameter.columnId = $("#orderByColumn").val();
        grid.sortParameter.sortType = $("#orderByType").val();
    }
    grid.parameters = new Object();
    grid.load();
    $("#btnSearch").click(customSearch);
    
    //注册回车键事件
    document.onkeypress = function(e){
    var ev = document.all ? window.event : e;
        if(ev.keyCode==13) {
            customSearch();
        }
    };
    
});

/**
 * 自定义查询
 * 这里不传入分页信息，防止禁用记录后重新计算的页码比当前页码小而导致计算异常
 */
function customSearch() {
    grid.parameters = new Object();
    grid.parameters['collectionName'] = $("#collectionName").val();
    grid.refresh(true);  //列表刷新
}

//添加/编辑
function option(id,op) {
	var url = "";
	var title = "";
	if(op == '1'){
		title = "添加";
		url = sys.rootPath + '/collection/add';
	}else if(op == '2'){
		title = "编辑";
		url = sys.rootPath + '/collection/edit?collectionId='+id;
	}
	layer.open({
	    type: 2,
	    title: title,
	    fix: false, //不固定
	    maxmin: true,
        shadeClose: false, //点击遮罩关闭层
        area : ['1200px' , '600px'],
	    content: url
	  });
}


//更新属性
function update(data){
	$.ajax({
		url : sys.rootPath  + "/collection/updateProperty",
		type : "post",
		data : data ,
		success : function(data) {
			if(data == '1'){
	     		layer.alert("操作成功", function(index){
					//调用父页面刷新方法
					grid.refresh(true);
					layer.closeAll(); 
				});
	   		 }else{
	   			layer.alert("操作失败");
	    	}
		}
	});
}

/**
 * 审核操作
 */
function audit(collectionId, oldRemark) {
	if (oldRemark == 'null') {
		oldRemark = "";
	}
	$("#remark").val(oldRemark);
	// 捕获页
	layer.open({
		type : 1,
		shade : false,
		title : "藏品审核", // 不显示标题
		area : [ "30%", "30%" ],
		btn : [ "通过","驳回", "关闭" ],
		yes : function() {
			var remark = $("#remark").val();
			if(oldRemark==remark){
				return;
			}
			var data = {"remark" : remark,"collectionId" : collectionId,"status":1};
			update(data);
		},
		btn2 : function() {
			var remark = $("#remark").val();
			if(oldRemark==remark){
				return;
			}
			var data = {"remark" : remark,"collectionId" : collectionId,"status":2};
			update(data);
		},
		btn3 : function() {
			layer.closeAll();
		},
		content : $('#auditDiv')
	});
}

//撤销审核
function revoke(id){
	layer.confirm("您确定要撤销该条记录审核信息吗？<br />撤销后您需要重新审核。", {
		icon : 5,
		btn : [ '确定', '取消' ]
	// 按钮
	}, function() {
		var data = {"collectionId":id,"status":0,"remark":""};
		update(data);
	});
}

//删除
function del(id,ele){
	layer.confirm("您确定要删除该条记录吗？", {
		icon : 5,
		btn : [ '确定', '取消' ]
	// 按钮
	}, function() {
		$.ajax({
			url : sys.rootPath + '/collection/delete',
			type : "post",
			data : {"collectionId" : id,"thumbnailUrl" : ele.getAttribute("thumbnail")},
			success : function(data) {
				if(data == '1'){
		     		layer.alert("删除成功", function(index){
						//调用父页面刷新方法
						grid.refresh(true);
						layer.closeAll(); 
					});
		   		 }else{
		   			layer.alert("删除失败");
		    	}
			}
		});
	});
}
