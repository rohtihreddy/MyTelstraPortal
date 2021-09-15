package com.telstra.PaymentModule.PaymentService.entity;

import org.springframework.data.annotation.Id;

public class creditcard {
    @Id
    private String CreditCardNo;
    private int cv;
    private String ExpDate;

    public creditcard(String creditCardNo, int cv, String expDate) {
        super();
        this.CreditCardNo = creditCardNo;
        this.cv = cv;
        this.ExpDate = expDate;
    }

    public creditcard()
    {
        super();
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

    @Override
    public String toString() {
        return "creditcard{" +
                "CreditCardNo='" + CreditCardNo + '\'' +
                ", cv=" + cv +
                ", ExpDate='" + ExpDate + '\'' +
                '}';
    }
}
