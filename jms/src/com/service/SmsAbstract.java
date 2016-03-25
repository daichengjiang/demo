package com.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Properties;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

/**
 * ���ŷ��ͳ�����<br />
 * ��ʹ��HTTP��ʽ����URL������ʽ
 * @author admin
 *
 */
public abstract class SmsAbstract {
	/** utf-8��ʽ���ŷ���URL */
	private String urlUTF8;
	
	/** GBK��ʽ���ŷ���URL */
	private String urlGBK;
	
	/** ���ŷ��ͷ�ʽ */
	private String sendWay;
	
	/** �û��� */
	private String username;
	
	/** ���� */
	protected String password;
	
	/** URI */
	private String uri;
	
	/** �Ƿ��Ѿ���ʼ�� */
	private volatile boolean isInit = false;
	
	/** ���� */
	private String encoding;
	
	/** ʹ���̳߳� */
	private ExecutorService executorService;
	
	public SmsAbstract() {
		executorService = Executors.newFixedThreadPool(4);
		refreshData();
	}
	
	/**
	 * �첽���Ͷ��ţ���ʹ��Future.get()����ֱ����ȡ���
	 * 
	 * @param mobile������--���͵��ֻ����룬��������ö��Ÿ�����>13512345678,13612345678
	 * @param message������--ʵ�ʷ�������
	 * @return
	 */
	public Future<String> sendSmsAsyn(String mobile, String content) {
		SendSmsTask sendSmsTask = new SendSmsTask(mobile, content);
		
		Future<String> future = executorService.submit(sendSmsTask);
		
		return future;
	}
	
	/**
	 * ˢ������
	 * @param check - true��ǿ��ˢ�����ݣ�false������Ѿ���ʼ������ˢ�����ݡ�
	 */
	public void refreshData(boolean check) {
		if (check) {
			refreshData();
		} else if (!isInit) {
			refreshData();
		}
		
		isInit = true;
	}
	
	/**
	 * ���Ͷ���
	 * @param mobile - �ֻ���
	 * @param message - ��Ϣ�ı�
	 */
	protected String sendSms(String mobile, String message) {
		String result = "";
		
		try {
			String sendUri = uri.replace("{msg}", URLEncoder.encode(message, encoding));
			sendUri = sendUri.replace("{mobile}", mobile);
			
			result = getHttp(sendUri, encoding);
			
			// System.out.println(sendUri);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		System.out.println("�����Ͷ��š��ֻ����룺" + mobile + "�����ؽ����" + result + "���������ݣ�" + message);
		
		return result;
	}
	
	protected String getHttp(String myurl, String encoding) throws Exception {
		URL url = new URL(myurl);
		HttpURLConnection connection = (HttpURLConnection) url.openConnection();
		connection.setRequestProperty("user-agent", "mozilla/4.0 (compatible; msie 6.0; windows 2000)");
		connection.setConnectTimeout(30000);
		// connection.setReadTimeout(30000);
		connection.connect();
		
		// System.out.println("--debug myurl:" + myurl + ", length:" + connection.getContentLength() + ", status:"
				// + connection.getResponseCode() + "  " + (sendCount.getAndIncrement() + 1));
		
		StringBuffer sb = new StringBuffer();
		
		// �������ɹ�
		if (connection.getResponseCode() == 200) {
			InputStream in = connection.getInputStream();
			BufferedReader breader = new BufferedReader(new InputStreamReader(in, encoding));
			String str = breader.readLine();
			while (str != null) {
				sb.append(str);
				str = breader.readLine();
			}
			in.close();
		}
		
		connection.disconnect();
		connection = null;
		url = null;
		
		return sb.toString();
	}
	
	/** ˢ�¶����������� */
	protected void refreshData() {
		InputStream inputStream = this.getClass().getClassLoader().getResourceAsStream(SMS_PROPERTIES_PATH);    
		Properties smsPro = new Properties();
		
		try {
			smsPro.load(inputStream);
			
			urlUTF8 		= smsPro.getProperty("sms.url.utf8");
			urlGBK 			= smsPro.getProperty("sms.url.gbk");
			username 		= smsPro.getProperty("sms.username");
			sendWay 		= smsPro.getProperty("sms.sendWay");
			password 	= smsPro.getProperty("sms.password");
			
			/* �滻URL���û�����������Ϣ */
			urlUTF8 = urlUTF8.replace("{username}", username);
			urlUTF8 = urlUTF8.replace("{password}", password);
			
			urlGBK = urlGBK.replace("{username}", username);
			urlGBK = urlGBK.replace("{password}", password);
			
			loadInitParameter(smsPro);
			
			if ("utf8".equalsIgnoreCase(sendWay) || "utf-8".equalsIgnoreCase(sendWay)) {
				uri = urlUTF8;
				encoding = "utf-8";
			} else {
				// Ĭ��ʹ��gbk���뷢��
				uri = urlGBK;
				encoding = "gbk";
			}
			
			isInit = true;
			
		} catch (IOException e1) {
			isInit = false;
			e1.printStackTrace();
		} finally {
			smsPro.clear();
			try {
				if (inputStream != null)
					inputStream.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	
	/**
	 * ����Ĳ�����ʼ��<br>
	 * - ʵ����ֻ��ʵ�ִ˷�������
	 * @param smsProperties	- ���������ļ�
	 */
	abstract void loadInitParameter(Properties smsProperties);
	
	/** ���Ͷ�������  */
	protected class SendSmsTask implements Callable<String> {
		private String mobile;
		private String content;
		
		public SendSmsTask(String mobile, String content) {
			super();
			this.mobile = mobile;
			this.content = content;
		}

		public String call() throws Exception {
			return sendSms(mobile, content);
		}
		
	}
	
	public static final String SMS_PROPERTIES_PATH = "sms.properties";
}
