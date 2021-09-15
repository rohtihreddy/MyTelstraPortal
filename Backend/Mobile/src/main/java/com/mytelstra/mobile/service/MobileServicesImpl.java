package com.mytelstra.mobile.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.mongodb.client.MongoClient;
import com.mytelstra.mobile.entity.ActivePlan;
import com.mytelstra.mobile.entity.Balance;
import com.mytelstra.mobile.entity.MobilePlans;
import com.mytelstra.mobile.entity.RechargeInfo;
import com.mytelstra.mobile.entity.UsageInfo;
import com.mytelstra.mobile.entity.UserInfo;
import com.mytelstra.mobile.repository.MobileRepository;
import com.mytelstra.mobile.repository.UserRepository;

import ch.qos.logback.core.net.SyslogOutputStream;


@Service
public class MobileServicesImpl implements MobileServices{
	
	@Autowired
	private MobileRepository mobilerepo;
	
	@Autowired
	private UserRepository userrepo;
	
	@Autowired
	private MongoClient client;

	@Override
	public boolean createNewUser(String userid) {
		
		Optional<UserInfo> userinfo = userrepo.findById(userid);
		if(userinfo.isPresent())
			return false;
		
		UserInfo user = new UserInfo();
		user.setId(userid);
		user.setUsername(userid);
		user.setMobilenumber(userid);
		user.setPlanshistory(new ArrayList<>());
		user.setActiveplan(new ArrayList<>());
		user.setBalance(new Balance(0.0,0,0));
		user.setUsage(new ArrayList<>());
		userrepo.insert(user);
		
		return true;
	}
	
	@Override
	public List<MobilePlans> viewBasePlans() {
		
		List<MobilePlans> mobileplans = mobilerepo.findBasePlans();
		return mobileplans;
	}
	
	@Override
	public List<MobilePlans> viewAddonPlans() {
		List<MobilePlans> mobileplans = mobilerepo.findAddonPlans();
		return mobileplans;
	}
	
	@Override
	public List<MobilePlans> viewPlans(String userid) {
		Optional<UserInfo> userinfo = userrepo.findById(userid);
		if(userinfo.isPresent() && userinfo.get().isBasePackActive()) {
			return viewAddonPlans();
		}
		
		return viewBasePlans();
	}	
	
	@Override
	public List<MobilePlans> viewAllPlans() {
		return mobilerepo.findAll();
	}	

	@Override
	public List<UserInfo> userinfo() {
		
		List<UserInfo> userinfo = userrepo.findAll();		
		return userinfo;
	}

	@Override
	public List<RechargeInfo> userRechargeHistory(String userid) {
		Optional<UserInfo> userinfo = userrepo.findById(userid);
		if(!userinfo.isPresent())
			return new ArrayList<>();
		
		return userinfo.get().getPlanshistory();
	}


	@Override
	public UserInfo getUserById(String userid) {
		Optional<UserInfo> userinfo = userrepo.findById(userid);
		if(!userinfo.isPresent())
			return new UserInfo();
		
		return userinfo.get();
	}

	@Override
	public MobilePlans getBaseMobilePlanById(String planid) {
		Optional<MobilePlans> planinfo = mobilerepo.findBasePlanById(planid);
		if(!planinfo.isPresent())
			return new MobilePlans();
		
		return planinfo.get();
	}
	
	@Override
	public MobilePlans getAddonMobilePlanById(String planid) {
		Optional<MobilePlans> planinfo = mobilerepo.findAddonPlanById(planid);
		if(!planinfo.isPresent())
			return new MobilePlans();
		
		return planinfo.get();
	}

	@Override
	public List<ActivePlan> getCurrentPlan(String userid) {
		Optional<UserInfo> userinfo = userrepo.findById(userid);
		if(!userinfo.isPresent() || userinfo.get().getActiveplan()==null)
			return new ArrayList<>();
		
		return userinfo.get().getActiveplan();
	}

	@Override
	public Balance getCurrentBalance(String userid) {
				
		Optional<UserInfo> userinfo = userrepo.findById(userid);
		if(!userinfo.isPresent())
			return new Balance();
		
		return userinfo.get().getBalance();
	}

	@Override
	public String rechargeUserById(String userid, String planid) {
		Optional<UserInfo> userinfo = userrepo.findById(userid);
		Optional<MobilePlans> planinfo  = mobilerepo.findById(planid);
		
		if(!userinfo.isPresent()) {
			createNewUser(userid);
			userinfo = userrepo.findById(userid);
		}
		
		if(planinfo.isPresent()) {
			if(planinfo.get().getPlantype().equals("base") && userinfo.get().isBasePackActive()) {
				return "You already have a base plan";
			}
			else if(planinfo.get().getPlantype().equals("add-on") && !userinfo.get().isBasePackActive()){
				return "You do not have a base pack";
			}
		}
		
		else {
			return "No Such Plans Exist";
		}
		
		
		UserInfo user = userinfo.get();
		
		String pattern = "dd/MM/yyyy";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
		String today = simpleDateFormat.format(new Date());
		String lastDate;
			
		if(!userinfo.get().isBasePackActive()) {
			System.out.println(userinfo.get().isBasePackActive());
			System.out.println("Entered Wrong");
			Calendar cal = Calendar.getInstance();
			try {
				cal.setTime(simpleDateFormat.parse(today));
			} catch (ParseException e) {
				e.printStackTrace();
			}
			
			cal.add(Calendar.DAY_OF_MONTH, planinfo.get().getDuration());
			lastDate = simpleDateFormat.format(cal.getTime());
		}
		
		else {
			lastDate = userinfo.get().getActiveplan().get(0).getDateOfExpiry();
		}
		
		System.out.println(today);
		System.out.println(planinfo.get().getDuration());
		
		
		RechargeInfo rinfo = new RechargeInfo();
		rinfo.setPlanID(planinfo.get().getId());
		rinfo.setDateOfRecharge(today);
		rinfo.setDateOfExpiry(lastDate);
		System.out.println(lastDate);
		rinfo.setPaymentMode("online");
		rinfo.setTransactionId(UUID.randomUUID().toString());
		
		List<RechargeInfo> history = user.getPlanshistory();
		history.add(rinfo);
		user.setPlanshistory(history);
		
		List<ActivePlan> activeplans = user.getActiveplan();
		ActivePlan newplan = new ActivePlan();
		newplan.setPlanInfo(planinfo.get());
		newplan.setDateOfRecharge(today);
		newplan.setDateOfExpiry(lastDate);
		activeplans.add(newplan);
		user.setActiveplan(activeplans);
		
		
		Balance balance = new Balance();
				
		balance.setData((double) user.getBalance().getData()+planinfo.get().getData());
		balance.setVoice(user.getBalance().getVoice()+planinfo.get().getVoice());
		balance.setSms(user.getBalance().getSms()+planinfo.get().getSms());
		
		user.setBalance(balance);
		
		user.setBasePackActive(true);
		
		userrepo.save(user);
		System.out.println(user);
		
		return "Recharge Successful";
	}

	@Override
	public List<UsageInfo> getUsageInfoById(String userid) {
		Optional<UserInfo> userinfo = userrepo.findById(userid);
		if(!userinfo.isPresent())
			return new ArrayList<>();
		return userinfo.get().getUsage();
	}

	@Override
	public String addusage(Map<String,String> usage,String userid) {
		
		Optional<UserInfo> userinfo = userrepo.findById(userid);
		if(!userinfo.isPresent())
			return "Failed - No user found";
		
		UsageInfo newusage = new UsageInfo();
		newusage.setType(usage.get("type").toLowerCase());
		
		if(usage.get("type").equalsIgnoreCase("data")) {
			if((userinfo.get().getBalance().getData()*1024 - Double.parseDouble(usage.get("quantity")))<0) {
				return "Failed - You have Exhausted your data";
			}
			userinfo.get().getBalance().setData((userinfo.get().getBalance().getData()*1024 - Double.parseDouble(usage.get("quantity")))/1024);
			newusage.setQuantity(usage.get("quantity")+" MB");
		}
		
		else if(usage.get("type").equalsIgnoreCase("voice")) {
			if((userinfo.get().getBalance().getVoice() - Integer.parseInt(usage.get("quantity")))<0) {
				return "Failed - You have Exhausted your Voice Minutes";
			}
			userinfo.get().getBalance().setVoice(userinfo.get().getBalance().getVoice() - Integer.parseInt(usage.get("quantity")));
			newusage.setQuantity(usage.get("quantity")+" Min");
		}
		
		else if(usage.get("type").equalsIgnoreCase("sms")) {
			if((userinfo.get().getBalance().getSms() - Integer.parseInt(usage.get("quantity")))<0) {
				return "Failed - You have Exhausted your SMS";
			}
			userinfo.get().getBalance().setSms(userinfo.get().getBalance().getSms() - Integer.parseInt(usage.get("quantity")));
			newusage.setQuantity(usage.get("quantity"));
		}
		
		else {
			return "Failed - Invalid Usage Type";
		}
		
		String pattern = "dd/MM/yyyy HH:mm:ss";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
		String today = simpleDateFormat.format((new Date()).getTime());
		
		newusage.setDate(today.split(" ")[0]);
		newusage.setTime(today.split(" ")[1]);
		
		
		System.out.println(today);
		
		userinfo.get().getUsage().add(newusage);
		userrepo.save(userinfo.get());
		
		return "Usage Update - Success";
	}
}
