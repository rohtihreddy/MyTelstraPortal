package com.Telstra.ShoppingModule.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashMap;
import java.util.List;


@Document(collection = "Cart")
public class Cart {
    @Id
    private String id;
    private String address;
    private HashMap<String, Integer> product;

    public Cart(String id, String address, HashMap<String, Integer> product) {
        super();
        this.address=address;
        this.id = id;
        this.product = product;
    }

    public Cart() {super();}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public HashMap<String, Integer> getProduct() {
        return product;
    }

    public void setProduct(HashMap<String, Integer> product) {
        this.product = product;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "Cart{" +
                "id='" + id + '\'' +
                ", address='" + address + '\'' +
                ", product=" + product +
                '}';
    }
}
