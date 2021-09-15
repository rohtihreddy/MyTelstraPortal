package com.telstra.PaymentModule.PaymentService.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "payment")
public class payment {
    @Id
    private String id;
    private String TransactionID;
    private String CreditCardNo;
    private int cv;
    private String ExpDate;
    private String time;

    public payment(String id, String transactionID, String creditCardNo, int cv, String expDate, String time) {
        super();
        this.id = id;
        this.TransactionID = transactionID;
        this.CreditCardNo = creditCardNo;
        this.cv = cv;
        this.ExpDate = expDate;
        this.time = time;
    }

    public payment()
    {
        super();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTransactionID() {
        return TransactionID;
    }

    public void setTransactionID(String transactionID) {
        this.TransactionID = transactionID;
    }

    public String getCreditCardNo() {
        return CreditCardNo;
    }

    public void setCreditCardNo(String creditCardNo) {
        this.CreditCardNo = creditCardNo;
    }

    public int getCv() {
        return cv;
    }

    public void setCv(int cv) {
        this.cv = cv;
    }

    public String getExpDate() {
        return ExpDate;
    }

    public void setExpDate(String expDate) {
        this.ExpDate = expDate;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    @Override
    public String toString() {
        return "payment{" +
                "id='" + id + '\'' +
                ", TransactionID='" + TransactionID + '\'' +
                ", CreditCardNo='" + CreditCardNo + '\'' +
                ", cv=" + cv +
                ", ExpDate='" + ExpDate + '\'' +
                ", time='" + time + '\'' +
                '}';
    }
}


