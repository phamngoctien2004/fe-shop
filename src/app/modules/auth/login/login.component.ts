import {Component} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule, NgForm} from '@angular/forms';
import {AuthService} from '../../../core/services/AuthService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ButtonModule, InputTextModule, FormsModule],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  email: string = '';

  sendOtp(form: NgForm): void {
    console.log(form.value);
    if (form.valid) {
      this.authService.getOtp(form.value).subscribe({
        next: (response) => {
          console.log(form.value.email);
          this.router.navigate(['/login/verify'], {
            queryParams: form.value
          });
        },
        error: (error) => {
          console.log(error)
        }
      })

      ;
    }
  }

}
