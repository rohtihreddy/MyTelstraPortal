package com.mytelstra.broadband.controller;

import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mytelstra.broadband.entity.Address;
import com.mytelstra.broadband.entity.BroadbandPlans;
import com.mytelstra.broadband.entity.CardDetails;
import com.mytelstra.broadband.entity.DataUsageDetails;
import com.mytelstra.broadband.entity.RechargeInfo;
import com.mytelstra.broadband.entity.UserInfo;
import com.mytelstra.broadband.service.BroadbandServices;

@RestController
@RequestMapping("")
@CrossOrigin()
public class BroadbandController {
	@Autowired
	private BroadbandServices broadbandServices;
	
	
	@GetMapping("/")
	public String home() {
		return "Broadband Services Here";
	}
	
	@GetMapping("/viewPlans")
	public List<BroadbandPlans> viewPlans(){
		return broadbandServices.viewPlans();
	}
	
	@GetMapping("/users")
	public List<UserInfo> users(){
		return broadbandServices.userinfo();
	}
	
	@GetMapping("/userDetails/{id}")
	public UserInfo userdetailsByID(@PathVariable("id") String id){
		return broadbandServices.getUserById(id);
	}
	
	@GetMapping("/broadbandPlan/{id}")
	public BroadbandPlans viewPlanByID(@PathVariable("id") String id) {
		return broadbandServices.getBroadbandPlanById(id);
	}
	
	@GetMapping("/rechargeHistory/{id}")
	public List<RechargeInfo> userrechargehistoryById(@PathVariable("id") String id){
		return broadbandServices.userRechargeHistory(id);
	}
	
	
	@GetMapping("/currentPlan/{id}")
	public RechargeInfo getCurrentPlanById(@PathVariable("id") String id) {
		return broadbandServices.getCurrentPlan(id);
	}
	
	@PutMapping("/recharge")
	public String rechargeUserPut(@Validated @RequestBody Map<String,String> id) {
		return broadbandServices.rechargeUserById(id.get("userid"),id.get("planid"));
	}
	
	@GetMapping("/UpgradePlans/{userid}")
	public List<BroadbandPlans> viewUpgradePlans(@PathVariable("userid") String id){
		return broadbandServices.getUpgradePlans(id);
	}
	
	@PutMapping("/upgradeplan")
	public String upgradeUserPut(@Validated @RequestBody Map<String,String> id) {
		return broadbandServices.rechargeUserById(id.get("userid"),id.get("planid"));
	}
	
	@PostMapping("/card_details")
	public CardDetails saveCardDetails(@Valid @RequestBody CardDetails cardDetails) {
	       return broadbandServices.saveCardDetails(cardDetails);
	}
	
    @GetMapping("/payment_success/{planid}/{userid}")
	public Map<String,String> paymentDetails(@PathVariable("planid") String planid,@PathVariable("userid") String userid) {
		Map<String,String> p = broadbandServices.paymentDetails(planid,userid); 
		Map<String,String> result= new HashMap<>();
		result.putAll(p);
		
		
		return result;
		
	} 
    @PostMapping("/address")
	public boolean validateAddress(@Valid @RequestBody Address address) {
    	System.out.println(address);
		 return broadbandServices.validateAddress(address);
		 
     
	}
//	@GetMapping("/address")
//	public List<BroadbandPlans> validateAddress(@Valid @RequestBody Address address) {
//		if(broadbandServices.validateAddress(address)) {
//			return this.viewPlans();
//		}
//		else {
//			System.out.println("Network not available at this address");
//			return Collections.emptyList();
//		}
//     
//	}
	

	@GetMapping("/currentBill/{userId}")
	public Map<String,String> getCurrentBillDetails(@PathVariable("userId") String userId) {
		RechargeInfo rechargeInfo= broadbandServices.getCurrentPlan(userId);
		BroadbandPlans plan = broadbandServices.getBroadbandPlanById(rechargeInfo.getPlanId());
		Map<String,String> result= new HashMap<>();
		result.put("bill_number", UUID.randomUUID().toString());
		result.put("bill_date", new Date().toString());
		result.put("plan_name",plan.getPlan());
		result.put("due_amount", Integer.toString(plan.getPrice()));
		result.put("due_date", rechargeInfo.getDateOfExpiry());
		result.put("plan_id", plan.getId());
		 return result;
	}
	
	@GetMapping("/view_datausage/{userId}")
 	public  List<DataUsageDetails> getDataUsageOfUser(@PathVariable("userId") String userId) {
				return broadbandServices.getDataUsageOfUser(userId);
	}

	@PutMapping("/createbroadbanduser/{userId}")
	public boolean createBroadbandUser(@PathVariable("userId") String userId) {
		return broadbandServices.createNewBroadbandUser(userId);
	}
/*
	@RequestMapping(value="/rechargeHistory", method = RequestMethod.GET)
	public List<RechargeInfo> userrechargehistory(@RequestBody String id){
		return broadbandServices.userRechargeHistory(id);
	}
	
	
	@RequestMapping(value="/userDetails", method = RequestMethod.GET)
	public UserInfo userdetails(@RequestBody String id){
		return broadbandServices.getUserById(id);
	}
	
	@RequestMapping(value="/currentPlan",method = RequestMethod.GET)
	public RechargeInfo getCurrentPlan(@RequestBody String id) {
		return broadbandServices.getCurrentPlan(id);
	}
	
	@RequestMapping(value="/balance/{id}",method = RequestMethod.GET)
	public Map<String,String> getBalanceById(@PathVariable("id") String id) {
		return broadbandServices.getCurrentBalance(id);
	}
	
	@RequestMapping(value="/balance",method = RequestMethod.GET)
	public Map<String,String> getBalance(@Validated @RequestBody String id) {
		return broadbandServices.getCurrentBalance(id);
	}
	
	@RequestMapping(value="/recharge/{userid}/{planid}",method = RequestMethod.GET)
	public String rechargeUserGet(@PathVariable("userid") String userid, @PathVariable("planid") String planid) {
		return broadbandServices.rechargeUserById(userid,planid);
	}
*/	
}
