import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-left-sidebar',
  imports: [RouterModule, CommonModule,MatMenuModule,MatIconModule],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.css'
})
export class LeftSidebarComponent {
  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();
  items = [
    {
      routeLink: 'dashboard',
      icon: 'fal fa-home',
      label: 'Dashboard',
      backgroundColor: '#ffff',
      color: '#000'
    },
    {
      routeLink: 'productos',
      icon: 'fal fa-box-open',
      label: 'Productos',
      backgroundColor: '#ffff',
      color: '#000'
    },
    {
      routeLink: 'settings',
      icon: 'fal fa-cog',
      label: 'Settings',
      backGroundColor: '#ffff',
      color: '#000'
    },
  ];

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }
  toggleSubmenu(item:any): void {
    item.expanded = !item.expanded;
  }
}
