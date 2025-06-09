import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  protected baseRoute = environment.apiUrl;

  constructor(protected http: HttpClient) { }

  protected createHeader(token?: string | null): { headers: HttpHeaders } {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return { headers };
  }

  protected getToken(): string | null {
    return localStorage.getItem('Token');
  }

  protected getAuthHeaders(): { headers: HttpHeaders } {
    const token = this.getToken();
    return this.createHeader(token);
  }
}
