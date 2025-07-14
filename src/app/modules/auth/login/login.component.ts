import {Component} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule, NgForm} from '@angular/forms';
import {AuthService} from '../../../core/services/AuthService';
import {Router} from '@angular/router';
import {ProgressBar} from 'primeng/progressbar';
import {LoadingService} from '../../../core/services/LoadingService';
import {AsyncPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ButtonModule, InputTextModule, FormsModule, ProgressBar, AsyncPipe, NgIf],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    protected loadingService: LoadingService
  ) {
  }

  ngOnInit():void {
    // localStorage.clear()
  }
  email: string = '';

  sendOtp(form: NgForm): void {
    if (form.valid) {
      this.authService.getOtp(form.value).subscribe({
        next: (response) => {
          console.log(response.data)
          localStorage.setItem("email", form.value.email);

          // xu ly thoi gian ve second
          localStorage.setItem("time-otp", response.data);
          this.router.navigate(['/login/verify']);
        },
        error: (error) => {
          console.log(error)
        }
      })

      ;
    }
  }

  loginGoogle(){
    this.authService.loginGoogle().subscribe({
      next: (response) => {
        window.location.href = response.data
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
