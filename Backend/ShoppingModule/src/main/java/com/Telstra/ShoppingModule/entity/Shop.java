package com.Telstra.ShoppingModule.entity;

import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="shop")
public class Shop {
    @Id
    private String id;
    private String pid;
    private String category;
    private String name;
    private int price;
    private String details;
    private String image;

    public Shop(String pid, String category, String name, int price, String details, String image) {
        super();
        //this.id = id;
        this.pid = pid;
        this.category=category;
        this.name = name;
        this.price = price;
        this.details = details;
        this.image=image;
    }

    public Shop() {
        super();
    }

    /* public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    } */

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    @Override
    public String toString() {
        return "Shop{" +
                "id='" + id + '\'' +
                ", pid='" + pid + '\'' +
                ", category='" + category + '\'' +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", details='" + details + '\'' +
                ", image=" + image +
                '}';
    }
}
