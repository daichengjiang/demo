var dtGridColumns = [{
    id : 'seq',
    title : '序号',
    type : 'number',
    columnClass : 'text-center',
    hideType : 'xs',
    headerStyle : 'background:#00a2ca;color:white;',
    resolution : function(value, record, column, grid, dataNo, columnNo) {
    	return dataNo + 1;
    }
}, {
    id : 'title',
    title : '标题',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#00a2ca;color:white;',
    resolution : function(value, record, column, grid, dataNo, columnNo) {
        return '<a onclick="showModal(this,'+record.id+')" style="cursor: pointer;">'+value+'</a>';
    }
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
    hideType : 'sm|xs|lg'  
    
},
{
	id : 'menuId',
	title : '板块',
	type : 'string',
	columnClass : 'text-center',
	headerStyle : 'background:#00a2ca;color:white;',
	hideType : 'sm|xs',
	resolution : function(value, record, column, grid, dataNo, columnNo) {
		if(menusmap[record.menuId]!=null){
			return menusmap[record.menuId].plateName;
		}
		
	}
}, {
    id : 'simpleIntroduce',
    title : '简介',
    type : 'string',
    columnClass : 'text-center',
    headerStyle : 'background:#00a2ca;color:white;width:15%;',
    hideType : 'sm|xs|lg'
}, {
    id : 'importance',
    title : '置顶',
    type : 'number',
    columnClass : 'text-center',
    headerStyle : 'background:#00a2ca;color:white;',
    hideType : 'sm|xs',
    resolution : function(value, record, column, grid, dataNo, columnNo) {
        if (value == 2) {
            return '<span class="label label-sm label-success arrowed arrowed-righ">已置顶</span>';
        } else {
            return '<span class="label label-sm label-default arrowed arrowed-righ">未置顶</span>';
        }
    }
},{
    id : 'status',
    title : '状态',
    type : 'number',
    columnClass : 'text-center',
    headerStyle : 'background:#00a2ca;color:white;',
    hideType : 'sm|xs',
    resolution : function(value, record, column, grid, dataNo, columnNo) {
	  if (value == 4) {
          return '<span class="label label-sm label-success arrowed arrowed-righ">已发布</span>';
      } else if (value == 3) {
          return '<span class="label label-sm label-warning arrowed arrowed-righ">待审核</span>';
      }else if (value == 1) {
          return '<span class="label label-sm label-default arrowed arrowed-righ">未申请</span>';
      }else if (value == 5) {
          return '<span class="label label-sm label-danger arrowed arrowed-righ">已驳回</span>';
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
    id : 'modifierId',
    title : '修改人',
    type : 'string',
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
    headerStyle : 'background:#00a2ca;color:white;min-width:80px;',
    hideType : 'sm|xs|md',
    resolution : function(value, record, column, grid, dataNo, columnNo) {
        if (value == null) {
            return '';
        } else {
            return value;
        }
    }
},{
	id : 'remark',
	title : '备注',
	type : 'string',
	columnClass : 'text-center',
	headerStyle : 'background:#00a2ca;color:white;width:60px;',
	hideType : 'sm|xs|md',
	resolution : function(value, record, column, grid, dataNo, columnNo) {
		return '<a href="javascript:void(0)" onclick="modifyRemark('
				+ record.id + ',\'' + value + '\')">设置</a>';
	}
},{
	id : 'remark',
	title : '备注内容',
	type : 'string',
	columnClass : 'text-center;',
	headerStyle : 'background:#00a2ca;color:white;width:100px;',
	hideType : 'sm|xs',
	resolution : function(value, record, column, grid, dataNo, columnNo) {
		return '<span style="width:100px;word-break: break-all; word-wrap:break-word;">'+value+'</span>';
	}
}, {id:'operation', title:'操作', type:'string', columnClass:'text-center', headerStyle : 'background:#00a2ca;color:white;', resolution:function(value, record, column, grid, dataNo, columnNo){
    var content = '';
    if(record.status==1 || record.status==5){
    	content += '<button id="editButton" class="btn btn-xs btn-info" attr=' + record.id + ' onclick="changeStatus('+record.id+',3)"><i class="fa fa-edit"></i>申请</button>';
    	content += '  ';
    }else if(record.status==3){
	    content += '<button id="roleButton" class="btn btn-xs btn-danger" attr=' + record.id + ' onclick="changeStatus('+record.id+',1)"><i class="fa fa-trash"></i>撤销</button>';
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
    check : false,
    loadURL : sys.rootPath + '/info/pubArticleApplyList',
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
	console.log($("select[name=plate]").val());
    grid.parameters = new Object();
    grid.parameters['searchTerm'] = $("input[name=searchTerm]").val();
    grid.parameters['searchPlate'] = $("#searchPlate").val();
    grid.refresh(true);
}

//显示操作框（添加和编辑共用）
function showModal(ele,artId){
	
	//操作框标题
	var title;
	var content;
	var op = $("#opButton");
	title = '文章详情';
	op.innerText = '查看';
	content = $("#ctx").val()+ "info/forwardApplyArticleDetail?artId="+artId+"&type=1";
	layer.open({
	    type: 2,
	    title: title,
	    fix: false, //不固定
	    maxmin: true,
        shadeClose: false, //点击遮罩关闭层
        area : ['850px' , '600px'],
	    content: content
	  });
}



function changeStatus(artId, status){
	var updatestatusurl = $("#updatestatusurl").val();
	var remark = $("#remark").val();
	var  tip = (status==3?"确认申请发布？":"您确定要取消申请吗？");
	var  icons = (status==3?3:5);
	layer.confirm(tip, {icon:icons,
		  btn: ['确定','取消'] //按钮
		},function(){
			$.ajax({
				url:updatestatusurl,
				type:"post",
				data:{"artId":artId,"status":status,"other":"apply","remark":remark},
				success:function(data){
					layer.alert(data,function(index){
						layer.close(index);
						 grid.refresh(true);
					});
					
				}
			
			});
			
		}
	);
}

function modifyRemark(artid, oldremark) {
	$("#old_remark").text(oldremark);
	// 捕获页
	layer.open({
		type : 1,
		shade : false,
		title : "修改备注", // 不显示标题
		area : [ "30%", "30%" ],
		btn : [ "修改", "关闭" ],
		btn1 : function() {
			var newremark = $("#old_remark").val();
			if(oldremark==newremark){
				return;
			}
			$.ajax({
				url : $("#ctx").val() + "info/updateRemark",
				type : "post",
				data : {
					"newRemark" : newremark,
					"artId" : artid
				},
				success : function(data) {

					if (data == "true") {
						parent.layer.alert("修改成功!", function(index) {
							parent.grid.refresh(true);
							parent.layer.closeAll();
						});
					} else {
						parent.layer.alert("修改失败!", function(index) {
							parent.grid.refresh(true);
							parent.layer.closeAll();
						});
					}
				}
			});

		},
		btn2 : function() {
			layer.close();
		},
		content : $('#mremark')
	});

}
