import { Component } from '@angular/core';
import {AuthService} from '../../../core/services/AuthService';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-google',
  imports: [],
  templateUrl: './google.component.html',
  standalone: true,
  styleUrl: './google.component.css'
})
export class GoogleComponent {
  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute

  ) {
  }

  ngOnInit(): void {
    const code = this.activatedRoute.snapshot.queryParamMap.get('code')
    if(code != null){
      this.authService.callbackGoogle(code).subscribe({
        next: (response) => {
          console.log(response)
          this.authService.setItemLoginSuccess(response.data)
        },
        error: (error) => {
          console.log(error)
        }
      });
    }
  }
}
