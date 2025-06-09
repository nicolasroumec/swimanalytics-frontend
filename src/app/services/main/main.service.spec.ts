import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  protected readonly baseUrl = environment.apiUrl;

  protected createHeaders(token?: string): HttpHeaders {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  protected getToken(): string | null {
    return localStorage.getItem('Token');
  }

  protected getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return this.createHeaders(token || undefined);
  }
}
