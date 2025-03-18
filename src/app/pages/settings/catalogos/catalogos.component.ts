import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { CategoriasComponent } from './categorias/categorias.component';
@Component({
  selector: 'app-catalogos',
  imports: [MatTabsModule,CategoriasComponent],
  templateUrl: './catalogos.component.html',
  styleUrl: './catalogos.component.css'
})
export class CatalogosComponent {

}
