package com.mytelstra.mobile.entity;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class ActivePlan {
	
	private MobilePlans planInfo;
	private String dateOfRecharge;
	private String dateOfExpiry;
	
	public ActivePlan() {
		super();
	}

	
	public ActivePlan(MobilePlans planInfo, String dateOfRecharge, String dateOfExpiry) {
		super();
		this.planInfo = planInfo;
		this.dateOfRecharge = dateOfRecharge;
		this.dateOfExpiry = dateOfExpiry;
	}


	public MobilePlans getPlanInfo() {
		return planInfo;
	}

	public void setPlanInfo(MobilePlans planInfo) {
		this.planInfo = planInfo;
	}

	public String getDateOfRecharge() {
		return dateOfRecharge;
	}

	public void setDateOfRecharge(String dateOfRecharge) {
		this.dateOfRecharge = dateOfRecharge;
	}

	public String getDateOfExpiry() {
		return dateOfExpiry;
	}

	public void setDateOfExpiry(String dateOfExpiry) {
		this.dateOfExpiry = dateOfExpiry;
	}


	@Override
	public String toString() {
		return "ActivePlan [planInfo=" + planInfo + ", dateOfRecharge=" + dateOfRecharge + ", dateOfExpiry="
				+ dateOfExpiry + "]";
	}
	
}
