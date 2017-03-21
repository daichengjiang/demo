var dtGridColumns = [{
    id : 'id',
    title : '序号',
    type : 'number',
    columnClass : 'text-center',
    hideType : 'xs',
    headerStyle : 'background:#438eb9;color:white;'
}, {
    id : 'plateId',
    title : '板块代码',
    type : 'number',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;'
}, {
    id : 'plateName',
    title : '板块名称',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;'
},  {
    id : 'width',
    title : '图片宽度',
    type : 'number',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;',
    hideType : 'sm|xs',
    resolution : function(value, record, column, grid, dataNo, columnNo) {
          return value + 'px';
    }
},{
    id : 'height',
    title : '图片高度',
    type : 'number',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;',
    hideType : 'sm|xs',
    resolution : function(value, record, column, grid, dataNo, columnNo) {
        return value + 'px';
  }
}, {
    id : 'status',
    title : '是否启用',
    type : 'number',
    columnClass : 'text-center',
    headerStyle : 'background:#438eb9;color:white;',
    hideType : 'sm|xs',
    resolution : function(value, record, column, grid, dataNo, columnNo) {
        if (value == 0) {
            return '<span class="label label-sm label-info arrowed arrowed-righ">启用</span>';
        } else {
            return '<span class="label label-sm label-danger arrowed arrowed-righ">不启用</span>';
        }
    }
}, {id:'operation', title:'操作', type:'string', columnClass:'text-center', headerStyle : 'background:#438eb9;color:white;', resolution:function(value, record, column, grid, dataNo, columnNo){
    var content = '';
    	content += '<button id="editButton" class="btn btn-xs btn-info" attr=' + record.id + ' onclick="showModal(this);"><i class="fa fa-edit"></i>  编辑</button>';
	    content += '  ';
	    content += '<button id="delButton" class="btn btn-xs btn-danger" attr=' + record.id + ' onclick="del(this);"><i class="fa fa-remove "></i>  删除</button>';
	    content += '  ';
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
    check : false,
    loadURL : sys.rootPath + '/pic/list',
    columns : dtGridColumns,
    gridContainer : 'dtGridContainer',
    toolbarContainer : 'dtGridToolBarContainer',
    tools : 'refresh|export[excel,csv]|print',
    pageSize : pageSize,
    pageSizeLimit : [10, 20, 30]
};

//初始化列表
var grid = $.fn.DtGrid.init(dtGridOption);

console.log(grid);

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

function del(ele){
	layer.confirm("您确定要删除吗？", {icon:5,
		  btn: ['确定','取消'] //按钮
		}, function(){
			$.ajax({
				url: sys.rootPath +"/pic/delete",
				type:"post",
				data:{"id": ele.getAttribute("attr")},
				success:function(data){
					if(data > '0'){
						layer.alert("删除成功",function(index){
							grid.refresh(true);
							layer.close(index);
						});
					}else{
						layer.alert("删除失败");
					}
					
				}
			
			});
		});
}

//显示操作框（添加和编辑共用）
function showModal(ele){
	//操作框标题
	var title;
	var content;
	var op = $("#opButton");
	if(ele.id == 'addButton'){
		title = '添加图片大小';
		op.innerText = '添加';
		content = sys.rootPath +"/pic/forwardAdd";
	}else if(ele.id == 'editButton'){
		title = '编辑图片大小';
		op.innerText = '保存';
		content =  sys.rootPath +"/pic/forwardEdit?id=" + ele.getAttribute("attr");
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
