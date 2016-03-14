package com.webuploader.servlet;

import java.io.*;  
import java.rmi.Naming;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;  
  
import javax.servlet.ServletException;  
import javax.servlet.http.HttpServlet;  
import javax.servlet.http.HttpServletRequest;  
import javax.servlet.http.HttpServletResponse;  
  
import org.apache.commons.fileupload.FileItem;  
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.FileUploadException;  
import org.apache.commons.fileupload.disk.DiskFileItemFactory;  
import org.apache.commons.fileupload.servlet.ServletFileUpload;  
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;

import com.blogme.taylor.RMI.UploadFileRmi;
import com.blogme.taylor.RMI.params.FileInformation;
import com.blogme.taylor.RMI.params.FileInformationSev;
import com.sun.jersey.api.core.HttpContext;
import com.sun.xml.xsom.impl.scd.Iterators.Map;
  
/** 
 *  
 * @author Administrator 
 */  
public class JdbcServlet extends HttpServlet {  
	private static final long serialVersionUID = 903713247645421461L;
	  //����MySql���ݿ�
    String url = "jdbc:mysql://localhost:3306/test?characterEncoding=UTF-8&zeroDateTimeBehavior=convertToNull" ;    
    String username = "root" ;   
    String password = "" ;
    List<String> list = new ArrayList<String>();
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {  
		try{   
    	  	Class.forName("com.mysql.jdbc.Driver");
    	    Connection con = DriverManager.getConnection(url,username,password );  
    	    String sql = "select url from sys_picture";
    	    Statement stmt = con.createStatement();
    	    ResultSet rs = stmt.executeQuery(sql);
    	    while(rs.next()){ 
    	    	list.add(rs.getString("url"));
    	    }
			if (rs != null) { // �رռ�¼��
				try {
					rs.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
			if (stmt != null) { // �ر�����
				try {
					stmt.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
			if (con != null) { // �ر����Ӷ���
				try {
					con.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
	      }catch(SQLException se){   
	    	    System.out.println("���ݿ�����ʧ�ܣ�");   
	    	    se.printStackTrace() ;   
	      } catch (ClassNotFoundException e) {
			e.printStackTrace();
		} 
		request.setAttribute("pics", list);
		request.getRequestDispatcher("/show.jsp").forward(request, response);
    }  
}  