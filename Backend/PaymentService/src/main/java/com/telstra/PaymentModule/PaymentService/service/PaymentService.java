package com.telstra.PaymentModule.PaymentService.service;

public interface PaymentService {

    public String TransactionWrite(String CreditCardNo, int cv, String ExpDate);
}
