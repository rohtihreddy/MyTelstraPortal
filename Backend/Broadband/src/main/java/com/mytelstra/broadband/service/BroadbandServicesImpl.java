package com.mytelstra.broadband.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.mytelstra.broadband.entity.Address;
import com.mytelstra.broadband.entity.BroadbandPlans;
import com.mytelstra.broadband.entity.CardDetails;
import com.mytelstra.broadband.entity.DataUsage;
import com.mytelstra.broadband.entity.DataUsageDetails;
import com.mytelstra.broadband.entity.RechargeInfo;
import com.mytelstra.broadband.entity.UserInfo;
import com.mytelstra.broadband.repository.AddressRepo;
import com.mytelstra.broadband.repository.BroadbandRepository;
import com.mytelstra.broadband.repository.CardRepo;
import com.mytelstra.broadband.repository.DataUsageRepo;
import com.mytelstra.broadband.repository.UserRepository;


@Service
public class BroadbandServicesImpl implements BroadbandServices{
	
	@Autowired
	private BroadbandRepository broadbandrepo;
	
	@Autowired
	private CardRepo cardRepo;
	
	@Autowired
	private UserRepository userrepo;
	
	@Autowired
	private AddressRepo addressRepo;
	
	@Autowired
	private DataUsageRepo dataUsageRepo;
	

	@Override
	public List<BroadbandPlans> viewPlans() {
		
		List<BroadbandPlans> mobileplans = broadbandrepo.findAll();
		
		for(BroadbandPlans p: mobileplans)
			System.out.println(p);
		System.out.println("============================================================================================================");
		return mobileplans;
	}

	@Override
	public List<UserInfo> userinfo() {
		
		List<UserInfo> userinfo = userrepo.findAll();
		for(UserInfo u:userinfo)
			System.out.println(u);
		System.out.println("============================================================================================================");
		return userinfo;
	}

	@Override
	public boolean createNewBroadbandUser(String userid) {
		Optional<UserInfo> userinfo = userrepo.findById(userid);
		if(userinfo.isPresent())
			return false;
		UserInfo user= new UserInfo();
		user.setId(userid);
		user.setPlanshistory(new ArrayList<>());
		user.setActiveplan(null);
		user.setDataremaining(0);
		user.setActivePlanStatus(false);
		user.setUpgradePlanStatus(false);
		userrepo.insert(user);
		
		return true;
		
		
	}
	
	
	@Override
	public CardDetails saveCardDetails(CardDetails cardDetails) {
		return cardRepo.save(cardDetails);
	}
	
	@Override
	public Map<String,String> paymentDetails(String planid,String userid) {
	
		BroadbandPlans broadbandPlan = getBroadbandPlanById(planid);
		UserInfo user=getUserById(userid);
		Map<String,String> payment= new HashMap<>() ;
		try {
		payment.put("reference_id", user.getActiveplan().getReferenceId());
		payment.put("Status", "Payment Succesfull");
		payment.put("payment_mode", user.getActiveplan().getPaymentMode());
		payment.put("broadband_plan", broadbandPlan.toString());
		return payment;
		}catch(Exception e) {
			System.out.println("Check User and plan details/ recharge not succesfull");
			payment.put("Recharge not succesfull/ Check User and plan details",null );
			return payment;
		}
		
		
	}
	
	@Override
	public List<RechargeInfo> userRechargeHistory(String id) {			
		List<RechargeInfo> rechargehistory = new ArrayList<>();
		try {
			Optional<UserInfo> userinfo = userrepo.findById(id);
			if(userinfo.isPresent()) {
			rechargehistory = userinfo.get().getPlanshistory();
			}else {
				System.out.println("No user info..check user details");
			}
		}catch(Exception e) {
			//if the user not found with _id=id
			System.out.println("No Such User Found...can't get recharge history");
			System.out.println("============================================================================================================");
			rechargehistory.add(0,null);
		}
		return rechargehistory;
	}


	@Override
	public UserInfo getUserById(String id) {
		Optional<UserInfo> userinfo = userrepo.findById(id);
		if(!userinfo.isPresent())
			return new UserInfo();
		return userinfo.get();
	}

	@Override
	public BroadbandPlans getBroadbandPlanById(String id) {
		Optional<BroadbandPlans> planinfo = broadbandrepo.findById(id);
		if(!planinfo.isPresent())
			return new BroadbandPlans();
		System.out.println(planinfo.get());
		System.out.println("============================================================================================================");
		return planinfo.get();
	}

	@Override
	public RechargeInfo getCurrentPlan(String id) {
		Optional<UserInfo> userinfo = userrepo.findById(id);
		if(!userinfo.isPresent() || userinfo.get().getActiveplan()==null)
			return new RechargeInfo();
		System.out.println(userinfo.get().getActiveplan());
		System.out.println("============================================================================================================");
		return userinfo.get().getActiveplan();
	}

	@Override
	public Map<String, String> getCurrentBalance(String id) {
		Optional<UserInfo> userinfo = userrepo.findById(id);
		if(!userinfo.isPresent() || userinfo.get().getActiveplan()==null)
			return new HashMap<>();
		Map<String,String> balances = new HashMap<>();
		balances.put("Data",Double.toString(userinfo.get().getDataremaining()));
		balances.put("Validity", userinfo.get().getActiveplan().getDateOfExpiry());
		return balances;
	}

	@Override
	public String rechargeUserById(String userid, String planid) {
		Optional<UserInfo> userinfo = userrepo.findById(userid);
		Optional<BroadbandPlans> planinfo  = broadbandrepo.findById(planid);
//		if(!userinfo.isPresent())
//			return "No user found";
		
		if(!userinfo.isPresent())
			createNewBroadbandUser(userid);
		userinfo=userrepo.findById(userid);
		
		if(!planinfo.isPresent())
			return "No Such Plans Exist";
		UserInfo user = userinfo.get();
		
		String pattern = "dd/MM/yyyy";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
		Date todate = new Date();
		String today = simpleDateFormat.format(new Date());
		
		Date currentPlanExpiry = null;
		
		String lastdate = getLastDate(today, planinfo.get().getValidity());

		
		System.out.println("today "+today);
		System.out.println("Validity "+planinfo.get().getValidity()+" days");
		
		
		RechargeInfo rinfo = new RechargeInfo();
		rinfo.setPlanId(planinfo.get().getId());
		rinfo.setBillNo(UUID.randomUUID().toString());
		rinfo.setReferenceId(UUID.randomUUID().toString());
		rinfo.setPaymentMode("debit_card");
		if(user.getActiveplan()!=null) {

			try {
				currentPlanExpiry = simpleDateFormat.parse(user.getActiveplan().getDateOfExpiry());
				
			} catch (ParseException e1) {
				
				e1.printStackTrace();
			}
			if(todate.compareTo(currentPlanExpiry)>0) {
				// recharge when active plan is expired 
				rinfo.setDateOfRecharge(today);
				rinfo.setDateOfExpiry(lastdate);
				user.setActiveplan(rinfo);
				user.setDataremaining(planinfo.get().getData());
				user.setActivePlanStatus(true);
				System.out.println("Expiry Date "+lastdate);
			}
			else {
				// for upgrading plan 
				rinfo.setDateOfRecharge(user.getActiveplan().getDateOfExpiry());
				rinfo.setDateOfExpiry(getLastDate(user.getActiveplan().getDateOfExpiry(),planinfo.get().getValidity()));
				System.out.println("Expiry Date "+lastdate);
				user.setUpgradePlanStatus(true);
			}
		}
		else {
			// normal recharge when no active plan
			rinfo.setDateOfRecharge(today);
			rinfo.setDateOfExpiry(lastdate);
			user.setActiveplan(rinfo);
			user.setDataremaining(planinfo.get().getData());
			user.setActivePlanStatus(true);
			System.out.println("Expiry Date "+lastdate);
		}
		
		List<RechargeInfo> history = user.getPlanshistory();
		history.add(rinfo);
		user.setPlanshistory(history);
		userrepo.save(user);
		System.out.println("Active Plan "+user.getActiveplan());
		System.out.println("============================================================================================================");
		//return "Recharge Successful\nActive Plan:\n"+user.getActiveplan().getPlanId()+"\nCurrent Recharge Details:\n"+rinfo.getReferenceId()+" "+rinfo.getPlanId();
		return "Recharge Successfull";
	}

	@Override
	public boolean validateAddress(@Valid Address address) {
		
		Address add= addressRepo.getAddressByPincode(address.getPincode());
		if(add!=null) {
			return true;
		}
		else {
			return false;
		}
	}

	private String getLastDate(String startDate, int validity) {
		String pattern = "dd/MM/yyyy";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
		Calendar cal = Calendar.getInstance();
		try {
			cal.setTime(simpleDateFormat.parse(startDate));
		} catch (ParseException e) {
			
			e.printStackTrace();
		}
		cal.add(Calendar.DAY_OF_MONTH, validity);
		
		return simpleDateFormat.format(cal.getTime());
	}

	@Override
	public List<BroadbandPlans> getUpgradePlans(String id) {
		UserInfo user=  getUserById(id);
	
		try {
		BroadbandPlans plan= getBroadbandPlanById(user.getActiveplan().getPlanId());
		List<BroadbandPlans> b= broadbandrepo.upgradePlans(plan.getPrice());
		if(b.isEmpty()) {
			System.out.println("The active plan is highest plan no plans to upgrade");
			System.out.println("============================================================================================================");
			return b;
		}else {
			System.out.println("============================================================================================================");
			return b;	
		}
		
	}
		catch(NullPointerException e)
		{
			System.out.println("Check user details..can't get upgrade plans");
			System.out.println("============================================================================================================");
			return Collections.emptyList();
		}
	}
	@Override
	public List<DataUsageDetails> getDataUsageOfUser(String userId) {
	try {
		DataUsage d=  dataUsageRepo.getDataUsageByUserId(userId);
		return d.getDataUsage();
	}catch(NullPointerException e) {
		System.out.println("User data usage not found...check user details");
		System.out.println("============================================================================================================");
		return Collections.emptyList();
	}
	}

	
	

}
