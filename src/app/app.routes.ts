import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { MainComponent } from './main/main.component';
import { ProductsComponent } from './pages/products/products.component';
import { SettingsComponent } from './pages/settings/settings.component';
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], },
  { path: 'productos', component: ProductsComponent, canActivate: [AuthGuard], },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard], },

  // {
  //   path: '',
  //   component: MainComponent,
  //   canActivate: [AuthGuard],
  //   children: [
  //     { path: 'dashboard', component: DashboardComponent },
  //     // Otras rutas hijas protegidas
  //   ]
  // },
  { path: '**', redirectTo: 'login' }

];
