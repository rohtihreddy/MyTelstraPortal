package com.mytelstra.mobile.entity;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="MobileUserInformation")
public class UserInfo {
	private String id;
	private String mobilenumber;
	private String username;
	private boolean basePackActive;
	private List<RechargeInfo> planshistory;
	private List<ActivePlan> activeplan;
	private Balance balance;
	private List<UsageInfo> usage;
	
	public UserInfo() {
		super();
	}

	public UserInfo(String id, String mobilenumber, String username, boolean basePackActive,
			List<RechargeInfo> planshistory, List<ActivePlan> activeplan, Balance balance, List<UsageInfo> usage) {
		super();
		this.id = id;
		this.mobilenumber = mobilenumber;
		this.username = username;
		this.basePackActive = basePackActive;
		this.planshistory = planshistory;
		this.activeplan = activeplan;
		this.balance = balance;
		this.usage = usage;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getMobilenumber() {
		return mobilenumber;
	}

	public void setMobilenumber(String mobilenumber) {
		this.mobilenumber = mobilenumber;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public boolean isBasePackActive() {
		return basePackActive;
	}

	public void setBasePackActive(boolean basePackActive) {
		this.basePackActive = basePackActive;
	}

	public List<RechargeInfo> getPlanshistory() {
		return planshistory;
	}

	public void setPlanshistory(List<RechargeInfo> planshistory) {
		this.planshistory = planshistory;
	}

	public List<ActivePlan> getActiveplan() {
		return activeplan;
	}

	public void setActiveplan(List<ActivePlan> activeplan) {
		this.activeplan = activeplan;
	}

	public Balance getBalance() {
		return balance;
	}

	public void setBalance(Balance balance) {
		this.balance = balance;
	}

	public List<UsageInfo> getUsage() {
		return usage;
	}

	public void setUsage(List<UsageInfo> usage) {
		this.usage = usage;
	}

	@Override
	public String toString() {
		return "UserInfo [id=" + id + ", mobilenumber=" + mobilenumber + ", username=" + username + ", basePackActive="
				+ basePackActive + ", planshistory=" + planshistory + ", activeplan=" + activeplan + ", balance="
				+ balance + ", usage=" + usage + "]";
	}
}
