package com.mytelstra.broadband.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.mytelstra.broadband.entity.Address;


@Repository
public interface AddressRepo extends MongoRepository<Address, String>{

	@Query(value="{'pincode' :{$exists: true, $in:[?0]} }")
	Address getAddressByPincode(String pincode);
}
