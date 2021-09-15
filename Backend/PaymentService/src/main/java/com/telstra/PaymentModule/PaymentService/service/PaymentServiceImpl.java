package com.telstra.PaymentModule.PaymentService.service;

import com.mongodb.client.MongoClient;
import com.telstra.PaymentModule.PaymentService.entity.payment;
import com.telstra.PaymentModule.PaymentService.repository.PaymentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

@Service
public class PaymentServiceImpl implements PaymentService{



    @Autowired
    private PaymentRepo PaymentRepo;

    @Autowired
    private MongoClient client;

    @Override
    public String TransactionWrite(String CreditCardNo, int cv, String ExpDate) {
        String pattern = "dd/MM/yyyy";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
        //Date todate = new Date();
        if(!checkLuhn(CreditCardNo)){
            return "Unsuccessful";
        }
        payment payment=new payment();
        String today = simpleDateFormat.format(new Date());
        payment.setTransactionID(UUID.randomUUID().toString());
        payment.setCreditCardNo(CreditCardNo);
        payment.setCv(cv);
        payment.setExpDate(ExpDate);
        payment.setTime(today);
        PaymentRepo.save(payment);
        return "Successful";
    }

    public boolean checkLuhn(String cardNo)
    {
        int nDigits = cardNo.length();

        int nSum = 0;
        boolean isSecond = false;
        for (int i = nDigits - 1; i >= 0; i--)
        {

            int d = cardNo.charAt(i) - '0';

            if (isSecond == true)
                d = d * 2;

            // We add two digits to handle
            // cases that make two digits
            // after doubling
            nSum += d / 10;
            nSum += d % 10;

            isSecond = !isSecond;
        }
        return (nSum % 10 == 0);
    }

}

