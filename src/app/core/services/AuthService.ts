import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseDTO} from '../models/responseDTO';
import {API} from '../helpers/ApiConstant';
import {LoginRequest} from '../models/auth/LoginRequest';
import {LoginResponse} from '../models/auth/LoginResponse';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  url: string = API.URL;
  otpCountdown: number = 0;
  countdownInterval: any;
  displayTime: string = '';

  constructor(private http: HttpClient) {
  }

  getOtp(email: Object): Observable<ResponseDTO<string>> {
    return this.http.post<ResponseDTO<string>>(this.url + API.ENDPOINT.AUTH.OTP, email);
  }

  verifyOtp(request: LoginRequest): Observable<ResponseDTO<LoginResponse>> {
    return this.http.post<ResponseDTO<LoginResponse>>(this.url + API.ENDPOINT.AUTH.VERIFY, request,{
      withCredentials: true
    });
  }

  loginGoogle(): Observable<ResponseDTO<string>>{
    return this.http.get<ResponseDTO<string>>(this.url + API.ENDPOINT.AUTH.GOOGLE_LINK);
  }

  callbackGoogle(code: string): Observable<ResponseDTO<LoginResponse>>{
    return this.http.get<ResponseDTO<LoginResponse>>(
      this.url + API.ENDPOINT.AUTH.GOOGLE_CALLBACK, {
        params:{
          code: code
        },
        withCredentials: true
      });
  }


  getTimeDiff(value: string, ttl: number): number {
    const time = parseInt(value, 10);
    const now = Date.now();
    // tinh ra khoang thoi gian chenh lech giua hien tai va luc moi tao
    const elapsed = Math.floor((now - time) / 1000);
    return ttl - elapsed;
  }

  displayCountTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return this.padding(minutes) + ":" + this.padding(seconds);
  }

  padding(n: number): string {
    return n < 10 ? '0' + n : n.toString();
  }
  setEmailLocalStorage(email: string){
    localStorage.setItem("email", email);
  }

  setItemLoginSuccess(data: LoginResponse){
    localStorage.setItem("access_token", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("role", data.role)

    localStorage.removeItem("email");
    localStorage.removeItem("time-otp");
  }
  clearLocalStorage(){
    localStorage.clear();
  }
}
