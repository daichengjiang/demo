var dtGridColumns = [{
    id : 'plateId',
    title : '版块代码',
    type : 'string',
    columnClass : 'text-center',
    hideType : 'xs',
    headerStyle : 'background:#438eb9;color:white;'
}, {
    id : 'plateName',
    title : '版块名称',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;'
},{
    id : 'industryId',
    title : '行业代码',
    type : 'string',
    columnClass : 'text-center',
    hideType : 'xs',
    headerStyle : 'background:#438eb9;color:white;'
},{id:'operation', 
    	title:'操作', 
    	type:'string', 
    	columnClass:'text-center', 
    	headerStyle : 'background:#438eb9;color:white;width:20%;', 
    	resolution:function(value, record, column, grid, dataNo, columnNo){
        var content = '';
	        if(plateUpdate){
	        	content += '<button id="upButton" style="border-radius:5px 5px;" class="btn btn-xs btn-info" attr=' + record.plateId + ' onclick="showModal(this);"><i class="fa fa-edit"></i>  修改</button>';
	        	content += '  ';
	        }
	        if(plateDelete){
	    	    content += '<button id="deButton" style="border-radius:5px 5px;" class="btn btn-xs btn-danger" attr=' + record.plateId + ' onclick="showModal(this);"><i class="fa fa-cogs"></i>  删除</button>';
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
    loadURL : sys.rootPath + '/plate/plateList',
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
    grid.parameters['plateName'] = $("#plateName").val();
    grid.refresh(true);  //列表刷新
}

//显示操作框（添加和修改共用）
function showModal(ele){
	//操作框标题
	var title;
	var content;
	var op = $("#opButton");
	
	if(ele.id == 'addButton'){
		title = '添加版块';
		op.innerText = '添加'
		content = sys.rootPath +"/plate/goAdd";
	}else if(ele.id == 'upButton'){
		title = '修改版块';
		op.innerText = '修改';
		content = sys.rootPath +"/plate/goUpdate?plateId="+ele.getAttribute("attr");
	}else{
		layer.confirm('是否删除版块', {icon: 3, title:'提示'}, function(index){
			$.ajax({
				url: sys.rootPath +"/plate/deletePlate",
				type: "post",
				data: {"plateId":ele.getAttribute("attr")},
				success: function(data){
					data = data.substring(1, data.length-1);
					if(data){
						layer.alert("删除成功");
						parent.layer.close(index);
						grid.refresh(true);
					}else{
						layer.alert(data);
					}
				},
				error : function(data) {
					layer.alert("后台异常请联系管理员");
				}
			});
		    layer.close(index);
		});
	}
	
	if(ele.id != 'deButton'){
		//弹出操作框
		layer.open({
		    type: 2,
		    title: title,
		    fix: false, //不固定
		    maxmin: true,
	        shadeClose: false, //点击遮罩关闭层
	        area : ['750px' , '500px'],
		    content: content
		  });
	}
}
