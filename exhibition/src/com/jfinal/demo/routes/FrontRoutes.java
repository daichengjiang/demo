package com.jfinal.demo.routes;

import com.jfinal.config.Routes;
import com.jfinal.demo.controller.IndexController;
import com.jfinal.demo.controller.UserController;

public class FrontRoutes extends Routes {

	@Override
	public void config() {
		//项目根访问路径
		add("/", IndexController.class);
		
		add("/user", UserController.class);
	}

}
