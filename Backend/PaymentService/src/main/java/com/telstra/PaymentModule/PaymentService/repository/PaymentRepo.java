package com.telstra.PaymentModule.PaymentService.repository;

import com.telstra.PaymentModule.PaymentService.entity.payment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepo extends MongoRepository<payment, String> {
}
