import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem){
      //check if we already have the item in our card
  let alreadyExistsInCart: boolean = false;
  let exixtingCartItem: CartItem = undefined;

  if(this.cartItems.length>0){
    //find the item in cart based on item id
    for(let tempCartItem of this.cartItems){
      if(tempCartItem.id === theCartItem.id){
        exixtingCartItem = tempCartItem;
        break;
      }
    }

    //check if we found it
    alreadyExistsInCart = (exixtingCartItem != undefined);
  }

  if(alreadyExistsInCart){
    //increment the quantity
    exixtingCartItem.quentity++;
  }else{
    //just add the item to the array
    this.cartItems.push(theCartItem);
  }

  //compute cart total price and total quantity
  this.computeCartTotals();
  
  }
  computeCartTotals() {
    
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quentity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quentity;
    }

    //publish the new values ... all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    //log cart data just for debugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue);
  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log("Contents of cart");
    for(let tempCartItem of this.cartItems){
      const subTotalPrice = tempCartItem.quentity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quentity}, unitPrice=${tempCartItem.unitPrice}, subTotal=${subTotalPrice}`);
    }
    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log(`--------`);
  }


}