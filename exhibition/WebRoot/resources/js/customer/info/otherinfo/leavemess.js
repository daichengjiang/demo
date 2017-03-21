var dtGridColumns = [
{
	id : 'id',
	title : '编号',
	type : 'number',
	columnClass : 'text-center',
	headerStyle : 'background:#00a2ca;color:white;'
},
{
	id : 'username',
	title : '会员名称',
	type : 'string',
	columnClass : 'text-center',
	headerStyle : 'background:#00a2ca;color:white;'
},
{
	id : 'content',
	title : '留言内容',
	type : 'string',
	columnClass : 'text-center',
	headerStyle : 'background:#00a2ca;color:white;',
	resolution : function(value, record, column, grid, dataNo, columnNo) {
		var content ='';
		value = cutstr(value,40);
		content+='<a onclick="option(' + record.id + ',2)" style="cursor: pointer;">' + value + '</a>';
		return content;
	}
},
{
    id : 'createTime',
    title : '留言时间',
    type : 'date',
    format : 'yyyy-MM-dd hh:mm:ss',
    otype : 'string',
    oformat : 'yyyy-MM-dd hh:mm:ss',
    columnClass : 'text-center',
    headerStyle : 'background:#00a2ca;color:white;',
    hideType : 'sm|xs'
},
{
    id : 'userId',
    title : '回复人',
    type : 'String',
    columnClass : 'text-center',
    headerStyle : 'background:#00a2ca;color:white;',
},
{
	id : 'answerTime',
    title : '回复时间',
    type : 'date',
    format : 'yyyy-MM-dd hh:mm:ss',
    otype : 'string',
    oformat : 'yyyy-MM-dd hh:mm:ss',
    columnClass : 'text-center',
    headerStyle : 'background:#00a2ca;color:white;',
    hideType : 'sm|xs',
    resolution : function(value, record, column, grid, dataNo, columnNo) {
        if (value == null) {
            return '';
        } else {
            return value;
        }
    }
},
{
    id : 'status',
    title : '状态',
    type : 'number',
    columnClass : 'text-center',
    headerStyle : 'background:#00a2ca;color:white;',
    resolution : function(value, record, column, grid, dataNo, columnNo) {
        if (value == 1) {
            return '<span class="label label-sm label-default arrowed arrowed-righ">未审核</span>';
        } else if(value == 2) {
            return '<span class="label label-sm label-success arrowed arrowed-righ">审核通过</span>';
        } else{
        	return '<span class="label label-sm label-danger arrowed arrowed-righ">已驳回</span>';
        }
    }
},
{
	id : 'operation',
	title : '操作',
	type : 'string',
	columnClass : 'text-center',
	headerStyle : 'background:#00a2ca;color:white;',
	resolution : function(value, record, column, grid, dataNo, columnNo) {
		var str = '';
		str += '<button id="'+record.id+'" class="btn btn-primary btn-sm" style="border-radius:5px 5px;padding:1px 6px;" onclick="updateStatus('+record.id+')">审核</button>';
		return str;
	}
}
];

// 动态设置jqGrid的rowNum
var pageSize = $("#pageSize").val(); 
pageSize = pageSize == 0 || pageSize == "" ? sys.pageNum : pageSize;

// 列表属性设置
var dtGridOption = {
	lang : 'zh-cn',
    ajaxLoad : true,
    check : true,
	loadURL : sys.rootPath + '/otherinfo/leavemesslist',
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
	grid.refresh(true);
}

/*//添加
function addAboutUs(){
	layer.open({
		  type: 2,
		  title:"关于我们添加",
		  shadeClose: false,
		  shade: 0.4,
		   maxmin: true, //开启最大化最小化按钮
		  area: ['70%', '80%'], //宽高
		  content: sys.rootPath + '/otherinfo/goaddaboutus'
	});
}*/

//审核
function updateStatus(id){
	layer.open({
		  type: 2,
		  title:"网站留言审核",
		  shadeClose: false,
		  shade: 0.4,
		   maxmin: true, //开启最大化最小化按钮
		  area: ['600px', '300px'], //宽高
		  content: sys.rootPath + '/otherinfo/auditMessage?id='+id
	});
}

//设置内容显示长度
var GetLength = function (str) {
    ///<summary>获得字符串实际长度，中文2，英文1</summary>
    ///<param name="str">要获得长度的字符串</param>
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
    }
    return realLength;
};

function cutstr(str, len) {
    var str_length = 0;
    var str_len = 0;
    str_cut = new String();
    str_len = str.length;
    for (var i = 0; i < str_len; i++) {
        a = str.charAt(i);
        str_length++;
        if (escape(a).length > 4) {
            //中文字符的长度经编码之后大于4  
            str_length++;
        }
        str_cut = str_cut.concat(a);
        if (str_length >= len) {
            str_cut = str_cut.concat("...");
            return str_cut;
        }
    }
    //如果给定字符串小于指定长度，则返回源字符串；  
    if (str_length < len) {
        return str;
    }
}

//查看详情内容
function option(id) {
	var url = sys.rootPath + '/otherinfo/leavemessdetail?id=' + id;
	var title = "网站留言";
	
	layer.open({
	    type: 2,
	    title: title,
	    fix: false, //不固定
	    maxmin: true,
        shadeClose: false, //点击遮罩关闭层
        area : ['800px' , '725px'],
	    content: url
	  });
}

//删除
function deleteLeaveMess(){
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
	layer.confirm("您确定要删除选中的" + records.length + "条数据吗？", {
		icon : 5,
		btn : [ '确定', '取消' ]
	// 按钮
	}, function() {
		$.ajax({
			url : sys.rootPath + '/otherinfo/deleteleavemess',
			type : "post",
			data : {
				"leaveMessIds" : deleteIds
			},
			success : function(data) {
				data = JSON.parse(data);
				layer.alert(data, function(index) {
					grid.refresh(true);
					layer.close(index);
				});
			}
		});
	});
}

