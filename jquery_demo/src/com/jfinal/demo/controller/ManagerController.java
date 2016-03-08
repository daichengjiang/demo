package com.jfinal.demo.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.List;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.FileUtils;

import com.jfinal.core.Controller;

public class ManagerController extends Controller {
	
	public void upload(){
		try {
			getRequest().setCharacterEncoding("utf-8");
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}  //设置编码  
        
        //获得磁盘文件条目工厂  
        DiskFileItemFactory factory = new DiskFileItemFactory();  
        //获取文件需要上传到的路径  
        String path = getRequest().getRealPath("/upload");  
        //如果没以下两行设置的话，上传大的 文件 会占用 很多内存，  
        //设置暂时存放的 存储室 , 这个存储室，可以和 最终存储文件 的目录不同  
        /** 
         * 原理 它是先存到 暂时存储室，然后在真正写到 对应目录的硬盘上，  
         * 按理来说 当上传一个文件时，其实是上传了两份，第一个是以 .tem 格式的  
         * 然后再将其真正写到 对应目录的硬盘上 
         */  
        
        

   
        try {
            boolean isMultipart = ServletFileUpload.isMultipartContent(getRequest());
 
            if (isMultipart) {
            	String tp =   path+File.separator+new Date().getTime();
            	  Object attribute = getRequest().getSession().getAttribute("tempDIR");
            	  if(attribute==null){
            		  getRequest().getSession().setAttribute("tempDIR",tp);
            	  }else{
            		  tp = (String) attribute;
            	  }
            	File  tpfFile = new File(tp);
            	if(!tpfFile.exists()){
            		//  FileUtils.deleteDirectory(tpfFile);
            		tpfFile.mkdirs();
            	}
            	
            	
            	factory.setRepository(tpfFile);  
            	//设置 缓存的大小，当上传文件的容量超过该缓存时，直接放到 暂时存储室  
            	factory.setSizeThreshold(1024*1024) ;  
            	//高水平的API文件上传处理  
            	ServletFileUpload upload = new ServletFileUpload(factory);  
                // 得到所有的表单域，它们目前都被当作FileItem
                List<FileItem> fileItems = upload.parseRequest(getRequest());
 
                String id = "";
                String fileName = "";
                // 如果大于1说明是分片处理
                int chunks = 1;
                int chunk = 0;
                FileItem tempFileItem = null;
 
                for (FileItem fileItem : fileItems) {
                    if (fileItem.getFieldName().equals("id")) {
                        id = fileItem.getString();
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
                
              
                
                // 临时目录用来存放所有分片文件
                String tempFileDir = path + File.separator + "part";
                File parentFileDir = new File(tempFileDir);
                if (!parentFileDir.exists()) {
                	   //FileUtils.deleteDirectory(parentFileDir);
                	   parentFileDir.mkdirs();
                }
 
                // 分片处理时，前台会多次调用上传接口，每次都会上传文件的一部分到后台(默认每片为5M)
                File tempPartFile = new File(parentFileDir, fileName + "_" + chunk + ".part");
                FileUtils.copyInputStreamToFile(tempFileItem.getInputStream(),tempPartFile);
                
                // 是否全部上传完成
                // 所有分片都存在才说明整个文件上传完成
                boolean uploadDone = true;
                for (int i = 0; i < chunks; i++) {
                    File partFile = new File(parentFileDir, fileName + "_" + i + ".part");
                    if (!partFile.exists()) {
                        uploadDone = false;
                    }
                }
                // 所有分片文件都上传完成
                // 将所有分片文件合并到一个文件中
                if (uploadDone) {
                    File destTempFile = new File(path, fileName);
                    for (int i = 0; i < chunks; i++) {
                        File partFile = new File(parentFileDir, fileName + "_" + i + ".part");
 
                        FileOutputStream destTempfos = new FileOutputStream(destTempFile, true);
 
                        FileUtils.copyFile(partFile, destTempfos);
 
                        destTempfos.close();
                    }
                    // 得到 destTempFile 就是最终的文件
                    // 添加到文件系统或者存储中
                     
              	  // 删除临时目录中的分片文件
                    FileUtils.deleteDirectory(parentFileDir);
                    // 删除临时文件
                   // destTempFile.delete();
                    FileUtils.deleteDirectory(tpfFile);
                     
                    getRequest().getSession().removeAttribute("tempDIR");
                } else {
                    // 临时文件创建失败
                    if (chunk == chunks -1) {
                        FileUtils.deleteDirectory(parentFileDir);
                    }
                }
            }
        } catch (Exception e) {
        	e.printStackTrace();
        }finally{
        	
        }
  /*      try {  
            //可以上传多个文件  
            List<FileItem> list = (List<FileItem>)upload.parseRequest(getRequest());  
            int i = 0;
            for(FileItem item : list)  
            {  
                //获取表单的属性名字  
                String name = item.getFieldName();  
                //如果获取的 表单信息是普通的 文本 信息  
                if(item.isFormField())  
                {                     
                    //获取用户具体输入的字符串 ，名字起得挺好，因为表单提交过来的是 字符串类型的  
                    String value = item.getString() ;  
                    getRequest().setAttribute(name, value);  
                }  
                //对传入的非 简单的字符串进行处理 ，比如说二进制的 图片，电影这些  
                else  
                {  
                    *//** 
                     * 以下三步，主要获取 上传文件的名字 
                     *//*  
                    //获取路径名  
                    String value = item.getName() ;  
                    //索引到最后一个反斜杠  
                    int start = value.lastIndexOf("\\");  
                    //截取 上传文件的 字符串名字，加1是 去掉反斜杠，  
                    String filename = value.substring(start+1);  
                    String extension = FilenameUtils.getExtension(filename);
                    String baseName = FilenameUtils.getBaseName(filename);
                    filename  =baseName +(i++)+"."+extension;
                    getRequest().setAttribute(name, filename);  
                    //真正写到磁盘上  
                    //它抛出的异常 用exception 捕捉  
                    //item.write( new File(path,filename) );//第三方提供的
                    
                    //手动写的  
                    OutputStream out = new FileOutputStream(new File(path,filename));  
                    ByteArrayOutputStream bos = new ByteArrayOutputStream();
                    
                    InputStream in = item.getInputStream() ;  
                    int length = 0 ;  
                    byte [] buf = new byte[1024] ;  
                    System.out.println("获取上传文件的总共的容量："+item.getSize());  
                    // in.read(buf) 每次读到的数据存放在   buf 数组中  
                    while( (length = in.read(buf) ) != -1)  
                    {  
                        //在   buf 数组中 取出数据 写到 （输出流）磁盘上  
                        out.write(buf, 0, length);  
                    }  
                    in.close();  
                    out.close();
                    
                    
                    bos.close();  
                    byte[] bs = bos.toByteArray();
                     
                    UploadFileRmi  upload0 = (UploadFileRmi)Naming.lookup("rmi://172.18.2.114:9998/UploadFileRmi");  
         			FileInformation  finf =  new FileInformationSev();
         			
         			finf.setInformation(filename, bs );
        			
        			upload0.uploadFile(finf);
                }  
            }  
        } catch (FileUploadException e) {  
            // TODO Auto-generated catch block  
            e.printStackTrace();  
        }  
        catch (Exception e) {  
            // TODO Auto-generated catch block  
            e.printStackTrace();  
        }  */
	}
}
