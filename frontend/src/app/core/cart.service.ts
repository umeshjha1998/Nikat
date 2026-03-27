import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take, forkJoin, Observable, of } from 'rxjs';
import { ApiService, OrderDto, OrderItemDto } from './api.service';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  image: string;
  shopId: string;
  shopName: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  items$ = this.cartItems.asObservable();

  constructor(private apiService: ApiService) {
    this.loadCart();
  }

  shippingInfo: any = null;

  setShippingInfo(info: any) {
    this.shippingInfo = info;
  }

  private loadCart(): CartItem[] {
    const saved = localStorage.getItem('nikat_cart');
    if (saved) {
      try {
        const items = JSON.parse(saved);
        this.cartItems.next(items);
        return items;
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
    return [];
  }

  private saveCart(items: CartItem[]) {
    localStorage.setItem('nikat_cart', JSON.stringify(items));
    this.cartItems.next(items);
  }

  get items(): CartItem[] {
    return this.cartItems.value;
  }

  addToCart(product: any, shopId: string, shopName: string) {
    const items = [...this.items];
    const existing = items.find(i => i.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      items.push({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price.toString().replace('₹', '')),
        qty: 1,
        image: product.image,
        shopId: shopId,
        shopName: shopName
      });
    }
    this.saveCart(items);
  }

  removeFromCart(index: number) {
    const items = [...this.items];
    items.splice(index, 1);
    this.saveCart(items);
  }

  updateQty(index: number, qty: number) {
    if (qty < 1) return;
    const items = [...this.items];
    items[index].qty = qty;
    this.saveCart(items);
  }

  clearCart() {
    this.saveCart([]);
  }

  checkout(paymentMethod: string, shippingAddress: string, contactPhone: string): Observable<any> {
    const items = this.cartItems.getValue();
    if (items.length === 0) return of(null);

    // Group items by shopId
    const shopGroups = items.reduce((acc: any, item) => {
      if (!acc[item.shopId]) acc[item.shopId] = [];
      acc[item.shopId].push(item);
      return acc;
    }, {});

    const requests = Object.keys(shopGroups).map(shopId => {
      const shopItems = shopGroups[shopId];
      const subtotal = shopItems.reduce((s: number, i: CartItem) => s + i.price * i.qty, 0);
      const tax = Math.round(subtotal * 0.05);
      
      const order: OrderDto = {
        shopId: shopId,
        totalAmount: subtotal + tax,
        paymentMethod: paymentMethod,
        shippingAddress: shippingAddress,
        contactPhone: contactPhone,
        items: shopItems.map((i: CartItem) => ({
          productId: i.id,
          quantity: i.qty,
          unitPrice: i.price,
          totalPrice: i.price * i.qty
        }))
      };

      return this.apiService.createOrder(order);
    });

    return forkJoin(requests).pipe(
      map(results => {
        this.clearCart();
        return results;
      })
    );
  }

  get count(): number {
    return this.items.reduce((acc, item) => acc + item.qty, 0);
  }
}
