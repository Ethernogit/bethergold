import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  imports: [MatSidenavModule,MatListModule,RouterModule,CommonModule,MatIconModule]
})
export class LayoutComponent {
  isExpanded = false; // Ahora inicia colapsado

  toggleDrawer(): void {
    this.isExpanded = !this.isExpanded;
  }
}
