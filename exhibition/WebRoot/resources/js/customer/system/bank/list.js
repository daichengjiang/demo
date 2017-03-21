var dtGridColumns = [{
    id : 'bankAbbr',
    title : '银行英文缩写',
    type : 'string',
    columnClass : 'text-center',
    hideType : 'xs',
    headerStyle : 'background:#438eb9;color:white;'
}, {
    id : 'bankName',
    title : '银行名称',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;',
    resolution : function(value, record, column, grid, dataNo, columnNo) {
    	var html='';
    	html = '<a onclick="option(\''+ record.bankAbbr + '\',2)" style="cursor: pointer;">' + value + '</a>';
    	return html;
    }
},{
	id : 'logo',
	title : ' 银行logo图片',
	type : 'string',
	columnClass : 'text-center',
	headerStyle : 'background:#438eb9;color:white;'
},{
    id : 'status',
    title : '银行状态',
    type : 'string',
    columnClass : 'text-center',
    hideType : 'xs',
    headerStyle : 'background:#438eb9;color:white;',
	resolution : function(value, record, column, grid, dataNo, columnNo) {
	    if(value == 'Y'){
	         return '<span class="label label-sm label-success arrowed arrowed-righ">启用</span>';
	     }else if(value == 'N'){
	         return '<span class="label label-sm label-danger arrowed arrowed-righ">禁用</span>';
	     }
	 }
},{
	id : 'createTime',
	title : '录入时间',
	type : 'date',
	format : 'yyyy-MM-dd hh:mm:ss',
	otype : 'string',
	oformat : 'yyyy-MM-dd hh:mm:ss',
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
	    if (bank_edit && record.status == "Y") {
	    	content += '<button id="setButton" style="border-radius:5px 5px;" class="btn btn-xs btn-primary"  onclick="set(\''+record.bankAbbr+'\',this);"><i class="fa fa-edit"></i>  禁用</button>';
	    	content += '  ';
		}else if(bank_edit && record.status == "N"){
			content += '<button id="setButton" style="border-radius:5px 5px;" class="btn btn-xs btn-primary"  onclick="set(\''+record.bankAbbr+'\',this);"><i class="fa fa-edit"></i>  启用</button>';
			content += '  ';
		}
	    if (bank_delete) {
	    	content += '<button id="delButton" style="border-radius:5px 5px;" logo="'+record.logo+'" class="btn btn-xs btn-danger"  onclick="del(\''+record.bankAbbr+'\',this);"><i class="fa fa-trash"></i>  删除</button>';
	    	content += '  ';
		}
	    return content;
    }
}];

//动态设置jqGrid的rowNum
var pageSize = $("#pageSize").val();
pageSize = pageSize == 0 || pageSize == "" ? sys.pageNum : pageSize;

var dtGridOption = {
    lang : 'zh-cn',
    ajaxLoad : true,
    check : false,
    loadURL : sys.rootPath + '/bank/list',
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
    grid.parameters['bankName'] = $("#bankName").val();
    grid.refresh(true);  //列表刷新
}

//添加/编辑
function option(abbr,op) {
	console.log(abbr);
	var url = "";
	var title = "";
	if(op == '1'){
		title = "添加";
		url = sys.rootPath + '/bank/add';
	}else if(op == '2'){
		title = "编辑";
		url = sys.rootPath + '/bank/edit?bankAbbr='+abbr.trim();
	}
	layer.open({
	    type: 2,
	    title: title,
	    fix: false, //不固定
	    maxmin: true,
        shadeClose: false, //点击遮罩关闭层
        area : ['800px' , '400px'],
	    content: url
	  });
}

//启用/禁用
function set(abbr,ele){
	layer.confirm("您确定要操作该条记录吗？", {
		icon : 5,
		btn : [ '确定', '取消' ]
	// 按钮
	}, function() {
		var txt = $(ele).text().trim();
		var data;
		if (txt == "启用") {
			data = {"bankAbbr": abbr,"status":"Y"};
		}else{
			data = {"bankAbbr": abbr,"status":"N"};
		}
		update(data);
	});
}

//更新属性
function update(data){
	$.ajax({
		url : sys.rootPath  + "/bank/updateProperty",
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

//删除
function del(abbr,ele){
	layer.confirm("您确定要删除该条记录吗？", {
		icon : 5,
		btn : [ '确定', '取消' ]
	// 按钮
	}, function() {
		$.ajax({
			url : sys.rootPath + '/bank/delete',
			type : "post",
			data : {"bankAbbr" : abbr,"logo" : ele.getAttribute("logo")},
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
