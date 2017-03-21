var dtGridColumns = [{
    id : 'id',
    title : '序号',
    type : 'number',
    columnClass : 'text-center',
    hideType : 'xs',
    headerStyle : 'background:#00a2ca;color:white;',
    resolution : function(value, record, column, grid2, dataNo, columnNo) {
    	return dataNo + 1;
    }
}, {
    id : 'title',
    title : '标题',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#00a2ca;color:white;'
}, {
    id : 'author',
    title : '作者',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#00a2ca;color:white;'
},  {
    id : 'poster',
    title : '发布人',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#00a2ca;color:white;'
},{
    id : 'source',
    title : '来源',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#00a2ca;color:white;',
    hideType : 'sm|xs'  
    
}, {
    id : 'modifierId',
    title : '修改人',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#00a2ca;color:white;',
    hideType : 'sm|xs'
}, {
    id : 'simpleIntroduce',
    title : '简介',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#00a2ca;color:white;',
    hideType : 'sm|xs'
}, {
    id : 'importance',
    title : '置顶',
    type : 'number',
    columnClass : 'text-center',
    headerStyle : 'background:#00a2ca;color:white;',
    hideType : 'sm|xs',
    resolution : function(value, record, column, grid2, dataNo, columnNo) {
        if (value == 2) {
            return '<span class="label label-sm label-success arrowed arrowed-righ">已置顶</span>';
        } else {
            return '<span class="label label-sm label-warning arrowed arrowed-righ">未置顶</span>';
        }
    }
},{
    id : 'status',
    title : '状态',
    type : 'number',
    columnClass : 'text-center',
    headerStyle : 'background:#00a2ca;color:white;',
    hideType : 'sm|xs',
    resolution : function(value, record, column, grid2, dataNo, columnNo) {
        if (value == 4) {
            return '<span class="label label-sm label-info arrowed arrowed-righ">已发布</span>';
        } else {
            return '<span class="label label-sm label-danger arrowed arrowed-righ">未发布</span>';
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
    headerStyle : 'background:#00a2ca;color:white;',
    hideType : 'sm|xs'
}, {
    id : 'modifyTime',
    title : '修改时间',
    type : 'date',
    format : 'yyyy-MM-dd hh:mm:ss',
    otype : 'string',
    oformat : 'yyyy-MM-dd hh:mm:ss',
    columnClass : 'text-center',
    headerStyle : 'background:#00a2ca;color:white;',
    hideType : 'sm|xs|md',
    resolution : function(value, record, column, grid2, dataNo, columnNo) {
        if (value == null) {
            return '';
        } else {
            return value;
        }
    }
}, {id:'operation', title:'操作', type:'string', columnClass:'text-center', headerStyle : 'background:#00a2ca;color:white;', resolution:function(value, record, column, grid2, dataNo, columnNo){
    var content = '';
    	content += '<button id="addButton" class="btn btn-xs btn-info" attr=' + record.id + ' onclick="changeStatus2('+record.id+','+$("#sidebarId").val()+')"><i class="fa fa-plus"></i>  添加</button>';
	    content += '  ';
	    content += '  ';
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
    loadURL : sys.rootPath + '/sidebar/addlist',
    columns : dtGridColumns,
    gridContainer : 'dtGridContainer2',
    toolbarContainer : 'dtGridToolBarContainer2',
    tools : 'refresh|export[excel,csv]|print',
    pageSize : pageSize,
    pageSizeLimit : [10, 20, 30]
};
//初始化列表
var grid2 = $.fn.DtGrid.init(dtGridOption);

console.log(grid2);

$(function() {
    if(null != $("#orderByColumn").val() && '' != $("#orderByColumn").val())
    {
        grid2.sortParameter.columnId = $("#orderByColumn").val();
        grid2.sortParameter.sortType = $("#orderByType").val();
    }
    grid2.parameters = new Object();
    grid2.parameters['pid'] = $("#pid").val();
    grid2.parameters['sidebarId'] = $("#sidebarId").val();
    grid2.load();
    
    $("#btnSearch2").click(customSearch);
    
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
    grid2.parameters = new Object();
    grid2.parameters['pid'] = $("#pid").val();
    grid2.parameters['sidebarId'] = $("#sidebarId").val();
    grid2.parameters['searchTerm'] = $("input[name=searchTerm2]").val();
    grid2.refresh(true);
}


function changeStatus2(artId, sidebarId){
	/*var url = $("#updurl").val();
	if(status==2){*/
		layer.confirm("您确定要添加吗？", {icon:1,
					  btn: ['确定','取消'] //按钮
					}, function(){
						$.ajax({
							url:sys.rootPath + '/sidebar/addSidebarId',
							type:"post",
							data:{"artId":artId,"sidebarId":sidebarId},
							success:function(data){
								layer.alert(data,function(index){
									grid2.refresh(true);
									layer.close(index);
								});
								
							}
						
						});
					});
	/*}else{
		var updatestatusurl = url;
		$.ajax({
			url:updatestatusurl,
			type:"post",
			data:{"artId":artId,"status":status,"other":"allarts"},
			success:function(data){
				layer.alert(data,function(index){
					grid2.refresh(true);
					layer.close(index);
				});
				
			}
		
		});
	}*/

}
