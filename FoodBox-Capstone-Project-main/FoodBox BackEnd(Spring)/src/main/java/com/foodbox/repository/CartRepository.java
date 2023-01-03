package com.foodbox.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.foodbox.model.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {

}
