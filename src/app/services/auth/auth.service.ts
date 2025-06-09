import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MainService } from '.././main/main.service';
import { LoginDTO } from '../../models/dtos/login.dto';

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    isVerified: boolean;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService extends MainService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<any>(this.getCurrentUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  Login(model: LoginDTO): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.baseRoute + 'auth/login', model)
      .pipe(
        tap(response => {
          this.setSession(response);
        })
      );
  }

  Logout(): void {
    localStorage.removeItem('Token');
    localStorage.removeItem('User');
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
  }

  private setSession(authResult: LoginResponse): void {
    localStorage.setItem('Token', authResult.token);
    localStorage.setItem('User', JSON.stringify(authResult.user));
    this.isAuthenticatedSubject.next(true);
    this.currentUserSubject.next(authResult.user);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('Token');
  }

  private getCurrentUser(): any {
    const user = localStorage.getItem('User');
    return user ? JSON.parse(user) : null;
  }

  IsLoggedIn(): boolean {
    return this.hasToken();
  }
}
