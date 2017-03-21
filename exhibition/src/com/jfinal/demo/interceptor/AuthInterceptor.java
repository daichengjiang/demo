package com.jfinal.demo.interceptor;

import com.jfinal.aop.Interceptor;
import com.jfinal.aop.Invocation;

public class AuthInterceptor implements Interceptor {

	@Override
	public void intercept(Invocation inv) {
		// TODO Auto-generated method stub
		inv.invoke();
	}

}
