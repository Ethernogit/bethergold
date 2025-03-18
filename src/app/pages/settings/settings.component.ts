import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { CatalogosComponent } from './catalogos/catalogos.component';
@Component({
    selector: 'app-settings',
    imports: [MatButtonModule, MatIconModule, CatalogosComponent],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.css'
})
export class SettingsComponent {}
