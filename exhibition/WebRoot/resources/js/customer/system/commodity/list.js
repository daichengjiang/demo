var dtGridColumns = [{
    id : 'commodityId',
    title : '商品代码',
    type : 'number',
    columnClass : 'text-center',
    hideType : 'xs',
    headerStyle : 'background:#438eb9;color:white;'
}, {
    id : 'fullName',
    title : '商品名称',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;'
},{
    id : 'marketId',
    title : '市场代码',
    type : 'mumber',
    columnClass : 'text-center',
    hideType : 'xs',
    headerStyle : 'background:#438eb9;color:white;'
},{
    id : 'plateId',
    title : '版块代码',
    type : 'string',
    columnClass : 'text-center',
    hideType : 'xs',
    headerStyle : 'background:#438eb9;color:white;'
},{
    id : 'issuePrice',
    title : '发行价',
    type : 'string',
    columnClass : 'text-center',
    hideType : 'xs',
    headerStyle : 'background:#438eb9;color:white;'
},{
    id : 'marketDate',
    title : '上市时间',
    type : 'date',
    columnClass : 'text-center',
    hideType : 'xs',
    headerStyle : 'background:#438eb9;color:white;'
},{
    id : 'updateTime',
    title : '更新时间',
    type : 'date',
    columnClass : 'text-center',
    hideType : 'xs',
    headerStyle : 'background:#438eb9;color:white;'
},{
    id : 'status',
    title : '状态',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;',
    hideType : 'xs',
    resolution : function(value, record, column, grid, dataNo, columnNo) {
        if(value == 'E'){
            return '<span class="label label-sm label-success arrowed arrowed-righ">启用</span>';
        }else if(value == 'S'){
            return '<span class="label label-sm label-warning arrowed arrowed-righ">停用</span>';
        }else if(value == 'N'){
            return '<span class="label label-sm label-default arrowed arrowed-righ">新增</span>';
        }
    }
},{id:'operation', 
    	title:'操作', 
    	type:'string', 
    	columnClass:'text-center', 
    	headerStyle : 'background:#438eb9;color:white;', 
    	resolution:function(value, record, column, grid, dataNo, columnNo){
        var content = '';
	        if(commoditySet){
	        	content += '<button id="SButton" style="border-radius:5px 5px;" class="btn btn-xs btn-info" cId=' + record.commodityId + ' mId='+ record.marketId +' onclick="showModal(this);"><i class="fa fa-edit"></i>  设置</button>';
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
    loadURL : sys.rootPath + '/commodity/pcList',
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
    grid.parameters['fullName'] = $("#fullName").val();
    grid.refresh(true);  //列表刷新
}

//显示操作框
function showModal(ele){
	//弹出操作框
	layer.open({
	    type: 2,
	    title: '商品设置',
	    fix: false, //不固定
	    maxmin: true,
		shadeClose: false, //点击遮罩关闭层
		area : ['750px' , '570px'],
	    content: sys.rootPath +"/commodity/goSet?commodityId="+ele.getAttribute("cId") +"&marketId="+ele.getAttribute("mId")
	});
}
