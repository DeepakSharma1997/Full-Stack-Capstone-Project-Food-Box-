import { LogService } from './../../service/log.service';
import { Cart } from './../../model/cart';
import { CartService } from './../../service/cart.service';
import { Product } from './../../model/product';
import { Component, OnInit, ɵCompiler_compileModuleAndAllComponentsAsync__POST_R3__ } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  searchKey:string;
  cart:Cart=new Cart();
  login:number=0;
  products:Product[];
  setAutoHide: boolean = true;
  autoHide: number = 2000;
  constructor(private productService:ProductService,
    private cartService: CartService,
    private logService:LogService,
    public snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.logService.sendHeader(1);
    this.getProducts();
    this.productService.login.subscribe(res=>{
      this.login=res;
      console.log(this.login);
    })
  }

  public getProducts(){
    this.productService.getProductList().subscribe(data=>{
      this.products=data;
    })
  }

  addToCart(product:any) {
    this.cart.product=product;
    this.cartService.addToCart(this.cart).subscribe(data=>{
      console.log(data);
    });
    let config = new MatSnackBarConfig();
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open('Product added to cart, View cart to Checkout',true ? 'Ok' : undefined, config);
  }

  Search(){
    if(this.searchKey==""){
      this.ngOnInit();
    }else{
      this.productService.getProductSearch(this.searchKey).subscribe(data=>{
        this.products=data;
      })
    }
  }
  categoryChinese(){
    this.productService.getChinese().subscribe(data=>{
      this.products=data;
    })
  }
  categoryIndian(){
    this.productService.getIndian().subscribe(data=>{
      this.products=data;
    })
  }
  categoryMexican(){
    this.productService.getMexican().subscribe(data=>{
      this.products=data;
    })
  }
  categoryItalian(){
    this.productService.getItalian().subscribe(data=>{
      this.products=data;
    })
  }
  showToLogin(){
    alert("Please login or Register to continue shopping")
  }
}
