package com.Telstra.ShoppingModule.controller;

import com.Telstra.ShoppingModule.entity.Cart;
import com.Telstra.ShoppingModule.entity.CartProduct;
import com.Telstra.ShoppingModule.entity.Shop;
import com.Telstra.ShoppingModule.entity.ShopToCart;
import com.Telstra.ShoppingModule.service.CartServices;
import com.Telstra.ShoppingModule.service.ShopServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin()
public class shopcontroller {

    @Autowired
    private ShopServices shopServices;

    @Autowired
    private CartServices cartServices;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String home() {
        return "Shop Rest API";
    }

    @RequestMapping(value = "/view_items", method = RequestMethod.GET)
    public List<Shop> viewItems() {
        return shopServices.viewItems();
    }

    @RequestMapping(value = "/view_mobiles", method = RequestMethod.GET)
    public List<Shop> viewMobiles() {
        return shopServices.viewMobiles();
    }

    @RequestMapping(value = "/view_broadband", method = RequestMethod.GET)
    public List<Shop> viewBroadband() {
        return shopServices.viewBroadband();
    }

    @RequestMapping(value = "/view_appliances", method = RequestMethod.GET)
    public List<Shop> viewAppliances() {
        return shopServices.viewAppliances();
    }

    @RequestMapping(value = "/view_items/item", method = RequestMethod.GET)
    public Shop getItem(@RequestParam String id) { return shopServices.getItem(id); }

    @PostMapping("/AddProd")
    public void AddProd(@RequestParam("pid") String pid, @RequestParam("category") String category,
                        @RequestParam("name") String name, @RequestParam("price") int price,
                        @RequestParam("details") String details, @RequestParam("image") String image, Model model){
        shopServices.AddItem(pid,category,name,price,details,image);
    }

    @RequestMapping(value="/AddToCart", method = RequestMethod.POST)
    @ResponseBody
    public String AddToCart(@RequestBody ShopToCart shopToCart){
       return cartServices.AddToCart(shopToCart.getId(), shopToCart.getPid(), shopToCart.getQuantity(), shopToCart.getAddress());
    }

    @GetMapping("/GetProductsFromCart/{id}")
    public HashMap<String,Integer> GetProductsFromCart(@PathVariable("id") String id){
        //System.out.println(id);
        return cartServices.GetProductsFromCart(id);
    }
    @GetMapping("/GetAddressFromCart/{id}")
    public String GetAddressFromCart(@PathVariable("id") String id){
        //System.out.println(id);
        return cartServices.GetAddressFromCart(id);
    }

    @PutMapping("/DeleteProductFromCart/{id}/{pid}")
    public void DeleteProductFromMap(@PathVariable("id") String id, @PathVariable("pid") String pid){
        //System.out.println(id);
        cartServices.DeleteProductFromCart(id,pid);
    }

    @PutMapping("/EmptyCart/{id}")
    public void EmptyCart(@PathVariable("id") String id){
        //System.out.println(id);
        cartServices.EmptyCart(id);
    }
}
