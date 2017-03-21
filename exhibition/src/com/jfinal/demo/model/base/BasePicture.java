package com.jfinal.demo.model.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BasePicture<M extends BasePicture<M>> extends Model<M> implements IBean {

	public void setPicId(java.lang.Integer picId) {
		set("picId", picId);
	}

	public java.lang.Integer getPicId() {
		return get("picId");
	}

	public void setClassifyId(java.lang.Integer classifyId) {
		set("classifyId", classifyId);
	}

	public java.lang.Integer getClassifyId() {
		return get("classifyId");
	}

	public void setTitle(java.lang.String title) {
		set("title", title);
	}

	public java.lang.String getTitle() {
		return get("title");
	}

	public void setUrl(java.lang.String url) {
		set("url", url);
	}

	public java.lang.String getUrl() {
		return get("url");
	}

	public void setType(java.lang.Integer type) {
		set("type", type);
	}

	public java.lang.Integer getType() {
		return get("type");
	}

	public void setCreateTime(java.util.Date createTime) {
		set("createTime", createTime);
	}

	public java.util.Date getCreateTime() {
		return get("createTime");
	}

}
