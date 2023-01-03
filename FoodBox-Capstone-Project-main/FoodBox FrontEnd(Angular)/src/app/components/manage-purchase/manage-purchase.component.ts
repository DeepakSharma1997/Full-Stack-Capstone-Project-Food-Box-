import { LogService } from './../../service/log.service';
import { Component, OnInit } from '@angular/core';
import { Purchase } from 'src/app/model/purchase';
import { PurchaseService } from 'src/app/service/purchase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-purchase',
  templateUrl: './manage-purchase.component.html',
  styleUrls: ['./manage-purchase.component.css']
})
export class ManagePurchaseComponent implements OnInit {
  public allPurchase:Purchase[];
  keyword:any;
  constructor(private purchaseService:PurchaseService,
              private logService:LogService,
              private router:Router) { }

  ngOnInit(): void {
    this.logService.loggedAdminId$.subscribe((id)=>{
      console.log('id '+id);
      if(id==''){
        this.router.navigate(['/admin']);
      }
    })
    this.getAllPurchase();
  }

  getAllPurchase(){
    this.purchaseService.getAllPurchase().subscribe(data=>{
      this.allPurchase=data;
    })
  }
  
  adminLogout(){
    this.logService.sendId('');
    this.router.navigate(['/admin']);
  }

  deletePurchase(id:any){
    this.purchaseService.deletePurchase(id).subscribe(data=>{
      alert("Purchase Deleted");
      this.getAllPurchase();
    })
  }

  searchPurchase(){
    if(this.keyword==''){
      this.getAllPurchase();
    }else{
      this.purchaseService.searchPurchase(this.keyword).subscribe(data=>{
        this.allPurchase=data;
      });
    }

  }
}
