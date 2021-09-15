package com.mytelstra.mobile.controller;

import java.util.List;
import java.util.Map;

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

import com.mytelstra.mobile.entity.ActivePlan;
import com.mytelstra.mobile.entity.Balance;
import com.mytelstra.mobile.entity.MobilePlans;
import com.mytelstra.mobile.entity.RechargeInfo;
import com.mytelstra.mobile.entity.UsageInfo;
import com.mytelstra.mobile.entity.UserInfo;
import com.mytelstra.mobile.service.MobileServices;

@RestController
@RequestMapping("/")
@CrossOrigin
public class MobileController {
	@Autowired
	private MobileServices mobileServices;
	
	
	@GetMapping("/")
	public String home() {
		return "Mobile Services Here";
	}
	
	@GetMapping("/viewPlans")
	public List<MobilePlans> viewPlans(){
		return mobileServices.viewAllPlans();
	}
	
	@GetMapping("/viewPlans/{id}")
	public List<MobilePlans> viewPlansById(@PathVariable("id") String userid){
		return mobileServices.viewPlans(userid);
	}
	
	@GetMapping("/viewBasePlans")
	public List<MobilePlans> viewBasePlans(){
		return mobileServices.viewBasePlans();
	}
	
	@GetMapping("/viewAddonPlans")
	public List<MobilePlans> viewAddOn(){
		return mobileServices.viewAddonPlans();
	}
	
	@GetMapping("/users")
	public List<UserInfo> users(){
		return mobileServices.userinfo();
	}
	
	@GetMapping("/userDetails/{id}")
	public UserInfo getUserDetailsByID(@PathVariable("id") String id){
		return mobileServices.getUserById(id);
	}
	
//	@GetMapping(value="/userDetails")
//	public UserInfo userdetails(@RequestBody String id){
//		return mobileServices.getUserById(id);
//	}
	
	@GetMapping("/rechargeHistory/{id}")
	public List<RechargeInfo> userRechargeHistoryById(@PathVariable("id") String id){
		return mobileServices.userRechargeHistory(id);
	}
	
//	@GetMapping("/rechargeHistory")
//	public List<RechargeInfo> userrechargehistory(@RequestBody String id){
//		return mobileServices.userRechargeHistory(id);
//	}
	
	@GetMapping("/mobileBasePlan/{id}")
	public MobilePlans viewBasePlanByID(@PathVariable("id") String id) {
		return mobileServices.getBaseMobilePlanById(id);
	}
	
	@GetMapping("/mobileAddonPlan/{id}")
	public MobilePlans viewAddonPlanByID(@PathVariable("id") String id) {
		return mobileServices.getAddonMobilePlanById(id);
	}
	
	@GetMapping("/currentPlan/{id}")
	public List<ActivePlan> getCurrentPlanById(@PathVariable("id") String id) {
		return mobileServices.getCurrentPlan(id);
	}
	
//	@GetMapping("/currentPlan")
//	public List<ActivePlan> getCurrentPlan(@RequestBody Map<String,String> id) {
//		return mobileServices.getCurrentPlan(id.get("id"));	
//	}
	
	@GetMapping("/balance/{id}")
	public Balance getBalanceById(@PathVariable("id") String id) {
		return mobileServices.getCurrentBalance(id);
	}
	
//	@GetMapping("/balance")
//	public Balance getBalance(@RequestBody String id) {
//		return mobileServices.getCurrentBalance(id);
//	}
	
//	@PutMapping("/recharge/{userid}/{planid}")
//	public String rechargeUserGet(@PathVariable("userid") String userid, @PathVariable("planid") String planid) {
//		return mobileServices.rechargeUserById(userid,planid);
//	}
	
	@PutMapping("/recharge")
	public String rechargeUserBase(@Validated @RequestBody Map<String,String> id) {
		return mobileServices.rechargeUserById(id.get("userid"),id.get("planid"));
	}
	
	
	@GetMapping("/usageinfo/{userid}")
	public List<UsageInfo> getUsageInfo(@PathVariable("userid") String userid){
		return mobileServices.getUsageInfoById(userid);
	}
	
	@PutMapping("/setusage/{userid}")
	public String addUsageInfo(@Validated @RequestBody Map<String,String> usage, @PathVariable("userid") String userid){
		return mobileServices.addusage(usage,userid);
	}
	
	@PostMapping("/createuser")
	public String createUser(@Validated @RequestBody String id) {
		return mobileServices.createNewUser(id)?"User Created":"User Creation Failed!!";
	}
}
