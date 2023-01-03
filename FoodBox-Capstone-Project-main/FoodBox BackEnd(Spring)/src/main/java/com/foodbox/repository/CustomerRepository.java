package com.foodbox.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.foodbox.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, String> {
	Customer findByEmail(String email);
	
	@Query("SELECT c FROM Customer c WHERE c.email LIKE %?1%"
			+" OR c.name LIKE %?1%"
			+" OR c.contact LIKE %?1%"
			+" OR c.address LIKE %?1%")
	public List<Customer> searchCustomer(String keyword);
}
