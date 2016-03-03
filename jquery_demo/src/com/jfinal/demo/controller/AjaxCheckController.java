package com.jfinal.demo.controller;

import java.util.List;

import com.jfinal.core.Controller;
import com.jfinal.demo.model.User;

public class AjaxCheckController extends Controller{

	/**
	 * У�鵥��Ԫ���Ƿ����
	 */
	public void checkIsExist(){
		//��ȡУ���Ԫ��id
		String fieldId = getRequest().getParameter("fieldId");
		//��ȡУ���Ԫ��ֵ
		String fieldValue = getRequest().getParameter("fieldValue");
		//��ȡУ����json�ַ���
		String jsonText = checkout(fieldId, fieldValue);
		//����json���ݵ�validateEngine
		renderJson(jsonText);
	}
	
	/**
	 * form�ύУ��
	 */
	public void checkForm(){
		//��ȡע����û�����
		User user = getModel(User.class);
		//ע�����filedId����
		String[] attrNames;
		//ע�����filedValue����
		Object[] attrValues;
		if (user != null) {
			//��ֵ
			attrNames = user._getAttrNames();
			attrValues = user._getAttrValues();
			//����json�����ַ���
			StringBuffer jsonText = new StringBuffer("[");
			//ѭ������Ψһ��У��
			for (int i = 0; i < attrNames.length-1; i++) {
				String str = checkout(attrNames[i], attrValues[i].toString());
				jsonText.append(str + ",");
			}
			jsonText.replace(jsonText.lastIndexOf(","), jsonText.lastIndexOf(",")+1, "]");
			System.out.println("jsonText================="+jsonText.toString());
			renderJson(jsonText.toString());
		}
	}
	
	
	/**
	 * У�鷽��
	 * @param fieldId Ԫ��ID
	 * @param fieldValue Ԫ��ֵ
	 * @return json�ַ���
	 */
	public String checkout(String fieldId,String fieldValue){
		List<User> users = null;
		String jsonText = "";
		//Ψһ��ѯsql
		String sql = "select * from sys_user where " + fieldId + " = '" + fieldValue + "'";
		//ִ�в�ѯ����
		users = User.dao.find(sql);
		//�ж���������ڣ������
		if (users.size() <= 0) {
			if ("username".equals(fieldId)) {
				jsonText = "[\""+fieldId+"\",true,\" ���û�����ʹ��\"]";
			}else if ("phone".equals(fieldId)) {
				jsonText = "[\""+fieldId+"\",true,\" ���ֻ�����ʹ��\"]";
			}else{
				jsonText = "[\""+fieldId+"\",true,\" ���������ʹ��\"]";
			}
		}else {
			if ("username".equals(fieldId)) {
				jsonText = "[\""+fieldId+"\",false,\" ���û��ѱ�ʹ��\"]";
			}else if ("phone".equals(fieldId)) {
				jsonText = "[\""+fieldId+"\",false,\" ���ֻ��ѱ�ʹ��\"]";
			}else{
				jsonText = "[\""+fieldId+"\",false,\" �������ѱ�ʹ��\"]";
			}
		}
		return jsonText;
	}
	
}
