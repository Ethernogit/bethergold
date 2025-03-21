import { Component } from '@angular/core';
import { CatalogosService } from '../../../../shared/services/catalogos.service';
import { Roles } from '../../../../interfaces/rolespermisos';
import { MatListModule } from '@angular/material/list';
import { MatListItem } from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
@Component({
  selector: 'app-roles',
  imports: [
    MatListModule,
    MatListItem,
    MatCheckboxModule
  ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {
  roles: Roles[] = [];
  selectedRole: Roles | null = null;

  constructor(private CatalogosService: CatalogosService) {
    this.roles.push({
      _id: '1',
      name: 'Admin',
      slug: 'admin',
      permissions: []
    });
  }
  ngOnInit(): void {
    this.CatalogosService.getRoles().subscribe((response: any) => {
      this.roles = response.data; // Asigna `data`, que sí es un `Role[]`
    });
  }

  selectRole(role: Roles) {
    this.selectedRole = role;
  }

  savePermissions() {
    console.log('Saving permissions:', this.selectedRole);
    // Aquí harías una petición al backend para actualizar los permisos
  }
}
