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
	        // ����debug����  
	        props.setProperty("mail.debug", "true");  
	        // ���ͷ�������Ҫ�����֤  
	        props.setProperty("mail.smtp.auth", "true");  
	        // �����ʼ�������������  
	        props.setProperty("mail.host", "smtp.163.com");  
	        // �����ʼ�Э������  
	        props.setProperty("mail.transport.protocol", "smtp");  
	          
	        // ���û�����Ϣ  
	        Session session = Session.getInstance(props);  
	          
	        // �����ʼ�����  
	        Message msg = new MimeMessage(session);  
	        //�����ʼ�����
	        msg.setSubject("JavaMail����");  
	        // �����ʼ�����  
	        msg.setText("����һ����JavaMail���͵��ʼ���");  
	        // ���÷�����  
	        msg.setFrom(new InternetAddress("13086623773@163.com"));  
	          
	        Transport transport = session.getTransport();  
	        // �����ʼ�������(user,password)
	        transport.connect("13086623773", "xxxxx"); 
	        // �����ʼ�  
	        transport.sendMessage(msg, new Address[] {new InternetAddress("18502883891@163.com")});  
	        // �ر�����  
	        transport.close();  
	   }
	
}
