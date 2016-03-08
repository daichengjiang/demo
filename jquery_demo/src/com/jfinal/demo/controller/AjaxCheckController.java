package com.jfinal.demo.controller;

import java.util.List;

import com.jfinal.core.Controller;
import com.jfinal.demo.model.User;

public class AjaxCheckController extends Controller{

	/**
	 * 校验单个元素是否存在
	 */
	public void checkIsExist(){
		//获取校验表单元素id
		String fieldId = getRequest().getParameter("fieldId");
		//获取校验表单元素值
		String fieldValue = getRequest().getParameter("fieldValue");
		//获取校验结果json字符串
		String jsonText = checkout(fieldId, fieldValue);
		//返回json数据到validateEngine
		renderJson(jsonText);
	}
	
	/**
	 * form提交校验
	 */
	public void checkForm(){
		//获取注册表单用户对象
		User user = getModel(User.class);
		//注册表单项filedId数组
		String[] attrNames;
		//注册表单项filedValue数组
		Object[] attrValues;
		if (user != null) {
			//赋值
			attrNames = user._getAttrNames();
			attrValues = user._getAttrValues();
			//返回json数据字符串
			StringBuffer jsonText = new StringBuffer("[");
			//循环遍历唯一项校验
			for (int i = 0; i < attrNames.length; i++) {
				if ("password".equals(attrNames[i])) {
					continue;
				}
				String str = checkout(attrNames[i], attrValues[i].toString());
				jsonText.append(str + ",");
			}
			jsonText.replace(jsonText.lastIndexOf(","), jsonText.lastIndexOf(",")+1, "]");
			System.out.println("jsonText================="+jsonText.toString());
			renderJson(jsonText.toString());
		}
	}
	
	
	/**
	 * 校验方法
	 * @param fieldId 元素ID
	 * @param fieldValue 元素值
	 * @return json字符串
	 */
	public String checkout(String fieldId,String fieldValue){
		List<User> users = null;
		String jsonText = "";
		//唯一查询sql
		String sql = "select * from sys_user where " + fieldId + " = '" + fieldValue + "'";
		//执行查询操作
		users = User.dao.find(sql);
		//判断如果不存在，则可用
		if (users.size() <= 0) {
			if ("username".equals(fieldId)) {
				jsonText = "[\""+fieldId+"\",true,\" 此用户可以使用\"]";
			}else if ("phone".equals(fieldId)) {
				jsonText = "[\""+fieldId+"\",true,\" 此手机可以使用\"]";
			}else{
				jsonText = "[\""+fieldId+"\",true,\" 此邮箱可以使用\"]";
			}
		}else {
			if ("username".equals(fieldId)) {
				jsonText = "[\""+fieldId+"\",false,\" 此用户已被使用\"]";
			}else if ("phone".equals(fieldId)) {
				jsonText = "[\""+fieldId+"\",false,\" 此手机已被使用\"]";
			}else{
				jsonText = "[\""+fieldId+"\",false,\" 此邮箱已被使用\"]";
			}
		}
		return jsonText;
	}
	
}
