import {Component} from '@angular/core';
import {InputOtpModule} from 'primeng/inputotp';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginRequest} from '../../../core/models/auth/LoginRequest';
import {AuthService} from '../../../core/services/AuthService';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {MessageModule} from 'primeng/message';
import {Toast} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {LoadingService} from '../../../core/services/LoadingService';
import {AsyncPipe, NgIf} from '@angular/common';
import {ProgressBar} from 'primeng/progressbar';

@Component({
  selector: 'app-verify',
  imports: [InputOtpModule, FormsModule, ProgressSpinnerModule, MessageModule, Toast, AsyncPipe, NgIf, ProgressBar],
  providers: [MessageService],
  templateUrl: './verify.component.html',
  standalone: true,
  styleUrl: './verify.component.css',
})
export class VerifyComponent {
  otp: string = '';
  email: string = '';
  countTime: string = '';
  countInterval: any;
  isLoading: boolean = false;
  isSuccess: boolean = false;
  isFail: boolean = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
    protected loadingService: LoadingService) {

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
          this.authService.setItemLoginSuccess(response.data)
          this.authService.initStateUser();
          this.show({severity: 'success', summary: 'Thành công', detail: 'Đăng nhập thành công', life: 3000})
          this.router.navigate(['/'])
        },
        error: (error) => {
          console.error(error);
          this.show({severity: 'error', summary: 'Lỗi', detail: 'Mã OTP không chính xác', life: 3000})
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
          this.countTime = '';
        }
        this.isLoading = false;
        if (s >= 0) {
          this.countTime = this.authService.displayCountTime(s);
        }
      }, 1000)
    }
    return false;
  }

  resendOtp(): void {
    this.isLoading = true;
    let check = this.canResend();
    if (check) {
      let email = this.email;
      this.authService.getOtp({email}).subscribe({
        next: (response) => {
          console.log(response.data)
          // xu ly thoi gian ve second
          localStorage.setItem("time-otp", response.data);
          console.log("gui lai thanh cong")
          this.isLoading = false;
          this.show({severity: 'success', summary: 'Thành công', detail: 'Đã gửi lại otp vui lòng kiểm tra email', life: 3000})
        },
        error: (error) => {
          console.log(error)

        }
      })

      ;
    }
  }

  show(value: any) {
    this.messageService.add(value);
  }
}
