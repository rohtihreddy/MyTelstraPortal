package com.mytelstra.mobile.repository;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.mytelstra.mobile.entity.UserInfo;

@Repository
public interface UserRepository extends MongoRepository<UserInfo, String> {
	@Query(value="{'id' : ?0 }")
	UserInfo findRechrgeHistoryById(String id);
}
