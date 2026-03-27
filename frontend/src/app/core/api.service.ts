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
  workerNames: string;
  description: string;
  address: string;
  openingHours: string;
  openingTime: string;
  closingTime: string;
  status: string;
  isFeatured: boolean;
  photos: string[];
  ourStory: string;
  amenities: string;
  dailyHours: string;
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

export interface InquiryDto {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  shopId: string;
  message: string;
  reply: string;
  status: string;
  createdAt: string;
}

export interface AppointmentDto {
  id: string;
  userId: string;
  userName: string;
  shopId: string;
  shopName: string;
  appointmentTime: string;
  serviceType: string;
  status: string;
  notes: string;
  assignedWorker: string;
  createdAt: string;
}

export interface ProductDto {
  id: string;
  shopId: string;
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
  imageUrl: string;
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

  getShopsByOwner(ownerId: string): Observable<ShopDto[]> {
    return this.http.get<ShopDto[]>(`${this.apiUrl}/shops/owner/${ownerId}`);
  }

  createShop(shop: any): Observable<ShopDto> {
    return this.http.post<ShopDto>(`${this.apiUrl}/shops`, shop);
  }

  uploadShopPhoto(shopId: string, photoData: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/shops/${shopId}/photos`, photoData);
  }

  updateShop(shopId: string, shop: ShopDto): Observable<ShopDto> {
    return this.http.put<ShopDto>(`${this.apiUrl}/shops/${shopId}`, shop);
  }

  // Dashboard specifics
  getInquiriesByShop(shopId: string): Observable<InquiryDto[]> {
    return this.http.get<InquiryDto[]>(`${this.apiUrl}/inquiries/shop/${shopId}`);
  }

  replyInquiry(inquiryId: string, reply: string): Observable<InquiryDto> {
    return this.http.patch<InquiryDto>(`${this.apiUrl}/inquiries/${inquiryId}/reply`, reply);
  }

  deleteInquiry(inquiryId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/inquiries/${inquiryId}`);
  }

  getAppointmentsByShop(shopId: string): Observable<AppointmentDto[]> {
    return this.http.get<AppointmentDto[]>(`${this.apiUrl}/appointments/shop/${shopId}`);
  }

  updateAppointmentStatus(appointmentId: string, status: string, workerName?: string): Observable<AppointmentDto> {
    let url = `${this.apiUrl}/appointments/${appointmentId}/status?status=${status}`;
    if (workerName) {
      url += `&workerName=${encodeURIComponent(workerName)}`;
    }
    return this.http.patch<AppointmentDto>(url, {});
  }

  createAppointment(appointment: Partial<AppointmentDto>): Observable<AppointmentDto> {
    return this.http.post<AppointmentDto>(`${this.apiUrl}/appointments`, appointment);
  }

  // Related data
  getProductsByShop(shopId: string): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(`${this.apiUrl}/public/products/shop/${shopId}`);
  }

  createProduct(product: Partial<ProductDto>): Observable<ProductDto> {
    return this.http.post<ProductDto>(`${this.apiUrl}/products`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/products/${id}`);
  }

  updateProduct(id: string, product: Partial<ProductDto>): Observable<ProductDto> {
    return this.http.put<ProductDto>(`${this.apiUrl}/products/${id}`, product);
  }

  uploadFile(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/public/upload`, formData, { responseType: 'text' });
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
