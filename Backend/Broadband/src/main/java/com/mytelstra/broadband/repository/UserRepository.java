package com.mytelstra.broadband.repository;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.mytelstra.broadband.entity.UserInfo;

@Repository
public interface UserRepository extends MongoRepository<UserInfo, String> {

}
