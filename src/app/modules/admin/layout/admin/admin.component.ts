import { Component } from '@angular/core';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {DashboardComponent} from '../../pages/dashboard/dashboard.component';

@Component({
  selector: 'app-admin',
  imports: [
    SidebarComponent,
    DashboardComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
  standalone: true
})
export class AdminComponent {

}
