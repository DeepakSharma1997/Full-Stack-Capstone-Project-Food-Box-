import { LogService } from './../../service/log.service';
import { CartService } from './../../service/cart.service';
import { Cart } from './../../model/cart';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  customer:Customer=new Customer();
  cust_email:string;
  cartItems:Cart[];
  total:number;
  grandTotal:number;
  todayDate:any;
  transId:string;
  constructor(private customerService:CustomerService,
              private cartService:CartService,
              private logService:LogService,
              private router:Router) { }

  ngOnInit(): void {
    this.cust_email=sessionStorage.getItem('cust_email');
    this.customerService.getCustomer(this.cust_email).subscribe(data=>{
      this.customer=data
    })
    this.cartService.getCartItemList().subscribe(data=>{
      this.cartItems=data
    })
    this.cartService.deleteAllCart().subscribe(data=>{
      console.log('');
    })
    this.total=Number(sessionStorage.getItem('grandTotal'));
    this.grandTotal=this.total+60;
    this.todayDate=formatDate(new Date(),'dd MMM, yyyy','en');
    this.transId=sessionStorage.getItem('transId')
  }
  
  printOrder(){
	  window.print();
  }

}
