import {Component} from '@angular/core';
import {InputOtpModule} from 'primeng/inputotp';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginRequest} from '../../../core/models/auth/LoginRequest';
import {AuthService} from '../../../core/services/AuthService';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {MessageModule} from 'primeng/message';

@Component({
  selector: 'app-verify',
  imports: [InputOtpModule, FormsModule, ProgressSpinnerModule, MessageModule ],
  templateUrl: './verify.component.html',
  standalone: true,
  styleUrl: './verify.component.css'
})
export class VerifyComponent {
  otp: string = '';
  email: string = '';
  countTime: string = '';
  countInterval: any;
  isLoading: boolean = false;
  isSuccess: boolean = false;
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,) {

  }

  ngOnInit() {
    let email = localStorage.getItem("email");
    if (email != null) {
      this.email = email;
    }
  }

  otpChange(value: string): void {
    if (value.length === 6) {
      let request: LoginRequest = {
        email: this.email,
        otp: value
      };
      this.authService.verifyOtp(request).subscribe({
        next: (response) => {
          console.log(response)
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  canResend(): boolean {
    let timeOtp = localStorage.getItem("time-otp");
    if (timeOtp != null) {
      let second = this.authService.getTimeDiff(timeOtp, 300);
      if (second <= 0) {
        return true;
      }
      this.countInterval = setInterval(() => {
        let s = this.authService.getTimeDiff(timeOtp, 300);
        if (s <= 0) {
          clearInterval(this.countInterval);
        }
        this.isLoading = false;
        if(s >= 0){
          this.countTime = this.authService.displayCountTime(s);
        }
      }, 1000)
    }
    return false;
  }
  resendOtp(): void {
    this.isLoading = true;
    let check = this.canResend();
    if(check){
      let email = this.email;
      this.authService.getOtp({email}).subscribe({
        next: (response) => {
          console.log(response.data)
          // xu ly thoi gian ve second
          localStorage.setItem("time-otp", response.data);
          console.log("gui lai thanh cong")
          this.isLoading = false;
          this.isSuccess = true;
        },
        error: (error) => {
          console.log(error)
        }
      })

      ;
    }
  }
}
