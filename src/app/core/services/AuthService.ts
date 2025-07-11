import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseDTO} from '../models/responseDTO';
import {API} from '../helpers/ApiConstant';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  url: string = API.URL;

  constructor(private http: HttpClient) {
  }

  getOtp(email: Object): Observable<ResponseDTO<string>> {
    console.log(this.url)
    return this.http.post<ResponseDTO<string>>(this.url + API.ENDPOINT.AUTH.OTP, email);
  }
}
