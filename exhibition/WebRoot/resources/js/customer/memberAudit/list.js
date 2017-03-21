var dtGridColumns = [{
    id : 'username',
    title : '用户名',
    type : 'String',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;'
},{
    id : 'nickname',
    title : '昵称',
    type : 'String',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;'
},{
	id : 'registerTime',
	title : '注册时间',
	type : 'date',
	columnClass : 'text-center',
	hideType : 'xs',
	headerStyle : 'background:#438eb9;color:white;'
},{
    id : 'type',
    title : '会员类型',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;',
    resolution : function(value, record, column, grid, dataNo, columnNo) {
    	if(value == '2'){
            return '经纪会员';
        }else if(value == '3'){
            return '交易所';
        }
    }
},{
    id : 'auditer',
    title : '审核人',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;'
},{
    id : 'auditTime',
    title : '审核时间',
    type : 'date',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;'
},{
    id : 'auditStatus',
    title : '审核状态',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;',
    hideType : 'xs',
    resolution : function(value, record, column, grid, dataNo, columnNo) {
    	if(value == 'Y'){
            return '<span class="label label-sm label-success arrowed arrowed-righ">审核通过</span>';
        }else if(value == 'N'){
            return '<span class="label label-sm label-danger arrowed arrowed-righ">审核驳回</span>';
        }else{
        	return '<span class="label label-sm label-default arrowed arrowed-righ">待审核</span>';
            
        }
    }
},{id:'operation', 
    	title:'操作', 
    	type:'string', 
    	columnClass:'text-center', 
    	headerStyle : 'background:#438eb9;color:white;', 
    	resolution:function(value, record, column, grid, dataNo, columnNo){
	        var content = '';
	        if(record.auditStatus == 'Y' || record.auditStatus == 'N'){
		        content += '<button id="setButton" disabled="disabled" style="border-radius:5px 5px;" class="btn btn-xs btn-info" attr=' + record.username + ' onclick="showModal(this);"><i class="fa fa-edit"></i>  审核</button>';
		        content += '  ';
	        }else{
	        	content += '<button id="setButton" style="border-radius:5px 5px;" class="btn btn-xs btn-info" attr=' + record.username + ' onclick="showModal(this);"><i class="fa fa-edit"></i>  审核</button>';
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
    loadURL : sys.rootPath + '/memberAudit/auditList',
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
 * 这里不传入分页信息，防止删除记录后重新计算的页码比当前页码小而导致计算异常
 */
function customSearch() {
    grid.parameters = new Object();
    grid.parameters['username'] = $("#username").val();
    grid.parameters['auditStatus'] = $("#auditStatus").val();
    grid.refresh(true);  //列表刷新
}

//显示操作框（添加和修改共用）
function showModal(ele){
	if(ele.id == 'setButton'){
		layer.open({
		    type: 2,
		    title: '会员审核',
		    fix: false, //不固定
		    maxmin: true,
	        shadeClose: false, //点击遮罩关闭层
	        area : ['900px' , '700px'],
		    content: sys.rootPath + "/memberAudit/goAudit?username="+ele.getAttribute("attr")
		  });
	}
}



