package com.foodbox.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.foodbox.model.Cart;
import com.foodbox.repository.CartRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class CartController {

	@Autowired
	private CartRepository cartRepository;
	
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/carts")
	public Cart addToCart(@RequestBody Cart cart, HttpSession session) {
		float grandTotal=0;
		if(session.getAttribute("grandTotal")==null) {
			grandTotal=0;
		}
		else {
			grandTotal=(float) session.getAttribute("grandTotal");
		}
		List<Cart> cartList = cartRepository.findAll();
		for(Cart temp:cartList) {
			if(temp.getProduct().getId()==cart.getProduct().getId()) {
				int tempQuantity = 1+temp.getQuantity();
				grandTotal=grandTotal+temp.getPrice();
				session.setAttribute("grandTotal", grandTotal);
				temp.setQuantity(tempQuantity);
				temp.setPrice((temp.getProduct().getPrice()*tempQuantity));
				return cartRepository.save(temp);
			}
		}
		int min = 100;
		int max = 999;
		int b = (int) (Math.random() * (max - min + 1) + min);
		cart.setId(b);
		cart.setQuantity(1);
		cart.setPrice(cart.getProduct().getPrice());
		grandTotal=grandTotal+cart.getProduct().getPrice();
		session.setAttribute("grandTotal", grandTotal);
		return cartRepository.save(cart);
	}

	@GetMapping("/carts")
	public List<Cart> getCartItems() {
		return cartRepository.findAll();
	}
	
	@PutMapping("/carts/add/{id}")
	public ResponseEntity<Cart> addByOne(@PathVariable("id") long id,@RequestBody Cart cart){
		/*Cart cart = cartRepository.findById(id)
				.orElseThrow(()->new ResourceNotFoundException("Product not found with"+id));*/
		int quantity= cart.getQuantity()+1;
		cart.setQuantity(quantity);
		cart.setPrice((cart.getProduct().getPrice())*quantity);
		Cart updatedCart = cartRepository.save(cart);
		return ResponseEntity.ok(updatedCart);
	}
	
	@PutMapping("/carts/minus/{id}")
	public ResponseEntity<Cart> lessByOne(@PathVariable("id") long id,@RequestBody Cart cart){
		/*
		 * Cart cart = cartRepository.findById(id) .orElseThrow(()->new
		 * ResourceNotFoundException("Product not found with"+id));
		 */
		int quantity= cart.getQuantity()-1;
		if(quantity!=0) {
			cart.setQuantity(quantity);
			cart.setPrice((cart.getProduct().getPrice())*quantity);
			Cart updatedCart = cartRepository.save(cart);
			return ResponseEntity.ok(updatedCart);
		}else {
			cartRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.OK);
		}
	}
	
	@DeleteMapping("/carts/{id}")
	public ResponseEntity<?> deleteCart(@PathVariable("id") Long id)
	{
		cartRepository.deleteById(id); 
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@DeleteMapping("/carts")
	public void deleteAllCart(){
		cartRepository.deleteAll();
	}
}
