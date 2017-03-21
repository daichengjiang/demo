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
    id : 'username',
    title : '用户名',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;'
}, {
    id : 'nickname',
    title : '昵称',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;'
},  {
    id : 'realname',
    title : '真实姓名',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;'
},{
	id : 'phone',
	title : '手机号码',
	type : 'string',
	columnClass : 'text-center',
	headerStyle : 'background:#438eb9;color:white;',
	 hideType : 'sm|xs|md'
},{
	id : 'email',
	title : '电子邮箱',
	type : 'string',
	columnClass : 'text-center',
	headerStyle : 'background:#438eb9;color:white;',
	 hideType : 'sm|xs|md'
},{
	id : 'idCard',
	title : '身份证号',
	type : 'string',
	columnClass : 'text-center',
	headerStyle : 'background:#438eb9;color:white;',
	 hideType : 'sm|xs|md'
},{
    id : 'sex',
    title : '性别',
    type : 'number',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;',
    hideType : 'sm|xs',
    resolution : function(value, record, column, grid, dataNo, columnNo) {
        if (value == '0') {
            return '<span class="label label-sm label-success arrowed arrowed-righ">男</span>';
        } else if(value == '1') {
            return '<span class="label label-sm label-info arrowed arrowed-righ">女</span>';
        }else{
        	return ' ';
        }
    }
},{
	id : 'address',
	title : '现居地',
	type : 'string',
	columnClass : 'text-center',
	headerStyle : 'background:#438eb9;color:white;',
	 hideType : 'sm|xs|md'
},{
	id : 'icon',
	title : '头像',
	type : 'string',
	columnClass : 'text-center',
	headerStyle : 'background:#438eb9;color:white;',
	 hideType : 'sm|xs|md|lg'
},{
    id : 'birthday',
    title : '出生日期',
    type : 'date',
    format : 'yyyy-MM-dd',
    otype : 'string',
    oformat : 'yyyy-MM-dd',
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
}, {
/*	id : 'password',
	title : '密码',
	type : 'string',
	columnClass : 'text-center',
	headerStyle : 'background:#438eb9;color:white;',
	hideType : 'sm|xs|md|lg'
},{*/
	id : 'validateCode',
	title : '激活码',
	type : 'string',
	columnClass : 'text-center',
	headerStyle : 'background:#438eb9;color:white;',
	hideType : 'sm|xs|md|lg'
},{
	id : 'status',
	title : '会员状态',
	type : 'number',
	columnClass : 'text-center',
	headerStyle : 'background:#438eb9;color:white;',
	hideType : 'sm|xs',
	resolution : function(value, record, column, grid, dataNo, columnNo) {
		if (value == 0) {
			return '<span class="label label-sm label-default arrowed arrowed-righ">未激活</span>';
		} else if(value == 1) {
			return '<span class="label label-sm label-info arrowed arrowed-righ">已激活</span>';
		}else if(value == 2) {
			return '<span class="label label-sm label-warning arrowed arrowed-righ">已锁定</span>';
		}else if(value == 3) {
			return '<span class="label label-sm label-danger arrowed arrowed-righ">已注销</span>';
		}else{
			return '';
		}
	}
},{
	id : 'mender',
	title : '修改者',
	type : 'string',
	columnClass : 'text-center',
	headerStyle : 'background:#438eb9;color:white;',
	hideType : 'sm|xs|md'
},{
    id : 'registerTime',
    title : '注册时间',
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
},{
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
},{
	id:'operation', title:'操作', type:'string', columnClass:'text-center', headerStyle : 'background:#438eb9;color:white;', resolution:function(value, record, column, grid, dataNo, columnNo){
		var content = '';
    	if(record.status != 3 && record.status != 0){
    		if(member_lock){
	    		if(record.status == 2){
	    			content += '<button id="lockButton" class="btn btn-xs btn-primary" onclick="option(\'' + record.username + '\',1);" style="border-radius:5px 5px;"><i class="fa fa-cogs"></i>  解锁</button>';
	    			content += '  ';
	    		}else{
	    			content += '<button id="lockButton" class="btn btn-xs btn-warning" onclick="option(\'' + record.username + '\',2);" style="border-radius:5px 5px;"><i class="fa fa-cogs"></i>  锁定</button>';
	    			content += '  ';
	    		}
    		}
	    	if(member_cancel){
	    		content += '<button id="lockButton" class="btn btn-xs btn-danger" onclick="option(\'' + record.username + '\',3);" style="border-radius:5px 5px;"><i class="fa fa-trash"></i>  注销</button>';
	    		content += '  ';
	    	}
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
    loadURL : sys.rootPath + '/member/list',
    columns : dtGridColumns,
    gridContainer : 'dtGridContainer',
    toolbarContainer : 'dtGridToolBarContainer',
    tools : 'refresh',
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
    grid.parameters['username'] = $("#username").val();
    grid.parameters['status'] = $("#status").val();
    grid.refresh(true);
}


//锁定、解锁、注销
function option(username,status){
		layer.confirm("您确定要执行此操作吗？", {
			icon : 3,
			btn : [ '确定', '取消' ]
		// 按钮
		}, function() {
			$.ajax({
				url : sys.rootPath +'/member/updateStatus.html',
				type : "post",
				data : {"username" : username,"status" : status},
				success : function(json) {
					var data = JSON.parse(json);
					layer.alert(data, function(index) {
						grid.refresh(true);
						layer.closeAll();
					});
				}
			});
		});
}


