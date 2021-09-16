package com.mytelstra.broadband.entity;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="BroadbandUserInfo")
public class UserInfo {
	private String id;
	private List<RechargeInfo> planshistory;
	private RechargeInfo activeplan;
	private double dataremaining;
	boolean activePlanStatus;
	private boolean upgradePlanStatus;
	
	public UserInfo() {
		super();
		
	}
	
	public UserInfo(String id, List<RechargeInfo> planshistory, RechargeInfo activeplan,
			double dataremaining, String broadbandId, boolean activePlanStatus, boolean upgradePlanStatus) {
		super();
		this.id = id;
		this.planshistory = planshistory;
		this.activeplan = activeplan;
		this.dataremaining = dataremaining;		
		this.activePlanStatus = activePlanStatus;
		this.upgradePlanStatus = upgradePlanStatus;
	}

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	
	public List<RechargeInfo> getPlanshistory() {
		return planshistory;
	}
	public void setPlanshistory(List<RechargeInfo> planshistory) {
		this.planshistory = planshistory;
	}
	public RechargeInfo getActiveplan() {
		return activeplan;
	}
	public void setActiveplan(RechargeInfo activeplan) {
		this.activeplan = activeplan;
	}
	public double getDataremaining() {
		return dataremaining;
	}
	public void setDataremaining(int dataremaining) {
		this.dataremaining = dataremaining;
	}
	
	
	
	public boolean isActivePlanStatus() {
		return activePlanStatus;
	}

	public void setActivePlanStatus(boolean activePlanStatus) {
		this.activePlanStatus = activePlanStatus;
	}

	public boolean isUpgradePlanStatus() {
		return upgradePlanStatus;
	}

	public void setUpgradePlanStatus(boolean upgradePlanStatus) {
		this.upgradePlanStatus = upgradePlanStatus;
	}

	@Override
	public String toString() {
		return "UserInfo [id=" + id +  ", planshistory=" + planshistory + ", activeplan="
				+ activeplan + ", dataremaining=" + dataremaining 
				+ ", activePlanStatus=" + activePlanStatus + ", upgradePlanStatus=" + upgradePlanStatus + "]";
	}

	
}
