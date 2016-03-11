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
	 * �ļ���Ƭ�ϴ� 
	 * 
	 */  
	public void upload(){
		 	try {
				getRequest().setCharacterEncoding("utf-8"); //���ñ���  
			} catch (UnsupportedEncodingException e1) {
				e1.printStackTrace();
			} 
		 	//��ô����ļ���Ŀ����  
	        DiskFileItemFactory factory = new DiskFileItemFactory();  
	        //��ȡ�ļ���Ҫ�ϴ�����·��  
	        String path = getRequest().getRealPath("/upload");  
	        try {
	        	  //������ʱ�ļ�Ŀ¼λ��
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
	        	//���û�����������õĻ����ϴ���� �ļ� ��ռ�� �ܶ��ڴ棬  
	            //������ʱ��ŵ� �洢�� , ����洢�ң����Ժ� ���մ洢�ļ� ��Ŀ¼��ͬ  
	            /** 
	             * ԭ�� �����ȴ浽 ��ʱ�洢�ң�Ȼ��������д�� ��ӦĿ¼��Ӳ���ϣ�  
	             * ������˵ ���ϴ�һ���ļ�ʱ����ʵ���ϴ������ݣ���һ������ .tem ��ʽ��  
	             * Ȼ���ٽ�������д�� ��ӦĿ¼��Ӳ���� 
	             */  
	        	factory.setRepository(tpfFile);  
	        	//���� ����Ĵ�С�����ϴ��ļ������������û���ʱ��ֱ�ӷŵ� ��ʱ�洢��  
	        	factory.setSizeThreshold(1024*1024) ;  
	        	//��ˮƽ��API�ļ��ϴ�����  
	        	ServletFileUpload upload = new ServletFileUpload(factory);  
	            // �õ����еı�������Ŀǰ��������FileItem
	            List<FileItem> fileItems = upload.parseRequest(getRequest());
	            //�ϴ��ļ���
	            String fileName = "";
	            //��ʶΨһ��id
	            String guid = "";
	            // �ܷ�Ƭ��
	            int chunks = 0;
	            //��ʶ��ǰ��Ƭ���ϴ���Ƭ�е�˳�򣨴�0��ʼ��
	            int chunk = 0;
	            FileItem tempFileItem = null;
	            //�������򣬻�ȡ��Ҫ����Ϣ
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
	            //�ж��Ƿ�Ϊ�ϴ��ļ�
	            if (isMultipart) {
	            	//�ж��Ƿ�Ϊ��Ƭ�ϴ������ܷ�Ƭ������1ʱ����ʾ�Ƿ�Ƭ�ϴ�
	            	if (chunks > 1) {
	            		// ��ʱĿ¼����������з�Ƭ�ļ�
	                    String tempFileDir = path + File.separator + "part";
	                    File parentFileDir = new File(tempFileDir);
	                    if (!parentFileDir.exists()) {
	                    	   parentFileDir.mkdirs();
	                    }
	                    // ��Ƭ����ʱ��ǰ̨���ε����ϴ��ӿڣ�ÿ�ζ����ϴ��ļ���һ���ֵ���̨(Ĭ��ÿƬΪ5M)
	                    File tempPartFile = new File(parentFileDir, guid + "_" + chunk + ".part");
	                    FileUtils.copyInputStreamToFile(tempFileItem.getInputStream(),tempPartFile);
	                    // �Ƿ�ȫ���ϴ����
	                    // ���з�Ƭ�����ڲ�˵�������ļ��ϴ����
	                    boolean uploadDone = true;
	                    for (int i = 0; i < chunks; i++) {
	                        File partFile = new File(parentFileDir, guid + "_" + i + ".part");
	                        if (!partFile.exists()) {
	                            uploadDone = false;
	                        }
	                    }
	                    // ���з�Ƭ�ļ����ϴ����
	                    // �����з�Ƭ�ļ��ϲ���һ���ļ���
	                    if (uploadDone) {
	                        File destTempFile = new File(path, fileName);
	                        for (int i = 0; i < chunks; i++) {
	                            File partFile = new File(parentFileDir, guid + "_" + i + ".part");
	                            
	                            FileOutputStream destTempfos = new FileOutputStream(destTempFile, true);
	     
	                            FileUtils.copyFile(partFile, destTempfos);
	     
	                            destTempfos.close();
	                        }
	                  	  	// ɾ����ʱĿ¼�еķ�Ƭ�ļ�
	                        FileUtils.deleteDirectory(parentFileDir);
	                        // ɾ����ʱ�ļ�Ŀ¼
	                        FileUtils.deleteDirectory(tpfFile);
	                        getRequest().getSession().removeAttribute("tempDir");
	                    } else {
	                        // ��ʱ�ļ�����ʧ��
	                        if (chunk == chunks -1) {
	                            FileUtils.deleteDirectory(parentFileDir);
	                        }
	                    }
					}else {
		                  OutputStream out = new FileOutputStream(new File(path,fileName));  
		                  InputStream in = tempFileItem.getInputStream();
		                  int length = 0 ;  
		                  byte [] buf = new byte[1024] ;  
		                  // in.read(buf) ÿ�ζ��������ݴ����   buf ������  
		                  while( (length = in.read(buf) ) != -1){  
		                      //��   buf ������ ȡ������ д�� ���������������  
		                      out.write(buf, 0, length);  
		                  }  
		                  // ɾ����ʱ�ļ�Ŀ¼
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
