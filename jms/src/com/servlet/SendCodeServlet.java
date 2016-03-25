package com.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.service.SmsService;

public class SendCodeServlet extends HttpServlet{
	private static final long serialVersionUID = -3015346837214604468L;
	
	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String mobile = request.getParameter("mobile");
		if (mobile != null && mobile.length() > 0) {
			//生成验证码
			String vcode = SmsService.getInstance().createVCode(4);
			SmsService.getInstance().sendSmsForVCode(vcode, mobile);
		}
	}
	
}
