package com.Telstra.ShoppingModule.service;

import com.Telstra.ShoppingModule.entity.Shop;
import org.bson.types.Binary;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ShopServices {

    public List<Shop> viewItems();
    public List<Shop> viewMobiles();
    public List<Shop> viewBroadband();
    public List<Shop> viewAppliances();
    public Shop getItem(String pid);
    public void AddItem(String pid, String category, String name, int price, String details, String image);
    //public Cart getCart(String CustId);
}
