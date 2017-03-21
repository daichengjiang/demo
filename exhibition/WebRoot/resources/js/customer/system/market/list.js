var dtGridColumns = [{
    id : 'marketId',
    title : '市场代码',
    type : 'string',
    columnClass : 'text-center',
    hideType : 'xs',
    headerStyle : 'background:#438eb9;color:white;'
}, {
    id : 'marketName',
    title : '市场名称',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;'
},{
    id : 'status',
    title : '市场状态',
    type : 'string',
    columnClass : 'text-center',
    hideType : 'xs',
    headerStyle : 'background:#438eb9;color:white;',
	resolution : function(value, record, column, grid, dataNo, columnNo) {
	    if(value == 'E'){
	         return '<span class="label label-sm label-success arrowed arrowed-righ">启用中</span>';
	     }else if(value == 'S'){
	         return '<span class="label label-sm label-danger arrowed arrowed-righ">禁用中</span>';
	     }
	 }
},{id:'operation', 
    	title:'操作', 
    	type:'string', 
    	columnClass:'text-center', 
    	headerStyle : 'background:#438eb9;color:white;', 
    	resolution:function(value, record, column, grid, dataNo, columnNo){
        var content = '';
	        if(marketE && record.status == 'S'){
	        	content += '<button id="EButton" style="border-radius:5px 5px;" class="btn btn-xs btn-success" attr=' + record.marketId + ' mName='+ record.marketName +' onclick="showModal(this);"><i class="fa fa-edit"></i>  启用</button>';
	        	content += '  ';
	        }else if(marketD && record.status == 'E'){
	    	    content += '<button id="DButton" style="border-radius:5px 5px;" class="btn btn-xs btn-danger" attr=' + record.marketId + ' mName='+ record.marketName +' onclick="showModal(this);"><i class="fa fa-cogs"></i>  禁用</button>';
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
    loadURL : sys.rootPath + '/market/marketList',
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
    grid.parameters['marketName'] = $("#marketName").val();
    grid.refresh(true);  //列表刷新
}

//显示操作框
function showModal(ele){
	if(ele.id == 'EButton'){
		layer.confirm('是否启用市场', {icon: 3, title:'提示'}, function(index){
			$.ajax({
				url: sys.rootPath +"/market/statusUpdate",
				type: "post",
				data: {"marketId":ele.getAttribute("attr"),"marketName":ele.getAttribute("mName"),status:"E"},
				success: function(data){
					if(data){
						layer.alert("启用成功");
						parent.layer.close(index);
						grid.refresh(true);
					}
				},
				error : function(data) {
					layer.alert("启用失败");
				}
			});
		    layer.close(index);
		});
	}else{
		layer.confirm('是否禁用市场', {icon: 3, title:'提示'}, function(index){
			$.ajax({
				url: sys.rootPath +"/market/statusUpdate",
				type: "post",
				data: {"marketId":ele.getAttribute("attr"),"marketName":ele.getAttribute("mName"),status:"S"},
				success: function(data){
					if(data){
						layer.alert("禁用成功");
						parent.layer.close(index);
						grid.refresh(true);
					}
				},
				error : function(data) {
					layer.alert("禁用失败");
				}
			});
		    layer.close(index);
		});
	}
}
