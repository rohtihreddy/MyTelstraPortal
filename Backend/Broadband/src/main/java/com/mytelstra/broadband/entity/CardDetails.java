package com.mytelstra.broadband.entity;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "carddetails")
public class CardDetails {

	private long cardNo;
	private String expDate;
	private int cvv;
	
	public CardDetails(long cardNo, String expDate, int cvv) {
		super();
		this.cardNo = cardNo;
		this.expDate = expDate;
		this.cvv = cvv;
	}
	public long getCardNo() {
		return cardNo;
	}
	public void setCardNo(long cardNo) {
		this.cardNo = cardNo;
	}
	public String getExpDate() {
		return expDate;
	}
	public void setExpDate(String expDate) {
		this.expDate = expDate;
	}
	public int getCVV() {
		return cvv;
	}
	public void setCVV(int cvv) {
		this.cvv = cvv;
	}
	@Override
	public String toString() {
		return "CardDetails [cardNo=" + cardNo + ", expDate=" + expDate + ", CVV=" + cvv + "]";
	}
	
	
}
