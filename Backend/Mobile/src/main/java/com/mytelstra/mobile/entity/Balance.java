package com.mytelstra.mobile.entity;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Balance {
	private double data;
	private int voice;
	private int sms;
	public Balance() {
		super();
	}
	public Balance(double data, int voice, int sms) {
		super();
		this.data = data;
		this.voice = voice;
		this.sms = sms;
	}
	public double getData() {
		return data;
	}
	public void setData(double data) {
		this.data = data;
	}
	public int getVoice() {
		return voice;
	}
	public void setVoice(int voice) {
		this.voice = voice;
	}
	public int getSms() {
		return sms;
	}
	public void setSms(int sms) {
		this.sms = sms;
	}
	@Override
	public String toString() {
		return "Balance [data=" + data + ", voice=" + voice + ", sms=" + sms + "]";
	}
}
