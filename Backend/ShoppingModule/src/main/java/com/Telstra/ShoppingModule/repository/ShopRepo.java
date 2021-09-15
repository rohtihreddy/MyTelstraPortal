package com.Telstra.ShoppingModule.repository;

import com.Telstra.ShoppingModule.entity.Cart;
import com.Telstra.ShoppingModule.entity.Shop;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShopRepo extends MongoRepository<Shop, String>{
    public Shop findByPid(String pid);
    public List<Shop> findByCategory(String category);

}
