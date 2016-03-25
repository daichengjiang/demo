package com.service;

import java.util.Properties;
import java.util.Random;
import java.util.concurrent.Future;


/**
 * 短信发送服务类
 * @author admin
 *
 */
public class SmsService extends SmsAbstract {
	
	/** 交易商审核通过后发送的短信内容 */
	private String Message;
	
	public SmsService() {
		super();
	}
	
	@Override
	void loadInitParameter(Properties smsProperties) {
		Message = smsProperties.getProperty("sms.message.template");
	}
	
	/**
	 * 验证手机号验证码发送 <br>
	 * 可使用Future.get()阻塞直到获取结果
	 * @param mfirm
	 * @return  
	 */
	public Future<String> sendSmsForVCode(String VCode, String mobile) {
		Future<String> result = null;
		
		if (mobile != null&&mobile!="") {
			String msg = Message.replace("{VCode}", VCode);
			result = sendSmsAsyn(mobile, msg);
		}
		return result;
	}
	
	/**
	 * 生成验证码
	 * @return
	 */
	public String createVCode(int len){
		String VCode = "";
		Random random = new Random();
		for(int i=0;i<len;i++){
			VCode += random.nextInt(10);
		}
		return VCode;
	}
	
	
	
	private static SmsService instance = new SmsService();
	public static SmsService getInstance() {
		return instance;
	}

	/*public static void main(String[] args) {
		Firm firm = new Firm();
		firm.setMobile("15680672082"); 
		String VCoede = createVCode(4);
		Future<String> result = SmsService.getInstance().sendSmsForVCode(VCoede, firm);
		try {
			System.out.println(result.get());
		} catch (InterruptedException e) {
			e.printStackTrace();
		} catch (ExecutionException e) {
			e.printStackTrace();
		}
	}*/

}
