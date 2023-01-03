import { Router } from '@angular/router';
import { LogService } from './../../service/log.service';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { Purchase } from 'src/app/model/purchase';
import { PurchaseService } from 'src/app/service/purchase.service';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.css']
})
export class ManageCustomersComponent implements OnInit {
  searchKey:string;
  public allCustomers:Customer[];
  public activeOrders:Purchase[]=[];
  constructor(private customerService:CustomerService,
    private purchaseService:PurchaseService,
    private logService:LogService,
    private router:Router) { }

  ngOnInit(): void {
    this.logService.loggedAdminId$.subscribe((id)=>{
      console.log('id '+id);
      if(id==''){
        this.router.navigate(['/admin']);
      }
    })
    this.getCustomers();
  }

  getCustomers(){
    this.customerService.getCustomers().subscribe(data=>{
      this.allCustomers=data;
    })
  }

  adminLogout(){
    this.logService.sendId('');
    this.router.navigate(['/admin']);
  }

  searchCustomer(){
    if(this.searchKey==''){
      this.getCustomers();
    }else{
      this.customerService.searchCustomer(this.searchKey).subscribe(data=>{
        this.allCustomers=data;
      })
    }
  }

  getActiveOrders(email:string){
    this.purchaseService.getCustomerOrders(email).subscribe(data=>{
      this.activeOrders=data;
    })
  }

  deleteCustomer(email:string){
    this.customerService.deleteCustomer(email).subscribe(data=>{
      alert("Customer Deleted");
      this.getCustomers();
    },error=>{
      alert("Customer can't be deleted until their orders are deleted")
    }
    )
  }

}
