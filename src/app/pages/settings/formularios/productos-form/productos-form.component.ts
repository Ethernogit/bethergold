import { Component } from '@angular/core';
import { FormulariosService } from '../../../../shared/services/formularios.service';
import { MatTableModule } from '@angular/material/table';
@Component({
  selector: 'app-productos-form',
  imports: [
    MatTableModule
  ],
  templateUrl: './productos-form.component.html',
  styleUrl: './productos-form.component.css',
  standalone: true
})
export class ProductosFormComponent {
  dataSource: any[] = [];
  displayedColumns: string[] = ['name','requerido','tipo','opciones'];
  constructor(private formulariosService: FormulariosService) { }
  ngOnInit(): void {
    this.formulariosService.getformproducto().subscribe(data => {
      this.dataSource = data.campos;
    });
  }
}