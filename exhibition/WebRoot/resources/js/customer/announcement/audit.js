var dtGridColumns = [{
    id : 'announcementId',
    title : '公告代码',
    type : 'number',
    columnClass : 'text-center',
    hideType : 'xs',
    headerStyle : 'background:#438eb9;color:white;'
}, {
    id : 'marketName',
    title : '所属市场',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;'
}, {
    id : 'title',
    title : '标题',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;'
},{
    id : 'author',
    title : '创建人',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;'
},{
    id : 'createTime',
    title : '创建时间',
    type : 'date',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;'
},{
    id : 'modifier',
    title : '修改人',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;'
},{
    id : 'modifyTime',
    title : '修改时间',
    type : 'date',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;'
},{
    id : 'auditor',
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
    id : 'isTop',
    title : '是否置顶',
    type : 'number',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;',
    hideType : 'xs',
    resolution : function(value, record, column, grid, dataNo, columnNo) {
        if(value == 0)
        {
            return '<span class="label label-sm label-default arrowed arrowed-righ">否</span>';
        }else
        {
            return '<span class="label label-sm label-success arrowed arrowed-righ">是</span>';
        }
    }
},{
    id : 'status',
    title : '状态',
    type : 'number',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;',
    hideType : 'xs',
    resolution : function(value, record, column, grid, dataNo, columnNo) {
        if(value == 0){
            return '<span class="label label-sm label-default arrowed arrowed-righ">未提交</span>';
        }else if(value == 1){
            return '<span class="label label-sm label-warning arrowed arrowed-righ">审核中</span>';
        }else if(value == 2){
            return '<span class="label label-sm label-success arrowed arrowed-righ">审核通过</span>';
        }else if(value == 3){
            return '<span class="label label-sm label-danger arrowed arrowed-righ">审核驳回</span>';
        }
    }
},{
	id:'operation', 
    title:'操作', 
    type:'string', 
    columnClass:'text-center', 
    headerStyle : 'background:#438eb9;color:white;', 
    resolution:function(value, record, column, grid, dataNo, columnNo){
	    var content = '';
	    if(applyPR){
		    if(record.status == 1){
		    	content += '<button id="applyButton" style="border-radius:5px 5px;" class="btn btn-xs btn-info" attr=' + record.announcementId + ' onclick="showModal(this);"><i class="fa fa-edit"></i>  审核</button>';
		    }else{
		    	content += '<button id="applyButton" style="border-radius:5px 5px;" class="btn btn-xs btn-info" attr=' + record.announcementId + ' disabled="disabled" onclick="showModal(this);"><i class="fa fa-edit"></i>  审核</button>';
		    }
	    }
	    content += '  ';
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
    loadURL : sys.rootPath + '/announcement/annAudit?type='+$("#type").val(),
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
    grid.parameters['title'] = $("#title").val();
    grid.parameters['marketName'] = $("#marketName").val();
    grid.refresh(true);  //列表刷新
}

//显示操作框（添加和修改共用）
function showModal(ele){
	//操作框标题
	var title;
	var content;
	
	if(ele.id == 'applyButton'){
		title = '审核公告';
		content = sys.rootPath + "/announcement/goApplyPR?announcementId="+ele.getAttribute("attr");
	}
		
	//弹出操作框
	layer.open({
	    type: 2,
	    title: title,
	    fix: false, //不固定
	    maxmin: true,
		shadeClose: false, //点击遮罩关闭层
		area : ['1200px' , '800px'],
	    content: content
	  });
	
}
