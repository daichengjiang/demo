package com.jfinal.demo.controller;

import java.util.List;

import org.omg.CORBA.Request;

import com.jfinal.core.Controller;
import com.jfinal.demo.model.User;

public class UserController extends Controller {
	
	/**
	 * 跳转到登录页面
	 */
	public void forward_login(){
		render("/login.jsp");
	}
	
	/**
	 * 登录
	 */
	public void login(){
		//获取登录用户名和密码
		String username = getRequest().getParameter("username");
		String password = getRequest().getParameter("password");
		List<User> users = null;
		//登录查询sql
		String sql = "select * from sys_user where username = '" + username + "'";
		//执行查询操作
		users = User.dao.find(sql);
		if (users.size() <= 0) {
			getRequest().setAttribute("message", "用户名不存在");
			render("/login.jsp");
		}else {
			sql += " and password = '" + password + "'" ;
			users = User.dao.find(sql);
			if (users.size() > 0) {
				getRequest().setAttribute("user", users.get(0).getUsername());
				redirect("/success.jsp");
			}else {
				getRequest().setAttribute("message", "密码错误");
				render("/login.jsp");
			}
		}
	}
	
}
