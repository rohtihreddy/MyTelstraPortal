package com.Telstra.ShoppingModule.service;

import com.Telstra.ShoppingModule.entity.Shop;
import com.Telstra.ShoppingModule.entity.Shop;
import com.Telstra.ShoppingModule.repository.ShopRepo;
import com.mongodb.client.MongoClient;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@Service
public class ShopServiceImpl implements ShopServices{

    @Autowired
    private ShopRepo ShopRepo;

    @Autowired
    private MongoClient client;

    @Override
    public List<Shop> viewItems() {
        List<Shop> AllItems =  ShopRepo.findAll();
        //System.out.println(repo.findAll());
        //System.out.println("Hello");
        for(Shop items : AllItems) {
            System.out.println(items);
        }
        return AllItems;
    }

    @Override
    public List<Shop> viewMobiles() {
        List<Shop> Mobiles= ShopRepo.findByCategory("mobile");
        return Mobiles;
    }

    @Override
    public List<Shop> viewBroadband() {
        List<Shop> Broadband= ShopRepo.findByCategory("broadband");
        return Broadband;
    }

    @Override
    public List<Shop> viewAppliances() {
        List<Shop> Appliances= ShopRepo.findByCategory("appliances");
        return Appliances;
    }

    @Override
    public Shop getItem(String pid) {
        Shop Item= ShopRepo.findByPid(pid);
        return Item;
    }

    @Override
    public void AddItem(String pid, String category, String name, int price, String details, String image) {

        Shop prod= null;
         {
    
        	prod = new Shop(pid,category,name,price,details,image);
         } 
   
        ShopRepo.insert(prod);
    }
}
