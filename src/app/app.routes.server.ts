import { RenderMode, ServerRoute } from '@angular/ssr';
import { LoginComponent } from './pages/login/login.component'; // Asegúrate de que la ruta sea correcta

export const serverRoutes: ServerRoute[] = [
  // {
  //   path: 'login',
  //   component: LoginComponent,
  //   renderMode: RenderMode.Prerender
  // },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
