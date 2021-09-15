package com.Telstra.ShoppingModule.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
public class CartProduct {
    @Id
    private String pid;
    private Integer quantity;

    public CartProduct(String pid, Integer quantity) {
        super();
        this.pid = pid;
        this.quantity = quantity;
    }

    public CartProduct(){super();}

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "CartProduct{" +
                "pid='" + pid + '\'' +
                ", quantity=" + quantity +
                '}';
    }
}
