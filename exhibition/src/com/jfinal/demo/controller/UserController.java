package com.jfinal.demo.controller;

import java.util.List;

import org.omg.CORBA.Request;

import com.jfinal.core.Controller;
import com.jfinal.demo.model.User;

public class UserController extends Controller {
	
	/**
	 * ��ת����¼ҳ��
	 */
	public void forward_login(){
		render("/login.jsp");
	}
	
	/**
	 * ��¼
	 */
	public void login(){
		//��ȡ��¼�û���������
		String username = getRequest().getParameter("username");
		String password = getRequest().getParameter("password");
		List<User> users = null;
		//��¼��ѯsql
		String sql = "select * from sys_user where username = '" + username + "'";
		//ִ�в�ѯ����
		users = User.dao.find(sql);
		if (users.size() <= 0) {
			getRequest().setAttribute("message", "�û���������");
			render("/login.jsp");
		}else {
			sql += " and password = '" + password + "'" ;
			users = User.dao.find(sql);
			if (users.size() > 0) {
				getRequest().setAttribute("user", users.get(0).getUsername());
				redirect("/success.jsp");
			}else {
				getRequest().setAttribute("message", "�������");
				render("/login.jsp");
			}
		}
	}
	
}
