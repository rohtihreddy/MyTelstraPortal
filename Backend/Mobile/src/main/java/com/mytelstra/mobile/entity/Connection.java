package com.mytelstra.mobile.entity;

import javax.persistence.Entity;

@Entity
public class Connection {
	private String username = "root";
	private String password = "admin";
	private String uri = "mongodb://localhost:27017/Telstra";
}
