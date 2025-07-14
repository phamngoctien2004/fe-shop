import {Component} from '@angular/core';
import {AuthService} from '../../../../core/services/AuthService';
import {AsyncPipe, NgIf} from '@angular/common';
import {User} from '../../../../core/models/user/User';

@Component({
  selector: 'app-home',
  imports: [
    AsyncPipe,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true
})
export class HomeComponent {
  user: User | null = null;
  constructor(
    protected authService: AuthService
  ) {
  }
  ngOnInit():void{

  }
}
