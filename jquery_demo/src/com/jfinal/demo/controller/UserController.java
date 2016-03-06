package com.jfinal.demo.controller;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.List;

import com.jfinal.core.Controller;
import com.jfinal.demo.model.User;
import com.jfinal.kit.JsonKit;

public class UserController extends Controller {
	
	/**
	 * ��ת����¼ҳ��
	 */
	public void forwardLogin(){
		render("/login.jsp");
	}
	
	/**
	 * ��¼
	 */
	public void login(){
		//��ȡ��¼�û���������
		String username = getRequest().getParameter("username");
		String password = getRequest().getParameter("password");
		//��¼��ѯsql
		String sql = "select * from sys_user where username = '" + username + "'";
		List<User> users = getUsers(sql);
		if (users.size() <= 0) {
			getRequest().setAttribute("message", "�û���������");
			forwardAction("/user/forwardLogin");
		}else {
			getSession().setAttribute("username", users.get(0).getUsername());
			sql += " and password = '" + password + "'" ;
			users = User.dao.find(sql);
			if (users.size() > 0) {
				getSession().setAttribute("nickname", users.get(0).getNickname());
				forwardAction("/user/forwardMgr");
			}else {
				getRequest().setAttribute("message", "�������");
				forwardAction("/user/forwardLogin");
			}
		}
	}
	
	/**
	 * ��ת����̨����ҳ��
	 */
	public void forwardMgr(){
		redirect("/pages/index.jsp");
	}
	
	
	/**
	 * ��ת��ע��ҳ��
	 */
	public void forwardRegister(){
		render("/register.jsp");
	}
	
	/**
	 * ע��
	 */
	public void register(){
		//��ȡע���û���Ϣ
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
	 * ע��
	 */
	public void logout(){
		//�����¼�û���Ϣ
		if (getSession().getAttribute("username") != null || getSession().getAttribute("nickname") != null) {
			getSession().removeAttribute("username");
			getSession().removeAttribute("nickname");
			render("/login.jsp");
		}
		
	}
	
	/**
	 *��ȡ�û��б�
	 */
	public void userList(){
	      //��ȡ��Ҫչʾ���û�����
	      String sql = "select username,password,phone,email,status,create_time from sys_user";
		  List<User> users = getUsers(sql);
		  for (User user : users) {
			  if ("1".equals(user.getStatus())) {
				user.setStatus("����");
			}else {
				user.setStatus("����");
			}
		  }
	      //ת��Json��ʽ
	      String json = JsonKit.toJson(users);
	      System.out.println(json);
	      renderJson(json);
	}
	
	/**
	 * ���ݲ�ѯ������ȡ�û��б�
	 * @param sql
	 * @return
	 */
	public List<User> getUsers(String sql){
		List<User> users = null;
		//ִ�в�ѯ����
		users = User.dao.find(sql);
		return users;
	}
	
	/**
	 * �����ؼ���
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
		//ת��Json��ʽ
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
