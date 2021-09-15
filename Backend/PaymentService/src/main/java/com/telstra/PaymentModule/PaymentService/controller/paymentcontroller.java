package com.telstra.PaymentModule.PaymentService.controller;

import com.telstra.PaymentModule.PaymentService.entity.creditcard;
import com.telstra.PaymentModule.PaymentService.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class paymentcontroller {

    @Autowired
    private PaymentService paymentService;

    @RequestMapping(value="/payment", method = RequestMethod.POST)
    @ResponseBody
    public String payment(@RequestBody creditcard creditcard){
        System.out.println(creditcard);
        return paymentService.TransactionWrite(creditcard.getCreditCardNo(), creditcard.getCv(), creditcard.getExpDate());
    }
}
