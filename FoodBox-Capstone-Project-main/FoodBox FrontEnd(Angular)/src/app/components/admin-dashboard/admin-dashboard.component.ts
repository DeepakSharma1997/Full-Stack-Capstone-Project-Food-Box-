import { Router } from '@angular/router';
import { LogService } from './../../service/log.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product';
import {Sort} from '@angular/material/sort';
import { FormBuilder,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  public allProducts:Product[];
  public sortedProd:Product[];
  formValue!:FormGroup;
  productModelObj:Product=new Product();
  showAdd !: boolean;
  showUpdate !: boolean;
  message:string='';
  constructor(private logService:LogService, 
    private router:Router, 
    private productService:ProductService,
    private formBuilder:FormBuilder) {
      this.allProducts=[];
      this.sortedProd=this.allProducts.slice();
     }

  ngOnInit(): void {
    this.getProducts();
    this.logService.sendHeader(0);
    this.logService.loggedAdminId$.subscribe((id)=>{
      console.log('id '+id);
      if(id==''){
        this.router.navigate(['/admin']);
      }
    })
    this.formValue=this.formBuilder.group({
      name:[''],
      desc:[''],
      category:[''],
      actualPrice:[''],
      discount:[''],
      avail:[''],
      imagepath:['']
    })
  }

  getProducts(){
    this.productService.getFullProductList().subscribe(data=>{
      this.allProducts=data;
      this.sortedProd=this.allProducts
    })
  }

  sortData(sort:Sort){
    const data=this.allProducts.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedProd = data;
      return;
    }
    this.sortedProd=data.sort((a,b)=>{
      const isAsc = sort.direction === 'asc';
      switch(sort.active){
        case 'name':return this.compare(a.name,b.name,isAsc);
        case 'category':return this.compare(a.category,b.category,isAsc);
        case 'actualPrice': return this.compare(a.actualPrice,b.actualPrice,isAsc);
        case 'discount':return this.compare(a.discount,b.discount,isAsc);
        case 'price': return this.compare(a.price,b.price,isAsc);
        case 'avail': return this.compare(a.avail,b.avail,isAsc);
      }
    })
  }
  compare(a:number|string,b:number|string,isAsc:boolean){
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  clickAddProduct(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  
  addProduct(){
    if(this.formValue.value.name==null||this.formValue.value.desc==null
      ||this.formValue.value.category==null||this.formValue.value.avail==null
      ||this.formValue.value.imagepath==null||this.formValue.value.actualPrice==null){
      this.message="Fields must not be empty";
      return;
    }
    this.productModelObj.name=this.formValue.value.name;
    this.productModelObj.desc=this.formValue.value.desc;
    this.productModelObj.category=this.formValue.value.category;
    this.productModelObj.actualPrice=this.formValue.value.actualPrice;
    this.productModelObj.discount=this.formValue.value.discount;
    this.productModelObj.avail=this.formValue.value.avail;
    this.productModelObj.imagepath=this.formValue.value.imagepath;
    this.productService.addProduct(this.productModelObj)
    .subscribe(res=>{
      alert("Product Added Sucessfully");
      let ref=document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getProducts()
    },
    err=>{
      alert("Something went wrong")
    })
  }

  onEdit(prod:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.productModelObj.id=prod.id;
    this.formValue.controls['name'].setValue(prod.name);
    this.formValue.controls['desc'].setValue(prod.desc);
    this.formValue.controls['category'].setValue(prod.category);
    this.formValue.controls['actualPrice'].setValue(prod.actualPrice);
    this.formValue.controls['discount'].setValue(prod.discount);
    this.formValue.controls['avail'].setValue(prod.avail);
    this.formValue.controls['imagepath'].setValue(prod.imagepath);
  }

  updateProduct(){
    if(this.formValue.value.name==''||this.formValue.value.desc==''
      ||this.formValue.value.category==''||this.formValue.value.avail==''
      ||this.formValue.value.imagepath==''||this.formValue.value.actualPrice==''){
      this.message="Fields must not be empty";
      return;
    }
    this.productModelObj.name=this.formValue.value.name;
    this.productModelObj.desc=this.formValue.value.desc;
    this.productModelObj.category=this.formValue.value.category;
    this.productModelObj.actualPrice=this.formValue.value.actualPrice;
    this.productModelObj.discount=this.formValue.value.discount;
    this.productModelObj.avail=this.formValue.value.avail;
    this.productModelObj.imagepath=this.formValue.value.imagepath;

    this.productService.updateProduct(this.productModelObj.id,this.productModelObj).subscribe(res=>{
      alert("Updated Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getProducts();
    })
  }

  deleteProduct(prod:any){
    this.productService.deleteProduct(prod.id).subscribe(res=>{
      alert('Product Deleted');
      this.getProducts();
    })
  }

  adminLogout(){
    this.logService.sendId('');
    this.router.navigate(['/admin']);
  }
}
