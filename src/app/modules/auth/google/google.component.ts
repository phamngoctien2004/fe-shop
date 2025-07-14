import { Component } from '@angular/core';
import {AuthService} from '../../../core/services/AuthService';
import {ActivatedRoute} from '@angular/router';
import {AsyncPipe, NgIf} from '@angular/common';
import {ProgressBar} from 'primeng/progressbar';
import {LoadingService} from '../../../core/services/LoadingService';

@Component({
  selector: 'app-google',
  imports: [
    AsyncPipe,
    NgIf,
    ProgressBar
  ],
  templateUrl: './google.component.html',
  standalone: true,
  styleUrl: './google.component.css'
})
export class GoogleComponent {
  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    protected loadingService: LoadingService
  ) {
  }

  ngOnInit(): void {
    const code = this.activatedRoute.snapshot.queryParamMap.get('code')
    if(code != null){
      this.authService.callbackGoogle(code).subscribe({
        next: (response) => {
          this.authService.initStateUser();
          this.authService.setItemLoginSuccess(response.data);
        },
        error: (error) => {
          console.log(error)
        }
      });
    }
  }
}
