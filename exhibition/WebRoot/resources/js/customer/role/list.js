var dtGridColumns = [{
    id : 'roleId',
    title : '角色代码',
    type : 'number',
    columnClass : 'text-center',
    hideType : 'xs',
    headerStyle : 'background:#438eb9;color:white;'
}, {
    id : 'roleName',
    title : '角色名称',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;'
}, {
    id : 'roleKey',
    title : '角色唯一标识',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;'
}, {
    id : 'roleDescription',
    title : '描述',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;'
}, {
    id : 'status',
    title : '角色状态',
    type : 'number',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;',
    hideType : 'xs',
    resolution : function(value, record, column, grid, dataNo, columnNo) {
        if(value == 0)
        {
            return '<span class="label label-sm label-success arrowed arrowed-righ">正常</span>';
        }else
        {
            return '<span class="label label-sm label-warning arrowed arrowed-righ">禁用</span>';
        }
    }},{id:'operation', 
    	title:'操作', 
    	type:'string', 
    	columnClass:'text-center', 
    	headerStyle : 'background:#438eb9;color:white;width:20%;', 
    	resolution:function(value, record, column, grid, dataNo, columnNo){
        var content = '';
	        if(roleedit){
	        	content += '<button id="upButton" style="border-radius:5px 5px;" class="btn btn-xs btn-info" attr=' + record.roleId + ' onclick="showModal(this);"><i class="fa fa-edit"></i>  修改</button>';
	        	content += '  ';
	        }
	        if(roleright){
	    	    content += '<button id="rightButton" style="border-radius:5px 5px;" class="btn btn-xs btn-warning" attr=' + record.roleId + ' onclick="showModal(this);"><i class="fa fa-users"></i>  权限</button>';
	    	    content += '  ';
	        }
	        if(roledelete){
	    	    content += '<button id="deButton" style="border-radius:5px 5px;" class="btn btn-xs btn-danger" attr=' + record.roleId + ' onclick="showModal(this);"><i class="fa fa-trash"></i>  删除</button>';
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
    loadURL : sys.rootPath + '/role/list',
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
    grid.parameters['roleName'] = $("#roleName").val();
    grid.refresh(true);  //列表刷新
}

//显示操作框（添加和修改共用）
function showModal(ele){
	//操作框标题
	var title;
	var content;
	var op = $("#opButton");
	
	if(ele.id == 'addButton'){
		title = '添加角色';
		op.innerText = '添加'
		content = sys.rootPath +"/role/forwardAdd";
	}else if(ele.id == 'upButton'){
		title = '修改角色';
		op.innerText = '修改';
		content = sys.rootPath +"/role/forwardUpdate?roleId="+ele.getAttribute("attr");
	}else if(ele.id == 'rightButton'){
		title = '修改权限';
		op.innerText = '修改';
		content = sys.rootPath +"/role/goRight?roleId="+ele.getAttribute("attr");
	}else{
		layer.confirm('是否删除角色', {icon: 3, title:'提示'}, function(index){
			$.ajax({
				url: sys.rootPath +"/role/deleteRole",
				type: "post",
				data: {"roleId":ele.getAttribute("attr")},
				success: function(data){
					data = data.substring(1, data.length-1);
					if(data == "true"){
						layer.alert("删除成功");
						parent.layer.close(index);
						 grid.refresh(true);
					}else{
						layer.alert(data);
					}
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
