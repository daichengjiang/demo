var dtGridColumns = [
		{
			id : 'seq',
			title : '序号',
			type : 'number',
			columnClass : 'text-center',
			hideType : 'xs',
			headerStyle : 'background:#00a2ca;color:white;',
			resolution : function(value, record, column, grid, dataNo, columnNo) {
				return dataNo + 1;
			}
		},
		{
			id : 'title',
			title : '标题',
			type : 'string',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;width:300px;',
			resolution : function(value, record, column, grid, dataNo, columnNo) {
				var content = '';
				if (infoedit) {
					content += '<a onclick="loadArticleForAddOrEdit('
							+ record.id + ')" style="cursor: pointer;">'
							+ value + '</a>';
				} else {
					content += '<a onclick="viewArticle(' + record.id
							+ ')" style="cursor: pointer;">' + value + '</a>';
				}

				return content;
			}
		},
		{
			id : 'author',
			title : '作者',
			type : 'string',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;'
		},
		{
			id : 'poster',
			title : '发布人',
			type : 'string',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;'
		},
		{
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
				if (menusmap[record.menuId] != null) {
					return menusmap[record.menuId].plateName;
				}

			}
		},
		{
			id : 'simpleIntroduce',
			title : '简介',
			type : 'string',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;width:15%;',
			hideType : 'sm|xs|lg'
		},
		{
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
		},
		{
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
				} else if (value == 1) {
					return '<span class="label label-sm label-default arrowed arrowed-righ">未申请</span>';
				}
			}
		},
		{
			id : 'createTime',
			title : '创建时间',
			type : 'date',
			format : 'yyyy-MM-dd hh:mm:ss',
			otype : 'string',
			oformat : 'yyyy-MM-dd hh:mm:ss',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;',
			hideType : 'sm|xs'
		},
		{
			id : 'modifierId',
			title : '修改人',
			type : 'string',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;',
			hideType : 'sm|xs'
		},
		{
			id : 'modifyTime',
			title : '修改时间',
			type : 'date',
			format : 'yyyy-MM-dd hh:mm:ss',
			otype : 'string',
			oformat : 'yyyy-MM-dd hh:mm:ss',
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;',
			hideType : 'sm|xs|md',
			resolution : function(value, record, column, grid, dataNo, columnNo) {
				if (value == null) {
					return '';
				} else {
					return value;
				}
			}
		},
		{
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
			columnClass : 'text-center',
			headerStyle : 'background:#00a2ca;color:white;width:100px;',
			hideType : 'sm|xs',
			resolution : function(value, record, column, grid, dataNo, columnNo) {
				return '<span style="width:100px;word-break: break-all; word-wrap:break-word;">'+value+'</span>';
			}
		}/*
			 * , { id : 'operation', title : '操作', type : 'string', columnClass :
			 * 'text-center', headerStyle :
			 * 'background:#00a2ca;color:white;min-width:50px', resolution :
			 * function(value, record, column, grid, dataNo, columnNo) { var
			 * content = '';
			 * 
			 * content += '<button id="editButton" class="btn btn-xs btn-info"
			 * attr=' + record.id + 'onclick="loadArticleForAddOrEdit(' +
			 * record.id + ')"><i class="fa fa-edit"></i> 编辑</button>';
			 * content += ' '; if(infodelete){ content += '<button
			 * id="roleButton" class="btn btn-xs btn-danger" attr=' + record.id + '
			 * onclick="changeStatus(' + record.id + ',2)"><i class="fa
			 * fa-trash"></i> 删除</button>'; content += ' '; }else{ content
			 * +="--"; } return content; } }
			 */];

// 动态设置jqGrid的rowNum
var pageSize = $("#pageSize").val();
pageSize = pageSize == 0 || pageSize == "" ? sys.pageNum : pageSize;

// 列表属性设置
var dtGridOption = {
	lang : 'zh-cn',
	ajaxLoad : true,
	check : true,
	loadURL : sys.rootPath + '/info/artlist',
	columns : dtGridColumns,
	gridContainer : 'dtGridContainer',
	toolbarContainer : 'dtGridToolBarContainer',
	tools : 'refresh|export[excel,csv]|print',
	pageSize : pageSize,
	pageSizeLimit : [ 10, 20, 30 ]
};
// 初始化列表
var grid = $.fn.DtGrid.init(dtGridOption);

$(function() {
	if (null != $("#orderByColumn").val() && '' != $("#orderByColumn").val()) {
		grid.sortParameter.columnId = $("#orderByColumn").val();
		grid.sortParameter.sortType = $("#orderByType").val();
	}
	grid.parameters = new Object();
	grid.parameters['pid'] = $("#pid").val();
	grid.load();

	$("#btnSearch").click(customSearch);

	// 注册回车键事件
	document.onkeypress = function(e) {
		var ev = document.all ? window.event : e;
		if (ev.keyCode == 13) {
			customSearch();
		}
	};

});

/**
 * 自定义查询 这里不传入分页信息，防止删除记录后重新计算的页码比当前页码小而导致计算异常
 */
function customSearch() {
	grid.parameters = new Object();
	grid.parameters['searchTerm'] = $("input[name=searchTerm]").val();
	grid.parameters['searchPlate'] = $("#searchPlate").val();
	grid.parameters['pid'] = $("#pid").val();
	grid.refresh(true);
}

function changeStatus(artId, status) {
	var records = grid.getCheckedRecords();
	if (records.length == 0) {
		layer.alert("请选择需要删除的行!");
		return;
	}
	var deleteIds = "";
	for ( var i = 0; i < records.length; i++) {
		var record = records[i];
		deleteIds += record.id;
		if (i + 1 < records.length) {
			deleteIds += ",";
		}
	}

	var url = $("#updurl").val();
	if (status == 2) {
		layer.confirm("您确定要删除选中的" + records.length + "条数据吗？", {
			icon : 5,
			btn : [ '确定', '取消' ]
		// 按钮
		}, function() {
			var updatestatusurl = url;
			$.ajax({
				url : updatestatusurl,
				type : "post",
				data : {
					"artId" : deleteIds,
					"status" : 2,
					"other" : "allarts"
				},
				success : function(data) {
					layer.alert(data, function(index) {
						grid.refresh(true);
						layer.close(index);
					});

				}

			});
		});
	} else {
		var updatestatusurl = url;
		$.ajax({
			url : updatestatusurl,
			type : "post",
			data : {
				"artId" : artId,
				"status" : status,
				"other" : "allarts"
			},
			success : function(data) {
				layer.alert(data, function(index) {
					grid.refresh(true);
					layer.close(index);
				});

			}

		});
	}
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
