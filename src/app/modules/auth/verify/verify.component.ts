import { Component } from '@angular/core';
import {InputOtpModule} from 'primeng/inputotp';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-verify',
  imports: [InputOtpModule, FormsModule],
  templateUrl: './verify.component.html',
  standalone: true,
  styleUrl: './verify.component.css'
})
export class VerifyComponent {
    otp: string = '';
    email: string | null = null;
    constructor(
      private activeRoute: ActivatedRoute,
                private router: Router) {

    }

    ngOnInit(){
       this.email = this.activeRoute.snapshot.queryParamMap.get('email');
       console.log(this.email)
      if(!this.email){
        this.router.navigate(["/"])
        console.error("lỗi")
      }
    }
}
