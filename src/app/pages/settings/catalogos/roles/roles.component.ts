import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CatalogosService } from '../../../../shared/services/catalogos.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from './register/register.component';

interface Permission {
  _id: string;
  name: string;
  slug: string;
  description: string;
  group: string;
  order: number;
  checked: boolean;
}

interface PermissionGroup {
  name: string;
  permissions: Permission[];
}

interface RolePermission {
  _id: string;
}

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatCheckboxModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule
  ],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  roles: any[] = [];
  selectedRole: any = null;
  permissionGroups: PermissionGroup[] = [];
  allPermissions: Permission[] = [];

  constructor(
    private catalogosService: CatalogosService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadRoles();
    this.loadPermissions();
  }

  private loadPermissions(): void {
    this.catalogosService.getPermisos().subscribe({
      next: (response: any) => {
        if (Array.isArray(response)) {
          this.allPermissions = response.map(perm => ({
            ...perm,
            checked: false
          }));
          this.organizePermissions();
        } else {
          console.error('La respuesta de permisos no es un array:', response);
          this.showError('Error al cargar los permisos');
        }
      },
      error: (error) => {
        console.error('Error al cargar permisos:', error);
        this.showError('Error al cargar los permisos');
      }
    });
  }

  private organizePermissions(): void {
    const groups: { [key: string]: Permission[] } = {};

    this.allPermissions.forEach(permission => {
      if (!groups[permission.group]) {
        groups[permission.group] = [];
      }
      groups[permission.group].push(permission);
    });

    this.permissionGroups = Object.entries(groups).map(([name, permissions]) => ({
      name: this.formatGroupName(name),
      permissions: permissions.sort((a, b) => a.order - b.order)
    }));
  }

  private formatGroupName(name: string): string {
    const groupNames: { [key: string]: string } = {
      'user': 'Gestión de Usuarios',
      'role': 'Gestión de Roles',
      'catalog': 'Gestión de Catálogos',
      'report': 'Reportes',
      'product': 'Gestión de Productos',
      'order': 'Gestión de Órdenes',
      'customer': 'Gestión de Clientes',
      'settings': 'Configuraciones'
    };
    return groupNames[name] || name.charAt(0).toUpperCase() + name.slice(1);
  }

  private loadRoles(): void {
    this.catalogosService.getRoles().subscribe({
      next: (response: any) => {
        if (Array.isArray(response)) {
          this.roles = response;
          console.log('Roles cargados:', this.roles);
        } else {
          console.error('La respuesta no es un array:', response);
          this.showError('Error al cargar los roles');
        }
      },
      error: (error) => {
        console.error('Error al cargar roles:', error);
        this.showError('Error al cargar los roles');
      }
    });
  }

  selectRole(role: any) {
    this.selectedRole = role;
    this.loadRolePermissions(role);
  }

  private loadRolePermissions(role: any) {
    // Resetear todos los permisos
    this.allPermissions.forEach(permission => {
      permission.checked = false;
    });

    // Marcar los permisos que tiene el rol
    if (role.permissions && Array.isArray(role.permissions)) {
      role.permissions.forEach((permissionId: string) => {
        const permission = this.allPermissions.find(p => p._id === permissionId);
        if (permission) {
          permission.checked = true;
        }
      });
    }
  }

  savePermissions() {
    if (this.selectedRole) {
      const selectedPermissions = this.allPermissions
        .filter(permission => permission.checked)
        .map(permission => ({
          _id: permission._id,
          name: permission.name,
          slug: permission.slug,
          description: permission.description,
          group: permission.group,
          order: permission.order
        }));

      this.catalogosService.updateRolePermissions(this.selectedRole._id, selectedPermissions)
        .subscribe({
          next: (response) => {
            this.showSuccess('Permisos actualizados correctamente');
            this.loadRoles(); // Recargar roles para actualizar la vista
          },
          error: (error) => {
            console.error('Error al guardar permisos:', error);
            this.showError('Error al guardar los permisos');
          }
        });
    } else {
      this.showError('No hay rol seleccionado');
    }
  }

  togglePermission(permission: Permission) {
    permission.checked = !permission.checked;
  }

  private showSuccess(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }

  openModalRegistroRol(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadRoles();
        this.showSuccess('Rol registrado correctamente');
      }
    });
  }
}
