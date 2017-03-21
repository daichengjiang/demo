var dtGridColumns = [{
    id : 'id',
    title : '序号',
    type : 'number',
    columnClass : 'text-center',
    hideType : 'xs',
    headerStyle : 'background:#438eb9;color:white;',
    resolution : function(value, record, column, grid, dataNo, columnNo) {
    	return dataNo + 1;
    }
}, {
    id : 'userId',
    title : '用户代码',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;'
}, {
    id : 'name',
    title : '用户名称',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;'
},  {
    id : 'description',
    title : '描述',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;'
},{
    id : 'type',
    title : '用户类型',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;',
    hideType : 'sm|xs',
    resolution : function(value, record, column, grid, dataNo, columnNo) {
        if (value == 'ADMIN') {
            return '<span class="label label-sm label-success arrowed arrowed-righ">普通管理员</span>';
        } else {
            return '<span class="label label-sm label-info arrowed arrowed-righ">超级管理员</span>';
        }
    }
}, {
    id : 'isForbid',
    title : '是否禁用',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;',
    hideType : 'sm|xs',
    resolution : function(value, record, column, grid, dataNo, columnNo) {
        if (value == 'N') {
            return '<span class="label label-sm label-info arrowed arrowed-righ">不禁用</span>';
        } else {
            return '<span class="label label-sm label-danger arrowed arrowed-righ">禁用</span>';
        }
    }
},{
    id : 'createTime',
    title : '创建时间',
    type : 'date',
    format : 'yyyy-MM-dd hh:mm:ss',
    otype : 'string',
    oformat : 'yyyy-MM-dd hh:mm:ss',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;',
    hideType : 'sm|xs'
}, {
    id : 'modifyTime',
    title : '修改时间',
    type : 'date',
    format : 'yyyy-MM-dd hh:mm:ss',
    otype : 'string',
    oformat : 'yyyy-MM-dd hh:mm:ss',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;',
    hideType : 'sm|xs|md',
    resolution : function(value, record, column, grid, dataNo, columnNo) {
        if (value == null) {
            return '';
        } else {
            return value;
        }
    }
},  {
    id : 'loginIP',
    title : '最后一次登录IP',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;',
    hideType : 'sm|xs|md',
    resolution : function(value, record, column, grid, dataNo, columnNo) {
        if (value == null) {
            return '';
        } else {
            return value;
        }
    }
}
, {id:'operation', title:'操作', type:'string', columnClass:'text-center', headerStyle : 'background:#438eb9;color:white;', resolution:function(value, record, column, grid, dataNo, columnNo){
    var content = '';
    if(u_edit && record.type == "ADMIN"){
    	content += '<button id="editButton" class="btn btn-xs btn-info" attr=' + record.userId + ' onclick="showModal(this);" style="border-radius:5px 5px;"><i class="fa fa-edit"></i>  编辑</button>';
    	content += '  ';
    }
    if(record.type == "ADMIN"){
    	content += '<button id="roleButton" class="btn btn-xs btn-warning" attr=' + record.userId + ' onclick="showModal(this);" style="border-radius:5px 5px;"><i class="fa fa-users"></i>  角色</button>';
  	    content += '  ';
    }
    if(u_resetPwd && record.type == "ADMIN"){
    	content += '<button id="resetButton" class="btn btn-xs btn-default" attr=' + record.userId + ' onclick="showModal(this);" style="border-radius:5px 5px;"><i class="fa fa-lock"></i>  密码</button>';
   	    content += '  ';
    }
    if(u_delete && record.type == "ADMIN"){
    	content += '<button id="deleteButton" class="btn btn-xs btn-danger" attr=' + record.userId + ' onclick="remove(this);" style="border-radius:5px 5px;"><i class="fa fa-trash"></i>  删除</button>';
    	content += '  ';
    }
    return content;
}}
];

//动态设置jqGrid的rowNum
var pageSize = $("#pageSize").val();
pageSize = pageSize == 0 || pageSize == "" ? sys.pageNum : pageSize;

//列表属性设置
var dtGridOption = {
    lang : 'zh-cn',
    ajaxLoad : true,
    loadURL : sys.rootPath + '/user/list',
    columns : dtGridColumns,
    gridContainer : 'dtGridContainer',
    toolbarContainer : 'dtGridToolBarContainer',
    tools : 'refresh|export[excel,csv]|print',
    pageSize : pageSize,
    pageSizeLimit : [10, 20, 30]
};

//初始化列表
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
    grid.parameters['keywords'] = $("#keywords").val();
    grid.refresh(true);
}

//显示操作框（添加和编辑共用）
function showModal(ele){
	//操作框标题
	var title;
	var content;
	var op = $("#opButton");
	if(ele.id == 'addButton'){
		title = '添加管理员';
		op.innerText = '添加';
		content = sys.rootPath +"/user/forwardAdd";
	}else if(ele.id == 'editButton'){
		title = '编辑管理员';
		op.innerText = '编辑';
		content =  sys.rootPath +"/user/forwardEdit?userId=" + ele.getAttribute("attr");
	}else if(ele.id == 'roleButton'){
		title = '关联角色';
		op.innerText = '提交';
		content = sys.rootPath +"/user/forwardRole?userId=" + ele.getAttribute("attr");
	}else if(ele.id == 'resetButton'){
		title = '重置密码';
		op.innerText = '提交';
		content =  sys.rootPath +"/user/forwardResetPwd?userId=" + ele.getAttribute("attr");
	}
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

//删除用户
function remove(element){
	var userId = $(element).attr("attr");
	if (userId != "") {
		layer.confirm("您确定要删除吗？", {
			icon : 5,
			btn : [ '确定', '取消' ]
		// 按钮
		}, function() {
			$.ajax({
				url : sys.rootPath +'/user/delete',
				type : "post",
				data : {"userId" : userId},
				success : function(json) {
					var data = JSON.parse(json);
					layer.alert(data, function(index) {
						grid.refresh(true);
						layer.close(index);
					});
				}

			});
		});
	}
}


