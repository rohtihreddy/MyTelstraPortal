package com.Telstra.ShoppingModule.service;

import com.Telstra.ShoppingModule.entity.Cart;
import com.Telstra.ShoppingModule.entity.CartProduct;
import com.Telstra.ShoppingModule.entity.Shop;
import com.Telstra.ShoppingModule.repository.CartRepo;
import com.Telstra.ShoppingModule.repository.ShopRepo;
import com.mongodb.client.MongoClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class CartServiceImplementation implements CartServices{

    @Autowired
    private CartRepo CartRepo;

    @Autowired
    private MongoClient client;

    @Autowired
    private ShopRepo shopRepo;
   

    @Override
    public String AddToCart(String id, String pid, int quantity, String address) {
        Optional<Cart> cart=CartRepo.findById(id);
        Shop Item= shopRepo.findByPid(pid);
        System.out.println(cart);
        if(!cart.isPresent())
        {
            HashMap<String, Integer> cartlist=new HashMap<>();
              cartlist.put(Item.getName(), quantity);
            Cart newcart=new Cart(id,address, cartlist);
            CartRepo.save(newcart);
        }
        else
        {
            HashMap<String, Integer> productlist=cart.get().getProduct();
            productlist=cart.get().getProduct();
            if(productlist.containsKey(Item.getName()))
            {
            	int x= productlist.get(Item.getName());
                productlist.replace(Item.getName(),quantity+x);
            }
            else
            {
                productlist.put(Item.getName(),quantity);
            }
            Cart newcart=new Cart(id,address, productlist);
            CartRepo.save(newcart);
        }

        return "Order Placed";
    }



    @Override
    public HashMap GetProductsFromCart(String id) {
        Optional<Cart> cart=CartRepo.findById(id);
        HashMap<String, Integer> productlist=new HashMap<>();
        productlist=cart.get().getProduct();
        return productlist;
    }

    @Override
    public String GetAddressFromCart(String id) {
        Optional<Cart> cart=CartRepo.findById(id);
        if(cart.isPresent()) {
        	 System.out.println(cart.get());
        	 System.out.println(cart.get().getAddress());
        	return cart.get().getAddress();
        }
        else
        	return new Cart().getAddress();
    }

    @Override
    public void DeleteProductFromCart(String id, String pid) {
        Optional<Cart> cart=CartRepo.findById(id);
        HashMap<String, Integer> productlist=new HashMap<>();
        productlist=cart.get().getProduct();
        productlist.remove(pid);
        Cart newcart=new Cart(id,cart.get().getAddress(), productlist);
        CartRepo.save(newcart);
    }

    @Override
    public void EmptyCart(String id) {
        Optional<Cart> cart=CartRepo.findById(id);
        HashMap<String, Integer> productlist=new HashMap<>();
        Cart newcart=new Cart(id,cart.get().getAddress(),productlist);
        CartRepo.save(newcart);
    }

    @Override
    public boolean UpdateProductOnCart(String id, String pid, int quantity) {
        return false;
    }
}
