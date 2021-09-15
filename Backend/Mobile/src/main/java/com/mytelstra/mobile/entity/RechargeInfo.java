package com.mytelstra.mobile.entity;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class RechargeInfo {
	private String planID;
	private String dateOfRecharge;
	private String dateOfExpiry;
	private String transactionId;
	private String paymentMode;
	public RechargeInfo() {
		super();
	}
	public RechargeInfo(String planID, String dateOfRecharge, String dateOfExpiry, String transactionId,
			String paymentMode) {
		super();
		this.planID = planID;
		this.dateOfRecharge = dateOfRecharge;
		this.dateOfExpiry = dateOfExpiry;
		this.transactionId = transactionId;
		this.paymentMode = paymentMode;
	}
	public String getPlanID() {
		return planID;
	}
	public void setPlanID(String planID) {
		this.planID = planID;
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
	public String getTransactionId() {
		return transactionId;
	}
	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}
	public String getPaymentMode() {
		return paymentMode;
	}
	public void setPaymentMode(String paymentMode) {
		this.paymentMode = paymentMode;
	}
	@Override
	public String toString() {
		return "RechargeInfo [planID=" + planID + ", dateOfRecharge=" + dateOfRecharge + ", dateOfExpiry="
				+ dateOfExpiry + ", transactionId=" + transactionId + ", paymentMode=" + paymentMode + "]";
	}
}
