import { Component } from '@angular/core';
import {CardModule} from 'primeng/card';
import {IconField} from 'primeng/iconfield';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {InputIcon} from 'primeng/inputicon';
import {MenuItem} from 'primeng/api';
import {PanelMenu} from 'primeng/panelmenu';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CardModule, IconField, InputTextModule, FormsModule, InputIcon, PanelMenu, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  standalone: true
})
export class SidebarComponent {
  items: MenuItem[] = [];
  signoutItems: MenuItem[] = [];
  constructor(private router: Router) {}
  ngOnInit() {
    this.signoutItems = [
      {
        icon: 'pi pi-sign-out',
        label: 'Đăng xuất',
        router: '/'
      }
    ]
    this.items = [
      {
        label: 'Router',
        icon: 'pi pi-user',
        items: [
          {
            label: 'Installation',
            icon: 'pi pi-eraser',
            route: '/installation'
          },
          {
            label: 'Configuration',
            icon: 'pi pi-heart',
            route: '/configuration'
          }
        ]
      },
      {
        label: 'Programmatic',
        icon: 'pi pi-mobile',
        command: () => {
          this.router.navigate(['/installation']);
        }
      },
      {
        label: 'External',
        icon: 'pi pi-home',
        items: [
          {
            label: 'Angular',
            icon: 'pi pi-star',
            url: 'https://angular.io/'
          },
          {
            label: 'Vite.js',
            icon: 'pi pi-bookmark',
            url: 'https://vitejs.dev/'
          }
        ]
      }
    ];
  }
}
