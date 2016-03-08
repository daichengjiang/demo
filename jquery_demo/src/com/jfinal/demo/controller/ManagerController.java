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
		}  //���ñ���  
        
        //��ô����ļ���Ŀ����  
        DiskFileItemFactory factory = new DiskFileItemFactory();  
        //��ȡ�ļ���Ҫ�ϴ�����·��  
        String path = getRequest().getRealPath("/upload");  
        //���û�����������õĻ����ϴ���� �ļ� ��ռ�� �ܶ��ڴ棬  
        //������ʱ��ŵ� �洢�� , ����洢�ң����Ժ� ���մ洢�ļ� ��Ŀ¼��ͬ  
        /** 
         * ԭ�� �����ȴ浽 ��ʱ�洢�ң�Ȼ��������д�� ��ӦĿ¼��Ӳ���ϣ�  
         * ������˵ ���ϴ�һ���ļ�ʱ����ʵ���ϴ������ݣ���һ������ .tem ��ʽ��  
         * Ȼ���ٽ�������д�� ��ӦĿ¼��Ӳ���� 
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
            	//���� ����Ĵ�С�����ϴ��ļ������������û���ʱ��ֱ�ӷŵ� ��ʱ�洢��  
            	factory.setSizeThreshold(1024*1024) ;  
            	//��ˮƽ��API�ļ��ϴ�����  
            	ServletFileUpload upload = new ServletFileUpload(factory);  
                // �õ����еı�������Ŀǰ��������FileItem
                List<FileItem> fileItems = upload.parseRequest(getRequest());
 
                String id = "";
                String fileName = "";
                // �������1˵���Ƿ�Ƭ����
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
                
              
                
                // ��ʱĿ¼����������з�Ƭ�ļ�
                String tempFileDir = path + File.separator + "part";
                File parentFileDir = new File(tempFileDir);
                if (!parentFileDir.exists()) {
                	   //FileUtils.deleteDirectory(parentFileDir);
                	   parentFileDir.mkdirs();
                }
 
                // ��Ƭ����ʱ��ǰ̨���ε����ϴ��ӿڣ�ÿ�ζ����ϴ��ļ���һ���ֵ���̨(Ĭ��ÿƬΪ5M)
                File tempPartFile = new File(parentFileDir, fileName + "_" + chunk + ".part");
                FileUtils.copyInputStreamToFile(tempFileItem.getInputStream(),tempPartFile);
                
                // �Ƿ�ȫ���ϴ����
                // ���з�Ƭ�����ڲ�˵�������ļ��ϴ����
                boolean uploadDone = true;
                for (int i = 0; i < chunks; i++) {
                    File partFile = new File(parentFileDir, fileName + "_" + i + ".part");
                    if (!partFile.exists()) {
                        uploadDone = false;
                    }
                }
                // ���з�Ƭ�ļ����ϴ����
                // �����з�Ƭ�ļ��ϲ���һ���ļ���
                if (uploadDone) {
                    File destTempFile = new File(path, fileName);
                    for (int i = 0; i < chunks; i++) {
                        File partFile = new File(parentFileDir, fileName + "_" + i + ".part");
 
                        FileOutputStream destTempfos = new FileOutputStream(destTempFile, true);
 
                        FileUtils.copyFile(partFile, destTempfos);
 
                        destTempfos.close();
                    }
                    // �õ� destTempFile �������յ��ļ�
                    // ��ӵ��ļ�ϵͳ���ߴ洢��
                     
              	  // ɾ����ʱĿ¼�еķ�Ƭ�ļ�
                    FileUtils.deleteDirectory(parentFileDir);
                    // ɾ����ʱ�ļ�
                   // destTempFile.delete();
                    FileUtils.deleteDirectory(tpfFile);
                     
                    getRequest().getSession().removeAttribute("tempDIR");
                } else {
                    // ��ʱ�ļ�����ʧ��
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
            //�����ϴ�����ļ�  
            List<FileItem> list = (List<FileItem>)upload.parseRequest(getRequest());  
            int i = 0;
            for(FileItem item : list)  
            {  
                //��ȡ������������  
                String name = item.getFieldName();  
                //�����ȡ�� ����Ϣ����ͨ�� �ı� ��Ϣ  
                if(item.isFormField())  
                {                     
                    //��ȡ�û�����������ַ��� ���������ͦ�ã���Ϊ���ύ�������� �ַ������͵�  
                    String value = item.getString() ;  
                    getRequest().setAttribute(name, value);  
                }  
                //�Դ���ķ� �򵥵��ַ������д��� ������˵�����Ƶ� ͼƬ����Ӱ��Щ  
                else  
                {  
                    *//** 
                     * ������������Ҫ��ȡ �ϴ��ļ������� 
                     *//*  
                    //��ȡ·����  
                    String value = item.getName() ;  
                    //���������һ����б��  
                    int start = value.lastIndexOf("\\");  
                    //��ȡ �ϴ��ļ��� �ַ������֣���1�� ȥ����б�ܣ�  
                    String filename = value.substring(start+1);  
                    String extension = FilenameUtils.getExtension(filename);
                    String baseName = FilenameUtils.getBaseName(filename);
                    filename  =baseName +(i++)+"."+extension;
                    getRequest().setAttribute(name, filename);  
                    //����д��������  
                    //���׳����쳣 ��exception ��׽  
                    //item.write( new File(path,filename) );//�������ṩ��
                    
                    //�ֶ�д��  
                    OutputStream out = new FileOutputStream(new File(path,filename));  
                    ByteArrayOutputStream bos = new ByteArrayOutputStream();
                    
                    InputStream in = item.getInputStream() ;  
                    int length = 0 ;  
                    byte [] buf = new byte[1024] ;  
                    System.out.println("��ȡ�ϴ��ļ����ܹ���������"+item.getSize());  
                    // in.read(buf) ÿ�ζ��������ݴ����   buf ������  
                    while( (length = in.read(buf) ) != -1)  
                    {  
                        //��   buf ������ ȡ������ д�� ���������������  
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
