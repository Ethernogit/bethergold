import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { MainComponent } from './main/main.component';
import { ProductsComponent } from './pages/products/products.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { CategoriasComponent } from './pages/settings/catalogos/categorias/categorias.component';
import { UsuariosComponent } from './pages/settings/usuarios/usuarios.component';
import { RolesComponent } from './pages/settings/roles/roles.component';
import { RootComponent } from './root/root.component';
import { FormulariosComponent } from './pages/settings/formularios/formularios.component';
import { CatalogosComponent } from './pages/settings/catalogos/catalogos.component';
export const routes: Routes = [
  { path: '', component: RootComponent },
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'productos', component: ProductsComponent, canActivate: [authGuard] },
  { path: 'settings/catalogos', component: CatalogosComponent, canActivate: [authGuard] },
  { path: 'settings/catalogos/categorias', component: CategoriasComponent, canActivate: [authGuard] },
  { path: 'settings/catalogos/usuarios', component: UsuariosComponent, canActivate: [authGuard] },
  { path: 'settings/catalogos/roles', component: RolesComponent, canActivate: [authGuard] },
  { path: 'settings/formularios', component: FormulariosComponent, canActivate: [authGuard] },
  // { 
  //   path: 'settings', 
  //   component: SettingsComponent, 
  //   canActivate: [AuthGuard],
  // },
  { path: '**', redirectTo: 'login' }
];
