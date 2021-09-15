package com.example.springsocial.repository;

import com.example.springsocial.model.User;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    //@Query(value = "{'provider':'local','Email':?0}")
    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

}
