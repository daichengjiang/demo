var dtGridColumns = [{
    id : 'advertiseId',
    title : '广告代码',
    type : 'number',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;'
},{
    id : 'menuId',
    title : '菜单代码',
    type : 'number',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;'
},{
	id : 'name',
	title : '菜单路径',
	type : 'string',
	columnClass : 'text-center',
	hideType : 'xs',
	headerStyle : 'background:#438eb9;color:white;'
},{
    id : 'position',
    title : '位置',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;'
},{
    id : 'grouping',
    title : '分组',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;'
},{
    id : 'seq',
    title : '分组序号',
    type : 'number',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;'
},{
    id : 'pictureUrl',
    title : '图片链接',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;',
    resolution : function(value, record, column, grid, dataNo, columnNo) {
    	if (value == null) {
			return '';
		} else {
			return '<a href="'+value+'">'+value+'</a>';
		}
    }
},{
    id : 'startDate',
    title : '开始时间',
    type : 'date',
    format : 'yyyy-MM-dd',
	otype : 'string',
	oformat : 'yyyy-MM-dd',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;',
    resolution : function(value, record, column, grid, dataNo, columnNo) {
    	if (value == null) {
			return '';
		} else {
			return value.replace(' 00:00:00','');
		}
    }
},{
    id : 'endDate',
    title : '结束时间',
    type : 'date',
    format : 'yyyy-MM-dd',
	otype : 'string',
	oformat : 'yyyy-MM-dd',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;',
    resolution : function(value, record, column, grid, dataNo, columnNo) {
    	if (value == null) {
			return '';
		} else {
			return value.replace(' 00:00:00','');
		}
    }
}, {
    id : 'marketName',
    title : '所属市场',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;'
},{
    id : 'status',
    title : '状态',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;',
    hideType : 'xs',
    resolution : function(value, record, column, grid, dataNo, columnNo) {
    	if(value == 'W'){
            return '<span class="label label-sm label-warning arrowed arrowed-righ">待启用</span>';
        }else if(value == 'Y'){
            return '<span class="label label-sm label-success arrowed arrowed-righ">启用中</span>';
        }else if(value == 'N'){
            return '<span class="label label-sm label-danger arrowed arrowed-righ">已过期</span>';
        }else{
        	return '<span class="label label-sm label-default arrowed arrowed-righ">未提交</span>';
        }
    }
},{
    id : 'default',
    title : '默认图片设置',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;',
    resolution : function(value, record, column, grid, dataNo, columnNo) {
    	var html='';
    	if(record.defaultPath != null){
    		html ='<button style="border-radius:5px 5px;" class="btn btn-xs btn-success" attr=' + record.advertiseId + ' onclick="defaultSet(' + record.advertiseId + ');"><i class="fa fa-edit"></i>  默认图片</button>';
    	}else{
    		html ='<button style="border-radius:5px 5px;" class="btn btn-xs btn-info" attr=' + record.advertiseId + ' onclick="defaultSet(' + record.advertiseId + ');"><i class="fa fa-edit"></i>  默认图片</button>';
    	}
    	return html;
    }
},{id:'operation', 
    	title:'操作', 
    	type:'string', 
    	columnClass:'text-center', 
    	headerStyle : 'background:#438eb9;color:white;', 
    	resolution:function(value, record, column, grid, dataNo, columnNo){
        var content = '';
        content += '<button id="setButton" style="border-radius:5px 5px;" class="btn btn-xs btn-info" attr=' + record.advertiseId + ' onclick="showModal(this);"><i class="fa fa-edit"></i>  设置</button>';
        content += '  ';
        content += '<button id="deButton" style="border-radius:5px 5px;" class="btn btn-xs btn-danger" attr=' + record.advertiseId + ' onclick="showModal(this);"><i class="fa fa-edit"></i>  删除</button>';
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
    loadURL : sys.rootPath + '/advertise/advList',
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
    grid.parameters['marketName'] = $("#marketName").val();
    grid.parameters['name'] = $("#name").val();
    grid.parameters['status'] = $("#status").val();
    grid.refresh(true);  //列表刷新
}

//显示操作框（添加和修改共用）
function showModal(ele){
	if(ele.id == 'setButton'){
		layer.open({
		    type: 2,
		    title: '广告设置',
		    fix: false, //不固定
		    maxmin: true,
	        shadeClose: false, //点击遮罩关闭层
	        area : ['1000px' , '700px'],
		    content: sys.rootPath + "/advertise/goAdvertiseSet?advertiseId="+ele.getAttribute("attr")
		  });
	}else if(ele.id == 'deButton'){
		layer.confirm('是否删除该广告', {icon: 3, title:'提示'}, function(index){
			$.ajax({
				url: sys.rootPath + "/advertise/advertiseDelete",
				type: "post",
				data: {"advertiseId":ele.getAttribute("attr")},
				success: function(data){
					if(data){
						layer.alert("删除成功");
						parent.layer.close(index); 
						grid.refresh(true);  //列表刷新
					}else{
						layer.alert("删除失败");
					}
				},
				error : function(data) {
					console.log("error");
					layer.alert("系统异常请联系管理员");
				}
			});
		    layer.close(index);
		});
	}
}

//默认广告图片设置
function defaultSet(advertiseId){
	layer.open({
		type: 2,
		title: '默认广告图片设置',
		fix: false, //不固定
		maxmin: true,
		shadeClose: false, //点击遮罩关闭层
		area : ['1000px' , '700px'],
		content: sys.rootPath + "/advertise/goDefaultSet?advertiseId="+advertiseId
	});
}

