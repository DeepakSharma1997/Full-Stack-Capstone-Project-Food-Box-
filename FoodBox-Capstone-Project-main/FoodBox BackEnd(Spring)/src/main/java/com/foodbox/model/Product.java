package com.foodbox.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Product {
	@Id
	private long id;
	private String name;
	private String des;
	private String category;
	private float actualPrice;
	private float discount;
	private float price;
	private String avail;
	private String imagepath;
	

	public Product(long id, String name, String des, String category, float actualPrice, float discount, float price,
			String avail, String imagepath) {
		super();
		this.id = id;
		this.name = name;
		this.des = des;
		this.category = category;
		this.actualPrice = actualPrice;
		this.discount = discount;
		this.price = price;
		this.avail = avail;
		this.imagepath = imagepath;
	}
	public Product() {
		super();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDesc() {
		return des;
	}

	public void setDesc(String des) {
		this.des = des;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public float getActualPrice() {
		return actualPrice;
	}

	public void setActualPrice(float actualPrice) {
		this.actualPrice = actualPrice;
	}

	public float getDiscount() {
		return discount;
	}

	public void setDiscount(float discount) {
		this.discount = discount;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public String getAvail() {
		return avail;
	}

	public void setAvail(String avail) {
		this.avail = avail;
	}

	public String getImagepath() {
		return imagepath;
	}

	public void setImagepath(String imagepath) {
		this.imagepath = imagepath;
	}
	
	
}
