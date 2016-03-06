package com.jfinal.demo.controller;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.List;

import com.jfinal.core.Controller;
import com.jfinal.demo.model.User;
import com.jfinal.kit.JsonKit;

public class UserController extends Controller {
	
	/**
	 * 跳转到登录页面
	 */
	public void forwardLogin(){
		render("/login.jsp");
	}
	
	/**
	 * 登录
	 */
	public void login(){
		//获取登录用户名和密码
		String username = getRequest().getParameter("username");
		String password = getRequest().getParameter("password");
		//登录查询sql
		String sql = "select * from sys_user where username = '" + username + "'";
		List<User> users = getUsers(sql);
		if (users.size() <= 0) {
			getRequest().setAttribute("message", "用户名不存在");
			forwardAction("/user/forwardLogin");
		}else {
			getSession().setAttribute("username", users.get(0).getUsername());
			sql += " and password = '" + password + "'" ;
			users = User.dao.find(sql);
			if (users.size() > 0) {
				getSession().setAttribute("nickname", users.get(0).getNickname());
				forwardAction("/user/forwardMgr");
			}else {
				getRequest().setAttribute("message", "密码错误");
				forwardAction("/user/forwardLogin");
			}
		}
	}
	
	/**
	 * 跳转到后台管理页面
	 */
	public void forwardMgr(){
		redirect("/pages/index.jsp");
	}
	
	
	/**
	 * 跳转到注册页面
	 */
	public void forwardRegister(){
		render("/register.jsp");
	}
	
	/**
	 * 注册
	 */
	public void register(){
		//获取注册用户信息
		User user = getModel(User.class);
		if (user != null) {
			user.setCreateTime(new Date());
			user.setStatus("1");
			boolean flag = user.save();
			if (flag) {
				forwardLogin();
			}else {
				/*render("/register.jsp");*/
				forwardAction("/user/forwardRegister");
			}
		}
	}
	
	/**
	 * 注销
	 */
	public void logout(){
		//清除登录用户信息
		if (getSession().getAttribute("username") != null || getSession().getAttribute("nickname") != null) {
			getSession().removeAttribute("username");
			getSession().removeAttribute("nickname");
			render("/login.jsp");
		}
		
	}
	
	/**
	 *获取用户列表
	 */
	public void userList(){
	      //获取需要展示的用户数据
	      String sql = "select username,password,phone,email,status,create_time from sys_user";
		  List<User> users = getUsers(sql);
		  for (User user : users) {
			  if ("1".equals(user.getStatus())) {
				user.setStatus("正常");
			}else {
				user.setStatus("禁用");
			}
		  }
	      //转成Json格式
	      String json = JsonKit.toJson(users);
	      System.out.println(json);
	      renderJson(json);
	}
	
	/**
	 * 根据查询条件获取用户列表
	 * @param sql
	 * @return
	 */
	public List<User> getUsers(String sql){
		List<User> users = null;
		//执行查询操作
		users = User.dao.find(sql);
		return users;
	}
	
	/**
	 * 搜索关键字
	 */
	public void seach(){
		//String keyword = getRequest().getParameter("q");
		String keyword = "";
		try {
			keyword = new String(getRequest().getParameter("q").getBytes("iso8859-1"),"utf-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		String sql = "select username from sys_user where 1=1 ";
		if (keyword != "" && keyword != null) {
			sql += "and username like '" + keyword + "%'";
		}
		List<User> users = getUsers(sql); 
		String[] data = new String[users.size()];
		//转成Json格式
		if (users.size() > 0) {
			for (int i = 0; i < users.size(); i++) {
				data[i] = users.get(i).getUsername();
			}
		}
        String json = JsonKit.toJson(data);
        System.out.println(data);
        renderJson(json);
	}
	
}
