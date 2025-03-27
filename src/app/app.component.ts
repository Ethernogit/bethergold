import { Component, HostListener, OnInit, signal } from '@angular/core';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { MainComponent } from './main/main.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { LoginComponent } from './login/login.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  imports: [
    LeftSidebarComponent,
    MainComponent,
    CommonModule,
    LoginComponent,
    ToolbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isLeftSidebarCollapsed = signal<boolean>(true);
  screenWidth = signal<number>(typeof window !== 'undefined' ? window.innerWidth : 0);

  constructor(private router: Router, private route: ActivatedRoute) { }

  @HostListener('window:resize')
  onResize() {
    if (typeof window !== 'undefined') {
      this.screenWidth.set(window.innerWidth);
      if (this.screenWidth() < 768) {
        this.isLeftSidebarCollapsed.set(true);
      }
    }
  }

  ngOnInit(): void {
    // Siempre iniciar colapsado
    this.isLeftSidebarCollapsed.set(true);
  }

  changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed: boolean): void {
    this.isLeftSidebarCollapsed.set(isLeftSidebarCollapsed);
  }
  shouldShowSidebar(): boolean {
    return this.router.url !== '/login';
  }
}
