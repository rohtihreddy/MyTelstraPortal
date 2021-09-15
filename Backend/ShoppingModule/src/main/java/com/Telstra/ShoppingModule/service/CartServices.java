package com.Telstra.ShoppingModule.service;

import com.Telstra.ShoppingModule.entity.Cart;

import java.util.HashMap;

public interface CartServices {
    public String AddToCart(String id, String pid, int quantity, String address);
   public HashMap<String,Integer> GetProductsFromCart(String id);
    public String GetAddressFromCart(String id);
    public void DeleteProductFromCart(String id, String pid);
    public void EmptyCart(String id);
    public boolean UpdateProductOnCart(String id, String pid, int quantity);
}
