package com.Telstra.ShoppingModule.repository;

import com.Telstra.ShoppingModule.entity.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepo extends MongoRepository<Cart,String> {
    public Optional<Cart> findById(String id);
}
