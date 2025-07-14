import {Injectable} from '@angular/core';
import {AuthService} from './AuthService';
import {API} from '../helpers/ApiConstant';
import {Observable} from 'rxjs';
import {User} from '../models/user/User';
import {HttpClient} from '@angular/common/http';
import {ResponseDTO} from '../models/responseDTO';

@Injectable({providedIn: "root"})
export class UserService {
  url = API.URL;

  constructor(
    private http: HttpClient
  ) {
  }

  me(): Observable<ResponseDTO<User>> {
    return this.http.get<ResponseDTO<User>>(this.url + API.ENDPOINT.USER.ME);
  }

}
