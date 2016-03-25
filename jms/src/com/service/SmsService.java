package com.service;

import java.util.Properties;
import java.util.Random;
import java.util.concurrent.Future;


/**
 * ���ŷ��ͷ�����
 * @author admin
 *
 */
public class SmsService extends SmsAbstract {
	
	/** ���������ͨ�����͵Ķ������� */
	private String Message;
	
	public SmsService() {
		super();
	}
	
	@Override
	void loadInitParameter(Properties smsProperties) {
		Message = smsProperties.getProperty("sms.message.template");
	}
	
	/**
	 * ��֤�ֻ�����֤�뷢�� <br>
	 * ��ʹ��Future.get()����ֱ����ȡ���
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
	 * ������֤��
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
