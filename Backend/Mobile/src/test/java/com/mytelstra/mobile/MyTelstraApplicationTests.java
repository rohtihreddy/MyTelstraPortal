package com.mytelstra.mobile;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Before;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.mytelstra.mobile.entity.RechargeInfo;
import com.mytelstra.mobile.entity.UserInfo;
import com.mytelstra.mobile.controller.MobileController;
import com.mytelstra.mobile.entity.ActivePlan;
import com.mytelstra.mobile.entity.Balance;
import com.mytelstra.mobile.entity.MobilePlans;
import com.mytelstra.mobile.repository.MobileRepository;
import com.mytelstra.mobile.repository.UserRepository;

@SpringBootTest
class MyTelstraApplicationTests {

	@Autowired
	MobileRepository mobilerepo;
	
	@Autowired
	UserRepository userrepo;
	
	@Autowired 
	MobileController mobcontroller;
	
	private MockMvc mockmvc;
	
	@InjectMocks
	private MobileController mobilecontroller;
	
	@BeforeEach
	public void setUp() throws Exception{
		mockmvc = MockMvcBuilders.standaloneSetup(mobilecontroller)
				.build();
	}
	
	@Test
	void testsl() throws Exception{
		mockmvc.perform(MockMvcRequestBuilders.get("/"))
		.andExpect(MockMvcResultMatchers.status().isOk())
		.andExpect(MockMvcResultMatchers.content().string("Mobile Services Here"));
	}
	

	@Test
	void testhome() throws Exception {
		assertEquals("Mobile Services Here",mobcontroller.home());
	}
	
	@Test
	void testViewPlans() throws Exception {
		
		List<MobilePlans> plans = mobcontroller.viewPlans();
		assertThat(plans).size().isPositive();
	}
	
	@Test
	void testUsers() throws Exception {
		
		List<UserInfo> users = mobcontroller.users();
		assertThat(users).size().isPositive();
	}
	
	@Test
	void testActivePlan() throws Exception{
		List<ActivePlan> activeplan = mobcontroller.getCurrentPlanById("100007");
		assertThat(activeplan).hasSize(0);
	}
	
	@Test
	void testUserDetais() throws Exception{
		UserInfo user = mobcontroller.getUserDetailsByID("10001");
		assertEquals(null,user.getId());
		assertEquals(null,user.getBalance());
		assertEquals(null,user.getUsername());
		assertEquals(null,user.getUsage());
	}
	
	@Test
	void testRechargeHistory() throws Exception{
		List<RechargeInfo> rechargeHistory = mobcontroller.userRechargeHistoryById("10008");
		assertThat(rechargeHistory).size().isEqualTo(0);
	}
	
	@Test
	void testCurrentBalance() throws Exception{
		Balance balance = mobcontroller.getBalanceById("10001");
		assertEquals(0.0,balance.getData());
		assertEquals(0,balance.getVoice());
		assertEquals(0,balance.getSms());
	}
	
	@Test
	void testRecharge() throws Exception{
		Map<String,String> details  =new HashMap<>();
		details.put("userid","10010");
		details.put("planid","TELMOB20210005");
		String recharge = mobcontroller.rechargeUserBase(details);
		assertEquals("No Such Plans Exist", recharge);
	}
}
