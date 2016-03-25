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
 * 短信发送抽象类<br />
 * ：使用HTTP形式调用URL发送形式
 * @author admin
 *
 */
public abstract class SmsAbstract {
	/** utf-8格式短信发送URL */
	private String urlUTF8;
	
	/** GBK格式短信发送URL */
	private String urlGBK;
	
	/** 短信发送方式 */
	private String sendWay;
	
	/** 用户名 */
	private String username;
	
	/** 密码 */
	protected String password;
	
	/** URI */
	private String uri;
	
	/** 是否已经初始化 */
	private volatile boolean isInit = false;
	
	/** 编码 */
	private String encoding;
	
	/** 使用线程池 */
	private ExecutorService executorService;
	
	public SmsAbstract() {
		executorService = Executors.newFixedThreadPool(4);
		refreshData();
	}
	
	/**
	 * 异步发送短信，可使用Future.get()阻塞直到获取结果
	 * 
	 * @param mobile：必填--发送的手机号码，多个可以用逗号隔比如>13512345678,13612345678
	 * @param message：必填--实际发送内容
	 * @return
	 */
	public Future<String> sendSmsAsyn(String mobile, String content) {
		SendSmsTask sendSmsTask = new SendSmsTask(mobile, content);
		
		Future<String> future = executorService.submit(sendSmsTask);
		
		return future;
	}
	
	/**
	 * 刷新数据
	 * @param check - true：强制刷新数据；false：如果已经初始化，则不刷新数据。
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
	 * 发送短信
	 * @param mobile - 手机号
	 * @param message - 消息文本
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
		
		System.out.println("【发送短信】手机号码：" + mobile + "，返回结果：" + result + "，短信内容：" + message);
		
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
		
		// 如果请求成功
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
	
	/** 刷新短信内容数据 */
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
			
			/* 替换URL中用户名与密码信息 */
			urlUTF8 = urlUTF8.replace("{username}", username);
			urlUTF8 = urlUTF8.replace("{password}", password);
			
			urlGBK = urlGBK.replace("{username}", username);
			urlGBK = urlGBK.replace("{password}", password);
			
			loadInitParameter(smsPro);
			
			if ("utf8".equalsIgnoreCase(sendWay) || "utf-8".equalsIgnoreCase(sendWay)) {
				uri = urlUTF8;
				encoding = "utf-8";
			} else {
				// 默认使用gbk编码发送
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
	 * 额外的参数初始化<br>
	 * - 实现类只需实现此方法即可
	 * @param smsProperties	- 短信配置文件
	 */
	abstract void loadInitParameter(Properties smsProperties);
	
	/** 发送短信任务  */
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
