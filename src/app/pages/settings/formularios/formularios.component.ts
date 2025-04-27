import { Component } from '@angular/core';
import { ProductosFormComponent } from './productos-form/productos-form.component';
import { CategoriasFormComponent } from './categorias-form/categorias-form.component';
import { MatTabsModule } from '@angular/material/tabs';
@Component({
  selector: 'app-formularios',
  imports: [
    ProductosFormComponent,
    MatTabsModule,
    CategoriasFormComponent
  ],
  templateUrl: './formularios.component.html',
  styleUrl: './formularios.component.css',
  standalone: true
})
export class FormulariosComponent {

}
