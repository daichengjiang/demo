var dtGridColumns = [{
    id : 'stMarketId',
    title : '序号',
    type : 'number',
    columnClass : 'text-center',
    hideType : 'xs',
    headerStyle : 'background:#438eb9;color:white; font-size:14px;'
}, {
    id : 'marketId',
    title : '市场代码',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;'
},{
    id : 'marketName',
    title : '市场名称',
    type : 'string',
    columnClass : 'text-center',
    hideType : 'xs',
    headerStyle : 'background:#438eb9;color:white;'
},{
    id : 'url',
    title : '市场链接',
    type : 'string',
    columnClass : 'text-center',
    hideType : 'xs',
    headerStyle : 'background:#438eb9;color:white;'
},{id:'operation', 
    	title:'操作', 
    	type:'string', 
    	columnClass:'text-center', 
    	headerStyle : 'background:#438eb9;color:white;', 
    	resolution:function(value, record, column, grid, dataNo, columnNo){
        var content = '';
	        if(1==1){
	        	content += '<button id="UPButton" style="border-radius:5px 5px;" attr="'+record.stMarketId+'" class="btn btn-xs btn-info"  onclick="showModal(this);"><i class="fa fa-edit"></i>  修改</button>';
	        	content += '  ';
	        }
	        if(1==1){
	        	content += '<button id="DEButton" style="border-radius:5px 5px;" attr="'+record.stMarketId+'" class="btn btn-xs btn-danger"  onclick="showModal(this);"><i class="fa fa-edit"></i>  删除</button>';
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
    loadURL : sys.rootPath + '/STMarket/stMarketList',
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
    grid.parameters['name'] = $("#name").val();
    grid.parameters['cdate'] = $("#cdate").val();
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
	var title;
	var content;
	if(ele.id == 'addButton'){
		title = '添加申购-托管合作市场';
		content = sys.rootPath + "/STMarket/goAddST";
	}else if(ele.id == 'UPButton'){
		title = '修改申购-托管合作市场';
			content = sys.rootPath + "/STMarket/goUPST?stMarketId="+ele.getAttribute("attr");
	}else{
		layer.confirm('是否删除该市场', {icon: 3, title:'提示'}, function(index){
			$.ajax({
				url: sys.rootPath + "/STMarket/deleteST",
				type: "post",
				data: {"stMarketId":ele.getAttribute("attr")},
				success: function(data){
					if(data){
						layer.alert("删除成功");
						layer.close(index); 
						grid.refresh(true);  //列表刷新
					}
				},
				error : function(data) {
					console.log("error");
					layer.alert("删除失败");
				}
			});
		    layer.close(index);
		});
	}
	
	if(ele.id == 'addButton' || ele.id == 'UPButton'){
		//弹出操作框
		layer.open({
		    type: 2,
		    title: title,
		    fix: false, //不固定
		    maxmin: true,
			shadeClose: false, //点击遮罩关闭层
			area : ['750px' , '300px'],
		    content: content
		});
	}
}
