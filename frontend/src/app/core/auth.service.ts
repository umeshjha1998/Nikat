import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from './environment';

export interface UserDto {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  role: string;
  isShopOwner: boolean;
  isServiceProvider: boolean;
  status: string;
}

export interface AuthResponse {
  token: string;
  user: UserDto;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  role: string;
}

export interface AuthRequest {
  emailOrPhone: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUser$ = new BehaviorSubject<UserDto | null>(null);

  constructor(private http: HttpClient) {
    const stored = localStorage.getItem('nikat_user');
    if (stored) {
      this.currentUser$.next(JSON.parse(stored));
    }
  }

  get user$(): Observable<UserDto | null> {
    return this.currentUser$.asObservable();
  }

  get currentUser(): UserDto | null {
    return this.currentUser$.getValue();
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('nikat_token');
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, data);
  }

  login(data: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, data).pipe(
      tap(res => {
        if (res.token) {
          localStorage.setItem('nikat_token', res.token);
        }
        localStorage.setItem('nikat_user', JSON.stringify(res.user));
        this.currentUser$.next(res.user);
      })
    );
  }

  /** Manually set a session (for hardcoded/mock logins like admin-login) */
  setSession(token: string, user: UserDto): void {
    localStorage.setItem('nikat_token', token);
    localStorage.setItem('nikat_user', JSON.stringify(user));
    this.currentUser$.next(user);
  }

  logout(): void {
    localStorage.removeItem('nikat_token');
    localStorage.removeItem('nikat_user');
    this.currentUser$.next(null);
  }
}
