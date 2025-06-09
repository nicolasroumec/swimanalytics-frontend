import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MainService } from '.././main/main.service';
import { RegisterDTO } from '../../models/dtos/register.dto';
import { VerifyAccountDTO } from '../../models/dtos/verify-account.dto';
import { ResendVerificationCodeDTO } from '../../models/dtos/resend-verification-code.dto';
import { ChangePasswordDTO } from '../../models/dtos/change-password.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService extends MainService {

  Register(model: RegisterDTO): Observable<any> {
    return this.http.post(this.baseRoute + 'auth/register', model);
  }

  VerifyAccount(model: VerifyAccountDTO): Observable<any> {
    return this.http.post(this.baseRoute + 'auth/verify', model);
  }

  ResendVerificationCode(model: ResendVerificationCodeDTO): Observable<any> {
    return this.http.post(this.baseRoute + 'auth/resend-code', model);
  }

  ChangePassword(model: ChangePasswordDTO): Observable<any> {
    var token = localStorage.getItem('Token');
    var headers = this.createHeader(token);
    return this.http.post(this.baseRoute + 'auth/change-password', model, headers);
  }

  GetAllUsers(): Observable<any> {
    var token = localStorage.getItem('Token');
    var headers = this.createHeader(token);
    return this.http.get(this.baseRoute + 'users/getAll', headers);
  }

  GetUserByEmail(email: string): Observable<any> {
    var token = localStorage.getItem('Token');
    var headers = this.createHeader(token);
    return this.http.get(this.baseRoute + `users/getByEmail?email=${email}`, headers);
  }
}
