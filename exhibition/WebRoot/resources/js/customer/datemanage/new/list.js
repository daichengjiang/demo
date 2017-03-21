var dtGridColumns = [{
    id : 'calendarId',
    title : '日历编号',
    type : 'number',
    columnClass : 'text-center',
    hideType : 'xs',
    headerStyle : 'background:#438eb9;color:white; font-size:14px;'
}, {
    id : 'name',
    title : '申购/托管名称',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;'
},{
    id : 'title',
    title : '公告名称',
    type : 'string',
    columnClass : 'text-center',
    hideType : 'xs',
    headerStyle : 'background:#438eb9;color:white;',
    resolution : function(value, record, column, grid, dataNo, columnNo) {
        if(value.length>20){
            return '<span title="'+value+'">'+value.substring(0,20)+'...</span>';
        }else{
            return value;
        }
    }
},{
    id : 'startTime',
    title : '开始时间',
    type : 'date',
    format : 'yyyy-MM-dd',
	otype : 'string',
	oformat : 'yyyy-MM-dd',
    columnClass : 'text-center',
    hideType : 'xs',
    headerStyle : 'background:#438eb9;color:white;'
},{
	id : 'endTime',
	title : '结束时间',
	type : 'date',
	format : 'yyyy-MM-dd',
	otype : 'string',
	oformat : 'yyyy-MM-dd',
	columnClass : 'text-center',
	hideType : 'xs',
	headerStyle : 'background:#438eb9;color:white;'
},{
    id : 'type',
    title : '类型',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;',
    hideType : 'xs',
    resolution : function(value, record, column, grid, dataNo, columnNo) {
        if(value == 'S'){
            return '<span class="label label-sm label-success arrowed arrowed-righ">申购</span>';
        }else if(value == 'T'){
            return '<span class="label label-sm label-warning arrowed arrowed-righ">托管</span>';
        }
    }
},{id:'operation', 
    	title:'操作', 
    	type:'string', 
    	columnClass:'text-center', 
    	headerStyle : 'background:#438eb9;color:white;', 
    	resolution:function(value, record, column, grid, dataNo, columnNo){
        var content = '';
	        if(1==1){
	        	content += '<button id="UPButton" style="border-radius:5px 5px;" attr="'+record.calendarId+'" class="btn btn-xs btn-info"  onclick="showModal(this);"><i class="fa fa-edit"></i>  修改</button>';
	        	content += '  ';
	        }
	        if(1==1){
	        	content += '<button id="DEButton" style="border-radius:5px 5px;" attr="'+record.calendarId+'" class="btn btn-xs btn-danger"  onclick="showModal(this);"><i class="fa fa-edit"></i>  删除</button>';
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
    loadURL : sys.rootPath + '/calendar/stcList',
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
    grid.parameters['name'] = $("#name").val();
    grid.parameters['sTime'] = $("#sTime").val();
    grid.parameters['eTime'] = $("#eTime").val();
    grid.refresh(true);  //列表刷新
}

//显示操作框
function showModal(ele){
	var title;
	var content;
	if(ele.id == 'addButton'){
		title = '添加申购-托管信息';
		content = sys.rootPath + "/calendar/goAddST";
	}else if(ele.id == 'UPButton'){
		title = '修改申购-托管信息';
		content = sys.rootPath + "/calendar/goUPST?calendarId="+ele.getAttribute("attr");
	}else{
		layer.confirm('是否删除日历信息', {icon: 3, title:'提示'}, function(index){
			$.ajax({
				url: sys.rootPath + "/calendar/delete",
				type: "post",
				data: {"calendarId":ele.getAttribute("attr")},
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
			area : ['750px' , '500px'],
		    content: content
		});
	}
}
