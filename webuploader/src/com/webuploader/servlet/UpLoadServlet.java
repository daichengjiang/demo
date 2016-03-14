package com.webuploader.servlet;

import java.io.*;  
import java.rmi.Naming;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Date;
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
  
/** 
 *  
 * @author Administrator 
 * 文件上传 
 * 具体步骤： 
 * 1）获得磁盘文件条目工厂 DiskFileItemFactory 要导包 
 * 2） 利用 request 获取 真实路径 ，供临时文件存储，和 最终文件存储 ，这两个存储位置可不同，也可相同 
 * 3）对 DiskFileItemFactory 对象设置一些 属性 
 * 4）高水平的API文件上传处理  ServletFileUpload upload = new ServletFileUpload(factory); 
 * 目的是调用 parseRequest（request）方法  获得 FileItem 集合list ， 
 *      
 * 5）在 FileItem 对象中 获取信息，   遍历， 判断 表单提交过来的信息 是否是 普通文本信息  另做处理 
 * 6） 
 *    第一种. 用第三方 提供的  item.write( new File(path,filename) );  直接写到磁盘上 
 *    第二种. 手动处理   
 * 
 */  
public class UpLoadServlet extends HttpServlet {  
	private static final long serialVersionUID = 903713247645421461L;

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {  
          
        request.setCharacterEncoding("utf-8");  //设置编码  
          
        //获得磁盘文件条目工厂  
        DiskFileItemFactory factory = new DiskFileItemFactory();  
        //获取文件需要上传到的路径  
        String path = request.getRealPath("/upload");  
        try {
        	  //设置临时文件目录位置
        	  String tempDir =   path+File.separator+new Date().getTime();
        	  Object attribute = request.getSession().getAttribute("tempDir");
        	  if(attribute==null){
        		  request.getSession().setAttribute("tempDir",tempDir);
        	  }else{
        		  tempDir = (String) attribute;
        	  }
        	File  tpfFile = new File(tempDir);
        	if(!tpfFile.exists()){
        		tpfFile.mkdirs();
        	}
        	//如果没以下两行设置的话，上传大的 文件 会占用 很多内存，  
            //设置暂时存放的 存储室 , 这个存储室，可以和 最终存储文件 的目录不同  
            /** 
             * 原理 它是先存到 暂时存储室，然后在真正写到 对应目录的硬盘上，  
             * 按理来说 当上传一个文件时，其实是上传了两份，第一个是以 .tem 格式的  
             * 然后再将其真正写到 对应目录的硬盘上 
             */  
        	factory.setRepository(tpfFile);  
        	//设置 缓存的大小，当上传文件的容量超过该缓存时，直接放到 暂时存储室  
        	factory.setSizeThreshold(1024*1024) ;  
        	//高水平的API文件上传处理  
        	ServletFileUpload upload = new ServletFileUpload(factory);  
            // 得到所有的表单域，它们目前都被当作FileItem
            List<FileItem> fileItems = upload.parseRequest(request);
            //上传文件名
            String fileName = "";
            //标识唯一的id
            String guid = "";
            // 总分片数
            int chunks = 0;
            //标识当前分片在上传分片中的顺序（从0开始）
            int chunk = 0;
            FileItem tempFileItem = null;
            //遍历表单域，获取需要的信息
            for (FileItem fileItem : fileItems) {
                if (fileItem.getFieldName().equals("guid")) {
                    guid = fileItem.getString();
                } else if (fileItem.getFieldName().equals("name")) {
                    fileName = new String(fileItem.getString().getBytes("ISO-8859-1"), "UTF-8");
                } else if (fileItem.getFieldName().equals("chunks")) {
                    chunks = Integer.parseInt(fileItem.getString());
                } else if (fileItem.getFieldName().equals("chunk")) {
                    chunk = Integer.parseInt(fileItem.getString());
                } else if (fileItem.getFieldName().equals("file")) {
                    tempFileItem = fileItem;
                }
            }
            boolean isMultipart = ServletFileUpload.isMultipartContent(request);
            //判断是否为上传文件
            if (isMultipart) {
            	//判断是否为分片上传，当总分片数大于1时，表示是分片上传
            	if (chunks > 1) {
            		// 临时目录用来存放所有分片文件
                    String tempFileDir = path + File.separator + "part";
                    File parentFileDir = new File(tempFileDir);
                    if (!parentFileDir.exists()) {
                    	   parentFileDir.mkdirs();
                    }
                    // 分片处理时，前台会多次调用上传接口，每次都会上传文件的一部分到后台(默认每片为5M)
                    File tempPartFile = new File(parentFileDir, guid + "_" + chunk + ".part");
                    FileUtils.copyInputStreamToFile(tempFileItem.getInputStream(),tempPartFile);
                    // 是否全部上传完成
                    // 所有分片都存在才说明整个文件上传完成
                    boolean uploadDone = true;
                    for (int i = 0; i < chunks; i++) {
                        File partFile = new File(parentFileDir, guid + "_" + i + ".part");
                        if (!partFile.exists()) {
                            uploadDone = false;
                        }
                    }
                    // 所有分片文件都上传完成
                    // 将所有分片文件合并到一个文件中
                    if (uploadDone) {
                        File destTempFile = new File(path, fileName);
                        for (int i = 0; i < chunks; i++) {
                            File partFile = new File(parentFileDir, guid + "_" + i + ".part");
                            
                            FileOutputStream destTempfos = new FileOutputStream(destTempFile, true);
     
                            FileUtils.copyFile(partFile, destTempfos);
     
                            destTempfos.close();
                        }
                  	  	// 删除临时目录中的分片文件
                        FileUtils.deleteDirectory(parentFileDir);
                        // 删除临时文件目录
                        FileUtils.deleteDirectory(tpfFile);
                        request.getSession().removeAttribute("tempDir");
                    } else {
                        // 临时文件创建失败
                        if (chunk == chunks -1) {
                            FileUtils.deleteDirectory(parentFileDir);
                        }
                    }
				}else {
	                  OutputStream out = new FileOutputStream(new File(path,fileName));  
	                  InputStream in = tempFileItem.getInputStream();
	                  int length = 0 ;  
	                  byte [] buf = new byte[1024] ;  
	                  // in.read(buf) 每次读到的数据存放在   buf 数组中  
	                  while( (length = in.read(buf) ) != -1){  
	                      //在   buf 数组中 取出数据 写到 （输出流）磁盘上  
	                      out.write(buf, 0, length);  
	                  }  
	                  // 删除临时文件目录
                      FileUtils.deleteDirectory(tpfFile);
	                  in.close();  
	                  out.close();
	                  
	                  //连接MySql数据库
	                  String url = "jdbc:mysql://localhost:3306/test?characterEncoding=UTF-8&zeroDateTimeBehavior=convertToNull" ;    
	                  String username = "root" ;   
	                  String password = "" ;
	                  
	                  try{   
	                	  	Class.forName("com.mysql.jdbc.Driver");
	                	    Connection con = DriverManager.getConnection(url,username,password );  
	                	    String sql = "insert into sys_picture values(null,0,'','"+fileName+"',0,sysdate())";
	                	    Statement stmt = con.createStatement();
	                	    int result = stmt.executeUpdate(sql);
	                	    if (result > 0) {
								System.out.println("添加成功");
							}
						if (stmt != null) { // 关闭声明
							try {
								stmt.close();
							} catch (SQLException e) {
								e.printStackTrace();
							}
						}
						if (con != null) { // 关闭连接对象
							try {
								con.close();
							} catch (SQLException e) {
								e.printStackTrace();
							}
						}

	                  }catch(SQLException se){   
	                	    System.out.println("数据库连接失败！");   
	                	    se.printStackTrace() ;   
	                  }   
				}
            }
        } catch (Exception e) {
        	e.printStackTrace();
        }
        
    }  
}  