import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environment';

export interface ShopDto {
  id: string;
  ownerId: string;
  ownerName: string;
  name: string;
  categoryName: string;
  categoryId: string;
  workerCount: number;
  description: string;
  address: string;
  openingHours: string;
  status: string;
  isFeatured: boolean;
}

export interface ServiceDto {
  id: string;
  providerId: string;
  providerName: string;
  name: string;
  categoryName: string;
  categoryId: string;
  description: string;
  serviceArea: string;
  startTime: string;
  endTime: string;
  baseCharge: number;
  status: string;
  isFeatured: boolean;
}

export interface CategoryDto {
  id: string;
  name: string;
  description: string;
  isServiceCategory: boolean;
  isShopCategory: boolean;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Shops
  getShops(): Observable<ShopDto[]> {
    return this.http.get<ShopDto[]>(`${this.apiUrl}/public/shops`);
  }

  getShopById(id: string): Observable<ShopDto> {
    return this.http.get<ShopDto>(`${this.apiUrl}/public/shops/${id}`);
  }

  // Services
  getServices(): Observable<ServiceDto[]> {
    return this.http.get<ServiceDto[]>(`${this.apiUrl}/public/services`);
  }

  getServiceById(id: string): Observable<ServiceDto> {
    return this.http.get<ServiceDto>(`${this.apiUrl}/public/services/${id}`);
  }

  // Categories
  getCategories(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(`${this.apiUrl}/public/categories`);
  }

  // Community
  getCommunityPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/public/community`);
  }

  // Reviews
  getReviews(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/public/reviews`);
  }
}
