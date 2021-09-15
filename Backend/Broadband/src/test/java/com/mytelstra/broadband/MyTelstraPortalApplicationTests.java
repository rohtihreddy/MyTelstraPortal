package com.mytelstra.broadband;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


import com.mytelstra.broadband.controller.BroadbandController;
import com.mytelstra.broadband.entity.BroadbandPlans;
import com.mytelstra.broadband.entity.RechargeInfo;
import com.mytelstra.broadband.entity.UserInfo;
import com.mytelstra.broadband.service.BroadbandServices;

@SpringBootTest
class MyTelstraPortalApplicationTests {
	
	@Autowired
	private BroadbandServices broadbandServices;
	
	@Autowired
	private BroadbandController controller;
	
	@Test
	@Order(1)
	void viewPlansGet() {
			
			List<BroadbandPlans> list = broadbandServices.viewPlans();
			assertThat(list).size().isPositive();
		}
	@Test
	@Order(2)
	void testPlan() {
		BroadbandPlans b= broadbandServices.getBroadbandPlanById("TELBROAD20210007");
		assertEquals(199,b.getPrice());
		assertEquals("TELSTRA 199", b.getPlan());
	}
	
	@Test
	@Order(3)
	void testCurrentPlan() {
		UserInfo user = broadbandServices.getUserById("10003");
		RechargeInfo plan= broadbandServices.getCurrentPlan("10003");
		assertEquals("TELBROAD20210005", plan.getPlanId());
		assertEquals("23/06/2021", plan.getDateOfRecharge());
		assertEquals("20/09/2021", plan.getDateOfExpiry());
	}
	
	@Test
	@Order(4)
	void testRechargeHistory() {
		RechargeInfo info = broadbandServices.userRechargeHistory("10003").get(0);
		assertEquals("debit_card", info.getPaymentMode());
		assertEquals("TELBROAD20210005",info.getPlanId() );
		assertEquals("23/06/2021", info.getDateOfRecharge());
		assertNotEquals("21/09/2021", info.getDateOfExpiry());
		
	}
	@Test
	@Order(5)
	void testCurrentBill() {
		Map<String,String> bill= controller.getCurrentBillDetails("10008");
		assertEquals("TELSTRA 849", bill.get("plan_name"));
		assertEquals("849", bill.get("due_amount"));
		assertEquals("24/10/2021", bill.get("due_date"));
	}
	
	@Test
	@Order(6)
	void testUpgradePlans() {
		List<BroadbandPlans> list = broadbandServices.getUpgradePlans("10008");
		assertEquals(3,(list).size());
		assertEquals(999, list.get(0).getPrice());
		assertEquals(1799, list.get(1).getPrice());
		assertEquals(1999, list.get(2).getPrice());
	}
	
	
	}


