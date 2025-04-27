import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-left-sidebar',
  imports: [RouterModule, CommonModule, MatMenuModule, MatIconModule],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.css',
  standalone: true
})
export class LeftSidebarComponent {
  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();
  items = [
    {
      routeLink: 'productos',
      icon: 'diamond',
      label: 'Productos',
      backgroundColor: 'transparent',
      color: '#fff'
    },
    {
      routeLink: 'caja',
      icon: 'point_of_sale',
      label: 'Caja',
      backgroundColor: 'transparent',
      color: '#fff'
    },
    {
      routeLink: 'clientes',
      icon: 'group',
      label: 'Clientes',
      backgroundColor: 'transparent',
      color: '#fff'
    },
    {
      icon: 'admin_panel_settings',
      label: 'Admin',
      backgroundColor: 'transparent',
      color: '#fff',
      hasMenu: true,
      menuId: 'adminMenu',
      menuItems: [
        {
          label: 'Catalogos',
          routeLink: 'settings/catalogos'
        },
        {
          label: 'Formularios ',
          routeLink: 'settings/formularios'
        },
        {
          label: 'Usuarios',
          routeLink: 'settings/catalogos/usuarios'
        },

        {
          label: 'Roles y permisos',
          routeLink: 'settings/catalogos/roles'
        }
      ]
    }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onMouseEnter(): void {
    if (this.isLeftSidebarCollapsed()) {
      this.changeIsLeftSidebarCollapsed.emit(false);
    }
  }

  onMouseLeave(): void {
    if (!this.isLeftSidebarCollapsed()) {
      this.changeIsLeftSidebarCollapsed.emit(true);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleSubmenu(item: any): void {
    item.expanded = !item.expanded;
  }
}
