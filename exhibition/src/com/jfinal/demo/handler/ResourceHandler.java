package com.jfinal.demo.handler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.jfinal.ext.handler.FakeStaticHandler;

public class ResourceHandler extends FakeStaticHandler {

	public ResourceHandler(String  viewpre) {
		super(viewpre);
	}
	
	public void handle(String target, HttpServletRequest request,
			HttpServletResponse response, boolean[] isHandled) {
		// TODO Auto-generated method stub
		super.handle(target, request, response, isHandled);
	}

}
