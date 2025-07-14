import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AuthService} from './core/services/AuthService';
import {UserService} from './core/services/UserService';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  title = 'fe-shop';

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
  }
  ngOnInit():void{
    this.authService.initStateUser()
  }
}
