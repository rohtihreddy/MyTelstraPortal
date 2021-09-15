package com.Telstra.ShoppingModule.entity;

import org.springframework.data.annotation.Id;

public class ShopToCart {
    @Id
    private String id;
    private String pid;
    private Integer quantity;
    private String address;

    public ShopToCart(String id, String pid, Integer quantity, String address) {
        this.id = id;
        this.pid = pid;
        this.quantity = quantity;
        this.address=address;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "ShopToCart{" +
                "id='" + id + '\'' +
                ", pid='" + pid + '\'' +
                ", quantity=" + quantity +
                ", address='" + address + '\'' +
                '}';
    }
}
