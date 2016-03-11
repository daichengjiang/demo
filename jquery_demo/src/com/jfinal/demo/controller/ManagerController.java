package com.jfinal.demo.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.List;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.FileUtils;

import com.jfinal.core.Controller;

public class ManagerController extends Controller {
	
	
	/**
	 * 文件分片上传 
	 * 
	 */  
	public void upload(){
		 	try {
				getRequest().setCharacterEncoding("utf-8"); //设置编码  
			} catch (UnsupportedEncodingException e1) {
				e1.printStackTrace();
			} 
		 	//获得磁盘文件条目工厂  
	        DiskFileItemFactory factory = new DiskFileItemFactory();  
	        //获取文件需要上传到的路径  
	        String path = getRequest().getRealPath("/upload");  
	        try {
	        	  //设置临时文件目录位置
	        	  String tempDir =   path+File.separator+new Date().getTime();
	        	  Object attribute = getRequest().getSession().getAttribute("tempDir");
	        	  if(attribute==null){
	        		  getRequest().getSession().setAttribute("tempDir",tempDir);
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
	            List<FileItem> fileItems = upload.parseRequest(getRequest());
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
	            boolean isMultipart = ServletFileUpload.isMultipartContent(getRequest());
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
	                        getRequest().getSession().removeAttribute("tempDir");
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
					}
	            }
	        } catch (Exception e) {
	        	e.printStackTrace();
	        }
	        render("/mgr/webuploader.jsp");
	}
	
	
	
}
