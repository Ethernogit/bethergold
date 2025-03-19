import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { MainComponent } from './main/main.component';
import { ProductsComponent } from './pages/products/products.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { CategoriasComponent } from './pages/settings/catalogos/categorias/categorias.component';
import { UsuariosComponent } from './pages/settings/catalogos/usuarios/usuarios.component';
import { SucursalesComponent } from './pages/settings/catalogos/sucursales/sucursales.component';
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], },
  { path: 'productos', component: ProductsComponent, canActivate: [AuthGuard], },
  { path: 'settings/catalogos/categorias', component: CategoriasComponent, canActivate: [AuthGuard] },
  { path: 'settings/catalogos/usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
  { path: 'settings/catalogos/sucursales', component: SucursalesComponent, canActivate: [AuthGuard] },
  // { 
  //   path: 'settings', 
  //   component: SettingsComponent, 
  //   canActivate: [AuthGuard],
  // },
  { path: '**', redirectTo: 'login' }

];
