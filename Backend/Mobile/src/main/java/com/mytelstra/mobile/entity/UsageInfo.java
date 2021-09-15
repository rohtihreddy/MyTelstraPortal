package com.mytelstra.mobile.entity;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class UsageInfo {
	private String date;
	private String time;
	private String type;
	private String quantity;
	public UsageInfo() {
		super();
	}
	public UsageInfo(String date, String time, String type, String quantity) {
		super();
		this.date = date;
		this.time = time;
		this.type = type;
		this.quantity = quantity;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getQuantity() {
		return quantity;
	}
	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}
	@Override
	public String toString() {
		return "UsageInfo [date=" + date + ", time=" + time + ", type=" + type + ", quantity=" + quantity + "]";
	}
}
