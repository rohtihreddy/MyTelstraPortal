package com.mytelstra.broadband.service;
import java.util.List;
import java.util.Map;


import javax.validation.Valid;

import com.mytelstra.broadband.entity.Address;
import com.mytelstra.broadband.entity.BroadbandPlans;
import com.mytelstra.broadband.entity.CardDetails;

import com.mytelstra.broadband.entity.DataUsageDetails;
import com.mytelstra.broadband.entity.RechargeInfo;
import com.mytelstra.broadband.entity.UserInfo;

public interface BroadbandServices {
	public List<BroadbandPlans> viewPlans();
	public List<UserInfo> userinfo();
	public CardDetails saveCardDetails(CardDetails cardDetails);
	public Map<String,String> paymentDetails(String planid,String userid);

	public UserInfo getUserById(String id);
	public List<RechargeInfo> userRechargeHistory(String id);
	public BroadbandPlans getBroadbandPlanById(String id);
	public RechargeInfo getCurrentPlan(String id);
	public Map<String,String> getCurrentBalance(String id);
	public String rechargeUserById(String userid, String planid);
	public boolean validateAddress(@Valid Address address);
	List<BroadbandPlans> getUpgradePlans(String id);
	public List<DataUsageDetails> getDataUsageOfUser(String userId);
	public boolean createNewBroadbandUser(String userid);
	
	
	
}
