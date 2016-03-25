package com.servlet;

import java.util.Properties;

import javax.mail.Address;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class SendEmailServlet {

	   public static void main(String[] args) throws MessagingException {  
	       
	    }  
	   
	   public void sendEmail() throws MessagingException {
		    Properties props = new Properties();  
	        // 开启debug调试  
	        props.setProperty("mail.debug", "true");  
	        // 发送服务器需要身份验证  
	        props.setProperty("mail.smtp.auth", "true");  
	        // 设置邮件服务器主机名  
	        props.setProperty("mail.host", "smtp.163.com");  
	        // 发送邮件协议名称  
	        props.setProperty("mail.transport.protocol", "smtp");  
	          
	        // 设置环境信息  
	        Session session = Session.getInstance(props);  
	          
	        // 创建邮件对象  
	        Message msg = new MimeMessage(session);  
	        //设置邮件标题
	        msg.setSubject("JavaMail测试");  
	        // 设置邮件内容  
	        msg.setText("这是一封由JavaMail发送的邮件！");  
	        // 设置发件人  
	        msg.setFrom(new InternetAddress("13086623773@163.com"));  
	          
	        Transport transport = session.getTransport();  
	        // 连接邮件服务器(user,password)
	        transport.connect("13086623773", "xxxxx"); 
	        // 发送邮件  
	        transport.sendMessage(msg, new Address[] {new InternetAddress("18502883891@163.com")});  
	        // 关闭连接  
	        transport.close();  
	   }
	
}
