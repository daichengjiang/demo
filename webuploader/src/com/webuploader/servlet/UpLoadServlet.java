package com.webuploader.servlet;

import java.io.*;  
import java.rmi.Naming;
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

import com.blogme.taylor.RMI.UploadFileRmi;
import com.blogme.taylor.RMI.params.FileInformation;
import com.blogme.taylor.RMI.params.FileInformationSev;
import com.sun.jersey.api.core.HttpContext;
  
/** 
 *  
 * @author Administrator 
 * �ļ��ϴ� 
 * ���岽�裺 
 * 1����ô����ļ���Ŀ���� DiskFileItemFactory Ҫ���� 
 * 2�� ���� request ��ȡ ��ʵ·�� ������ʱ�ļ��洢���� �����ļ��洢 ���������洢λ�ÿɲ�ͬ��Ҳ����ͬ 
 * 3���� DiskFileItemFactory ��������һЩ ���� 
 * 4����ˮƽ��API�ļ��ϴ�����  ServletFileUpload upload = new ServletFileUpload(factory); 
 * Ŀ���ǵ��� parseRequest��request������  ��� FileItem ����list �� 
 *      
 * 5���� FileItem ������ ��ȡ��Ϣ��   ������ �ж� ���ύ��������Ϣ �Ƿ��� ��ͨ�ı���Ϣ  �������� 
 * 6�� 
 *    ��һ��. �õ����� �ṩ��  item.write( new File(path,filename) );  ֱ��д�������� 
 *    �ڶ���. �ֶ�����   
 * 
 */  
public class UpLoadServlet extends HttpServlet {  
	private static final long serialVersionUID = 903713247645421461L;

	public void doPost(HttpServletRequest request, HttpServletResponse response)  
            throws ServletException, IOException {  
          
        request.setCharacterEncoding("utf-8");  //���ñ���  
          
        //��ô����ļ���Ŀ����  
        DiskFileItemFactory factory = new DiskFileItemFactory();  
        //��ȡ�ļ���Ҫ�ϴ�����·��  
        String path = request.getRealPath("/upload");  
        //���û�����������õĻ����ϴ���� �ļ� ��ռ�� �ܶ��ڴ棬  
        //������ʱ��ŵ� �洢�� , ����洢�ң����Ժ� ���մ洢�ļ� ��Ŀ¼��ͬ  
        /** 
         * ԭ�� �����ȴ浽 ��ʱ�洢�ң�Ȼ��������д�� ��ӦĿ¼��Ӳ���ϣ�  
         * ������˵ ���ϴ�һ���ļ�ʱ����ʵ���ϴ������ݣ���һ������ .tem ��ʽ��  
         * Ȼ���ٽ�������д�� ��ӦĿ¼��Ӳ���� 
         */  
        try {
            boolean isMultipart = ServletFileUpload.isMultipartContent(request);
 
            if (isMultipart) {
            	String tp =   path+File.separator+new Date().getTime();
            	  Object attribute = request.getSession().getAttribute("tempDIR");
            	  if(attribute==null){
            		  request.getSession().setAttribute("tempDIR",tp);
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
                List<FileItem> fileItems = upload.parseRequest(request);
                //�ϴ��ļ���
                String fileName = "";
                //��ʶΨһ��id
                String guid = "";
                // �ܷ�Ƭ��
                int chunks = 0;
                //��ʶ��ǰ��Ƭ���ϴ���Ƭ�е�˳�򣨴�0��ʼ��
                int chunk = 0;
                FileItem tempFileItem = null;
                //������ȡ�����еĲ���ֵ
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
                    // �õ� destTempFile �������յ��ļ�
                    // ��ӵ��ļ�ϵͳ���ߴ洢��
                     
              	  // ɾ����ʱĿ¼�еķ�Ƭ�ļ�
                    FileUtils.deleteDirectory(parentFileDir);
                    // ɾ����ʱ�ļ�
                    FileUtils.deleteDirectory(tpfFile);
                    request.getSession().removeAttribute("tempDIR");
                } else {
                    // ��ʱ�ļ�����ʧ��
                    if (chunk == chunks -1) {
                        FileUtils.deleteDirectory(parentFileDir);
                    }
                }
            }
        } catch (Exception e) {
        	e.printStackTrace();
        }
  /*      try {  
            //�����ϴ�����ļ�  
            List<FileItem> list = (List<FileItem>)upload.parseRequest(request);  
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
                    request.setAttribute(name, value);  
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
                    request.setAttribute(name, filename);  
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
        request.getRequestDispatcher("index.jsp").forward(request, response);  
    }  
  
}  